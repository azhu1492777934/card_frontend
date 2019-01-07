<template>
    <div class="toAli-wrap">
        <div>
            <div class="browser-wrap">
                <p >点击右上角选择浏览器打开后，</p>
                <p>进入手机淘宝提交实名身份信息。</p>
            </div>
            <div class="qrCode-wrap">
                <p>或者保存二维码,在手机淘宝扫描二维码</p>
                <p>进行实名认证（长按保存）</p>
            </div>
            <div class="qr-img-wrap">
                <img :src="qrSrc" alt="实名二维码">
            </div>
            <img src="" alt="">
            <p class="footer-wrap">
                <span class="iconfont icon-tao"></span>
                阿里认证，隐私无忧
            </p>
        </div>
    </div>
</template>

<style lang="less">
    .toAli-wrap{
        .browser-wrap{
            padding: 20px 0;
            font-size: 32px;
            color: #fff;
            background-color: #14b3f0;
        }

        .qrCode-wrap{
            line-height: 1.3;
            padding:40px 0;
        }

        .qr-img-wrap{
            text-align: center;
            img{
                display: inline-block;
                width: 50%;
                height: auto;
            }

        }


        .footer-wrap{
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: 20px;
            font-size: 28px;
            .icon-tao{
                font-size: 40px;
                color: #f19907;
                vertical-align: text-bottom;
            }
        }
    }
   
</style>

<script>
    // @ is an alias to /src

    import {Notify,Popup} from 'vant';
    import {getUrlParam} from "../../utilies";
    import {_get} from "../../http";

    export default {
        name: "home",

        data() {
            return {
                iccid:'',
                imei:'',
                qrSrc:''
            }
        },
        components: {
            [Notify.name]:Notify,
            [Popup.name]:Popup,
        },
        created() {
            this.iccid = getUrlParam('iccid');
            this.imei = getUrlParam('imei');
            this.qrSrc = 'http://cardserver_test.china-m2m.com/qrcode?iccid='+this.iccid+'&imei='+this.imei
        },
        mounted() {
           
        },
        methods: {
           login:function () {
               
           }
        }
    };
</script>

