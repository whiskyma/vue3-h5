import axios from 'axios'
import store from '@js/store'
import router from '@/router'
import qs from 'qs'
import { toast, jiaMi } from '@js/com'
import { Indicator } from 'mint-ui';

const service = axios.create({
    baseURL: CONFIG.api,
    timeout: 30000
});

service.interceptors.request.use(
    config => {
        config.headers.channel = 1;
        // config.headers.fbi = jiaMi();
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        if(/(\/hd\/|\/static_db\/)/.test(config.url)){
            config.headers.ContentType = "text/plain"
            config.baseURL = CONFIG.cdn;
        }
        config.data = config.data?qs.stringify(config.data):'';
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        return config;
    },
    error => {
        Indicator.close();
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    res => {
        Indicator.close();
        if(res.status === 200){
            if(res.data.resCode&&res.data.resCode===1){
                return Promise.resolve(res.data.resObj?res.data.resObj:res.data);
            }else{
                toast(res.data.msg);
                return Promise.reject(res.data);
            }
        }else{
            return Promise.reject(res.data);
        }
    },
    error => {
        // console.log(error.response)
        Indicator.close();
        if(error&&error.response){
            switch (error.response.status) {
                case 401:
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // })
                    router.push('/');
                    store.dispatch('clearAll');
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    router.push("/");
                    store.dispatch('clearAll');
                    error.message = '登录超时,请重新登录';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                default:
                    error.message = `连接错误状态码: ${error.response.status}`
            }
        } else {
            error.message = '连接服务器失败';
        }
        toast(error.message);
        return Promise.reject(error.response);
	}
);


export default service;
