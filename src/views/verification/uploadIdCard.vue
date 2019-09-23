<template>
  <div id="canvas-wrapper" class="upload-id-card-wrapper">
    <!--进度指示-->
    <div class="step-bar-wrapper">
      <div :class="{'active':step===0}">
        <div class="step-line step-one"></div>
        <div class="step-circle">
          <van-icon v-show="step>0" name="success"/>
        </div>
        <div class="step-content">
          <div>身份证人像面</div>
        </div>
      </div>
      <div :class="{'active':step===1}">
        <div class="step-line"></div>
        <div class="step-circle">
          <van-icon v-show="step>1" name="success"/>
        </div>
        <div class="step-content">
          <div>身份证国徽面</div>
        </div>
      </div>
      <div :class="{'active':step===2}">
        <div class="step-line step-last"></div>
        <div class="step-circle">
          <van-icon v-show="step>2" name="success"/>
        </div>
        <div class="step-content">
          <div>正面免冠</div>
        </div>
      </div>
    </div>
    <!--内容-第一步-->
    <div :class="{'none':step!==0}" class="step-content-wrapper">
      <div class="step-tip-wrapper">
        <p class="step-tip">真实拍摄身份证原件，无反光，无水印</p>
      </div>

      <div class="step-content-first">
        <div class="origin-img origin-img-first"></div>
      </div>
      <!--摄像-->
      <div class="step-camera-wrapper">
        <div class="step-icon-camera">
          <input class="btn-upload" type="file" @change="e=>handleUpload(e,0)" capture="camera" accept="image/*"/>
        </div>
        <div class="btn-tip">拍摄身份证人像面</div>
      </div>
    </div>
    <!--内容-第二步-->
    <div :class="{'none':step!==1}" class="step-content-wrapper">
      <div class="step-tip-wrapper">
        <p class="step-tip">真实拍摄身份证原件，无反光，无水印</p>
      </div>

      <div class="step-content-second">
        <div class="origin-img origin-img-second"></div>
      </div>
      <!--摄像-->
      <div class="step-camera-wrapper">
        <div class="step-icon-camera">
          <input class="btn-upload" type="file" @change="e=>handleUpload(e,1)" capture="camera" accept="image/*"/>
        </div>
        <div class="btn-tip">拍摄身份者国徽面</div>
      </div>
    </div>
    <!--内容-第三步-->
    <div :class="{'none':step!==2}" class="step-content-wrapper">
      <div class="step-tip-wrapper">
        <p class="step-tip">真实拍摄持证人正面免冠照</p>
      </div>

      <div class="step-content-third">
        <div class="origin-img origin-img-third"></div>
      </div>
      <!--摄像-->
      <div class="step-camera-wrapper step-camera-third">
        <div class="step-icon-camera">
          <input class="btn-upload" type="file" @change="e=>handleUpload(e,2)" capture="camera" accept="image/*"/>
        </div>
        <div class="btn-tip">上传正面免冠照</div>
      </div>
      <!--下一步-->
      <!--      <button @click="verifyInfo" class="btn-step-next">下一步</button>-->
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
  import {Loading, Toast, Popup, Notify, Icon} from 'vant';
  import {_post} from "../../http";
  import {setStorage} from "../../utilies";

  export default {
    name: "uploadIdCard",
    data() {
      return {
        iccid: '99999991',
        step: 0,
        previewUrl_0: null,
        previewUrl_1: null,
        previewUrl_2: null,
        img_file_0: null,
        img_file_1: null,
        img_file_2: null,
        // loading
        showLoading: false,
        loadingMsg: '',
        // 标记是否重拍
      }
    },
    components: {
      [Loading.name]: Loading,
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Notify.name]: Notify,
      [Icon.name]: Icon
    },
    created() {

    },
    methods: {
      handleUpload(e, step) {
        let _this = this;
        let file = e.currentTarget.files[0];
        if (file) {
          let pos = file.name.lastIndexOf(".");
          var type = file.name.substring(pos + 1).toLowerCase();
          let arrImg = ['png', 'jpg', 'jpeg'];
          if (!arrImg.includes(type)) {
            return;
          }
          this.showLoading = true;
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          if (file) {
            let url = window.URL.createObjectURL(file);//PS:不兼容IE
            let img = new Image();
            img.onload = function () {
              canvas.width = img.width;
              canvas.height = img.height;
              context.clearRect(0, 0, canvas.width, canvas.height);
              let quality = file.size / 1024 > 1025 ? 0.5 : 0.7;//图片是否大于1M,a=压缩上传
              context.drawImage(img, 0, 0, img.width, img.height);
              _this[`previewUrl_${step}`] = canvas.toDataURL("image/jpeg", quality);
              alert(_this[`previewUrl_${step}`]);
              _this.showLoading = false;
              if (_this[`previewUrl_${step}`]) {
                _this.uploadImgs(step);
              } else {
                Toast({
                  position: 'top',
                  message: '您上传的照片处理失败，请重新上传'
                });
                return;
              }
            };
            img.src = url;
          }
        }
      },
      uploadImgs(step) {
        let _this = this;
        // upload info and keep waiting result
        // this.loadingMsg = '正在解析您的信息，请等候。';
        this.showLoading = true;
        let formdata = new FormData();
        formdata.append('file', this.previewUrl_0);
        _post('/verification/v1/upload/image', formdata)
          .then(res => {
            this.showLoading = false;
            if (res.error === 0 && res.status === 200) {
              _this[`img_file_${step}`] = res.data;
              _this.step = ++step;
              if (_this.step > 2) {
                //所有图片已全部处理完成
                _this.verifyInfo();
              }
            } else {
              Notify({
                message: res.msg
              })
            }
          })
      },
      verifyInfo() {
        let _this = this;
        this.loadingMsg = '正在验证您的信息,请等候认证结果';
        this.showLoading = true;
        let formData = new FormData();
        formData.append('iccid', this.iccid);
        formData.append('front', this.img_file_0);
        formData.append('back', this.img_file_1);
        formData.append('frontar', this.img_file_1);
        _post('/verification//v1/user/valids', formData)
          .then(res => {
            if (res.error !== 0 && res.data.code !== 200) {
              _this.$router.push('/realname/audit_fail');
            } else {
              _this.$router.push('/realname/audit_success');
            }
          })
      }
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
      height: 345px;
      color: #fff;
      background-color: #faca07;

      .step-line {
        height: 2px;
        background: linear-gradient(to right, #fff, #fff 9px, transparent 9px, transparent);
        background-size: 14px 100%;
      }

      display: flex;
      align-items: center;

      > div {
        flex: 1;
        padding: 40px 0;
        text-align: center;
        font-size: 18px;
      }

      .active {
        .step-circle {
          &:before {
            animation: scaleDraw 1.2s linear infinite;
            z-index: 1;
          }
        }
      }

      .step-one {
        margin-left: 50%;
        background-size: 16px 100%;
      }

      .step-last {
        margin-right: 50%;
        background-size: 16px 100%;
      }


      .step-content {
        padding-top: 20px;
        font-size: 26px;
      }

      .step-circle {
        position: relative;
        width: 30px;
        height: 30px;
        margin: -15px auto 0;
        border-radius: 50%;
        background-color: #fff;

        .van-icon-success {
          color: #24bf24;
          font-size: 30px;
          vertical-align: -webkit-baseline-middle;
        }

        &:before, &:after {
          content: "";
          display: block;
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
          opacity: .2;
        }

        &:after {
          opacity: 0;
        }
      }

    }

    .step-content-wrapper {
      min-height: calc(~ '100vh - 345px + (90px * 0.85)');
      margin: calc(-90px * 0.85) 3% 0;
      padding: 0 9%;
      -webkit-border-top-left-radius: 30px;
      -webkit-border-top-right-radius: 30px;
      box-shadow: 0 0 9px 0 #e6e6e6;
      background-color: #fff;

      div {
        margin: 0 auto;
      }

      .step-tip-wrapper {
        padding: 70px 0 40px;

        .step-tip {
          padding: 15px 0;
          color: #585858;
          background-color: #eaf3fb;
          font-size: 24px;
          text-align: center;
        }
      }

      // 身份证图片
      .origin-img {
        height: 320px;
      }

      .origin-img-first {
        .bg-image('../../assets/imgs/verification/card_person');
      }

      .origin-img-second {
        .bg-image('../../assets/imgs/verification/card_national_emblem');
      }

      .origin-img-third {
        width: 306px;
        height: 329px;
        .bg-image('../../assets/imgs/verification/card_id_photo')
      }
    }

    .step-camera-wrapper {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      -webkit-box-lines: multiple;
      padding: 50px 0 50px;
      justify-content: center;
      font-size: 20px;

      &.step-camera-third {
        padding-top: 20px;
      }

      .step-icon-camera {
        width: 170px;
        height: 170px;
        .bg-image('../../assets/imgs/verification/btn_camera')
      }

      .btn-tip {
        width: 100%;
        padding-top: 25px;
        text-align: center;
        color: #585858;
        font-size: 28px;
      }

      .btn-upload {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    .btn-step-next {
      width: 100%;
      height: 60px;
      margin-bottom: 30px;
      line-height: 60px;
      border-radius: 60px;
      border: none;
      background-image: linear-gradient(135deg, #faca07 5%, #fdd47a 100%);
    }

    // loading
    .step-loading-wrapper {
      .van-popup {
        border-radius: 10px;
        padding: 10px;
        font-size: 26px;
        text-align: center;
        width: auto;
        background-color: #fff;
        overflow: inherit;
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
</style>
