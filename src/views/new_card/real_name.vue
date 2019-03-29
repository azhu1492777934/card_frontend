<template>
    <div class="g-wrap card-activated-wrap">
        <div v-show="card_tip" class="tip-wrap">根据工信部相关法规：物联网卡须完成实名认证且绑定相应设备。</div>
        <div v-show="!card_tip" class="tip-wrap">
            <span>1.根据工信部相关法规：物联网卡须完成实名认证且绑定相应设备,才允许使用。</span><br>
            <span>2.请在支付宝生活号‘万物互联’或微信公众号‘物联网通信运营商’中充值续费，在其他平台充值无法到账且无法退款</span>
        </div>
        <div class="info-wrap">
            <div>
                <span>ICCID</span>
                <input v-model="info_iccid" readonly placeholder="请输入ICCID" type="text">
            </div>
            <div v-if="showItem.showImei">
                <span>IMEI</span>
                <input v-model="info_imei" placeholder="请输入IMEI" type="number">
                <span class="iconfont icon-scan"></span>
            </div>
            <p v-if="showItem.showImei" class="tip-imei">可录入IMEI,也可使用默认IMEI;系统检测到设备IMEI后将自动更新。</p>
            <div v-show="showItem.showID">
                <span>身份证</span>
                <input v-model="info_id" placeholder="请输入身份证" type="number">
            </div>
            <div v-show="showItem.showName">
                <span>姓名</span>
                <input v-model="info_name" maxlength="15" placeholder="请输入姓名" type="text">
            </div>
            <div>
                <span>手机号</span>
                <input v-model="info_phone" placeholder="请输入" type="number">
            </div>
            <div class="code-wrap">
                <input v-model="info_code" placeholder="请输入验证码" type="number">
                <button @click="getCode" class="btn-code" :disabled="disabled_code">{{countDownMsg}}</button>
            </div>
        </div>
        <div class="tip-wrap" v-show="!card_tip">
            <p>移动号码实名仅支持一证五号，若实名卡数已超出请更换证件</p>
        </div>
        <div class="btn-next-wrap">
            <button @click="checkInfo" class="btn-next">下一步实名激活</button>
        </div>
        <p class="tutorial-wrap">
            <a @click="toTutorial">查看实名教程</a>
        </p>
        <van-popup v-model="showItem.showFixedWrap" :close-on-click-overlay="false">
            <p class="showTip">{{showTipMsg}}</p>
        </van-popup>

        <van-popup v-model="showItem.showCodeWrap" :close-on-click-overlay="false">
            <p class="showTip">{{showItem.showCodeMsg}}</p>
        </van-popup>
    </div>
</template>

