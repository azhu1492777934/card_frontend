<template>
  <div class="commonProblem">
    <div v-for="(item,index) in problemList" v-bind:key="index">
      <div>
        <p>{{item.id}}</p>
        <p>{{item.title}}</p>
      </div>
      <div v-for="(inner_item,inner_index) in item.children" v-bind:key="inner_index">
        <div>{{inner_item.title}}</div>
        <div>{{inner_item.content}}</div>
        <div v-if="inner_item.content2">{{inner_item.content2}}</div>
        <div v-if="inner_item.content3">{{inner_item.content3}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import problemList from "./problemList.js";

  export default {
    name: "home",
    data() {
      return {
        problemList: problemList
      };
    },
    components: {},
    created() {
    },
    methods: {}
  };
</script>

<style lang="less">
  .commonProblem {
    > div {
      > div:nth-child(1) {
        height: 228px;
        background: #00CA9D;
        display: flex;
        flex-direction: column;
        justify-content: center;

        > p:nth-child(1) {
          font-size: 88px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }

        > p:nth-child(2) {
          font-size: 38px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
      }

      > div:not(:first-child) {
        padding: 30px;
        text-align: left;

        > div:nth-child(1) {
          font-size: 28px;
          font-weight: 500;
          color: rgba(46, 46, 46, 1);
        }

        > div:nth-child(2) {
          margin-top: 40px;
          font-size: 24px;
          color: #494949;
          line-height: 40px;
        }

        > div:nth-child(3) {
          margin-top: 40px;
          font-size: 24px;
          color: #494949;
          line-height: 40px;

        }

        > div:nth-child(4) {
          margin-top: 40px;
          font-size: 24px;
          color: #494949;
          line-height: 40px;

        }
      }
    }
  }
</style>

