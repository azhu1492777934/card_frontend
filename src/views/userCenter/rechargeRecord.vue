<template>
  <div class="rechargeRecord">
    <div v-for="(item,index) in recordList" v-bind:key="index">
      <div>111</div>
      <div>222</div>
      <div>333</div>
      <div>444</div>
      <div>555</div>
      <div>666</div>
    </div>
    <uni-load-more :loadingType="loadingType" :contentText="contentText" v-if="total>10"></uni-load-more>
  </div>
</template>

<script>
import { setStorage, getStorage } from "../../utilies";
import { getChargeRecord } from "./api/api";
import {Notify} from "vant";
import uniLoadMore from "../../components/common/uni-load-more";


export default {
  data() {
    return {
      recordList: [{}],
      // 上拉加载更多参数start
      loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				offset: 0,
				limit: 10,
        total: 0,
      // 上拉加载更多参数end
        userInfo:{}
    };
  },
  components: {
    'uniLoadMore':uniLoadMore
  },
  created() {
      this.userInfo = getStorage('userInfo','obj');
      this.getRecord();
  },
  methods: {
    //处理接口返回数据
    dealApi(val) {
      let data = val;
      let p = new Promise(function(resolve, reject) {
        data
          .url(data)
          .then(res => {
            if (res.error == 0) {
              resolve(res);
            }else{      
              Notify({message:res.msg});
            }
          })
          .catch(error => {
            Notify({message:"服务器出小差了，请稍后再试"});
          });
      });
      return p;
    },

    //获取充值记录
    async getRecord(){
      let _this=this;
      let obj={
        url:getChargeRecord,
        params:{
          user_id:_this.userInfo.account.user_id,
          iccid:getStorage('check_iccid'),
          offset:_this.offset,
          limit:_this.limit
        }
      };
      let list = await this.dealApi(obj);
      console.log(list);

    }
  }
};
</script>

<style lang="less">
</style>