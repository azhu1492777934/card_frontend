<template>
   <div class="refund-applying-wrap">
        <ul>
            <li>
                <span>设备品牌</span>
                <input v-model="refundInfo.brand" placeholder="请输入设备品牌" type="text">
            </li>
            <li>
                <span>设备型号</span>
                <input v-model="refundInfo.model" placeholder="请输入设备型号" type="text">
            </li>
            <li>
                <span>使用地址</span>
                <input v-model="refundInfo.address" placeholder="请输入设备使用地址" type="text">
            </li>
            <li>
                <span>退款原因</span>
                <input v-model="refundInfo.reason" placeholder="请输入退款原因" type="text">
            </li>

            <li v-show="isShowAccount">
                <span>支付宝账号</span>
                <input v-model="refundInfo.aliAccount" placeholder="请填写支付宝账号" type="text">
            </li>

             <li v-show="isShowAccount">
                 <span>支付宝姓名</span>
                 <input v-model="refundInfo.aliName" placeholder="请填写支付宝实名验证真实姓名" type="text">
             </li>
        </ul>

       <card-button @clickThrotle="btnRefund" :btnText="'提交申请'">
           <button @click="btnRefund" class="btn"></button>
       </card-button>


   </div>
</template>

<style lang="less">
    @import "../../assets/less/common";
    html, body, #app, .inner-wrap, .refund-applying-wrap {
        height: 100%;
        background-color: #f9fafc;
    }
    .refund-applying-wrap{
        ul{
            li{
                display: flex;
                padding: 30px 15px;
                font-size: 30px;
                background-color: #fff;
                box-sizing: border-box;
                span{
                    flex: 2;
                    color:#2c251d;
                }
                input{
                    flex: 5;
                    color:#595959;
                }
                &:nth-child(odd){
                    border-bottom: 1px solid #f5f5f5;
                }
                &:nth-child(2),
                &:nth-child(4){
                    margin-bottom: 40px;
                }
            }
        }
        .btn-wrap{
            button{
                width: 80%;
                margin: 60px auto 0;
                padding: 20px 0;
                font-size: 30px;
                background-color: #dca85f;
                color: #fff;
                border-radius: 10px;

            }
        }
    }
</style>

<script>
    // @ is an alias to /src
    import {_post, _get} from "../../http";
    import {getStorage} from "../../utilies";
    import {Notify,Popup} from "vant";
    import cardButton from "../../components/button";

    import {mapState} from 'vuex'


    export default {
        name: "home",

        data() {
            return {
                order_id:getStorage('refundOrderId'),
                refundInfo:{
                    brand:'',
                    model:'',
                    address:'',
                    reason:'',
                    aliAccount:'',
                    aliName:'',
                },
                isShowAccount:false
            };
        },
        computed: {
            ...mapState({
                authorizedUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        components: {
            cardButton,
            [Notify.name]:Notify,
            [Popup.name]:Popup,
        },
        created() {

            if(!this.authorizedUserInfo.account.user_id){
                Notify({message:'请在微信或支付宝客户端查询'});
                return
            }

            if(getStorage('refundPayType')==3){
                this.isShowAccount = true
            }
        },
        methods: {
            btnRefund() {

                let _this = this;

                if(!this.refundInfo.brand){
                    Notify({message:'请填写设备品牌'})
                    return
                }
                if(!this.refundInfo.model){
                    Notify({message:'请填写设备型号'})
                    return
                }
                if(!this.refundInfo.address){
                    Notify({message:'请填写设备使用地址'})
                    return
                }
                if(!this.refundInfo.reason){
                    Notify({message:'请填写退款理由'})
                    return
                }

                if(this.isShowAccount){
                    if(!this.refundInfo.aliAccount){
                        Notify({message:'请填写支付宝账号'})
                        return
                    }
                    if(!this.refundInfo.aliName){
                        Notify({message:'请填写支付宝实名验证真实姓名'})
                        return
                    }

                }

                _post('/api/v1/app/cards/refund',{
                    order_id:this.order_id,
                    device_brand:this.refundInfo.brand,
                    device_model:this.refundInfo.model,
                    use_address:this.refundInfo.address,
                    refund_reason:this.refundInfo.reason,
                    refund_account:this.refundInfo.aliAccount,
                    refund_account_name:this.refundInfo.aliName,
                    user_id:this.authorizedUserInfo.account.user_id
                }).then(res=>{
                    if(res.state==1){
                        Notify({
                            message:'退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候',
                            background:'#60ce53'
                        })
                        setTimeout(function(){
                            _this.$router.push({path:'/weixin/refund/index'});

                        },1500)
                    }else{
                        Notify({message:res.msg})
                    }
                })

            }//申请退款
        }
    };
</script>

