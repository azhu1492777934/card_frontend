<template>
    <div class="card-wrap">
        <user-header v-show="isShowUser" :userInfoData="authorizeUserInfo" v-if="global_variables.packed_project!='mifi'"></user-header>
        <div class="top-info">
            <div class="top-info-left">

                <div class="card-recent-wrap">
                    <p>近期查询</p>
                    <div class="card-status-wrap">
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
                </div>
                <p class="iccid-wrap">{{iccid}}</p>

                <div class="card-info">
                    <div>
                        <span>{{filterCardInfo.used_flow}}</span>
                        <p>已用流量</p>
                    </div>
                    <span class="divider"></span>
                    <div>
                        <span>{{filterCardInfo.surplus_flow}}</span>
                        <p>剩余流量</p>
                    </div>
                    <span class="divider"></span>
                    <div>
                        <span>{{filterCardInfo.today_used_flow}}</span>
                        <p>今日用量</p>
                    </div>

                    <span class="divider"></span>
                    <div @click="changedCard">
                        <span class="iconfont icon-exchange"></span>
                        <p>更换卡号</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-function-wrap">
            <div class="function-group-wrap">
                <div @click="buyPlan" v-if="!(this.global_variables.device === 'iphone')">
                    <span class="iconfont icon-recharge"></span>
                    <p>购买套餐</p>
                </div>
                <span class="divider" v-if="!(this.global_variables.device === 'iphone')"></span>
                <div @click="flowCheck" class="item-function-wrap">
                    <span class="iconfont icon-info"></span>
                    <p>流量查询</p>
                </div>
                <span class="divider" v-if="!(this.global_variables.device === 'iphone')"></span>
                <div @click="checkOrder" v-if="!(this.global_variables.device === 'iphone')">
                    <span class="iconfont icon-txt"></span>
                    <p>订单查询</p>
                </div>
            </div>
            <div class="function-group-wrap">
                <div @click="couponExchange">
                    <span class="iconfont icon-coupon"></span>
                    <p>卡券兑换</p>
                </div>
                <span class="divider"></span>
                <div @click="toQuestion">
                    <span class="iconfont icon-question"></span>
                    <p>问题中心</p>
                </div>
                <!--<span class="divider divider-transparent"></span>-->
                <!--<div class="empty-space">-->
                    <!--<span class="iconfont icon-question"></span>-->
                    <!--<p>问题中心</p>-->
                <!--</div>-->
                <span class="divider"></span>
                <div class="change-network-wrap" @click="toChangeNework">
                    <span class="iconfont icon-change"></span>
                    <p>网速慢,切换网络</p>
                </div>
            </div>
            <div class="function-group-wrap">
                <div @click="toChangeCard">
                    <span class="iconfont icon-changeCard"></span>
                    <p>卡更换</p>
                </div>
                <span class="divider"></span>
                <div @click="toChangeEq">
                    <span class="iconfont icon-changeEq"></span>
                    <p>设备更换</p>
                </div>
               
                <span class="divider" style="opacity:0"></span>
                <div >
                    
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import userHeader from '../../../components/common/uesrHead'
    import {getStorage,setStorage,toDecimal} from "../../../utilies";
    import {_get} from "../../../http";
    import {Toast,Dialog} from 'vant';
    export default {
        name: "index",
        data(){
            return{
                iccid:getStorage('check_iccid'),
                auth_status: ['未实名', '审核中', '审核不通过'],
                card_state: ["未激活", "已激活", "已停机", "已废弃", "可测试", "可激活"],
                usageInfo:{},
                filterCardInfo: {
                    today_used_flow:'',
                    used_flow:'',
                    surplus_flow:'',
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
        computed: {
            ...mapState({
                isShowUser: state => state.userInfo.showUser,
                authorizeUserInfo: state => state.userInfo.userInfoInner,
            }),
        },
        components:{
            [Toast.name]:Toast,
            userHeader,
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

                        setStorage('check_realNameSource',res.data.source);
                        this.usageInfo = res.data;


                        //活动
                        let activitySourceArray=[1,7,11,16];
                        // if(activitySourceArray.indexOf(res.data.source)!=-1){
                        //     Dialog.confirm({
                        //       title: '活动通知',
                        //       message: '尊敬的客户，您好！即日起我司将推出各种“优惠活动套餐”和”价格美丽的超大流量套餐（527G、465G）”，如需参与活动请点击下方”同意“申请更换新卡后选购即可，如有疑问请联系我司在线客服，感谢您的支持！活动时间：11月25日-12月1日',
                        //       confirmButtonText:"同意"
                        //     }).then(() => {
                        //       this.toChangeCard();
                        //     }).catch(() => {
                        //     });
                        // }
                        

                        // 当日用量
                        if( res.data.today_used_flow >= 0){
                            res.data.today_used_flow >= 1024 ? this.filterCardInfo.today_used_flow = `${toDecimal(res.data.today_used_flow / 1024)}G` :
                                this.filterCardInfo.today_used_flow = `${toDecimal(res.data.today_used_flow)}M`;
                        }else{
                            this.filterCardInfo.today_used_flo = '0.00M'
                        }

                        if(res.data.used >=0 && res.data.total >=0){
                            // 流量
                            res.data.used >= 1024 ?
                                this.filterCardInfo.used_flow =  `${toDecimal(res.data.used / 1024)}G` :
                                this.filterCardInfo.used_flow = `${toDecimal(res.data.used)}M`;
                            if(res.data.total>=0){
                                res.data.used >=1024 ?
                                    this.filterCardInfo.surplus_flow = `${toDecimal((res.data.total - res.data.used) / 1024)}G`:
                                    this.filterCardInfo.surplus_flow = `${toDecimal(res.data.total - res.data.used)}M`

                            }else {
                                this.filterCardInfo.surplus_flow = '无限量';
                            }
                        }else{
                            this.filterCardInfo.used_flow = '暂无';
                            this.filterCardInfo.surplus_flow = '暂无';
                        }


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
                        
                        localStorage.setItem("is_flow_card",1);
                    }else{
                        this.$store.commit('mifiCommon/changeErrStatus',{
                            show:true,
                            errorMsg:res.msg ?res.msg:'获取数据信息失败，请稍后再试'
                        })
                    }
                })
            },
            buyPlan(){
                let _this=this;
                
                    if(this.usageInfo.source==23){
                        if(this.usageInfo.activated_date!=""){
                          let time =this.dateDiff(this.usageInfo.activated_date,this.usageInfo.current_time);
                          if(time>360){
                            Dialog.confirm({
                              title: '提示',
                              message: '您的物联网卡已到期,无法继续充值,请更换卡',
                              confirmButtonText:"去换卡",
                               cancelButtonText:"取消",
                            }).then(() => {
                              // on confirm
                              _this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)
                            }).catch(() => {
                              // on cancel
                              return false;
                            });
                          }else if(360-time<=30){
                            let overplus=(360-time).toFixed(0);
                            Dialog.confirm({
                              title: '提示',
                              message: '您的物联网卡还有'+overplus+'天到期,到期后无法继续充值使用,请更换卡',
                              confirmButtonText:"去换卡",
                               cancelButtonText:"取消",
                            }).then(() => {
                              // on confirm
                              _this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)
                            }).catch(() => {
                              // on cancel
                              return false;
                            });
                          }else{
                                this.$router.push('/mifi/plan/group');
                          }
                        }else{
                            this.$router.push('/mifi/plan/group');
                        }
                    }else{
                        this.$router.push('/mifi/plan/group');
                    }
                },
            flowCheck(){this.$router.push('/mifi/plan/usage');},
            checkOrder(){this.$router.push('/mifi/order/index');},
            couponExchange(){
                let _this=this;
                
                    if(this.usageInfo.source==23){
                        if(this.usageInfo.activated_date!=""){
                          let time =this.dateDiff(this.usageInfo.activated_date,this.usageInfo.current_time);
                          if(time>360){
                            Dialog.confirm({
                              title: '提示',
                              message: '您的物联网卡已到期,无法继续充值,请更换卡',
                              confirmButtonText:"去换卡",
                               cancelButtonText:"取消",
                            }).then(() => {
                              // on confirm
                              _this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)
                            }).catch(() => {
                              // on cancel
                              return false;
                            });
                          }else if(360-time<=30){
                            let overplus=(360-time).toFixed(0);
                            Dialog.confirm({
                              title: '提示',
                              message: '您的物联网卡还有'+overplus+'天到期,到期后无法继续充值使用,请更换卡',
                              confirmButtonText:"去换卡",
                               cancelButtonText:"取消",
                            }).then(() => {
                              // on confirm
                              _this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)
                            }).catch(() => {
                              // on cancel
                              return false;
                            });
                          }else{
                                this.$router.push('/mifi/coupon/index');
                          }
                        }else{
                            this.$router.push('/mifi/coupon/index');
                        }
                    }else{
                        this.$router.push('/mifi/coupon/index');
                    }
                },
            toQuestion(){this.$router.push('/weixin/question/index');},
            changedCard(){this.$router.push('/mifi/card/lookup')},
            toChangeNework(){this.$router.push('/mifi/card/change_network')},
            toChangeCard(){this.$router.push({name:'eqReplaceMent',params:{status:1}});localStorage.setItem("replaceStatus",1)},
            toChangeEq(){this.$router.push({name:'eqReplaceMent',params:{status:0}});localStorage.setItem("replaceStatus",0)},
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
            },
            dateDiff(date1, date2) {
              var type1 = typeof date1,
                type2 = typeof date2;
              if (type1 == "string") {
                date1 = this.stringToTime(date1);
              } else if (date1.getTime) {
                date1 = date1.getTime();
              }
              if (type2 == "string") {
                date2 = this.stringToTime(date2);
              } else if (date2.getTime) {
                date2 = date2.getTime();
              }
              return (date2 - date1) / 1000 / 60 / 60 / 24; //除1000是毫秒，不加是秒
            },
             //字符串转成Time(dateDiff)所需方法
            stringToTime(string) {
              var f = string.split(" ", 2);
              var d = (f[0] ? f[0] : "").split("-", 3);
              var t = (f[1] ? f[1] : "").split(":", 3);
              return new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
              ).getTime();
            },
        }
    }
