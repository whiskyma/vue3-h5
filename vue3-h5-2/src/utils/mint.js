import {
    Button,
    Swipe,
    SwipeItem,
    Lazyload,
    InfiniteScroll,
    Spinner
} from 'mint-ui';

const mintui = {
    install: function(Vue){
        Vue.component(Button.name, Button);
        Vue.component(Swipe.name, Swipe);
        Vue.component(SwipeItem.name, SwipeItem);
        Vue.component(Spinner.name, Spinner);
        Vue.use(Lazyload);
        Vue.use(InfiniteScroll);
    }
}

export default mintui