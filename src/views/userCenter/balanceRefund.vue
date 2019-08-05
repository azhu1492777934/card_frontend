<template>
    <div class="balanceRefund" >
       <div>
           <div>余额账户</div>
           <div>Account balance</div>
           <div>5.00</div>
       </div>
        <div>
            <div>退款金额</div>
            <div>
                <span>¥</span>
                <input type="text" placeholder="请输入退款金额">
            </div>
            <div>
                <div>可退余额:¥5</div>
                <div>全部退款</div>
            </div>
        </div>
        <div>
            确认退款
        </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import { Search,List,Cell } from 'vant';
    export default {
        data() {
            return {
                list:[{},{}]
            }
        },
        components: {
        
        },
        computed: {
            
        },
        created(){

        },
        mounted(){


        },
        methods: {
           
          
        },
       
    }
</script>

<style lang="less">
    .balanceRefund{
        padding-top:16px;
        text-align:left;

        >div:nth-child(1){
            width:635px;
            height:384px;
            margin:0 auto;
             background:url("../../assets/imgs/userCenter/balanceRefund.png")no-repeat;
            background-size:100% 100%;
            display:flex;
            flex-direction: column;
            justify-content: center;
            padding-left:110px;
            >div:nth-child(1){
                font-size:46px;
                font-family:SourceHanSansSC-Bold;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            >div:nth-child(2){
                font-size:24px;
                font-family:SourceHanSansSC-Regular;
                font-weight:400;
                color:rgba(255,255,255,1);

            }
            >div:nth-child(3){
                font-size:70px;
                color:rgba(255,255,255,1);
                margin-top:20px;
            }
        }
        >div:nth-child(2){
            padding:0 60px;
            >div:nth-child(1){
                font-size:32px;
                font-family:SourceHanSansSC-Normal;
                font-weight:400;
                color:rgba(139,139,139,1);
            }
            >div:nth-child(2){
                border-bottom:1px solid #DCDCDC;
                margin:60px 0 20px 0;
                padding-bottom:20px;
                display:flex;
                align-items:center;
                span{
                    font-size:70px;
                    font-family:STHeiti;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                input{
                    height:50px;
                    font-size:60px;
                    font-family:SourceHanSansSC-Regular;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    margin-left:25px;
                }
                input::-webkit-input-placeholder{
                  font-size:32px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(193,193,193,1);

                } 

                input:-moz-placeholder{
                    font-size:32px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(193,193,193,1);
                } 

                input::-moz-placeholder{
                    font-size:32px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(193,193,193,1);
                } 

                input:-ms-input-placeholder{
                    font-size:32px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(193,193,193,1);
                } 
            }
            >div:nth-child(3){
                display:flex;
                justify-content: space-between;
                >div:nth-child(1){
                    font-size:28px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(139,139,139,1);
                }
                >div:nth-child(2){
                    font-size:28px;
                    font-family:SourceHanSansSC-Normal;
                    font-weight:400;
                    color:rgba(45,108,253,1);
                }
            }
        }

        >div:nth-child(3){
            margin:160px auto 0 auto;
            width:631px;
            height:78px;
            background:rgba(64,145,255,1);
            border-radius:39px;
            text-align:center;
            line-height:78px;
            font-size:34px;
            font-family:SourceHanSansSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
    }
  
</style>