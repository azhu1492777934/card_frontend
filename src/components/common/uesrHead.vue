<template>
    <div class="user-wrap">
        <div class="user-inner-wrap">
            <div class="user-name-wrap">
                <img :src="userInfo.avatar">
                <span class="user-name">{{userInfo.nickname}}</span>
            </div>
            <div>
                <span>余额:</span>
                <span class="icon-diamond-wrap">
                          <i class="icon-user-size  icon-diamond"></i>
                          {{userInfo.account.rmb}}
                      </span>
                <span class="icon-elb-wrap">
                          <i class="icon-user-size icon-elb"></i>
                          {{userInfo.account.elb}}
                      </span>
                <span @click="showDoc" class="icon-question">?</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    export default {
        name: "uesrHead",
        props:{
          userInfo:{
              type:Object
          }
        },
        data(){
            return{

            }
        },
        components: {
            [Dialog.name]: Dialog
        },
        methods:{
            showDoc() {
                Dialog.alert({
                    message: '钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等'
                })
            },
        }
    }
</script>

<style lang="less">
    .user-wrap {
        padding: 15px;
        background-color: #fff;
        .user-inner-wrap {
            display: flex;
            align-items: center;
            text-align: left;
            > div {
                &:first-child {
                    flex: 2;
                }
                &:last-child {
                    flex: 5;
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
            margin-right: 40px;
            padding: 5px;
            width: 130px;
            text-align: center;
            border: 2px solid #3BB2E6;
            border-radius: 4px;
        }
        .icon-diamond-wrap {
            margin-left: 40px;
        }
        .icon-question {
            width: 35px;
            height: 35px;
        }
        .icon-diamond {
            background-image: url("../../assets/imgs/app/icon-diamonds.png");
        }
        .icon-elb {
            background-image: url("../../assets/imgs/app/icon-elb.png");
        }
        .icon-question {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background-color: #3BB2E6;
            color: #fff;
            text-align: center;
        }
    }
</style>