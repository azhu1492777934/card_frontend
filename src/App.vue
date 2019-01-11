<template>
    <div id="app">
        <user-header :userInfo="getUserInfo" v-show="isShowUser"></user-header>
        <router-view :decrypt_data="decrypt_data" @getToken="refreshToken" v-wechat-title="$route.meta.title"/>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    import userHeader from '../src/components/common/uesrHead'
    import {Dialog} from 'vant'
    import {_get, _post} from "./http";
    import {codeParam, checkBrowser, setStorage} from "./utilies";
    import {getStorage, getUrlParam} from "./utilies";

    export default {
        name: 'App',
        data() {
            return {
                decrypt_data: {},
            }
        },
        components: {
            userHeader,
            [Dialog.name]: Dialog
        },
        computed: {
            ...mapState({
                isShowUser: state => state.userInfo.showUser,
                getUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        created(){

            if (getStorage('decrypt_data')) {
                this.decrypt_data = getStorage('decrypt_data')
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
                        if (res.error == 0) {

                            console.log(res);

                            localStorage.setItem("token", res.data);
                            location.reload();

                        } else if (res.error == 11003) {
                            this.showUser = false;
                            this.$router.push('/login');
                        }
                    })
            },
        }
    }
</script>

<style lang="less">
    html, body, #app {
        max-height: 100%;
        background-color: #fff;
    }

    #app {
        max-width: 750px;
        margin: 0 auto;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
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
