<template>

    <div class="g-wrap">
        <div style="display: none;" class="show-tip">
            <p></p>
        </div>
        <div class="personal-box" style="display: none;">
            <div class="info">
                <img src="" alt="" />
                <span class="name"></span>
            </div>
            <div class="money">
                <span class="title">钻石：</span>
                <span class="recommond"></span>
                <span class="title">ELB：</span>
                <span class="elb"></span>
                <span class="doubt"></span>
            </div>
        </div>
        <div class="warning">
            <p>充值活动：充值钻石送ELB，钻石ELB可等额购买套餐套餐到期自动使用钻石续费。</p>
        </div>
        <div class="content-wrap">
            <div class="title-wrap">
                <em class="title-line"></em>
                <span class="title-name">支付选择</span>
                <em class="title-line rotate-180"></em>
            </div>
            <ul class="discount-wrap">
                <li data-rmb="-1" class="diamond-wrap" data-elb="0">
                    <div>
                        <p class="discount-rmb discount-diamond">钻石支付</p>
                        <p class="discount-appendix">可抵扣<em class="j-user-rmb cl-primary"></em>元<br>无ELB赠送</p>
                    </div>
                </li>
                <li data-rmb="100" data-elb="20">
                    <div>
                        <p class="discount-rmb">100元</p>
                        <span class="line"></span>
                        <p class="discount-appendix">赠送<em class="cl-elb">20</em>ELB</p>
                    </div>
                </li>
                <li data-rmb="200" data-elb="50">
                    <div>
                        <p class="discount-rmb">200元</p>
                        <span class="line"></span>
                        <p class="discount-appendix">赠送<em class="cl-elb">50</em>ELB</p>
                    </div>
                </li>
                <li data-rmb="300" data-elb="80">
                    <div>
                        <p class="discount-rmb">300元</p>
                        <span class="line"></span>
                        <p class="discount-appendix">赠送<em class="cl-elb">80</em>ELB</p>
                    </div>
                </li>
                <li data-rmb="0" data-elb="0">
                    <div>
                        <p class="j-reality-rmb discount-rmb"></p>
                        <span class="line"></span>
                        <p class="discount-appendix">无ELB赠送</p>
                    </div>
                </li>
                <li class="special"></li>
            </ul>
            <div class="choice-wrap">
                <div class="j-date-wrap">
                    <span class="cl-primary">生效日期：</span>
                    <div @click="changedCheck('date')">
                        <input :checked="!check_date" type="radio">
                        <span>立即生效</span>
                    </div>
                    <div @click="changedCheck('date')">
                        <input :checked="check_date" type="radio">
                        <span>选择时间</span>
                    </div>
                    <input v-show="check_date" id="dateSelector" v-model="val_date" readonly placeholder="请选择时间" type="text">
                </div>
                <div class="j-code-wrap">
                    <span class="cl-primary">使用抵扣券：</span>
                    <div @click="changedCheck('coupon')">
                        <input :checked="!check_coupon" type="radio">
                        <span>否</span>
                    </div>
                    <div @click="changedCheck('coupon')">
                        <input :checked="check_coupon" type="radio">
                        <span>是</span>
                    </div>
                    <input v-show="check_coupon" id="codeSelector" v-model="val_coupon" placeholder="请输入券码,券码不退不补" type="text">
                </div>
                <div class="j-elb-wrap">
                    <span class="cl-primary">使用ELB：</span>
                    <div @click="changedCheck('elb')">
                        <input :checked="!check_elb" type="radio">
                        <span>否</span>
                    </div>
                    <div @click="changedCheck('elb')">
                        <input :checked="check_elb" type="radio">
                        <span>是</span>
                    </div>
                    <input v-show="check_elb" id="elbSelector" v-model="val_elb" placeholder="请输入抵扣数,ELB不退不补" type="number">
                </div>
            </div>
            <button class="btn btn-large" id="btn-pay">支付</button>
        </div>
        <!--<van-area :area-list="areaList" />-->

        <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
        />
        <div style="display: none" class="fixed-wrap">
            <div>
                <p>温馨提示</p>
                <p>创建订单中,请等候</p>
            </div>
        </div>
    </div>

</template>

