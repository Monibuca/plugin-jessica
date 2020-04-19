<template>
    <div v-loading="Rooms==null">
        <!-- <i-input search enter-button="播放" placeholder="" @on-search="onPlay">
            <span slot="prepend">ws://{{host}}/</span>
        </i-input>-->
        <mu-data-table :columns="columns" :data="Rooms" :min-col-width="50" @row-dblclick="preview" @row-click="$toast.message('双击预览')">
            <template slot-scope="scope">
                <td class="is-center">{{scope.row.StreamPath}}</td>
                <td class="is-center">{{scope.row.Type||"await"}}</td>
                <td class="is-center">
                    <StartTime :value="scope.row.StartTime"></StartTime>
                </td>
                <td class="is-center">{{SoundFormat(scope.row.AudioInfo.SoundFormat)}}</td>
                <td class="is-center">{{SoundRate(scope.row.AudioInfo.SoundRate)}}</td>
                <td class="is-center">{{scope.row.AudioInfo.SoundType}}</td>
                <td class="is-center">{{CodecID(scope.row.VideoInfo.CodecID)}}</td>
                <td class="is-center">{{scope.row.VideoInfo.SPSInfo.Width}}x{{scope.row.VideoInfo.SPSInfo.Height}}</td>
                <td class="is-center">{{scope.row.AudioInfo.PacketCount}}/{{scope.row.VideoInfo.PacketCount}}</td>
                <td class="is-center">{{getSubscriberCount(scope.row)}}</td>
            </template>
        </mu-data-table>
        <Jessibuca
            ref="jessibuca"
            v-model="showPreview"
            :videoCodec="currentStream && CodecID(currentStream.VideoInfo.CodecID)"
            :audioCodec="currentStream && SoundFormat(currentStream.AudioInfo.SoundFormat)"
        ></Jessibuca>
        <Subscribers
            :data="currentStream && currentStream.SubscriberInfo || []"
            v-model="showSubscribers"
        />
    </div>
</template>

<script>
const SoundFormat = {
    0: "Linear PCM, platform endian",
    1: "ADPCM",
    2: "MP3",
    3: "Linear PCM, little endian",
    4: "Nellymoser 16kHz mono",
    5: "Nellymoser 8kHz mono",
    6: "Nellymoser",
    7: "G.711 A-law logarithmic PCM",
    8: "G.711 mu-law logarithmic PCM",
    9: "reserved",
    10: "AAC",
    11: "Speex",
    14: "MP3 8Khz",
    15: "Device-specific sound"
};
const CodecID = {
    1: "JPEG (currently unused)",
    2: "Sorenson H.263",
    3: "Screen video",
    4: "On2 VP6",
    5: "On2 VP6 with alpha channel",
    6: "Screen video version 2",
    7: "AVC",
    12: "H265"
};
import Jessibuca from "./components/Jessibuca";
import Subscribers from "./components/Subscribers";
import StartTime from "./components/StartTime";
let summaryES = null;
export default {
    components: {
        Jessibuca,
        Subscribers,
        StartTime
    },
    props:{
        ListenAddr:String
    },
    data() {
        return {
            showPreview: false,
            currentStream: null,
            showSubscribers: false,
            // typeMap: {
            //     Receiver: "📡",
            //     FlvFile: "🎥",
            //     TS: "🎬",
            //     HLS: "🍎",
            //     "": "⏳",
            //     Match365: "🏆",
            //     RTMP: "🚠"
            // },
            Rooms: null,
            columns: [
                {
                    title: "房间",
                    name: "StreamPath",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "类型",
                    name: "Type",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "开始时间",
                    name: "StartTime",
                    sortable: true,
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "音频格式",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "采样率",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "声道",
                    name: "AudioInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "视频格式",
                    name: "VideoInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "分辨率",
                    name: "VideoInfo",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "数据包",
                    name: "",
                    align: "center",
                    cellAlign: "center"
                },
                {
                    title: "订阅者",
                    name: "Subscribes",
                    align: "center",
                    cellAlign: "center"
                }
            ]
        };
    },
    computed: {
        host() {
            return location.hostname + ":" + this.ListenAddr.split(":").pop();
        }
    },
    methods: {
        getSubscriberCount(item) {
            if (
                this.currentStream &&
                this.currentStream.StreamPath == item.StreamPath
            ) {
                this.currentStream = item;
            }
            return item.SubscriberInfo ? item.SubscriberInfo.length : 0;
        },
        preview(index, row, event) {
            this.currentStream = row;
            this.onPlay("ws://" + this.host + "/" + row.StreamPath);
        },
        onPlay(url) {
            this.showPreview = true;
            this.$nextTick(() => this.$refs.jessibuca.play(url));
        },
        SoundFormat(soundFormat) {
            return SoundFormat[soundFormat];
        },
        CodecID(codec) {
            return CodecID[codec];
        },
        SoundRate(rate) {
            return rate > 1000 ? rate / 1000 + "kHz" : rate + "Hz";
        },
        onShowDetail(item) {
            this.showSubscribers = true;
            this.currentStream = item;
        },
        fetchSummary() {
            summaryES = new EventSource("/api/summary");
            summaryES.onmessage = evt => {
                if (!evt.data) return;
                let summary = JSON.parse(evt.data);
                summary.Address = location.hostname;
                if (!summary.Rooms) summary.Rooms = [];
                summary.Rooms.sort((a, b) =>
                    a.StreamPath > b.StreamPath ? 1 : -1
                );
                this.Rooms = summary.Rooms;
            };
        }
    },
    mounted() {
        console.log(this);
        this.fetchSummary();
    },
    destroyed() {
        summaryES.close();
        this.$refs.jessibuca.destroy();
    }
};
</script>

<style scoped>
td {
    padding-left: 5px;
    padding-right: 5px;
}

.empty {
    color: #eb5e46;
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>