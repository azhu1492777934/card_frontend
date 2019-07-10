<template>
  <div class="usage-skeletons-wrapper">
    <div class="top-wrapper">
      <div class="top-left"></div>
      <div class="top-right">
        <p></p>
        <p></p>
        <div class="tag-wrapper">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="middle-wrapper"></div>
    <div class="list-wrapper">
      <li v-for="(item,i) in list"></li>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      }
    }
  }
</script>

<style lang="less">
  .usage-skeletons-wrapper {
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    .animationMixin() {
      background-size: 400% 100%;
      background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
      animation: skeleton-loading 1.4s ease infinite;
    }

    .top-wrapper {
      display: flex;
      padding: 15px;
      box-sizing: border-box;

      .top-left {
        flex: 1;
        height: 150px;
        margin-right: 30px;
        .animationMixin();
      }

      .top-right {
        flex: 3.4;

        p {
          .animationMixin();

          &:first-child {
            height: 36px;
            margin-bottom: 15px;
          }

          &:nth-child(2) {
            height: 24px;
            margin-bottom: 40px;
          }
        }
      }

      .tag-wrapper {
        display: flex;
        align-content: space-evenly;

        span {
          flex: 1;
          height: 32px;
          margin-right: 15px;
          .animationMixin();

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .middle-wrapper {
      height: 170px;
      margin: 15px;
      .animationMixin();
    }

    .list-wrapper {
      height: calc(100vh - 450px);
      margin: 45px 15px 15px 15px;
      box-sizing: border-box;
      overflow: hidden;

      li {
        list-style: none;
        height: 70px;
        margin-bottom: 32px;
        .animationMixin();
      }

    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  }
</style>