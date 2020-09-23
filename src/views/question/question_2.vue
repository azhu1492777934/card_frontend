<template>
  <div class="get-plan-wrap">
    <div class="loading" v-if="loading">
      <van-loading vertical size="64px"/>
      <span>{{loadingText}}</span> 
    </div>
    <div class="get-plan-inner">
      <p>解决方案</p>
      <div class="solution-wrap">
        <p>套餐通话显示正常，但无法使用</p>
        <p>您的卡片正在沉睡中，点击下方按钮，唤醒卡片</p>
      </div>
    </div>

    <card-button @clickThrotle="revokePlan" :btnText="'唤醒套餐'"></card-button>
  </div>
</template>

<style lang="less">
  html, body, #app, .get-plan-wrap {
    height: 100%
  }

  .get-plan-wrap {
    display: flex;
    align-items: center;

    .get-plan-inner {
      width: 95%;
      height: 540px;
      margin: 0 auto;
      background-image: url("../../assets/imgs/question/bg.png");
      background-size: 100% 100%;

      > p {
        padding: 150px 0 20px;
        font-size: 34px;
      }

      .solution-wrap {
        p {
          &:first-child {
            color: #ff9605;
          }
        }
      ;
        line-height: 1.4;
        color: #333;
        font-size: 28px;
      }
    }

    .btn-wrap {
      button {
        position: absolute;
        bottom: 60px;
        left: 50%;
        width: 88%;
        height: 80px;
        margin-left: -44%;
        background-image: url("../../assets/imgs/question/btn.png");
        background-size: 100% 100%;
        background-color: transparent;
        color: #fff;
        font-size: 30px;
        font-weight: bold;
        line-height: 80px;
        text-align: center;
      }
    }

  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 260px;
    background: #3C3C3C;
    opacity: .68;
    border-radius: 9px;
    z-index: 11;
    font-size: 24px;
    color: #EBEBEB;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    span:nth-child(2){
      display: block;
      margin-top: 15px; 
      font-size: 30px;
    }
  }
</style>

<script>
  // @ is an alias to /src
  import {_get, _post} from "../../http";
  import {getStorage} from "../../utilies";
  import {Notify, Loading} from 'vant'
  import cardButton from '../../components/button'

  export default {
    name: "home",

    data() {
      return {
        hasUsagePlan: null,
        loading: true,
        loadingText: null
      }
    },
    components: {
      cardButton,
      [Loading.name]: Loading
    },
    created() {
      
      _get('/api/v1/app/cards/telcom/usage', {
        iccid: getStorage('check_iccid'),
      }).then(res => {
        if (res.state == 1) {
          this.loading = false
          this.hasUsagePlan = !!res.data.usage.plans.length;
        } else {
          Notify({
            message: res.msg,
          })
        }
        
      })
    },
    methods: {
      revokePlan: function () {
        if (!this.hasUsagePlan) {
          Notify({
            message: '当前套餐已过期，无法唤醒',
          })
          return
        }
        let _this = this;
        _post('/api/v1/app/restart_device', {
          iccid: getStorage('check_iccid'),
          cause:'c端用户操作'
        }).then(res => {
          if (res.state === 1) {
            Notify({
              message: '唤醒套餐成功',
              background: '#60ce53'
            })
            setTimeout(function () {
              if (_this.global_variables.packed_project === 'mifi') {
                _this.$router.push({path: '/mifi/card/index'})
              } else {
                if (localStorage.getItem("currentType") == "esim") {
                  _this.$router.push({path: '/weixin/card/esim_usage'})
                } else {
                  _this.$router.push({path: '/weixin/card/usage'})
                }
              }
            }, 2000)
          } else {
            Notify({message: res.msg})
          }
        })
      }
    }
  };
</script>

