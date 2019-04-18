<template>
  <div class="contactUs" >
      <div>联系我们</div>

      <div><img src="./img/qrImg.png" alt=""></div>

      <div>联系人：李晓荣</div>

      <div>电话：15915449954</div>

      <div>网站：www.szthwc.com</div>

      <div>服务热线：400-8490-900</div>

      <div>地址：广东省  深圳市  宝安区  石岩街道办  石龙仔</div>

      <div>工业一路森海诺科创大厦6楼营销中心</div>
  </div>
</template>

<script>

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
    
  
      
    
  },
  mounted(){
    
  }
};
</script>

<style lang="less">
.contactUs{
  height:100%;
  background:url("./img/contactBg.png");
  background-size:100% 100%;
  color:#fff;
  font-size:28px;
  font-family:SourceHanSansSC-Regular;
  font-weight:400;
  line-height:38px;
  overflow:hidden;
  >div:nth-child(1){
    width:598px;
    border-bottom:1px solid #fff;
    margin:0 auto;
    font-size:40px;
    line-height:100px;
    text-align:left;
    margin-top:98px;
  }
   >div:nth-child(2){
     width:365px;
     height:365px;
     margin: 98px auto 0 auto;
     background-size:100% 100%;
     >img{
       width:100%;
       height:100%;
     }
   }
  >div{
    margin-top:36px;
  }
}
</style>