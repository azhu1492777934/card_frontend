<template>
    <div>
        <speedup :list="list" @rechargeSpeedup="recharge_80"></speedup>
    </div>
</template>

<style lang="less">

</style>


<script>
    // @ is an alias to /src
    import {Notify} from 'vant'
    import speedup from '../../components/speedup/index'
    import {_post} from "../../http";
    import {getStorage} from "../../utilies";

    export default {
        name: "home",
        components: {
            speedup
        },
        data() {
            return {
                userInfo:'',
                open_id:'',
                list: [{
                    name: '30G加速包',
                    flow: 30,
                    price: 50.00,
                    rating_id: '2870'
                }, {
                    name: '5G加速包',
                    flow: 5,
                    price: 9.50,
                    rating_id: '2533'
                }],
            }
        },
        created() {

            if(getStorage('userInfo','obj')) {
                this.userInfo = getStorage('userInfo','obj');
            }

            if(getStorage('decrypt_data','obj')){
                this.open_id = getStorage('decrypt_data','obj').openid
            }

        },
        methods: {
            recharge_80: function (speedupIndex) {
                /*
                * speedupIndex:当前选中的加速包的index
                * */
                if(!this.userInfo.account.user_id){
                    Notify({message:'请在支付宝或微信环境中充值'});
                    return
                }
                _post('/api/v1/pay/weixin/create',{
                    status:0,
                    iccid:'8986061805001065858',
                    rating_id:this.list[speedupIndex].rating_id,
                    recharge_price:this.list[speedupIndex].price,
                    price : this.list[speedupIndex].price,
                    user_id : this.userInfo.account.user_id,
                    open_id : this.open_id
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

