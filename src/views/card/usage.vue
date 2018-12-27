<template>
    <div class="plan-usage-wrap">

        <div class="btn-recharge-wrap">
            <button @click="recharge">套餐查询</button>
        </div>
    </div>
</template>

<style lang="less">
    .plan-usage-wrap{

    }
</style>

<script>

    import {Swipe, SwipeItem,Toast} from 'vant';
    import {setStorage} from "../../utilies";
    // @ is an alias to /src
    export default {
        name: "home",

        data() {
            return {

            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]:Toast,
        },
        created() {


        },
        mounted() {


        },
        methods: {
            swiperOnChange: function (index) {
                this.cur_plan_type_index = index;
                this.choose_plan_index = 0;
            },
            planTypeClikc: function (index) {
                this.cur_plan_type_index = index;
                this.choose_plan_index = 0;
                this.$refs.swiperVant.swipeTo(index);
            },
            choosePlanClick: function (index) {
                this.choose_plan_index = index
            },
            recharge:function () {
                let planInfo = this.mock_list[this.cur_plan_type_index][this.choose_plan_index]
                if(planInfo.surplus_times<=0){
                    Toast('此套餐已售罄, 请更换套餐');
                    return
                }
                planInfo.iccid = '891111111100000000'
                setStorage('planInfo',planInfo);
                this.$router.push({ path:'/recharge'})
            }
        }
    };
</script>

