<template>
  <div class="feedback-wrap">

    <div class="type-wrapper">
      <p class="title">问题类型</p>
      <div class="type-inner-wrapper">
        <span
          v-for="(item,index) in columns"
          :class="{'active':index === choose_type}"
          @click="changeType(index)"
        >
        {{item}}
      </span>
      </div>
    </div>

    <div>
      <p class="title">问题描述</p>
      <textarea placeholder="请输入您要提问的问题......" v-model="describe"></textarea>
    </div>

    <div class="upload-img-wrapper">
      <p class="title">上传图片</p>
      <van-uploader
        v-model="fileList"
        accept="image/jpg,image/jpeg,image/png"
        :preview-full-image="false"
        :max-count="3"
        :before-read="beforeRead"
        @delete="beforeDelete"
        :after-read="afterRead">
        <van-button class="btn-upload" type="primary">
          <van-icon v-show="!imgUploadLoading" name="plus"></van-icon>
          <van-loading v-show="imgUploadLoading"></van-loading>
        </van-button>
      </van-uploader>
    </div>

    <button class="btn-commit" @click="commit">提交</button>

    <van-popup
      v-model="showLoading"
      :close-on-click-overlay="false"
      :overlay-style="{'background-color':'rgba(255, 255, 255, 0.8)'}"
    >
      <van-loading
        color="#1989fa"
        vertical
      >
        正在提交您的问题， 请等候。
      </van-loading>
    </van-popup>


  </div>
</template>

<script>
  // @ is an alias to /src
  import {getStorage, checkBrowser} from "../../utilies";
  import {Uploader, Picker, Popup, Toast, Button, Loading, Icon} from 'vant'
  import {Reg} from '../../utilies/reg'
  import {_post} from "../../http";
  import EXIF from 'exif-js'

  Toast.setDefaultOptions({
    position: 'top'
  });

  export default {
    name: "home",
    components: {
      [Uploader.name]: Uploader,
      [Picker.name]: Picker,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Loading.name]: Loading,
      [Icon.name]: Icon
    },
    data() {
      return {
        iccid: getStorage('check_iccid') || '8986011775000766991',
        clientType: checkBrowser(),
        isSamsung: /sm-/i.test((navigator.userAgent.toLowerCase())),
        choose_type: 0,
        describe: '',
        imgUploadLoading: false,
        fileList: [],
        handleFileList: [],
        imgType: ['image/png', 'image/jpeg', 'image/jpg'],
        columns: ["停机", "体验问题", "新功能建议", "其他"],
        pickerValue: '',
        showLoading: false,
        showPicker: false,
      }
    },
    created() {

    },
    methods: {
      changeType(index) {
        this.choose_type = index;
      },
      beforeDelete(file, detail) {
        this.handleFileList.splice(detail.index, 1);
      },
      beforeRead(file, detail) {
        console.log(detail);
        if (this.imgType.indexOf(file.type) < 0) {
          Toast({
            message: '图片只支持.png,.jpeg,.jpg格式,请重新上传'
          });
          return false
        }
        this.imgUploadLoading = true;
        return true;
      },
      afterRead(file) {
        // if (this.global_variables.device === 'iphone' || this.isSamsung) {
          let orientation = 1;
          new Promise(resolve => {
            EXIF.getData(file.file, function () {
              orientation = EXIF.getTag(this, 'Orientation');
              resolve(orientation);
            });
          }).then(res => {
            if (typeof res === "number") {
              let newOrientation = res || 1;
              this.handleIOSImg(file.file, newOrientation);
            } else {
              this.handleIOSImg(file.file, 1);
            }
          });
        // }
        // else {
        //   this.handleIOSImg(file.file, 1);
        // }
        this.imgUploadLoading = false;
      },
      commit() {
        if (!this.describe) {
          Toast({
            message: '请输入问题描述'
          });
          return;
        }
        if (Reg.emoji.test(this.describe)) {
          Toast({
            message: '请勿输入表情符'
          });
          return;
        }
        let _this = this;
        this.showLoading = true;
        let formData = new FormData();
        formData.append('iccid', this.iccid);
        formData.append('type', this.choose_type + 1);
        formData.append('content', this.describe);

        if (this.handleFileList.length) {
          for (let i = 0; i < this.handleFileList.length; i++) {
            formData.append(`img${i + 1}`, this.handleFileList[i]);
          }
        }

        _post('/iot/v1/question/create', formData)
          .then(res => {
            this.showLoading = false;
            if (res.state === 1) {
              this.fileList = [];
              Toast({
                position: 'top',
                message: '提交成功，即将跳转至套餐列表页'
              });
              setTimeout(() => {
                _this.$router.push({
                  path: '/weixin/card/plan_list'
                })
              }, 1500)
            } else {
              Toast({
                position: 'top',
                message: res.msg
              });
            }
          });
      },
      handleIOSImg(file, orientation) {
        let _this = this;
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');
        let url = window.URL.createObjectURL(file);
        let img = new Image();
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          context.clearRect(0, 0, canvas.width, canvas.height);
          if (orientation && orientation !== 1) {
            switch (orientation) {
              case 6:
                canvas.width = img.height;
                canvas.height = img.width;
                context.rotate(Math.PI / 2);
                // (0,-imgHeight) 从旋转原理图那里获得的起始点
                context.drawImage(this, 0, -img.height, img.width, img.height);
                break;
              case 3:
                context.rotate(Math.PI);
                context.drawImage(this, -img.width, -img.height, img.width, img.height);
                break;
              case 8:     // 旋转-90度
                canvas.width = img.height;
                canvas.height = img.width;
                context.rotate(3 * Math.PI / 2);
                context.drawImage(this, -img.width, 0, img.width, img.height);
                break;
            }
          } else {
            context.drawImage(img, 0, 0, img.width, img.height);
          }
          let quality = file.size / 1024 > 1025 ? 0.3 : 0.7;
          if (_this.global_variables.device === 'iphone') quality = 0.2;
          let imgData64 = canvas.toDataURL("image/jpeg", quality);
          _this.handleFileList.push(imgData64);
        };
        img.src = url;
      },
    }
  };
