<template>
    <div class="orderRecord" :style="{height:bodyHeight+'px'}">
       <div class="search">
          <form action="/">
            <van-search
              v-model="searchValue"
              placeholder="请输入要查询的手表手机号"
              shape="round"
              @search="onSearch"
              @cancel="onCancel"
              @clear="onSearch"
            >
              <div slot="left-icon"></div>
            </van-search>
            <b @click="onSearch"></b>
          </form>
       </div>


       <div class="tab" v-if="finished">
          <ul>
            <li v-for="(item,index) in tabList" v-bind:key="index" @click="getCurrentType(index)" :class="{'active':currentType==index}">{{item}}</li>
          </ul>
       </div>

       <div class="recordList">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getList"
          >
            
            <div  
              v-for="(item,index) in list"
              :key="index"
              >
              <div class="orderContent">
                <div>
                  <div class="planMsg">
                    <div>¥{{item.price}}</div>
                    <div>{{item.rating_name}}</div>
                  </div>
                  <div class="planDetails">
                    <div>
                      <div>订单编号:{{item.no}}</div> 
                      <div v-if="item.refund==0&&item.status==0">未支付</div>
                      <div v-if="item.refund==0&&item.status==1" >已支付</div>
                      <div v-if="item.refund==0&&item.status==2" class="rcved">已到账</div>
                      <div v-if="item.refund==2" class="refunded">已退款</div>
                      <div v-if="item.refund==1">退款中</div>
                    </div>

                    <div>{{item.rate_plan.describe}}</div>


                  </div>
                </div>
                <div class="planTime">
                  <div>下单时间：{{item.paid_at}}</div>
                  <div @click="showMe(item.id)" v-if="item.refund==0&&item.status==1||item.refund==0&&item.status==2">申请退款</div>
                      
                </div>
                <div class="phoneNo">
                  <div>手表手机号:{{item.msisdn[0]}}</div>

                </div>
              </div> 
            </div>
          </van-list>
       </div>




       <!-- 弹出框 -->
       <van-dialog
          v-model="showRefund"
          title="退款原因"
          show-cancel-button
          confirm-button-text="确认退款"
          cancel-button-text="暂不退款"
          :before-close="cfmRefund"
        >
          <div>
              <van-field
                v-model="refundInfo.brand"
                label="设备品牌："
                type="textarea"
                placeholder="请输入设备品牌"
                rows="1"
                autosize
              />
              <van-field
                v-model="refundInfo.model"
                label="设备型号："
                type="textarea"
                placeholder="请输入设备型号"
                rows="1"
                autosize
              />
              <van-field
                v-model="refundInfo.address"
                label="使用地址："
                type="textarea"
                placeholder="请输入使用地址"
                rows="1"
                autosize
              />
              <van-field
                v-model="refundInfo.reason"
                label="退款原因："
                type="textarea"
                placeholder="请输入退款原因"
                rows="1"
                autosize
              />
              
              <van-field
                v-model="refundInfo.aliAccount"
                label="支付宝账号："
                type="textarea"
                placeholder="请输入支付宝账号"
                rows="1"
                autosize
                v-show="isShowAccount"
              />
              <van-field
                v-model="refundInfo.aliName"
                label="支付宝姓名："
                type="textarea"
                placeholder="请输入支付宝姓名"
                rows="1"
                autosize
                v-show="isShowAccount"
              />
          </div>
        </van-dialog>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import { Search,List,Cell,Field,SwipeCell,Notify } from 'vant';
    import {_post, _get} from "../../http";
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
               searchValue:"",
               bodyHeight:"",
               tabList:["全部","已支付","已到账","已退款"],
               currentType:0,
               list: [],
               savedList:[],
              loading: false,
              finished: false,
              showRefund:false,
              message:"",
              currentId:"",
              isShowAccount:false,
              refundInfo: {
                brand: '',
                model: '',
                address: '',
                reason: '',
                aliAccount: '',
                aliName: '',
              },
            }
        },
        components: {
          "van-search":Search,
          "van-list":List,
          "van-cell":Cell,
          "van-field":Field,
          "van-cell-group":SwipeCell
        },
        computed: {
            ...mapState({
              authorizedUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        created(){
          // this.getList();
          if (getStorage('refundPayType') == 3) {
            this.isShowAccount = true
          }
        },
        mounted(){
          this.bodyHeight=document.documentElement.clientHeight
        },
        methods: {
          //搜索
            onSearch(){
              let data=[];
              if(this.searchValue!=""){
                if(this.list.length==0){
                  this.getCurrentList(this.currentType);
                }
                this.list.forEach((item)=>{
                  if(item.msisdn[0].indexOf(this.searchValue)!=-1){
                    data.push(item);
                  }
                })
                if(data.length==0){
                  this.list=[];
                }else{
                  this.list=data;  
                }
              }else{
                this.getCurrentList(this.currentType);
              }
              
            },
            onCancel(){

            },
            //获取当前TAB
            getCurrentType(type){
              this.currentType=type;
              this.getCurrentList(type);
              
            },
            //获取全部数据
            getList(){
              _get("/api/v1/app/order/status", {
                // user_id:64069
                user_id: getStorage("userInfo", "obj").account.user_id
              }).then(res => {
                if(res.state==1){
                  this.list=res.data[0];
                  this.savedList=res.data[0];
                }else{
                  Notify({message: res.msg})
                }
                this.loading = false;
                this.finished = true;
              
              });
            },
            //获取当前TAB数据
            getCurrentList(type){
              if(type==0){
                this.list=this.savedList;
              }else if(type==1){
                let data=[];
                this.savedList.forEach((item)=>{
                  if(item.status==1){
                    data.push(item);
                  }
                })
                this.list=data;
              }else if(type==2){
                let data=[];
                this.savedList.forEach((item)=>{
                  if(item.status==2){
                    data.push(item);
                  }
                })
                this.list=data;
              }else if(type==3){
                let data=[];
                this.savedList.forEach((item)=>{
                  if(item.refund==2){
                    data.push(item);
                  }
                })
                this.list=data;
              }else{
                this.list=[];
              }
            },
            //退款
            showMe(id){
              this.showRefund=true;
              this.currentId=id;
              this.refundInfo= {
                brand: '',
                model: '',
                address: '',
                reason: '',
                aliAccount: '',
                aliName: '',
              }
            },
            cfmRefund(action,done){
              if (action === 'confirm') {
                if (!this.refundInfo.brand) {
                  Notify({message: '请填写设备品牌'})
                  done(false); 
                  return
                }
                if (!this.refundInfo.model) {
                  Notify({message: '请填写设备型号'})
                  done(false);
                  return
                }
                if (!this.refundInfo.address) {
                  Notify({message: '请填写设备使用地址'})
                  done(false);
                  return
                }
                if (!this.refundInfo.reason) {
                  Notify({message: '请填写退款理由'})
                  done(false);
                  return
                }
                if (this.isShowAccount) {
                  if (!this.refundInfo.aliAccount) {
                    Notify({message: '请填写支付宝账号'})
                    done(false);
                    return
                  }
                  if (!this.refundInfo.aliName) {
                    Notify({message: '请填写支付宝实名验证真实姓名'})
                    done(false);
                    return
                  }
                }
                for(let i in this.refundInfo){
                  this.refundInfo[i]=this.refundInfo[i].replace(/\ +/g,"");
                  this.refundInfo[i]=this.refundInfo[i].replace(/[\r\n]/g,"");
                }
                
                _post('/api/v1/app/cards/refund', {
                  order_id: this.currentId,
                  device_brand: this.refundInfo.brand,
                  device_model: this.refundInfo.model,
                  use_address: this.refundInfo.address,
                  refund_reason: this.refundInfo.reason,
                  refund_account: this.refundInfo.aliAccount,
                  refund_account_name: this.refundInfo.aliName,
                  user_id: this.authorizedUserInfo.account.user_id
                }).then(res => {
                  if (res.state == 1) {
                    Notify({
                      message: '退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候',
                      background: '#60ce53'
                    })
                    done();
                    this.getList();
                  } else {
                    Notify({message: res.msg})
                    this.getList();
                    done(); 
                  }
                })
              } else {
                done();
              }
            },
           
        },
       
    }
</script>

<style lang="less">
  .orderRecord{
    // height:100%;
    background:url("../../assets/imgs/userCenter/bg.png")no-repeat;
    background-size:100% 100%;
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    padding:0 28px;
    .van-field__body{
      height:100%;
    }
    .search{
      position:relative;
      margin-top:10px;
      b{
        display:inline-block;
        width:43px;
        height:43px;
        background:url("../../assets/imgs/userCenter/search.png")no-repeat;
        background-size:100% 100%;
        position:absolute;
        top:30px;
        right:60px;
      }
      i{
        right:60px;
      }
      .van-search{
        background:transparent !important;
        .van-cell{
          background:rgba(29,63,209,0.45);
          border-radius:34px;
        }
        .van-field__body{
          // height:100%;
          padding-left:20px;
          height:67px;

          input::-webkit-input-placeholder{
            color:rgba(225,225,225,1);

          } 

          input:-moz-placeholder{
            color:rgba(225,225,225,1);

          } 

          input::-moz-placeholder{
            color:rgba(225,225,225,1);

          } 

          input:-ms-input-placeholder{
            color:rgba(225,225,225,1);

          } 
          .van-field__control{
            height:100%;
            font-size:26px;
            font-family:SourceHanSansSC-Normal;
            font-weight:400;
            color:rgba(225,225,225,1);
          }
        }
      }
    }



    .tab{
      font-size:28px;
      font-family:SourceHanSansSC-Regular;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin-top:20px;
      ul{
        display:flex;
        li{
          flex:1;
          height:44px;
          // background:#fff;
          line-height:44px;
          border-radius:22px;
          margin:0 10px;
          transition: all 0.5s;
        }
        .active{
          background:#fff;
          color:#3179FF;
        }
      }
    }



    .recordList{
      margin-top:67px;
      .van-cell{
        background:transparent;
      }
      .van-list__loading-text{
        color:#000;
      }
      .van-list__finished-text{
        color:#000;
      }
      .orderContent{
        background:#fff;
        box-shadow:0px 0px 27px 0px rgba(202,202,202,0.31);
        border-radius:12px;
        margin-bottom:50px;
        padding:0 23px;
        >div:nth-child(1){
          display:flex;
        }
        .planMsg{
          flex:0.25;
          display:inline-block;
          font-family:SourceHanSansSC-Bold;
          font-weight:bold;
          color:rgba(255,255,255,1);
          background:linear-gradient(-39deg,rgba(53,111,255,1),rgba(153,189,255,1));
          border-radius:17px;
          width:157px;
          height:162px;
          display:flex;
          justify-content: center;
          flex-direction: column;
          margin:-23px 23px 0 0px;
          padding:0 20px;
          >div:nth-child(1){
            font-size:38px;
          }
          >div:nth-child(2){
            font-size:28px;
            margin-top:23px;
          }
        }
        .planDetails{
          flex:0.8;
          display:inline-block;
          >div:nth-child(1){
            font-size:22px;
            font-family:SourceHanSansSC-Light;
            font-weight:300;
            color:rgba(120,120,120,1);
            display:flex;
            justify-content: space-between;
            margin:20px 0;
            >div:nth-child(2){
              font-size:22px;
              font-family:SourceHanSansSC-Normal;
              font-weight:400;
              color:rgba(62,130,255,1);
            }
          }
          >div:nth-child(2){
            font-size:24px;
            font-family:SourceHanSansSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            text-align:left;
            line-height:34px;
          }
        }

        .planTime{
          display:flex;
          justify-content: space-between;
          align-items:center;
          margin-top:15px;
          border-bottom:1px solid #DCDCDC;
          padding-bottom:10px;
          >div:nth-child(1){
            font-size:22px;
            font-family:SourceHanSansSC-Light;
            font-weight:300;
            color:rgba(120,120,120,1);
            line-height:26px;
          }
          >div:nth-child(2){
            width:150px;
            height:40px;
            border:1px solid rgba(173,173,173,1);
            border-radius:20px;
            font-size:22px;
            font-family:SourceHanSansSC-Normal;
            font-weight:400;
            color:rgba(120,120,120,1);
            line-height:40px;
          }
        }

        .phoneNo{
          font-size:22px;
          font-family:SourceHanSansSC-Light;
          font-weight:300;
          color:rgba(120,120,120,1);
          line-height:38px;
          text-align:left;
        }
      }
    }


   
    .rcved{
      color:#FF663D !important;
    }
    .refunded{
      color:#787878 !important;
    }
  }
  
</style>