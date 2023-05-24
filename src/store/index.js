import { setCookie } from "@/js-cookie"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const actions = {
    userid(context, value) {
        setCookie("userid", value)
        context.commit("USERID", value)
    }
}
const mutations = {
    LOGINSTATUS(state, value) {
        state.LoginStatus = value
    },
    USERID(state, value) {
        state.userID = value
    }
}
const state = {
    LoginStatus: false,
    userID: '',
}

const store = new Vuex.Store({
    actions,
    mutations,
    state
})

export default store