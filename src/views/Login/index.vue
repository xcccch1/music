<template>
  <div style="text-align: center">
    <keep-alive>
      <router-view style="margin-top: 100px"></router-view>
    </keep-alive>
    <div class="modelist">
      <van-divider
        :style="{ color: '#1989fa', borderColor: 'hwb(0deg 57% 43%)', padding: '0 16px' }"
      >
        <van-button color="#212121" round  size="normal" to="/code" >
          <span class="iconfont icon-shoujihaoma"></span>
        </van-button>
        <van-button color="#212121" round size="normal" to="/qr">
          <span class="iconfont icon-erweima"></span>
        </van-button>
        <van-button color="#212121" round size="normal" to="/pw">
          <span class="iconfont icon-youxiang"></span>
        </van-button>
      </van-divider>
    </div>
  </div>
</template>

<script>
import { getCookie, setCookie} from "@/js-cookie/index";


export default {
  data() {
    return {};
  },
  created() {
    this.checkCookie();
    // const cookiearr =  a.split(";")
    // cookiearr.forEach((element)=>{
    //   const item = element.trim().split("=");
    //   if(item.length<2){
    //     obj[item[0]] = item[0]
    //   }else{
    //     obj[item[0]] = item[1]
    //   }
    // })
    // console.log(obj);
    // setCookie("cook",JSON.stringify(obj))
  },
  methods: {
    // 检查cookie是否存在，存在跳转首页
    checkCookie() {
      if (getCookie("cookie")) {
        this.$router.push("/layout/home");
      }
    },
  }

};
</script>

<style scoped>
.box {
  text-align: center;
}

.modelist {
  margin-top: 100px;
}

.modelist .van-button {
  margin: 0 10px;
}
</style>