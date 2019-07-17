<template>
  <div>
    <div class="check-card-wrap" v-if="newAppStyle!='app2'">
      <div class="scanTop-wrap">
        <img v-if="newAppStyle!='app2'" src="../../assets/imgs/card/lookup/scanTop.png" alt="">
        <img v-if="newAppStyle=='app2'" src="../../assets/imgs/card/lookup/scanTop2.png" alt="">
      </div>
      <div class="search-wrap">
        <input ref="iccidDom" @focus="handleIccidFocus" v-model="iccid" @blur.prevent="iccidBlur"
               placeholder="扫码或手动输入iccid号或11位电话号" type="text">
        <span v-show="showClearBtn" @click="clearInputIccid" class="clearIccid">&times;</span>
        <span v-show="client_type!='app'" @click="scanIccid" class="iconfont icon-scan bounceIn animated"></span>
        <span v-show="client_type!='app'" class="icon-scanTip"></span>
      </div>
      <div class="btn-check-wrap">
        <card-button @clickThrotle="searchIccid(iccid)" :btnText="'查询'"></card-button>
      </div>
      <div v-show="recording_show" class="recording-wrap">
        <p class="recording-title">
          <span>历史搜索记录</span>
          <span>{{recording_list.length}}条</span>
        </p>
        <ul class="recording-list-wrap">
          <li v-for="(item,index) in recording_list">
            <span @click="searchIccid(item.iccid)">{{item.iccid}}</span>
            <span>{{item.searchTime}}</span>
            <span @click="deleteIccid(item.iccid)">&times</span>
          </li>
        </ul>
      </div><!--历史记录-->
      <van-popup :close-on-click-overlay="false" v-model="forbidden_click"></van-popup>
    </div>


    <div class="appStyle" v-if="newAppStyle=='app2'">
      <div class="scanTop-wrap">
        <img v-if="newAppStyle!='app2'" src="../../assets/imgs/card/lookup/scanTop.png" alt="">
        <img v-if="newAppStyle=='app2'" src="../../assets/imgs/card/lookup/scanTop2.png" alt="">
      </div>
      <div class="search-wrap">
        <input ref="iccidDom" @focus="handleIccidFocus" v-model="iccid" @blur.prevent="iccidBlur"
               placeholder="扫码或手动输入iccid号或11位电话号" type="text">
        <span v-show="showClearBtn" @click="clearInputIccid" class="clearIccid">&times;</span>
        <span v-show="client_type!='app'" @click="scanIccid" class="iconfont icon-scan bounceIn animated"></span>
        <span v-show="client_type!='app'" class="icon-scanTip"></span>
      </div>
      <div class="btn-check-wrap">
        <card-button @clickThrotle="searchIccid(iccid)" :btnText="'查询'"></card-button>
      </div>
      <div v-show="recording_show" class="recording-wrap">
        <p class="recording-title">
          <span>历史搜索记录</span>
          <span>{{recording_list.length}}条</span>
        </p>
        <ul class="recording-list-wrap">
          <li v-for="(item,index) in recording_list">
            <span @click="searchIccid(item.iccid)">{{item.iccid}}</span>
            <span>{{item.searchTime}}</span>
            <span @click="deleteIccid(item.iccid)">&times</span>
          </li>
        </ul>
      </div><!--历史记录-->
      <van-popup :close-on-click-overlay="false" v-model="forbidden_click"></van-popup>
    </div>
  </div>

</template>

