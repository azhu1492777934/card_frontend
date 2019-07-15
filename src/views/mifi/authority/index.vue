<template>
  <div class="transaction-wrap">
    <div class="animation-wrap">
      <div class="loader-wrap"></div>
    </div>
  </div>
</template>

<script>
  import {Dialog, Popup} from 'vant'
  import {_post} from "../../../http";
  import {
    getUrlParam,
    getStorage,
    setStorage,
    removeStorage,
    codeParam,
    checkBrowser,
    GetUrlRelativePath
  } from "../../../utilies";

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

      if (!getStorage('token')) {
        if (this.client_type === 'wechat' || this.client_type === 'alipay') {
          if (getStorage('state') && getUrlParam('state') && getStorage('state') === getUrlParam('state')) {
            this.decryptData();
          } else {
            let _this = this;
            removeStorage('token');
            removeStorage('state');

            Dialog.alert({
              title: '绑定失败',
              message: '您的账号信息绑定失败,请重新授权绑定。',
            }).then(() => {
              _this.$router.push('/mifi/index');
            })
          }
        } else {
          this.$router.push('/mifi/card/lookup');
        }

      } else {
        this.$router.push({path: '/mifi/card/lookup'});
      }
    },

    methods: {
      decryptData() {
        _post('/accountCenter/v2/secret/decrypt?' + codeParam({}, 'post'), {
          data: getUrlParam('data')
        }).then(res => {
          if (res.error === 0) {
            if (this.client_type === 'alipay') {
              let aliUser = {
                uuid: res.data.data.user_id,
                openid: res.data.data.user_id,
                headimgurl: res.data.data.avatar,
                gender: res.data.data.gender == 'm' ? 1 : 2,
                nickname: res.data.data.nick_name
              };
              setStorage('decrypt_data', aliUser, 'obj');
            } else if (this.client_type === 'wechat') {
              let wechatUserData = res.data.data;
              if (wechatUserData.unionid) {
                wechatUserData.openid = wechatUserData.unionid
              }
              setStorage('decrypt_data', wechatUserData, 'obj');
            }
            //login
            this.login(res);

          } else if (res.error === 11002) {
            setStorage('refreshUrl', GetUrlRelativePath());
            this.$emit("getToken", {from: 'mifi'});
          } else {
            this.showAuthorityError('B' + res.error)
          }
        })
      }, // 解密data
      login(res) {
        let _this = this;
        _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
          uuid: getStorage('decrypt_data', 'obj').openid,
          code: res.data.code
        }).then(res => {
          if (res.error === 0) {
            setStorage('token', res.data, 'str', true);//获取token
            getStorage('check_iccid') ? this.$router.push('/mifi/index') : this.$router.push('/mifi/card/lookup');
          } else if (res.error === 11002) {
            setStorage('refreshUrl', GetUrlRelativePath());
            this.$emit('getToken', {from: 'mifi'})
          } else if (res.error === 30005 || res.error === 11003) {
            let _this = this;
            Dialog.alert({
              title: '绑定信息',
              message: '为了您的账号安全，需要绑定您的手机号码',
            }).then(() => {
              _this.$router.push({path: '/binding'});
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
  .transaction-wrap, .animation-wrap {
    height: 100%;
  }

  .animation-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #f8b43e;
    -webkit-transition: .3s color, .3s border;
    transition: .3s color, .3s border;
  }

  [class*="loader-"] {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    vertical-align: middle;
    pointer-events: none;
  }

  .loader-wrap {
    border-radius: 50%;
    box-shadow: 0 1em 0 -.2em currentcolor;
    position: relative;
    -webkit-animation: loader-wrap 0.8s ease-in-out alternate infinite;
    animation: loader-wrap 0.8s ease-in-out alternate infinite;
    -webkit-animation-delay: 0.32s;
    animation-delay: 0.32s;
    top: -1em;
  }

  .loader-wrap:after,
  .loader-wrap:before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    box-shadow: inherit;
    -webkit-animation: inherit;
    animation: inherit;
  }

  .loader-wrap:before {
    left: -1em;
    -webkit-animation-delay: 0.48s;
    animation-delay: 0.48s;
  }

  .loader-wrap:after {
    right: -1em;
    -webkit-animation-delay: 0.16s;
    animation-delay: 0.16s;
  }

  @-webkit-keyframes loader-wrap {
    0% {
      box-shadow: 0 2em 0 -.2em currentcolor;
    }
    100% {
      box-shadow: 0 1em 0 -.2em currentcolor;
    }
  }

  @keyframes loader-wrap {
    0% {
      box-shadow: 0 2em 0 -.2em currentcolor;
    }
    100% {
      box-shadow: 0 1em 0 -.2em currentcolor;
    }
  }
</style>