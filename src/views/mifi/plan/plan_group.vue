<template>
    <div class="plan-group-wrapper">
        <div ref="banner" class="banner-wrapper">
            <img src="../../../assets/imgs/mifi/plan_group/banner_group.jpg" alt="">
        </div>
        <div ref="title" class="title-wrap">
            <p class="deco-title">
                <span class="deco-left deco"></span>
                <span>套餐分类</span>
                <span class="deco"></span>
            </p>
        </div>
       <div class="group-list-wrap">
           <ul v-if="JSON.stringify(group_list)!='[]'" ref="planGroup" >
               <li v-for="(item,index) in group_list" @click="toPlanList(index)">
                    <span>{{item.plan_group_name}}</span>
                    <span class="iconfont icon-rightArrow"></span>
               </li>
           </ul>
           <div v-if="showNoData">
               <img class="noOrderPic" src="../../../assets/imgs/mifi/common/noData@2x.png" alt="">
           </div>
       </div>
    </div>
</template>

<script>
    import {_get} from "../../../http";
    import {getStorage,setStorage} from "../../../utilies";

    export default {
        name: "plan_group",
        data(){
            return {
                showNoData: false,
                iccid:getStorage('check_iccid'),
                group_list:[],
            }
        },
        created(){
            this.iccid ? this.initial() : this.$router.push({path:'/mifi/card/lookup'});
        },
        methods:{
            initial(){
                // 初始化请求
                this.$store.commit('mifiCommon/changeLoadingStatus',{flag:true});
                this.$store.commit('mifiCommon/changeErrStatus',{show:false});

                _get('/api/v1/app/plan_group_list',{
                    iccid:this.iccid
                }).then(res=>{

                    this.$store.commit('mifiCommon/changeLoadingStatus',{flag:false});
                    if(res.state==1){
                        this.group_list = res.data;

                        if(JSON.stringify(res.data)!='[]'){
                            this.$nextTick(()=>{
                                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                                    refBanner = this.$refs.banner.offsetHeight,
                                    refTitle = this.$refs.title.offsetHeight,
                                    userHeight = getStorage('userHeight');
                                if (this.client_type == 'wechat' || this.client_type == 'alipay') {
                                    this.$refs.planGroup.style.height = (clientHeight - refBanner - refTitle - userHeight - 40) + 'px'
                                } else {
                                    this.$refs.planGroup.style.height = (clientHeight - refBanner - refTitle - 40) + 'px'
                                }
                            })
                        }else{
                            this.showNoData = true;
                        }
                    }else{
                        this.$store.commit('mifiCommon/changeErrStatus',{
                            show:true,
                            errorMsg:res.msg ?res.msg:'获取数据信息失败，请稍后再试'
                        })
                    }
                })
            },

            toPlanList(index){
                let id = this.group_list[index].plan_group_id;
                setStorage('plan_group_id',id);
                this.$router.push('/mifi/plan/list')
            }
        }
    }
</script>

<style lang="less">

    .plan-group-wrapper{
        .banner-wrapper{
            img{
                display: block;
                width: 100%;
                height: 389px;
            }
        }
        .title-wrap{
            padding: 25px 0;
            margin-bottom: 20px;
            background-color: #fffbf3;
            span:nth-child(2){
                padding:0 18px;
                font-size: 34px;
                font-weight: 500;
                color: #f8b43e;
            }

        }
        .group-list-wrap{
            padding: 0 54px;
            -webkit-overflow-scrolling:touch;
            ul{
                overflow: auto;
            }
            li{
                display: flex;
                justify-content: space-between;
                padding: 28px 0;
                font-size: 30px;
                font-weight: 500;
                color: #595959;
                border-bottom: 3px solid #efece6;
                span{
                    &:last-child{
                       color: #aaa;
                    }
                }
            }
        }
    }

</style>