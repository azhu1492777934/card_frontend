<template>
  <div class="eqReplaceMent">
    <div class="usage-wrap hide-user">
      <div ref="orderTop" class="order-top">
        <ul>
          <li
            v-for="(item,index) in statusList"
            :class="{'checked':statusIndex==index}"
            v-bind:key="index"
            @click="changeStatus(index)"
          >
            {{item}}
            <span class="deco-border-arrow"></span>
          </li>
        </ul>
      </div>
      <div class="swipe-wrap" ref="SwiperWwrap">
        <!-- <swiper ref="mySwiper" :options="swiperOption"> -->
          <!-- <swiper-slide v-for="(item,index) in statusList" :key="index"> -->

            <div v-show="statusIndex==0" >
              <ul>
                <li class="borderStyle">
                  <span><span class="redWord">*</span> ICCID卡号:</span>
                  <input v-model="replaceData.iccid" placeholder="请输入要更换卡的卡号" type="text">
                  <i class="scanCode" @click="scanIccid(1)"></i>
                </li>
                <li :class="{ 'marginStyle': !newIccid }">
                  <span><span class="redWord">*</span>新的卡号:</span>
                  <input v-model="newIccid" placeholder="请选择" type="text" @focus="showIccid=true" readonly>
                </li>
                <!-- <div class="marginStyle jdPlan" v-show="!!newIccid">
                  <div class="jdPlanTitle">可充值套餐:</div>
                  <div class="jdPlanContent">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                  </div>
                </div> -->
                <li class="borderStyle">
                  <span><span class="redWord">*</span> 收件人姓名:</span>
                  <input v-model="replaceData.user_name" placeholder="请输入收件人姓名" type="text">
                </li>
                <li class="borderStyle">
                  <span><span class="redWord">*</span> 手机号码:</span>
                  <input v-model="replaceData.mobile" placeholder="请输入手机号" type="number">
                </li>
                <li class="marginStyle">
                  <span><span class="redWord">*</span> 验证码:</span>
                  <input v-model="replaceData.code" placeholder="请输入短信验证码" type="text" v-on:input ="limlit()">
                  <span class="getCode" @click="getCode(replaceData.mobile)">{{codeText}}</span>
                </li>
                <li class="borderStyle">
                  <span><span class="redWord">*</span> 所在地区:</span>
                  <input v-model="areaData" placeholder="请选择省市区街道" type="text" @focus="show=true" readonly>
                </li>
                <li stye="-webkit-user-select:text !important;">
                  <span><span class="redWord">*</span>详细地址:</span>
                  <input v-model="replaceData.addr" placeholder="请输入详细地址" type="text">
                </li>
                
              </ul>

              <div class="submitButton">
                <div @click="submit()">提交</div>
                <div>注：请仔细核对信息后再提交</div>
                <div>新卡1-3个工作日发出</div>
                <div>如有疑问请联系客服热线：0755-33528333</div>
              </div>
            </div>

            <div v-show="statusIndex==1">
              <div v-for="(item,index) in replaceList" v-bind:key="index" class="replaceList">
                <div class="wrapBox1">
                  <div class="wrapBox2" v-if="item.model_name">
                    <div>设备型号</div>
                    <div>{{item.model_name}}</div>
                  </div>
                  <div class="wrapBox2" v-if="!item.model_name">
                    <div></div>
                    <div>卡更换</div>
                  </div>

                  <div class="wrapBox3">
                    <!-- <div v-if="item.imei"><span>IMEI号&nbsp;&nbsp;&nbsp;</span> <span>{{item.imei}}</span>  </div> -->
                    <div v-if="item.iccid"><span>ICCID&nbsp;&nbsp;&nbsp;</span> <span>{{item.iccid}}</span></div>
                    <div><span>物流公司</span><span v-if="item.express_name">{{item.express_name}}</span> <span
                      v-if="!item.express_name">暂无物流信息</span></div>
                    <div><span>快递单号</span><span v-if="item.express_no">{{item.express_no}}</span><span
                      v-if="!item.express_no">暂无物流信息</span></div>
                  </div>
                </div>
                <div class="wrapBox4">
                  <div v-if="item.operator_at"> 发货时间: {{item.operator_at}} </div>
                  <span v-if="!item.operator_at">暂无物流信息</span>
                  <div   v-if="item.operator_at" class="cfmButton"  :class="{'unreceived':item.plan_transfer==1}"  >
                    <span v-if="item.plan_transfer!=1" @click="cfmButton(item.id,item.new_source,item.new_iccid)">确认收货</span>  
                    <span v-if="item.plan_transfer==1">已收货</span>
                  </div>
                </div>
              </div>
              <div class="noMsg" v-if="replaceList.length==0">暂无物流记录</div>
            </div>
          <!-- </swiper-slide> -->
        <!-- </swiper> -->
      </div>


      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-area :area-list="areaList" @cancel="show=false" @confirm="getAreaList"/>
      </van-popup>

      <van-popup v-model="showIccid" round position="bottom" :closeable="true" :style="{ height: '55%' }">
        <div class="showIccid">
          <div class="iccidTitle">请选择号码</div>
          <!-- <div class="searchCon">
              <input  pattern="[0-9]*" value="" placeholder="请输入手机号" v-model="newIccid" style="border:none;">
              <div class="search" @click="getNewIccidList()">搜索</div>
          </div> -->
          <div class="container">
            
            <div class="item" v-for="(item, index) in newIccidList" :key="index" @click="getChooseIccid($event)">{{item}}</div>
          </div>
          <div class="changeIccid">
            <input type="button" value="换一批" @click="changeNewIccidList()"/>
            <van-icon name="replay" />
          </div>
        </div>
        
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  import {Toast, Popup, Notify, Loading, Area, Dialog, Icon} from "vant";
  import {getStorage, setStorage, checkBrowser, Today, getCardServerToken, getUrlParam} from "../../utilies";
  import {_get, _post} from "../../http";
  import areaList from "../../assets/js/areaData.js"

  export default {
    name: "jdReplaceMent",
    components: {
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Loading.name]: Loading,
      [Icon.name]: Icon,
      swiper,
      swiperSlide,
      vanArea: Area,
    },
    data() {
      const _this = this;
      return {
        today: Today(),
        timeStamp: new Date().getTime(),
        iccid: getStorage("check_iccid"),
        source: getStorage("check_realNameSource"),
        client_type: checkBrowser(),
        statusList: ["卡更换"],
        statusIndex: 0,
        usageListObj: {},
        swiperOption: {
          on: {
            slideChangeTransitionEnd: function (swiper) {
              _this.statusIndex = this.activeIndex;
            }
          }
        },
        replaceData: {
          model_name: "",
          user_name: "",
          mobile: "",
          code: "",
          province: "",
          city: "",
          district: "",
          addr: "",
          iccid: ""
        },
        areaData: "",
        codeText: "获取验证码",
        countdown: 60,
        show: false,
        areaList: areaList,
        replaceList: [],
        currentType: 1,
        gift: 2,
        youku_mobile: "",
        //--京东--//
        showIccid: false, //选择卡号flag
        count: 1,
        newIccid: '',
        step: 0,
        newIccidList: [],
        newIccidTotal: [],
        newIccidData: []
      };
    },
    created() {  
      this.initial()
    },
    computed: {
      
    },
    methods: {
      initial() {
        if (getUrlParam('iccid')) {
          this.replaceData.iccid = getUrlParam('iccid')
        }
        this.getNewIccidList()
      },
      changeStatus(index) {
        this.statusIndex = index;
        // this.$refs.mySwiper.swiper.slideTo(index);
        if (index == 1) {
          this.getList();
        }

        this.replaceData = {
          model_name: "",
          user_name: "",
          mobile: "",
          code: "",
          province: "",
          city: "",
          district: "",
          addr: "",
          iccid: ""
        };
        this.areaData = "";
        this.gift = 2;
        this.youku_mobile = ""
      },
      changeNewIccidList(){
        this.newIccidList = []
        if (this.step > this.newIccidTotal.length-1) this.step = 0
        for (let i=0; i<=9; i++) {
          this.newIccidList.push(this.newIccidTotal[this.step])
          this.step++
        }
      },
      getNewIccidList() {
        _get('/iot/v1/weixin/cards/get_lianghao', {
          iccid: this.newIccid
        }).then((res) => {
          if (res.status == 1) {
            this.newIccidData = res.data
  
            if (this.newIccidData[0].constructor === Object) {
              this.newIccidData.map((item) => {
                this.newIccidTotal.push(item.msisdn)
              })
              let Length = (this.newIccidTotal.length>9?9:this.newIccidTotal.length-1)
              for (let i=0; i<=Length; i++) {
                this.newIccidList.push(this.newIccidTotal[this.step])
                this.step++
              }
            }

            if (this.newIccidData[0].constructor === Array) {
              this.newIccidData.map((item) => {
                this.newIccidTotal.push(item[0])
              })
              let Length = (this.newIccidTotal.length>9?9:this.newIccidTotal.length-1)
              for (let i=0; i<=Length; i++) {
                this.newIccidList.push(this.newIccidTotal[this.step])
                this.step++
              }
            }
            
          }
        })
      },
      //获取列表
      getList() {
        _get('/api/v1/app/equipment/change/apply_list', {
          user_id: getStorage("userInfo", "obj").account.user_id,
          // user_id:613814,
          type:this.currentType,
          offset: 0,
          limit: 999
        }).then(res => {
          if (res.state == 1) {
            this.replaceList = res.data.rows;
         
          } else {
            Notify({message: res.msg})
          }
        })
      },
      //获取验证码
      getCode(no) {
        if (!no || no == "") {
          Notify({message: '请填写手机号码'});
          return false;
        } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.replaceData.mobile)) {
          Notify({message: "请填写正确的手机号码"});
          return false;
        } else {
          this.countDownFun()
          _post('/api/v1/app/messages/send', {
            mobile: no,
            status: 3
          }).then(res => {
            if (res.state == 1) {
              Notify({
                message: '验证码发送成功',
                background: '#60ce53'
              })
            } else {
              Notify({message: res.msg})
            }
          })
        }
      },
      //选择卡号
      getChooseIccid(e) {
        this.newIccid = e.target.innerText
        this.showIccid = false
      },
      //倒计时
      countDownFun() {
        let _this = this;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (_this.countdown <= 0) {
            _this.codeText = '获取验证码';
            _this.countdown = 60;


            clearInterval(_this.timer);
          } else {
            _this.codeText = this.countdown + 's';
            _this.countdown--;
          }
        }, 1000)
      },

      //处理下省市区的数据
      getAreaList(val) {
        this.areaData = "";
        this.replaceData.province = val[0].name;
        this.replaceData.city = val[1].name;
        if (val[2]) {
          this.replaceData.district = val[2].name;
        } else {
          this.replaceData.district = "";
        }
        let list = [];
        for (let i = 0; i < val.length; i++) {
          if (val[i]) {
            list.push(val[i].name);
          }
        }
        this.areaData = list.join("/");
        this.show = false;
      },

      //表单提交
      async submit() {
        try {
          let _this = this;

          if (!(/^[1-9]\d*$/).test(this.replaceData.code)) {
            Notify({message: "请填写正确的验证码"});
            return false;
          }

          if (this.currentType == 0) {
            if (this.replaceData.model_name == "") {
              Notify({message: "请填写设备型号"});
              return false;
            }
          }

          if (this.replaceData.iccid == "") {
            Notify({message: "请填写卡号"});
            return false;
          }

          if (this.newIccid == "") {
            Notify({message: "请选择新的卡号"});
            return false;
          }


          if (this.replaceData.user_name == "") {
            Notify({message: "请填写收件人姓名"});
            return false;
          }
          if (this.replaceData.mobile == "") {
            Notify({message: "请填写手机号"});
            return false;
          }
          if (this.replaceData.code == "") {
            Notify({message: "请填写验证码"});
            return false;
          }
          if (this.replaceData.province == "" || this.replaceData.city == "" || this.replaceData.district == "") {
            Notify({message: "请选择所在地区"});
            return false;
          }
          if (this.replaceData.addr == "") {
            Notify({message: "请填写详细地址"});
            return false;
          }
          if (this.replaceData.addr.length < 3) {
            Notify({message: "详细地址过短"});
            return false;
          }
          if (this.gift == 1){
            if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.youku_mobile)) {
            Notify({message: "请填写正确优酷绑定的手机号"});
            return false;
            }
          }
          if (this.gift == 2) {
            this.youku_mobile = ""
          }

          let newData = this.replaceData;
          for (let item in newData) {
            newData[item] = String(newData[item]).replace(/\s*/g, "");
          }

          newData.user_id = 0;
          newData.type = 2;
          newData.gift = this.gift;
          newData.youku_mobile = this.youku_mobile;
          


          if (this.newIccidData[0].constructor === Object) {
            this.newIccidData.some((item) => {
              if (item.msisdn ==this.newIccid) {
                newData.new_iccid = item.iccid
              }
            })
          }
          if (this.newIccidData[0].constructor === Array) {
            this.newIccidData.some((item) => {
              if (item[0] ==this.newIccid) {
                newData.new_iccid = item[1]
              }
            })
          }
          

          this.cfmSubmit(newData);

        } catch (err) {
          Toast({
            position: 'top',
            message: err.message
          })
        }
      },


      //扫码
      scanIccid(type) {
        let _this = this;
        this.wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            // if(type==0){
            // _this.replaceData.imei = result.split(",")[1];

            // }else{
            result.indexOf(',') > -1 ? result = result.substr(result.indexOf(',') + 1, result.length) : result;
            _this.replaceData.iccid = (result.replace(/\s*/g, ""));
            // _this.replaceData.iccid = result.split(",")[1];

            // }
          }
        });
      },

      //确认收货
      cfmButton(id,type,new_iccid){
        let msg;
        if(type==35){
          msg="确认且实名";
        }else{
          msg="确认";
        }
        Dialog.confirm({
          title: '是否确认收货',
          message: '确认收货后套餐将自动转移到新卡',
          confirmButtonText:msg
        }).then(() => {
          // on confirm
          this.transferPlan(id, new_iccid);
        }).catch(() => {
          // on cancel
        });
      },

      //转移套餐
      transferPlan(id, new_iccid){

        _post('/api/v1/app/equipment/transfer', {id:id}).then(res => {
          if (res.state == 1) {

            if (getStorage('is_flow_card') == 0) {
              this.activate(new_iccid)
            }

            Notify({
              message: '确认收货成功',
              background: '#60ce53'
            })

            this.getList();
            if(res.data){
              location.href=res.data;
            }
          } else {
            Notify({message: res.msg})
          }
        })
      },
      cfmSubmit(newData){
        _post('/api/v1/app/equipment/change/apply', newData).then(res => {
          if (!res.data&&res.state==1) {
            Notify({
              message: '提交成功',
              background: '#60ce53'
            })
            this.replaceData = {};
            this.areaData = "";
            this.gift = 2;
            this.youku_mobile = ""
            this.newIccid = ""
          }else if(/<[^>]+>/.test(res.data)){
            const div = document.createElement('div');
            div.innerHTML = res.data;
            document.body.appendChild(div);
            document.forms[0].submit();
          } else {
            Notify({message: res.msg})
          }
        })
      },
      getSource(iccid){
        let p =new Promise((resolve,reject)=>{
          _get('/api/v1/app/cards/details',{
              iccid:this.iccid,
          }).then(res=>{
              if(res.state==1){
                resolve(res.data.source);
              }
          })
        })
        return p;
        
      },
      //深圳移动 激活 只调不做任何提示
      activate(new_iccid) {
        _get('/api/v1/app/cards/yd_allow_auth',{
            iccid:new_iccid,
            user_id:getStorage("userInfo", "obj").account.user_id
        })
      },
      limlit() { //ios键盘输入触发两次输入事件
        if (this.replaceData.code.length == 8) {
          this.replaceData.code = this.replaceData.code.slice(0, 4)
        }
        if (this.replaceData.code.length == 12) {
          this.replaceData.code = this.replaceData.code.slice(0, 6)
        }
      }
    }
  };
