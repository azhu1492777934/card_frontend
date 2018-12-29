<template>
    <div class="plan-usage-wrap">

        <div class="card-info-wrap">
            <div class="operation-logo-wrap">
                <img :src="filterCardInfo.operator_logo" alt="">
            </div>
            <div class="card-info-detail">
                <p>MSISDN:{{filterCardInfo.msisdn}}</p>
                <p>ICCID:{{usageInfo.iccid}}(编码:{{usageInfo.source}})</p>
                <div class="card-state-wrap">
                    <div>
                        <span>{{filterCardInfo.real_name_state}}</span>
                        <span>{{filterCardInfo.card_str_state}}</span>
                        <span v-show="filterCardInfo.device_state!=''">{{filterCardInfo.device_state}}</span>
                    </div>
                    <div>
                        <em>{{filterCardInfo.refresh_actived}}</em>
                        <em>？</em>
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
                <span>当前套餐</span>
                <span>历史续费套餐</span>
            </p>
            <van-swipe ref="swiperVant" :show-indicators="false" @change="swiperOnChange">
                <van-swipe-item>
                    <ul class="usage-plan-wrap">
                        <li v-for="(item,index) in usageInfo.usage.plans">
                            <div class="plan-usage-info-wrap">
                                <span>{{item.name}}</span>
                                <div>
                                    <!--/*套餐描述-->
                                    <div v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
                                    <span v-if="item.describe && item.planCellInfo.key!='MG500'">
                                        {{item.describe}}
                                    </span>
                                        <span v-if="item.planCellInfo.max_high">
                                        高速流量:{{item.planCellInfo.max_high}},已使用{{item.planCellInfo.used_high}}
                                    </span><br>
                                        <span v-if="item.planCellInfo.max_normal">
                                        中速流量:{{item.planCellInfo.max_normal}}
                                    </span>
                                    </div>
                                    <div v-else>
                                        <p v-if="item.describe && item.describe!='None'">
                                            <span>{{item.describe}}</span>
                                            <span>{{item.remark}}</span>
                                        </p>
                                        <p v-else>
                                            <span>{{item.remark}}</span>
                                        </p>
                                    </div>
                                    <!--\*套餐描述-->
                                </div>
                            </div>
                            <div class="plan-usage-date-wrap">
                                <p v-if="(inArray(usageInfo.source,watch_source)>=0||inArray(usageInfo.source,[1,7,8])>=0)">
                                    <span>开始日期:{{item.activated_at}}</span><br>
                                    <span>有效日期:{{item.expired_at}}</span>
                                </p><!--手表卡-->
                                <p v-else-if="item.expired_at">
                                    <span>有效日期:{{item.expired_at}}</span>
                                </p><!--流量卡-->
                                <div v-if="item.planCellInfo && JSON.stringify(item.planCellInfo) != '{}'">
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
                </van-swipe-item>

                <van-swipe-item>
                    <ul class="order-plan-wrap">
                        <li v-for="(item,index) in usageInfo.orders">
                            <div class="plan-order-info">
                                <span>{{item.name}}</span>
                                <p v-if="item.rating_id==2522">
                                    <span>月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。</span>
                                </p>
                                <p v-else>
                                    <span>{{item.describe}}</span>
                                    <span>{{item.remark}}</span>
                                </p>
                                <p>订单号:{{item.no}}</p>
                            </div>

                            <div>
                                <span>续费日期:{{item.created_at}}</span>
                                <span>order_state[{{item.status}}]</span>
                            </div>
                        </li>
                    </ul>
                </van-swipe-item>

            </van-swipe>

        </div>

        <div class="btn-recharge-wrap">
            <button @click="recharge">套餐查询</button>
        </div>
    </div>
</template>

<style lang="less">
    .plan-usage-wrap {
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
                             flex: 2;
                            text-align: right;
                        }
                    }
                    span{
                        height: 26px;
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
                        display: inline-block;
                        height: 26px;
                        padding: 5px 10px;
                        margin-right: 15px;
                        font-style: normal;
                        border-radius: 6px;
                        color: #fff;
                        border:1PX solid #38b5ed;
                        background-color: #38b5ed;
                        &:last-child{
                            margin-right: 0;
                        }
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
            .card-plan-wrap-title{
                display: flex;
                padding: 30px 25px;
                span{
                    flex: 1;
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
            .van-swipe{
                margin: 0 25px;
                background-color: #f5f5f5;
            }
            .usage-plan-wrap{
                li{
                    display: flex;
                    padding: 10px;
                    .plan-usage-info-wrap{
                        flex: 4;
                    }
                    .plan-usage-date-wrap{
                        flex:3;
                    }

                }
            }
            .order-plan-wrap{

            }

        }


    }

</style>

<script>
    // @ is an alias to /src

    import {Swipe, SwipeItem, Toast} from 'vant';
    import {setStorage} from "../../utilies";
    import {_get} from "../../http";

    export default {
        name: "home",

        data() {
            return {
                watch_source: [5, 10, 12, 17, 18, 20, 22],
                auth_status: ['未实名', '审核中', '审核不通过'],
                card_state: ["未激活", "已激活", "已停机", "已废弃", "可测试", "可激活"],
                order_state:['未支付', '已支付', '已到帐'],
                filterCardInfo: {
                    operator_logo:'',//运营商icon
                    msisdn: '',
                    device_state: '',//机卡状态
                    card_str_state: '',//卡状态
                    real_name_state: '',//实名状态
                    refresh_actived: '',//刷新卡状态/激活
                    is_watch_card:false,
                    is_flow_card:false,
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
                usageInfo: {
                    "auth_status": 3,
                    "canActivated": 0,
                    "card_plans": [
                        {
                            "call_time": 0,
                            "data": 5.0,
                            "day": 0,
                            "expired_at": "2018-12-25 20:39:31",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "rating_id": 2533,
                            "type": 3
                        },
                        {
                            "call_time": 0,
                            "data": 5.0,
                            "day": 0,
                            "expired_at": "2018-12-11 18:49:36",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "rating_id": 2533,
                            "type": 3
                        },
                        {
                            "call_time": 0,
                            "data": 5.0,
                            "day": 0,
                            "expired_at": "2018-11-09 08:18:08",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "rating_id": 2533,
                            "type": 3
                        },
                        {
                            "call_time": 0,
                            "data": 6324.096,
                            "day": 360,
                            "expired_at": "2019-08-26 23:59:59",
                            "month_data": 527.007,
                            "name": "527G*12\u4e2a\u6708",
                            "rating_id": 6296,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u6708527.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "type": 1
                        },
                        {
                            "call_time": 0,
                            "data": 1.0,
                            "day": 30,
                            "expired_at": "2018-09-26 23:59:59",
                            "month_data": 1.0,
                            "name": "1G/1\u4e2a\u6708",
                            "rating_id": 4400,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u67081.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "type": 1
                        }
                    ],
                    "fenli": false,
                    "iccid": "8986061805001065858",
                    "id_no": null,
                    "imei": "864319031839011",
                    "msisdn": "1064657365858",
                    "operator": 0,
                    "orders": [
                        {
                            "created_at": "2018-12-25 00:00:00",
                            "data": 5.0,
                            "day": 0,
                            "describe": "5G\u52a0\u901f\u5305",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "no": "YL201812252039234497",
                            "paid_at": "2018-12-25 20:39:30",
                            "rating_id": 2533,
                            "status": 2,
                            "type": 3
                        },
                        {
                            "created_at": "2018-12-11 00:00:00",
                            "data": 5.0,
                            "day": 0,
                            "describe": "5G\u52a0\u901f\u5305",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "no": "YL201812111849148115",
                            "paid_at": "2018-12-11 18:49:36",
                            "rating_id": 2533,
                            "status": 2,
                            "type": 3
                        },
                        {
                            "created_at": "2018-11-09 00:00:00",
                            "data": 5.0,
                            "day": 0,
                            "describe": "5G\u52a0\u901f\u5305",
                            "month_data": 0.0,
                            "name": "5G\u52a0\u901f\u5305",
                            "no": "YL201811090817583535",
                            "paid_at": "2018-11-09 08:18:07",
                            "rating_id": 2533,
                            "status": 2,
                            "type": 3
                        },
                        {
                            "created_at": "2018-09-17 18:22:38",
                            "data": 6324.084,
                            "day": 360,
                            "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a12\u4e2a\u6708\uff0c527GB/\u6bcf\u6708(51G\u9ad8\u901f+476G\u4e2d\u901f)\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                            "month_data": 527.007,
                            "name": "527G*12\u4e2a\u6708",
                            "no": "YL201809171822382309",
                            "paid_at": "2018-09-17 18:22:38",
                            "rating_id": 6296,
                            "remark": "\u6709\u6548\u671f360\u5929,\u6bcf\u6708527.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "status": 2,
                            "type": 1
                        },
                        {
                            "created_at": "2018-08-29 14:16:15",
                            "data": 1.0,
                            "day": 30,
                            "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a1\u4e2a\u6708\uff0c\u603b\u5171\u6d41\u91cf\u4e3a1G\uff0c\u5f53\u6708\u6e05\u96f6\u3002",
                            "month_data": 1.0,
                            "name": "1G/1\u4e2a\u6708",
                            "no": "YL201808291416153110",
                            "paid_at": "2018-08-29 14:16:15",
                            "rating_id": 4400,
                            "remark": "\u6709\u6548\u671f30\u5929,\u6bcf\u67081.0G\u6d41\u91cf\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u5f53\u6708\u6d41\u91cf.",
                            "status": 2,
                            "type": 1
                        }
                    ],
                    "pidList": [
                        1,
                        498
                    ],
                    "realname": "***",
                    "source": 16,
                    "status": 1,
                    "usage": {
                        "expired_at": "2018-09-26 23:59:59",
                        "imei": "3517201809001801",
                        "noMax": 0,
                        "noMaxVoice": 0,
                        "plans": [
                            {
                                "activated_at": "2018-12-27 00:00:00",
                                "describe": "\u5957\u9910\u6709\u6548\u671f\u4e3a12\u4e2a\u6708\uff0c527GB/\u6bcf\u6708(51G\u9ad8\u901f+476G\u4e2d\u901f)\uff0c\u6bcf\u670826\u65e524\u70b9\u6e05\u96f6\u3002",
                                "expired_at": "2019-01-26 23:59:59",
                                "id": "6296",
                                "name": "527G\u6d41\u91cf",
                                "planCellInfo": {
                                    "key": "MG527",
                                    "max_high": "51.00+0.00G",
                                    "plan_cell_status": 1,
                                    "speed": 1,
                                    "used_high": "12.76"
                                },
                                "remark": "\u5f53\u524d\u5957\u9910\u5df2\u4f7f\u7528\u6d41\u91cf12.76G/527.01G",
                                "total": 539655.168,
                                "used": 13069.765888
                            }
                        ],
                        "total": 539655.168,
                        "totalVoice": 0,
                        "used": 13069.765888,
                        "usedVoice": 0
                    }
                },
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Toast.name]: Toast,
        },
        created() {
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
                    this.filterCardInfo.device_state = '机卡已绑定'
                } else {
                    if (this.usageInfo.status == 2) {
                        this.filterCardInfo.device_state = '机卡已分离停机'
                    } else {
                        this.filterCardInfo.device_state = '机卡分离'
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
                    this.filterCardInfo.watch_card_usage.detail_right = (this.usageInfo.usage.total - this.usageInfo.usage.used) + 'MB'//右侧详情
                }

                this.filterCardInfo.watch_card_usage.used_flow = this.usageInfo.usage.used + 'MB' //已使用流量

                if (this.usageInfo.noMaxVoice == 1) {
                    this.filterCardInfo.watch_card_usage.total_voice = '无限'

                } else {
                    this.filterCardInfo.watch_card_usage.total_voice = this.usageInfo.usage.totalVoice + '分钟'
                }

                this.filterCardInfo.watch_card_usage.used_voice = this.usageInfo.usage.usedVoice + '分钟' //已使用通话

                //手表卡用量
            } else {

                this.filterCardInfo.is_watch_card = false;
                this.filterCardInfo.is_flow_card = true;

                if (this.usageInfo.source == 6 || this.usageInfo.usage.noMax == 1) {
                    this.filterCardInfo.flow_card_usage.total_flow = '无限'
                    this.filterCardInfo.flow_card_usage.detail_right = '无限'
                }

                if (this.usageInfo.source != 6 && this.usageInfo.usage.noMax != 1) {
                    this.filterCardInfo.flow_card_usage.total_flow = (this.usageInfo.usage.total / 1024) + 'GB'
                    this.filterCardInfo.flow_card_usage.detail_right = (this.usageInfo.usage.total - this.usageInfo.usage.used) / 1024 + 'GB'
                }

                this.filterCardInfo.flow_card_usage.used_flow = (this.usageInfo.usage.used / 1024) + 'GB'

            }//流量卡

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
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf(elem, i);
            },
        }
    };
</script>

