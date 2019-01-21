<template>
    <div id="app">
        <router-view  @getToken="refreshToken" v-wechat-title="$route.meta.title"/>
    </div>
</template>

<script>
    import {Notify} from 'vant'
    import {_get} from "./http";
    import {codeParam,getStorage,setStorage} from "./utilies";

    export default {
        name: 'App',
       components:{
            [Notify.name]:Notify
       },
        created(){
            let loading = document.getElementsByClassName('fixed-wrap-loading')[0];
            if(loading){
                document.body.removeChild(loading);
            }
        },
        methods: {
            refreshToken() {
                _get("/accountCenter/v2/auth/refresh?" + codeParam({
                    token: getStorage('token')
                }, 'get'))
                    .then((res) => {
                        if (res.error == 0) {

                            localStorage.setItem("token", res.data);
                            location.reload();

                        } else if (res.error == 11003) {
                            let _this = this;

                            Notify({message:'为了您的账号安全,请绑定手机号码'})

                            let redirect_url = this.GetUrlRelativePath();

                            setStorage('authorized_redirect_uri',redirect_url);

                            setTimeout(function () {
                                _this.$router.push({path: '/login'})
                            },2000)
                        }
                    })
            },

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
        font-family: SourceHanSansCNRegular, 'Avenir', Helvetica, Arial, sans-serif;
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
