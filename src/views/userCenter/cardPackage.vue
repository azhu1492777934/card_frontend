<template>
  <div class="container cardPackage">
    <ul>
      <li class="list-item " v-for="(item,index) in list " data-type="0" :key="index" >
        <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd"  :class="{'yidong':item.operators==1,'liantong':item.operators==2,'dianxin':item.operators==3}">
          <div class="list-content ">
            <div>
              <div
                :class="{'yidongIcon':item.operators==1,'liantongIcon':item.operators==2,'dianxinIcon':item.operators==3}"
              ></div>
            </div>
            <div>
              <div>MSISDN:{{item.msisdn}}</div>
              <div>ICCID:{{item.iccid}}</div>
              <div :class="{'blackOne':item.auth_status!==3}">
                <span v-if="item.auth_status==0" >未实名</span>
                <span v-if="item.auth_status==1" >审核中</span>
                <span v-if="item.auth_status==2" >审核不通过</span>
                <span v-if="item.auth_status==3" >已实名</span>
              </div>
            </div>
          </div>
        </div>
        <div class="delete" @click="deleteItem(item.iccid)" :data-index="index">解绑</div>
      </li>
    </ul>
    <div v-if="list.length==0" class="noCard">未绑定卡</div>
  </div>      
</template>

<script>
import { setStorage, getStorage, getUrlParam } from "../../utilies";
import { Search, List, Cell, SwipeCell, Button,Notify,Dialog } from "vant";
import { _post, _get } from "../../http";
export default {
  data() {
    return {
      list: [
      
      ],
      startX: 0,
      endX: 0
    };
  },
  components: {
    "van-swipe-cell": SwipeCell,
    "van-cell": Cell,
    "van-button": Button,
  },
  computed: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      _get("/newiot/client/card/bind_list", {
        // user_id: "64069"
        user_id: getStorage("userInfo", "obj").account.user_id
      }).then(res => {
        if (res.state == 1) {
          this.list = res.data;
        } else {
          Notify({ message: res.msg });
        }
      });
    },
    // 跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        this.$router.push({
          path: "/detail"
        });
      }
    },
    // 滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    // 滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    // 复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    // 删除
    deleteItem(iccid) {
        Dialog.confirm({
          message: '请确认是否解绑该卡？'
        }).then(() => {
          // on confirm
            _post('/newiot/client/card/remove_bind', {
                user_id: getStorage("userInfo", "obj").account.user_id,
                iccid:iccid
            }).then(res => {
              if (res.state == 1) {
                Notify({
                  message: '解绑成功',
                  background: '#60ce53'
                })
                this.restSlide();
                this.getList();
              } else {
                Notify({message: res.msg})
              }
            })
        }).catch(() => {
          // on cancel
        });

      
    }
  }
};
</script>

<style lang="less">
.cardPackage {
  padding-top: 16px;
  .yidong {
    background: url("../../assets/imgs/userCenter/pkgBg1.png") no-repeat;
    background-size: 100% 100%;
  }
  .dianxin {
    background: url("../../assets/imgs/userCenter/pkgBg2.png") no-repeat;
    background-size: 100% 100%;
  }
  .liantong {
    background: url("../../assets/imgs/userCenter/pkgBg3.png") no-repeat;
    background-size: 100% 100%;
  }
  .blackOne{
      background:rgba(0,0,0,0.15) !important;
  }
  .noCard{
    font-size:30px;
    font-family:SourceHanSansSC-Medium;
    font-weight:500;
  }
  .list-content {
    width: 691px;
    height: 207px;
    margin: 10px auto;
    font-size: 30px;
    font-family: SourceHanSansSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: left;
    align-items: center;
    display:flex;
    > div:nth-child(1) {
      width: 150px;
      height: 150px;
      background: #fff;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      .yidongIcon {
        background: url("../../assets/imgs/userCenter/yidong.png") no-repeat;
        background-size: 100% 100%;
      }
      .dianxinIcon {
        background: url("../../assets/imgs/userCenter/dianxin.png") no-repeat;
        background-size: 100% 100%;
      }
      .liantongIcon {
        background: url("../../assets/imgs/userCenter/liantong.png") no-repeat;
        background-size: 100% 100%;
      }
      > div:nth-child(1) {
        width: 92px;
        height: 110px;
      }
    }
    > div:nth-child(2) {

      margin-left: 36px;
      line-height: 50px;
      > div:nth-child(3) {
        width: 112px;
        height: 32px;
        background: rgba(13, 214, 108, 1);
        border-radius: 16px;
        font-size: 24px;
        text-align: center;
        line-height: 32px;
        margin-top:30px;
      }
    }
  }
}
.container {
  overflow: hidden;
  padding-bottom: 80px;

}
.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}
.page-title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-item {
  position: relative;
  height: 207px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  margin-top:20px;
}
.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type="1"] {
  transform: translate3d(-200px, 0, 0);
}
.list-item:after {
  content: " ";
  position: absolute;
  left: 20px;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.list-box {
  padding: 20px;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
}
.list-item .list-img {
  display: block;
  width: 100px;
  height: 100px;
}
.list-item .list-content {
  padding: 10px 0 10px 20px;
  position: relative;
  overflow: hidden;
}
.list-item .title {
  display: block;
  color: #333;
  overflow: hidden;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 10px;
  color: #666;
}
.list-item .delete {
  width: 200px;
  height: 207px;
  background: #ff4949;
  font-size:30px;
font-family:SourceHanSansSC-Medium;
font-weight:500;
  color: #fff;
  text-align: center;
  line-height: 207px;
  position: absolute;
  top: 0;
  right: -200px;
}


</style>