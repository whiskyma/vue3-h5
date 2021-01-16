<template lang="pug">
    #app
        header
            comHeader
        section(:class="{fixed:$store.state.loginPop}")
            router-view
        footer(:class="{act:$route.meta.n>0}")
            comFooter
        .loginPop(:class="{loginAct:$store.state.loginPop}")
            login
</template>

<script>
import comFooter from '@com/comFooter'
import comHeader from '@com/comHeader'
import login from '@pon/login'

export default {
    name: 'app',
    components: {
        comFooter,
        comHeader,
        login
    },
    data(){
        return {

        }
    },
    mounted(){
        // this.listSysConfig();
    },
    methods: {
        listSysConfig(){
            this.$get('/config/listSysConfig').then( res => {
                // console.log(res);
            })
        }
    }
}
</script>

<style lang="stylus">

</style>
