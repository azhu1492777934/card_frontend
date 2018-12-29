<template>
    <div class="plan-wrap">
        <div class="plan-type-wrap">
            <div class="plan-type-inner-wrap">
                <span @click="planTypeClikc(index)" v-for="(item,index) in plan_type_name"
                      :class="{'active_type':index==cur_plan_type_index}">{{item}}</span>
            </div>
        </div>
        <div class="van-swipe-wrap" ref="vanSwiperWwrap">
            <van-swipe ref="swiperVant" :show-indicators="false" @change="swiperOnChange">
                <van-swipe-item v-for="(item,index) in plan_type" :key="item">
                    <ul class="plan-list-wrap">
                        <li @click="choosePlanClick(inner_index)" v-for="(inner_item,inner_index) in mock_list[item]"
                            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
                            <div class="plan-info-wrap">
                                <p class="plan-name">{{ inner_item.name }}</p>
                                <p class="plan-limited-wrap">
                                    <span class="limited-num" v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">
                                        剩{{inner_item.surplus_times}}笔
                                    </span>
                                    <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">
                                        可抵扣{{inner_item.is_elb_deductible}}个ELB
                                    </span>
                                </p>
                                <p class="plan-desc">{{ inner_item.describe ?
                                    inner_item.describe:inner_item.remark?inner_item.remark:'' }}</p>
                            </div>
                            <div class="plan-price-wrap">
                                <p class="plan-price">￥{{ inner_item.price }}</p>
                                <del class="plan-origin-price">￥{{ inner_item.market_price }}</del>
                            </div>
                            <span class="plan-selected"></span><!--选中状态-->
                            <span class="icon-sell-done"  v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span><!--售罄-->
                        </li>
                    </ul>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="btn-recharge-wrap">
            <button @click="recharge">充值</button>
        </div>

    </div>
</template>

