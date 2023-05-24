<template>
  <div style="height: calc(100vh - 100px);">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        @input="inputFn"
      />
    </form>
    <div class="search_wrap" v-if="songList.length === 0">
      <p class="title">热门搜索</p>
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(item, index) in hotArr"
          :key="index"
          @click="fn(item.first)"
        >
          {{ item.first }}
        </span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="(item,index) in songList"
          :key="index"
          :name="item.al.name"
          :author="item.ar[0].name"
          :id="item.id"
          :picUrl="item.al.picUrl"
          ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchSongAPI } from "@/api";
import SongItem from '@/components/SongItem'

export default {
  data() {
    return {
      value: "",
      hotArr: [],
      songList: [], //搜索结果
      loading: false,
      finished: false,
      page:1, //页数
      timer:null //防抖
    };
  },
  created() {
    hotSearchAPI().then((res) => {
      this.hotArr = res.data.result.hots;
    });
  },
  methods: {
    async getListFn(){
      return searchSongAPI({
        keywords:this.value,
        limit:20,
        offset:(this.page -1)*20
      })
    }
    ,
    async fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      const res = await this.getListFn()
      this.songList = res.data.result.songs;
      console.log(res);
      this.loading = false;
    },
    async inputFn(){
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async ()=>{
        this.page = 1;
        this.finished = false;
        if(this.value.length === 0){
          this.songList = [];
          return;
        }
        const res = await this.getListFn();
        if(res.data.result.songs === undefined){
          this.songList = [];
    return
        }
        this.songList = res.data.result.songs;
        this.loading = false;
      },900)
    },
    async onLoad() {
      this.page++;
      const res = await this.getListFn();
      if(res.data.result.songs === undefined){
        this.finished=true;
        this.loading =false;
        return;
      }
      this.songList = [...this.songList,...res.data.result.songs];
      this.loading = false;
    }
  },
  components: {
    SongItem
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}


/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;

  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

</style>
