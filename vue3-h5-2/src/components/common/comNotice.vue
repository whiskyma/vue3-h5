<template lang="pug">
    .v-notice
        i.icon-notice
        .notice-box(v-if="noticeList")
            ul(:class="{marquee_top: animate}")
                li(v-for="(it,inx) in noticeList", :key="inx", @click="handleClick(it.title, it.content)")
                    p {{it.announcementTypeName}}:&nbsp;&nbsp;{{it.content}}
</template>

<script>
    import { MessageBox } from 'mint-ui'
    export default {
        data () {
            return {
                animate: false,
            }
        },
        props:['noticeList'],
        created(){
            setInterval(this.showMarquee, 2500)
        },
        mounted(){

        },
        methods:{
            showMarquee(){
                this.animate = true;
                if(this.noticeList){
                    setTimeout(() =>{
                        this.noticeList.push(this.noticeList[0]);
                        if(this.noticeList.length>2){
                            this.noticeList.shift();
                        }
                        this.animate = false;
                    }, 500)
                }
            },
            handleClick(msg1, msg2){
                MessageBox({
                    title: msg1,
                    message: `<div class="v-msgbox-cot">${msg2}</div>`,
                    showCancelButton: true,
                    closeOnClickModal: false,
                    confirmButtonText: "更多公告",
                    cancelButtonText: "取消"
                }).then(action => {
                    if(action == 'confirm'){
                        this.$link('/notice');
                    }
                })
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
