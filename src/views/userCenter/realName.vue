<template>
  <div class="realName">
    <div>
      <div>第一步：进入‘翼联宝’公众号，点击菜单：我的→我的新讯，扫描设备号；</div>
      <img src="./img/real1.jpeg" alt="">
    </div>
    <div>
      <div>第二步：进入设备管理页面，点击‘立即实名’按钮；</div>
      <img src="./img/real2.jpeg" alt="">
    </div>

    <div>
      <div>第三步：输入手机号，接收验证码，输入验证码点击下一步；</div>
      <img src="./img/real3.jpeg" alt="">
    </div>

    <div>
      <div>第四步： 页面跳转选择在浏览器中打开；</div>
      <img src="./img/real4.jpeg" alt="">
    </div>

    <div>
      <div>第五步：页面跳转至淘宝，直接点击下一步；</div>
      <img src="./img/real5.jpeg" alt="">
    </div>

    <div>
      <div>第六步：点击立即认证，根据页面提示进行人脸认证；</div>
      <img src="./img/real6.jpeg" alt="">
    </div>

    <div>
      <div>第七步：根据页面提示拍摄身份证正反面；</div>
      <img src="./img/real7.jpeg" alt="">
    </div>

    <div>
      <div>第八步：确认身份证信息后点击提交，等待片刻即可认证成功；</div>
      <img src="./img/real8.jpeg" alt="">
    </div>


  </div>
</template>

<script>
import { setStorage, getStorage } from "../../utilies";
import { getChargeRecord } from "./api/api";
import { Notify, Popup, List } from "vant";

export default {
  data() {
    return {
      
    };
  },
  components: {
  },
  created() {

  },
  methods: {
    
  }
};
</script>

<style lang="less">
.realName {
  background: #f6f6f6;
  height: 100%;
  border-top:1px solid #f6f6f6;
  >div{
    font-size:30px;
    font-family:SourceHanSansSC-Normal;
    font-weight:400;
    color:rgba(44,37,29,1);
    >div{
      margin:40px 0;
    }
    >img{
      width:90%;
    }
  }
}
</style>