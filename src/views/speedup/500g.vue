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

    export default {
        name: "home",
        components: {
            speedup
        },
        data() {
            return {
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

        },
        mounted(){
            // _post('/wy/playlist/detail?id=19723756','').then(res=>{
            //     console.log(res);
            // })

            /*_post('/api/v1/pay/weixin/create',{
                iccid:'8986061805001065858',
                rating_id:this.list[0].rating_id
            }).then(res=>{
                console.log(res);
            })*/

            // _get('/api/v1/app/cards/telcom/usage',{
            //     iccid:'8986061805001065858'
            // }).then(res=>{
            //     console.log(res);
            // })



        },
        methods: {
            recharge_500: function (speedupIndex) {
                /*
                * speedupIndex:当前选中的加速包的index
                * */
                _post('/api/v1/pay/weixin/create',{
                    iccid:'8986061805001065858',
                    rating_id:this.list[speedupIndex].rating_id
                }).then(res=>{
                    console.log(res);
                })

            }
        }
    };
</script>

