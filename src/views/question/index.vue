<template>
    <div  class="question-wrap">
        <p class="title">问题中心</p>
        <ul>
            <li>
                <a href="/weixin/question/find_plan">1.套餐充值成功，流量通话未增加</a>
            </li>
            <li>
                <a href="/weixin/question/revoke_plan">2.流量通话显示正常，但无法使用</a>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
   .question-wrap{
       width: 96%;
       margin: 0 auto;
       .title{
           padding: 40px 0;
           border-bottom: 1px solid #f5f5f5;
           font-size: 36px;
           text-align: center;
           font-weight: bold;
       }
       ul{
           padding-top: 20px;
           li{
              padding: 40px 0;
               border-bottom: 1px solid #f5f5f5;
               &:last-child{
                   border-bottom:none;
               }
               a{
                   font-size: 36px;
                   color: #333;
                   text-decoration: none;
                   &:before{
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
           login:function () {
               
           }
        }
    };
</script>

