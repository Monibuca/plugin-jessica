package jessica

import (
	"net/http"

	. "github.com/Monibuca/engine/v3"
	"github.com/Monibuca/utils/v3"
	. "github.com/logrusorgru/aurora"
)

var config struct {
	ListenAddr    string
	CertFile      string
	KeyFile       string
	ListenAddrTLS string
}

func init() {
	plugin := &PluginConfig{
		Name:   "Jessica",
		Config: &config,
		Run:    run,
	}
	InstallPlugin(plugin)
}
func run() {
	if config.ListenAddr != "" || config.ListenAddrTLS != "" {
		utils.Print(Green("Jessica start at"), BrightBlue(config.ListenAddr), BrightBlue(config.ListenAddrTLS))
		utils.ListenAddrs(config.ListenAddr, config.ListenAddrTLS, config.CertFile, config.KeyFile, http.HandlerFunc(WsHandler))
	} else {
		utils.Print(Green("Jessica start reuse gateway port"))
		http.HandleFunc("/jessica/", WsHandler)
	}
}
