import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Play from '@/views/Play'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Pw from '@/views/Login/pw.vue'
import Qr from '@/views/Login/qr.vue'
import User from '@/views/User'
import SongList from "@/views/SongList"
import Code from "@/views/Login/code.vue"
import { getCookie } from "@/js-cookie"
import { requestArr} from "@/utils/request";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Login,
            redirect: '/code',
            children: [
                { path: 'qr', component: Qr, meta: { islogin: true } },
                { path: 'pw', component: Pw, meta: { islogin: true } },
                { path: 'code', component: Code, meta: { islogin: true } }
            ]
        },
        {
            path: '/layout',
            redirect: '/layout/home',
            component: Layout,
            children: [
                { path: 'home', component: Home, meta: { title: '首页' } },
                { path: 'search', component: Search, meta: { title: '搜索' } },
                { path: 'user', component: User, meta: { title: '我的' } }
            ]
        },
        { path: '/play', name: 'play', component: Play },
        { path: '/songlist', name: 'songlist', component: SongList }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.islogin == true) {
        next();
    } else {
        if (getCookie("cookie")) {
            next();
        } else {
            next("/code")
        }
    }
})

export default router