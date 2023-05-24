<template>
  <div>
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo && songInfo.al && songInfo.al.picUrl
      }?imageView&thumbnail=360y360&quality=75&tostatic=0);`"
    ></div>
    <!-- 播放页头部导航 -->
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-incon"
        @click="$router.back()"
      />
    </div>
    <!-- 留声机 - 容器 -->
    <div class="song-wrapper">
      <!-- 留声机本身(靠css动画做旋转) -->
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`"
      >
        <div class="song-img">
          <!-- &&写法是为了防止报错, 有字段再继续往下访问属性 -->
          <img
            style="width: 100%"
            :src="`${
              songInfo && songInfo.al && songInfo.al.picUrl
            }?imageView&thumbnail=360y360&quality=75&tostatic=0`"
            alt=""
          />
        </div>
      </div>
      <!-- 播放按钮 -->
      <div class="start-box" @click="audioStart">
        <span class="song-start" v-show="!playState"></span>
      </div>
      <!-- 播放歌词容器 -->
      <div class="song-msg">
        <!-- 歌曲名 -->
        <h2 class="m-song-h2">
          <span class="m-song-sname"
            >{{ songInfo.name }}-{{
              songInfo && songInfo.ar && songInfo.ar[0].name
            }}</span
          >
        </h2>
        <!-- 歌词部分-随着时间切换展示一句歌词 -->
        <div>
          <div
            class="lrcContent"
            ref="lrcContent"
            style="transform: tranlateY(100px)"
          >
            <div
              class="lrc"
              ref="lrc"
              v-for="(item, index) in lyricNewArr"
              :key="index"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
      <!-- 留声机 - 唱臂 -->
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>
    <audio
      ref="audio"
      autoplay
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
      controls
      @timeupdate="timeupdate"
      style="display: none"
    ></audio>
  </div>
</template>

<script>
import { getSongByIdAPI, getLyricByIdAPI } from "@/api/index";
let index2 = 0;

export default {
  data() {
    return {
      songInfo: "",
      playState: true,
      id: "",
      lyricNewArr: [],
      totalTime:0,
      currentTime: 0,
      nowTime:0,
      nowlength: 0,
      element:{},

    };
  },
  async created() {
    this.id = this.$route.query.id;
    const [songInfo, lyric] = await Promise.all([
      getSongByIdAPI(this.id),
      getLyricByIdAPI(this.id),
    ]);
    console.log(songInfo);
    this.songInfo = songInfo.data.songs[0];
    this.test(lyric);
  },
  mounted(){
    this.element = this.$refs
    console.log(this.element.audio.duration);
    this.totalTime = this.element.audio.duration
    console.log(this.element.audio);
  },
  methods: {
    audioStart() {
      this.playState = !this.playState;
    },
    curLyric() {},
    test(lyric) {
      const lyricArr = lyric.data.lrc.lyric.split("\n");
      const lyricNewArr = [];
      lyricArr.forEach((element) => {
        const obj = {};
        obj.time = this.getTime(element);
        obj.text = element.slice(element.indexOf("]") + 1);
        lyricNewArr.push(obj);
      });
      this.lyricNewArr = lyricNewArr;
    },
    // 提取时间字符串转为数值 s
    getTime(element) {
      const timeStr = element.slice(
        element.indexOf("[") + 1,
        element.indexOf("]")
      );
      const first = parseInt(timeStr.slice(0, timeStr.indexOf(":"))) * 60;
      const sec = timeStr.slice(timeStr.indexOf(":") + 1) * 1;
      return first + sec;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      this.lyricNewArr.forEach((item, index) => {
        if (
          item.time <= e.target.currentTime &&
          e.target.currentTime <= this.lyricNewArr[index + 1].time
        ) {
          this.$refs.lrc[index].className = "active lrc";
          if (index == index2) {
            index2++;
            if (index > 2) {
              let movelength =
                this.$refs.lrc[index].offsetTop -
                this.$refs.lrc[index - 1].offsetTop;
              const newlength = (this.nowlength += movelength);
              this.move(newlength);
            }
          }
        } else {
          this.$refs.lrc[index].className = "lrc";
        }
      });
    },
    move(newlength) {
      this.$refs.lrcContent.scrollTo({ top: newlength, behavior: "smooth" });
    }
  },
  watch: {
    playState: {
      handler(newvalue) {
        return newvalue ? this.$refs.audio.play() : this.$refs.audio.pause();
      },
    },
    currentTime:{
      handler(newvalue){
        this.nowTime =  newvalue/this.totalTime * 100; 
      }
    }
  },
  computed: {
    needleDeg() {
      return this.playState ? "-7deg" : "-38deg";
    },
    
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  height: 50px;
}

.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100vh;
  /* transform: scale(1.5); */
  transform-origin: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px);
  /*模糊背景 */
}

.song-bg::before {
  /*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.song-wrapper {
  position: fixed;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 10001;
}

.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}

.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}

.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}

.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lrcContent {
  margin-top: 50px;
  height: 35vh;
  overflow: scroll;
}

.lrc {
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 3vh;
}

.lrcContent::-webkit-scrollbar {
  width: 0 !important;
}

.left-incon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}

.ani {
  animation: turn 10s linear infinite;
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.active {
  font-size: 20px;
}
</style>
