package jessica

import (
	"embed"
	"mime"
	"net/http"
	"path"
	"strings"

	. "github.com/Monibuca/engine/v2"
	"github.com/Monibuca/utils"
	. "github.com/logrusorgru/aurora"
)

var config struct {
	ListenAddr    string
	CertFile      string
	KeyFile       string
	ListenAddrTLS string
}

//go:embed ui/*
//go:embed README.md
var ui embed.FS

var publicPath string

func init() {
	plugin := &PluginConfig{
		Name:   "Jessica",
		Type:   PLUGIN_SUBSCRIBER,
		Config: &config,
		Run:    run,
		UIFile: &ui,
	}
	InstallPlugin(plugin)
}
func run() {
	http.HandleFunc("/jessibuca/", jessibuca)
	if config.ListenAddr != "" || config.ListenAddrTLS != "" {
		Print(Green("Jessica start at"), BrightBlue(config.ListenAddr), BrightBlue(config.ListenAddrTLS))
		utils.ListenAddrs(config.ListenAddr, config.ListenAddrTLS, config.CertFile, config.KeyFile, http.HandlerFunc(WsHandler))
	} else {
		Print(Green("Jessica start reuse gateway port"))
		http.HandleFunc("/jessica/", WsHandler)
	}
}
func jessibuca(w http.ResponseWriter, r *http.Request) {
	filePath := strings.TrimPrefix(r.URL.Path, "/jessibuca")
	if mime := mime.TypeByExtension(path.Ext(filePath)); mime != "" {
		w.Header().Set("Content-Type", mime)
	}
	if f, err := ui.ReadFile("ui/public" + filePath); err == nil {
		if _, err = w.Write(f); err != nil {
			w.WriteHeader(500)
		}
	} else {
		w.WriteHeader(404)
	}
}
