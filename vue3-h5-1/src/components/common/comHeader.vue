<template lang="pug">
    .v-header
        h3 {{$route.name}}
        i.lt.icon-left(v-if="$route.meta.n>0", @click="back()")
        i.rt.icon-kefu(v-if="$route.meta.c1", @click="$link('/kefu')")
        i.rt.icon-message(v-if="$route.meta.c2", @click="$link('/notice')")
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created(){

        },
        mounted(){
            
        },
        methods:{
            back(){
                let _u = this.$route.query.fromUrl;
                if(window.history.length>1){
                    _u?this.$link(_u):this.$router.go(-1);
                }else{
                    this.$link('/');
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
