<template>
   <div class="new-card-lookup-wrap">
       <div class="new-card-inner-wrap">
           <p class="title">让天下没有走失的孩子</p>
           <ul class="card-type-wrap">
               <li>
                   <span class="block icon-telcom-card"></span>
                   <p>联通卡</p>
                   <span>扫码/输入ICCID号/输入手机号查询</span>
               </li>
               <li>
                   <span class="block icon-mobile-card"></span>
                   <p>移动卡</p>
                   <span>输入手机号码或ICCID号查询</span>
               </li>
           </ul>
       </div>
       <div class="p-lr-30">
           <input class="search" placeholder="扫码/输入ICCID号/输入手机号码查询" type="text">
           <button class="btn btn-large">查询</button>
       </div>
   </div>
</template>

<style lang="less">
   @import "../../assets/less/utitlies";
   @import "../../assets/less/common";
    .new-card-lookup-wrap {
        min-height: calc(100%);
        .p-lr-30{padding: 0 30px;}
        .new-card-inner-wrap{
            padding: 0 30px 100px;
            background-image: url("../../assets/imgs/new_card_lookup/bg.jpg");
            background-size: 100% 100%;
        }
        .title{
            position: relative;
            padding: 70px 0 115px;
            color: #5a3808;
            font-size: 34px;
            &:after{
                position: absolute;
                left: 50%;
                bottom: 90px;
                content: '';
                width: 36%;
                height: 5px;
                margin-left: -18%;
                background-color: #fff;
            }
        }
      .card-type-wrap{
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-telcom-card,.icon-mobile-card{
              height: 236px;
              margin: 0 auto;
          }
         .icon-telcom-card{
             width: 235px;
            .bg-image('../../assets/imgs/new_card_lookup/telcom_sim')
         }
         .icon-mobile-card{
             width: 300px;
            .bg-image('../../assets/imgs/new_card_lookup/mobile_sim')
         }
          p{
              padding: 20px 0;
              color: #5a3808;
              font-size: 24px;
              font-weight: bold;

          }
          span:last-child{
              font-size: 18px;
              color: #776040;
          }
      }
       .search{
          display: block;
           width: 100%;
           margin: 110px 0 155px;
          padding:0 0 25px 20px;
          color:#bcbcbc;
          border-bottom: 1PX solid @primary;
           box-sizing: border-box;
          font-size: 30px;
       }
    }
</style>

<script>
    // @ is an alias to /src
    export default {
        name: "home",
        props: {
            options: {
                type: Object,

            }
        },
        data() {
            return {


            }
        },
        created() {


        },
        methods: {
            inArray:function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf( elem, i);
            },
        }
    };
</script>

