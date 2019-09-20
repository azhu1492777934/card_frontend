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
          <div>身份证人物面</div>
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
        <div class="origin-img origin-img-first">
          <img id="test" :src="previewUrl_0" style="width: 100%;height: auto;">
          <div style="width: 100%;white-space: pre-wrap;word-break: break-word">
            {{previewUrl_0}}
          </div>
        </div>
      </div>
      <!--摄像-->
      <div class="step-camera-wrapper">
        <div @click="handleUpload(0)" class="step-icon-camera">
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
        <div @click="handleUpload(1)" class="step-icon-camera"></div>
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
        <div @click="handleUpload(2)" class="step-icon-camera"></div>
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
        iccid: '8986011775000766991',
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
    methods: {
      handleUpload(step) {
        if (this.global_variables.RuntimeEnv === 'wechat') {
          this.handleUploadWx(step)
        } else if (this.global_variables.RuntimeEnv === 'alipay') {
          this.handleUploadAli(step);
        }
      },
      handleUploadAli(step) {
        let _this = this;
        ap.chooseImage({
          count: 1,
          sourceType: ['camera']
        }, function (res) {
          if (!res.apFilePaths.length || !/^https:/.test(res.apFilePaths[0])) {
            return
          }
          _this.showLoading = true;
          var image = new Image();
          image.crossOrigin = 'anonymous';
          image.onload = function () {
            var canvas = document.createElement('CANVAS');
            var context = canvas.getContext('2d');
            canvas.height = image.height;
            canvas.width = image.width;
            context.drawImage(image, 0, 0);
            try {
              var dataURL = canvas.toDataURL('image/jpeg');
              _this[`previewUrl_${step}`] = dataURL;
            } catch (e) {
              Toast({
                position: 'top',
                message: '您上传的照片处理失败，请重新上传'
              });
            }
            canvas = null;
            _this.showLoading = false;
            if (_this[`previewUrl_${step}`]) {
              // _this.step = ++step;
              let getFile = _this.dataURLtoFile(_this[`previewUrl_${step}`], `img_file_${step}`);
              getFile.then(res => {
                alert(JSON.stringify(res));
                if (res.state === 1) {
                  _this.img_file_0 = res.data;
                  _this.uploadImgs(0);
                }
              });
            } else {
              Toast({
                position: 'top',
                message: '您上传的照片处理失败，请重新上传'
              });
              return
            }
          };
          image.src = res.apFilePaths[0];
        })
      },
      dataURLtoFile(dataurl, filename) {//将base64转换为文件
        return new Promise(resolve => {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          resolve({
            state: 1,
            data: new File([u8arr], filename, {type: mime})
          })
        })
        // return
      },
      handleUploadWx(step) {
        let _this = this;
        this.wx.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: ['camera'],
          success: function (res) {
            alert(JSON.stringify(res));
            if (!res.localIds.length) return;
            _this.showLoading = true;


            _this.wx.getLocalImgData({
              localId: res.localIds[0],
              success: function (res) {
                _this.showLoading = false;
                alert('getLocalImgData');

                if (res.localData) {
                  _this[`previewUrl_${step}`] = _this.global_variables.device === 'android' ? 'data:image/jpeg;base64,' + res.localData : res.locaData.replace('jpg', 'jpeg');
                  // _this.step = ++step;
                  _this.uploadImgs(_this.step);
                } else {
                  Toast({
                    position: 'top',
                    message: '您上传的照片处理失败，请重新上传'
                  });
                }
              },
            })


          },
          fail: function (res) {
            alert('fail')
            alert(JSON.stringify(res));
          }
        })
      },
      uploadImgs(step) {
        let _this = this;
        if (step >= 0 || (this.previewUrl_0 && this.previewUrl_1 && this.previewUrl_2)) {
          // upload info and keep waiting result
          this.loadingMsg = '正在解析您的信息，请等候。';
          this.showLoading = true;

          _post('/verification/v1/upload/img', {
            img: this.previewUrl_0
          }).then(res => {
            this.showLoading = false;
            alert(JSON.stringify(res));

            // if (res.state === 1) {
            //   // storage data
            //   setStorage('info', res.data, 'obj');
            //   this.$router.push('/realname/verify_info');
            // } else {
            //   // clear data
            //   this.previewUrl_0 = '';
            //   this.previewUrl_1 = '';
            //   this.previewUrl_2 = '';
            //   this.step = 0;
            //   Notify({
            //     type: 'primary',
            //     message: res.msg
            //   })
            // }

          })
        }
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
      height: 215px;
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
        padding-top: 15px;
      }

      .step-circle {
        position: relative;
        width: 20px;
        height: 20px;
        margin: -10px auto 0;
        border-radius: 50%;
        background-color: #fff;

        .van-icon-success {
          color: #24bf24;
          font-size: 22px;
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
      min-height: calc(~ '100vh - 215px + (90px * 0.65)');
      margin: calc(-90px * 0.65) 3% 0;
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
          padding: 5px 0;
          color: #585858;
          background-color: #eaf3fb;
          line-height: 1.5;
          font-size: 18px;
          text-align: center;
        }
      }

      // 身份证图片
      .origin-img {
        height: 220px;
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
        width: 120px;
        height: 120px;
        .bg-image('../../assets/imgs/verification/btn_camera')
      }

      .btn-tip {
        width: 100%;
        padding-top: 20px;
        text-align: center;
        color: #585858;
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
  .van-toast--text {
    font-size: 20px;
  }
</style>
