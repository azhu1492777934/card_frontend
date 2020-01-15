<template>
  <div class="migu-activity-wrapper">
    <van-popup
      v-model="showMigu"
      overlay-class="MiGu-popup-wrapper"
    >
      <div class="migu-wrapper">
        <button
          class="migu-btn-close"
          @click="closeModal"
        >
          &times;
        </button>
        <img src="../../assets/imgs/card/usage/migu.png" alt="充值折扣活动">
        <button
          v-show="showBtnBuy"
          class="btn-to-buy"
          @click="toBuyPlan"
        >
          去购买
        </button>
        <br>
        <button
          v-show="showBtnNoTip"
          class="btn-no-tip"
          @click="noTip"
        >
          不再提示
        </button>
        <button
          v-show="showChecked"
          class="btn-checked btn-to-buy"
          @click="checkedTip"
        >
          我知道了
        </button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import {Popup} from 'vant'
  import {setStorage} from '../../utilies'

  export default {
    name: "MiGu",
    props: {
      showMiGuModel: Boolean,
      showBtnBuy: Boolean,
      showBtnNoTip: Boolean,
      showChecked: Boolean,
    },
    data() {
      return {
        showMigu: this.showMiGuModel
      }
    },
    methods: {
      closeModal() {
        this.showMigu = false;
      },
      toBuyPlan() {
        this.showMigu = false;
        this.$router.push({
          path: '/weixin/card/plan_list'
        })
      },
      noTip() {
        this.showMigu = false;
        setStorage('showMiGu', true);
      },
      checkedTip() {
        this.showMigu = false;
        setStorage('planListShowMiGu', true);
      }
    },
    components: {
      [Popup.name]: Popup
    }
  }
</script>

<style lang="less">
  .migu-activity-wrapper {
    .migu-wrapper {
      position: relative;

      .migu-btn-close {
        position: absolute;
        display: flex;
        top: 0;
        right: 60px;
        width: 48px;
        height: 48px;
        justify-content: center;
        color: #fff;
        font-size: 30px;
        border-radius: 50%;
        border: 1px solid #fff;
        background: transparent;
      }

      .btn-to-buy {
        width: 448px;
        margin-top: 20px;
        padding: 25px;
        font-size: 28px;
        border-radius: 40px;
        color: #fff;
        background: #FF5B5B;
        border: 1px solid #FFFCFC;
      }

      .btn-no-tip {
        padding: 24px;
        font-size: 24px;
        color: #C9C9C9;
        background: transparent;
      }

      .btn-checked {
        background: #BABABA;
        color: #424242;
        border-color: #BABABA;
      }

      img {
        display: block;
        width: 76%;
        margin: 0 auto;
      }

    }

    .MiGu-popup-wrapper + .van-popup {
      background: transparent;
    }
  }
</style>
