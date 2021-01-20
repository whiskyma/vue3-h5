import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@js/store'

// 引入styl和js
import '@styl/app.styl'
import '@js/index'

// 按需引入组件
import mint from '@js/mint'
Vue.use(mint)


Vue.config.productionTip = false

SandVS = new Vue({
    router,
    store,
    data: {
        eventHub: new Vue()
    },
    render: h => h(App),
}).$mount('#app')