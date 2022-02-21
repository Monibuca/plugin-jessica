package jessica

import (
	. "github.com/Monibuca/engine/v4"
	"github.com/Monibuca/engine/v4/config"
	. "github.com/logrusorgru/aurora"
	"go.uber.org/zap"
)

type JessicaConfig struct {
	config.HTTP
	config.Subscribe
}

var jConfig JessicaConfig
var plugin = InstallPlugin(&jConfig)

func (j *JessicaConfig) OnEvent(event any) {
	switch event.(type) {
	case FirstConfig:
		if j.ListenAddr != "" || j.ListenAddrTLS != "" {
			plugin.Info(Green("Jessica Server Start").String(), zap.String("ListenAddr", j.ListenAddr), zap.String("ListenAddrTLS", j.ListenAddrTLS))
			go j.Listen(plugin, &jConfig)
		} else {
			plugin.Info(Green("Jessica start reuse engine port").String())
		}
	}
}
