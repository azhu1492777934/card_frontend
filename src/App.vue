<template>
    <div id="app">
        <div v-if="showUser" class="user-wrap">
            <div class="user-inner-wrap">
                <div class="user-name-wrap">
                    <img :src="userInfo.avatar" alt="用户头像">
                    <span class="user-name">{{userInfo.nickname}}</span>
                </div>
                <div>
                    <span>余额:</span>
                    <span class="icon-diamond-wrap">
                          <i class="icon-user-size  icon-diamond"></i>
                          {{userInfo.account.rmb}}
                      </span>
                    <span class="icon-elb-wrap">
                          <i class="icon-user-size icon-elb"></i>
                          {{userInfo.account.elb}}
                      </span>
                    <span @click="showDoc" class="icon-question">?</span>
                </div>
            </div>
        </div>

        <router-view :decrypt_data="decrypt_data" @getToken="refreshToken"
                     v-wechat-title="$route.meta.title"/>
    </div>
</template>

<script>
    import {Dialog, Notify} from 'vant'
    import {_get, _post} from "./http";
    import {codeParam, getUserInfo, isUserBind, checkBrowser, setStorage} from "./utilies";
    import {getStorage, getUrlParam} from "./utilies";

    export default {
        name: 'App',
        data() {
            return {
                userInfo: {},
                showUser: false,
                openid: '',
                decrypt_data: {},
            }
        },
        components: {
            [Dialog.name]: Dialog
        },
        created() {

            let checkBrowserResult = checkBrowser()
            if (checkBrowserResult == 'wechat') {
                this.client_type = 'wechat';
            } else if (checkBrowserResult == 'alipay') {
                this.client_type = 'alipay';
            }

            if (getStorage('decrypt_data')) {
                this.decrypt_data = getStorage('decrypt_data')
            }

            if (!this.decrypt_data.openid) {
                this.decrypt_data.openid = 0;//非真实数据;
            }

            if (this.client_type == 'wechat' || this.client_type == 'alipay' || this.appContext) {

                if (this.appContext) {
                    this.showUser = false;
                    let token = getUrlParam('appToken');
                    setStorage('token', token);
                }

                if (getStorage('token')) {

                    if (this.appContext) {
                        getUserInfo().then(res => {
                            if (res.state) {
                                this.showUser = true;
                                this.userInfo = getStorage('userInfo');
                            } else {
                                Notify({message: res.msg})
                            }
                        })//app 环境
                    } else {

                        if (getStorage('userBind')) {
                            getUserInfo().then(res => {
                                if (res.state) {
                                    this.showUser = true;
                                    this.userInfo = getStorage('userInfo');
                                } else {
                                    Notify({message: res.msg})
                                }
                            })
                        } else {
                            isUserBind().then(res => {
                                if (res.state == 1) {
                                    this.$router.push({path: '/login'})
                                    //未绑定
                                } else if (res.state == 0) {
                                    getUserInfo().then(res => {
                                        if (res.state) {
                                            this.showUser = true
                                            this.userInfo = getStorage('userInfo');
                                        } else {
                                            Notify({message: res.msg})
                                        }
                                    })
                                } else {
                                    Notify({message: res.msg})
                                }
                            })
                        }
                        //支付宝微信环境
                    }
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
                                if (res.error == 0) {
                                    this.decrypt_data = res.data.data;
                                    setStorage('decrypt_data', res.data.data);


                                    //login
                                    _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
                                        uuid: res.data.data.openid,
                                        code: res.data.code
                                    }).then(res => {
                                        if (res.error == 0) {
                                            if (getStorage('userBind')) {
                                                getUserInfo().then(res => {
                                                    if (res.state) {
                                                        this.showUser = true
                                                        this.userInfo = getStorage('userInfo');
                                                    } else {
                                                        Notify({message: res.msg})
                                                    }
                                                })
                                            } else {
                                                isUserBind().then(res => {
                                                    if (res.state == 1) {
                                                        this.$router.push({path: '/login'})
                                                        //未绑定
                                                    } else {
                                                        getUserInfo().then(res => {
                                                            if (res.state) {
                                                                this.showUser = true
                                                                this.userInfo = getStorage('userInfo');
                                                            } else {
                                                                Notify({message: res.msg})
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            setStorage('token', res.data);//获取token
                                        } else if (res.error === '11002') {
                                            this.$emit('getToken');
                                        } else if (res.error === '30005' || res.data.error === '11003') {

                                        } else {
                                            Notify({
                                                message: res.msg
                                            })
                                        }
                                    })
                                } else if (res.data.error === '11002') {
                                    this.$emit('getToken');
                                } else {
                                    Notify({
                                        message: res.msg
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
                            client_type: this.client_type,
                            redirect_uri: 'http://cardserver-test.china-m2m.com',
                            scope: 'userinfo',
                            state: this.state
                        }, 'get'))
                            .then(res => {
                                if (res.error == 0) {
                                    window.location.href = res.data
                                } else if (res.error == '11002') {
                                    this.$emit('getToken');
                                } else {
                                    Notify({
                                        message: res.msg
                                    })
                                }
                            })
                    }
                }

            }
        },
        methods: {
            showDoc() {
                Dialog.alert({
                    message: '钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等'
                })
            },
            refreshToken() {
                _get("/accountCenter/v2/auth/refresh?" + codeParam({
                    token: getStorage('token')
                }, 'get'))
                    .then((res) => {
                        if (res.data.error == 0) {
                            localStorage.setItem("token", res.data.data);
                            location.reload();
                        }
                    })
            }
        }
    }
</script>

<style lang="less">
    #app {
        max-width: 750px;
        margin: 0 auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        .user-wrap {
            padding: 15px;
            background-color: #fff;
            .user-inner-wrap {
                display: flex;
                align-items: center;
                text-align: left;
                > div {
                    &:first-child {
                        flex: 2;
                    }
                    &:last-child {
                        flex: 5;
                    }
                }
            }
            span {
                vertical-align: middle;
            }
            .user-name-wrap {
                img {
                    display: inline-block;
                    width: 58px;
                    height: 58px;
                    background-color: #f0f0f0;
                    vertical-align: middle;
                }
                .user-name {
                    display: inline-block;
                    max-width: 130px;
                    font-size: 22px;
                    padding-left: 10px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .icon-user-size {
                position: absolute;
                left: -20px;
                top: 50%;
                margin-top: -20px;
                display: inline-block;
                width: 40px;
                height: 40px;
                background-size: 100% 100%;
            }
            .icon-diamond-wrap,
            .icon-elb-wrap {
                position: relative;
                display: inline-block;
                margin-right: 40px;
                padding: 5px;
                width: 130px;
                text-align: center;
                border: 2px solid #3BB2E6;
                border-radius: 4px;
            }
            .icon-diamond-wrap {
                margin-left: 40px;
            }
            .icon-question {
                width: 35px;
                height: 35px;
            }
            .icon-diamond {
                background-image: url("assets/imgs/app/icon-diamonds.png");
            }
            .icon-elb {
                background-image: url("assets/imgs/app/icon-elb.png");
            }
            .icon-question {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 50%;
                background-color: #3BB2E6;
                color: #fff;
                text-align: center;
            }
        }
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
