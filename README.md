# jessica plugin
websocket raw data protocol plugin for monibuca

通过Websocket传输音视频数据，使用Jessibuca播放器进行播放。播放器已内置在该插件中。该插件带有UI界面，可以显示所有的房间，并且可以预览房间视频。

## 插件名称

Jessica

## 配置

可配置WS协议和WSS协议监听地址端口

```toml
[Jessica]
ListenAddr = ":8080"
CertFile = "../foo.cert"
KeyFile  = "../foo.key"
ListenAddrTLS = ":8088"
```

- 如果不设置ListenAddr和ListenAddrTLS，将共用网关的端口监听