<script>
    import {Popup, Notify} from 'vant';
    import {_get, _post} from "../../http";
    import {getStorage, inArray,getUrlParam} from "../../utilies";
    import '../../assets/less/common.less'
    // @ is an alias to /src
    export default {
        name: "home",
        props:{
            decrypt_data:{},
        },
        data() {
            return {
                //校验数据
                regex_phone: /(?:^1[3456789]|^9[28])\d{9}$/,
                regex_num: /^[1-9]\d*$/,
                regex_name: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                is_boss: false,


                card_tip: true,
                card_source: '',//卡源
                info_iccid: '',
                info_imei: '864319031839011',
                info_id: '',
                info_code: '',
                info_phone: '',
                info_name: '',

                isVerifyCode:false,//实名校验码
                verifyCode:'1111',//实名校验码

                showItem: {
                    showID: false,
                    showName: false,
                    showImei: false,
                    showFixedWrap: false,//大佬账户
                    showVerifyCode:false,//大佬账户信息

                    showCodeWrap:false,//实名校验码异步加载问题
                    showCodeMsg:''//实名校验码失败加载信息
                },

                countDown: 60,
                countDownMsg: '获取验证码',
                showTipMsg: '检测信息中，请等候',

                timer: null,
                disabled_code: false,
            }
        },
        components: {
            [Popup.name]: Popup,
            [Notify.name]: Notify,
        },
        created() {

            if(getUrlParam('iccid')){
                this.info_iccid =  getUrlParam('iccid');
            }else{
                if (getStorage('check_iccid')) {
                    this.info_iccid = getStorage('check_iccid');
                } else {
                    this.$router.push({'path':'/weixin/card/lookup'});
                }
            }
            if(getUrlParam('source')){
                this.card_source = getUrlParam('source');
            }else{
                if(getStorage('check_realNameSource')){
                    this.card_source = getStorage('check_realNameSource');
                }else{
                    this.$router.push({'path':'/weixin/card/lookup'});
                }
            }


            if (inArray(this.card_source, ['18', '19', '20', '21', '22','27']) >= 0) {
                this.card_tip = !this.card_tip
            }

            _get('/api/v1/app/find_iccid', {
                iccid: getStorage('check_iccid')
            }).then(res => {
                if (res.state==1) {
                    this.is_boss = true
                    this.showItem.showID = true;
                    this.showItem.showName = true
                } else {
                    this.is_boss = false
                    this.showItem.showID = false
                    this.showItem.showName = false
                }
                this.showItem.showFixedWrap = false
            })//检测是否是大佬账户


        },
        mounted(){},
        methods: {
            hideCodeVerify(){
                this.showItem.showVerifyCode = false
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf(elem, i);
            },
            //验证身份证
            verifyID: function (code) {
                var city = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江 ",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北 ",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏 ",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外 "
                };

                if (!code) {
                    return {
                        state: 0,
                        msg: '请输入您的身份证号码'
                    }
                }

                if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                    // console.log('身份证号格式错误');
                    return {
                        state: 0,
                        msg: '您的身份号码有误'
                    }
                }
                else if (!city[code.substr(0, 2)]) {
                    // console.log('地址编码错误');
                    return {
                        state: 0,
                        msg: '您的身份号码有误'
                    }
                }
                else {
                    //18位身份证需要验证最后一位校验位
                    if (code.length == 18) {
                        code = code.split('');
                        //∑(ai×Wi)(mod 11)
                        //加权因子
                        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                        //校验位
                        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                        var sum = 0;
                        var ai = 0;
                        var wi = 0;
                        for (var i = 0; i < 17; i++) {
                            ai = code[i];
                            wi = factor[i];
                            sum += ai * wi;
                        }
                        var last = parity[sum % 11];
                        if (parity[sum % 11] != code[17]) {
                            // tip = "校验位错误";
                            return {
                                state: 0,
                                msg: '您的身份号码有误'
                            }
                        }
                    }
                }
                return {
                    state: 1,
                }

            },
            checkPhone: function () {
                if (!this.info_phone) {
                    return {
                        state: 0,
                        msg: '请输入您的手机号码'
                    }
                }
                if (!this.regex_phone.test(this.info_phone)) {
                    return {
                        state: 0,
                        msg: '手机号码有误'
                    }
                }
                let pre_three_num = this.info_phone.substr(0,3),
                    watch_card = ['145','146','166','177','199'];
                if(watch_card.includes(pre_three_num)){
                    return {
                        state:0,
                        msg:'请勿输入以145/146/166/177/199开头的手机号码'
                    }
                }
                return {
                    state: 1
                }
            },
            checkCode: function () {
                if (!this.regex_num.test(this.info_code)) {
                    return {
                        state: 0,
                        msg: '验证码有误'
                    }
                }
                return {
                    state: 1
                }
            },
            getCode: function () {
                let _this = this;
                let resultCheckPhone = this.checkPhone();
                if (!resultCheckPhone.state) {
                    Notify({
                        message: resultCheckPhone.msg,
                        background: '#ce4141'
                    })
                    return
                }

                Notify({
                    message:'检测手机号码中,请等候'
                })


                _post('/api/v1/app/phone/check', {mobile: this.info_phone})
                    .then(res => {
                        if (res.state==1) {

                            clearInterval(this.timer);
                            this.disabled_code = true;
                            this.countDownMsg = this.countDown + 's';

                            this.timer = setInterval(function () {
                                _this.countDown--;
                                _this.countDownMsg = _this.countDown + 's'
                                if (_this.countDown <= 0) {
                                    clearInterval(_this.timer);
                                    _this.countDownMsg = '获取验证码';
                                    _this.countDown = 60;
                                    _this.disabled_code = false;
                                }
                            }, 1000)

                            _post('/api/v1/app/messages/send', {mobile: this.info_phone})
                                .then(function (res) {

                                    if (res.state==1) {
                                        Notify({
                                            message: '验证码发送成功',
                                            background:'#60ce53'
                                        });
                                    } else {
                                        Notify({message: res.msg});
                                    }
                                })

                        } else {

                            Notify({message: res.msg,})
                        }
                    })


            },//获取验证码

            checkInfo: function () {
                let checkIdResult = this.verifyID(this.info_id),
                    checkPhone = this.checkPhone(),
                    checkCode = this.checkCode();

                if (this.is_boss) {
                    if (!checkIdResult.state) {
                        Notify({message: checkIdResult.msg,})
                        return
                    }

                    if (!this.info_name) {
                        Notify({message: '请填写您的姓名'})
                        return
                    }

                    if (!this.regex_name.test(this.info_name) || this.info_name.length > 15) {
                        Notify({message: '请填写正确的姓名',})
                        return
                    }
                }

                if (!checkPhone.state) {
                    Notify({
                        message: checkPhone.msg,
                        background: '#ce4141'
                    })
                    return
                }

                if (!checkCode.state) {
                    Notify({
                        message: checkCode.msg,
                        background: '#ce4141'
                    })
                    return
                }

                this.bindImei();
            },
            bindImei(){
                let param = {
                    mobile: this.info_phone,
                    iccid: this.info_iccid,
                    code: this.info_code,
                    imei: this.info_imei,
                    realname: this.info_name || '***',
                    id_no: this.info_id || '***',
                    alibind: true,
                };

                Notify({message:'正在绑定手机号码,请等候'});
                _post('/api/v1/app/bind/imei', param)
                    .then(res => {
                        if (res.state==1) {
                            Notify({message:'绑定成功,正在前往第三方实名,请耐心等候'});

                            _get('/api/v1/app/jump/taobao', {
                                imei: this.info_imei,iccid:this.info_iccid,source:this.card_source
                            }).then(res => {
                                if(res.data.indexOf("taobao")!=-1){
                                    let ua = navigator.userAgent.toLowerCase();
                                    if(ua.match(/MicroMessenger/i) == "micromessenger"){
                                        this.$router.push({path:'to_tb',query:{url:res.data}});
                                    }else{
                                        location.href = res.data;
                                    }
                                }else{
                                    location.href = res.data;
                                }
                            })
                        } else {
                            if(res.msg){
                                Notify({message: res.msg,})
                            }else{
                                Notify({message: '绑定手机失败,请稍后再试',})
                            }
                        }
                    })
            },
            toTutorial: function () {
                if (this.card_source == 18 || this.card_source ==19) {
                    location.href = 'https://mp.weixin.qq.com/s/IMUU9Wan63K00QEFcxUnjg'
                } else {
                    location.href = 'https://mp.weixin.qq.com/s?__biz=MzUxODA0OTAyOQ==&mid=100000010&idx=1&sn=a5269b403df4782a2413184f027a01d2&chksm=798f9d604ef81476a074d02828cc355331e354d3c37f89aa3f87ddb21004903190d858842300&mpshare=1&scene=23&srcid=0601LjTN6Zs9SunY3rvoUg4Y#rd';
                }
            },
        }
    };
