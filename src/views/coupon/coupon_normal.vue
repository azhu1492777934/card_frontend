<template>
    <div class="coupon-wrap">
        <div class="coupon-inner-wrap">
            <div class="logo-wrap">
                <img class="img-logo" src="../../assets/imgs/coupon/coupon-log.png"/>
                <div class="logo-desc">卡券兑换</div>
            </div>
            <div class="iccid-wrap">
                <div class="iccid-desc">兑换礼包卡号为：</div>
                <div class="iccid">{{ iccid }}</div>
            </div>

            <div class="coupon-code-wrap">
                <span>券号：</span>
                <input v-model="coupon_code" maxlength="15" placeholder="请输入兑换码">
            </div>

            <div class="btn-exchange-wrap">
                <button @click="exchange" class="btn-exchange">立即兑换</button>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    html,body,#app,.inner-wrap{height: 100%;}
    .coupon-wrap {
        position: relative;
        height: calc(100% - 44px);
        padding-top: 2rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-image: linear-gradient(-167deg,#5dcdff,#1ba0fe);
        .coupon-inner-wrap {
            position: relative;
            width: 80%;
            min-height: 90%;
            margin: 0 auto;
            background-color: #FFF;
            border-radius: 1%;
        }
        .logo-wrap {
            position: absolute;
            left: 50%;
            top: -102px;
            margin-left: -100px;
            .img-logo {
                width: 200px;
                height: 194px;
            }
            .logo-desc {
                width: 200px;
                color: #9b9b9b;
                font-size: 35px;
                text-align: center;
            }
        }
        .iccid-wrap {
            padding-top: 250px;
            .iccid-desc {
                padding-bottom: 20px;
                text-align: center;
                color: #000;
                font-size: 42px;
            }
            .iccid {
                text-align: center;
                color: #1ba0fe;
                font-size: 48px;
                box-sizing: border-box;
            }

        }
        .coupon-code-wrap {
            /*display: flex;*/
            justify-content: center;
            align-items: center;
            padding: 180px 25px 0;
            span{
                display: inline-block;
                font-size: 40px;
            }
            input {
                display: inline-block;
                width: 73%;
                padding: 20px 0 20px 15px;
                font-size: 30px;
                color: #000;
                border: 1.5px solid #1ba0fe;
                border-radius: 10px;

            }
        }
        .btn-exchange-wrap {
            padding: 200px 25px 0;
            text-align: center;
            .btn-exchange {
                position: absolute;
                left: 50%;
                bottom:20px;
                display: inline-block;
                width: 90%;
                height: 80px;
                margin-left: -45%;
                border-radius: 100px;
                line-height: 80px;
                font-size: 40px;
                color: #fff;
                background: #1ba0fe;
                text-align: center;
                border: none;
                -webkit-appearance: none;
                -webkit-tap-highlight-color: transparent;
                outline: none;
            }
        }

    }

</style>


<script>
    // @ is an alias to /src
    import {Notify} from 'vant'
    import {getStorage,setStorage} from "../../utilies";
    import {_post} from "../../http";

    export default {
        name: "watch_card",

        data() {
            return {
                iccid: '',
                coupon_code:'',
            }
        },
        created() {
            if(getStorage('check_iccid')){
                this.iccid = getStorage('check_iccid');
            }else{
                Notify({message:'您的ICCID号码丢失了'})
                setTimeout(function () {
                    this.$router.push('/weixin/new_auth')
                },2000)
            }
        },
        methods: {
            exchange:function () {
                let _this = this;
                if(!this.coupon_code){
                    Notify({message:'请输入兑换码'})
                    return
                }else if(!/[a-zA-Z0-9_]{4,12}/.test(this.coupon_code)){
                    Notify({message:'您的兑换码有误,请检查'})
                    return
                }
                _post('/api/v1/app/coupon/exchange',{
                    iccid:this.iccid,
                    no:this.coupon_code
                }).then(res=>{
                    if(res.state==1){
                        Notify({
                            message:'兑换成功',
                            background:'#60ce53'
                        })
                        setTimeout(function () {
                            setStorage('check_iccid',_this.iccid)
                            _this.$router.push({path:'/weixin/card/usage'});
                        },2000)
                    }else{
                        Notify({message:res.msg})
                    }
                })
            }
        }
    };
</script>

