<template>
    <div class="card-wrap">
        <div class="top-info">
            <div class="top-info-left">
                <p>
                    近期查询<span @click="refreshCard" class="iconfont icon-refresh"></span>
                </p>
                <p>{{iccid}}</p>
                <!--<p>{{iccid}}({{usageInfo.source}})</p>-->
                <div class="card-status-wrap">
                    <div>
                        <span class="card-status"
                            :class="usageInfo.auth_status>=3?'status-gradient':'status-gradient-warning'">
                            {{filterCardInfo.real_name_state}}
                        </span>

                        <span class="card-status"
                              v-if="filterCardInfo.device_state==''"
                              :class="usageInfo.status>=3?'status-gradient':'status-gradient-green'">
                            {{filterCardInfo.card_str_state}}
                        </span>

                        <span class="card-status"
                              :class="filterCardInfo.device_state.code==1?'status-gradient-green':'status-gradient-warning'"
                              v-if="filterCardInfo.device_state!=''">
                            {{filterCardInfo.device_state.state}}
                        </span>
                    </div>
                    <div>
                        <router-link :to="{path:'/weixin/question/index',query:{from:'mifi'}}" class="card-question">?</router-link>
                        <router-link to="/mifi/card/lookup" class="card-change"> 去变更> </router-link>
                    </div>
                </div>
            </div>
            <span class="divider"></span>
            <div @click="toRealName" class="top-info-right">
                <span class="iconfont icon-user"></span>
                <p>去实名</p>
            </div>

        </div>
        <div v-if="usageInfo.auth_status!=1" class="card-function-wrap">
            <div class="function-group-wrap">
                <div @click="buyPlan">
                    <span class="iconfont icon-cart"></span>
                    <p>购买套餐</p>
                </div>
                <span class="divider"></span>
                <div @click="flowCheck" class="item-function-wrap">
                    <span class="iconfont icon-info"></span>
                    <p>流量查询</p>
                </div>
                <span class="divider"></span>
                <div @click="checkOrder">
                    <span class="iconfont icon-txt"></span>
                    <p>订单查询</p>
                </div>
            </div>
            <div class="function-group-wrap">
                <div @click="couponExchange">
                    <span class="iconfont icon-coupon"></span>
                    <p>卡券兑换</p>
                </div>
            </div>
        </div>
        <!--<div class="real-name-wrap" v-if="usageInfo.auth_status==1">-->
            <!--<img src="../../../assets/imgs/mifi/common/real_name.png" alt="">-->
        <!--</div>-->
    </div>
</template>

