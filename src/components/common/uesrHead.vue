<template>
    <div class="user-wrap">
        <div class="user-inner-wrap">
            <div class="user-name-wrap">
                <img :src="getUserInfo.avatar">
                <span class="user-name">{{getUserInfo.nickname}}</span>
            </div>
            <div >
                <span>余额:</span>
                <span class="icon-diamond-wrap" @click="showDoc()">
                          <i class="icon-user-size  icon-diamond"></i>
                          {{getUserInfo.account.balance}}
                      </span>
                <!-- <span>ELB:</span> -->

                <!-- <span class="icon-elb-wrap" @click="showDoc(1)">
                          <i class="icon-user-size icon-elb"></i>
                          {{getUserInfo.account.elb}}
                      </span> -->
                <span @click="showDoc" class="tip-wrap">!</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {Dialog} from 'vant'
    export default {
        name: "uesrHead",
        props:{
            userInfoData:{
                type:Object
            },
        },
        computed: {
            ...mapState({
                getUserInfo: state => state.userInfo.userInfoInner
            }),
        },
        components: {
            [Dialog.name]: Dialog
        },
        methods:{
            showDoc(type) {
                let msg;
                //  if(type==0){
                //     msg="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额;"
                //  }else{
                    // msg="ELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等;"

                //  }

                msg="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录"
                Dialog.alert({
                    message: msg
                })
            },
        }
    }
</script>

<style lang="less">
    .user-wrap {
        height: 60px;
        padding: 15px;
        background-color: #fff;
        .user-inner-wrap {
            display: flex;
            align-items: center;
            text-align: left;
            justify-content: space-between;
            > div {
                &:first-child {
                    flex: 2;
                }
                &:last-child {
                    padding-left:50px;
                }
            }
        }
        span {
            vertical-align: middle;
        }
        .user-name-wrap {
            img {
                display: inline-block;
                width: 58px;
                height: 58px;
                background-color: #f0f0f0;
                vertical-align: middle;
            }
            .user-name {
                display: inline-block;
                max-width: 130px;
                font-size: 22px;
                padding-left: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .icon-user-size {
            position: absolute;
            left: -20px;
            top: 50%;
            margin-top: -20px;
            display: inline-block;
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
        }
        .icon-diamond-wrap,
        .icon-elb-wrap {
            position: relative;
            display: inline-block;
            margin-right: 20px;
            padding: 5px;
            width: 130px;
            text-align: center;
            border: 2px solid #3BB2E6;
            border-radius: 4px;
        }
        .icon-diamond-wrap{
            margin-left:20px;
        }
        .icon-elb-wrap {
            margin-left: 20px;
        }

        .tip-wrap {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background-color: #3BB2E6;
            color: #fff;
            text-align: center;
        }
        .icon-diamond {
            background-image: url("../../assets/imgs/userCenter/money.png");
        }
        .icon-elb {
            background-image: url("../../assets/imgs/app/icon-elb.png");
        }
    }
</style>
