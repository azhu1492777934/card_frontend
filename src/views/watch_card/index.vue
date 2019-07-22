<template>
  <div class="check-card-wrap">
    <div class="scanTop-wrap">
      <img src="../../assets/imgs/card/lookup/scanTop.png" alt="">
    </div>
    <p class="search_title">请扫描或输入您的ICCID,我们将为您查询您的儿童手表卡卡机号～</p>
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
    <van-popup :close-on-click-overlay="false" v-model="checkShow">
      <p class="showTip">正在查询手表卡，请等候</p>
    </van-popup>
  </div>
</template>

<style lang="less">
  @import "../../assets/less/utitlies";
  @import "../../assets/less/common";

  .check-card-wrap {
    padding: 0 40px;

    .scanTop-wrap {
      padding: 35px 0 60px;
      text-align: center;

      img {
        display: block;
        width: 67%;
        margin: 0 auto;
        height: auto;
      }
    }

    .search_title {
      width: 90%;
      margin: 0 auto 110px;
      text-align: center;
      font-size: 32px;
      color: #189ad6;
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
    checkICCID
  } from '../../utilies'
  import {Popup, Notify, Dialog} from 'vant'
  import {_post, _get} from "../../http";
  import cardButton from '../../components/button'
  // import wx from 'weixin-js-sdk'

  export default {
    name: "home",
    data() {
      return {
        sort_recording_list: {}, // 排序查询列表
        recording_list: [],
        recording_show: false,
        iccid: '',
        checkShow: false,//查询遮罩
        client_type: checkBrowser(),//当前客户端环境 微信/支付宝
        showClearBtn: false
      }
    },
    components: {
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
      cardButton
    },
    created() {
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

      this.$watch('iccid', this.debounce(() => {
        _this.handleIccidFocus()
      }, 500))

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
        this.checkShow = true
        let isExist = false;
        if (this.recording_list.length) {

          this.recording_list.map(function (item, index) {
            if (item.iccid == iccid) {
              item.searchTime = formatterCardTime().searchTime
              item.millisecond = formatterCardTime().millisecond
              isExist = true;
            }
          });
          if (!isExist) {
            this.recording_list.push({
              'iccid': iccid,
              'searchTime': formatterCardTime().searchTime,
              'millisecond': formatterCardTime().millisecond
            })
          }
        } else {
          this.recording_list.push({
            'iccid': iccid,
            'searchTime': formatterCardTime().searchTime,
            'millisecond': formatterCardTime().millisecond
          })
          this.recording_show = true;
        }

        this.recording_list.sort(this.compare('millisecond'));

        if (this.recording_list.length > 20) {
          this.recording_list.splice(20)
        }

        setStorage('recording_list', this.recording_list, 'arr')

        //查询
        _post('/api/v1/app/search_mobile', {
          iccid: iccid,
        }).then(res => {

          this.checkShow = false

          if (res.state == 1) {

            setStorage('check_iccid', res.data.iccid);
            setStorage('new_auth_search_iccid', iccid);

            if (res.data.msisdn.substr(0, 2) == '89') {
              Dialog.alert({
                message: '手表手机号：' + res.data.msisdn.substring(2, res.data.msisdn.length)
              })
            } else {
              Dialog.alert({
                message: '手表手机号：' + res.data.msisdn
              })
            }
          }
          // else if(res.state==2){
          //
          //     Notify({message:'流量卡暂不支持通话功能,请输入手表卡的ICCID号码'})
          // }
          else {
            Notify({
              message: res.msg
            })
          }
        })

      },

      scanIccid() {
        let _this = this;

        if (this.client_type == 'wechat') {
          this.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              if (result && (result.length == 19 || result.length == 20)) {
                _this.iccid = (result.replace(/[^0-9]*/g, ""));
                _this.processCheckIccid(_this.iccid)
              } else {
                Notify({message: '请扫描正确的ICCID'});
              }
            }
          });
        } else if (this.client_type == 'alipay') {

          ap.scan(function (res) {
            var result = res.code; // 当needResult 为 1 时，扫码返回的结果

            _this.iccid = (result.replace(/[^0-9]*/g, ""));
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

      checkSearchIccid: function (iccid) {
        if (!iccid) {
          return {
            state: 0,
            msg: '请输入ICCID'
          }
        }
        if (iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) != "89") {
          return {
            state: 0,
            msg: 'ICCID有误,请检查'
          };
        }
        return {
          state: 1
        }
      },

      deleteIccid: function (iccid) {
        let deleteIndex = -1;
        for (let i = 0; i < this.recording_list.length; i++) {
          if (this.recording_list[i].iccid == iccid) {
            deleteIndex = i
            break
          }
        }
        if (deleteIndex >= 0) {
          this.recording_list.splice(deleteIndex, 1);
          setStorage('recording_list', this.recording_list, 'arr');
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
        this.showClearBtn = false
        this.$refs.iccidDom.focus()
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

