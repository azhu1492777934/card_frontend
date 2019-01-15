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
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Notify} from 'vant'
    import {_post,_get} from "../../http";
    import {getStorage, getUrlParam, setStorage,codeParam, checkBrowser} from "../../utilies";

    export default {
        data() {
            return {
                decrypt_data: {},//用户数据
                phone: "",
                code: "",
                codeText: "获取验证码",
                countdown: 60,
                state: '',
                client_type: '',
                btnCode_disabled:false,
                time:null,
            }
        },
        components: {
            [Notify.name]: Notify
        },
        created() {

            if (checkBrowser() == 'wechat') {

                this.client_type = 'wechat';

            } else if (checkBrowser() == 'alipay') {

                this.client_type = 'alipay';
            }

            //获取用户信息
            this.decrypt_data = getStorage('decrypt_data','obj');
        },
        methods: {
            login() {
                if (this.phone == '' && this.code == '') {
                    Notify({message: '请填写您的登录信息'})
                    return
                } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)) {
                    Notify({message: '您的手机号码有误'})
                    return
                } else {
                    _post("/accountCenter/v2/user/bind?" + codeParam({},'post'), {
                        mobile: this.phone,
                        code: this.code,
                        from: this.client_type,
                        uuid: this.decrypt_data.openid,
                        nickname: this.decrypt_data.nickname,
                        gender: this.decrypt_data.sex,
                        avatar: this.decrypt_data.headimgurl
                    }).then((res) => {
                        if (res.error == 0) {
                            let _this = this;
                            setStorage("token", res.data);

                            Notify({message:'绑定成功'});
                            setTimeout(function () {
                                _this.$router.push({path:'/app/card/lookup'})
                            },2000)
                        } else if (res.error == "11002") {

                            this.$emit("getToken");

                        } else if(res.error == 30002){

                            Notify({message:'用户绑定成功'})

                            let redirect_uri = getStorage('authorized_redirect_uri');

                            setTimeout(function () {
                                location.href = redirect_uri;
                            },2000)

                        } else{
                            Notify({message:res.msg})
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
                        if (res.error == 0) {
                            Notify({message:'验证码发送成功'})
                        } else if(res.error == "11002") {
                            this.$emit("getToken");
                        } else {
                            Notify({message:res.msg})
                        }
                    })
                }
            },
            countDownFun() {
                let _this = this;
                this.btnCode_disabled = true;

                clearInterval(this.timer);

                this.timer = setInterval(() => {
                    if (_this.countdown <= 0) {
                        _this.codeText = '获取验证码';
                        _this.countdown = 60;
                        _this.btnCode_disabled = false
                        clearInterval(_this.timer);
                    } else {
                        _this.codeText = this.countdown+'s';
                        _this.countdown--;
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
        background-position: center center;
        background-size: cover;
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
                align-items: center;
                input{
                    display: inline-block;
                    width: 59%;
                }
                button {
                    display: inline-block;
                    width: 200px;
                    padding: 12px 30px;
                    border-radius: 6px;
                    color: #23B0FE;
                    line-height: 1;
                    background-color: #fff;
                    box-sizing: border-box;
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