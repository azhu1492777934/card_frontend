<template>
    <div  class="plan-usage-wrap">
        <div v-show="!load_plan">

            <div class="card-info-wrap">
                <div class="operation-logo-wrap">
                    <img :src="filterCardInfo.operator_logo" alt="">
                </div>
                <div class="card-info-detail">
                    <p>MSISDN:{{filterCardInfo.msisdn}}</p>
                    <p>ICCID:{{usageInfo.iccid}}(编码:{{usageInfo.source}})</p>
                    <div class="card-state-wrap">
                        <div>
                            <span :class="usageInfo.auth_status>=3?'cl-state-normal':'cl-state-warning'">{{filterCardInfo.real_name_state}}</span>
                            <span v-if="filterCardInfo.device_state==''" :class="usageInfo.status>=3?'cl-state-warning':'cl-state-primary'">{{filterCardInfo.card_str_state}}</span>
                            <span :class="filterCardInfo.device_state.code==1?'cl-state-primary':'cl-state-warning'" v-if="filterCardInfo.device_state!=''">{{filterCardInfo.device_state.state}}</span>
                        </div>
                        <div>
                            <em @click="refreshOrActivated">{{filterCardInfo.refresh_actived}}</em>
                            <em>?</em>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filterCardInfo.is_flow_card" class="card-used-wrap">
                <p class="card-surplus-flow">
                    <span>剩余流量</span>
                    <span>{{this.filterCardInfo.flow_card_usage.detail_right}}</span>
                </p>
                <div class="card-flow-detail">
                    <div class="card-used-data-wrap">
                        <p>总流量:{{this.filterCardInfo.flow_card_usage.total_flow}}</p>
                        <p>已使用:{{this.filterCardInfo.flow_card_usage.used_flow}}</p>
                    </div>
                    <div class="to-flow-wrap">
                        <a> 流量用量详情> </a>
                    </div>
                </div>
            </div>
            <div v-else class="card-used-wrap">
                <p class="card-surplus-flow">
                    <span>剩余流量</span>
                    <span>{{this.filterCardInfo.watch_card_usage.detail_right}}</span>
                </p>
                <div class="card-flow-detail">
                    <div class="card-used-data-wrap">
                        <p>总流量:{{this.filterCardInfo.watch_card_usage.total_flow}} 已使用:{{this.filterCardInfo.watch_card_usage.used_flow}}</p>
                        <p>总通话:{{this.filterCardInfo.watch_card_usage.total_voice}} 已使用:{{this.filterCardInfo.watch_card_usage.used_voice}}</p>
                    </div>
                    <div class="to-flow-wrap">
                        <a href=""> 流量用量详情> </a>
                    </div>
                </div>
            </div>


            <div class="card-plan-wrap">
                <p class="card-plan-wrap-title">
                    <span @click="planTypeClikc(index)" v-for="(item,index) in plan_title_array" :class="{'checked':index==cur_plan_type_index}">{{item}}</span>
                </p>
                <div class="van-swipe-wrap">
                    <van-swipe ref="vanSwiperWwrap" :width="swiperwidth" :show-indicators="false" :loop="false" @change="swiperOnChange">
                        <van-swipe-item>
                            <ul v-if="hasUsagePlan" class="usage-plan-wrap">
                                <li v-for="(item,index) in usageInfo.usage.plans">
                                    <div class="plan-info-wrap">
                                        <p class="plan-name">{{item.name}}</p>
                                        <div class="plan-describe">
                                            <!--/*套餐描述-->
                                            <div v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
                                        <span v-if="item.describe && item.planCellInfo.key!='MG500'">
                                            {{item.describe}}
                                        </span><br>
                                                <span v-if="item.planCellInfo.max_high">
                                        高速流量:{{item.planCellInfo.max_high}},已使用{{item.planCellInfo.used_high}}
                                        </span><br>
                                                <span v-if="item.planCellInfo.max_normal">
                                        中速流量:{{item.planCellInfo.max_normal}}
                                    </span>
                                            </div>
                                            <div v-else>
                                                <p v-if="item.describe && item.describe!='None'">
                                                    <span>{{item.describe}}</span><br>
                                                    <span>{{item.remark}}</span>
                                                </p>
                                                <p v-else>
                                                    <span>{{item.remark}}</span>
                                                </p>
                                            </div>
                                            <!--\*套餐描述-->
                                        </div>
                                    </div>
                                    <div class="plan-date-wrap">
                                        <p class="plan-date" v-if="(inArray(usageInfo.source,watch_source)>=0||inArray(usageInfo.source,[1,7,8])>=0)">
                                            <span>开始日期:{{filterDate(item.activated_at)}}</span><br>
                                            <span>有效日期:{{filterDate(item.expired_at)}}</span>
                                        </p><!--手表卡-->
                                        <p class="plan-date" v-else-if="item.expired_at">
                                            <span>有效日期:{{filterDate(item.expired_at)}}</span>
                                        </p><!--流量卡-->
                                        <div class="speedup-wrap" v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
                                    <span v-if="item.planCellInfo.key!='MG500'">
                                        <a v-if="item.planCellInfo.plan_cell_status==1" :href="'/weixin/telcom/plans_80g?iccid={{usageInfo.iccid}}'">
                                            购买加速包
                                        </a>
                                    </span>
                                            <span v-else>
                                        <a v-if="item.planCellInfo.plan_cell_status==1" :href="'/weixin/telcom/plans_500g?iccid={{usageInfo.iccid}}'"></a>
                                    </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="no-plan">
                                <img src="../../assets/imgs/card/usage/bg_no_plan.svg" alt="">
                            </div>
                        </van-swipe-item>
                        <van-swipe-item>
                            <ul v-if="hasOrderPlan" class="order-plan-wrap">
                                <li v-for="(item,index) in usageInfo.orders">
                                    <div class="plan-info-wrap">
                                        <p class="plan-name">{{item.name}}</p>
                                        <p class="plan-describe" v-if="item.rating_id==2522">
                                            <span>月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。</span>
                                        </p>
                                        <p class="plan-describe" v-else>
                                            <span>{{item.describe}}</span>
                                            <span>{{item.remark}}</span>
                                        </p>
                                        <p class="plan-orderNo">订单号:{{item.no}}</p>
                                    </div>

                                    <div class="plan-date-wrap">
                                        <p  class="plan-date">
                                            <span>续费日期:{{filterDate(item.created_at)}}</span>
                                        </p>
                                        <p class="plan-order-status-wrap">
                                            <span>{{order_state[item.status]}}</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="no-plan">
                                <img src="../../assets/imgs/card/usage/bg_no_recharge.svg" alt="">
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                </div>

            </div>

            <div  class="btn-recharge-wrap">
                <button @click="recharge">套餐查询</button>
                <a href="">卡券兑换</a>
            </div>
        </div>


        <van-popup :close-on-click-overlay="false" v-model="load_plan">
            <p class="showTip">{{load_plan_msg}}</p>
        </van-popup><!--获取详情遮罩-->
    </div>
</template>

<style lang="less">
    #app,html,body,.plan-usage-wrap{height: 100%}
    html{background-color: #fbfafa;}
    .plan-usage-wrap {
        box-shadow: 0 0 60px #dbdbdb;
        .cl-state-warning{
            color: #fe8d2e !important;
            border-color: #fe8d2e !important;
        }
        .cl-state-normal{
            color: #3bce9e !important;
            border-color: #3bce9e !important;
        }
        .cl-state-primary{
            color: #38b5ed !important;
            border-color: #38b5ed !important;
        }
        .card-info-wrap {
            display: flex;
            padding: 15px;
            .operation-logo-wrap {
                margin-right: 15px;
                img{
                    width: 160px;
                    height: 160px;;
                }
            }
            .card-info-detail{
                text-align: left;
                > p{
                    padding-bottom: 10px;
                    &:first-child{
                        font-size: 36px;
                        color: #31b3ef;
                    }
                    &:nth-child(2){
                        padding-bottom: 35px;
                        font-size: 28px;
                        color: #017ef9;
                    }
                }


                .card-state-wrap{
                    display: flex;
                    align-items: center;
                    div{
                        &:first-child{
                            flex: 3;
                        }
                        &:last-child{
                             /*flex: 1;*/
                            text-align: right;
                        }
                    }
                    span{
                        font-size: 12PX !important;
                    }
                    span,em{
                        display: inline-block;
                        margin-right: 15px;
                        padding: 5px 10px;
                        border:1PX solid #3bce9e;
                        color: #3bce9e;
                        border-radius: 6px;
                        line-height: 1;
                        -webkit-text-size-adjust: none;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                    em{
                        font-style: normal;
                        color: #fff;
                        border:1PX solid #38b5ed;
                        background-color: #38b5ed;
                    }
                }

            }
        }
        .card-used-wrap{
            padding: 25px;
            color: #fff;
            font-weight: 500;
            background-image: linear-gradient(167deg, #00d2ff 0%, #3a7bd5 100%);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
            .card-surplus-flow{
                display: flex;
                align-items: center;
                span{
                    flex: 1;
                    &:first-child{
                        text-align: left;
                    }
                    &:last-child{
                        font-size: 52px;
                        text-align: right;
                    }
                }
            }
            .card-flow-detail{
                display: flex;
                align-items: center;
                >div{
                    flex: 1;
                }
                .card-used-data-wrap{
                    text-align: left;
                    padding-top: 20px;
                    p{
                        padding-bottom: 15px;
                    }

                }
                .to-flow-wrap{
                    text-align: right;
                    a{
                        display: inline-block;
                        padding: 25px 30px;
                        background-color: rgba(0,0,0,0.1);
                    }
                }

            }
        }
        .card-plan-wrap{
            .no-plan{
                img{
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .card-plan-wrap-title{
                display: flex;
                span{
                    display: inline-block;
                    flex: 1;
                    padding: 30px 25px;
                    font-size: 26px;
                    color: #afafaf;
                    &:first-child{
                        text-align: left;
                    }
                    &:last-child{
                        text-align: right;
                    }
                    &.checked{
                        color: #31b3ef;
                    }

                }
            }
            .van-swipe-wrap{
                width: 100%;
                padding: 0 25px;
                box-sizing: border-box;
                .van-swipe{
                    background-color: #fff;
                    border-radius: 8px;
                }
            }
            .usage-plan-wrap,.order-plan-wrap{
                width: 100%;
                overflow-y: auto;
                height: 100%;
                li{
                    display: flex;
                    padding: 10px 15px;
                    border-bottom: 1PX solid #dedede;
                    &:last-child{
                        border-bottom: none;
                    }
                    .plan-info-wrap{
                        flex: 4;
                        text-align: left;
                        .plan-name{
                            padding: 20px 0;
                            font-size: 36px;
                            color: #1c1c1c;
                        }
                        .plan-describe{
                            min-height: 40px;
                            font-size: 24px;
                            color: #9fa4af;
                        }
                    }
                    .plan-date-wrap{
                        position: relative;
                        /*flex:2.7;*/
                        text-align: right;
                        .plan-date{
                            padding: 20px 0;
                            font-size: 24px;
                            color: #31b3ef;

                        }
                        .speedup-wrap{
                            a{
                                position: absolute;
                                width: auto;
                                right: 0;
                                bottom: 0;
                                padding:13px;
                                border-radius: 6px;
                                color: #fff;
                                background-image: linear-gradient(167deg, #00d2ff 0%, #3a7bd5 100%);
                            }
                        }

                    }
                }
            }
            .order-plan-wrap{
                li{
                    .plan-order-status-wrap{
                        padding-top: 40px;
                        span{
                            display: inline-block;
                            padding: 0 10px;
                            height: 36px;
                            line-height: 36px;
                            border: 1PX solid #3bce9e;
                            color: #3bce9e;
                        }
                    }
                    .plan-orderNo{
                        padding-top: 15px;
                        font-size: 24px;
                        color: #9fa4af;
                    }
                }

            }

        }
        .btn-recharge-wrap{
            position: relative;
            padding: 40px 0;
            button{
                display: inline-block;

                width: 430px;
                height: 80px;
                line-height: 80px;
                color: #fff;
                background: #38b5ed;
                border-radius: 80px;
            }
            a{
                position: absolute;
                right: 30px;
                bottom: 60px;
                color: #38b5ed;
                font-size: 28px;
            }

        }

    }
</style>

<script>
    // @ is an alias to /src

    import {Swipe, SwipeItem, Toast,Notify,Popup} from 'vant';
    import {getStorage,setStorage,toDecimal} from "../../utilies";
    import {_get} from "../../http";

    export default {
        name: "home",

        data() {
            return {
                swiperwidth:300,
                load_plan:true,
                load_plan_msg:'获取套餐信息,请等候',
                watch_source: [5, 10, 12, 17, 18, 20, 22],
                auth_status: ['未实名', '审核中', '审核不通过'],
                card_state: ["未激活", "已激活", "已停机", "已废弃", "可测试", "可激活"],
                order_state:['未支付', '已支付', '已到帐'],
                plan_title_array:['当前套餐','历史续费套餐'],
                cur_plan_type_index: 0,//swiper 索引
                filterCardInfo: {
                    operator_logo:'',//运营商icon
                    msisdn: '',
                    device_state: '',//机卡状态
                    card_str_state: '',//卡状态
                    real_name_state: '',//实名状态
                    refresh_actived: '',//刷新卡状态/激活
                    is_watch_card:false,//手表卡
                    is_flow_card:false,//流量卡
                    watch_card_usage: {
                        'total_flow': '',//总流量
                        'used_flow': '',//流量用量
                        'total_voice': '',//总通话
                        'used_voice': '',//流量通话
                        'detail_right': ''//右侧详情
                    },//手表卡
                    flow_card_usage: {
                        'total_flow': '',//总流量
                        'used_flow': '',//流量用量
                        'detail_right': ''//右侧详情
                    }//流量卡
                },
                hasUsagePlan:false,
                hasOrderPlan:false,
                usageInfo: {},
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
            [Notify.name]:Notify,
            [Popup.name]:Popup,
        },
        created() {
            if(getStorage('check_iccid')){
                _get('/api/v1/app/cards/telcom/usage',{
                    iccid:getStorage('check_iccid')
                }).then(res=>{
                    if(res.state){
                        this.load_plan = false;
                        this.usageInfo = res.data;

                        if(this.usageInfo.operator==0){
                            this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/unicom-logo.svg')
                        }else if(this.usageInfo.operator==1){
                            this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/mobile-logo.png')
                        }else{
                            this.filterCardInfo.operator_logo = require('../../assets/imgs/card/usage/telecom-logo.svg')
                        }

                        if (this.inArray(this.usageInfo.source, this.watch_source) >= 0 && this.usageInfo.source != 19) {
                            if (this.usageInfo.msisdn.substr(0, 2) == '86') {
                                this.filterCardInfo.msisdn = this.usageInfo.substr(2, this.usageInfo.msisdn.length);
                            } else {
                                this.filterCardInfo.msisdn = this.usageInfo.msisdn
                            }
                        } else {
                            this.filterCardInfo.msisdn = this.usageInfo.msisdn
                        }//判断MSISDN

                        if (this.inArray(this.usageInfo.source, [1, 4]) >= 0) {
                            this.auth_status.push('手淘实名');
                        } else {
                            this.auth_status.push('已实名');
                        }//实名增加状态

                        this.filterCardInfo.real_name_state = this.auth_status[this.usageInfo.auth_status];//实名状态

                        if (this.inArray(this.usageInfo.source, [0, 2]) >= 0) {
                            //判断是否可以点击
                        }

                        if (this.inArray(this.usageInfo.source, [1, 5]) >= 0 && this.userInfo.imei) {
                            if (!this.usageInfo.usage.imei || !this.usageInfo.data.fenli) {
                                this.filterCardInfo.device_state = {state:'机卡已绑定',code:1}
                            } else {
                                if (this.usageInfo.status == 2) {
                                    this.filterCardInfo.device_state = {state:'机卡已分离停机',code:2}
                                } else {
                                    this.filterCardInfo.device_state = {state:'机卡分离',code:2}
                                }
                            }
                        }//机卡状态

                        this.filterCardInfo.card_str_state = this.card_state[this.usageInfo.status];//卡状态


                        if (this.usageInfo.status == 2) {
                            this.filterCardInfo.refresh_actived = '激活'
                        } else {
                            this.filterCardInfo.refresh_actived = '刷新'
                        }


                        if (this.inArray(this.usageInfo.source, this.watch_source) >= 0) {

                            this.filterCardInfo.is_watch_card = true;
                            this.filterCardInfo.is_flow_card = false;

                            if (this.usageInfo.usage.noMax == 1) {
                                this.filterCardInfo.watch_card_usage.total_flow = '无限'
                                this.filterCardInfo.watch_card_usage.detail_right = '无限'//右侧详情

                            } else {
                                this.filterCardInfo.watch_card_usage.total_flow = this.usageInfo.usage.total + 'MB' //总用量
                                this.filterCardInfo.watch_card_usage.detail_right = toDecimal((this.usageInfo.usage.total - this.usageInfo.usage.used)) + 'MB'//右侧详情
                            }

                            this.filterCardInfo.watch_card_usage.used_flow = toDecimal(this.usageInfo.usage.used) + 'MB' //已使用流量

                            if (this.usageInfo.noMaxVoice == 1) {
                                this.filterCardInfo.watch_card_usage.total_voice = '无限'

                            } else {
                                this.filterCardInfo.watch_card_usage.total_voice = toDecimal(this.usageInfo.usage.totalVoice) + '分钟'
                            }

                            this.filterCardInfo.watch_card_usage.used_voice = toDecimal(this.usageInfo.usage.usedVoice) + '分钟' //已使用通话

                            //手表卡用量
                        } else {

                            this.filterCardInfo.is_watch_card = false;
                            this.filterCardInfo.is_flow_card = true;

                            if (this.usageInfo.source == 6 || this.usageInfo.usage.noMax == 1) {
                                this.filterCardInfo.flow_card_usage.total_flow = '无限'
                                this.filterCardInfo.flow_card_usage.detail_right = '无限'
                            }

                            if (this.usageInfo.source != 6 && this.usageInfo.usage.noMax != 1) {
                                this.filterCardInfo.flow_card_usage.total_flow = toDecimal(this.usageInfo.usage.total / 1024) + 'GB'
                                this.filterCardInfo.flow_card_usage.detail_right = toDecimal( (this.usageInfo.usage.total - this.usageInfo.usage.used) / 1024 ) + 'GB'
                            }

                            this.filterCardInfo.flow_card_usage.used_flow = toDecimal(this.usageInfo.usage.used / 1024) + 'GB'

                        }//流量卡

                        // 是否显示套餐
                        this.hasUsagePlan = this.usageInfo.usage.plans.length ? true : false
                        this.hasOrderPlan = this.usageInfo.orders.length ? true : false


                    }else{
                        this.load_plan_msg = res.msg;
                    }
                })
            }else{
                this.$router.push({path:'/card/lookup'})
            }

        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            this.swiperwidth = clientWidth;
            // this.$refs.vanSwiperWwrap.$el.style.height = (clientHeight - 320) ;
        },
        methods: {
            swiperOnChange: function (index) {
                this.cur_plan_type_index = index;
                this.choose_plan_index = 0;
            },
            planTypeClikc: function (index) {
                this.cur_plan_type_index = index;
                this.choose_plan_index = 0;
                console.log(index);
                this.$refs.vanSwiperWwrap.swipeTo(index);
            },
            choosePlanClick: function (index) {
                this.choose_plan_index = index
            },
            recharge: function () {
                let planInfo = this.mock_list[this.cur_plan_type_index][this.choose_plan_index]
                if (planInfo.surplus_times <= 0) {
                    Toast('此套餐已售罄, 请更换套餐');
                    return
                }
                planInfo.iccid = '891111111100000000'
                setStorage('planInfo', planInfo);
                this.$router.push({path: '/recharge'})
            },
            refreshOrActivated:function(){
                if(this.filterCardInfo.refresh_actived=='刷新'){
                    location.reload()
                }else{
                    if(!this.usageInfo.canActivated){
                        Notify({
                            message:'无效套餐,无法激活',
                            background:'#ff0752'
                        })
                        return
                    }
                    if(this.usageInfo.usage.used >= this.usageInfo.usage.total && this.usageInfo.usage.total>0){
                        Notify({
                            message:'流量已用完,不能激活,请充值',
                            background:'#ff0752'
                        })
                        return
                    }
                    _post('/api/v1/app/activated',{iccid:'8934564565432345'})
                        .then(res=>{
                            if(res.state){
                                Notify({
                                    message:'请在5分钟内放回原绑定的设备中开机,否则会被停机',
                                    background:'#00c2ff'
                                })
                            }
                        })

                }
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf(elem, i);
            },
        }
    };
</script>

