<template lang="pug">
    div
        p {{$route.name}}
        h3 当滚动到底部时,自动加载更多数据!!!
        .v-infinite
            ul(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", :infinite-scroll-immediate-check="true", infinite-scroll-distance="10")
                li(v-for="(it,inx) in list", :key="inx") {{it}}
            comLoading(v-if="loading")

</template>

<script>
    import comLoading from '@com/comLoading'
    export default {
        components: {
            comLoading
        },
        data () {
            return {
                loading: false,
                list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            }
        },
        created(){
            
        },
        mounted(){
            
        },
        methods:{
            loadMore(){
                console.log(1)
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 1500);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.v-infinite
    margin 2%
    ul
        li
            height 1rem
            line-height 1rem
            border-bottom 1px solid #ddd
            font-weight: 600;
            text-align: center;
            font-size .3rem
</style>
