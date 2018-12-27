<template>
    <div>

    </div>
</template>

<style lang="less">

</style>


<script>
    // @ is an alias to /src
    import {_post} from "../../http";

    export default {
        name: "watch_card",

        data() {
            return {
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

        },
        methods: {
            recharge_80: function (speedupIndex) {
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

