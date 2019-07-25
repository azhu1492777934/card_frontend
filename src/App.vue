<template>
  <div id="app">
    <router-view @getToken="refreshToken" v-wechat-title="$route.meta.title"/>
    <van-popup :close-on-click-overlay="false" v-model="load_user_msg">
      <van-loading type="spinner" size="30" color="#fff"/>
    </van-popup>
  </div>
</template>

<script>
  import {Notify, Dialog, Popup,Loading} from 'vant'
  import {_get} from "./http";
  import {codeParam, getStorage, setStorage} from "./utilies";

  export default {
    name: 'App',
    data() {
      return {
        load_user_msg: false,
        load_user_info: '',
      };
    },
    components: {
      [Dialog.name]: Dialog,
      [Notify.name]: Notify,
      [Popup.name]: Popup,
      [Loading.name]:Loading,
    },
    created() {
      let loading = document.querySelector('.app-loading-wrap');
      if (loading) {
        document.body.removeChild(loading);
      }
    },
    methods: {
      refreshToken(params) {
        _get("/accountCenter/v2/auth/refresh?" + codeParam({
          token: getStorage('token')
        }, 'get'))
          .then((res) => {
            if (res.error === 0) {
              setStorage('token', res.data, 'str', true);
              if (this.global_variables.packed_project === 'card' || this.global_variables.packed_project === 'mifi') {
                this.getUserInfo();
              }
              // location.reload();
            } else if (res.error === 11003) {
              let _this = this;
              Notify({message: '为了您的账号安全,请绑定手机号码'});
              let redirect_url = this.GetUrlRelativePath();
              setStorage('authorized_redirect_uri', redirect_url);

              setTimeout(function () {
                if (_this.global_variables.packed_project === 'mifi') {
                  _this.$router.push({path: '/binding'})
                } else {
                  _this.$router.push({path: '/login'})
                }
              }, 2000)
            }
          })
      },

      GetUrlRelativePath() {
        let url = document.location.toString(),
          arrUrl = url.split("//"),
          start = arrUrl[1].indexOf("/"),
          relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
        if (relUrl.indexOf("?") !== -1) {
          relUrl = relUrl.split("?")[0];
        }
        return relUrl;
      },

      getUserInfo() {
        //获取用户信息
        this.load_user_msg = true;//用户信息遮罩
        _get("/accountCenter/v2/user/info?" + codeParam({}, 'get'))
          .then(res => {
            this.load_user_msg = false;
            if (res.error === 0) {
              if (res.data && JSON.stringify(res.data) !== '{}') {
                let UserInfo = {
                  account: res.data.account,
                  avatar: res.data.avatar,
                  nickname: res.data.nickname,
                };
                setStorage('userInfo', UserInfo, 'obj');
                if (this.client_type === 'wechat' || this.client_type === 'alipay') {
                  this.$store.commit('userInfo/changeUserStatus', true);
                  this.$store.commit('userInfo/changeUserInfo', UserInfo);

                  let userDom = document.querySelector('.user-wrap');
                  if (userDom) setStorage('userHeight', userDom.offsetHeight);

                  if (this.global_variables.packed_project === 'mifi') {
                    this.$store.commit('userInfo/changeUserStatus', false);
                  }
                } else if (this.client_type === 'app') {
                  this.$store.commit('userInfo/changeUserInfo', UserInfo);
                }
              } else {
                this.showAuthorityError('(error)');
              }
            } else if (res.error === 11002) {
              this.$emit('getToken');
            } else if (res.error === 10007) {
              let curTimeStamp = (Date.parse(new Date()) / 1000),
                timeSpan = res.extra - curTimeStamp;
              setStorage('timeSpan', timeSpan);
              this.getUserInfo();
            } else if (res.error === 20014) {
              Notify({message: '请求超时'});
            } else {
              (res.status || res.error) ? this.showAuthorityError('A' + res.error) : this.showAuthorityError('A-R' + JSON.stringify(res))
            }
          })
      },// 获取用户信息

      showAuthorityError(flag) {
        let _this = this;
        let _flag = flag ? flag : '';
        Dialog.alert({
          title: '账号异常',
          message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题' + _flag + '。',
          showConfirmButton:false,
        }).then(() => {
          _this.load_user_msg = true;
          _this.load_user_info = '账号异常' + _flag;
        })
      }
    }
  }
</script>

<style lang="less">
  @import url("https://at.alicdn.com/t/font_963137_73ow4iaaw3f.css");
  @import "./assets/less/common.less";

  html, body, #app, .inner-wrap {
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
