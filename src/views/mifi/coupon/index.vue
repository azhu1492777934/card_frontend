<template>
    <div class="coupon-wrap">
        <div class="title-wrap">
            <p class="deco-title">
                <span class="deco-left deco"></span>
                <span>卡券兑换</span>
                <span class="deco"></span>
            </p>
        </div>
        <div class="iccid-wrap">
            <p>兑换卡券礼包:</p>
            <p>{{iccid}}</p>
        </div>
        <div class="code-wrap">
            <span>券号：</span>
            <input v-model="coupon_code" placeholder="请输入兑换券码" type="text">
        </div>
        <div @click="exchange" class="btn-wrapper">
            <button :disabled="btnDisabled">兑换</button>
        </div>
    </div>
</template>

<script>
    import {Notify} from 'vant'
    import {getStorage} from "../../../utilies";
    import {_post} from "../../../http";

    export default {
        name: "index",
        data() {
            return {
                coupon_code:'',
                iccid: getStorage('check_iccid'),
                btnDisabled:false
            }
        },
        components: {
            [Notify.name]:Notify
        },
        created(){
            if(!this.iccid){
                this.$router.push({path:'/mifi/card/lookup'});
            }
        },
        methods: {
            exchange() {
                let _this = this;
                if (!this.coupon_code) {
                    Notify({message: '请输入兑换码'})
                    return
                } else if (!/[a-zA-Z0-9_]{4,12}/.test(this.coupon_code)) {
                    Notify({message: '您的兑换码有误,请检查'})
                    return
                }
                this.btnDisabled = true;
                _post('/api/v1/app/coupon/exchange', {
                    iccid: this.iccid,
                    no: this.coupon_code
                }).then(res => {
                    this.btnDisabled = false;
                    if (res.state == 1) {
                        Notify({
                            message: '兑换成功',
                            background: '#60ce53'
                        })
                        setTimeout(function () {
                            setStorage('check_iccid', _this.iccid)
                            _this.$router.push({path: '/mifi/card/index'});
                        }, 2000)
                    } else {
                        Notify({message: res.msg})
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../../../assets/less/utitlies";

    .coupon-wrap {
        .title-wrap {
            padding: 25px 0;
            background-color: #fffbf3;
            span:nth-child(2) {
                padding: 0 18px;
                font-size: 34px;
                font-weight: 500;
                color: #f8b43e;
            }

        }
        .iccid-wrap {
            height: 252px;
            padding: 90px 0 0 0;
            box-sizing: border-box;
            .bg-image('../../assets/imgs/mifi/common/iccid_bg');
            p {
                text-align: left;
                &:first-child {
                    padding: 0 0 0 56px;
                    font-size: 30px;
                    color: #353335;
                }
                &:last-child {
                    padding: 30px 0 0 96px;
                    font-size: 46px;
                    color: #fa7500;
                }
            }
        }
        .code-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 457px;
            background-color: #353335;
            span {
                font-size: 34px;
                font-weight: 500;
                color: #fff;
            }
            input {
                width: 534px;
                height: 58px;
                font-size: 28px;
                padding-left: 20px;
                border-radius: 10px;
                color: #353335;
                background-color: #fff;
            }
        }
        .btn-wrapper {
            button {
                width: 565px;
                height: 80px;
                margin: -40px 0;
                color: #443f37;
                font-size: 36px;
                border-radius: 80px;
                background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
            }

        }
    }
</style>