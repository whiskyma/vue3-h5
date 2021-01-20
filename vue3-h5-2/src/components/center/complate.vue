<template lang="pug">
    div
        p {{$route.name}}
        h3(@click="$link('/activity?fromUrl=home')") 跳转活动中心页面
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