<script>
    // import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
    import { DatetimePicker,Area } from 'vant';
    import {areaList} from '../new_card/areaData.js'
    // import 'areaData.js'
    export default {
        name: "recharge",
        components: {
            // [Card.name]: Card,
            // [Checkbox.name]: Checkbox,
            // [SubmitBar.name]: SubmitBar,
            // [CheckboxGroup.name]: CheckboxGroup
            [DatetimePicker.name]:DatetimePicker,
            [Area.name]:Area,
        },
        data(){
            return{
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                maxDate: new Date(2019, 10, 1),
                currentDate: new Date(),

                check_date:false,
                check_coupon:false,
                check_elb:false,

                val_date:'',
                val_coupon:'',
                val_elb:'',

                src:'areaData.js'
            }
        },
        methods:{
            changedCheck:function(type){
                console.log(11);
                switch (type){
                    case 'date':
                        this.check_date = !this.check_date;
                        break;
                    case 'coupon':
                        this.check_coupon = !this.check_coupon;
                        break;
                    case 'elb':
                        this.check_elb = !this.check_elb;
                        break;
                }
            }

        },
        created(){

        },
        mounted(){
            console.log(areaList);
            // const s = document.createElement('script');
            // s.type = 'text/javascript';
            // s.src = 'areaData.js';
            // document.body.appendChild(s);

        },
    }
</script>

