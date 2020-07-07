<template>
  <div class="check-card-wrap">
    <div ref="ref_top" class="scanTop-wrap">
      <img src="../../../assets/imgs/card/lookup/scanTop.png" alt="">
    </div>
    <div ref="ref_search" class="search-wrap">
      <input ref="iccidDom" @focus="handleIccidFocus" v-model="iccid" @blur.prevent="iccidBlur"
             placeholder="扫码或手动输入iccid号或11位电话号" type="text">
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
</template>

<script>
  // @ is an alias to /src
  import {setStorage, formatterCardTime, getStorage, removeStorage, getUrlParam, checkBrowser} from '../../../utilies'
  import {Popup, Notify,Dialog} from 'vant'
  import {_post, _get} from "../../../http";
  import cardButton from '../../../components/button/index'

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
      cardButton
    },
    created() {
      this.$store.commit('mifiCommon/changeErrStatus', {show: false});
      let _this = this;

      if (getStorage('recording_list', 'arr')) {
        let local_recording_list = getStorage('recording_list', 'arr');

        if (local_recording_list.length) {

          this.recording_list = local_recording_list;
          this.recording_show = true;
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

          var watch_card_timestamp = getStorage('watch_card_timestamp');
          var cur_date = new Date().getTime();

          if (cur_date > watch_card_timestamp) {
            let setTime = new Date().getTime() + (1 * 60 * 1000);
            setStorage('check_iccid', scanWatchCardIccid);
            setStorage('watch_card_timestamp', setTime);
            this.processCheckIccid(scanWatchCardIccid);//自动查询
          }

        } else {
          this.iccid = scanWatchCardIccid;
          setStorage('check_iccid', scanWatchCardIccid);
          let setTime = new Date().setTime(new Date().getTime() + 1 * 60 * 1000);
          setStorage('watch_card_timestamp', setTime);

          this.processCheckIccid(scanWatchCardIccid);//自动查询
        }


      } else {
        if (scanWatchCardIccid) {
          Notify({message: this.checkSearchIccid(scanWatchCardIccid).msg});
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
        if (!this.checkSearchIccid(iccid).state) {
          Notify({message: this.checkSearchIccid(iccid).msg});
          return
        }
        this.processCheckIccid(iccid);
      },

       processCheckIccid: function (iccid) {
        this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
        //查询
        _post('/api/v1/app/new_auth/check_auth_', {
          iccid: iccid,
        }).then(async res => {
          this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
          let autoCount = getStorage('watchAutoSearch');
          if (autoCount) {
            autoCount++;
            setStorage('watchAutoSearch', autoCount);
          }

          if (res.state === 1) {

            //奇宇卡控制
            if(res.data.is_qiyu === 1 ) {
              Notify({
                message: '此卡不属于物联网M2M服务平台'
              });
              return
            }
            setStorage('check_iccid', res.data.iccid);
            setStorage('new_auth_search_iccid', res.data.iccid);

            this.recordingIccid({
              iccid: res.data.iccid,
              realname: (!(res.data.status === 2 || res.data.status === 3))
            }); // 增加iccid实名记录

            if (res.data.status === 1) {
              this.$router.push({path: '/mifi/card/index'});
            }
            if (res.data.status === 2 || res.data.status === 3) {

              let activitySourceArray=[1,7,11,16];
              // if( activitySourceArray.indexOf(await this.getSource(iccid))!=-1){
              //   Dialog.confirm({
              //     title: '活动通知',
              //     message: '尊敬的客户，您好！即日起我司将推出各种“优惠活动套餐”和”价格美丽的超大流量套餐（527G、465G）”，如需参与活动请点击下方”同意“申请更换新卡后选购即可，如有疑问请联系我司在线客服，感谢您的支持！活动时间：11月25日-12月1日',
              //     confirmButtonText:"同意"
              //   }).then(() => {
              //     this.toChangeCard();
              //   }).catch(() => {
              //     this.toRealname(res.data.iccid,res.data.source);
              //   });
              // }else{
                this.toRealname(res.data.iccid,res.data.source);
              // }
            }
          } else {
            Notify({message: res.msg})
          }
        })
      },
      toRealname(iccid,source){
        let sourceArr = [45, 46];
        let toInternal = false;
        if (sourceArr.includes(source)) {
          toInternal = true;
        }
        setStorage('check_realNameSource', source);
        _get('/api/v1/app/cards/realname', {
          iccid: iccid
        }).then(res => {
          if (res.data === 1 || toInternal) {
            window.location.href = `${this.global_variables.realname_url}?iccid=${iccid}&source=${source}&urlType=2`;
          } else {
            this.$router.push({
              path: '/weixin/new_card/real_name',
              query: {from: 'mifi'}
            });
          }
        })
      },
      recordingIccid(params) {
        let isExist = false;
        if (this.recording_list.length) {
          this.recording_list.map(function (item, index) {
            if (item.iccid === params.iccid) {
              item.searchTime = formatterCardTime().searchTime;
              item.millisecond = formatterCardTime().millisecond;
              item.realname = params.realname;
              isExist = true;
            }
          });
          if (!isExist) {
            this.recording_list.push({
              'iccid': params.iccid,
              'searchTime': formatterCardTime().searchTime,
              'millisecond': formatterCardTime().millisecond,
              'realname': params.realname,
            })
          }
        } else {
          this.recording_list.push({
            'iccid': params.iccid,
            'searchTime': formatterCardTime().searchTime,
            'millisecond': formatterCardTime().millisecond,
            'realname': params.realname,
          })
          this.recording_show = true;
        }

        this.recording_list.sort(this.compare('millisecond'));

        if (this.recording_list.length > 20) {
          this.recording_list.splice(20)
        }

        setStorage('recording_list', this.recording_list, 'arr', true);
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
        if ((iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) !== "89") && (iccid.length !== 13 && iccid.length !== 11 && iccid.length !== 15 && iccid.length !== 16)) {
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
          if (this.recording_list[i].iccid === iccid) {
            deleteIndex = i;
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
      getSource(iccid){
        let p =new Promise((resolve,reject)=>{
          _get('/api/v1/app/cards/details',{
              iccid:this.iccid,
          }).then(res=>{
              if(res.state==1){
                resolve(res.data.source);
              }
          })
        })
        return p;
      },
      toChangeCard(){this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)},


    }
  };
</script>

<style lang="less">
  @import "../../../assets/less/utitlies";
  @import "../../../assets/less/common";

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
</style>




