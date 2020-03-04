<template>
    <div class="layout">
        <Card v-for="item in Rooms" :key="item.StreamPath" class="room">
            <p slot="title">{{typeMap[item.Type]||item.Type}}{{item.StreamPath}}</p>
            <StartTime slot="extra" :value="item.StartTime"></StartTime>
            <p>
                {{SoundFormat(item.AudioInfo.SoundFormat)}} {{item.AudioInfo.PacketCount}}
                {{SoundRate(item.AudioInfo.SoundRate)}} 声道:{{item.AudioInfo.SoundType}}
            </p>
            <p>
                {{CodecID(item.VideoInfo.CodecID)}} {{item.VideoInfo.PacketCount}}
                {{item.VideoInfo.SPSInfo.Width}}x{{item.VideoInfo.SPSInfo.Height}}
            </p>
            <ButtonGroup size="small">
                <Button @click="onShowDetail(item)" icon="ios-people">{{getSubscriberCount(item)}}</Button>
                <Button v-if="item.Type" @click="preview(item)" icon="md-eye"></Button>
                <!-- <Button
                    @click="stopRecord(item)"
                    class="recording"
                    v-if="isRecording(item)"
                    icon="ios-radio-button-on"
                ></Button>
                <Button @click="record(item)" v-else icon="ios-radio-button-on"></Button>-->
            </ButtonGroup>
        </Card>
        <div v-if="Rooms.length==0" class="empty">
            <Icon type="md-wine" size="50" />没有任何房间
        </div>
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
let summaryES = null;
export default {
    components: {
        Jessibuca,
        Subscribers
    },
    props: {
        listenaddr: String
    },
    data() {
        return {
            showPreview: false,
            currentStream: null,
            showSubscribers: false,
            typeMap: {
                Receiver: "📡",
                FlvFile: "🎥",
                TS: "🎬",
                HLS: "🍎",
                "": "⏳",
                Match365: "🏆",
                RTMP: "🚠"
            },
            Rooms: []
        };
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
        preview(item) {
            this.currentStream = item;
            this.$nextTick(() =>
                this.$refs.jessibuca.play(
                    "ws://" +
                        location.hostname +
                        ":" +
                        this.listenaddr.split(":").pop() +
                        "/" +
                        item.StreamPath
                )
            );
            this.showPreview = true;
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
        this.fetchSummary();
    },
    deactivated() {
        summaryES.close();
        this.$refs.jessibuca.destroy();
    }
};
</script>

<style>
@import url("/iview.css");
.layout {
    padding-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
}
.empty {
    color: #eb5e46;
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>