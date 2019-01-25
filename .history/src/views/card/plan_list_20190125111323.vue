<template>
    <div class="plan-wrap">
        <div ref="refPLanTitle" class="plan-type-wrap">
            <div class="plan-type-inner-wrap">
                <span
                        ref="ref_plan_type"
                        @click="planTypeClikc(index)"
                        v-for="(item,index) in plan_type_name"
                        :class="{'active_type':index==cur_plan_type_index}">{{item}}</span>
            </div>
        </div>
        <div class="van-swipe-wrap" ref="vanSwiperWwrap">
            <van-swipe ref="swiperVant" :show-indicators="false" @change="swiperOnChange">
                <van-swipe-item v-for="(item,index) in plan_type" :key="item">
                    <ul class="plan-list-wrap">
                        <li @click="choosePlanClick(inner_index)"
                            v-for="(inner_item,inner_index) in plan_list[item]"
                            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
                            <div class="plan-info-wrap">
                                <p class="plan-name">{{ inner_item.name }}</p>
                                <p class="plan-limited-wrap">
                                    <span class="limited-num"
                                          v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
                                    <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}个ELB</span>
                                </p>
                                <p class="plan-desc">
                                    {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''
                                    }}
                                </p>
                            </div>
                            <div class="plan-price-wrap">
                                <p class="plan-price">￥{{ inner_item.price }}</p>
                                <del class="plan-origin-price">￥{{ inner_item.market_price }}</del>
                            </div>
                            <span class="plan-selected"></span>
                            <!--选中状态-->
                            <span class="icon-sell-done"
                                  v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span>
                            <!--售罄-->
                        </li>
                    </ul>
                </van-swipe-item>
            </van-swipe>
        </div>

        <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
            <button @click="recharge">充值</button>
        </div>

        <van-popup :close-on-click-overlay="false" v-model="load_plan_list">
            <p class="showTip">{{load_plan_msg}}</p>
        </van-popup>
    </div>
</template>

<style lang="less">
    html,
    body,
    #app {
        height: 100%;
    }

    @import "../../assets/less/common";

    .plan-wrap {
        height: calc(100% - 44px);
        .van-swipe {
            height: 100%;
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
            height: 100%;
            overflow-y: auto;
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
                    font-size: 24px;
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
                &.plan-sell-done {
                    background-color: #f0f0f0;
                    .plan-name,
                    .plan-price {
                        color: #868686;
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
                        content: "已售罄";
                    }
                }
            }
        }

        .btn-recharge-wrap {
            padding: 40px 32px;
            &.noDataHide{
                display: none;
            }
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
    import {Swipe, SwipeItem, Toast, Popup} from "vant";
    import {setStorage, getStorage, checkBrowser} from "../../utilies";
    import {_get} from "../../http";
    import {Notify} from "vant";
    // @ is an alias to /src
    export default {
        name: "home",

        data() {
            return {
                client_type:checkBrowser(),
                moth_plan: null,
                accumulated_plan: null,
                speedup_plan: null,
                load_plan_list: true,
                load_plan_msg: "正在加载套餐中,请等候",
                plan_type: [],
                plan_type_name: [],
                cur_plan_type_index: 0, //当前选中套餐类型
                choose_plan_index: 0, //当前选中套餐
                plan_list: {},
                ref_plan_type: null
            };
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [Popup.name]: Popup
        },
        created() {
            //处理套餐数据
            _get("/releaseApi/v1/app/plan_list", {
                iccid: getStorage("check_iccid")
            }).then(res => {
                if (res.state == 1) {

                    if (JSON.stringify(res.data) == '{}') {

                        this.load_plan_list = true;
                        this.load_plan_msg = '此卡暂无套餐'
                        return
                    }

                    this.load_plan_list = false;
                    this.plan_list = res.data;

                    for (let i in this.plan_list) {
                        if (this.plan_list[i]) {
                            this.plan_type.push(i);
                            if (i == 0) {
                                this.plan_type_name.push("累计套餐");
                            }
                            if (i == 1) {
                                this.plan_type_name.push("月套餐");
                                this.isPlanMonth = true;
                            }
                            if (i == 2) {
                                this.plan_type_name.push("加油包");
                            }
                        }
                    }

                    if (
                        this.plan_type_name.length > 1 &&
                        this.plan_type_name[0] != "月套餐"
                    ) {
                        this.cur_plan_type_index = 1;
                        this.$refs.swiperVant.swipeTo(1);
                    }

                    let _this = this;
                    this.$nextTick(()=>{
                        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                            refPLanTitle = _this.$refs.refPLanTitle.offsetHeight,
                            refPlanButton =  _this.$refs.refPlanButton.offsetHeight;
                        if(_this.client_type == 'wechat' || _this.client_type == 'alipay'){
                            _this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPLanTitle - refPlanButton - 44)+'px'
                        }else{
                            _this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPLanTitle - refPlanButton)+'px'
                        }
                    })

                } else {
                    this.load_plan_msg = res.msg;
                }
            });
        },
        mounted() {},
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
                this.choose_plan_index = index;
            },
            recharge: function () {
                let planInfo = null,
                    ref_plan_type_index = 0;//当前套餐索引
                for (let i = 0; i < this.$refs.ref_plan_type.length; i++) {
                    if (this.$refs.ref_plan_type[i].className == "active_type") {
                        if (this.$refs.ref_plan_type[i].innerText == "累计套餐") {
                            ref_plan_type_index = 0;
                        } else if (this.$refs.ref_plan_type[i].innerText == "月套餐") {
                            ref_plan_type_index = 1;
                        } else if (this.$refs.ref_plan_type[i].innerText == "加油包") {
                            ref_plan_type_index = 2;
                        }
                        break;
                    }
                }

                planInfo = this.plan_list[ref_plan_type_index][this.choose_plan_index];

                if (planInfo.surplus_times <= 0) {
                    Toast("此套餐已售罄, 请更换套餐");
                    return;
                }
                if(planInfo.is_can_renew==0){
                    delete planInfo.first_price;
                    delete 
                }
                planInfo.iccid = getStorage("check_iccid");

                setStorage("planInfo", planInfo, "obj");

                //获取当前包月套餐信息
                _get("/api/v1/app/plans/renew_info", {
                    user_id: getStorage("userInfo", "obj").account.user_id,
                    rating_id: planInfo.id
                }).then(res => {
                    if (res.state == 1) {
                        setStorage("monthlyMsg", res.data, "obj");
                        this.$router.push({path: "/weixin/recharge"});

                    } else {
                        Notify({message: res.msg});
                    }
                });
            }
        }
    };
</script>

