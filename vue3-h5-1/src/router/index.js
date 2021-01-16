import Vue from 'vue'
import store from '@js/store'
import Router from 'vue-router'
import { setStr } from '../utils/com'

export const imp = (path, url) => {
    if(url){
        return () => import(`@com/${path}`)
    }else{
        return () => import(`@pon/${path}`)
    }
}

Vue.use(Router)
// routes配置说明  n:路由下标(判断左右滑动方向), c:是否显示头部里的图标, r:路由是否需要登录
const routes = [
    {
        path: '/',
        component: imp('comTransition',1),
        children: [
            {path:'/', name:'首页', component:imp('home'), meta:{c1:true}},
            {path:'/find', name:'发现', component:imp('find')},
            {path:'/activity', name:'活动中心', component:imp('activity'), meta:{n:1,r:true}},
            {path:'/shop', name:'积分商城', component:imp('shop')},
            {path:'/kefu', name:'在线客服', component:imp('kefu'), meta:{n:1,c2:true}},
            {path:'/register', name:'注册', component:imp('register'), meta:{n:1}},
            {path:'/notice', name:'公告', component:imp('notice'), meta:{n:2}},
            {path:'/center', name:'个人中心', component:imp('center/center'), meta:{r:true,c1:true}},
            {path:'/center/setting', name:'设置', component:imp('center/setting/setting'), meta:{n:2}},
            {path:'/center/logpwd', name:'登录密码', component:imp('center/setting/logpwd'), meta:{n:3}},
            {path:'/center/record', name:'记录', component:imp('center/record'), meta:{n:3}},
            {path:'/center/complate', name:'完成', component:imp('center/complate'), meta:{n:4}},
        ]
    },


    {path: '*/', redirect: '/'}

]

const router = new Router({
    // mode: 'history',
    routes,
    linkActiveClass: 'act',
    linkExactActiveClass: 'act',
    scrollBehavior (to, from, savedPosition) {
        if (/^\/(home|service)$/.test(to.path)) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    }
})

router.beforeEach((to, from, next) => {
    if(to.meta.r){
        if(store.getters.token){
            next();
        }else{
            store.commit('SET_LOGINPOP', true)
            // next({
            //     path: '/',
            //     query: {redirect: to.fullpath}
            // })
        }
    }else{
        next();
    }
    if(to.name){
        document.title = to.name
    }
})

export default router
