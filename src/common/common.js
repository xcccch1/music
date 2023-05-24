import { checkLoginStatusAPI } from "@/api";


export const getuserinfo = async() => {
    const userinfo = await checkLoginStatusAPI(res3.data.cookie);
    this.$store.dispatch("userid", userinfo.data.data.account.id);
    this.$store.commit("USERINFO", userinfo)
    this.$store.commit("LOGINSTATUS", true);
}