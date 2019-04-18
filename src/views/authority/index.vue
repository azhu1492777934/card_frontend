<template>
    <div class="authority-middle-wrap">
        <!--<div class="box">-->
        <!--<div class="loader-14"></div>-->
        <!--</div>-->
        <van-popup :close-on-click-overlay="false" v-model="load_user_msg">
            <p class="showTip">{{load_user_info}}</p>
        </van-popup>
    </div>
</template>

<script>
    import {Dialog, Popup} from 'vant'
    import {_post} from "../../http";
    import {getUrlParam, getStorage, setStorage, removeStorage, codeParam, checkBrowser} from "../../utilies";

    export default {
        name: "index",
        components: {
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
        },
        data() {
            return {
                client_type: checkBrowser(),
                load_user_msg: false,
                load_user_info: '正在授权,请等候',
                redirect_uri: getStorage('authorized_redirect_uri')
            }
        },
        created() {

            if (this.client_type == 'wechat' || this.client_type == 'alipay') {

                if (getStorage('state') == getUrlParam('state') && getStorage('state') && getUrlParam('state')) {
                    this.decryptData();
                } else {
                    let _this = this;
                    removeStorage('token');
                    removeStorage('state');

                    Dialog.alert({
                        title: '绑定失败',
                        message: '您的账号信息绑定失败,请重新授权绑定。',
                    }).then(() => {
                        if (this.redirect_uri && getStorage('check_iccid')) {
                            _this.$router.push(this.redirect_uri);
                        } else {
                            if(localStorage.getItem("currentType")=="userCenter"){
                                this.$router.push('/weixin/userCenter/index');
                            }else if(localStorage.getItem("currentType")=="esim"){
                                this.$router.push('/weixin/card/esim_usage');
                            }else{
                                _this.$router.push('/weixin/card/lookup');
                            }
                        }
                    })
                }
            } else {
                this.$router.push('/weixin/card/lookup')
            }

        },

        methods: {
            decryptData(){
                _post('/accountCenter/v2/secret/decrypt?' + codeParam({}, 'post'), {
                    data: getUrlParam('data')
                }).then(res => {

                    if (res.error == 0) {

                        if (this.client_type == 'alipay') {

                            let aliUser = {
                                uuid: res.data.data.user_id,
                                openid: res.data.data.user_id,
                                headimgurl: res.data.data.avatar,
                                gender: res.data.data.gender == 'm' ? 1 : 2,
                                nickname: res.data.data.nick_name
                            }

                            setStorage('decrypt_data', aliUser, 'obj');


                        } else if (this.client_type == 'wechat') {

                            let wechatUserData = res.data.data;
                            if (wechatUserData.unionid) {
                                wechatUserData.openid = wechatUserData.unionid
                            }
                            setStorage('decrypt_data', wechatUserData, 'obj');
                        }

                        //login
                        this.login(res);

                    } else if (res.error == '11002') {

                        this.$emit('getToken')

                    } else {
                        this.showAuthorityError('B' + res.error)
                    }
                })
            }, // 解密data
            login(res){
                _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
                    uuid: getStorage('decrypt_data', 'obj').openid,
                    code: res.data.code
                }).then(res => {

                    if (res.error == 0) {

                        setStorage('token', res.data);//获取token

                        if (this.redirect_uri &&  getStorage('check_iccid')) {
                            this.$router.push(this.redirect_uri);
                        } else {
                            if(localStorage.getItem("currentType")=="userCenter"){
                                this.$router.push('/weixin/userCenter/index');
                            }else if(localStorage.getItem("currentType")=="esim"){
                                this.$router.push('/weixin/card/esim_usage');
                            }else{
                                this.$router.push('/weixin/card/lookup');
                            }
                        }

                    } else if (res.error == '11002') {

                        this.$emit('getToken')

                    } else if (res.error == '30005' || res.error == '11003') {

                        let _this = this;

                        Dialog.alert({
                            title: '绑定信息',
                            message: '为了您的账号安全，需要绑定您的手机号码',
                        }).then(() => {
                            _this.$router.push({path: '/login'})
                        })

                    } else {
                        this.showAuthorityError('L' + res.error)
                    }
                })
            }, // 登录

            showAuthorityError(flag) {
                let _this = this;
                let _flag = flag ? flag : '';
                Dialog.alert({
                    title: '账号异常',
                    message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题' + _flag + '。',
                }).then(() => {
                    _this.load_user_msg = true;
                    _this.load_user_info = '账号异常' + _flag;

                })
            },// 拦截错误信息
        }
    }
</script>

<style lang="less">
    body, html {
        height: 100%;
    }

    .authority-middle-wrap {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        /*background: #00b6f3;*/
        /*background: #8c8c8c;*/
        [class*="loader-"] {
            display: inline-block;
            width: 1em;
            height: 1em;
            color: inherit;
            vertical-align: middle;
            pointer-events: none;
        }
        .box {
            display: inline-block;
            font-size: 40px;
            color: #fff;
            transition: .3s color, .3s border;
        }

        .loader-14 {
            border-radius: 50%;
            box-shadow: 0 1em 0 -.2em currentcolor;
            position: relative;
            -webkit-animation: loader-14 0.8s ease-in-out alternate infinite;
            animation: loader-14 0.8s ease-in-out alternate infinite;
            -webkit-animation-delay: 0.32s;
            animation-delay: 0.32s;
            top: -1em;
        }
        .loader-14:after,
        .loader-14:before {
            content: '';
            position: absolute;
            width: inherit;
            height: inherit;
            border-radius: inherit;
            box-shadow: inherit;
            -webkit-animation: inherit;
            animation: inherit;
        }
        .loader-14:before {
            left: -1em;
            -webkit-animation-delay: 0.48s;
            animation-delay: 0.48s;
        }
        .loader-14:after {
            right: -1em;
            -webkit-animation-delay: 0.16s;
            animation-delay: 0.16s;
        }
        @-webkit-keyframes loader-14 {
            0% {
                box-shadow: 0 2em 0 -.2em currentcolor;
            }
            100% {
                box-shadow: 0 1em 0 -.2em currentcolor;
            }
        }
        @keyframes loader-14 {
            0% {
                box-shadow: 0 2em 0 -.2em currentcolor;
            }
            100% {
                box-shadow: 0 1em 0 -.2em currentcolor;
            }
        }

    }
</style>