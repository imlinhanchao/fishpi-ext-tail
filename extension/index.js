/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');

let localstorage = new LocalStorage(path.resolve(__dirname, "local"));
let settings = localstorage.getItem('setting');
settings = settings ? JSON.parse(settings) : null;

function activate(context, electron) {
    context.on('login', function(token) {
        console.dir(token);
    })

    context.on('logout', () => {
        console.dir('user logout')
    })

    context.on('quit', () => {
        console.dir('app was quit')
    })

    context.on('command', (command, args, callback) => {
        switch(command) {
            case 'fishpi.get.setting':
            {
                let rsp = settings
                callback(rsp);
                break;
            }
            case 'fishpi.set.setting':
            {
                settings = args
                localstorage.setItem('setting', JSON.stringify(settings));
                break;
            }
        }
    })
}

function getSettingUrl() {
    let Url = process.env.EXT_ENV == 'development' ? 
        "http://127.0.0.1:8080" :
        path.join(__dirname, "..", "dist", "index.html");
    return Url;
}

function hooks() {
    let liveness = 0;
    return {
        /// 聊天室收到消息事件
        /// - msg: 聊天室消息，具体定义参见 https://github.com/imlinhanchao/fishpi-api-package/blob/master/src/chatroom.ts#L267
        /// return msg 为响应该消息（可修改），false/null 则会中断消息响应。
        async messageEvent(msg) {
            if (msg.type == 'msg' && settings.filterTail) {
                msg.data.content = msg.data.content.replace(/((?<!引用([^<])*?<\/h5>)\n<blockquote>)(([\s\S])*?)(<\/blockquote>$)/g,
                '<details><summary><small>摸鱼小尾巴~</small></summary><blockquote>$3</blockquote></details>')
            }
            return msg;
        },
        async sendMsgEvent(text) {
            if (settings.addTail && !text.match(new RegExp(setting.exclude))) {
                text = text + `\n\n\n>` + settings.tails.replace(/{{liveness}}/g, liveness);
            }
            return text;
        },
        liveness(data) {
            liveness = data;
        },
    }
}
module.exports = { activate, getSettingUrl, hooks }