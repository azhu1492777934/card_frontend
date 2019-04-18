<template>
    <div class="helpCenter">
       <div class="items" v-for="(item,index) in itemsList" v-bind:key="index" >
          <div @click="showCurrent(index,activeType)">
            <div :class="{'activated':activated==index&&activeType}"></div><div>{{item.title}}</div>
          </div>
          <div v-if="activated==index&&activeType">
              <van-collapse v-model="activeName" accordion>
                <van-collapse-item :title="item2.title" :name="index2+1" v-for='(item2,index2) in item.childTitle' v-bind:key="index2">
                  {{item2.content}}
                </van-collapse-item>
              </van-collapse>
          </div>
       </div>
    </div>
</template>

<script>
  import { Collapse, CollapseItem } from 'vant';
  import questionList from "./helpQuestion.js";
    export default {
        data() {
            return {
              itemsList:questionList,
              activated:0,
              activeName:"",
              activeType:false
            }
        },
        components: {
            "vanCollapse":Collapse,
            "vanCollapseItem":CollapseItem
        },
        created() {
        },
        methods: {
          showCurrent(index){
            if(this.activated==index){
              this.activeType=!this.activeType;
            }else{
              this.activeType=true;
              this.activated=index;
            }
          }
        }
    }
</script>

<style lang="less">
.helpCenter{
  height:100%;
  background:#F9FAFC;
  border-top:1px solid #f9fafc;
  .items{
    
    >div:nth-child(1){
      background:#fff;
      margin:10px 0;
      line-height:102px;
      font-size:30px;
      font-family:SourceHanSansSC-Normal;
      font-weight:400;
      color:rgba(44,37,29,1);
      text-align:left;
      height:102px;
      display:flex;
      align-items:center;
      >div:nth-child(1){        
        width:38px;
        height:38px;
        background:url("./img/arrow1.png")no-repeat;
        background-size:100% 100%;
        margin:0 37px 0 49px;
        transition: All 0.4s ease-in-out;
        -webkit-transition: All 0.4s ease-in-out;
        -moz-transition: All 0.4s ease-in-out;
        -o-transition: All 0.4s ease-in-out;
      }
      .activated{
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        -ms-transform: rotate(90deg);

      }
     
      >div:nth-child(2){
        flex:1;
      }
    }

    >div:nth-child(2){
      height:100%;
      background:#fff;
      text-align:left;
      .van-cell{
        padding-left:50px;
      }
      .van-collapse-item__content{
        padding-left:50px;
        background:#F9FAFC;
      }
    }
   
  }
}

</style>