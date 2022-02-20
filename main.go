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

func (j *JessicaConfig) Update(override config.Config) {
	if override.Has("ListenAddr") || override.Has("ListenAddrTLS") {
		plugin.Info(Green("Jessica Server Start").String(), zap.String("ListenAddr", j.ListenAddr), zap.String("ListenAddrTLS", j.ListenAddrTLS))
		j.Listen(plugin, &jConfig)
	} else {
		plugin.Info(Green("Jessica start reuse engine port").String())
	}
}
