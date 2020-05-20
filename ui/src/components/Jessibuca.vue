<template>
    <Modal
        v-bind="$attrs"
        draggable
        v-on="$listeners"
        :title="useFlvjs?url+'.flv':url"
        @on-ok="onClosePreview"
        @on-cancel="onClosePreview"
    >
        <video ref="flvjs" v-show="useFlvjs" style="width:488px;height:275px"></video>
        <canvas id="canvas" width="488" height="275" style="background: black" v-show="!useFlvjs"/>
        <div slot="footer">
            <!-- <Button v-if="audioEnabled" @click="turnOff" icon="md-volume-up" />
            <Button v-else @click="turnOn" icon="md-volume-off"></Button> -->
            <mu-switch v-model="useFlvjs" label="采用flv.js"></mu-switch>
        </div>
    </Modal>
</template>
<style scoped>


</style>
<script>
let h5lc = null;
let flvPlayer = null;
import flvjs from "flv.js"
export default {
    name: "Jessibuca",
    props: {
        audioCodec: String,
        videoCodec: String
    },
    data() {
        return {
            audioEnabled: true,
            useFlvjs:false,
            url: "",
            decoderTable: {
                AAC_AVC: "ff",
                AAC_H265: "hevc_aac",
                MP3_AVC: "ff_mp3",
                MP3_H265: "hevc_mp3",
                AVC: "ff",
                H265: "hevc_aac"
            }
        };
    },
    watch: {
        audioEnabled(value) {
            h5lc.audioEnabled(value);
        },
        decoder(value) {
            if (h5lc) {
                h5lc.destroy();
            }
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: value
            });
        },
        useFlvjs(v){
            if(v){
                h5lc.close();
                flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    url: this.url+'.flv'
                });
                flvPlayer.attachMediaElement(this.$refs.flvjs);
                flvPlayer.load();
                flvPlayer.play();
            }else{
                 h5lc.play(this.url);
                 flvPlayer.destroy()
            }
        }
    },
    computed: {
        decoder() {
            let js = this.decoderTable[this.audioCodec + "_" + this.videoCodec];
            if (!js) {
                js = this.decoderTable[this.videoCodec] || "ff";
            }
            return "jessibuca/" + js + ".js";
        }
    },
    mounted() {
        let s = document.createElement("script");
        s.src = "/jessibuca/renderer.js";
        s.onload = function() {
            s.onload = null;
            h5lc = new window.Jessibuca({
                canvas: document.getElementById("canvas"),
                decoder: "jessibuca/ff.js"
            });
        };
        this.$root.$el.append(s);
    },
    methods: {
        play(url) {
            this.url = url;
            h5lc.play(url);
        },
        onClosePreview() {
            h5lc.close();
            flvPlayer.destroy()
        },
        destroy() {
            h5lc.destroy();
        },
        turnOn() {
            this.audioEnabled = true;
        },
        turnOff() {
            this.audioEnabled = false;
        }
    }
};
</script>