<script>
    import {getStorage,setStorage} from "../../../utilies";
    import {_get} from "../../../http";
    import {Toast} from 'vant';
    export default {
        name: "index",
        data(){
            return{
                iccid:getStorage('check_iccid'),
                auth_status: ['未实名', '审核中', '审核不通过'],
                card_state: ["未激活", "已激活", "已停机", "已废弃", "可测试", "可激活"],
                usageInfo:{},
                filterCardInfo: {
                    msisdn: '',
                    device_state: '',//机卡状态
                    card_str_state: '',//卡状态
                    real_name_state: '',//实名状态
                    refresh_actived: '',//刷新卡状态/激活
                    is_watch_card: false,//手表卡
                    is_flow_card: false,//流量卡
                },
                recording_list: getStorage('recording_list','arr') || [],//当前站点保留的查询数据
            }
        },
        components:{
            [Toast.name]:Toast,
        },
        created(){
            this.iccid ?  this.initial() : this.$router.push({path:'/mifi/card/lookup'});
        },
        methods:{
            initial(){
                this.$store.commit('mifiCommon/changeLoadingStatus',{flag:true});
                this.$store.commit('mifiCommon/changeErrStatus',{show:false});

                _get('/api/v1/app/cards/status/usage',{
                    iccid:this.iccid,
                    type:1
                }).then(res=>{
                    this.$store.commit('mifiCommon/changeLoadingStatus',{flag:false});
                    if(res.state==1){

                        this.usageInfo = res.data;

                        // 判断当前卡状态 是都是未实名
                        if(this.usageInfo.auth_status==0 && this.usageInfo.need_auth){
                            // 判断当前站点是否存在已经实名的查
                            let checkRecordingResult = this.checkAllCardStatus();
                            if(checkRecordingResult.state==1){
                                this.iccid = checkRecordingResult.iccid;
                                setStorage('check_iccid',this.iccid);
                                this.initial()
                            }else{
                                this.$router.push({path:'/weixin/new_card/real_name'});
                            }
                        }

                        if (this.inArray(this.usageInfo.source, [1, 4]) >= 0) {
                            this.auth_status.push('手淘实名');
                        } else {
                            this.auth_status.push('已实名');
                        }//实名增加状态

                        if(!this.usageInfo.need_auth){
                            this.filterCardInfo.real_name_state = '已实名';
                        }else{
                            this.filterCardInfo.real_name_state = this.auth_status[this.usageInfo.auth_status];//实名状态
                        }

                        if (this.inArray(this.usageInfo.source, [1, 5]) >= 0 && this.usageInfo.imei) {
                            if (!this.usageInfo.imei || !this.usageInfo.fenli) {
                                this.filterCardInfo.device_state = {state: '机卡已绑定', code: 1}
                            } else {
                                if (this.usageInfo.status == 2) {
                                    this.filterCardInfo.device_state = {state: '机卡已分离停机', code: 2}
                                } else {
                                    this.filterCardInfo.device_state = {state: '机卡分离', code: 2}
                                }
                            }
                        }//机卡状态

                        this.filterCardInfo.card_str_state = this.card_state[this.usageInfo.status];//卡状态

                    }else{
                        this.$store.commit('mifiCommon/changeErrStatus',{
                            show:true,
                            errorMsg:res.msg ?res.msg:'获取数据信息失败，请稍后再试'
                        })
                    }
                })
            },
            refreshCard(){
                window.location.reload()
            },
            buyPlan(){
                this.$router.push('/mifi/plan/group');
            },
            flowCheck(){
                this.$router.push('/mifi/plan/usage');
            },
            checkOrder(){
                this.$router.push('/mifi/order/index');
            },
            couponExchange(){
                this.$router.push('/mifi/coupon/index');
            },
            inArray (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf(elem, i);
            },
            checkAllCardStatus(){
                let iccid;
                if(this.recording_list.length <=1){
                    return{
                        state:0
                    }
                }else{
                    for(let i=0;i<this.recording_list.length;i++){
                        if(this.recording_list[i].realname){
                            iccid = this.recording_list[i].iccid;
                            break
                        }
                    }
                    if(iccid){
                        return{
                            state:1,
                            iccid:iccid
                        }
                    }
                }
            },
            toRealName(){
                if(this.usageInfo.auth_status == 3 || this.usageInfo.auth_status == 4){
                    Toast({
                        position:'top',
                        message:'此卡已实名'
                    });
                    return;
                }
                if(this.usageInfo.auth_status==0 && this.usageInfo.need_auth){
                    setStorage('check_realNameSource',this.usageInfo.source);
                    this.$router.push({path:'/weixin/new_card/real_name'});
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../../assets/less/utitlies";
    .card-wrap{
        .top-info{
            display: flex;
            align-items: center;
            height: 320px;
            padding: 117px 60px 0;
            box-sizing: border-box;
            .bg-image('../../assets/imgs/mifi/card/info/card_index_bg');
            .top-info-left{
                flex: 5;
                text-align: left;
                .icon-refresh{
                    margin-left: 12px;
                    color: #f8b43e;
                }
                p{
                    &:first-child{
                        color: #0e3243;
                        font-size: 30px;
                    }
                    &:nth-child(2){
                        padding: 23px 0;
                        font-size: 40px;
                        font-weight: 500;
                    }
                }

                span{
                    display: inline-block;
                    margin-right: 12px;
                    text-align: center;
                }
            }
            .top-info-right{
                flex: 1;
                .icon-user{
                    font-size: 54px;
                    color: #f8b43e;
                }
                p{
                    padding-top: 10px;
                    color: #333;
                    font-weight: 500;
                }
            }
            .divider{
                width: 3px;
                height: 36px;
                background-color: #f6b03e;
            }
            .card-status-wrap{
                display: flex;
                justify-content: space-between;
                .status-gradient{
                    background-image: linear-gradient( 45deg, #93c8fb 25%, #497fb1 100%);
                }
                .status-gradient-green{
                    background-image: linear-gradient( 45deg, #a0d890 25%, #69b152 100%);
                }
                .status-gradient-warning{
                    background-image: linear-gradient(45deg, #f3a179 25%, #e04b4b 100%);
                }

                .card-status{
                    padding: 5px 10px;
                    border-radius: 33px;
                    color: #fff;
                }
                .card-question{
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    line-height: 33px;
                    color: #fff;
                    text-align: center;
                    background-color: #ffc641;
                }
                .card-change{
                    padding-bottom: 5px;
                    color: #f1a741;
                    border-bottom: 1px solid #f1a741;
                }
            }

        }
        .card-function-wrap{
            padding: 0 83px;
            .function-group-wrap{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 67px;
                &:first-child{
                    padding-top: 40px;
                }
                p{
                    font-size: 26px;
                    font-weight: 500;
                    color: #333;
                }
            }
           .divider{
                width: 4px;
                height: 25px;
                background-color: #c7c7c7;
            }
            .iconfont {
                display: inline-block;
                padding-bottom: 20px;
                font-size: 64px;
                color: #f8b43e;
            }
            .icon-coupon{
                padding-top: 2px;
                font-size: 60px !important;
            }
        }
        .real-name-wrap{
            img{
                display: block;
                width: 90%;
                margin: 0 auto;
                height: auto;
            }
        }
    }
</style>