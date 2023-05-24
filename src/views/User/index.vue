<template>
  <div class="body">
    <div style="width: 9rem">
      <div class="boxheader"  v-if="isloading">
        <van-image round :src="usertext.avatarUrl" class="headerImage" />
        <div style="transform: translateY(1rem)">
          <h1 style="font-size: 150%">{{ usertext.nickname }}</h1>
          <p style="margin-top: 0.15rem">
            <span>{{ usertext.followeds }}关注</span
            ><span>{{ usertext.follows }}粉丝</span><span>Lv:{{}}</span>
          </p>
        </div>
      </div>
      <div class="box"></div>
      <div class="PlayList">
        <div class="PlayListBox">
          <header class="title">创建歌单({{ playlist.length }}个)</header>
          <template>
            <ul>
              <li
                v-for="(item) in playlist"
                :key="item.id"
                style="margin-bottom: 0.2rem; font-size: 0.4rem"
                @click="songlist(item.id)"
              >
                <van-image
                  width="1.3rem"
                  height="1.3rem"
                  fit="cover"
                  :src="item.coverImgUrl"
                  radius="0.2rem"
                  style="vertical-align: top"
                />
                {{ item.name }}
              </li>
            </ul>
          </template>
        </div>
      </div>
      <van-button
        round
        size="normal"
        to="/pw"
        @click="loginout"
        text="退出登录"
        color="#323232"
        class="outlogin"
        style="margin-bottom:50px"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { loginOutAPI, getUserInfoAPI,getPlayListAPI } from "@/api/index";
import { getCookie, removeAllCookie } from "@/js-cookie/index";
export default {
  data() {
    return {
      isloading: false,
      playlist: [],
    };
  },
  name: "User",
  methods: {
    loginout() {
      loginOutAPI();
      removeAllCookie();
      this.$store.commit("LOGINSTATUS", false);
    },
    songlist(id){
      this.$router.push({
        path:"/songlist",
        query:{
          id:id
        }
      })
    }
  },
  computed: {},
  async created() {
    // const userinfo = await getUserInfoAPI(getCookie("userid"));
    // this.usertext = userinfo.data.profile;
    // this.isloading = true;
    // const res = await getPlayListAPI(getCookie("userid"));
    // this.playlist = res.data.playlist;
    const [userinfo,playlist] = await Promise.all([getUserInfoAPI(getCookie("userid")),getPlayListAPI(getCookie("userid"))]) 
     this.usertext = userinfo.data.profile
     this.isloading = true;
     this.playlist = playlist.data.playlist;
  }
};
</script>

<style>
.PlayList,
.box,
.boxheader,
.outlogin {
  width: 100%;
  background-color: #212121;
  margin-bottom: 20px;
  border-radius: 0.5rem;
}

.boxheader {
  text-align: center;
  position: relative;
  margin-top: 1rem;
  height: 2.5rem;
  font-size: 3vw;
}

.headerImage {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, -50%);
}

.body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.van-button__text {
  color: #e15246;
}

span {
  margin: 0 0.1rem;
}

/* .title {
  font-size: 0.4rem;
  margin: 0.2rem 0;
} */

.PlayList {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.PlayListBox {
  width: 95%;
}
</style>