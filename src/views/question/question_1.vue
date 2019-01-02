<template>
    <div  class="get-plan-wrap">
        <div class="get-plan-inner">
            <p>解决方案</p>
            <div class="solution-wrap">
                <p>套餐充值成功，流量通话未增加</p>
                <p>点击下方按钮，找回您遗失的套餐</p>
            </div>
        </div>

        <button class="btn-getback">找回套餐</button>
    </div>
</template>

<style lang="less">
    html,body,#app,.get-plan-wrap{height: 100%}
   .get-plan-wrap{
       display: flex;
       align-items: center;
      .get-plan-inner{
          width: 95%;
          height: 540px;
          margin: 0 auto;
          background-image: url("../../assets/imgs/question/bg.png");
          background-size: 100% 100%;
          >p{
              padding: 150px 0 20px;
              font-size: 34px;
          }
          .solution-wrap{
              p{
                  &:first-child{
                      color: #ff9605;
                  }
              };
              line-height: 1.4;
              color: #333;
              font-size: 28px;
          }
      }
       .btn-getback{
           position: absolute;
           bottom: 60px;
           left:50%;
           width: 88%;
           height: 80px;
           margin-left: -44%;
           background-image: url("../../assets/imgs/question/btn.png");
           background-size: 100% 100%;
           background-color: transparent;
           color: #fff;
           font-size: 30px;
           font-weight: bold;
           line-height: 80px;
           text-align: center;
       }
   }
</style>

<script>
    // @ is an alias to /src
    export default {
        name: "home",

        data() {
            return {
                
            }
        },
        created() {

        },
        mounted() {
           
        },
        methods: {

        }
    };
</script>

