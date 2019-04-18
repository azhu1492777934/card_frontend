<template>
  <div class="addSalesRecord">
    <van-cell-group>
      <van-field
        v-model="dataForm.device_id"
        required
        type="text"
        label="设备号"
        placeholder="请填写需要申请售后的设备号"
        clearable
      />
      <div class="radioType">
         <van-cell  >
           <template slot="title">
              <div><span class="specailSpan">*</span>类型</div>
            </template>
            <template slot="">
              <van-radio-group v-model="dataForm.type">
                <van-radio checked-color="#07c160" name="0">返修</van-radio>
                <van-radio checked-color="#07c160" name="1">换新</van-radio>
                <van-radio checked-color="#07c160" name="2">补卡</van-radio>
                <van-radio checked-color="#07c160" name="3">翻新</van-radio>
              </van-radio-group>
            </template>
          </van-cell>
      </div>
     
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="dataForm.no"
        required
        type="text"
        label="运单号"
        placeholder="请填写快递单号"
        clearable
      />

      <van-field
        v-model="dataForm.express_name"
        required
        type="text"
        label="快递名"
        placeholder="请填写快递名称"
        clearable
      />
    </van-cell-group>

    <van-cell-group>
      <van-field
        v-model="dataForm.mobile"
        required
        type="text"
        label="手机号"
        placeholder="请填写寄回收件人手机号"
        clearable
      />

      <van-field
        v-model="dataForm.user_name"
        required
        type="text"
        label="姓 名"
        placeholder="请填写寄回收件人姓名"
        clearable
      />

      <van-field
        v-model="areaData"
        required
        type="text"
        label="地 址"
        placeholder="请选择省市区"
        @focus="getFocus"
      />

      <van-field
        v-model="dataForm.addr"
        required
        type="text"
        label="详细地址"
        placeholder="请填写寄回收件人详细地址"
        clearable
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="dataForm.remark"
        required
        type="text"
        label="备注"
        placeholder="备注文字"
        clearable
      />
    </van-cell-group>

    <div class="submitButton" @click="addSubmit">提交</div>

    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-area :area-list="areaList" @cancel="show=false" @confirm="getAreaList" />
    </van-popup>  
  
  </div>
</template>

<script>
import { setStorage, getStorage } from "../../utilies";
import { addSalesRecords } from "./api/api";
import {
  Notify,
  Field,
  CellGroup,
  Cell,
  RadioGroup,
  Radio,
  AddressEdit,
  Area,
  Popup
} from "vant";
import areaList from "../new_card/areaData.js"
export default {
  data() {
    return {
      userInfo: {},
      dataForm: {
        device_id: "",
        type: "",
        no: "",
        express_name: "",
        mobile: "",
        user_name: "",
        province: "",
        city: "",
        district: "",
        addr: "",
        remark: ""
      },
      areaList:areaList,
      show:false,
      areaValue:"",
      areaData:""
    };
  },
  components: {
    vanCellGroup: CellGroup,
    vanCell: Cell,
    vanField: Field,
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanArea: Area,
    vanPopup:Popup
  },
  created() {
    this.userInfo = getStorage("userInfo", "obj");

    // this.getRecord();
  },
  methods: {
    //处理接口返回数据
    dealApi(val) {
      let data = val;
      let p = new Promise(function(resolve, reject) {
        data
          .url(data)
          .then(res => {
            if (res.state == 1) {
              resolve(res);
            } else {
              Notify({ message: res.msg });
            }
          })
          .catch(error => {
            Notify({ message: "服务器出小差了，请稍后再试" });
          });
      });
      return p;
    },
    //开启省市区选择
    getFocus(){
      this.show=true;
    },
    //处理下省市区的数据
    getAreaList(val){
      this.areaData="";
      this.dataForm.province=val[0].name;
      this.dataForm.city=val[1].name;
      if(val[2]){
        this.dataForm.district=val[2].name;        
      }else{
        this.dataForm.district="";
      }
      let list=[];
      for(let i=0;i<val.length;i++){
        if(val[i]){
            list.push(val[i].name);
        }
      }
      this.areaData=list.join("/");
      this.show=false;
    },
    //提交
    async addSubmit(){
      for(let item in this.dataForm){
        if(this.dataForm[item]==""){
          Notify({ message: "请填写完整数据" });
          return false;
        }
        if(this.isEmoji(this.dataForm[item])){
            Notify({ message: "请勿输入表情符号" });
            return false;
        }

      }
      this.dataForm.third_id=this.userInfo.account.user_id;
      
      // this.dataForm.third_id="613639";

      let obj={
        url:addSalesRecords,
        params:this.dataForm
      }
      let data = await this.dealApi(obj);
      Notify({
            message:'提交申请成功',
            background:'#60ce53'
      })
      this.$router.push("salesRecords");
      
    },
    //表情符号校验
      isEmoji(value){
            var reg=/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
            return reg.test(value);
      },
  }
};
</script>

<style lang="less">
.addSalesRecord {
  background: #f6f6f6;
  height: 100%;
  overflow: hidden;
  .van-cell:nth-child(1) {
    margin-top: 12px;
  }

  .van-cell {
  }
  .van-radio {
    display: inline-block;
    margin-left:40px;
  }
  .van-field__body {
    height: 100%;
  }
  .van-field__control {
    height: 100%;
  }
  .van-field .van-cell__title {
    text-align: left;
  }
  .submitButton {
    width: 406px;
    height: 69px;
    background: linear-gradient(
      -33deg,
      rgba(253, 212, 122, 1),
      rgba(240, 181, 70, 1)
    );
    border-radius: 35px;
    font-size: 32px;
    font-family: SourceHanSansSC-Regular;
    font-weight: 400;
    color: rgba(68, 63, 56, 1);
    line-height: 69px;
    margin: 150px auto 0 auto;
  }
  .radioType {
    .van-cell__title{
      flex:0.1;
    }
    .van-radio__label{
      margin-left:0;
    }
    .specailSpan{
      color:red;
      position:absolute;
      left:15px;
    }
  }
} 
</style>