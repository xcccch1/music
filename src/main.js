import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible.js'
import '@/styles/reset.css'
import router from '@/router'
import '@/plugins/vant/index.js'
import '@/assets/iconfont/iconfont.css'
import "@/styles/common.css"
import store from './store'
import 'vant/lib/index.less'
import "@/mobile/scale"


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')