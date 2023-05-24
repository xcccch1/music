<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getCookie, setCookies } from "@/js-cookie";
import {mapMutations} from "vuex"
export default {
  name: "App",
  methods:{
    ...mapMutations(["USERID","LOGINSTATUS"])
  },
  created() {
    const now = new Date().getTime();
    // 从缓存中获取用户上次退出的时间戳
    const leaveTime = parseInt(localStorage.getItem("leaveTime"), 10);
    // 判断是否为刷新，两次间隔在5s内判定为刷新操作
    const refresh = now - leaveTime <= 5000;
    // 测试alert
    // alert(refresh ? '刷新' : '重新登陆');
    if (refresh) {
      if (getCookie("cookie")) {
        setCookies({cookie:getCookie("cookie"),userid:getCookie("userid")},"Session");
        this.USERID(getCookie("userid"))
        this.LOGINSTATUS(true)
      }
    }
  },
  mounted() {
    // 监听浏览器刷新或关闭，若关闭cookie5分钟后失效
    window.addEventListener("unload", () => {
      localStorage.setItem("leaveTime", new Date().getTime());
      if (getCookie("cookie")) {
        setCookies({cookie:getCookie("cookie"),userid:getCookie("userid")});
      }
    });
  },
};
</script>

<style>
</style>
