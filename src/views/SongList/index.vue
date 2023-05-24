<template>
  <div>
    <div
      class="song-bg"
      :style="`background-image: url(${
        songinfo && songinfo.coverImgUrl
      }?imageView&thumbnail=360y360&quality=75&tostatic=0);`"
    ></div>
    <div style="position: relative; z-index: 111; width: 100%">
      <div class="header">
        <van-icon
          name="arrow-left"
          size="20"
          class="left-incon"
          @click="$router.back()"
        />
      </div>
      <div class="main">
        <div class="songlist_header">
          <van-image
            width="3rem"
            height="3rem"
            fit="cover"
            :src="songinfo.coverImgUrl"
            radius="10px"
          />
          <span>
            <p>{{ songinfo.name }}</p>
            <p>{{ creator }}</p>
          </span>
        </div>
        <div class="songlist_body">
          <p class="title">歌单列表</p>
          <SongItem
            v-for="item in Songlist"
            :key="item.id"
            :name="item.name"
            :picUrl="item.al.picUrl"
            :id="item.id"
            :author="item.ar[0].name"
          >
          </SongItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
import { getSongListAPI } from "@/api";

export default {
  name: "SongList",
  data() {
    return {
      Songlist: [],
      songinfo: "",
      creator: "",
    };
  },
  components: {
    SongItem,
  },
  async created() {
    const res = await getSongListAPI(this.$route.query.id);
    this.songinfo = res.data.playlist;
    // this.Songlist = res.data.playlist
    this.creator = res.data.playlist.creator.nickname;
    this.Songlist = res.data.playlist.tracks;
  },
}
</script>

<style lang="less" scoped>
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px);
  /*模糊背景 */
}

.header {
  height: 48px;
  width: 100%;
  position: fixed;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 48px;
}

.songlist_header,
.songlist_body {
  width: 90vw;
  margin-top: 2vh;
  border-radius: 10px;
  box-sizing: border-box;
}
.songlist_header {
  padding: 10px;
  display: flex;
  span {
    flex: 1;
    margin-left: 10px;
    // font-size: 0.5rem;
  }

  span {
    p:nth-of-type(1) {
      font-size: 0.5rem;
    }
  }
  span {
    p:nth-of-type(2) {
      margin-top: 10px;
      font-size: 0.4rem;
    }
  }
}
</style>