</script>

<style lang="less">
  .feedback-wrap {
    padding: 0 20px;
    background-color: #fff;

    .title {
      padding: 56px 0;
      font-size: 34px;
      font-weight: 500;
      color: #000;
      text-align: left;
    }

    .type-inner-wrapper {
      display: flex;
      flex-wrap: wrap;
      -webkit-box-lines: multiple;

      span {
        display: inline-block;
        height: 51px;
        margin: 0 20px 26px 0;
        padding: 0 54px;
        font-size: 28px;
        line-height: 51px;
        border-radius: 51px;
        color: #000;
        background: #efefef;

        &.active {
          color: #fff;
          background-color: #ffb428;
          background-image: linear-gradient(63deg, #ffb428 0%, #ffd247 100%);
        }
      }
    }

    textarea {
      width: 100%;
      padding: 30px 20px;
      height: 275px;
      font-size: 30px;
      color: #808080;
      background-color: #efefef;
      border: none;
      border-radius: 30px;
      box-sizing: border-box;
    }

    .upload-img-wrapper {
      text-align: left;

      .btn-upload {
        width: 167px;
        height: 167px;
        border: none;
        border-radius: 15px;
        color: #ababab;
        background-color: #efefef;
      }
    }

    .btn-commit {
      margin: 105px 0;
      font-size: 36px;
      height: 85px;
      width: 67%;
      border-radius: 85px;
      color: #433f38;
      background-color: #fba703;
      background-image: linear-gradient(137deg, #fba703 0%, #f6d587 100%);
    }

    .van-loading {
      overflow: hidden;
    }
  }
</style>


