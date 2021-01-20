<template lang="pug">
    .v-footer(v-if="")
        li(v-for="(it,inx) in menu", :key="inx", @click="$link(it.url)", :class="{'act':$route.path==it.url}")
            i(:class="it.ico")
            span {{it.txt}}
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters(['token'])
        },
        data () {
            return {
                menu: [{
                    txt: '首页',
                    ico: 'icon-home',
                    url: '/'
                },{
                    txt: '发现',
                    ico: 'icon-find',
                    url: '/find'
                },{
                    txt: !this.$store.getters.token?'注册':'活动',
                    ico: !this.$store.getters.token?'icon-register':'icon-huodong',
                    url: !this.$store.getters.token?'/register':'/activity'
                },{
                    txt: '商城',
                    ico: 'icon-shop',
                    url: '/shop'
                },{
                    txt: !this.$store.getters.token?'登录':'我的',
                    ico: 'icon-center',
                    url: !this.$store.getters.token?'/login':'/center'
                }]
            }
        },
        mounted(){

        },
        watch: {
            token(val){
                // console.log('asfa')
            }
        },
        methods:{
                   
        }
    }
</script>

<style lang="stylus" scoped>

</style>