<style lang="less">
    html, body, #app, .plan-wrap {
        height: 100%;
    }

    .plan-wrap {
        .van-swipe-wrap {
            overflow: auto;
        }
        .plan-type-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
            .plan-type-inner-wrap {
                border: 1PX solid #dca85f;
                border-radius: 46px;
            }
            span {
                display: inline-block;
                height: 46px;
                padding: 0 50px;
                color: #868686;
                border: 1px solid transparent;
                font-size: 28px;
                line-height: 50px;
                border-radius: 46px;
                &.active_type {
                    color: #fff;
                    background-color: #dca85f;
                }
            }
        }
        //套餐列表
        .plan-list-wrap {
            li {
                position: relative;
                width: 90%;
                min-height: 95px;
                margin: 0 auto;
                display: flex;
                color: #868686;
                border: 1PX solid #e6e6e6;
                border-radius: 10px;
                margin-bottom: 25px;
                align-items: center;
                font-size: 20px;
                &:first-child {
                    margin-top: 20px;
                }
                &:last-child {
                    margin-bottom: 0;
                }
                //套餐信息
                .plan-info-wrap {
                    flex: 5;
                    padding: 0 40px;
                    box-sizing: border-box;
                    text-align: left;
                    .plan-name {
                        padding: 20px 0 10px;
                        font-size: 26px;
                        color: #2c251d;
                        font-weight: 500;
                    }
                    .plan-limited-wrap {
                        .limited-num {
                            display: inline-block;
                            padding: 6px 20px 4px;
                            margin: 0 5px 10px 0;
                            font-size: 20px;
                            color: #f11919;
                            background-color: #f9d8d8;
                            border-radius: 4px;
                            line-height: 1;
                        }

                    }
                    .plan-desc {
                        padding-bottom: 20px;
                    }
                }
                .plan-price-wrap {
                    flex: 1.5;
                    .plan-price {
                        color: #fd720d;
                        font-size: 36px;
                    }
                }

                //当前选中样式
                &.activedPlan {
                    border: 1PX solid #dca85f;
                    box-shadow: 0 0 30px 0 #eae9e9;
                    .plan-name {
                        color: #fd720d;
                    }
                    .selected-plan {
                        position: absolute;
                        right: 0;
                        bottom: 0;

                    }
                }
                //售罄状态
                &.plan-sell-done{
                    background-color: #f0f0f0;
                    .plan-name,.plan-price{
                        color:#868686 ;
                    }
                    .icon-sell-done {
                        position: absolute;
                        top: 40px;
                        left: 50%;
                        margin-left: -100px;
                        padding: 10px 20px;
                        font-size: 28px;
                        box-sizing: border-box;
                        border: 4px solid #ed6153;
                        color: #ed6153;
                        border-radius: 12px;
                        transform: rotate(-28deg);
                    }
                    .icon-sell-done::after {
                        content: '已售罄';
                    }
                }

            }
        }

        .btn-recharge-wrap {
            padding: 60px 32px;
            button {
                display: block;
                width: 100%;
                padding: 20px 0;
                font-size: 34px;
                color: #fff;
                background-color: #dca85f;
                border-radius: 8px;
            }
        }
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
                "moth_plan": null,
                "accumulated_plan": null,
                "speedup_plan": null,
                plan_type: [],
                plan_type_name: [],
                cur_plan_type_index: 0,//当前选中套餐类型
                choose_plan_index: 0,//当前选中套餐
                mock_list: {
                    "0": [
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "",
                            "id": 5501,
                            "is_elb_deductible": 10,
                            "is_recommend": false,
                            "market_price": 40.0,
                            "max_deductible_elb": null,
                            "name": "1G\u6708\u5957\u9910",
                            "price": 6.0,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u67081.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "13",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "",
                            "id": 10071,
                            "is_elb_deductible": 45,
                            "is_recommend": false,
                            "market_price": 39.0,
                            "max_deductible_elb": null,
                            "name": "\u9996\u5145\u4f18\u60e0\u5957\u99103G/\u6708",
                            "price": 9.9,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u67083.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "",
                            "id": 9299,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 99.0,
                            "max_deductible_elb": null,
                            "name": "12G*1\u4e2a\u6708",
                            "price": 29.9,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u670812.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": 12,
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "",
                            "id": 10072,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 99.0,
                            "max_deductible_elb": null,
                            "name": "12G*1\u4e2a\u6708",
                            "price": 29.9,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u670812.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": -1,
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "30G\u4e00\u4e2a\u6708\uff0c\u6bcf\u670826\u53f724\u70b9\u6e05\u96f6",
                            "id": 9288,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 139.0,
                            "max_deductible_elb": null,
                            "name": "30G/1\u4e2a\u6708",
                            "price": 59.0,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u670830.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 360,
                            "describe": "",
                            "id": 9298,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 199.0,
                            "max_deductible_elb": null,
                            "name": "3G*12\u4e2a\u6708",
                            "price": 99.0,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u67083.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "30G\u4e00\u4e2a\u6708\uff0c\u6bcf\u670826\u53f724\u70b9\u6e05\u96f6",
                            "id": 9288,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 139.0,
                            "max_deductible_elb": null,
                            "name": "30G/1\u4e2a\u6708",
                            "price": 59.0,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u670830.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 360,
                            "describe": "",
                            "id": 9298,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 199.0,
                            "max_deductible_elb": null,
                            "name": "3G*12\u4e2a\u6708",
                            "price": 99.0,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u67083.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "30G\u4e00\u4e2a\u6708\uff0c\u6bcf\u670826\u53f724\u70b9\u6e05\u96f6",
                            "id": 9288,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 139.0,
                            "max_deductible_elb": null,
                            "name": "30G/1\u4e2a\u6708",
                            "price": 59.0,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u670830.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 360,
                            "describe": "",
                            "id": 9298,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 199.0,
                            "max_deductible_elb": null,
                            "name": "3G*12\u4e2a\u6708",
                            "price": 99.0,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u67083.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": -1,
                            "type": 1
                        },
                    ],
                    "1": [
                        {
                            "card_source": 16,
                            "day": 90,
                            "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a3\u4e2a\u6708\uff0c527GB/\u6bcf\u6708(51G\u9ad8\u901f+476G\u4e2d\u901f)\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                            "id": 6294,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 398.0,
                            "max_deductible_elb": null,
                            "name": "527G*3\u4e2a\u6708",
                            "price": 298.0,
                            "remark": "\u6709\u6548\u671f90\u5929,\u6bcf\u6708527.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 180,
                            "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a6\u4e2a\u6708\uff0c527GB/\u6bcf\u6708(51G\u9ad8\u901f+476G\u4e2d\u901f)\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                            "id": 6295,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 598.0,
                            "max_deductible_elb": null,
                            "name": "527G*6\u4e2a\u6708",
                            "price": 498.0,
                            "remark": "\u6709\u6548\u671f180\u5929,\u6bcf\u6708527.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 360,
                            "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a12\u4e2a\u6708\uff0c527GB/\u6bcf\u6708(51G\u9ad8\u901f+476G\u4e2d\u901f)\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                            "id": 6296,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 1398.0,
                            "max_deductible_elb": null,
                            "name": "527G*12\u4e2a\u6708",
                            "price": 698.0,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u6708527.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 1080,
                            "describe": "500G\u4e00\u4e2a\u6708,50G\u9ad8\u901f\u7f51\u7edc,450G\u4e2d\u901f\u7f51\u7edc,\u6bcf\u670826\u65e5\u6e05\u96f6",
                            "id": 9296,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 1999.0,
                            "max_deductible_elb": null,
                            "name": "VIP 500G x 36\u4e2a\u6708",
                            "price": 1298.0,
                            "remark": "\u6709\u6548\u671f1080\u5929,\u6bcf\u6708500.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        }
                    ],
                    "2": [
                        {
                            "card_source": 16,
                            "day": 30,
                            "describe": "100GB/1\u4e2a\u6708\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                            "id": 9295,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 400.0,
                            "max_deductible_elb": null,
                            "name": "100GB/1\u4e2a\u6708",
                            "price": 198.0,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u6708100.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 360,
                            "describe": "",
                            "id": 9301,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 299.0,
                            "max_deductible_elb": null,
                            "name": "12G*12\u4e2a\u6708",
                            "price": 199.0,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u670812.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                        {
                            "card_source": 16,
                            "day": 180,
                            "describe": "30G\u4e00\u4e2a\u6708\uff0c\u6bcf\u670826\u53f724\u70b9\u6e05\u96f6",
                            "id": 9291,
                            "is_elb_deductible": 0,
                            "is_recommend": false,
                            "market_price": 459.0,
                            "max_deductible_elb": null,
                            "name": "30G/6\u4e2a\u6708",
                            "price": 259.0,
                            "remark": "\u6709\u6548\u671f180\u5929,\u6bcf\u670830.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "surplus_times": "False",
                            "type": 1
                        },
                    ]
                }
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]:Toast,
        },
        created() {
            //处理套餐数据
            for (let i in this.mock_list) {
                if (this.mock_list[i]) {
                    this.plan_type.push(i);
                    if (i == 0) {
                        this.plan_type_name.push('累计套餐');
                    }
                    if (i == 1) {
                        this.plan_type_name.push('月套餐');
                    }
                    if (i == 2) {
                        this.plan_type_name.push('加油包');
                    }
                }
            }

        },
        mounted() {
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.vanSwiperWwrap.style.maxHeight = (clientHeight - 146) + 'px';

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

