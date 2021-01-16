<template lang="pug">
    div
        p {{$route.name}}
        h3(@click="$link('/center/complate')") 跳转完成页面
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created(){},
        mounted(){

        },
        methods:{
            
        }
    }
</script>

<style lang="stylus" scoped>

</style>
