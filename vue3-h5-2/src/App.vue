<template lang="pug">
    #app
        header
            comHeader
        section
            transition(name="slide")
                router-view
        transition(name="slide-foot")
            footer(v-if="$route.meta.f&&isAct")
                comFooter
</template>

<script>
import comFooter from '@com/comFooter'
import comHeader from '@com/comHeader'

export default {
    name: 'app',
    components: {
        comFooter,
        comHeader
    },
    data(){
        return {
            isAct: true
        }
    },
    mounted(){
        // this.listSysConfig();
        this.$root.eventHub.$off('reload').$on('reload',(res) =>{
            this.reload()
        })
    },
    methods: {
        listSysConfig(){
            this.$get('/config/listSysConfig').then( res => {
                // console.log(res);
            })
        },
        reload(){
            this.isAct = false;
            this.$nextTick(() => {
                this.isAct = true;
            })
        }
    }
}
</script>

<style lang="stylus">

</style>