<style lang="less">
  @import "../../assets/less/utitlies";
  @import "../../assets/less/common";

  .check-card-wrap {
    padding: 0 40px;

    .scanTop-wrap {
      padding: 35px 0 90px;
      text-align: center;

      img {
        display: block;
        width: 77%;
        margin: 0 auto;
        height: auto;
      }
    }

    .search-wrap {
      position: relative;
      display: flex;
      height: 80px;
      margin-bottom: 50px;
      align-items: center;
      border: 1PX solid #38b5ed;
      border-radius: 7px;

      input {
        flex: 6;
        padding-left: 20px;
        font-size: 30px;
      }

      .clearIccid {
        position: relative;
        right: 20px;
        font-size: 50px;
        color: #888;
        line-height: .8;
        cursor: pointer;
      }

      .icon-scan {
        font-size: 78px;
        color: #38b5ed;
        line-height: 1;
      }

      .icon-scanTip {
        position: absolute;
        top: -73px;
        right: 0;
        width: 221px;
        height: 73px;
        background-image: url("../../assets/imgs/card/lookup/scanTip.png");
        background-size: 100% 100%;
      }
    }

    .btn-check-wrap {
      padding-bottom: 50px;

      button {
        display: inline-block;
        width: 50%;
        height: 70px;
        line-height: 70px;
        font-size: 28px;
        color: #fff;
        background-color: #38b5ed;
        text-align: center;
        border-radius: 70px;
      }
    }

    .recording-wrap {
      .recording-list-wrap {
        max-height: 260px;
        overflow: auto;
      }

      li {
        display: flex;
        padding: 20px;
        align-items: center;
        background-color: #fff;
        line-height: 1;
        font-size: 24px;
        border-bottom: 1PX solid #f0f0f0;
        box-sizing: border-box;

        &:last-child {
          border-bottom: none;
        }

        span {
          &:first-child {
            flex: 4;
            text-align: left;
          }

          &:nth-child(2) {
            flex: 2;
            text-align: right;
          }

          &:last-child {
            max-width: 20px;
            font-size: 48px;
            line-height: .5;
            padding-left: 10px;
            color: #e0e0e0;
          }

        }
      }
    }

    .recording-title {
      display: flex;
      padding: 20px;
      background-color: #e8eefc;
      color: #5679bf;

      span {
        &:first-child {
          flex: 4;
          text-align: left;
        }

        &:last-child {
          flex: 2;
          text-align: right;
        }
      }
    }

  }


  // app样式
  .appStyle {
    // padding: 0 40px;
    .scanTop-wrap {
      padding: 31px 0 0px 0;
      text-align: center;
      background: #00CA9D;
      height: 284px;

      img {
        display: block;
        width: 586px;
        height: 347px;
        margin: 0 auto;

      }
    }

    .search-wrap {
      position: relative;
      display: flex;
      height: 128px;
      align-items: center;
      background: #FAFAFA;
      margin: 144px 22px 32px 22px;

      input {
        flex: 6;
        padding-left: 34px;
        font-size: 32px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(46, 46, 46, 1);
      }

      .clearIccid {
        position: relative;
        right: 20px;
        font-size: 50px;
        color: #888;
        line-height: .8;
        cursor: pointer;
      }

      .icon-scan {
        font-size: 78px;
        color: #38b5ed;
        line-height: 1;
      }

      .icon-scanTip {
        position: absolute;
        top: -73px;
        right: 0;
        width: 221px;
        height: 73px;
        background-size: 100% 100%;
      }
    }

    .btn-check-wrap {
      padding-bottom: 84px;

      button {
        display: inline-block;
        width: 596px;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background-color: #00CA9D;
        text-align: center;
        border-radius: 100px;
      }
    }

    .recording-wrap {
      padding: 0 25px;

      .recording-list-wrap {
        max-height: 260px;
        overflow: auto;
      }

      li {
        display: flex;
        padding: 20px;
        align-items: center;
        background-color: #fff;
        line-height: 1;
        font-size: 24px;
        border-bottom: 1PX solid #f0f0f0;
        box-sizing: border-box;

        &:last-child {
          border-bottom: none;
        }

        span {
          &:first-child {
            flex: 4;
            text-align: left;
          }

          &:nth-child(2) {
            flex: 2;
            text-align: right;
          }

          &:last-child {
            max-width: 20px;
            font-size: 48px;
            line-height: .5;
            padding-left: 10px;
            color: #e0e0e0;
          }

        }
      }
    }

    .recording-title {
      display: flex;
      padding: 20px;
      background-color: rgba(0, 202, 157, 0.2);
      font-size: 28px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(0, 202, 157, 1);

      span {
        &:first-child {
          flex: 4;
          text-align: left;
        }

        &:last-child {
          flex: 2;
          text-align: right;
        }
      }
    }

  }
</style>