<style scoped>
    ul{padding: 0;margin: 0;}
    input[type=radio] {-webkit-appearance: none;-moz-appearance: none;appearance: none;position: relative;display: inline-block;vertical-align: top;width: 30px;height: 30px;border: 1px solid #bcbcbc;outline: none;cursor: pointer;border-radius: 50%;vertical-align: text-top;}
    input[type=radio]:after {content: '';position: absolute;width: 10px;height: 10px;display: block;left: 0;top: 0;right: 0;bottom: 0;margin: auto;background: #dca85f;border-radius: 12px;transform: scale(0);transition: all ease-in-out 300ms;}
    input[type=radio]:checked {border-color: #dca85f;}
    input[type=radio]:checked:after {transform: scale(1);}
    input[type=radio]:checked + em {vertical-align: middle}

    /*uer_info*/
    .personal-box{
        display: flex;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background: url("/static/images/head-bg@2x.png") no-repeat;
        background-size: 100%;
    }
    .personal-box .info{
        flex: 2;
    }
    .personal-box .money{
        flex: 4;
    }
    .personal-box .btn-area{
        flex: 1;
    }
    .personal-box .info img{
        display: inline-block;
        margin: 0 8px 0 22px;
        width: 58px;
        height: 58px;
        background: red;
        vertical-align: middle;
    }
    .personal-box .info .name{
        display: inline-block;
        width: 146px;
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(28,28,32,1);
        line-height: 33px;
        vertical-align: middle;
        overflow: hidden;
    }
    .personal-box .money .title{
        display: inline-block;
        width:72px;
        height:80px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(28,28,32,1);
        line-height:80px;
    }
    .personal-box .money .recommond{
        padding-left: 43px;
        display: inline-block;
        width: 127px;
        height: 40px;
        line-height: 40px;
        background: url("/static/images/recommend@2x.png") no-repeat;
        background-size: 100%;
        vertical-align: middle;
        margin: -18px 15px 0 0;
        font-size:22px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(28,28,32,1);
        box-sizing: border-box;
    }
    .personal-box .money .elb{
        padding-left: 43px;
        display: inline-block;
        width: 127px;
        height: 40px;
        line-height: 40px;
        background: url("/static/images/elb@2x.png") no-repeat;
        background-size: 100%;
        vertical-align: middle;
        margin: -18px 28px 0 0;
        font-size:22px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(28,28,32,1);
        box-sizing: border-box;
    }
    .personal-box .money .doubt{
        display: inline-block;
        width: 35px;
        height: 35px;
        background: url("/static/images/doubt@2x.png") no-repeat;
        background-size: 100%;
        vertical-align: middle;
        margin-bottom: 20px;
    }
    .personal-box .btn-area .recharge{
        display: inline-block;
        width: 80px;
        height: 36px;
        background: url("/static/images/recharge-icon@2x.png") no-repeat;
        background-size: 100%;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:36px;
        text-align: center;
        margin-top: 22px;
    }
    .g-wrap{text-align: left;}

    /*tip*/
    .show-tip{position: fixed;top: 0;left: 0;width: 100%;font-size: 28px; text-align: center; color: #fff; background-color: rgba(212, 2, 17, 0.6);z-index: 999;}
    .show-tip p{padding: 15px;}

    /*btn*/
    .btn{
        display: block;
        color: #fff;
        background-color: #dca85f;
    }
    .btn-large{
        display: block;
        width: 100%;
        padding: 20px;
        margin: 90px 0;
        font-size: 34px;
        border-radius: 13px;
    }

    .cl-primary{
        color: #c19252;
    }
    .warning {
        background-color: #feeae5;
    }
    .warning p{
        text-align: center;
        padding: 20px;
        font-size: 24px;
        color: #ff562f;
    }
    .title-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0;
        text-align: center;
        font-size: 28px;
        color: #c89439;
    }
    .title-wrap span{padding: 0 30px;}
    .rotate-180{
        transform: rotate(180deg);
    }
    .title-line{
        display: inline-block;
        flex: 1;
        height: 3px;
        max-width: 20%;
        content: '';
        background: linear-gradient(45deg, #fff 0, #c19252 100%);
    }


    .content-wrap{
        width: 95%;
        margin: 0 auto;
    }
    .content-wrap .discount-wrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .content-wrap .discount-wrap li{
        display: table;
        position: relative;
        width: 31%;
        max-width: 33.33%;
        min-height: 183px;
        margin:0 0 20px;
        font-size: 28px;
        text-align: center;
        border: 1PX solid #e6e6e6;
        border-radius: 16px;
        -webkit-text-size-adjust: none;
    }
    .content-wrap .discount-wrap li.checked::after{
        position: absolute;
        right: 0;
        bottom: 0;
        content: '✓';
        width: 33px;
        height: 25px;
        color: #fff;
        background-color: #c89439;
        font-size: 22px;
        border-top-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .content-wrap .discount-wrap li.special{
        border-color: transparent;
        visibility: hidden
    }
    .content-wrap .discount-wrap .line{
        display: block;
        width: 60px;
        height: 3px;
        margin: 10px auto 13px;
        background-color: #c89439;
    }
    .content-wrap .discount-wrap li div{
        display: table-cell;
        vertical-align: middle;
    }

    .discount-wrap li .discount-rmb{
        font-size: 28px;
        color: #2c251d;
        line-height: 1;
    }

    .discount-wrap li .discount-diamond{
        font-size: 26px;
        padding-bottom: 5px;
    }
    .discount-wrap li .discount-appendix{
        color: #888;
        font-size: 20px;
        letter-spacing: 1PX;
    }
    .discount-wrap li .cl-elb{
        color: #70a6ec;
    }
    .discount-wrap li.checked{
        border-color: #c89439;
        box-shadow: 0 50px 0 #fff;
    }
    .discount-wrap li.checked .discount-rmb{
        color: #fd720d;
    }

    /**/
    .choice-wrap{
        position: relative;
        padding-top: 60px;
        font-size: 28px;
        color: #2c251d;
    }
    .choice-wrap > div{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 30px;
    }
    .choice-wrap div span,
    .choice-wrap div div{
        flex: 1;
    }
    .choice-wrap div span:first-child{
        max-width: 200px;
        text-align: right;
    }
    .choice-wrap div div{
        max-width: 200px;
    }
    .choice-wrap input[type="text"],
    .choice-wrap input[type="number"]{
        display: block;
        width: 100%;
        font-size: 28px;
        margin: 10px 30px 0;
        padding: 10px;
        border-bottom: 1PX solid #cac7c7;
    }

    .fixed-wrap{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: rgba(82, 82, 82, 0.3);
    }
    .fixed-wrap div{
        font-size: 28px;
        width: 80%;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
    }
    .fixed-wrap p{
        padding: 70px 0;
        color: #5a5a5a;
    }
    .fixed-wrap p:first-child{
        border-bottom: 1PX solid #d2d2d2;
        padding: 25px 0;
    }
</style>