</script>

<style lang="less">
    input, button {
        border: none;
        outline: none;
    }
    .text-left{text-align: left;}

    .fixed-wrap-imei {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
    }

    .check-imei-info {
        position: relative;
        top: 40%;
        width: 80%;
        margin: 0 auto;
        padding: 30px;
        background: #fff;
        color: #333;
        text-align: center;
        font-size: 24px;
        border-radius: 5px;
    }

    .card-activated-wrap {
        .tip-wrap {
            padding: 18px 60px;
            font-size: 26px;
            line-height: 1.3;
            color: #ff562f;
            background-color: #fff1ee;
            text-align: left;
        }
        .info-wrap {
            font-size: 30px;
            background-color: #fff;
            .tip-imei {
                padding: 30px 40px;
                margin: 0;
                background-color: #f7f7f7;
                color: #616161;
                font-size: 28px;
                text-align: left;
                line-height: 1.3;
            }
            div {
                display: flex;
                padding: 33px 0;
                margin: 0 40px;
                align-items: center;
                border-bottom: 1px solid #e6e6e6;
                span {
                    width: 1.4rem;
                    text-align: left;
                    color: #2c251d;
                }
                input {
                    flex: 6;
                    font-size: 30px;
                }
                &:last-child {
                    border-bottom: none;
                }
                &.code-wrap{
                    justify-content: space-between;
                    input{
                        display: inline-block;
                        max-width: 60%;
                    }
                }
            }
            .icon-scan {
                font-size: 52px;
                color: #e4a750;
                line-height: .8;
            }
            .btn-code {
                padding: 17px 30px;
                font-size: 26px;
                color: #fff;
                background-color: #dca85f;
                border-radius: 10px;
            }
        }
        .btn-next-wrap {
            display: block;
            margin: 80px 30px 30px;
            button {
                width: 100%;
                color: #fff;
                background: #e4a750;
                padding: 23px;
                font-size: 34px;
                border-radius: 10px;
            }
        }
        .tutorial-wrap {
            padding-left: 30px;
            text-align: left;
            a {
                text-decoration: none;
                color: #c84512;
                font-size: 26px;
            }
        }

        .verify-code-wrap{
            width: 100%;
            background-color: transparent;
        }

        .verify-code-inner {
            align-items: center;
            position: relative;
            width: 90%;
            margin: 0 auto;
            padding: 25px;
            background-color: #fff;
            color: #333;
            font-size: 32px;
            box-sizing: border-box;
            border-radius: 10px;
            p {
                padding-bottom: 25px;
                &:last-child {
                    padding: 25px 0;
                    text-align: right;
                }
            }

            button {
                padding: 15px 30px;
                border-radius: 8px;
                color: #fff;
                font-size: 26px;
                background-color: #e4a750;
            }

            .title {
                font-size: 38px;
                text-align: center;
            }

            .btn-close {
                position: absolute;
                top: 20px;
                right: 20px;
                line-height: .9;
                color: #e4a750;
            }

            .code-wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .code-wrap input {
                width: 150px
            }
        }

    }
</style>



