<template>
    <div class="g-wrap card-activated-wrap">
        <div class="tip-wrap">根据工信部相关法规：物联网卡须完成实名认证且绑定相应设备。</div>
        <div style="display: none" class="tip-mobile">
            <span>1.请在支付宝生活号‘万物互联’或微信公众号‘物联网通信运营商’中充值续费，在其他平台充值无法到账且无法退款</span>
            <span>2.申请退款将会扣除卡板成本、套餐激活成本后返还余额</span>
        </div>
        <div class="info-wrap">
            <div>
                <span>ICCID</span>
                <input v-model="info_iccid" readonly placeholder="请输入ICCID" type="text">
            </div>
            <div>
                <span>IMEI</span>
                <input v-model="info_imei" placeholder="请输入IMEI" type="number">
                <span class="iconfont icon-scan"></span>
            </div>
            <p class="tip-imei">可录入IMEI,也可使用默认IMEI;系统检测到设备IMEI后将自动更新。</p>
            <div>
                <span>身份证</span>
                <input v-model="info_id" placeholder="请输入身份证" type="number">
            </div>
            <div>
                <span>姓名</span>
                <input v-model="info_id" placeholder="请输入姓名" type="number">
            </div>
            <div>
                <span>手机号</span>
                <input v-model="info_phone" placeholder="请输入" type="number">
            </div>
            <div>
                <input v-model="info_code" placeholder="获取验证码" type="number">
                <button class="btn-code">获取验证码</button>
            </div>
        </div>
        <div class="btn-next-wrap">
            <button @click="checkInfo" class="btn-next">下一步</button>
        </div>
        <p class="tutorial-wrap">
            <a href="javascript:;">查看实名教程</a>
        </p>

        <div class="fixed-wrap-imei">
            <p class="check-imei-info">正在检测IMEI,请等候</p>
        </div>
    </div>
</template>

<style lang="less">
    html, body {
        background-color: #f7f7f7;
    }

    input, button {
        border: none;
        outline: none;
    }
    .fixed-wrap-imei {position: fixed;top: 0;left: 0; width: 100%;height: 100%;z-index: 99;}

    .check-imei-info{position: relative;top: 40%;width: 80%;margin: 0 auto;padding: 30px;background: #fff;color: #333;text-align: center;font-size: 24px;border-radius: 5px;}


    .card-activated-wrap {
        .tip-wrap {
            padding: 18px 60px;
            font-size: 24px;
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
                &:nth-child(2), &:last-child {
                    border-bottom: none;
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
                message_timer: null,
                user_elb: 0,
                user_diamond: 0,
                user_name: '测试数据',
                is_show_msg: false,
                phone: '',
                regex_phone: /(?:^1[3456789]|^9[28])\d{9}$/,
                regex_num: /^[1-9]\d*$/,
                err_msg: '',
                toss: true, // 弹窗
                is_discount_true: false,//是否选择抵扣
                is_discount_false: true,
                discount_num: '', //选择抵扣elb个数


                //校验数据
                info_iccid: '',
                info_imei: '111111111',
                info_id: '',
                info_code: '',
                info_phone: '',

            }
        },
        created() {


        },
        methods: {
            inArray:function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf( elem, i);
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
                var tip = "";
                var pass = true;

                if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                    console.log('身份证号格式错误');
                    return
                }
                else if (!city[code.substr(0, 2)]) {
                    console.log('地址编码错误');
                    return
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
                            console.log('身份证有误')
                            return
                        }
                    }
                }
                console.log('通过')
                // if (!pass) alert(tip);
                // return pass;
            },
            checkInfo: function () {
                this.verifyID(this.info_id)
                if (!this.regex_phone.test(this.info_phone)) {
                    console.log('手机格式错误');
                    return
                }
                if (!this.regex_num.test(this.info_code)) {
                    console.log('验证码有误');
                    return
                }
            },
            scan:function(){

            },
            toTutorial:function(){
                if (source == 18) {
                    location.href = 'https://mp.weixin.qq.com/s/IMUU9Wan63K00QEFcxUnjg'
                } else {
                    location.href = 'https://mp.weixin.qq.com/s?__biz=MzUxODA0OTAyOQ==&mid=100000010&idx=1&sn=a5269b403df4782a2413184f027a01d2&chksm=798f9d604ef81476a074d02828cc355331e354d3c37f89aa3f87ddb21004903190d858842300&mpshare=1&scene=23&srcid=0601LjTN6Zs9SunY3rvoUg4Y#rd';
                }
            },


        }
    };
</script>

