<template>
  <div class="release-plan-wrap">
    <div class="release-plan-content" v-for="(item,index) in planList" v-bind:key="index">
      <div class="release-plan-top">
        <div>
          <div>签约卡号</div>
          <div>{{item.iccid}}</div>
        </div>
        <div>
          <div>签约套餐</div>
          <div>{{item.rating_name}}</div>
        </div>
      </div>

      <div class="release-plan-bottom">
        <div>签约时间:{{item.created_at}}</div>
        <card-button @clickThrotle="releasePlan(item.renew_id)" :btnText="'解约'"></card-button>
      </div>
    </div>
    <div v-if="planList.length==0" class="warnMsg">
      <img src="../../assets/imgs/mifi/common/noData@2x.png" alt="">
    </div>
  </div>
</template>

<style lang="less">
html,
body,
#app,
.release-plan-wrap {
  height: 100%;
}
.release-plan-wrap {
 
  .warnMsg{
    img{
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
    }
  }
  .border-radius-10 {
    width: 80%;
    border-radius: 10px;
  }
  .release-plan-content {
    width: 726px;
    height: 188px;
    background: url("../../assets/imgs/question/release_plan _bg.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
    .release-plan-top {
      width: 100%;
      height: 135px;
      display: flex;
      align-items: center;
      justify-content: center;

      > div:nth-child(1) {
        width: 50%;
        :nth-child(1) {
          font-size: 28px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        :nth-child(2) {
          font-size: 24px;
          font-weight: 400;
          margin-top: 18px;
        }
      }
      > div:nth-child(2) {
        width: 50%;
        :nth-child(1) {
          font-size: 28px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        :nth-child(2) {
          font-size: 28px;
          font-weight: 400;
          color: rgba(253, 114, 13, 1);
          margin-top: 15px;
        }
      }
    }

    .release-plan-bottom {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      > div:nth-child(1) {
        width: 50%;
        font-size: 24px;
        font-weight: 400;
        color: rgba(149, 149, 149, 1);
      }
      > div:nth-child(2) {
        width: 50%;
      }

      button {
        width: 164px;
        height: 36px;
        background: rgba(61, 185, 87, 1);
        border-radius: 18px;
        font-size: 24px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>

<script>
// @ is an alias to /src
import { _post, _get } from "../../http";
import { getStorage } from "../../utilies";
import { Notify, Dialog } from "vant";
import cardButton from "../../components/button";

export default {
  name: "home",

  data() {
    return {
      planList: [],
    };
  },
  components: {
    cardButton: cardButton,
  },
  created() {
    this.getList();
  },
  methods: {
    getList: function() {
      let _this = this;

      //分页记得改，暂时先这样
      _get("/api/v1/app/plans/renew_list/0/99", {
        user_id: getStorage("userInfo", "obj").account.user_id
      }).then(res => {
        if (res.state == 1) {
          _this.planList = res.data.list;
        } else {
          Notify({ message: res.msg });
        }
      });
    },
    releasePlan: function(id) {

      Dialog.confirm({
        message: "请确认是否需要解约套餐？"
      })
        .then(() => {
          let _this = this;
          _get("/api/v1/app/plans/cancel_renew", {
            renew_id: id,
            user_id:getStorage("userInfo","obj").account.user_id
          }).then(res => {
            if (res.state == 1) {
              Notify({ message: res.msg,background:'#60ce53' });
              _this.getList();
            } else {
              Notify({ message: res.msg });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

