<template>
    <div class="cardPackage" >
       <div v-for="(item,index) in list" v-bind:key="index">
           <div>
               <div></div>
           </div>
            <div>
                <div>MSISDN:12748978394</div>
                <div>ICCID:124234237</div>
                <div>已实名</div>
            </div>
       </div>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam} from "../../utilies";
    import { Search,List,Cell } from 'vant';
    export default {
        data() {
            return {
                list:[{},{}]
            }
        },
        components: {
        
        },
        computed: {
            
        },
        created(){

        },
        mounted(){


        },
        methods: {
           
          
        },
       
    }
</script>

<style lang="less">
    .cardPackage{
        overflow:hidden;
            >div{
                width:691px;
                height:207px;
                background:url("../../assets/imgs/userCenter/pkgBg1.png")no-repeat;
                background-size:100% 100%;
                margin:10px auto;   
                font-size:30px;
                font-family:SourceHanSansSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                text-align:left;
                display:flex;
                align-items: center;
                >div:nth-child(1){
                    width:150px;
                    height:150px;
                    background:#fff;
                    border-radius:14px;
                    margin-left:48px;
                    display:flex;
                    align-items:center;
                    justify-content: center;
                    >div:nth-child(1){
                        width:92px;
                        height:110px;
                        background:url("../../assets/imgs/userCenter/dianxin.png")no-repeat;
                        background-size:100% 100%;

                    }
                }
                >div:nth-child(2){
                    margin-left:36px;
                    line-height:50px;
                    >div:nth-child(3){
                        width:112px;
                        height:32px;
                        background:rgba(13,214,108,1);
                        border-radius:16px;
                        font-size:24px;
                        text-align:center;
                        line-height:32px;
                    }
                }
                
            }
        
    }
  
</style>