<template>
    <div class="plan-group-wrapper">
        <div class="banner-wrapper">
            <img src="../../../assets/imgs/mifi/plan_group/banner_group.jpg" alt="">
        </div>
        <div class="title-wrap">
            <p>
                <span></span>
                <span>套餐分类</span>
                <span></span>
            </p>
        </div>
        <div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "plan_group",
        data(){
            return {

            }
        },
        created(){

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
            background-color: #fffbf3;
            span:nth-child(2){
                padding:0 18px;
                font-size: 34px;
                font-weight: 500;
                color: #f8b43e;
            }

        }
    }

</style>