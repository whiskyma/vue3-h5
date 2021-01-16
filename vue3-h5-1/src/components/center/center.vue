<template lang="pug">
    div
        p {{$route.name}}
        //- h3 {{$store.getters.getInfo.userName}}
        button.btn.btn-default(@click="$store.dispatch('clearAll')") 退出登录
        //- button.btn.btn-primary(@click="$store.dispatch('clearAll')") 退出登录
        //- button.btn.btn-yzm(:disabled="true") 发送验证码
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created(){},
        mounted(){
            // this.listBanlance()
        },
        methods:{
            listBanlance(){
                this.$get('/my/listBanlance').then( res => {
                    // console.log(res)
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
