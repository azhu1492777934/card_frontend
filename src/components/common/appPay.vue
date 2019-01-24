<template>
    <van-popup :close-on-click-overlay="false" v-model="appPay.show" class="border-radius-10">
        <div class="appContext-pay-wrap">
            <div class="title">
                支付方式选择
            </div>
            <div class="content">
                <p @click="changePayType(1)" :class="{'choose_type':appPay.type}">微信支付</p>
                <p @click="changePayType(0)" :class="{'choose_type':!appPay.type}">支付宝支付</p>
            </div>
            <div class="footer">
                <button @click="closePayType">取消</button>
                <button @click="finalPay">确定</button>
            </div>
        </div>
    </van-popup><!--app支付选择-->
</template>

<script>
    import {Popup} from 'vant'
    export default {
        name: "appPay",
        props:{
            appPay:{
                type:Object
            }
        },
        components:{
            [Popup.name]:Popup
        },
        methods: {
            changePayType(type) {
                this.$emit('changeAppPayType',type);//当前选中的加速包的index
            },
            closePayType() {
                this.$emit('closeAppPayType');
            },
            finalPay(){
                this.$emit('finalAppPay');
            }
        }
    }
</script>

<style lang="less">

    .border-radius-10{
        width: 80%;
        border-radius: 10px;
    }
    .appContext-pay-wrap {
        color: #333;
        .title {
            font-size: 32px;
            font-weight: 500;
            padding-top: 25px;
            text-align: center;
        }
        .content {
            padding: 25px;
            line-height: 1.5;
            max-height: 60vh;
            overflow-y: auto;
            text-align: center;
            color: #7d7e80;
            font-size: 28px;
            p {
                margin: 10px 0;
                padding: 10px;
            }
            .choose_type {
                background-color: #f1af4c;
                color: #fff;
                border-radius: 5px;
            }
        }
        .footer {
            display: flex;
            border-top: 1PX solid #f5f5f5;
            height: 90px;
            button {
                flex: 1;
                font-size: 28px;
                background-color: transparent;
                &:first-child {
                    color: #000;
                    border-right: 1PX solid #f5f5f5;
                }
                &:last-child {
                    color: #f1af4c;
                }
            }
        }
    }

</style>