</script>

<style lang="less">
  @import "~swiper/dist/css/swiper.min.css";
  @import "../../assets/less/utitlies";

  .eqReplaceMent {
    height: 100%;
    background: #F3F3F3;

    .usage-wrap {
      .swiper-container {
        height: 100%;
      }

      .order-top {
        padding: 30px 46px 0;
        height: 50px;
        background: #353335;

        p {
          &:first-child {
            font-size: 35px;
            color: #353335;
            text-align: left;
          }

          &:nth-child(2) {
            padding: 18px 0 30px;
            text-align: center;
            color: #fa7500;
            font-size: 46px;
            font-weight: 500;
          }
        }

        ul {
          display: flex;
          padding: 0 29px;

          li {
            position: relative;
            flex: 1;
            color: #8a8a8a;
            font-size: 30px;

            &.checked {
              color: #fab214;

              .deco-border-arrow {
                position: absolute;
                left: 50%;
                bottom: -32px;
                display: inline-block;
                width: 125px;
                height: 24px;
                transform: translateX(-50%);
                .bg-image("../../assets/imgs/mifi/order/orderArrow");
                z-index: 99;
              }
            }
          }
        }
      }

      .swipe-wrap {
        box-sizing: border-box;

        .scanCode {
          display: inline-block;
          position: absolute;
          width: 52px;
          height: 52px;
          background: url("../../assets/imgs/mifi/binding/saoyisao@2x.png") no-repeat;
          background-size: 100% 100%;
          right: 50px;
          top: 20px;
        }

        ul {
          li {
            display: flex;
            padding: 30px 50px;
            font-size: 30px;
            background-color: #fff;
            box-sizing: border-box;
            position: relative;

            div {
            flex: 2;
            text-align: left;
            }

            span {
              flex: 1;
              color: #2c251d;
              text-align: left;
              min-width: 180px;
            }

            input {
              flex: 2;
              color: #595959;
              padding-left: 15px;
            }

            .getCode {
              position: absolute;
              right: 30px;
              color: #F5C253;
              text-align: center;
            }
          }
          .borderStyle {
            border-bottom: 1px solid #E6E6E6;
          }
          .marginStyle {
            margin-bottom: 18px;
          }
          .jdPlan {
            padding: 0 50px;
            width: 100%;
            height: 140px;
            background: #fff;
            box-sizing: border-box;
            .jdPlanTitle {
              font-size: 20px;
              color: #2c251d;
              text-align: left;
            }
            .jdPlanContent {
              height: 120px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              box-sizing: border-box;
              grid-column-gap: 20px;
              .item {
                border-radius: 8px;
                background: #FAFAFA;
              }
            }
            
          } 
        }

        .replaceList {
          padding: 30px 21px 18px 21px;
          background: #fff;
          margin-top: 16px;

          .wrapBox1 {
            display: flex;
            border-bottom: 1px solid #E6E6E6;
            padding-bottom: 20px;
          }

          .wrapBox2 {
            padding: 0 58px;
            flex: 1;

            > div:nth-child(1) {
              font-size: 34px;
              font-family: SourceHanSansSC-Regular;
              font-weight: 400;
              color: rgba(44, 37, 29, 1);
            }

            > div:nth-child(2) {
              font-size: 34px;
              font-family: SourceHanSansSC-Normal;
              font-weight: 400;
              color: rgba(255, 147, 51, 1);
              margin-top: 18px;
            }
          }

          .wrapBox3 {
            flex: 2;
            text-align: left;
            line-height: 35px;

            > div {
              font-size: 26px;
              font-family: SourceHanSansSC-Normal;
              font-weight: 400;
              color: rgba(125, 125, 125, 1);
              display: flex;
              width: 100%;

              > span:nth-child(1) {
                font-size: 26px;
                font-family: SourceHanSansSC-Regular;
                font-weight: 400;
                color: rgba(44, 37, 29, 1);
              }

              > span:nth-child(2) {
                text-align: left;
                padding-left: 15px;
              }
            }
          }

          .wrapBox4 {
            font-size: 26px;
            font-family: SourceHanSansSC-Normal;
            font-weight: 400;
            color: rgba(125, 125, 125, 1);
            text-align: left;
            padding: 13px 0 0 17px;
            display:flex;
            align-items:center;
            justify-content: space-between;
            .cfmButton{
              width:150px;
              height:50px;
              background:linear-gradient(-33deg,rgba(253,212,122,1),rgba(240,181,70,1));
              color:rgba(68,63,56,1);
              line-height:50px;
              border-radius:25px;
              text-align:center;
            }
            .unreceived{
              background:#E9E9E9;
              color:#999999;
            }
          }
        }

      }
    }

    .submitButton {
      > div:nth-child(1) {
        width: 565px;
        height: 79px;
        background: linear-gradient(-33deg, rgba(253, 212, 122, 1), rgba(240, 181, 70, 1));
        border-radius: 40px;
        margin: 48px auto 24px auto;
        line-height: 79px;
        font-size: 36px;
        font-family: SourceHanSansSC-Regular;
        font-weight: 400;
        color: rgba(68, 63, 56, 1);
      }

      > div:nth-child(2),> div:nth-child(3),> div:nth-child(4) {
        font-size: 24px;
        font-family: SourceHanSansSC-Normal;
        font-weight: 400;
        color: rgba(255, 76, 35, 1);
        margin-bottom:10px;
      }
    }

    .noMsg {
      font-size: 26px;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(44, 37, 29, 1);
      padding: 20px;
    }

    .redWord {
      color: red !important;
    }

    .showIccid {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .iccidTitle {
        width: 100%;
        height: 100px;
        font-size: 32px;
        text-align: center;
        line-height: 100px;
        letter-spacing: 2px;
        font-weight: 600;
      }
      .searchCon {
        display: flex;
        justify-content: center;
        padding: 5px 80px 5px 40px;
        box-sizing: border-box;
        input {
          width:300px;
          height: 60px;
          margin-left:44px;
          outline:none;
          line-height:50px;
          font-size: 26px;
          border: 1px solid #ccc !important;
          border-radius: 8px;
          margin-right: 40px;
          flex: 1;
        }
        .search {
          width:106px;
          height:66px;
          background:#f0b546;
          box-shadow:0px 2px 20px 0px #f0b546;
          border-radius:10px;
          font-size:28px;
          font-family:PingFangSC-Regular,PingFangSC;
          color:rgba(255,255,255,1);
          text-align:center;
          line-height:66px;
          letter-spacing: 2px;
        }
      }
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .item {
          height: 68px;
          line-height: 68px;
          font-size: 28px;
          letter-spacing: 2px;
        }
      }
      .changeIccid {
        width: 180px;
        height: 68px;
        border-radius: 10px;
        background: #f0b546;
        color: #ffffff;
        font-size: 30px;
        font-weight: 500;
        line-height: 68px;
        margin: 0 auto;
      }
    }

  }
</style>