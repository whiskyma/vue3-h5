import Vue from 'vue'
import { validatName, validatPwd } from '@/utils/validate'
import router from '@/router'
import axios from 'axios'
import request from './http'
import { Toast } from 'mint-ui'

// 引入FBI
// import Fingerprint2 from "fingerprintjs2"
// import CryptoJS from "crypto-js"

// 封装一些错误状态码
export const code = val => {
    let mapCode = {
        // 登录和注册提示语
        10001: "用户未登录",
        10002: "用户名格式错误",
        10003: "用户名已存在",
        10004: "手机号已存在",
        10005: "手机验证码错误",
        10006: "用户名不合法",
        10007: "手机号不合法",
        10008: "密码不合法",
        10009: "注册次数过多",
        10011: "邮箱不合法",
        10012: "旧密码不正确",
        10013: "手机验证码发送频率过快",
        10014: "手机验证码发送次数达到每日上限",
        10015: "连续登录失败次数过多，锁定账户",
        10016: "用户不存在",
        10017: "获取当前用户信息为空",
        10018: "用户名或密码错误",
        10019: "验证码不正确",
        10020: "手机号已验证",
        "-2": "验证码错误",
        'msg': '服务器通讯故障',
        // 游戏转账提示语
    }
    return mapCode[val]
}

// 时间戳对象转换为日期格式
export const formatDate = value => {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

// 去掉字符串所有空格,转小写
export const trim = val => {
    return val&&val.replace(/\s/g, "").toLowerCase();
}

// 60s倒计时
export const count = val => {
    let hour = 10;
    let ele = val&&document.getElementById(val);
    window.timer = setInterval(() => {
        hour--;
        ele.innerHTML = '倒计时' + hour + ' s';
        ele.disabled = true;
        if (hour <= 0) {
            ele.disabled = false;
            ele.innerHTML = '重新获取';
            clearInterval(window.timer)
        }
    }, 1000);
}

// 跳转路由
export const link = url => {
    if(!url) return;
    /^http/.test(url)?window.open(url):router.push(url);
}

// toast封装
export const toast = (msg, type) => {
    Toast({
        message: msg,
        iconClass: type=='success'?'icon icon-home':type=='loadding'?'icon icon-class':'',
        duration: 2000
      });
}

// 公共图片方法
export const imgBg = url => {
    if (!url) return;
    if(!/^(http|https)/.test(url)){
        url = CONFIG.cdn+url;
    }
    return url;
    // return 'background-image: url('+url+')';
}

// localStorage--存值
export const setStr = (key, value) =>{
    if(typeof(value) === 'object'){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value)
}

// localStorage--取值
export const getStr = value => {
    let data = localStorage.getItem(value)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

// localStorage--清除
export const removeStr = key =>{
    key?localStorage.removeItem(key):localStorage.clear();
}

/// get请求方法
export const get = (url, param) =>{
    if(param){
        let nd="?";
        let xx = Object.entries(param);
        xx.forEach((val) => {
            if(val[1] || val[1] == 0){
                nd+=val[0]+'='+val[1]+'&'
            }
        });
        url = url+nd.replace(/&$/,'');
    }
    return request({url: url, method: 'get'})
}

// post请求方法
export const post = (url, param) =>{
    return request({url: url, method: 'post', data: param})
}

// FBI处理
export const jiaMi = () =>{
    let deviceId = localStorage.getItem('defmi')||null;
    Fingerprint2.getV18({
        preprocessor: null,
        audio: {
            timeout: 1000,
            // 在iOS 11上，音频上下文只能用于响应用户交互。我们要求用户在iOS 11上显式启用音频指纹https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
            excludeIOS11: true
        },
        fonts: {
            swfContainerId: 'fingerprintjs2',
            swfPath: 'flash/compiled/FontList.swf',
            userDefinedFonts: [],
            extendedJsFonts: false
        },
        screen: {
            // 当用户旋转移动设备时确保指纹一致
            detectScreenOrientation: true
        },
        plugins: {
            sortPluginsFor: [/palemoon/i],
            excludeIE: false
        },
        extraComponents: [],
        excludes: {
            // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
            'enumerateDevices': true,
            // 取决于浏览器缩放
            'pixelRatio': true,
            //取决于某些浏览器的隐身模式
            'doNotTrack': true,
            // 已经使用JS字体
            'fontsFlash': true
        },
        NOT_AVAILABLE: 'not available',
        ERROR: 'error',
        EXCLUDED: 'excluded'
    }, function (result, components) {
        // console.log('指纹一');//结果是哈希指纹
        // console.log(result);//结果是哈希指纹
        // console.log(JSON.stringify(components));//组件是{key：'foo'的数组，值：'组件值'}
        // deviceId = Fingerprint2.x64hash128(components.join(''), components.length-1);
        deviceId = result;
        localStorage.setItem('defmi',deviceId);
        // console.log('指纹二');//结果是哈希指纹
        // console.log(deviceId);
    });
    
    let decrypt = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify({
        a: Date.now()+parseInt(localStorage.getItem('serverTime')||0),
        b: CONFIG.sign,
        c: parseInt(Math.random()*5e6),
        d: deviceId
    })), CryptoJS.enc.Utf8.parse("0421AC1F30CC4D45"), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return decrypt.toString()
}