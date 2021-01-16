<template lang="pug">
    .v-swipe
        mt-swipe(:auto=3000)
            mt-swipe-item(v-for="(it,inx) in bannerList",:key="inx")
                img.v-img(v-lazy="$imgBg(it.imageUrl)", @click="$link(it.url)")
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props:['bannerList'],
        mounted(){

        },
        methods:{

        }
    }
</script>

<style lang="stylus" scoped>

</style>
