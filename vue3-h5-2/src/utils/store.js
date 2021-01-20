import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { get, post, setStr, getStr, removeStr } from './com'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
        token: getStr('token'),
        getInfo: getStr('getInfo'),
	},
	mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_GETINFO: (state, getInfo) => {
            state.getInfo = getInfo;
        },
    },
    getters:{
        token: state => state.token,
        getInfo: state => state.getInfo
    },
    actions: {
        // 拉取个人基本信息
        getInfo({commit}){
            return new Promise((resolve, reject) => {
                get('/my/getMyInfoDetail').then(res => {
                    setStr('getInfo', res);
                    commit('SET_GETINFO', res);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // 清除所有的本地缓存
        clearAll({ commit }) {
            return new Promise((resolve) => {
                removeStr();
                //清除储存在state中的值
                commit('SET_TOKEN', null);
                commit("SET_GETINFO", null);
                SandVS.eventHub.$emit('reload');
                router.push('/');
                // window.location.href = '/';
                resolve();
            })
        }
    }
})

export default store
