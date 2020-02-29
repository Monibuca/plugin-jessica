# jessicaplugin
websocket raw data protocol plugin for monibuca

通过Websocket传输音视频数据，使用Jessibuca播放器进行播放。播放器已内置在该插件中。该插件带有UI界面，可以显示所有的房间，并且可以预览房间视频。

## 插件名称

Jessica

## 配置

目前仅有的配置是监听的端口号

```toml
[Plugins.Jessica]
ListenAddr = ":8080"
```