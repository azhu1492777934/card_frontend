<template>
   <div class="speedup-wrap">
       <div class="title">购买加速包</div>
       <ul class="recharge-wrap">
           <li @click="chooseItem(index)" v-for="(item,index) in list" :class="[{'choose-active':activeIndex==index}]">
               <span>{{item.name}}</span>
               <span>{{item.price}}</span>
           </li>
       </ul>
       <div class="btn-recharge-wrap">
           <button id="btn-recharge" @click="recharge(activeIndex)" type="button">充值</button>
       </div>
   </div>
</template>

<style lang="less">
    .speedup-wrap{
        .title {
            padding: 35px 0;
            background-image: linear-gradient(167deg, #00d2ff 0%, #3a7bd5 100%);
            color: #fff;
            text-align: center;
            font-size: 34px;
        }
        .recharge-wrap {
            font-size: 32px;
            background-color: #fff;
            li{
                display: flex;
                border-bottom: 1px solid #dedede;
                &.choose-active{
                    box-shadow: inset 0px 0px 250px #9adaf6;
                }
                span{
                    flex: 1;
                    padding: 28px 40px;
                    &:first-child{
                        color: #67686a;
                    }
                    &:last-child{
                        color: #31b3ef;
                        text-align: right;
                    }
                }
            }

        }
        .btn-recharge-wrap{
            position: absolute;
            width: 100%;
            bottom: 20px;
            button{
                display: block;
                width: 50%;
                margin: 0 auto;
                padding: 20px 0;
                color: #fff;
                font-size: 28px;
                background: #38b5ed;
                border-radius: 40px;
            }
        }

    }
</style>


<script>
    // @ is an alias to /src
    export default {
        name: "home",
        props: {
            list: {
                type: Array,
            }
        },
        data() {
            return {
                activeIndex:0

            }
        },
        created() {


        },
        methods: {
            inArray:function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf( elem, i);
            },
            chooseItem:function(index){
                //切换当前选项
                this.activeIndex = index
            },
            recharge:function (speedUpIndex) {
                this.$emit('rechargeSpeedup',speedUpIndex);//当前选中的加速包的index
            }
        }
    };
</script>

