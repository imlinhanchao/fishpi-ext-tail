<p align="center">
  <img width="200" src="./public/icon.png">
</p>

小冰游戏是一款摸鱼文字修仙游戏。这是 [摸鱼派客户端](https://github.com/imlinhanchao/fishpi-desktop) 小冰游戏扩展。

## 安装方式

1. 下载 [Release](https://github.com/imlinhanchao/fishpi-ext-tail/releases) 最新版本的压缩包。
2. 解压缩到客户端扩展目录。
3. 重新开启客户端即可。

## 功能说明
可以设置过滤聊天室的小尾巴和设置自己发送的小尾巴，可以进入扩展页面点击扩展的设置按钮进行设置。

## 调试说明
1. 首先，将代码 clone 到扩展目录，运行 `npm run serve`，启动 vue 服务。
2. 添加 `--dev` 命令行参数启动程序：
```bash
# Windows
.\fishpi.exe --dev

# MacOS
fishpi.app/Contents/MacOS/fishpi --dev
```
1. 点击扩展界面的扩展设置按钮。即可启动对扩展 `webview` 调试。