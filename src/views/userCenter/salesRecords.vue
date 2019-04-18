<template>
  <div class="salesRecord">
    <div ref="recordList">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getRecord" >
        <div v-for="(item,index) in recordList" v-bind:key="index" class="rechargeRecordItem">
          <div>
            <div>设备号：<span>{{item.device_id}}</span></div>
          </div>
          <div>
            <div>姓名：<span>{{item.user_name}}</span></div>
            <div> <span>{{item.mobile}}</span> </div>
          </div>
          <div>
            <div>地址：{{item.province}}{{item.city}}{{item.district}}{{item.addr}}</div>
          </div>
          <div>
            <div @click="showDetails(item)">查看详情 ></div>
            <div>申请时间：{{item.created_at}}</div>
          </div>

        </div>
      </van-list>
    </div>


    <div ref="recordButton" class="submitButton" @click="goAddSales">售后申请</div>
    <van-popup :close-on-click-overlay="false" v-model="isExistOrder">
      <p class="showTip">{{load_plan_msg}}</p>
    </van-popup>

    <van-popup v-model="detailsShow" >
      <div class="detailsStyle">
        <div><span>申请时间：</span> <span>{{currentDetails.created_at}}</span></div>
        <div><span>设 备 号：</span><span>{{currentDetails.device_id}}</span></div>
        <div><span>类 型：</span><span>{{currentDetails.type}}</span></div>
        <div><span>运 单 号：</span><span>{{currentDetails.no}}</span></div>
        <div><span>快 递 名：</span><span>{{currentDetails.express_name}}</span></div>
        <div><span>手 机 号：</span><span>{{currentDetails.mobile}}</span></div>
        <div><span>姓 名：</span><span>{{currentDetails.user_name}}</span></div>
        <div><span>地 址：</span><span>{{currentDetails.province}}{{currentDetails.city}}{{currentDetails.district}}</span></div>
        <div><span>详细地址：</span><span>{{currentDetails.addr}}</span></div>
        <div><span>备 注：</span><span>{{currentDetails.remark}}</span></div>
      </div>
      
    </van-popup>
  </div>
</template>

<script>
import { setStorage, getStorage } from "../../utilies";
import { getSalesRecords } from "./api/api";
import { Notify, Popup, List } from "vant";

export default {
  data() {
    return {
      recordList: [],
      userInfo: {},
      isExistOrder: false,
      load_plan_msg: "暂无申请记录",
      loading: false,
      finished: false,
      offset: 0,
      limit: 10,
      total:0,
      detailsShow:false,
      currentDetails:{}
    };
  },
  components: {
    vanPopup: Popup,
    vanList: List
  },
  created() {
    this.userInfo = getStorage("userInfo", "obj");

    // this.getRecord();
  },
  methods: {
    //处理接口返回数据
    dealApi(val) {
      let data = val;
      let p = new Promise(function(resolve, reject) {   
        data.url(data).then((res)=> {
            if (res.state == 1) {
              resolve(res);
            } else {
              Notify({ message: res.msg });
            }
          })
          .catch(error => {
            Notify({ message: "服务器出小差了，请稍后再试" });
          })
      });
      return p;
    },

    //获取充值记录
      async getRecord() {
      let _this = this;
        if (this.total <= this.recordList.length && this.recordList.length != 0) {
        this.finished = true;
        this.loading = false;
        return;
      }
      let obj = {
        url: getSalesRecords,
        params: {
          third_id:_this.userInfo.account.user_id,
          // user_id: "613639",
          offset: _this.offset,
          limit: _this.limit
        }
      };

      let list = await this.dealApi(obj);
      _this.loading = false;
      if (list.state == 1) {
        if (list.data.total == 0) {
          _this.finished = true;
          Notify({ message: "暂无申请记录" });

          _this.loading = false;
        } else if (list.data.total > 0 && list.data.rows.length == 0) {
          _this.finished = true;
          //数据已加载完毕

        } else {

          
          _this.offset += _this.limit;
          _this.total = list.data.total;
          _this.recordList= _this.recordList.concat(list.data.rows);
          for(let i=0;i<_this.recordList.length;i++){
            if(_this.recordList[i].type==0){
              _this.recordList[i].type="返修";
            }else if(_this.recordList[i].type==1){
              _this.recordList[i].type="换新";
            }else if(_this.recordList[i].type==2){
              _this.recordList[i].type="补卡";
            }else{
              _this.recordList[i].type="翻新";
            }
          }

          this.$nextTick(() => {
              let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                  // recordList = this.$refs.recordList.offsetHeight,
                  recordButton = this.$refs.recordButton.offsetHeight,
                  userHeight = getStorage('userHeight') || 44;
              if (this.client_type == 'wechat' || this.client_type == 'alipay') {
                  this.$refs.recordList.style.height = (clientHeight - recordButton  - userHeight) + 'px'
              } else {
                  this.$refs.recordList.style.height = (clientHeight - recordButton ) + 'px'
              }
          })
        }
      } else {
        this.finished = true;
        Notify({ message: list.msg });
      }
      
    },
    //GOGOGO
    goAddSales(){
      this.$router.push({path:"addSalesRecords"})
    },
    //显示详情
    showDetails(val){
      this.detailsShow=true;
      this.currentDetails=val;
    }
  }
};
</script>

<style lang="less">
.salesRecord {
  background: #f6f6f6;
  height: 100%;
  overflow: auto;
  .rechargeRecordItem{
    font-size:26px;
    font-family:SourceHanSansSC-Normal;
    font-weight:400;
    color:rgba(89,89,89,1);
    text-align:left;
    margin-top:10px;
    background:#fff;
    padding:30px 40px 18px 40px;
    >div:nth-child(1) span,>div:nth-child(2) span{
      font-family:SourceHanSansSC-Medium;
      font-weight:500;
    }
    >div:nth-child(2){
      display:flex;
      margin-bottom:25px;
    }
    >div:nth-child(1){
      margin-bottom:25px;
    }
    >div:nth-child(3){
      margin-bottom:25px;
    }
    >div:nth-child(2)>div:nth-child(2){
      margin-left:90px;
    }
    >div:nth-child(4){
      display:flex;
      border-top:1px solid #DFDFDF;
      padding-top:19px;
      justify-content: space-between;
    }
    >div:nth-child(4)>div:nth-child(1){
      color:#6AB6FE;
    }

    
  }
 
  .submitButton{
    width:406px;
    height:69px;
    background:linear-gradient(-33deg,rgba(253,212,122,1),rgba(240,181,70,1));
    border-radius:35px;
    font-size:32px;
    font-family:SourceHanSansSC-Regular;
    font-weight:400;
    color:rgba(68,63,56,1);
    line-height:69px;
    margin:0 auto;
  }
  .van-popup{
      width:600px;
        background:#fff;
      }
      .detailsStyle {
        text-align:left;
        padding:50px 0 0 30px;
        font-size:26px;
        font-family:SourceHanSansSC-Normal;
        font-weight:400;
        color:rgba(51,51,51,1);
        >div{
          margin-bottom:34px;
          
          >span:nth-child(1){
            display:inline-block;
            width:150px;
            text-align:right;
          }
          >span:nth-child(2){
            color:#8A8A8A;
          }
        }
      }
}
</style>