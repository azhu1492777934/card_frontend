<template>
    <div>
        <speedup :list="list" @rechargeSpeedup="recharge_500"></speedup>
    </div>
</template>

<style lang="less">

</style>

<script>
    // @ is an alias to /src
    import speedup from '../../components/speedup/index'
    import {_post,_get} from "../../http";
    import {getStorage} from "../../utilies";

    export default {
        name: "home",
        props:{
            decrypt_data: {},
        },
        components: {
            speedup
        },
        data() {
            return {
                userInfo:'',
                list: [{
                    name: '30G加速包',
                    flow: 30,
                    price: 57.00,
                    rating_id:'2530'

                }, {
                    name: '20G加速包',
                    flow: 20,
                    price: 38.00,
                    rating_id:'2531'
                }, {
                    name: '10G加速包',
                    flow: 10,
                    price: 19.00,
                    rating_id:'2532'
                }, {
                    name: '5G加速包',
                    flow: 5,
                    price: 9.50,
                    rating_id:'2533'
                }, {
                    name: '1G加速包',
                    flow: 1,
                    price: 1.90,
                    rating_id:'2534'
                }],

            }
        },
        created() {
            if(getStorage('userInfo')) {
                this.userInfo = getStorage('userInfo');
            }
        },

        methods: {
            recharge_500: function (speedupIndex) {
                /*
                * speedupIndex:当前选中的加速包的index
                * */
                if(!this.userInfo.account.user_id){
                    Notify({message:'请在支付宝或微信环境中充值'});
                    return
                }
                if(this.userInfo)
                _post('/api/v1/pay/weixin/create',{
                    status:0,
                    iccid:'8986061805001065858',
                    rating_id:this.list[speedupIndex].rating_id,
                    recharge_price:this.list[speedupIndex].price,
                    price:this.list[speedupIndex].price,
                    user_id : this.userInfo.account.user_id,
                    open_id : this.decrypt_data.openid
                }).then(res=>{
                    if(res.state){
                        if(res.html){
                            document.write(res.html)
                        }
                    }else{
                        Notify({message:res.msg})
                    }
                })

            }

        }
    };
</script>

