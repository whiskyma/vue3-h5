<template lang="pug">
    div
        p {{$route.name}}
        h3(@click="$link('/center/record')") 跳转记录页面
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created(){},
        mounted(){
            // console.log(this.$store)
        },
        methods:{
            
        },
        beforeRouteEnter(to, from, next){
            next();
        }
    }
</script>

<style lang="stylus" scoped>

</style>
