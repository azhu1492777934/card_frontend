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

        <router-view @getToken="refreshToken" v-wechat-title="$route.meta.title"/>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    import {_get} from "./http";
    import {codeParam} from "./utilies";
    import {getStorage} from "./utilies";

    export default {
        name: 'App',
        data() {
            return {
                userInfo: {},
                showUser: false,
            }
        },
        components: {
            [Dialog.name]: Dialog
        },
        created() {
            if(getStorage('userInfo')){
                this.showUser = true;
                this.userInfo = getStorage('userInfo');
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
