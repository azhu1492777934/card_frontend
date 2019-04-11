<template>
    <div class="plan-wrap">
        <div ref="refPLanTitle" class="plan-type-wrap">
            <div class="plan-type-inner-wrap">
                <span
                    ref="ref_plan_type"
                    @click="planTypeClikc(index)"
                    v-for="(item,index) in plan_type_name"
                    :class="{'active_type':index==cur_plan_type_index}">{{item}}
                </span>
            </div>
        </div>
        <div class="van-swipe-wrap" ref="vanSwiperWwrap">
            <swiper ref="swiperVant" :options="swiperOption">
                <swiper-slide v-for="(item,index) in plan_type" :key="item" :class="item">
                    <ul class="plan-list-wrap">
                        <li @click="choosePlanClick(inner_index)"
                            v-for="(inner_item,inner_index) in plan_list[item]"
                            :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
                            <div class="plan-info-wrap">
                                <p :class="{'plan-icon-recommend':inner_item.is_recommend}" class="plan-name">
                                    <!-- <span v-if="inner_item.is_recommend" class="iconfont icon-recommend"></span> -->
                                    {{ inner_item.name }}
                                </p>
                                <div class="plan-split"></div>
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
                                <div :class="{'cumulative':inner_item.type==0,'zeroClear':inner_item.type==1,'refueling':inner_item.type==2}">
                                    <span v-if="inner_item.type==0">累计</span>
                                    <span v-if="inner_item.type==1">清零</span>
                                    <span v-if="inner_item.type==2">加油包</span>
                                </div>
                                <p class="plan-price">￥{{ inner_item.price }}</p>
                                <del class="plan-origin-price">￥{{ inner_item.market_price }}</del>
                            </div>
                            <span class="plan-selected"></span>
                            <!--选中状态-->
                            <span class="icon-sell-done"
                                  v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span>
                            <!--售罄-->
                        </li>
                        <li v-if="plan_list[item].length==0" >暂无套餐数据</li>
                    </ul>
                </swiper-slide>
            </swiper>
        </div>


        <div ref="refWarnMsg" class="warnMsg">
          <div>
            <span class="redWord">*累计</span><span>有效期内流量可跨月使用,累计不清零</span>
          </div>
          <div>
            <span class="redWord">*清零</span><span>每月26日当日流量清零,次日自动恢复</span>
          </div>
        </div>

        <div ref="refPlanButton" class="btn-recharge-wrap" :class="{'noDataHide':load_plan_list}">
            <button @click="recharge">充值</button>
        </div>

        <van-popup :close-on-click-overlay="false" v-model="load_plan_list">
            <p class="showTip">{{load_plan_msg}}</p>
        </van-popup>

        <div v-show="load_plan_msg==''" class="fixed-wrap-loading">
            <div id="loading-common-center">
                <div id="loading-common-center-inner">
                    <div class="loading-object" id="first_object"></div>
                    <div class="loading-object" id="second_object"></div>
                    <div class="loading-object" id="third_object"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="less">
    @import "~swiper/dist/css/swiper.min.css";
    @import "../../assets/less/common";
    html, body, #app {height: 100%;}
    .plan-wrap {
        .swiper-container{
            height: 100%;
        }
        .plan-type-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            background:#353335;
            box-shadow:0px -3px 46px 0px rgba(255,137,11,0.21);
            height:86px;
            .plan-type-inner-wrap {
                display:flex;
                width:100%;
            }
            
            span {
                flex:1;
                display: inline-block;
                height: 46px;
                padding: 0 50px;
                font-size: 30px;
                line-height: 50px;
                font-family:SourceHanSansSC-Regular;
                font-weight:400;
                color:rgba(138,138,138,1);
                &:nth-child(1){
                  border-right:1px solid #fff;
                }
                &.active_type {
                    font-family:SourceHanSansSC-Bold;
                    font-weight:bold;
                    color:rgba(250,178,20,1);
                    position:relative;
                    &:after{
                      content:"";
                      display:inline-block;
                      width:125px;
                      height:24px;
                      background:url("../../assets/imgs/card/esim_usage/currentStatus.png")no-repeat;
                      background-size:100% 100%;
                      position:absolute;
                      left:50%;
                      margin-left:-62.5px;
                      bottom:-37px;
                    }
                }
            }
        }
        //套餐列表
        .plan-list-wrap {
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            li {
                position: relative;
                display: flex;
                width: 90%;
                min-height: 95px;
                margin: 0 auto;
                padding: 0 15px;
                box-sizing: border-box;
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
                    box-sizing: border-box;
                    text-align: left;
                    font-size: 24px;
                    .plan-name {
                        padding: 20px 0 10px;
                        font-size: 30px;
                        color: #2c251d;
                        font-weight: 500;
                    }
                    .plan-icon-recommend{
                        padding: 20px 0 0px 0px;
                    }
                    .plan-split{
                      margin:10px 0;
                      width:70px;
                      height:4px;
                      background:#F0B546;
                    }
                    .icon-recommend{
                        position: absolute;
                        top: 5px;
                        left: 10px;
                        font-size: 60px;
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
                        font-size: 28px;
                        padding-bottom: 20px;
                    }
                }
                .plan-price-wrap {
                    flex: 1.5;
                    .cumulative,.zeroClear,.refueling{
                        width:111px;
                        height:44px;
                        text-align:right;
                        margin:0 auto;
                    }
                    .cumulative{
                        background:url("../../assets/imgs/card/esim_usage/icon1.png")no-repeat;
                        background-size:100% 100%;
                      
                    }
                    .zeroClear{
                        background:url("../../assets/imgs/card/esim_usage/icon2.png")no-repeat;
                        background-size:100% 100%;
                        
                    }
                    .refueling{
                        width:133px;
                        background:url("../../assets/imgs/card/esim_usage/icon3.png")no-repeat;        
                        background-size:100% 100%;

                    }
                    span  {
                      font-size:24px;
                      font-family:SourceHanSansSC-Medium;
                      font-weight:500;
                      color:rgba(255,255,255,1);
                      text-shadow:1px 0px 3px rgba(18,48,75,0.76);
                      line-height:44px;
                      margin-right:15px;

                    }
                    .plan-price {
                        color: #fd720d;
                        font-size: 36px;
                    }
                }

                //当前选中样式
                &.activedPlan {
                    border: 1px solid transparent;
                    background:linear-gradient(-33deg,rgba(255,235,190,1),rgba(253,212,122,1),rgba(240,181,70,1));
                    color:#533606;
                    .plan-name {
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
        .warnMsg{
          width:90%;
          text-align:left;
          margin:0 auto;
          div{
            margin:12px 0;
            .redWord{
              color:red;
              margin-right:10px;
            }
          }
        }
        .btn-recharge-wrap {
            padding: 0px 32px 40px 32px;
            &.noDataHide {
                display: none;
            }
            button {
                display: block;
                width: 406px;
                height:69px;
                padding: 20px 0;
                font-size: 32px;
                font-family:SourceHanSansSC-Regular;
                font-weight:400;
                color:rgba(68,63,56,1);
                background: linear-gradient(-33deg,rgba(253,212,122,1),rgba(240,181,70,1));
                border-radius: 35px;
                margin: 0 auto;
            }
        }
        
    }
</style>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {Toast, Popup, Notify, List} from "vant";
    import {setStorage, getStorage, checkBrowser} from "../../utilies";
    import {_get} from "../../http";
    // @ is an alias to /src
    export default {
        name: "home",

        data() {
            const _this = this;
            return {
                client_type: checkBrowser(),
                moth_plan: null,
                accumulated_plan: null,
                speedup_plan: null,
                load_plan_list: false,
                load_plan_msg: "",
                plan_type: [],
                plan_type_name: [],
                cur_plan_type_index: 0, //当前选中套餐类型
                choose_plan_index: 0, //当前选中套餐
                plan_list: {},
                ref_plan_type: null,
                swiperOption: {
                    on: {
                        slideChangeTransitionEnd: function (swiper) {
                            _this.cur_plan_type_index = this.activeIndex
                        }
                    }
                }
            };
        },
        components: {
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [List.name]: List,
            swiper,
            swiperSlide,

        },
        computed: {
            swiper() {
                return this.$refs.swiperVant.swiper
            }
        },
        created() {
            //处理套餐数据
            _get("/api/v1/app/pool/plan_list", {
                iccid: getStorage("check_iccid")
            }).then(res => {
                if (res.state == 1) {

                    if (JSON.stringify(res.data) == '{}') {

                        this.load_plan_list = true;
                        this.load_plan_msg = '此卡暂无套餐'
                        return
                    }

                    this.load_plan_msg = res.msg;

                    this.load_plan_list = false;
                    // this.plan_list = res.data;
                        this.plan_list.inland_plan_list=res.data.inland_plan_list;
                        this.plan_list.foreign_plan_list=res.data.foreign_plan_list;
                        
                    for (let i in this.plan_list) {
                        if (this.plan_list[i]) {
                            this.plan_type.push(i);
                            if (i == "inland_plan_list") {
                                this.plan_type_name.push("国内套餐");
                                this.isPlanMonth = true;
                            }
                            if (i == "foreign_plan_list") {
                                this.plan_type_name.push("国际套餐");
                            }
                            
                            
                        }
                    }

                    if (
                        this.plan_type_name.length > 1 &&
                        this.plan_type_name[0] != "月套餐"
                    ) {
                        this.cur_plan_type_index = 0;
                        this.swiper.slideTo(0, 500, false);
                    }

                    let _this = this;
                    this.$nextTick(() => {
                        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                            refPLanTitle = _this.$refs.refPLanTitle.offsetHeight,
                            refPlanButton = _this.$refs.refPlanButton.offsetHeight,
                            refWarnMsg=_this.$refs.refWarnMsg.offsetHeight;
                        if (_this.client_type == 'wechat' || _this.client_type == 'alipay') {
                            _this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPLanTitle - refPlanButton-refWarnMsg - 44) + 'px'
                        } else {
                            _this.$refs.vanSwiperWwrap.style.height = (clientHeight - refPLanTitle - refPlanButton-refWarnMsg) + 'px'
                        }
                    })

                } else {
                    this.load_plan_list = true;
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
                this.swiper.slideTo(index);
            },
            choosePlanClick: function (index) {
                this.choose_plan_index = index;
            },
            recharge: function () {
                let planInfo = null,
                    ref_plan_type_index = 0;//当前套餐索引
                for (let i = 0; i < this.$refs.ref_plan_type.length; i++) {
                    if (this.$refs.ref_plan_type[i].className == "active_type") {
                        if (this.$refs.ref_plan_type[i].innerText == "国际套餐") {
                            ref_plan_type_index = "foreign_plan_list";
                        } else if (this.$refs.ref_plan_type[i].innerText == "国内套餐") {
                            ref_plan_type_index = "inland_plan_list";
                        } 
                        break;
                    }
                }

                planInfo = this.plan_list[ref_plan_type_index][this.choose_plan_index];

                if (planInfo.surplus_times <= 0) {
                    Toast("此套餐已售罄, 请更换套餐");
                    return;
                }
               
                planInfo.iccid = getStorage("check_iccid");

                setStorage("planInfo", planInfo, "obj");

                if (!getStorage("userInfo", "obj").account.user_id) {
                    Notify({message: '请在微信或支付宝客服端打开充值'});
                    return
                }
                //获取当前包月套餐信息
                _get("/api/v1/app/plans/renew_info", {
                    user_id: getStorage("userInfo", "obj").account.user_id,
                    rating_id: planInfo.id
                }).then(res => {
                    if (res.state == 1) {
                        setStorage("monthlyMsg", res.data, "obj");
                        this.$router.push({path: "/weixin/recharge/index"});
                    } else {
                        Notify({message: res.msg});
                    }
                });
            }
        }
    };
</script>

