<template>
    <div class="login-wrap">
        <div class="info-wrap">
            <div class="phone-wrap">
                <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone"/>
            </div>
            <div class="code-wrap">
                <input type="text" placeholder="请输入验证码" maxlength="10" v-model="code"/>
                <button :disabled="btnCode_disabled" class="getCode" @click="getCode">{{codeText}}</button>
            </div>
            <div class="btn-login-wrap">
                <button>登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Notify} from 'vant'
    import {codeParam, checkBrowser} from "../../utilies";
    import {_post,_get} from "../../http";
    import {getStorage, getUrlParam, setStorage} from "../../utilies";

    export default {
        data() {
            return {
                decrypt_data: {},//用户数据
                phone: "",
                code: "",
                codeText: "获取验证码",
                countdown: 60,
                userData: {},
                state: '',
                client_type: '',
                btnCode_disabled:false,
            }
        },
        components: {
            [Notify.name]: Notify
        },
        created() {
            if (checkBrowser() == 'wx') {
                this.client_type = 'wechat';
            } else {
                this.client_type = 'alipay';
            }

            /*this.userData = localStorage.getItem('decrypt_data');
            console.log(this.userData)*/
            if (getStorage('token')) {
                this.userData = getStorage('userData');
            } else {
                if (getUrlParam('data')) {
                    setStorage('auth_data', getUrlParam('data'))
                }
                if (getStorage('auth_data')) {
                    /*
                    * 已授权操作
                    * */
                    if (getStorage('state') == getUrlParam('state')) {
                        //解密data
                        _post('/accountCenter/v2/secret/decrypt?' + codeParam({}, 'post'), {
                            data: getStorage('auth_data')
                        }).then(res => {
                            if (!res.data.error) {
                                this.decrypt_data = res.data.data;
                                setStorage('decrypt_data', res.data.data);

                                //login
                                _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
                                    uuid: res.data.data.data.openid,
                                    code: res.data.data.code
                                }).then(res => {
                                    if (!res.data.error) {
                                        setStorage('token', res.data.data);
                                    } else if (res.data.error === '11002') {

                                    } else if (res.data.error === '30005' || res.data.error === '11003') {

                                    } else {
                                        Notify({
                                            message: res.data.msg
                                        })
                                    }
                                })
                            } else if (res.data.error === '11002') {
                                this.$emit('getToken');
                            } else {
                                Notify({
                                    message: res.data.msg
                                })
                            }
                        })
                        // end 状态
                    } else {
                        location.reload()
                    }
                    /*
                   * end 已授权操作
                   * */
                } else {
                    //授权
                    this.state = Math.random().toString(36).substr(2);
                    setStorage('state', this.state);
                    _get('/accountCenter/v2/oauth/authorize?' + codeParam({
                        client_type: 'wechat',
                        redirect_uri: 'https://wxtest.china-m2m.com',
                        scope: 'userinfo',
                        state: this.state
                    }, 'get'))
                        .then(res => {
                            if(!res.data.error){
                                console.log('授权成功')
                                // window.location.href = res.data.data
                            }else if(res.data.error=='11002'){
                                this.$emit('getToken');
                            }else{
                                Notify({
                                    message: res.data.msg
                                })
                            }
                        })
                }
            }
        },
        methods: {
            login() {
                if (this.phone == '' || this.code == '') {
                    Notify({message: '请填写您的登录信息'})
                    return
                } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)) {
                    Notify({message: '您的手机号码有误'})
                    return
                } else {
                    _post("/accountCenter/v2/user/bind?" + code({},'post'), {
                        mobile: this.phone,
                        code: this.code,
                        from: this.client_type,
                        uuid: this.userData.openid,
                        nickname: this.userData.nickname,
                        gender: this.userData.sex,
                        avatar: this.userData.headimgurl
                    }).then((res) => {
                        if (res.data.error == 0) {
                            Notify({message:'绑定成功'});
                            setStorage("token", res.data.data);
                            this.$router.push('/card/lookup')
                        } else if (res.data.error == "11002") {
                            this.$emit("getToken");
                        } else {
                            Notify({message:res.data.msg})
                        }
                    })
                }
            },
            getCode() {
                if (this.phone == '') {
                    Notify({message: '请输入您的手机号码'})
                    return
                } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)) {
                    Notify({message: '请填写正确的手机号码'})
                    return
                } else {
                    this.countDownFun();
                    _post("/accountCenter/v2/verify/send?" + codeParam({},'post'), {
                        mobile: this.phone
                    }).then((res) => {
                        if (res.data.error == 0) {
                            Notify({message:'验证码发送成功'})
                        } else if(res.data.error == "11002") {
                            this.$emit("getToken");
                        } else {
                            Notify({message:response.data.msg})
                        }
                    })
                }
            },
            countDownFun() {
                this.countdown = 0;
                this.codeText  = '获取验证码'
                this.btnCode_disabled = true;
                let timer = setInterval(() => {
                    if (this.countdown <= 0) {
                        this.codeText = '获取验证码';
                        this.countdown = 60;
                        this.btnCode_disabled = false
                        clearInterval(timer);
                    } else {
                        this.codeText = this.countdown+'s';
                        this.countdown--;
                    }
                }, 1000)
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/utitlies";

    html, body, #app, .login-wrap {
        height: 100%
    }

    .login-wrap {
        display: flex;
        align-items: center;
        width: 100%;
        .bg-image('../../assets/imgs/login/login_bg');
        .info-wrap {
            width: 70%;
            margin: 0 auto;
            text-align: left;
            .phone-wrap, .code-wrap {
                margin-bottom: 40px;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 7px;
                box-shadow: 0 18px 9px 0 rgba(5, 87, 197, 0.18);
                input {
                    display: inline-block;
                    padding: 20px 0 20px 15px;
                    font-size: 30px;
                    color: #000;
                }
            }
            .code-wrap {
                display: flex;
                align-items: center;
                button {
                    display: inline-block;
                    padding: 12px 30px;
                    border-radius: 6px;
                    color: #23B0FE;
                    line-height: 1;
                    background-color: #fff;
                }
            }

            .btn-login-wrap {
                button {
                    display: inline-block;
                    width: 100%;
                    padding: 20px;
                    background: #fff;
                    color: #23B0FE;
                    font-size: 34px;
                    box-shadow: -1px 14px 9px 0px rgba(5, 87, 197, 0.18);
                    border-radius: 10px;
                    line-height: 1;
                }

            }
        }
    }

</style>