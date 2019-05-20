<template>
    <div class="change-net-wrap">
        <div class="bg-net"></div>
        <div class="tip-wrap">
            <p>请先检查当前网络信号是否正常,用量是否已超过限速规则。</p>
            <p>网速慢的原因：</p>
            <p>1、运营商同一条线路使用人数过多时,会造成网络拥堵,网速变慢.可操作切换线路提升网速；</p>
            <p>2、如果切换线路后网速仍然较慢,有可能当前线路也处于拥堵状态；</p>
            <p>3、用网高峰时间段,网速会受到当地运营商环境限制；</p>
        </div>
        <button :disabled="disabled" @click="changeNetwork">切换线路</button>
    </div>
</template>

<script>
    import {getStorage, setStorage, toDecimal} from "../../../utilies";
    import {_post} from "../../../http";
    import {Toast} from 'vant';

    export default {
        name: "network",
        data() {
            return {
                disabled: false,
                iccid: getStorage('check_iccid'),
            }
        },
        components: {
            [Toast.name]: Toast,
        },
        methods: {
            changeNetwork() {
                let _this = this;
                this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
                this.disabled = true;
                _post('/api/v1/app/cards/activated', {
                    iccid: this.iccid
                }).then(res => {
                    this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
                    this.disabled = false;
                    if (res.state === 1) {
                        Toast.success('修改网络成功,请重启设备');
                        setTimeout(() => {
                            _this.$router.push({path: '/mifi/card/index'})
                        }, 2000)
                    } else {
                        Toast.fail(res.msg);
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    @import "../../../assets/less/utitlies";

    .change-net-wrap {
        padding-top: 190px;
        .bg-net {
            width: 591px;
            height: 434px;
            margin: 0 auto;
            .bg-image('../../assets/imgs/mifi/card/network/bg_network');
        }
        .tip-wrap{
            width: 80%;
            margin: 50px auto 0;
            text-align: left;
            p{
                font-size: 28px;
                color: #7f7f7f;
                line-height: 1.5;
                &:first-child{
                    padding-bottom: 50px;
                    font-size: 30px;
                    color: #f85290;
                }
            }
        }

        button {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 60px;
            width: 565px;
            height: 80px;
            color: #443f37;
            font-size: 36px;
            border-radius: 80px;
            background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
        }
    }
</style>