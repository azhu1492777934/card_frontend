<template>
    <div class="card-wrap">
        <div class="top-info">
            <div class="top-info-left">
                <p>
                    近期查询<span class="iconfont icon-refresh"></span>
                </p>
                <p>{{iccid}}</p>
                <div class="card-status-wrap">
                    <div>
                        <span class="card-status status-gradient">未实名</span>
                        <span class="card-status status-gradient">未激活</span>
                    </div>
                    <div>
                        <span class="card-question">?</span>
                        <span class="card-change">去变更> </span>
                    </div>
                </div>
            </div>
            <span class="divider"></span>
            <div class="top-info-right">
                <span class="iconfont icon-user"></span>
                <p>去实名</p>
            </div>

        </div>
        <div class="card-function-wrap">
            <div class="function-group-wrap">
                <div>
                    <span class="iconfont icon-cart"></span>
                    <p>购买套餐</p>
                </div>
                <span class="divider"></span>
                <div class="item-function-wrap">
                    <span class="iconfont icon-info"></span>
                    <p>流量查询</p>
                </div>
                <span class="divider"></span>
                <div>
                    <span class="iconfont icon-txt"></span>
                    <p>订单查询</p>
                </div>
            </div>
            <div class="function-group-wrap">
                <div>
                    <span class="iconfont icon-coupon"></span>
                    <p>卡券兑换</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                iccid:'8986 0422 9901 0293 0385',
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
                .card-status{
                    width: 120px;
                    padding: 5px 0;
                    border-radius: 33px;
                    color: #fff;
                }
                .card-question{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    line-height: 33px;
                    color: #fff;
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
    }
</style>