<template>
    <div class="refund-argument-wrap">
        <div class="refund-title">退款协议书</div>
        <div class="refund-content">
            <p>为明确退款规则和规范退款流程，请退款用户详细阅读该协议</p>
            <p>1、退款用户需填写必要信息才能提交退款申请</p>
            <p>2、退款申请提交后3-5个工作日，退款原路返还至用户账户</p>
            <p>3、退款套餐购买时限不得超过30天，且使用量不能超过总量的30%</p>
            <p v-if="currentType!='userCenter'">4、手表卡仅使用流量或语音单独一项且用量<1%可全额退款</p>
            <p v-if="currentType!='userCenter'">5、手表卡流量或语音任意一项 1% < 使用量 < 10% 按套餐总额90%退款</p>
            <p v-if="currentType!='userCenter'">6、手表卡流量或语音任意一项 10% < 使用量 < 30% 按套餐总额70%退款</p>
            <p><span v-if="currentType!='userCenter'">7</span><span v-else>4</span>、流量卡使用量 <10MB可全额退款</p>
            <p><span v-if="currentType!='userCenter'">8</span><span v-else>5</span>、流量卡使用量>10MB不足1GB的按1GB计算，且后续每1GB按5元成本计算</p>
            <p v-if="currentType!='userCenter'">9、手机淘宝充值用户请提供支付宝账号，额外扣除2元手续费后剩余退款部分将通过支付宝转账方式退还</p>
            <p v-if="currentType!='userCenter'">10、ELB、抵扣券支付套餐的部分不支持退款，RMB、钻石支付的部分按上述退款规则执行</p>
        </div>
        <div class="btn-refund-wrap">
            <div>
                <button @click="checkArgument">同意协议</button>
            </div>
            <div @click="cancel">
                <a href="javascript:void(0);">拒绝协议</a> 
                <!-- <router-link to="/weixin/question/index" class="refuse_icon">拒绝协议</router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "argument",
        data (){
            return {
                currentType:"" 
            }
        },
        created(){
            this.currentType=localStorage.getItem("currentType");
        },
        methods:{
           checkArgument(){
               this.$router.push({
                   path:'/weixin/refund/index',
               })
           },
           cancel(){
               if(this.currentType=="userCenter"){
                this.$router.push({
                    path:'/weixin/userCenter/index',
                })
               }else{
                this.$router.push({
                    path:'/weixin/question/index',
                })
               }
           }
        }
    }
</script>

<style lang="less">

    .refund-argument-wrap {
        width: 94%;
        margin: 0 auto;
        padding: 0 40px;
        box-sizing: border-box;
        background-color: #fff;
        .refund-title {
            padding: 30px 0;
            font-weight: 500;
            font-size: 30px;
            color: #000;
        }
        .refund-content {
            p {
                &:first-child {
                    text-indent: 42px;
                }
                padding-bottom: 20px;
                font-size: 24px;
                color: #666;
                text-align: left;
                line-height: 1.5;
            }
        }
        .btn-refund-wrap {
            display: flex;
            padding: 20px 0 40px;
            div {
                flex: 1;
                a, button {
                    display: inline-block;
                    padding: 10px 60px;
                    font-size: 30px;
                    border-radius: 10px;
                }
                button {
                    color: #fff;
                    background-color: #dca85f;

                }
                a {
                    color: #c7c7c7;
                    background-color: #ebebeb;
                }
            }
        }
    }

</style>