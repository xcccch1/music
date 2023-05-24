<template>
  <div>
    <div>
      <div v-if="loginMode">账号密码</div>
      <div v-else>
        <img :src="imgUrl" />
        <p>{{ text ? this.text : "等待扫码" }}</p>
      </div>
    </div>
    <div class="modelist">
      <button @click="qrLogin">二维码登录</button>
      <button @click="loginMode = true">返回账号密码登录</button>
    </div>
  </div>
</template>

<script>
import {
  getKeyAPI,
  createQrAPI,
  checkQrStatusAPI,
  checkLoginStatusAPI,
} from "@/api/index";

import { getCookie, setCookie, removeCookie } from "@/js-cookie/index";


export default {
  data() {
    return {
      loginMode: true,
      userID: "",
    };
  },
  created() {
 
  },
  methods: {
    // 获取二维码
    async createQr() {
      const res = await getKeyAPI();
      this.key = res.data.data.unikey;
      const res1 = await createQrAPI(this.key);
      this.imgUrl = res1.data.data.qrimg;
    },
    // 检查二维码状态
    async checkQrStatus() {
      let timer = setInterval(async () => {
        const res3 = await checkQrStatusAPI(this.key);
        this.text = res3.data.message;
        if (res3.data.code === 800) {
          clearInterval(timer);
        }
        if (res3.data.code === 803) {
          clearInterval(timer);
          this.text = res3.data.message;
          setCookie("cookie", res3.data.cookie);
          const userinfo = await checkLoginStatusAPI(res3.data.cookie);
          this.userID = userinfo.data.data.account.id;
          this.$router.push("/layout/home");
        }
      }, 3000);
    },
    // 二维码登录
    qrLogin() {
      this.createQr();
      this.checkQrStatus();
      this.loginMode = false;
    },
    // 关闭浏览器后设置cookie5分钟后失效
     checkLoginStatus() {
      if (getCookie("cookie")) {
        this.$router.push("/layout/home");
      }
    },
  },
  created() {
    this.checkLoginStatus();
  },
};
</script>

<style scoped>
.modelist {
  position: fixed;
  bottom: 20%;
}
</style>