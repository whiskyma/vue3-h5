<template lang="pug">
    transition(:name="transitionName")
            router-view.v-section
</template>

<script>

export default {
    data () {
        return {
            transitionName: ''
        }
    },
    computed: {
        
    },
    watch: {
        $route(to, from) {
            let toN = to.meta.n||0;
            let fromN = from.meta.n||0;
            if(toN > 0){
                if( toN < fromN){
                    this.transitionName = 'slide-right';
                }else{
                    this.transitionName = 'slide-left';
                }
            }else if(toN == 0 && fromN > 0){
                this.transitionName = 'slide-right';
            }else if(toN == 0) {
                this.transitionName = 'display';
            }
        }
    }
}
</script>
<style lang="stylus">
.slide-right-enter
    opacity: 0;
    transform: translate3d(-100%,0,0);
.slide-right-leave-active
    opacity: 0;
    transform: translate3d(100%,0,0);
.slide-left-enter
    opacity: 0;
    transform: translate3d(100%,0,0);
.slide-left-leave-active
    opacity: 0;
    transform: translate3d(-100%,0,0);
.v-section
    absolute()
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .4s ease;
// display
.display-enter,.display-leave-active
    opacity: 0
.display-enter-active,.display-leave
    transition: all .4s ease
    -moz-transition: all .4s ease
    -webkit-transition: all .4s ease
    -o-transition: all .4s ease
</style>
