<template>
  <div>
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <p class="title">热门歌单</p>
    <van-row gutter="6" style="display: flex;flex-wrap: wrap;">
      <van-col span="8" class="song_name" v-for="item in list" :key="item.id" @click="SongList(item.id)">
        <van-image width="100%" height="3rem" :src="item.picUrl" />
        {{ item.name }}
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <div>
      <SongItem v-for="item in NewSongList" :name="item.name" :author="item.song.artists[0].name" :key="item.id" :picUrl="item.picUrl"
      :id="item.id">
    </SongItem>
    </div>
  </div>
</template>

<script>
import { recommendMusicAPI, getNewSongAPI, getSwipeImgAPI } from "@/api";
import SongItem from '@/components/SongItem'

export default {
  async created() {
    const [swiper,rmusic,newsong] = await Promise.all([getSwipeImgAPI({ limit: 6 }),recommendMusicAPI({ limit: 6 }),getNewSongAPI({ limit: 20 })])
    swiper.data.banners.forEach((element) => {
      this.images.push(element.pic);
    });
    this.list = rmusic.data.result
    this.NewSongList = newsong.data.result
  },
  data() {
    return {
      list: [],
      NewSongList: [],
      images: [],
    };
  },
  methods:{
    SongList(id){
      this.$router.push({
        path:"/SongList",
        query:{id:id}
      })
    }
  },
  components:{
    SongItem
  }
};
</script>

<style scoped>
/* 标题 */
/* .title {
  padding: 0.266667rem 0.24rem;
  margin: 0;
  background-color: rgba(1, 1, 1, 0);
  font-size: 0.5rem;
} */
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 3; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

.swiper,
img {
  width: 100%;
  height: 3.9rem;
}
.swiper {
  border-radius: 7%;
}

.van-image {
  border-radius: 0.3rem;
  overflow: hidden;
}

.van-cell {
  background-color: rgba(1, 1, 1, 0);
  color: white;
}

</style>

