<template>
    <div class="consumerRecord .van-clearfix" >
        <div>
          <div>全部</div>
          <div>时间</div>
          <div>用途</div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getList"
          >
          <div v-for="(item,index) in list" v-bind:key="index" class="consumerRecordList">
            <div>
              {{item.refresh}} <span v-if="item.type=='rmb'">钻石</span> <span v-if="item.type=='balance'">元</span>  <span v-if="item.type=='elb'">ELB</span>
              </div>
            <div>{{item.created|changeTime}}</div>
            <div>{{item.remark}}</div>
          </div>
        </van-list>
    </div>
</template>

<script>
    import { setStorage, getStorage,getUrlParam,codeParam} from "../../utilies";
    import { Search,List,Cell, Notify } from 'vant';
    import {_post, _get} from "../../http";

    export default {
        data() {
            return {
                list:[],
                page:1,
                page_size:10,
                loading: false,
                finished: false,
            }
        },
        components: {
          "van-list":List,
        },
        computed: {
            
        },
        created(){
        },
        mounted(){


        },
        methods: {
          getList(){
             _get("/accountCenter/v2/user/account-log?" + codeParam({
                page: this.page,
                page_size:this.page_size
             }, 'get'))
            .then(res => {
              if(res.error==0){
                let data=this.list.concat(res.data.list);
                this.list=data;
                this.loading=false;
                if(res.data.page<res.data.pages){
                  this.page+=1;
                }else{
                  this.finished=true;
                }
              }else{
                Notify({message: res.msg});
              }
            })
          }
          
        },
        filters:{
          changeTime(time){
                let now = new Date(time * 1000),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
          }
        }
       
    }
</script>

<style lang="less">
    .consumerRecord{
      position: absolute;
      top:0;
      right:0;
      left:0;
      bottom:0;
      background:#fff;
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