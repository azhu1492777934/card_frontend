<template>
    <div class="usage-wrap">
        <div ref="orderTop" class="order-top">
            <p>卡号：</p>
            <p>{{iccid}}</p>
            <ul>
                <li v-for="(item,index) in statusList" :class="{'checked':statusIndex==index}"
                    @click="changeStatus(index)">
                    {{item}}
                    <span class="deco-border-arrow"></span>
                </li>
            </ul>
        </div>
        <div class="swipe-wrap" ref="SwiperWwrap">

            <swiper ref="mySwiper" :options="swiperOption">

                <swiper-slide v-for="(item,index) in statusList" :key="index">
                    <ul v-show="usageListObj[index].length>0" class="plan-list-wrap">
                        <li
                            v-for="(inner_item,inner_index) in usageListObj[index]"
                            :class="`flow-status-bg-${index}`"
                        >

                            <div v-if="index==0" class="priority-wrap">
                                <button @click="usedPriority({iccid:iccid,source:source,id:inner_item.id,priority:inner_item.priority})" v-if="inner_item.priority==1000">优先使用</button>
                                <button @click="usedPriority({iccid:iccid,source:source,id:inner_item.id,priority:inner_item.priority})" v-if="inner_item.priority==0">取消优先</button>
                            </div>

                            <div class="usage-data-inner-wrap">
                                <div class="usage-left"
                                     :class="{
                                'simple-data':(inner_item.total_flow && !inner_item.total_voice )|| (!inner_item.total_flow && inner_item.total_voice ),
                                'complicated-data':inner_item.total_flow && inner_item.total_voice
                                }"
                                >
                                    <p
                                        class="complicated-date-wrap"
                                        :class="{'l-100':inner_item.priority>=0}"
                                        v-if="inner_item.total_flow && inner_item.total_voice && index!=3">
                                        套餐时长
                                        <span v-if="index==1">{{ clacDaysSpan(inner_item.activated_at,inner_item.expired_at) }}天</span>
                                        <span v-if="index==0 || index==2">{{ clacDaysSpan(today,inner_item.expired_at) }}天</span>
                                    </p>

                                    <div class="data-wrap" v-if="inner_item.total_flow">
                                        <p>总流量</p>
                                        <p v-if="inner_item.total_flow<0">无限</p>
                                        <p v-else>{{inner_item.total_flow}}/MB</p>
                                    </div>

                                    <div class="data-wrap" v-if="inner_item.total_flow">
                                        <p>已使用</p>
                                        <p v-if="inner_item.total_flow>0">{{inner_item.total_flow - inner_item.remaining_flow }}/MB</p>
                                        <p v-if="inner_item.total_flow<0">{{inner_item.current_used_flow}}/MB</p>
                                    </div>

                                    <div class="data-wrap" v-if="inner_item.total_voice">
                                        <p>总通话</p>
                                        <p v-if="inner_item.total_voice<0"></p>
                                        <p v-else>{{inner_item.total_voice}}/分钟</p>
                                    </div>

                                    <div class="data-wrap" v-if="inner_item.total_voice">
                                        <p>已使用</p>
                                        <p v-if="inner_item.total_voice>0">{{inner_item.total_voice - inner_item.remaining_voice }}/分钟</p>
                                        <p v-if="inner_item.total_voice<0">{{inner_item.current_used_voice}}/分钟</p>
                                    </div>

                                    <!-- 不同时存在流量及通话-->
                                    <!--<div class="data-wrap">-->
                                    <div class="data-wrap" v-if="( (inner_item.total_flow && !inner_item.total_voice && inner_item.total_voice!=0 ) || (!inner_item.total_flow && inner_item.total_flow!=0 && inner_item.total_voice ) ) && index!=3 ">
                                        <p>套餐时长</p>
                                        <p v-if="index==1">{{ clacDaysSpan(inner_item.activated_at,inner_item.expired_at) }}天</p>
                                        <p v-if="index==0 || index==2">{{ clacDaysSpan(today,inner_item.expired_at) }}天</p>
                                    </div>

                                </div>

                                <div class="usage-right">
                                    <span class="plan-status" :class="`plan-status-${index}`">{{statusList[index]}}</span>

                                    <!--流量详情-->
                                    <div v-if="inner_item.total_flow >= 0">
                                        {{inner_item.remaining_flow}}<span>/MB</span>
                                        <p>剩余流量</p>
                                    </div>
                                    <div v-if="inner_item.total_flow < 0">
                                        无限
                                        <p>剩余流量</p>
                                    </div>
                                    <!--./流量详情-->

                                    <!--通话详情-->
                                    <div v-if="!inner_item.total_flow  && inner_item.total_voice >= 0">
                                        {{inner_item.remaining_voice}}<span>/分钟</span>
                                        <p>剩余通话</p>
                                    </div>
                                    <div v-if="!inner_item.total_flow && inner_item.total_voice < 0">
                                        无限
                                        <p>剩余通话</p>
                                    </div>
                                    <!--./通话详情-->
                                </div>
                            </div>


                            <!--日期-->
                            <div class="date-wrap">
                                <span>开始时间:{{filterDate(inner_item.activated_at)}}</span>
                                <span>结束时间:{{filterDate(inner_item.expired_at)}}</span>
                            </div>

                        </li>
                    </ul>
                    <div class="no-data-wrap" v-show="usageListObj[index].length==0">
                        <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="暂无数据">
                        <router-link to="/mifi/plan/group" class="to-buy-plan">去下单</router-link>
                    </div>
                </swiper-slide>

            </swiper>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import {Toast, Popup, Notify, Loading} from "vant";
    import {getStorage, setStorage, checkBrowser, Today} from "../../../utilies";
    import {_get,_post} from '../../../http'

    export default {
        name: "index",
        components: {
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [Loading.name]: Loading,
            swiper,
            swiperSlide,
        },
        data() {
            const _this = this;
            return {
                today: Today(),
                timeStamp: new Date().getTime(),
                iccid: getStorage('check_iccid'),
                source:getStorage('check_realNameSource'),
                client_type: checkBrowser(),
                statusList: ['生效', '未启用', '失效', '过期'],
                statusIndex: 0,
                usageListObj: {},
                swiperOption: {
                    on: {
                        slideChangeTransitionEnd: function (swiper) {
                            _this.statusIndex = this.activeIndex;
                        }
                    }
                },
            }
        },
        created() {
            this.iccid ? this.initial() : this.$router.push({path:'/mifi/card/lookup'});
        },
        mounted(){
            document.body.addEventListener('touchmove', function(e) {
                if (!document.querySelector('.swipe-wrap').contains(e.target)) {
                    e.preventDefault();
                }
            },{passive:false});
        },
        methods: {
            initial(){
                this.usageListObj = {0: [], 1: [], 2: [], 3: [],},
                this.$store.commit('mifiCommon/changeLoadingStatus',{flag:true});
                this.$store.commit('mifiCommon/changeErrStatus',{show:false});
                _get('/api/v1/app/cards/plan/all',{
                    iccid:this.iccid
                }).then(res=>{
                    this.$store.commit('mifiCommon/changeLoadingStatus',{flag:false});
                    if(res.state==1){
                        if(JSON.stringify(res.data.data)!='[]'){
                            let  serverList = res.data.data;

                            serverList.map((item, index) => {
                                if ((new Date(item.activated_at.replace(/-/g, '/')).getTime() - this.timeStamp > 0)) {
                                    // 未启动套餐
                                    this.usageListObj[1].push(item)
                                }else if((new Date(item.activated_at.replace(/-/g, '/')).getTime() - this.timeStamp == 0)){
                                    this.usageListObj[0].push(item)
                                } else {
                                    // 过期套餐
                                    if ((new Date(item.expired_at.replace(/-/g, '/')).getTime() - this.timeStamp < 0)) {
                                        this.usageListObj[3].push(item)
                                    } else {
                                        // 套餐失效
                                        if (item.remaining_flow == 0) {
                                            this.usageListObj[2].push(item);
                                        } else {
                                            this.usageListObj[0].push(item);
                                        }

                                    }// 未过期套餐
                                }
                            })

                            if(res.data.delay_orders.length>0){
                                this.usageListObj[1] = this.usageListObj[1].concat(res.data.delay_orders);
                            }
                        }
                        this.$nextTick(() => {
                            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                                orderTop = this.$refs.orderTop.offsetHeight;
                            if (this.client_type == 'wechat' || this.client_type == 'alipay') {
                                this.$refs.SwiperWwrap.style.height = (clientHeight - orderTop  - 44) + 'px'
                            } else {
                                this.$refs.SwiperWwrap.style.height = (clientHeight - orderTop) + 'px'
                            }

                            // new this.bScroll(this.$refs.SwiperWwrap, {});
                        })

                    }else{
                        this.$store.commit('mifiCommon/changeErrStatus',{
                            show:true,
                            errorMsg:res.msg ? res.msg : '获取数据信息失败，请稍后再试'
                        })
                    }
                })
            },
            changeStatus(index) {
                this.statusIndex = index;
                this.$refs.mySwiper.swiper.slideTo(index);
            },
            usedPriority(params){
                let serverPriority ;
                params.priority === 1000 ? serverPriority = 0 : serverPriority = 1000;
                _post('/api/v1/app/plans/stick', {
                    iccid: params.iccid,
                    rating_id:params.id,
                    priority:serverPriority,
                    source:params.source
                }).then(res => {
                    if (res.state==1) {
                        this.initial();
                    }else{
                        Notify({message:res.msg});
                    }
                })
            }
            // toConnection(params){
            //     if(params.type!=0){
            //         return
            //     }else{
            //         this.$router.push({
            //             path:'/weixin/card/connection',
            //             from:'mifi'
            //         })
            //     }
            // }
        }
    }
