<template>
  <div class="whiteSearch">
    <div class="whiteHead">
      <div class="operationLogoWrap">
        <img :src="operatorLogo" alt="">
      </div>
      <div class="whiteHeadH1">手表卡白名单列表</div>
    </div>

    <div class="whiteTab">
        <div>详情
          <span></span>
        </div>
        <div></div>
        <div></div>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>

    <div class="btnWhitWrap">
      <button @click="show = true">新增白名单</button>
    </div>

    <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }" >
      <div class="whitePhone">
        <i></i>
        <input  type="number" pattern="[0-9]*" value="" placeholder="请输入手机号" v-model="phone" style="border:none;">
        <div class="create" @click="whiteCreate">新增</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { List, Cell, Tab, Tabs, Popup, Notify } from 'vant'
import {_post, _get} from "../../http";
export default {
  name: 'whiteSearch',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Notify.name]: Notify,
    [Popup.name]: Popup,
  },
  data() {
    return {
      operatorLogo: null,
      list: [],
      loading: false,
      finished: false,
      show: false,
      phone: null,
      msisdn: null
    }
  },
  created() {
    if (this.$route.query.operator == 0) {
      this.operatorLogo = require('../../assets/imgs/card/usage/unicom-logo.svg')
    } else if (this.$route.params.operator == 1) {
      this.operatorLogo = require('../../assets/imgs/card/usage/mobile-logo.png')
    } else {
      this.operatorLogo = require('../../assets/imgs/card/usage/telecom-logo.svg')
    }
    this.msisdn = this.$route.query.msisdn
  },
  methods: {
     onLoad() {
      _get('/opi/cards/get_yd_wt_list', {
        iccid: this.msisdn
      }).then((res) => {
        if (res.code == 0) {
          this.loading = false;
          let data = res.data.whiteList.userWhiteInfo
          for (let i = 0; i < data.length; i++) {
            this.list.push(data[i].userWhiteNum);
          }
        }
         this.loading = false;
         this.finished = true;
      })
    },
    whiteCreate() {
      _get('/opi/cards/add_yd_wt_list', {
        iccid: this.msisdn,
        phones: this.phone
      }).then((res) => {
        this.show = false
        if (res.status == 1) {
          Notify({
            message: '新增成功',
            background: '#558B2F'
          })
        } else{
          Notify({
            message: res.msg,
            background: '#e53935'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
  .whiteSearch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .whiteHead{
      width: 100%;
      padding: 15px;
      display: flex;
      height: 190px;
      box-sizing: border-box;
      align-items: center;
      background: rgba(235, 232, 232, 0.856);
      border-radius: 5px;
      .operationLogoWrap {
        margin-right: 15px;
        img {
          width: 160px;
          height: 160px;;
        }
      }
      .whiteHeadH1 {
        width: 400px;
        height: 70px;
        margin: 0 auto;
        background-image: linear-gradient(167deg,#00d2ff,#3a7bd5);
        border-radius: 8px;
        font-size: 32px;
        color: #FFFFFF;
        line-height: 70px;
        letter-spacing: 3px;
        font-weight: 600;
      }
    }
    .whiteTab {
      display: flex;
      width: 100%;
      height: 70px;
      margin: 0 0 6px 0;
      div {
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        box-sizing: border-box;
        min-width: 0;
        padding: 0 7px;
        color: #646566;
        font-size: 27px;
        line-height: 70px;
        text-align: center;
        cursor: pointer;
        span {
          display: block;
          width: 100px;
          height: 6px;
          background-color: rgb(58, 123, 213);
          z-index: 6;
          border-radius: 8px;
          margin: 0 auto;
        }
      }
    }
    .btnWhitWrap {
      position: fixed;
      bottom: 0;
      height: 140px;
      padding: 30px 0;
      box-sizing: border-box;

      button {
        display: inline-block;
        width: 430px;
        height: 80px;
        font-size: 28px;
        color: #fff;
        background: #38b5ed;
        border-radius: 80px;
      }
    }
    .whitePhone {
      width: 630px;
      height: 150px;
      background: #ffffff;;
      border-radius: 24px;
      margin: 30px auto;
      display:flex;
      justify-content: center;
      align-items: center;
      i {
        display:inline-block;
        width:32px;
        height:32px;
        background:url("../../assets/imgs/whiteLists/bindCode.png")no-repeat;
        background-size:100% 100%;
      }
      input {
        width:300px;
        height: 60px;
        margin-left:44px;
        outline:none;
        line-height:50px;
        font-size: 26px;
      }
      .create {
        width:106px;
        height:66px;
        background:rgba(68,149,230,1);
        box-shadow:0px 2px 20px 0px rgba(135,194,254,1);
        border-radius:10px;
        font-size:28px;
        font-family:PingFangSC-Regular,PingFangSC;
        color:rgba(255,255,255,1);
        text-align:center;
        line-height:66px;
        letter-spacing: 2px;
      }
    }

  }
  .van-popup {
    background:#f5f5f5;
  }
</style>