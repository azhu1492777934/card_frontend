<template>
  <div class="question-wrap">
    <p class="title">问题中心</p>
    <ul>
      <li>
        <a  @click="q1()">1.卡更换</a>
      </li>
      <li>
        <a  @click="q2()">2.流量通话显示正常，但无法使用</a>
      </li>
      <!-- <li v-if="global_variables.packed_project!='mifi'&&client_type!='app'">
        <a @click="toRefund" href="javascript:;">3.套餐退款</a>
      </li> -->
      <li v-if="global_variables.packed_project!='mifi'&&client_type!='app'">
        <router-link to="/weixin/refund/argument">3.订单退款</router-link>
        <!-- <a>3.订单退款</a> -->
      </li>
      <li>
        <a  @click="q3()"><span v-if="global_variables.packed_project=='mifi'||client_type=='app'">3</span><span v-if="global_variables.packed_project!='mifi'&&client_type!='app'">4</span>.解约自动续费套餐</a>
      </li>
     
     <li v-if="global_variables.packed_project=='mifi'">
        <router-link to="/weixin/userCenter/rechargeOrder">4.订单退款</router-link>
        <!-- <a>4.订单退款</a> -->
      </li>
    </ul>
  </div>
</template>

<style lang="less">
  .question-wrap {
    width: 96%;
    margin: 0 auto;

    .title {
      padding: 40px 0;
      border-bottom: 1px solid #f5f5f5;
      font-size: 36px;
      text-align: center;
      font-weight: bold;
    }

    ul {
      padding-top: 20px;
      text-align: left;
      margin-left: 77px;

      li {
        padding: 40px 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        a {
          font-size: 36px;
          color: #333;
          text-decoration: none;

          &:before {
            display: inline-block;
            margin-right: 20px;
            content: '';
            width: 7px;
            height: 30px;
            background-color: #5DABFD;
          }
        }
      }
    }
  }
</style>

<script>
import { Dialog } from 'vant';
  // @ is an alias to /src
  import {setStorage, getStorage,checkBrowser,appRate} from "../../utilies";

  export default {
    name: "home",
    data() {
      return {
        from: this.$route.query.from,
        client_type: checkBrowser()
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      toRefund() {
        this.$router.push({
          path: '/weixin/refund/argument',
        });
      },
      q1(){
        //appRate(10);
       this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)
      },
      q2(){
        appRate(11);
        this.$router.push({
          path: '/weixin/question/revoke_plan',
        });
      },
      q3(){
        appRate(12);
        this.$router.push({
          path: '/weixin/question/release_plan',
        });
      },
      q4() {
        Dialog.alert({
          title: '温馨提示',
          message: '暂停服务，请稍后再试'
        })
      }
    }
  };
</script>

