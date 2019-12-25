<template>
  <div class="question-wrap">

  </div>
</template>

<script>
  // @ is an alias to /src
  import {setStorage, getStorage, checkBrowser} from "../../utilies";

  export default {
    name: "home",
    data() {
      return {
        client_type: checkBrowser()
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {}
  };
</script>

<style lang="less">
  .question-wrap {
    width: 96%;
    margin: 0 auto;

    .title {
      padding: 40px 0;
      border-bottom: 1px solid #f5f5f5;
      font-size: 36px;
      text-align: center;
      font-weight: bold;
    }

    ul {
      padding-top: 20px;
      text-align: left;
      margin-left: 77px;

      li {
        padding: 40px 0;
        border-bottom: 1px solid #f5f5f5;

        &:last-child {
          border-bottom: none;
        }

        a {
          font-size: 36px;
          color: #333;
          text-decoration: none;

          &:before {
            display: inline-block;
            margin-right: 20px;
            content: '';
            width: 7px;
            height: 30px;
            background-color: #5DABFD;
          }
        }
      }
    }
  }
</style>


