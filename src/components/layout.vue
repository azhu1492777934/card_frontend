<template>
    <div id="app">
        <user-header v-show="isShowUser" :userInfoData="authorizeUserInfo"></user-header>
        <router-view/>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import userHeader from './common/uesrHead'
    import {Dialog} from 'vant'
    import {_post, _get} from "../http";
    import {codeParam, checkBrowser, setStorage, getStorage, removeStorage,getUrlParam} from "../utilies";

    export default {
        name: 'App',
        data() {
            return {
                // decrypt_data: {},
                client_type: '',//微信/支付宝环境
                state: '',//防跨域攻击
                appContext: false,//是否app环境
            }
        },
        components: {
            userHeader,
            [Dialog.name]: Dialog
        },
        computed: {
            ...mapState({
                isShowUser: state => state.userInfo.showUser,
                authorizeUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        created() {
            //授权
            if (checkBrowser() == 'wechat') {

                this.client_type = 'wechat';

            } else if (checkBrowser() == 'alipay') {

                this.client_type = 'alipay';
            }

            this.client_type = 'alipay'
            /*获取用户信息*/
            if (this.client_type == 'wechat' || this.client_type == 'alipay' || this.appContext) {

                if (getStorage('token')) {

                    this.getUserInfo();//获取用户信息

                } else {

                    if (getUrlParam('data')) {
                        setStorage('auth_data', getUrlParam('data'))
                    }

                    if (getStorage('auth_data')) {
                        /*
                        * 已授权操作 重定向后操作
                        * */

                        if (getStorage('state') == getUrlParam('state')) {


                            //解密data
                            _post('/accountCenter/v2/secret/decrypt?' + codeParam({}, 'post'), {
                                data: getStorage('auth_data')
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


                                    } else if (this.client_type == 'wechat' || this.appContext) {

                                        setStorage('decrypt_data', res.data.data, 'obj');
                                    }

                                    //login
                                    _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
                                        // uuid: res.data.data.openid,
                                        uuid: getStorage('decrypt_data', 'obj').openid,
                                        code: res.data.code
                                    }).then(res => {
                                        if (res.error == 0) {

                                            setStorage('token', res.data);//获取token
                                            this.getUserInfo();//获取用户信息

                                        } else if (res.error == '11002') {

                                            this.$emit('getToken')

                                        } else if (res.error == '30005' || res.error == '11003') {

                                            this.$store.commit('userInfo/changeUserStatus', false);

                                            this.$router.push({path: '/login'})

                                        } else {
                                            Notify({
                                                message: res.msg
                                            })
                                        }
                                    })
                                } else if (res.error == '11002') {

                                    this.$emit('getToken')

                                } else {

                                    Notify({
                                        message: res.msg
                                    })
                                }
                            })
                            // end 状态
                        }else{
                            removeStorage('auth_data');

                            window.reload();
                        }
                        /*
                       * end 已授权操作
                       * */
                    } else {
                        this.state = Math.random().toString(36).substr(2);
                        setStorage('state', this.state);

                        //获取当前重定向地址
                        let redirect_uri = this.GetUrlRelativePath();
                        setStorage('authorized_redirect_uri',redirect_uri);

                        // 授权
                        _get('/accountCenter/v2/oauth/authorize?' + codeParam({
                            client_type: this.client_type,
                            redirect_uri: 'http://cardserver-test.china-m2m.com'+redirect_uri,
                            scope: 'userinfo',
                            state: this.state
                        }, 'get'))
                            .then(res => {
                                if (res.error == 0) {

                                    location.href = res.data

                                } else if (res.error == '11002') {

                                    this.$emit('getToken')

                                } else {

                                    Notify({
                                        message: res.msg
                                    })
                                }
                            })
                    }
                }

            } else {

                this.$store.commit('userInfo/changeUserStatus', false);

            }
            /*end 获取用户信息*/

        },
        methods: {
            GetUrlRelativePath() {
                let url = document.location.toString(),
                     arrUrl = url.split("//"),
                    start = arrUrl[1].indexOf("/"),
                    relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
                if (relUrl.indexOf("?") != -1) {
                    relUrl = relUrl.split("?")[0];
                }
                return relUrl;
            },
            getUserInfo() {
                //获取用户信息
                _get("/accountCenter/v2/user/info?" + codeParam({}, 'get'))
                    .then(res => {
                        if (res.error == 0) {

                            let UserInfo = {
                                account: res.data.account,
                                avatar: res.data.avatar,
                                nickname: res.data.nickname
                            }

                            setStorage('userInfo', UserInfo, 'obj');

                            this.$store.commit('userInfo/changeUserStatus', true);
                            this.$store.commit('userInfo/changeUserInfo', UserInfo);

                        } else if (res.error == "11002") {

                            this.$emit('getToken')

                        } else {
                            Notify({message: res.msg});
                        }
                    })

            },// 获取用户信息

            showDoc() {
                Dialog.alert({
                    message: '钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等'
                })
            },

        }
    }
</script>


