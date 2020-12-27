<template>
  <div class="check-card-wrap-top">
    <van-notice-bar
      left-icon="volume-o"
      color="#1989fa" 
      background="#ecf9ff"
      text="请输入您的ICCID号，将跳转到对应的在线客服。"
    />
    <div class="check-card-wrap">
      <div ref="ref_top" class="scanTop-wrap">
        <img src="../../../assets/imgs/card/lookup/scanTop.png" alt="">
      </div>
      <div ref="ref_search" class="search-wrap">
        <input ref="iccidDom" @focus="handleIccidFocus" v-model="iccid" @blur.prevent="iccidBlur"
              placeholder="扫码或手动输入iccid号" type="text">
        <span v-show="showClearBtn" @click="clearInputIccid" class="clearIccid">&times;</span>
        <span @click="testClick" class="iconfont icon-scan bounceIn animated"></span>
      </div>
      <div ref="ref_button" class="btn-check-wrap">
        <card-button @clickThrotle="searchIccid(iccid)" :btnText="'查询'"></card-button>
        <a class="advert" target="_Blank" :href="advertisement" v-if="!(this.global_variables.device === 'iphone')"></a>
      </div>
      <div v-show="recording_show" class="recording-wrap">
        <p ref="recording_title" class="recording-title">
          <span>历史搜索记录</span>
          <span>{{recording_list.length}}条</span>
        </p>
        <ul ref="main_recording" class="recording-list-wrap">
          <li v-for="(item,index) in recording_list">
            <span @click="searchIccid(item.iccid)">{{item.iccid}}</span>
            <span>{{item.searchTime}}</span>
            <span @click="deleteIccid(item.iccid)">&times</span>
          </li>
        </ul>
      </div><!--历史记录-->
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src
  import {setStorage, formatterCardTime, getStorage, removeStorage, getUrlParam, checkBrowser} from '../../../utilies'
  import {Popup, Notify, Dialog, NoticeBar} from 'vant'
  import {_post, _get} from "../../../http";
  import cardButton from '../../../components/button/index'
  import kefuData from '../../../assets/js/kefuData'

  export default {
    name: "home",
    data() {
      return {
        advertisement: 'https://interaction.clotfun.online/horse?appkey=db8a11aa22c93a1fa17fb5d7756288dc&adSpaceKey=eb7cfa98ab24d3fce04352f258f83e97&from=H5&1=1', // 广告
        sort_recording_list: {}, // 排序查询列表
        recording_list: [],
        recording_show: false,
        iccid: '',
        client_type: checkBrowser(),//当前客户端环境 微信/支付宝
        showClearBtn: false,
      }
    },
    components: {
      [Popup.name]: Popup,
      cardButton,
      [NoticeBar.name]: NoticeBar,
    },
    created() {
      this.$store.commit('mifiCommon/changeErrStatus', {show: false});
      let _this = this;

      if (getStorage('recording_list_kefu', 'arr')) {
        let local_recording_list = getStorage('recording_list_kefu', 'arr');

        if (local_recording_list.length) {

          this.recording_list = local_recording_list;
          this.recording_show = true;
        }
      }

      if (this.recording_show) {
        this.$nextTick(() => {
          let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
            ref_top = this.$refs.ref_top.offsetHeight,
            ref_search = this.$refs.ref_search.offsetHeight,
            ref_button = this.$refs.ref_button.offsetHeight,
            recording_title = this.$refs.recording_title.offsetHeight;
          this.$refs.main_recording.style.height = (clientHeight - ref_top - ref_search - ref_button - recording_title - 50) + 'px';
        })
      }
    },
    methods: {
      testClick() {
        let _this = this;
        if (this.client_type === 'wechat') {
          this.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              result.indexOf(',') > -1 ? result = result.substr(result.indexOf(',') + 1, result.length) : result;
              _this.iccid = (result.replace(/\s*/g, ""));
              _this.processCheckIccid(_this.iccid)
            }
          });
        } else if (this.client_type === 'alipay') {

          ap.scan(function (res) {
            var result = res.code; // 当needResult 为 1 时，扫码返回的结果

            _this.iccid = (result.replace(/\s*/g, ""));
            _this.processCheckIccid(_this.iccid)
          });
        }
      },
      searchIccid: function (iccid) {
        if (!iccid) {
          Notify({message: '请输入ICCID'});
          return
        }
        this.processCheckIccid(iccid);
      },
      recordingIccid(iccid) {
        let isExist = false;
        if (this.recording_list.length) {
          this.recording_list.map(function (item, index) {
            if (item.iccid === iccid) {
              item.searchTime = formatterCardTime().searchTime;
              item.millisecond = formatterCardTime().millisecond;
              isExist = true;
            }
          });
        } else {
          this.recording_list.push({
            'iccid': iccid,
            'searchTime': formatterCardTime().searchTime,
            'millisecond': formatterCardTime().millisecond,
          })
          this.recording_show = true;
        }

        if (this.recording_list.length > 20) {
          this.recording_list.splice(20)
        }

        setStorage('recording_list_kefu', this.recording_list, 'arr', true);
      },

      processCheckIccid: function (iccid) {
        this.recordingIccid(iccid)
        if (kefuData.some((v) => { return v == iccid})) {
          location.href = 'https://ykf-webchat.7moor.com/wapchat.html?accessId=f9d6d3c0-477a-11eb-be9c-2fda4284025c&fromUrl=&urlTitle=&language=ZHCN'
        } else {
          location.href = 'https://ykf-webchat.7moor.com/wapchat.html?accessId=505a9e80-2075-11ea-9c67-676d79fbc218&fromUrl=&urlTitle='
        }
      },
      scanIccid() {
        let _this = this;
        if (this.client_type === 'wechat') {
          this.wx.ready(function(){
            console.log(_this.wx)
            _this.wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                result.indexOf(',') > -1 ? result = result.substr(result.indexOf(',') + 1, result.length) : result;
                _this.iccid = (result.replace(/\s*/g, ""));
                _this.processCheckIccid(_this.iccid)
              }
            });
          })

        } else if (this.client_type === 'alipay') {

          ap.scan(function (res) {
            var result = res.code; // 当needResult 为 1 时，扫码返回的结果

            _this.iccid = (result.replace(/\s*/g, ""));
            _this.processCheckIccid(_this.iccid)
          });
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
          setStorage('recording_list_kefu', this.recording_list, 'arr');
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
        this.$refs.iccidDom.focus();
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
      },


    }
  };
</script>

<style lang="less">
  @import "../../../assets/less/utitlies";
  @import "../../../assets/less/common";
  .check-card-wrap-top {
    width: 100%;
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
          background-image: url("../../../assets/imgs/card/lookup/scanTip.png");
          background-size: 100% 100%;
        }
      }

      .btn-check-wrap {
        padding-bottom: 50px;
        position: relative;

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
        .advert {
          width: 62px;
          height: 86px;
          background: url("../../../assets/imgs/card/lookup/advert.gif");
          background-size: 100%;
          position: absolute;
          top: -8px;
          right: 0;
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
  }

</style>




