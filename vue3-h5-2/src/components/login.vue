<template lang="pug">
    .login-page
        .v-form
            i.icon-user
            input.v-input(type="text",placeholder="请输入用户名",maxLength="12",v-model="uname")
            i.icon-clear(v-if="uname&&uname.length>0",@click="uname=null")
        .v-form
            i.icon-pwd
            input.v-input(:type="pwdTp?'password':'text'",placeholder="请输入密码",maxLength="12",v-model="pwd")
            i(v-if="pwd&&pwd.length>0",@click="pwdTp=!pwdTp",:class="pwdTp?'icon-eye-close':'icon-eye'")
        button.btn.btn-primary(@click="sub") 登录
</template>

<script>
    import { validatName, validatPwd, validaPhone, validatYzm }from '@js/validate'
    import md5 from 'js-md5'
    export default {
        components: {},
        filters:{},
        data () {
            return {
                uname: null,
                pwd: null,
                pwdTp: true,
                token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MTA4Mjg3NjcsInVzZXJJZCI6MTIyMDU0OTQ2NTg4MDQ4OTk4NiwiYWNjb3VudCI6MTIyMDU0OTQ2NTg4MDQ4OTk4Nn0.l7VbkxuafwKLHQj7OAYen7KtjCwBiMZX4030ibRaPOErA_-b9qRYKZBcNUDApmniwp3XGFcr2IgmsItmXKA6eQ'
            }
        },
        created(){},
        mounted(){

        },
        methods:{
            sub(){
                let _uname = this.$trim(this.uname);
                let _pwd = this.$trim(this.pwd);
                if(!_uname||!validatName(_uname)){
                    this.$toast('请输入用户名');
                    return false;
                }else if(!_pwd||!validatPwd(_pwd)){
                    this.$toast('请输入密码');
                    return false;
                }
                this.par = {
                    userName: _uname,
                    passWord: md5(_pwd)
                }
                this.$setStr('token', this.token);
                this.$store.commit('SET_TOKEN', this.token);
                this.$link('/');

                // this.$post('/user/login', this.par).then(res =>{
                //     this.$setStr('token', res.token)
                //     this.$store.commit('SET_TOKEN', res.token)
                //     this.$store.dispatch('getInfo');
                // }).catch(error => {
                //     console.log(error)
                // })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
