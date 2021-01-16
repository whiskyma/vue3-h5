<template lang="pug">
    div
       comBanner(:bannerList='wapBanner')
       comNotice(:noticeList='news')
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import comBanner from '@com/comBanner'
    import comNotice from '@com/comNotice'
    export default {
        components: {
            comBanner,
            comNotice
        },
        data () {
            return {
                wapBanner: null,
                news: null,
                news: [{
                    title: '系统公告',
                    announcementTypeName: '最新公告',
                    content: '1, 尊敬的各位来宾,大家上午好,请认真配合检查部门防疫检查工作,随时佩戴口罩,谢谢大家的配合!!!'
                },{
                    title: '站内信',
                    announcementTypeName: '最新公告',
                    content: '2, 尊敬的各位同胞,大家上午好,法法师发撒旦法撒旦法撒旦法是的发斯蒂芬dfsdf打发大水发的阿道夫'
                }],
                wapBanner: [{
                    imageUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
                    url: 'https://www.hao123.com/'
                },{
                    imageUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                    url: 'https://www.hao123.com/'
                }]
            }
        },
        created(){
            // this.getWapBanner();
        },
        mounted(){
            
        },
        methods:{
            getWapBanner(){
                this.$get('/home/getWapBanner').then(res => {
                    this.wapBanner = res.wapBanner;
                    this.news = res.news;
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
