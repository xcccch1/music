<template>
  <div>
    <img :src="imgUrl" />
    <p>{{ text ? this.text : "等待扫码" }}</p>
  </div>
</template>

<script>
import {
  getKeyAPI,
  createQrAPI,
  checkQrStatusAPI,
  checkLoginStatusAPI,
} from "@/api/index";
import {setCookie } from "@/js-cookie/index";

export default {  
  data() {
    return {
      key: "",
      imgUrl: "",
      text: "",
    };
  },
  methods: {
    // 获取二维码
    async createQr() {
      const res = await getKeyAPI();
      this.key = res.data.data.unikey;
      const res1 = await createQrAPI(this.key);
      this.imgUrl = res1.data.data.qrimg;
    },

    checkQr() {
      this.timer = setInterval(async () => {
        const res3 = await checkQrStatusAPI(this.key);
        this.text = res3.data.message;
        if (res3.data.code === 800) {
          this.createQr();
          clearInterval(this.timer);
        }
        if (res3.data.code === 802) {
          this.$toast.loading({
            message: this.text,
            forbidClick: true,
          })
        }
        if (res3.data.code === 803) {
          clearInterval(this.timer);
          this.text = res3.data.message;
          this.$toast.success(this.text);
          const cookieobj = this.handleCookie(res3.data.cookie);
          setCookie("cookie",JSON.stringify(cookieobj))
          const userinfo = await checkLoginStatusAPI(res3.data.cookie);
          this.$store.dispatch("userid",userinfo.data.data.account.id);
          this.$store.commit("LOGINSTATUS", true);
          const info = {avatarUrl:userinfo.data.data.profile.avatarUrl,nickname:userinfo.data.data.profile.nickname}
          setCookie("info",JSON.stringify(info))
          this.$router.push({
            path:"/layout"
          });
        }
      }, 3000);
    },
    // 返回cookie过大，处理cookie
    handleCookie(str){
      const obj = {}
      str.split(";").forEach((element)=>{
      const item = element.trim().split("=");
      item.length<2 ? obj[item[0]] = item[0]: obj[item[0]] = item[1]
    })
    return obj
    }
  },
  activated() {
    this.createQr();
    this.checkQr();
  },
  deactivated() {
    clearInterval(this.timer);
  },
};
</script>

<style>
</style>