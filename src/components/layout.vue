<template>
  <div class="inner-wrap">
    <user-header v-show="isShowUser&&isShowBalancePay" :userInfoData="authorizeUserInfo"></user-header>
    <router-view @getUserData="getUserInfo"/>
    <van-popup :close-on-click-overlay="false" v-model="load_user_msg">
      <van-loading type="spinner" size="30" color="#fff"/>
    </van-popup>
  </div>
</template>

<script>

  import {Notify} from 'vant'
  import {mapState} from 'vuex'
  import userHeader from './common/uesrHead'
  import {Dialog, Popup, Loading} from 'vant'
  import {_post, _get} from "../http";
  import {
    codeParam,
    checkBrowser,
    setStorage,
    getStorage,
    removeStorage,
    getUrlParam,
    checkICCID,
    getCardServerToken
  } from "../utilies";

  export default {
    name: 'App',
    data() {
      return {
        client_type: checkBrowser(),//微信/支付宝环境
        state: '',//防跨域攻击
        appContext: false,//是否app环境
        load_user_msg: false,
        load_user_info: '加载用户信息,请等候',
      }
    },
    components: {
      userHeader,
      [Dialog.name]: Dialog,
      [Notify.name]: Notify,
      [Popup.name]: Popup,
      [Loading.name]: Loading
    },
    computed: {
      ...mapState({
        isShowUser: state => state.userInfo.showUser,
        authorizeUserInfo: state => state.userInfo.userInfoInner,
        isShowBalancePay: state => state.userInfo.showBalancePay,
      }),
    },
    created() {
      // 时间差
      setStorage('timeSpan', 0);

      //手表扫码跳转
      if (getUrlParam('iccid')) {
        let watch_iccid = getUrlParam('iccid');
        if (checkICCID(watch_iccid).state === 1) {
          setStorage('watch_card', watch_iccid);
          setStorage('watchAutoSearch', 1);
        }
      } else {
        removeStorage('watch_card');
        removeStorage('watchAutoSearch');
      }
      let _this = this;
      if (this.client_type === 'app') {
        let UA = navigator.userAgent.toLowerCase();
        if (/(ylkids_android)/.test(UA)) {
          this.showHtmlcallJava2();
        } else if (/(ios1.1.0)/.test(UA)) {
          let str = window.webkit.messageHandlers.getIosToken.postMessage(null);
          setTimeout(function () {
            _this.authorized();
          }, 500)
        }
      } else {
        this.authorized();
      }
    },
    methods: {
      showHtmlcallJava2() {
        let str3 = window.jsInterface.GetToken();
        localStorage.setItem("token", str3);
        this.authorized();
      },

      authorized() {
        if ((this.client_type === 'wechat' || this.client_type === 'alipay' || this.client_type === 'app') && process.env.NODE_ENV !== 'development') {
          // if (this.client_type !== 'app') {
          if (getStorage('userInfo', 'obj')) {
            this.$store.commit('userInfo/changeUserStatus', true);
            let userDom = document.querySelector('.user-wrap');
            if (userDom) setStorage('userHeight', userDom.offsetHeight);

            if (this.global_variables.packed_project === 'mifi' || this.client_type === 'app') {
              this.$store.commit('userInfo/changeUserStatus', false);
            }
          }

          if ((this.client_type === 'wechat' && getStorage('wechat_version') !== this.global_variables.version) ||
            (this.client_type === 'alipay' && getStorage('alipay_version') !== this.global_variables.version)
          ) {
            removeStorage('token');
            removeStorage('state');
          }

          // }
          //app环境隐藏顶部个人信息
          if (getStorage('token')) {
            if (this.global_variables.packed_project !== 'mifi') {
              if (this.$route.path.indexOf('question') === 8 || this.$route.path.indexOf('coupon') === 8) return;
              this.getUserInfo();//获取用户信息 其他项目的跳转
            }
          } else {
            let _this = this;
            // Dialog.alert({
            //   title: '授权',
            //   message: '为了您的账号安全，我们需要您对本站进行授权操作并绑定账号。'
            // }).then(() => {
            _this.authorizedRediect()
            // })
          }
        } else {
          this.$store.commit('userInfo/changeUserStatus', false);
        }
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
                  mobile: res.data.mobile,
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
                let _this = this;
                Dialog.alert({
                  title: '账号异常',
                  message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。',
                  showConfirmButton: false,
                }).then(() => {
                  _this.load_user_msg = true;
                  _this.load_user_info = '账号异常';
                })
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
      showDoc() {
        Dialog.alert({
          message: '可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等'
        })
      },
      authorizedRediect() {
        let _this = this;
        this.state = Math.random().toString(36).substr(2) + new Date().getTime();
        setStorage('state', this.state);

        //获取当前重定向地址
        let redirect_uri = this.GetUrlRelativePath();
        setStorage('authorized_redirect_uri', redirect_uri);

        //存储手表二维码ICCID
        if (getUrlParam('iccid')) {
          let watch_iccid = getUrlParam('iccid');
          if (checkICCID(watch_iccid).state === 1) {
            setStorage('watch_card', watch_iccid)
            setStorage('watchAutoSearch', 1);
          }
        } else {
          removeStorage('watch_card');
          removeStorage('watchAutoSearch');
        }
        // 授权
        _get('/accountCenter/v2/oauth/authorize?' + codeParam({
          client_type: this.client_type,
          redirect_uri: this.global_variables.authorized_redirect_url + '/authority',
          scope: 'userinfo',
          state: this.state
        }, 'get'))
          .then(res => {
            if (res.error === 0) {
              if (this.client_type === 'wechat') {
                setStorage('wechat_version', this.global_variables.version);
              } else if (this.client_type === 'alipay') {
                setStorage('alipay_version', this.global_variables.version);
              }
              location.href = res.data;
            } else if (res.error === 11002) {
              this.$emit('getToken')
            } else {
              this.this.showAuthorityError('C' + res.error)
            }
          })
      },//授权操作
      showAuthorityError(flag) {
        let _this = this;
        let _flag = flag ? flag : '';
        Dialog.alert({
          title: '账号异常',
          showConfirmButton: false,
          message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题' + _flag + '。',
        }).then(() => {
          _this.load_user_msg = true;
          _this.load_user_info = '账号异常' + _flag;
        })
      }
    }
  }
</script>

<style lang="less">
  .van-popup {
    .van-loading {
      margin: 0 auto;
    }
  }
</style>

