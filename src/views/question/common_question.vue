<template>
  <div class="common-question-wrap">
    <ul
      class="list-wrap"
      :class="{
      'plan-no-user__height':plan_list_height.is_normal,
      'plan-has-user__height':plan_list_height.is_c_frontend,
      'plan-app__height':plan_list_height.is_app
      }"
    >
      <li
        v-for="(item,index) in questionData"
        :key="item.id"
      >
        <p class="question">
          <span class="question-index-wrapper">{{index+1}}</span>
          {{item.question}}
        </p>
        <p class="answer">{{item.answer}}</p>
      </li>
    </ul>
    <button
      class="btn-question"
      @click="toUploadQuestion"
    >
      我要提问
    </button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {setStorage, getStorage, checkBrowser} from "../../utilies";
  import questionData from './data/customer'

  export default {
    name: "home",
    data() {
      return {
        client_type: checkBrowser(),
        questionData: questionData,
        plan_list_height: {
          is_app: false,
          is_c_frontend: true,
          is_normal: false,
        }
      }
    },
    created() {
      if (this.global_variables.device === 'iphone' && this.client_type === "app") {
        this.plan_list_height.is_app = true;
      } else {
        this.plan_list_height.is_app = false;
        if (this.client_type === "wechat" || this.client_type === "alipay") {
          this.plan_list_height.is_c_frontend = true;
        } else {
          this.plan_list_height.is_c_frontend = false;
          this.plan_list_height.is_normal = true;
        }
      }
    },
    mounted() {

    },
    methods: {
      toUploadQuestion(){
        this.$router.push({
          path:'customer_feedback'
        })
      }
    }
  };
</script>

<style lang="less">
  .common-question-wrap {
    .list-wrap {
      padding: 15px;
      overflow: auto;
      text-align: left;
      box-sizing: border-box;
      li{
        position: relative;
        padding: 37px;
        &:after{
          position: absolute;
          content: '';
          left: 50%;
          bottom: 0;
          width: 90%;
          height: 1px;
          transform: scale(1,0.5) translateX(-50%);
          background-color: #e9e9e9;
        }

      }

      .question {
        padding-bottom: 33px;
        color: #000;
        font-size: 30px;
        font-weight: 500;

        .question-index-wrapper{
          display: inline-block;
          width: 41px;
          height: 36px;
          font-size: 22px;
          text-align: center;
          color: #fff;
          font-weight: normal;
          line-height: 30px;
          vertical-align: middle;
          background-image: url("../../assets/imgs/card/question/dialog-wrapper@3x.png");
          background-size: 100% 100%;
          box-sizing: border-box;
        }

        &:first-child {
          padding-top: 0;
        }
      }

      .answer {
        color: #808080;
        font-size: 24px;
        line-height: 1.5;
      }
    }

    .btn-question {
      margin: 40px 0;
      font-size: 30px;
      height: 85px;
      width: 67%;
      border-radius: 85px;
      color: #fff;
      background-color: #e6b75b;
      background-image: linear-gradient(123deg,#e6b75b 0%,#f6d587 100%);
    }

    .plan-no-user__height {
      height: calc(~ '100vh - 165px');
    }

    .plan-has-user__height {
      height: calc(~ '100vh - 60px - 165px');
    }

    .plan-app__height {
      height: calc(~ '100vh - 60px - 165px - 49px');
    }

  }
</style>


