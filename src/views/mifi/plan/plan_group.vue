<template>
    <div class="plan-group-wrapper">

        <div ref="refPLanTitle" class="plan-type-wrap" >
            <div class="plan-type-inner-wrap">
                <span
                    ref="ref_plan_type"
                    @click="handleConfirm(item)"
                    v-for="(item,index) in columns[0].values" v-bind:key="index"
                    :class="{'active_type':item.keyId==cur_plan_type_index}"  >{{item.text}}
                </span>
            </div>
        </div>
        <!-- <div ref="btnChoosePlan" @click="showPLanDetail" class="btn-choose-plan-wrap">
            <div>
                <span>{{cur_plan_group_name}}</span>
                <span>=</span>
            </div>
        </div> -->

        <div ref="planList" class="group-list-wrap">

            <ul v-show="JSON.stringify(group_list)!='[]'" class="plan-list-wrap"  id="plan-list-wrap" ref="innerPlanList">

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

                    <img v-if="inner_item.is_recommend" class="recommend"
                         src="../../../assets/imgs/mifi/plan_group/icon_recommend.png" alt=""><!--推荐-->
                    <span class="icon-sell-done"
                          v-show="inner_item.surplus_times!='False' && inner_item.surplus_times<=0"></span><!--售罄-->


                    <span v-if="inner_item.vip_type_id!=0"   class="youku"></span>   <!--优酷活动-->
                </li>
            </ul>

            <div v-if="showNoData">
                <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="">
            </div>

        </div>

        <div ref="btnRechargeWrap" class="btn-recharge-wrap">
            <button :class="{'noDataHide':JSON.stringify(group_list) == '[]'}" @click="recharge">前往充值</button>
        </div>

        <van-popup :close-on-click-overlay="false" v-model="rechargeShow">
            <p class="showTip">创建订单中,请等候</p>
        </van-popup><!--创建订单-->

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

        <van-popup :close-on-click-overlay="false" v-model="appPay.show" class="border-radius-10">
            <div class="appContext-pay-wrap">
                <div class="title">
                    支付方式选择
                </div>
                <div class="content">
                    <p @click="changePayType(1)" :class="{'choose_type':appPay.type}">微信支付</p>
                    <p @click="changePayType(0)" :class="{'choose_type':!appPay.type}">支付宝支付</p>
                </div>
                <div class="footer">
                    <button @click="closePayType">取消</button>
                    <button @click="FinalAppPay">确定</button>
                </div>
            </div>
        </van-popup><!--app支付选择-->

    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {_get} from "../../../http";
    import {getStorage, setStorage, checkBrowser} from "../../../utilies";
    import {Popup, Picker, List, Toast,Notify,Dialog} from 'vant'
    import {_post} from "../../../http";

    export default {
        name: "plan_group",
        data() {
            return {
                rechargeShow: false,
                appPay: {
                    show: false,
                    type: true,//true 为微信，false 为支付宝
                },
                cur_plan_group_name: '请选择套餐',
                client_type: checkBrowser(),
                showNoData: false,
                iccid: getStorage('check_iccid'),
                group_list: [],
                choose_plan_index: 0,
                picker: {
                    showPlanSelect: false, // 套餐选择
                    loading: true,
                    choose_plan_id: '', // 当前选中的套餐组
                    choose_type: '' // 当前选中的套餐类型
                },
                scroll: null,
                columns: [
                    {
                        values: [],//套餐组
                    },
                    // {
                    //     values: [
                    //         {
                    //             'keyId': 0,
                    //             'text': '全部'
                    //         }
                    //         , {
                    //             'keyId': '0',
                    //             'text': '累计套餐',
                    //         }, {
                    //             'keyId': '1',
                    //             'text': '月套餐',
                    //         }
                    //     ]
                    // }
                ],
                planName:["累计套餐","包月套餐","加油包","加速包","国际套餐","周期性套餐","超量自动充值套餐"],
                totalPlan:[],
                cur_plan_type_index:0,
                scrollTop:0
            }
        },
        components: {
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [List.name]: List,
            [Toast.name]: Toast,
            [Dialog.name]:Dialog,
        },
        created() {
            this.iccid ? this.initial({}) : this.$router.push({path: '/mifi/card/lookup'});
        },
        methods: {
            initial(params) {
                this.$store.commit('mifiCommon/changeLoadingStatus', {flag: true});
                this.$store.commit('mifiCommon/changeErrStatus', {show: false});
                this.choose_plan_index = 0;
                _get('/api/v1/app/plan_list', {
                    iccid: this.iccid,
                    // plan_group_id: params.plan_group_id ? params.plan_group_id : null,
                    // type: params.type ? params.type : null,
                }).then(res => {
                    this.$store.commit('mifiCommon/changeLoadingStatus', {flag: false});
                    this.picker.loading = false;
                    if (res.state === 1) {
                        if (JSON.stringify(res.data) !== "{}") {
                            // res.data.map((item, index) => {
                            //     console.log(item);
                            //     this.columns[0].values.push({
                            //         'keyId': item.plan_group_id,
                            //         'text': item.plan_group_name
                            //     })
                            // });
                           

                            // this.group_list = res.data.plan_list;
                            // console.log(this.group_list);
                            // console.log(this.columns);

                           


                            this.totalPlan=res.data;
                            for (let item in this.totalPlan) {
                                let newArray1 = [], newArray2 = [], newArray3 = [];
                                for (let i = 0; i < this.totalPlan[item].length; i++) {
                                  //区分推荐/未推荐
                                  if (this.totalPlan[item][i].is_recommend === true) {
                                    newArray1.push(this.totalPlan[item][i]);
                                  } else {
                                    newArray2.push(this.totalPlan[item][i]);
                                  }
                                }
                                //分别进行排序
                                newArray1.sort(this.compare2("price"));
                                newArray2.sort(this.compare2("price"));
                                newArray3 = newArray1.concat(newArray2);
                                this.totalPlan[item] = newArray3;
                              }

                            for (let item in this.totalPlan) {
                                this.columns[0].values.push({
                                    'keyId': item,
                                    'text': this.planName[item]
                                })
                            }
                            if (this.columns[0].values.length > 0) {
                                if (this.cur_plan_group_name === '请选择套餐') {
                                    this.cur_plan_group_name = this.columns[0].values[0].text;
                                }
                            };

                             this.$nextTick(() => {
                                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                                    refBanner = this.$refs.refPLanTitle.offsetHeight,
                                    refTitle = this.$refs.btnRechargeWrap.offsetHeight;
                                   
                                this.$refs.planList.style.height = (clientHeight-refBanner  - refTitle) + 'px'

                                // if (!this.scroll) {
                                //     this.scroll = new BScroll(this.$refs.planList, {
                                //         click: true
                                //     });
                                // } else {
                                //     this.scroll.refresh();
                                // }


                            });


                            for(let i in this.totalPlan){
                               this.group_list = this.totalPlan[i];
                                this.group_list.length ? this.showNoData = false : this.showNoData = true;
                                this.cur_plan_type_index=i;
                               return this.group_list;
                            }  

                        } else {
                            this.$store.commit('mifiCommon/changeErrStatus', {
                                show: true,
                                errorMsg: res.msg ? res.msg : '此卡暂无套餐数据'
                            })
                        }
                    } else {
                        this.$store.commit('mifiCommon/changeErrStatus', {
                            show: true,
                            errorMsg: res.msg ? res.msg : '获取数据失败，请稍后再试'
                        })
                    }
                })
            }, // 获取套餐组数据
            choosePlanClick: function (index) {
                this.choose_plan_index = index;
            },
            showPLanDetail() {
                this.picker.showPlanSelect = true;

                if (this.picker.choose_plan_id) {
                    this.$nextTick(() => {
                        this.$refs.picker.setColumnValue(0, this.picker.choose_plan_id);
                        this.$refs.picker.setColumnValue(1, this.picker.choose_type);
                    });
                } else {
                    this.$nextTick(() => {
                        this.$refs.picker.setColumnIndex(0, 0);
                        this.$refs.picker.setColumnIndex(1, 0);
                    });
                }
            },
            handleConfirm(value) {
                let _this=this;
                // this.picker.choose_plan_id = value[0].keyId;
                this.picker.choose_plan_id=value.keyId;
                this.cur_plan_type_index=value.keyId;
                this.choose_plan_index=0;
                // this.picker.choose_type = value[1].keyId;
                this.picker.showPlanSelect = false;
                // this.cur_plan_group_name = value[0].text;
                this.cur_plan_group_name = value.text;
                this.group_list=this.totalPlan[this.picker.choose_plan_id ];
                this.backTop();
                
            },
            backTop () {
                const that = this
                //  this.scrollTop = this.$refs.innerPlanList.scrollTop;
                let timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5);
                    that.$refs.innerPlanList.scrollTop = that.scrollTop + ispeed;
                    if (that.scrollTop == 0) {
                      clearInterval(timer)
                    }
                }, 16)

            },
            handleCancel() {
                this.picker.showPlanSelect = false;
            },
            recharge() {
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

                if (!getStorage("userInfo", "obj")) {
                    Toast({
                        message: '请在微信或支付宝客服端打开充值',
                        position: 'top'
                    });
                    return
                }

                if (planInfo.type == 1 && planInfo.day <= 30 && cur_date >= 20 && cur_date <= 26 ) {

                    Dialog.confirm({
                        title: '温馨提示',
                        message: '您购买的套餐将在本月26号清零。'
                    }).then(() => {
                        _this.toRechargeList(planInfo);
                    })

                } else {
                    this.toRechargeList(planInfo)
                }
            },
            getToday: function (val) {
                let date = new Date();
                if (val) {
                    date = new Date(val);
                }
                let year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate();
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                return year + '-' + month + '-' + day
            },
            changePayType(type) {
                if (type) {
                    this.appPay.type = true
                } else {
                    this.appPay.type = false
                }
            },
            closePayType() {
                this.appPay.type = true;
                this.appPay.show = false
            },
            FinalAppPay() {
                let planInfo = getStorage('userInfo','obj');
                this.toRechargeList(planInfo);
            },//app支付
            toRechargeList(planInfo) {
                let userInfo = getStorage('userInfo', 'obj');
                // if (userInfo.account.balance > 0) {
                //     _get("/api/v1/app/plans/renew_info", {
                //         user_id: getStorage("userInfo", "obj").account.user_id,
                //         rating_id: planInfo.id
                //     }).then(res => {
                //         if (res.state == 1) {
                //             setStorage("monthlyMsg", res.data, "obj");
                //             this.$router.push({path: "/weixin/recharge/index"});
                //         } else {
                //             Notify({message: res.msg});
                //         }
                //     });  //获取当前包月套餐信息
                // } else {
                    let param = {
                        status: 0,
                        iccid: this.iccid,
                        rating_id: planInfo.id,
                        price: planInfo.price,
                        recharge_price: planInfo.price,
                        user_id: userInfo.account.user_id,
                        env: this.client_type,
                        start_time: this.getToday(),
                        type: 1,
                    }

                    if (this.client_type === 'alipay' || this.client_type === 'wechat') {
                        param.open_id = getStorage('decrypt_data', 'obj').openid;
                    } else if (this.client_type === 'app') {
                        param.open_id = userInfo.account.user_id
                    }

                    if (this.client_type === 'wechat') {
                        param.pay_type = 'WEIXIN'
                    } else if (this.client_type === 'alipay') {
                        param.pay_type = 'ALIPAY'
                    }
                    this.global_variables.packed_project === 'mifi' ? param.recharge_type = 1 : param.recharge_type = 0;
                    this.rechargeShow = false;

                    _post('/api/v1/pay/weixin/create', param)
                        .then(res => {
                            if (res.state == 1) {
                                this.rechargeShow = false;

                                if (/<[^>]+>/.test(res.data)) {

                                    document.write(res.data);

                                } else if (res.data && Object.prototype.toString.call(res.data) == '[object String]' && res.data.substr(0, 4) == 'http') { //app
                                    this.global_variables.packed_project === 'mifi' ?
                                        location.href = `${this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data;
                                } else {
                                    Notify({
                                        message: '充值成功',
                                        background: '#60ce53'
                                    })

                                    setTimeout(function () {
                                        if (localStorage.getItem("currentType") == "esim") {
                                            location.href = `${_this.global_variables.authorized_redirect_url}/weixin/card/esim_usage`;
                                        } else {
                                            _this.global_variables.packed_project === 'mifi' ?
                                                location.href = `${_this.global_variables.authorized_redirect_url}/mifi/card/index` : location.href = res.data.return_url
                                        }

                                    }, 1500);
                                }//纯钻石支付
                            } else {
                                this.rechargeShow = false;
                                Notify({
                                    message: res.msg
                                })
                            }
                        })
                // }
            },
            compare2(pro) {
              return function (obj1, obj2) {
                let val1 = obj1[pro];
                let val2 = obj2[pro];
                if (val1 > val2) {
                  return 1;
                } else if (val1 < val2) {
                  return -1;
                } else {
                  return 0;
                }

              }
            },
            handleScroll(){
                this.scrollTop=this.$refs.innerPlanList.scrollTop;
            }
        },
        mounted(){
            document.getElementById("plan-list-wrap").addEventListener('scroll', this.handleScroll);
        },
        destroyed(){
            document.getElementById("plan-list-wrap").removeEventListener('scroll', this.handleScroll);

        }
    }
</script>

<style lang="less">
    .plan-group-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .plan-type-wrap {
            // display: flex;
            // justify-content: center;
            // align-items: center;
            width:100%;
            white-space: nowrap;
            background:#353335;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-perspective: 1000;
            -webkit-overflow-scrolling: touch;
            box-shadow:0 -3px 46px 0 rgba(255,137,11,0.21);
            height:86px;
            line-height:86px;
            z-index:999;
            .plan-type-inner-wrap {
                width:100%;
                >span:last-child{
                    border:none !important;
                }
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
                  border-right:1px solid #fff;
                &.active_type {
                    font-family:SourceHanSansSC-Bold;
                    font-weight:bold;
                    color:rgba(250,178,20,1);
                    position:relative;
                    // &:after{
                    //   content:"";
                    //   display:inline-block;
                    //   width:125px;
                    //   height:24px;
                    //   background:url("../../../assets/imgs/mifi/plan_group/currentStatus.png")no-repeat;
                    //   background-size:100% 100%;
                    //   position:absolute;
                    //   left:50%;
                    //   margin-left:-62.5px;
                    //   bottom:-37px;
                    // }
                }
            }
           
        }


        .btn-choose-plan-wrap {
            width: 70%;
            margin: 0 auto;
            padding: 25px 0;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 30px;
                font-size: 28px;
                color: #fffbf3;
                background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
                border-radius: 30px;
            }
        }
        .group-list-wrap {
            overflow: hidden;
            // padding-top:20px;
        }
        .plan-list-wrap {
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            li {
                position: relative;
                display: flex;
                align-items: center;
                padding: 33px 54px;
                border-bottom: 1px solid #efece6;
                background-size: cover;
                box-sizing: border-box;
                img.recommend {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 92px;
                    height: 92px;
                }
                .youku{
                    display:inline-block;
                    width:137px;
                    height:48px;
                    background:url("../../../assets/imgs/mifi/plan_group/youku.png")no-repeat;
                    background-size:100% 100%;
                    position:absolute;
                    right:37px;
                    top:12px;
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
                    .plan-icon-recommend {
                        padding: 20px 0 20px 60px;
                    }
                    .icon-recommend {
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
                    p {
                        &:first-child {
                            font-size: 46px;
                            color: #fd720d;
                        }
                        &:last-child {
                            font-size: 24px;
                            color: #868686;
                            text-decoration: line-through;
                        }
                    }
                }

                //当前选中样式
                &.activedPlan {
                    background-image: url("../../../assets/imgs/mifi/plan_group/bg_test.png");
                    p {
                        color: #533606 !important;
                    }
                    .plan-price-wrap {
                        p {
                            &:first-child {
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
                background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
            }
        }
    }

</style>