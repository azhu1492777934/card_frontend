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
            let loading = document.querySelector('.app-loading-wrap');
            if(loading){
                document.body.removeChild(loading);
            }
        },
        methods: {
            refreshToken(params) {
                _get("/accountCenter/v2/auth/refresh?" + codeParam({
                    token: getStorage('token')
                }, 'get'))
                    .then((res) => {
                        if (res.error == 0) {

                            localStorage.setItem("token", res.data);
                            // let refreshUrl = getStorage('refreshUrl');
                            // refreshUrl ? this.$router.push({path:refreshUrl}) : location.reload();
                            location.reload();

                        } else if (res.error == 11003) {
                            let _this = this;

                            Notify({message:'为了您的账号安全,请绑定手机号码'});

                            let redirect_url = this.GetUrlRelativePath();

                            setStorage('authorized_redirect_uri',redirect_url);

                            setTimeout(function () {
                                if(_this.global_variables.packed_project === 'mifi'){
                                    _this.$router.push({path: '/binding'})
                                }else{
                                    _this.$router.push({path: '/login'})
                                }
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
    @import url("https://at.alicdn.com/t/font_963137_e913dtci2bg.css");
    html, body, #app ,.inner-wrap{
        height: 100%;
        min-height: 100%;
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
</style>
