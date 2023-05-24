<template>
  <div>
    <!-- <van-nav-bar :title="title" fixed /> -->
    <div class="header" :style="`opacity:${opacity}`">
      <div v-show="isshow" :style="headerTitle">
        <van-image
          width="0.8rem"
          height="0.8rem"
          :src="info.avatarUrl"
          round
          cover
          style="vertical-align: middle"
        />
        <span>{{info.nickname}}</span>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar
      v-model="active"
      route
      active-color="#E84854"
      inactive-color="#8F8E93"
      :border= false
    >
      <van-tabbar-item icon="home-o" replace to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" replcae to="/layout/search"
        >搜索</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" replcae to="/layout/user"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { getCookie } from '@/js-cookie';
export default {
  created() {
    this.info = JSON.parse(getCookie("info"))
  },
  data() {
    return {
      active: 0,
      title: "",
      isshow:false,
      opacity:0,
      headerTitle:{
        transform:"translateY(-0.1rem)"
      },
      info:{}
    };
  },
  mounted(){
    window.addEventListener("scroll",this.scrollevent)
  },
  methods: {
    scrollevent() {
      this.opacity = window.pageYOffset * (1/46)
      if (window.pageYOffset >= 46) {
        this.isshow = true;
        this.headerTitle.transform = "translateY(0.1rem)"
      } else {
        this.isshow = false;
      }
    },
  },
  computed: {},
  watch: {
    $route: {
      handler(NewVal) {
        this.title = NewVal.meta.title;
      },
    },
  },
};
</script>

<style lang="less" scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 1.11rem;
  padding-bottom: 50px;
}

.header {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.11rem;
  text-align: center;
  vertical-align: middle;
  background-color: #151515;
  z-index: 1;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: title 0.3s  1 forwards;
    span {
      font-size: 0.4rem;
    }
  }

  @keyframes title {
    from{
      transform: translateY(-0.1rem);
    }

    to{
      transform: translateY(0rem);
    }
  }
}
</style>
