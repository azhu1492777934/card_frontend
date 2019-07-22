<template>
  <div class="realNameCourse">
    <div>
      <img src="../../assets/imgs/realName/01.png" alt="">
      <img src="../../assets/imgs/realName/02.png" alt="">
      <img src="../../assets/imgs/realName/03.png" alt="">
      <img src="../../assets/imgs/realName/04.png" alt="">
      <img src="../../assets/imgs/realName/05.png" alt="">
      <img src="../../assets/imgs/realName/06.png" alt="">
      <img src="../../assets/imgs/realName/07.png" alt="">
      <img src="../../assets/imgs/realName/08.png" alt="">
      <img src="../../assets/imgs/realName/09.png" alt="">

    </div>
  </div>
</template>

<script>

  export default {
    name: "home",

    data() {
      return {};
    },
    components: {},
    created() {
    },
    methods: {}
  };
</script>

<style lang="less">
  .realNameCourse {
    > div {
      img {
        width: 100%;
        margin-bottom: 50px;
      }

      > img:nth-child(3), > img:nth-child(5), > img:nth-child(7), > img:nth-child(9) {
        width: 80%;
      }
    }
  }
</style>

