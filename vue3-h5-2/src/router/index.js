import Vue from 'vue'
import store from '@js/store'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export const imp = (path, url) => {
    if(url){
        return () => import(`@com/${path}`)
    }else{
        return () => import(`@pon/${path}`)
    }
}


Vue.use(Router)
// routes配置说明  f:路由下标(是否需要底部,true需要底部), c:是否显示头部里的图标, r:路由是否需要登录
const routes = [
    {path:'/', name:'首页', component:imp('home'), meta:{c1:true,f:true}},
    {path:'/find', name:'发现', component:imp('find'), meta:{f:true}},
    {path:'/activity', name:'活动', component:imp('activity')},
    {path:'/shop', name:'商城', component:imp('shop'), meta:{f:true}},
    {path:'/login', name:'登录', component:imp('login')},
    {path:'/register', name:'注册', component:imp('register')},
    {path:'/notice', name:'公告', component:imp('notice')},
    {path:'/kefu', name:'在线客服', component:imp('kefu'), meta:{c2:true}},
    {path:'/center', name:'个人中心', component:imp('center/center'), meta:{r:true,c1:true,f:true}},
    {path:'/center/setting', name:'设置', component:imp('center/setting/setting')},
    {path:'/center/logpwd', name:'登录密码', component:imp('center/setting/logpwd')},
    {path:'/center/record', name:'记录', component:imp('center/record')},
    {path:'/center/complate', name:'完成', component:imp('center/complate')},


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
            next({
                path: '/',
                query: {redirect: to.fullpath}
            })
        }
    }else{
        next();
    }
    if(to.name){
        document.title = to.name
    }
})

export default router
