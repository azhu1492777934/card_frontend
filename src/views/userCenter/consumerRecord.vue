<template>
    <div class="consumerRecord" >
        <div>
          <div>全部</div>
          <div>时间</div>
          <div>用途</div>
        </div>

        <div v-for="(item,index) in list" v-bind:key="index" class="consumerRecordList">
          <div>12312钻石</div>
          <div>2019/10/19</div>
          <div>购买套餐</div>
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
    .consumerRecord{
        >div:nth-child(1){
          display:flex;
          font-size:30px;
          font-family:SourceHanSansSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          border-bottom:1px solid #DCDCDC;
          padding:25px;
          >div{
            flex:1;
          }
        }
        .consumerRecordList{
          font-size:26px;
          font-family:SourceHanSansSC-Normal;
          font-weight:400;
          color:rgba(51,51,51,1);
          display:flex;
          padding:25px;
          border-bottom:1px solid #DCDCDC;
          
          >div{
            flex:1;
          }
        }
    }
  
</style>