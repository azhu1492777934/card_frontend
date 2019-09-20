<template>
  <div class="upload-id-card-wrapper">
    <!--进度指示-->
    <div class="step-bar-wrapper">
      <div>
        <div class="step-content">
          <img src="" alt="">
          <div>身份证人物面</div>
        </div>
      </div>
      <div>
        <div class="step-content">
          <img src="" alt="">
          <div>身份证国徽面</div>
        </div>
      </div>
      <div>
        <div class="step-content">
          <img src="" alt="">
          <div>正面免冠</div>
        </div>
      </div>
    </div>
    <!--内容-第一步-->
    <div class="step-content-wrapper">
      <div class="step-tip-wrapper">
        <p class="step-tip">请确认下列信息是否与您的证件信息一致</p>
      </div>

      <div class="info-wrap">

        <div class="flex">
          <div>姓名</div>
          <div>
            <input :disabled="editName" @blur="lockValue(0)" v-model="name" type="text">
          </div>
          <div @click="editInfo(0)">修改</div>
        </div>

        <div class="flex">
          <div>身份证</div>
          <div>
            <input :disabled="editId" @blur="lockValue(1)" v-model="id" type="text">
          </div>
          <div @click="editInfo(1)">修改</div>
        </div>

        <div class="flex">
          <div>地址</div>
          <div>
            <textarea :disabled="editAddress" @blur="lockValue(2)" v-model="address"></textarea>
          </div>
          <div @click="editInfo(2)">修改</div>
        </div>

      </div>

      <div class="btn-wrapper">
        <button @click="verifyInfo" class="btn-step-next">提交</button>
      </div>

    </div>

    <!--loading-->
    <div class="step-loading-wrapper">
      <van-popup
        v-model="showLoading"
        :close-on-click-overlay=false
      >
        <van-loading color="#faca07"/>
        <div>{{loadingMsg}}</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {Loading, Toast, Popup, Notify} from 'vant';
  import {_post} from "../../http";

  export default {
    name: "uploadIdCard",
    data() {
      return {
        step: 0,
        previewUrl_0: null,
        previewUrl_1: null,
        previewUrl_2: null,
        // 原始信息
        origin_name: '',
        origin_id: '',
        origin_address: '',
        // 信息
        name: '阿拉蕾',
        id: '5130911990111428312',
        address: '浙江省杭州市晋级醉酒楼A座101浙江省杭州市晋级醉酒楼A座101',
        // 是否修改信息
        editName: true,
        editId: true,
        editAddress: true,
        editCount: 0,
        // loading
        showLoading: false,
        loadingMsg: ''
      }
    },
    components: {
      [Loading.name]: Loading,
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Notify.name]: Notify,
    },
    methods: {
      lockValue(type) {
        if (type === 0) this.editName = true;
        if (type === 1) this.editId = true;
        if (type === 2) this.editAddress = true;
      },
      editInfo(type) {
        this.editCount++;
        if (type === 0) this.editName = false;
        if (type === 1) this.editId = false;
        if (type === 2) this.editAddress = false;
      },
      verifyID(code) {
        var city = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外 "
        };

        if (!code) {
          return {
            state: 0,
            msg: '请输入您的身份证号码'
          }
        }

        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
          // console.log('身份证号格式错误');
          return {
            state: 0,
            msg: '您的身份号码有误'
          }
        } else if (!city[code.substr(0, 2)]) {
          // console.log('地址编码错误');
          return {
            state: 0,
            msg: '您的身份号码有误'
          }
        } else {
          //18位身份证需要验证最后一位校验位
          if (code.length === 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] !== code[17]) {
              // tip = "校验位错误";
              return {
                state: 0,
                msg: '您的身份号码有误'
              }
            }
          }
        }
        return {
          state: 1,
        }

      },
      verifyInfo() {
        if (!this.name || !this.id || !this.address) {
          Notify({
            message: '请输入真实且完整的身份信息'
          });
          return
        }
        if (!/^[\u4e00-\u9fa5·]{2,17}$/.test(this.name)) {
          Notify({
            message: '请输入真实有效的姓名'
          });
          return
        }
        let idResult = this.verifyID(this.code);
        if (!idResult) {
          Notify({
            type: 'primary',
            message: idResult.msg
          })
        }

        // 校验是否有重新校验信息
        if (this.editCount > 0) {

        }
        // 提交证件信息
        this.loadingMsg = '正在审核您的信息，这可能需要一点时间，请等候。';
        this.showLoading = true;
        _post('/v1/upload/info', {
          iccid: '',
          name: this.name,
          id: this.id,
          address: this.address
        }).then(res => {
          this.showLoading = false;
          if (res.state === 1) {
            this.router.push('/realname/audit_success');
          } else if (res.state === -1) {
            this.router.push('/realname/audit_fail');
          } else {
            Notify({
              type: 'primary',
              message: res.msg
            })
          }
        })
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/utitlies";

  .none {
    display: none !important;
  }

  .upload-id-card-wrapper {
    font-size: 24px;

    .step-bar-wrapper {
      display: flex;
      align-items: center;
      height: 345px;
      color: #fff;
      background-color: #faca07;
      .step-content{
        font-size: 24px;
      }

      img {
        width: 100px;
        height: auto;
      }

      > div {
        flex: 1;
        padding: 0 0 40px;
        text-align: center;
        font-size: 18px;
      }

    }

    .step-content-wrapper {
      min-height: calc(~ '100vh - 345px + (90px * 0.85)');
      margin: calc(-90px * 0.85) 3% 0;
      -webkit-border-top-left-radius: 30px;
      -webkit-border-top-right-radius: 30px;
      box-shadow: 0 0 9px 0 #e6e6e6;
      background-color: #fff;

      div {
        margin: 0 auto;
      }

      .step-tip-wrapper {
        padding: 70px 8% 40px;

        .step-tip {
          padding: 15px 0;
          color: #585858;
          background-color: #eaf3fb;
          font-size: 24px;
          text-align: center;
        }
      }

    }

    .info-wrap {
      color: #585858;
      font-size: 24px;
      padding: 0 35px;

      .flex {
        padding-bottom: 30px;
        line-height: 1.8;

        input, textarea {
          font-size: 30px;
          line-height: 1.8
        }

        div {
          &:first-child {
            width: 120px;
            padding-right: 10px;
            letter-spacing: 2px;
            text-align: right;
            box-sizing: border-box;
            font-size: 30px;
          }

          &:nth-child(2) {
            flex: 3.5;
            text-align: left;

            textarea {
              width: 100%;
              min-height: 150px;
              resize: none;
            }
          }

          &:last-child {
            width: 120px;
            text-align: right;
            color: #4d94ff;
            font-size: 30px;
          }
        }

        display: flex;
      }
    }

    .btn-wrapper {
      padding: 0 8%;

      .btn-step-next {
        width: 100%;
        height: 60px;
        padding: 15px 0;
        margin: 70px 0 30px;
        border-radius: 60px;
        font-size: 34px;
        border: none;
        box-sizing: content-box;
        background-image: linear-gradient(135deg, #faca07 5%, #fdd47a 100%);
      }
    }


    // loading
    .step-loading-wrapper {
      .van-popup {
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        text-align: center;
      }

      .van-loading {
        margin: 0 auto;
      }
    }

    @keyframes scaleDraw {
      0% {
        transform: scale(1);
        opacity: .7;
      }
      100% {
        transform: scale(2.0);
        opacity: 0;
      }
    }
  }

  // toast
  .van-toast--text, .van-notify {
    font-size: 20px;
  }
</style>