<script>
  // @ is an alias to /src
  import {
    setStorage,
    formatterCardTime,
    getStorage,
    removeStorage,
    getUrlParam,
    checkBrowser,
    lossRate
  } from '../../utilies'
  import {Popup, Notify, Toast} from 'vant'
  import {_post, _get} from "../../http";
  import cardButton from '../../components/button'
  import Empty from '../../components/empty'

  export default {
    name: "home",
    data() {
      return {
        sort_recording_list: {}, // 排序查询列表
        recording_list: [],
        recording_show: false,
        iccid: '',
        checkShow: true,//查询遮罩
        client_type: checkBrowser(),   //当前客户端环境 微信/支付宝
        showClearBtn: false,
        forbidden_click: true, //防止用户在未授权是进行业务操作
        newAppStyle: "app"
      }
    },
    components: {
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      Empty,
      cardButton,
    },
    created() {

      var UA = navigator.userAgent.toLowerCase();
      if (/(app_charge)/.test(UA) || /(ios1.1.0)/.test(UA)) {
        this.newAppStyle = "app2";
      }
      if (this.client_type !== 'wechat' || this.client_type !== 'alipay' || this.client_type !== 'app' || getStorage('token')) {
        this.forbidden_click = false
      }

      if (getStorage('userInfo', 'obj')) {
        lossRate({
          type: 2,
          user_id: getStorage('userInfo', 'obj') ? getStorage('userInfo', 'obj').account.user_id : ''
        });// 流失统计
      }
      let _this = this;

      if (getStorage('recording_list', 'arr')) {
        let local_recording_list = getStorage('recording_list', 'arr')
        if (local_recording_list.length) {
          this.recording_list = local_recording_list;
          this.recording_show = true
        }
      }

      if (getStorage('new_auth_search_iccid')) {
        this.iccid = getStorage('new_auth_search_iccid')
      } else if (getStorage('check_iccid')) {
        this.iccid = getStorage('check_iccid');
      }

      this.$watch('iccid', this.debounce((newQuery) => {
        _this.handleIccidFocus()
      }, 500));

      let scanWatchCardIccid = getUrlParam('iccid') || getStorage('watch_card'); //watch_card 兼容 授权时跳转问题

      if (scanWatchCardIccid && this.checkSearchIccid(scanWatchCardIccid).state === 1) {
        if (getStorage('watchAutoSearch') > 2) {
          removeStorage('watch_card');
          removeStorage('watchAutoSearch');
        }
        if (getStorage('watch_card_timestamp')) {
          var watch_card_timestamp = getStorage('watch_card_timestamp')
          var cur_date = new Date().getTime();

          if (cur_date > watch_card_timestamp) {
            let setTime = new Date().getTime() + (1 * 60 * 1000);
            setStorage('check_iccid', scanWatchCardIccid)
            setStorage('watch_card_timestamp', setTime);

            this.processCheckIccid(scanWatchCardIccid);//自动查询
          }
        } else {
          this.iccid = scanWatchCardIccid;
          setStorage('check_iccid', scanWatchCardIccid)
          let setTime = new Date().setTime(new Date().getTime() + 1 * 60 * 1000);
          setStorage('watch_card_timestamp', setTime);

          this.processCheckIccid(scanWatchCardIccid);//自动查询
        }

      } else {
        if (scanWatchCardIccid) {
          Notify({message: this.checkSearchIccid(scanWatchCardIccid).msg});
        }
      }
    },
    methods: {
      searchIccid: function (iccid) {
        if (!iccid) {
          Notify({message: '请输入ICCID'});
          return
        }
        if (!this.checkSearchIccid(iccid).state) {
          Notify({message: this.checkSearchIccid(iccid).msg});
          return
        }
        this.processCheckIccid(iccid);
      },
      processCheckIccid: function (iccid) {
        // 清除用户输入的字母
        let newIccid;
        if (/[a-zA-Z]/.test(iccid.replace(/\s/g, "").charAt(iccid.length - 1))) {
          newIccid = iccid.replace(/\s/g, "").substr(0, iccid.length - 1);
        } else {
          newIccid = iccid.replace(/\s/g, "");
        }
        Toast.loading({
          mask: true,
          message: "查询中,请等候",
          forbidClick: true,
          duration: 0,
        });

        let isExist = false,
          _this = this;
        if (this.recording_list.length) {
          this.recording_list.map(function (item, index) {
            if (item.iccid === newIccid) {
              item.searchTime = formatterCardTime().searchTime;
              item.millisecond = formatterCardTime().millisecond;
              isExist = true;
            }
          });
          if (!isExist) {
            this.recording_list.push({
              'iccid': newIccid,
              'searchTime': formatterCardTime().searchTime,
              'millisecond': formatterCardTime().millisecond
            })
          }
        } else {
          this.recording_list.push({
            'iccid': newIccid,
            'searchTime': formatterCardTime().searchTime,
            'millisecond': formatterCardTime().millisecond
          })
          this.recording_show = true;
        }
        this.recording_list.sort(this.compare('millisecond'));
        if (this.recording_list.length > 20) {
          this.recording_list.splice(20)
        }
        setStorage('recording_list', this.recording_list, 'arr', true);

        //查询
        _post('/api/v1/app/new_auth/check_auth_', {
          iccid: newIccid,
        }).then(res => {
          Toast.clear();
          let autoCount = getStorage('watchAutoSearch');
          if (autoCount) {
            autoCount++;
            setStorage('watchAutoSearch', autoCount);
          }
          if (res.state === 1) {
            setStorage('originPrice', res.data.default_price);
            setStorage('check_iccid', res.data.iccid);
            setStorage('new_auth_search_iccid', res.data.iccid);
            localStorage.setItem("currentType", "card");
            if (res.data.status === 1) {
              this.$router.push({path: '/weixin/card/usage'})
            } else if (res.data.status === 2) {
              setStorage('check_realNameSource', res.data.source);
              lossRate({type: 3, iccid: res.data.iccid})
                .then(res => {
                  this.$router.push({path: '/weixin/new_card/real_name'});
                });
            } else if (res.data.status === 3) {
              lossRate({type: 3, iccid: res.data.iccid})
                .then(res => {
                  this.$router.push({path: '/weixin/card/plan_list', query: {type: 1}});
                });
            }
          } else {
            Notify({
              message: res.msg
            });
          }
        })
      },
      scanIccid() {
        let _this = this;
        if (this.client_type === 'wechat') {
          this.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              result.indexOf(',') > -1 ? result = result.substr(result.indexOf(',') + 1, result.length) : result;
              _this.iccid = (result.replace(/\s*/g, ""));
              _this.processCheckIccid(_this.iccid);
            }
          });
        } else if (this.client_type === 'alipay') {
          ap.scan(function (res) {
            let result = res.code; // 当needResult 为 1 时，扫码返回的结果

            _this.iccid = (result.replace(/\s*/g, ""));
            _this.processCheckIccid(_this.iccid)
          });
        }
      },
      inArray: function (elem, arr, i) {
        return arr == null ? -1 : arr.indexOf(elem, i);
      },
      compare: function (property) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
        }
      },
      checkSearchIccid: function (paramIccid) {
        let iccid = paramIccid.replace(/\s/g, "");
        if (!iccid) {
          return {
            state: 0,
            msg: '请输入ICCID'
          }
        }
        if ((iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) !== "89") && (iccid.length !== 11 && iccid.length !== 13 && iccid.length !== 15 && iccid.length !== 16)) {
          return {
            state: 0,
            msg: 'ICCID有误,请检查'
          };
        }
        if (!/^[a-zA-Z0-9]+$/.test(iccid)) {
          return {
            state: 0,
            msg: "ICCID有误,请检查"
          }
        }
        return {
          state: 1
        }
      },
      deleteIccid: function (iccid) {
        let deleteIndex = -1;
        for (let i = 0; i < this.recording_list.length; i++) {
          if (this.recording_list[i].iccid === iccid) {
            deleteIndex = i;
            break
          }
        }
        if (deleteIndex >= 0) {
          this.recording_list.splice(deleteIndex, 1);
          setStorage('recording_list', this.recording_list, 'arr', true);
        }

        if (!this.recording_list.length) {
          this.recording_show = false
        }
      },
      handleIccidFocus() {
        if (this.iccid) {
          this.showClearBtn = true
        } else {
          this.showClearBtn = false
        }
      },
      clearInputIccid() {
        this.iccid = '';
        this.$refs.iccidDom.focus()
        this.showClearBtn = false
      },
      iccidBlur() {
        this.showClearBtn = false
      },
      debounce(func, delay) {
        let timer
        return (...args) => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
    }
  };
</script>

