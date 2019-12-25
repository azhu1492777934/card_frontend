<template>
  <div class="feedback-wrap">
    <div
      @click="showPickerTrue"
    >
      {{pickerValue ? pickerValue : '请选择问题类型'}}
    </div>
    <div>
      问题描述
      <textarea v-model="describe"></textarea>
    </div>
    <div>
      上传图片
      <van-uploader
        v-model="fileList"
        multiple
        accept="image/jpg,image/jpeg,image/png"
        :max-count="3"
        :before-read="beforeRead"
        :after-read="afterRead"></van-uploader>
    </div>
    <button
      @click="commit"
    >提交
    </button>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="pickerDom"
        show-toolbar
        :value="pickerValue"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm">
      </van-picker>
    </van-popup>

  </div>
</template>

<script>
  // @ is an alias to /src
  import {getStorage, checkBrowser} from "../../utilies";
  import {Uploader, Picker, Popup, Toast} from 'vant'
  import {_post} from "../../http";

  Toast.setDefaultOptions({
    position: 'top'
  });

  export default {
    name: "home",
    components: {
      [Uploader.name]: Uploader,
      [Picker.name]: Picker,
      [Popup.name]: Popup,
      [Toast.name]: Toast
    },
    data() {
      return {
        iccid: getStorage('check_iccid'),
        clientType: checkBrowser(),
        describe: '',
        fileList: [],
        imgType: ['image/png', 'image/jpeg', 'image/jpg'],
        columns: ["停机", "体验问题", "新功能建议", "其他"],
        pickerValue: '',
        showPicker: false,
      }
    },
    created() {

    },
    methods: {
      beforeRead(file) {
        if (this.imgType.indexOf(file.type) < 0) {
          Toast({
            message: '图片只支持.png,.jpeg,.jpg格式,请重新上传'
          });
          return false
        }
        return true;
      },
      afterRead(file) {
        console.log(file);
      },
      showPickerTrue() {
        this.showPicker = true;
      },
      onCancel() {
        this.showPicker = false;
        if (this.pickerValue) {
          this.$refs.pickerDom.setValues([this.pickerValue]);
        }
      },
      onConfirm(value) {
        this.pickerValue = value;
        this.showPicker = false;
      },
      commit() {
        if (!this.$refs.pickerDom) {
          Toast({
            position: 'top',
            message: '请选择问题类型'
          });
          return
        }
        if (!this.describe) {
          Toast({
            position: 'top',
            message: '请输入问题描述'
          });
          return;
        }

        // _post('/test',{
        //   type:this.$refs.pickerDom.getValues()[0],
        //   describe:this.describe
        // })
        //   .then(res=>{
        //     if(res.state === 1){
        //       Toast({
        //         position:'top',
        //         message:'提交成功，即将跳转至套餐列表页'
        //       });
        //     }else{
        //       Toast({
        //         position:'top',
        //         message:res.msg
        //       });
        //     }
        //   })


        // .getIndexes();

        // if(type === undefined || type === null){
        //
        // }
      }
    }
  };
</script>

<style lang="less">
  .feedback-wrap {

  }
</style>


