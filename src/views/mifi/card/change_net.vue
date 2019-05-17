<template>
    <div class="change-net-wrap">
        <div class="bg-net"></div>
        <p class="tip">若网络线路拥堵，切换线路可提升网速</p>
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
                disabled:false,
                iccid: getStorage('check_iccid'),
            }
        },
        components: {
            [Toast.name]: Toast,
        },
        methods: {
          changeNetwork(){
              let _this = this;
              this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
              this.disabled = true;
            _post('/api/v1/app/cards/activated',{
                iccid:this.iccid
            }).then(res=>{
                this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
                this.disabled = false;
                if(res.state === 1){
                    Toast.success('修改网络成功,请重启设备');
                    setTimeout(()=>{
                        _this.$router.push({path:'/mifi/card/index'})
                    },2000)
                }else{
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
        .bg-net{
            width: 591px;
            height: 434px;
            margin: 0 auto;
            .bg-image('../../assets/imgs/mifi/card/network/bg_network');
        }
        .tip{
            padding: 60px 0 250px;
            font-size: 36px;
            color: #7f7f7f;
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