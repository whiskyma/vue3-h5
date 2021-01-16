<template lang="pug">
    .v-footer
        li
            router-link(to='/',exact)
                i.icon-home
                span 首页
        li
            router-link(to='/find')
                i.icon-find
                span 发现
        li
            router-link(:to="token?'/activity':'/register'")
                i(:class="token?'icon-huodong':'icon-register'")
                span {{token?'活动':'注册'}}
        li
            router-link(to='/shop')
                i.icon-shop
                span 商城
        li(v-if='!token')
            a(href='javascript:;',@click="$store.commit('SET_LOGINPOP',true)")
                i.icon-center
                span 登录
        li(v-else)
            router-link(to='/center')
                i.icon-center
                span 我的
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters(['token'])  
        },
        data () {
            return {

            }
        },
        mounted(){
            
        },
        watch:{
            
        },
        methods:{           
                   
        }
    }
</script>

<style lang="stylus" scoped>

</style>
