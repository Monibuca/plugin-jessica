# JESSICA 插件

通过Websocket传输音视频数据，使用Jessibuca播放器进行播放。

## 插件地址

https://github.com/Monibuca/plugin-jessica

## 插件引入
```go
import (
    _ "m7s.live/plugin/jessica/v4"
)
```

## 配置

可配置WS协议和WSS协议监听地址端口

```yaml
jessica:
  http:
      listenaddr: :8080
      listenaddrtls: :8081
      certfile: monibuca.com.pem
      keyfile: monibuca.com.key
      cors: true
      username: ""
      password: ""
  subscribe:
      subaudio: true
      subvideo: true
      iframeonly: false
      waittimeout: 10
```

## 协议说明

该插件提供两种格式的协议供播放器播放。

### WS-RAW

- 地址格式：ws://[HOST]/jessica/[streamPath]

- 该协议传输的是私有格式，第一个字节代表音视频，1为音频，2为视频，后面跟4个字节的时间戳，然后接上字节流（RTMP的VideoTag或AudioTag）

### WS-FLV

- 地址格式：ws://[HOST]/jessica/[streamPath].flv
- 该协议传输的flv格式的文件流