</script>

<style lang="less">
    @import "~swiper/dist/css/swiper.min.css";
    @import "../../../assets/less/utitlies";

    .usage-wrap {
        .swiper-container {
            height: 100%;
        }
        .order-top {
            padding: 55px 46px 0;
            height: 208px;
            .bg-image('../../assets/imgs/mifi/order/orderTopBg');
            p {
                &:first-child {
                    font-size: 35px;
                    color: #353335;
                    text-align: left;
                }
                &:nth-child(2) {
                    padding: 18px 0 30px;
                    text-align: center;
                    color: #fa7500;
                    font-size: 46px;
                    font-weight: 500;
                }
            }

            ul {
                display: flex;
                padding: 0 29px;
                li {
                    position: relative;
                    flex: 1;
                    color: #8a8a8a;
                    font-size: 30px;
                    &.checked {
                        color: #fab214;
                        .deco-border-arrow {
                            position: absolute;
                            left: 50%;
                            bottom: -32px;
                            display: inline-block;
                            width: 125px;
                            height: 24px;
                            transform: translateX(-50%);
                            .bg-image('../../assets/imgs/mifi/order/orderArrow');
                        }
                    }
                }
            }
        }
        .swipe-wrap {
            padding: 25px 23px;
            box-sizing: border-box;
            .plan-list-wrap {
                height: 100%;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
            .priority-wrap{
                position: absolute;
                top: 15px;
                z-index: 1;
                button{
                    padding: 5px 8px;
                    font-size: 20px;
                    color: #fff;
                    border-radius: 5px;
                    background-image: linear-gradient(45deg, #92c7fa 10%, #457bad 100%);
                }
            }
            li {
                position: relative;
                min-height: 208px;
                padding: 0 30px;
                margin-bottom: 15px;
                background-color: #fff;
                border-radius: 12px;
                .usage-data-inner-wrap{
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding-top: 20px;
                }

                &.flow-status-bg-0 {
                    .bg-image('../../assets/imgs/mifi/plan/usedOrder');
                }
                // 生效
                &.flow-status-bg-1 {
                    .bg-image('../../assets/imgs/mifi/plan/unUsedOrder');
                }
                // 未启用
                &.flow-status-bg-2 {
                    .usage-left{
                        p{color: #999;}
                        .data-wrap{ &::after{background-color: #bebebe;} }
                    }
                    .usage-right{ div,p{color: #999;} }
                    .date-wrap{color: #999;}
                    .bg-image('../../assets/imgs/mifi/plan/invaildedOrder');
                }
                // 失效
                &.flow-status-bg-3 {
                    .usage-left{
                        p{color: #999;}
                        .data-wrap{ &::after{background-color: #bebebe;} }
                    }
                    .usage-right{ div,p{color: #999;} }
                    .date-wrap{color: #999;}
                    .bg-image('../../assets/imgs/mifi/plan/invaildedOrder');
                }
                // 过期
                &:last-child {
                    margin-bottom: 0;
                }

                .usage-left {
                    flex: 4;
                    text-align: left;
                    >div{
                        display: inline-block;
                        text-align: center;
                    }
                    .isPrimary{
                        height: 40px;
                        padding: 0 0 15px;
                    }// 是否优先使用

                    .data-wrap{
                        position: relative;
                        padding-right: 25px;
                        &::after{
                            position: absolute;
                            top: 40%;
                            right: 10px;
                            width: 3px;
                            height: 25px;
                            transform: translateX(-50%);
                            content:'';
                            background-color: #e1bd6d;
                        }
                        &:last-child{
                            padding-right: 0;
                            &::after{
                                width: 0;
                            }
                        }
                    }
                    p{
                        color: #2c251d;
                        &:first-child{
                            padding-bottom: 15px;
                        }
                    }
                    &.simple-data{
                        display: flex;
                        .data-wrap{
                            flex: 1;
                            &::after{
                                right: 3px;
                            }
                        }
                        p{
                            &:first-child{
                                font-size: 24px;
                            }
                            &:last-child{
                                font-size: 26px;
                            }
                        }
                    }

                    &.complicated-data{
                        .data-wrap{
                            min-width: 90px;
                        }
                        p {
                            &:first-child {
                                font-size: 22px;
                            }
                            &:last-child {
                                font-size: 22px;
                            }
                        }
                    }

                    .complicated-date-wrap{
                        position: absolute;
                        top: 17px;
                        color: #ff5519;
                    }
                    /*存在优先使用按钮时 增加'套餐时长左边距'*/
                    .l-100{left: 130px!important;}
                }
                .usage-right {
                    flex: 1.5;
                    text-align: right;
                    .plan-status{
                        display: inline-block;
                        font-size: 22px;
                        padding: 5px 20px;
                        border-radius: 10px;
                    }
                    .plan-status-0,
                    .plan-status-1{
                        color:#2c251d;
                        background-image: linear-gradient(45deg, #ffc641 10%, #f1a53c 100%);
                    }
                    .plan-status-2,
                    .plan-status-3{
                        color:#999;
                        background-color: #bebebe;
                    }

                    div{
                        font-size: 60px;
                        color: #fa7500;
                        span{
                            font-size: 24px;
                        }
                        p{
                            padding-top: 5px;
                            font-size: 20px;
                            color: #2c251d;
                        }
                    }

                }
                .date-wrap{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding-top: 10px;
                    font-size: 24px;
                    color: #2c251d;
                }

            }
            .no-data-wrap {
                .to-buy-plan {
                    display: inline-block;
                    width: 303px;
                    height: 68px;
                    margin-top: 60px;
                    border-radius: 68px;
                    font-size: 36px;
                    color: #443f37;
                    text-align: center;
                    line-height: 68px;
                    text-decoration: none;
                    background-image: linear-gradient(45deg, #f0b546 10%, #fdd47a 100%);
                }
            }

        }
    }

</style>