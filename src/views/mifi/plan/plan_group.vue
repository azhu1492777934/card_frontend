<template>
    <div class="plan-group-wrapper">
        <div ref="btnChoosePlan" @click="showPLanDetail" class="btn-choose-plan-wrap">
            <div>
                <span>请选择套餐</span>
                <span>=</span>
            </div>
        </div>

        <div ref="planList" class="group-list-wrap">

            <ul v-if="JSON.stringify(group_list)!='[]'"  class="plan-list-wrap">

                <li @click="choosePlanClick(inner_index)" v-for="(inner_item,inner_index) in group_list"
                    :class="{'activedPlan':inner_index==choose_plan_index,'plan-sell-done':inner_item.surplus_times!='False' && inner_item.surplus_times<=0}">
                    <div class="plan-info-wrap">
                        <p class="plan-name">
                            {{ inner_item.name }}
                        </p>
                        <p class="plan-limited-wrap">
                                    <span class="limited-num"
                                          v-show="inner_item.surplus_times!='False' && inner_item.surplus_times>0">剩{{inner_item.surplus_times}}笔</span>
                            <span class="limited-num" v-show="inner_item.is_elb_deductible!=0">可抵扣{{inner_item.max_deductible_elb}}个ELB</span>
                        </p>
                        <p class="plan-desc">
                            {{ inner_item.describe ? inner_item.describe:inner_item.remark?inner_item.remark:''}}
                        </p>
                    </div>

                    <div class="plan-price-wrap">
                        <p>￥{{ inner_item.price }}</p>
                        <p>￥{{ inner_item.market_price }}</p>
                    </div>

                    <img v-if="inner_item.is_recommend" class="recommend" src="../../../assets/imgs/mifi/plan_group/icon_recommend.png" alt=""><!--推荐-->
                    <span class="icon-sell-done" v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span><!--售罄-->
                </li>
            </ul>

            <div v-if="showNoData">
                <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="">
            </div>

        </div>

        <div ref="btnRechargeWrap" class="btn-recharge-wrap" >
            <button :class="{'noDataHide':JSON.stringify(group_list) == '[]'}" @click="recharge">前往充值</button>
        </div>

        <van-popup
            v-model="picker.showPlanSelect"
            position="bottom"
            :overlay="true"
            :lock-scroll="true"
            :lazy-render="true"
            :close-on-click-overlay="true"
            :loading="picker.loading">
            <van-picker ref="picker" show-toolbar title="套餐选择" :columns="columns" @confirm="handleConfirm" @cancel="handleCancel"/>
        </van-popup><!--套餐喧闹着-->

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {_get} from "../../../http";
    import {getStorage, setStorage,checkBrowser} from "../../../utilies";
    import {Popup, Picker,List,Toast} from 'vant'

    export default {
        name: "plan_group",
        data() {
            return {
                client_type:checkBrowser(),
                showNoData: false,
                iccid: getStorage('check_iccid'),
                group_list: [],
                choose_plan_index: 0,
                picker:{
                    showPlanSelect: false, // 套餐选择
                    loading:true,
                    choose_plan_id:'', // 当前选中的套餐组
                    choose_type:'' // 当前选中的套餐类型
                },
                scroll:null,
                columns: [
                    {
                        values:[],//套餐组
                    }, {
                        values: [
                            {
                                'keyId': 0,
                                'text': '全部'
                            }, {
                                'keyId': '0',
                                'text': '累计套餐',
                            }, {
                                'keyId': '1',
                                'text': '月套餐',
                            }
                        ]
                    }
                ],
            }
        },
        components: {
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [List.name]: List,
            [Toast.name]: Toast
        },
        created() {
            this.iccid ? this.initial({}) : this.$router.push({path:'/mifi/card/lookup'});
        },
        methods: {
            initial(params){
                this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
                this.$store.commit('mifiCommon/changeErrStatus', {show: false});
                _get('/api/v1/app/plan_group_list/and_plan_list',{
                    iccid: this.iccid,
                    plan_group_id: params.plan_group_id ?  params.plan_group_id : null,
                    type: params.type ? params.type : null,
                }).then(res=>{
                    this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
                    this.picker.loading = false;
                    if(res.state === 1){
                        if(res.data.plan_group_list.length){
                            res.data.plan_group_list.map((item,index)=>{
                                this.columns[0].values.push({
                                    'keyId':item.plan_group_id,
                                    'text':item.plan_group_name
                                })
                            });
                            this.group_list = res.data.plan_list;
                            res.data.plan_list.length ? this.showNoData = false : this.showNoData = true;
                            this.$nextTick(()=>{
                                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                                    refBanner = this.$refs.btnChoosePlan.offsetHeight,
                                    refTitle = this.$refs.btnRechargeWrap.offsetHeight;
                                this.$refs.planList.style.height = (clientHeight - refBanner - refTitle) + 'px'

                                if(!this.scroll){
                                    this.scroll = new BScroll(this.$refs.planList,{
                                        click:true
                                    });
                                }else{
                                    this.scroll.refresh();
                                }


                            });
                        }else{
                            this.$store.commit('mifiCommon/changeErrStatus',{
                                show:true,
                                errorMsg:res.msg ?res.msg:'此卡暂无套餐数据'
                            })
                        }
                    }else{
                        this.$store.commit('mifiCommon/changeErrStatus',{
                            show:true,
                            errorMsg:res.msg ?res.msg:'获取数据失败，请稍后再试'
                        })
                    }
                })
            }, // 获取套餐组数据
            choosePlanClick: function (index) {
                this.choose_plan_index = index;
            },
            showPLanDetail() {
                this.picker.showPlanSelect = true;

                if(this.picker.choose_plan_id){
                    this.$nextTick(()=>{
                        this.$refs.picker.setColumnValue(0,this.picker.choose_plan_id);
                        this.$refs.picker.setColumnValue(1,this.picker.choose_type);
                    });
                }else{
                    this.$nextTick(()=>{
                        this.$refs.picker.setColumnIndex(0,0);
                        this.$refs.picker.setColumnIndex(1,0);
                    });
                }
            },
            handleConfirm(value) {
                this.picker.choose_plan_id = value[0].keyId;
                this.picker.choose_type = value[1].keyId;
                this.picker.showPlanSelect = false;
                this.initial({
                    plan_group_id: this.picker.choose_plan_id,
                    type: this.picker.choose_type,
                });
            },
            handleCancel(){
                this.picker.showPlanSelect = false;
            },
            recharge(){
                let planInfo = null,
                    _this = this,
                    cur_date = new Date().getDate();

                planInfo = this.group_list[this.choose_plan_index];

                if (planInfo.surplus_times <= 0) {
                    Toast({
                        message: "此套餐已售罄, 请更换套餐",
                        position: 'top',
                    });
                    return;
                }

                planInfo.iccid = getStorage("check_iccid");
                setStorage("planInfo", planInfo, "obj");

                if (this.client_type !== 'alipay' && this.client_type !== 'wechat') {
                    Toast({
                        message: '请在微信或支付宝客服端打开充值',
                        position: 'top'
                    });
                    return
                }


                if(planInfo.type==1 && planInfo.day <=30 && cur_date>=20 && cur_date <=26 ){

                    Dialog.confirm({
                        title: '温馨提示',
                        message: '您购买的套餐将在本月26号清零，为避免套餐短期内失效请在充值页手动选择套餐生效时间（范围：本月27号及以后时间）。'
                    }).then(() => {
                        _this.toRechargeList(planInfo);
                    }).catch(()=>{
                        return
                    })

                }else{
                    this.toRechargeList(planInfo)
                }

            },
            toRechargeList(planInfo){
                if(!getStorage("userInfo", "obj")){
                    Toast({
                        message: '您的用户信息丢失了',
                        position: 'top'
                    });
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
            },
        }
    }
</script>

<style lang="less">
    .plan-group-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .btn-choose-plan-wrap{
            width: 70%;
            margin: 0 auto;
            padding: 25px 0;
            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 30px;
                font-size: 28px;
                color: #fffbf3;
                background-image: linear-gradient( 45deg, #f0b546 10%, #fdd47a 100%);
                border-radius: 30px;
            }
        }
        .group-list-wrap{
            overflow: hidden;
        }
        .plan-list-wrap {
            /*height: 100%;*/
            /*overflow: auto;*/
            /*-webkit-overflow-scrolling: touch;*/
            li {
                position: relative;
                display: flex;
                align-items: center;
                padding: 33px 54px;
                border-bottom: 1px solid #efece6;
                background-size: cover;
                box-sizing: border-box;
                img.recommend{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 92px;
                    height: 92px;
                }
                //套餐信息
                .plan-info-wrap {
                    flex: 4;
                    box-sizing: border-box;
                    text-align: left;
                    font-size: 24px;
                    .plan-name {
                        padding: 0 0 30px;
                        font-size: 34px;
                        color: #2c251d;
                        font-weight: 500;
                    }
                    .plan-icon-recommend{
                        padding: 20px 0 20px 60px;
                    }
                    .icon-recommend{
                        position: absolute;
                        top: 5px;
                        left: 40px;
                        font-size: 60px;
                    }
                    .plan-limited-wrap {
                        .limited-num {
                            display: inline-block;
                            padding: 4px 20px;
                            margin: 0 5px 10px 0;
                            font-size: 20px;
                            color: #ffa400;
                            background-color: #fff;
                            border-radius: 4px;
                            line-height: 1.2;
                        }
                    }
                    .plan-desc {
                        max-width: 502px;
                        letter-spacing: 1px;
                        line-height: 1.3;
                        color: #868686;
                        font-size: 24px;
                        word-break: break-all;
                    }
                }
                .plan-price-wrap {
                    flex: 1.5;
                    text-align: right;
                    p{
                        &:first-child{
                            font-size: 46px;
                            color: #fd720d;
                        }
                        &:last-child{
                            font-size: 24px;
                            color: #868686;
                            text-decoration: line-through;
                        }
                    }
                }

                //当前选中样式
                &.activedPlan {
                    background-image: url("../../../assets/imgs/mifi/plan_group/bg_test.png");
                    p{color: #533606 !important;}
                    .plan-price-wrap{
                        p{
                            &:first-child{
                                color: #fd720d !important;
                            }
                        }
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
            padding: 40px 0;
            height: 80px;
            button {
                &.noDataHide {
                    display: none;
                }
                width: 565px;
                height: 80px;
                color: #443f37;
                font-size: 36px;
                border-radius: 80px;
                background-image: linear-gradient( 45deg, #f0b546 10%, #fdd47a 100%);
            }
        }
    }

</style>