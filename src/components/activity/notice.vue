<template>
  <div class="notice">
    <div class="noticeWrapper">
      <div class="content">
        {{content}}
      </div>
      <div class="footer">
        <div class="textLeft" @click="textLeftClick">
          {{textLeft}}
        </div>
        <div class="textRight" @click="textRightClick">
          {{textRight}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  props: {
    content: String,
    textRight: String,
    textLeft: String,
  },
  data() {
    return {
    }
  },
  methods: {
    textRightClick() {
      this.$emit('textRightClick');
    },
    textLeftClick() {
      this.$emit('textLeftClick');
    }
  }
}
</script>

<style lang="less" scoped>
  .notice {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 750px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background:rgba(83,83,83,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    
    .noticeWrapper {
      width: 80%;
      height: 380px;
      background: #f5f5f5;
      border-radius: 10px;
      box-shadow:5px 5px 10px #333;
      .content {
        width: 100%;
        height: 260px;
        padding: 40px 40px;
        letter-spacing: 2px;
        text-indent: 60px;
        box-sizing: border-box;
        font-size: 30px;
        display: flex;
        line-height: 45px;
        text-align: left;
      }
      .footer {
        width: 100%;
        height: 120px;
        display: flex;
        .textLeft {
          flex: 1;
          margin: 25px 30px;
          font-size: 28px;
          font-weight: 600;
          color: #333;
          border: 2px solid #333;
          line-height: 60px;
          border-radius: 8px;
          letter-spacing: 2px;
        }
        .textRight {
          flex: 1;
          margin: 25px 30px;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          background: #38b5ed;
          line-height: 60px;
          border-radius: 8px;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
