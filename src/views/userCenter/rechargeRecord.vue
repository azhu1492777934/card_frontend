<template>
  <div class="rechargeRecord">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getRecord" >
      <div v-for="(item,index) in recordList" v-bind:key="index" class="rechargeRecordItem">
        <div>
          <div>订单号</div>
          <div>{{item.no}}</div>
        </div>
        <div>
          <div>设备号</div>
          <div>{{item.imei}}</div>
        </div>
        <div>
          <div>ICCID</div>
          <div>{{item.iccid}}</div>
        </div>
        <div>
          <div>套餐名</div>
          <div>{{item.name}}</div>
        </div>
        <div>
          <div>金额</div>
          <div class="moneyStyle">¥{{item.price}}</div>
        </div>
        <div>
          <div>开票状态</div>
          <div>{{item.is_invoice}}</div>
        </div>
      </div>
    </van-list>

    <van-popup :close-on-click-overlay="false" v-model="isExistOrder">
      <p class="showTip">{{load_plan_msg}}</p>
    </van-popup>
  </div>
</template>

<script>
import { setStorage, getStorage } from "../../utilies";
import { getChargeRecord } from "./api/api";
import { Notify, Popup, List } from "vant";

export default {
  data() {
    return {
      recordList: [],
      userInfo: {},
      isExistOrder: false,
      load_plan_msg: "暂无充值记录",
      loading: false,
      finished: false,
      offset: 0,
      limit: 10,
      total:0,
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
        url: getChargeRecord,
        params: {
          user_id:_this.userInfo.account.user_id,
          // user_id: "613639",
          // iccid:getStorage('check_iccid'),
          // iccid: "8986061703002423508",
          offset: _this.offset,
          limit: _this.limit
        }
      };

      let list = await this.dealApi(obj);
      _this.loading = false;
      if (list.state == 1) {
        if (list.data.total == 0) {
          _this.finished = true;
          _this.isExistOrder = true;
          _this.loading = false;
        } else if (list.data.total > 0 && list.data.rows.length == 0) {
          _this.finished = true;
          //数据已加载完毕

        } else {

          _this.isExistOrder = false;
          _this.offset += _this.limit;
          _this.total = list.data.total;
          _this.recordList= _this.recordList.concat(list.data.rows);

          for (let i = 0; i < _this.recordList.length; i++) {
            if (_this.recordList[i].is_invoice == 0) {
              _this.recordList[i].is_invoice = "未开票";
            } else {
              _this.recordList[i].is_invoice = "已开票";
            }
          }

          
        }
      } else {
        this.finished = true;
        Notify({ message: list.msg });
      }
      
    }
  }
};
</script>

<style lang="less">
#app, .inner-wrap, body, html{
  background: #f6f6f6;
  height: 100%;
  border-top:1px solid #f6f6f6;
}
.rechargeRecord {
  background: #f6f6f6;
  border-top:1px solid #f6f6f6;
  > div:nth-child(1) {
    margin-top: 12px;
  }
  .rechargeRecordItem {
    background: #fff;
    margin-top: 46px;
    padding: 0 18px;
    font-size: 28px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 90px;
    > div:last-child {
      border: none;
    }
    > div {
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      justify-content: space-between;
      padding: 0 40px 0 20px;
      > div:nth-child(1) {
        text-align: left;
      }
      > div:nth-child(2) {
        text-align: right;
      }
      > div {
        flex: 1;
      }
    }
  }

  .moneyStyle {
    color: #f8761f;
  }
}
</style>