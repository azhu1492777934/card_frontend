<template>
  <div class="explanation-wrapper">
    <p class="title-wrapper">切换网络操作说明</p>
    <ul>
      <li>
        <p>1.关注进入公众号M2M物联网服务平台</p>
        <img src="../../assets/imgs/mifi/network_explanation/1.png" alt="关注进入公众号M2M物联网服务平台">
      </li>
      <li>
        <p>2.点击激活,输入卡号查询</p>
        <img src="../../assets/imgs/mifi/network_explanation/2.png" alt="点击激活,输入卡号查询">
      </li>
      <li>
        <p>3.点击"网速慢切换网络"</p>
        <img src="../../assets/imgs/mifi/network_explanation/3.png" alt="点击网速慢切换网络">
      </li>
      <li>
        <p>4.查看说明并点击"切换线路"</p>
        <img src="../../assets/imgs/mifi/network_explanation/4.png" alt="查看说明并点击切换线路">
      </li>
      <li>
        <p>5.重启设备</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "change_network"
  }
</script>

<style lang="less">
.explanation-wrapper{
  color: #333;
  .title-wrapper{
    padding: 30px 0;
    font-size: 40px;
    font-weight: 500;
  }
  ul{
    padding: 0 25px;
    li{
      padding-bottom: 35px;
    }
    img{
      display: block;
      width: 100%;
      height: auto;
    }
    p{
      padding-bottom: 15px;
      font-size: 32px;
      text-align: left;
      color: #ce1c1c;
    }
  }
}
</style>