</script>

<style lang="less">
    @import "../../../assets/less/utitlies";
    .card-wrap{
        .top-info{
            display: flex;
            align-items: center;
            width: 100%;
            height: 320px;
            padding: 110px 60px 0;
            box-sizing: border-box;
            .bg-image('../../assets/imgs/mifi/card/info/card_index_bg');
            .top-info-left{
                flex: 5;
                text-align: left;
                .card-recent-wrap{
                    display: flex;
                    justify-content: space-between;
                    p{
                        color: #0e3243;
                        font-size: 30px;
                    }
                }
                .iccid-wrap{
                    padding: 15px 0;
                    font-size: 40px;
                    font-weight: 500;
                }

            }
            .card-info{
                display: flex;
                flex: 1;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                p{padding-top:8px;font-size: 24px;color: #0e3243;}
                span{font-size: 32px;color: #f1a741;}
            }
            .divider{
                width: 3px;
                height: 26px;
                background-color: #f6b03e;
            }
            .card-status-wrap{
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
                    display: inline-block;
                    margin-right: 12px;
                    padding: 5px 10px;
                    border-radius: 33px;
                    font-size: 22px;
                    color: #fff;
                    text-align: center;
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
            padding: 0 60px;
            .function-group-wrap{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 67px;
                &:first-child{
                    padding-top: 40px;
                }
                >div{
                    width: 160px;
                }
                p{
                    font-size: 26px;
                    font-weight: 500;
                    color: #333;
                }
                .empty-space{
                    p,.iconfont{color: transparent!important;}
                }
            }
            .change-network-wrap{
                .iconfont{
                    padding-bottom: 13px;
                    color: #7aef95;
                }
                p{
                    position: relative;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 18px;
                }
            }
           .divider{
                width: 4px;
                height: 25px;
                background-color: #c7c7c7;
            }
            .divider-transparent{
                background-color: transparent !important;
            }
            .iconfont {
                display: inline-block;
                padding-bottom: 20px;
                font-size: 64px;
                color: #f8b43e;
                vertical-align: text-top;
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