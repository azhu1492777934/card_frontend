<template>
  <div class="new-card-lookup-wrap">
    <div class="new-card-inner-wrap">
      <p class="title">守护孩子回家</p>
      <ul class="card-type-wrap">
        <li>
          <span class="block icon-telcom-card"></span>
          <p>联通卡</p>
          <span>扫码/输入ICCID号/输入手机号查询</span>
        </li>
        <li>
          <span class="block icon-mobile-card"></span>
          <p>移动卡</p>
          <span>输入手机号码或ICCID号查询</span>
        </li>
      </ul>
    </div>
    <div class="p-lr-30">
      <input v-model="iccid" class="search" autofocus placeholder="扫码/输入ICCID号/输入手机号码查询" type="text">
      <button class="btn btn-large">查询</button>
    </div>
    <van-popup :close-on-click-overlay="false" v-model="checkShow">
      <p class="showTip">正在检测中,请等候</p>
    </van-popup>
  </div>
</template>

<style lang="less">
  @import "../../assets/less/utitlies";
  @import "../../assets/less/common";

  .new-card-lookup-wrap {
    min-height: calc(100%);

    .p-lr-30 {
      padding: 0 30px;
    }

    .new-card-inner-wrap {
      padding: 0 30px 100px;
      background-image: url("../../assets/imgs/new_card_lookup/bg.jpg");
      background-size: 100% 100%;
    }

    .title {
      position: relative;
      padding: 70px 0 115px;
      color: #5a3808;
      font-size: 34px;

      &:after {
        position: absolute;
        left: 50%;
        bottom: 90px;
        content: '';
        width: 36%;
        height: 5px;
        margin-left: -18%;
        background-color: #fff;
      }
    }

    .card-type-wrap {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-telcom-card, .icon-mobile-card {
        height: 236px;
        margin: 0 auto;
      }

      .icon-telcom-card {
        width: 235px;
        .bg-image('../../assets/imgs/new_card_lookup/telcom_sim')
      }

      .icon-mobile-card {
        width: 300px;
        .bg-image('../../assets/imgs/new_card_lookup/mobile_sim')
      }

      p {
        padding: 20px 0;
        color: #5a3808;
        font-size: 24px;
        font-weight: bold;

      }

      span:last-child {
        font-size: 18px;
        color: #776040;
      }
    }

    .search {
      display: block;
      width: 100%;
      margin: 110px 0 155px;
      padding: 0 0 25px 20px;
      color: #bcbcbc;
      border-bottom: 1PX solid @primary;
      box-sizing: border-box;
      font-size: 30px;
    }
  }
</style>

<script>
  // @ is an alias to /
  import {_post} from "../../http";
  import {Notify, Popup} from 'vant'

  export default {
    name: "newCardLookup",
    data() {
      return {
        iccid: '',
        checkShow: false,

      }
    },
    components: {
      [Notify.name]: Notify,
      [Popup.name]: Popup
    },
    created() {


    },
    methods: {
      processCheckIccid(iccid) {

        let checkSearchResult = this.checkSearchIccid(iccid);

        if (checkSearchResult.state == 1) {
          this.checkShow = true;
          //查询
          _post('/api/v1/app/new_auth/check_auth_', {
            iccid: iccid,
          }).then(res => {
            if (res.state == 1) {
              setStorage('check_iccid', iccid);
              if (res.data.status == 1) {

                if (localStorage.getItem("currentType") == "esim") {
                  _this.$router.push({path: '/weixin/card/esim_usage'})
                } else {
                  _this.$router.push({path: '/weixin/card/usage'})
                }
              } else if (res.data.status == 2) {
                setStorage('check_realNameSource', res.data.source)
                _this.$router.push({path: '/weixin/new_card/real_name'});
              } else if (res.data.status == 3) {
                _this.$router.push({path: '/weixin/card/plan_list'});
              }
            } else {
              Notify({
                message: res.msg
              })
              this.checkShow = false
            }
          })

        } else {
          Notify({message: checkSearchResult.msg})
        }

      },
      checkSearchIccid(iccid) {
        if (!iccid) {
          return {
            state: 0,
            msg: '请输入ICCID'
          }
        }
        if ((iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) != "89") && (iccid.length != 13 && iccid.length != 11 && iccid.length != 15 && iccid.length != 16)) {
          return {
            state: 0,
            msg: 'ICCID有误,请检查'
          };
        }
        return {
          state: 1
        }
      },
      inArray(elem, arr, i) {
        return arr == null ? -1 : arr.indexOf(elem, i);
      },
    }
  };
</script>

