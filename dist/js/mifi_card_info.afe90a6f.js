(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_info"],{"0b6e":function(t,e,a){"use strict";var s=a("e27a"),n=a.n(s);n.a},"54ee":function(t,e,a){"use strict";var s=a("c10b"),n=a.n(s);n.a},"885f":function(t,e,a){"use strict";a.r(e);var s,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-wrap"},[a("user-header",{directives:[{name:"show",rawName:"v-show",value:t.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:t.authorizeUserInfo}}),a("div",{staticClass:"top-info"},[a("div",{staticClass:"top-info-left"},[a("div",{staticClass:"card-recent-wrap"},[a("p",[t._v("近期查询")]),a("div",{staticClass:"card-status-wrap"},[a("span",{staticClass:"card-status",class:t.usageInfo.auth_status>=3?"status-gradient":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.real_name_state)+"\n                    ")]),""==t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:t.usageInfo.status>=3?"status-gradient":"status-gradient-green"},[t._v("\n                        "+t._s(t.filterCardInfo.card_str_state)+"\n                    ")]):t._e(),""!=t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:1==t.filterCardInfo.device_state.code?"status-gradient-green":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.device_state.state)+"\n                    ")]):t._e()])]),a("p",{staticClass:"iccid-wrap"},[t._v(t._s(t.iccid))]),a("div",{staticClass:"card-info"},[a("div",[a("span",[t._v(t._s(t.filterCardInfo.used_flow))]),a("p",[t._v("已用流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.surplus_flow))]),a("p",[t._v("剩余流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.today_used_flow))]),a("p",[t._v("今日用量")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.changedCard}},[a("span",{staticClass:"iconfont icon-exchange"}),a("p",[t._v("更换卡号")])])])])]),a("div",{staticClass:"card-function-wrap"},[a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.buyPlan}},[a("span",{staticClass:"iconfont icon-recharge"}),a("p",[t._v("购买套餐")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"item-function-wrap",on:{click:t.flowCheck}},[a("span",{staticClass:"iconfont icon-info"}),a("p",[t._v("流量查询")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.checkOrder}},[a("span",{staticClass:"iconfont icon-txt"}),a("p",[t._v("订单查询")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.couponExchange}},[a("span",{staticClass:"iconfont icon-coupon"}),a("p",[t._v("卡券兑换")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.toQuestion}},[a("span",{staticClass:"iconfont icon-question"}),a("p",[t._v("问题中心")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"change-network-wrap",on:{click:t.toChangeNework}},[a("span",{staticClass:"iconfont icon-change"}),a("p",[t._v("网速慢,切换网络")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.toChangeCard}},[a("span",{staticClass:"iconfont icon-changeCard"}),a("p",[t._v("卡更换")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.toChangeEq}},[a("span",{staticClass:"iconfont icon-changeEq"}),a("p",[t._v("设备更换")])]),a("span",{staticClass:"divider",staticStyle:{opacity:"0"}}),a("div")])])],1)},i=[],o=a("a322"),c=(a("7f7f"),a("e7e5"),a("d399")),r=a("c93e"),u=a("2f62"),l=a("c5dc"),d=a("35df"),f=a("db04"),p={name:"index",data:function(){return{iccid:Object(d["i"])("check_iccid"),auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],usageInfo:{},filterCardInfo:{today_used_flow:"",used_flow:"",surplus_flow:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1},recording_list:Object(d["i"])("recording_list","arr")||[]}},computed:Object(r["a"])({},Object(u["b"])({isShowUser:function(t){return t.userInfo.showUser},authorizeUserInfo:function(t){return t.userInfo.userInfoInner}})),components:(s={},Object(o["a"])(s,c["a"].name,c["a"]),Object(o["a"])(s,"userHeader",l["a"]),s),created:function(){this.iccid?this.initial():this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),Object(f["a"])("/api/v1/app/cards/status/usage",{iccid:this.iccid,type:1}).then(function(e){if(t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==e.state){if(Object(d["n"])("check_realNameSource",e.data.source),t.usageInfo=e.data,e.data.today_used_flow>=0?e.data.today_used_flow>=1024?t.filterCardInfo.today_used_flow="".concat(Object(d["o"])(e.data.today_used_flow/1024),"G"):t.filterCardInfo.today_used_flow="".concat(Object(d["o"])(e.data.today_used_flow),"M"):t.filterCardInfo.today_used_flo="0.00M",e.data.used>=0&&e.data.total>=0?(e.data.used>=1024?t.filterCardInfo.used_flow="".concat(Object(d["o"])(e.data.used/1024),"G"):t.filterCardInfo.used_flow="".concat(Object(d["o"])(e.data.used),"M"),e.data.total>=0?e.data.used>=1024?t.filterCardInfo.surplus_flow="".concat(Object(d["o"])((e.data.total-e.data.used)/1024),"G"):t.filterCardInfo.surplus_flow="".concat(Object(d["o"])(e.data.total-e.data.used),"M"):t.filterCardInfo.surplus_flow="无限量"):(t.filterCardInfo.used_flow="暂无",t.filterCardInfo.surplus_flow="暂无"),0==t.usageInfo.auth_status&&t.usageInfo.need_auth){var a=t.checkAllCardStatus();1==a.state?(t.iccid=a.iccid,Object(d["n"])("check_iccid",t.iccid),t.initial()):t.$router.push({path:"/weixin/new_card/real_name"})}t.inArray(t.usageInfo.source,[1,4])>=0?t.auth_status.push("手淘实名"):t.auth_status.push("已实名"),t.usageInfo.need_auth?t.filterCardInfo.real_name_state=t.auth_status[t.usageInfo.auth_status]:t.filterCardInfo.real_name_state="已实名",t.inArray(t.usageInfo.source,[1,5])>=0&&t.usageInfo.imei&&(t.usageInfo.imei&&t.usageInfo.fenli?2==t.usageInfo.status?t.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:t.filterCardInfo.device_state={state:"机卡分离",code:2}:t.filterCardInfo.device_state={state:"机卡已绑定",code:1}),t.filterCardInfo.card_str_state=t.card_state[t.usageInfo.status],localStorage.setItem("is_flow_card",1)}else t.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:e.msg?e.msg:"获取数据信息失败，请稍后再试"})})},buyPlan:function(){this.$router.push("/mifi/plan/group")},flowCheck:function(){this.$router.push("/mifi/plan/usage")},checkOrder:function(){this.$router.push("/mifi/order/index")},couponExchange:function(){this.$router.push("/mifi/coupon/index")},toQuestion:function(){this.$router.push("/weixin/question/index")},changedCard:function(){this.$router.push("/mifi/card/lookup")},toChangeNework:function(){this.$router.push("/mifi/card/change_network")},toChangeCard:function(){this.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)},toChangeEq:function(){this.$router.push({name:"eqReplaceMent",params:{status:0}}),localStorage.setItem("replaceStatus",0)},inArray:function(t,e,a){return null==e?-1:e.indexOf(t,a)},checkAllCardStatus:function(){var t;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){t=this.recording_list[e].iccid;break}return t?{state:1,iccid:t}:void 0},toRealName:function(){3!=this.usageInfo.auth_status&&4!=this.usageInfo.auth_status?0==this.usageInfo.auth_status&&this.usageInfo.need_auth&&(Object(d["n"])("check_realNameSource",this.usageInfo.source),this.$router.push({path:"/weixin/new_card/real_name"})):Object(c["a"])({position:"top",message:"此卡已实名"})}}},h=p,_=(a("54ee"),a("2877")),v=Object(_["a"])(h,n,i,!1,null,null,null);v.options.__file="index.vue";e["default"]=v.exports},b258:function(t,e,a){},c10b:function(t,e,a){},c5dc:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-wrap"},[a("div",{staticClass:"user-inner-wrap"},[a("div",{staticClass:"user-name-wrap"},[a("img",{attrs:{src:t.getUserInfo.avatar}}),a("span",{staticClass:"user-name"},[t._v(t._s(t.getUserInfo.nickname))])]),a("div",[a("span",[t._v("余额:")]),a("span",{staticClass:"icon-diamond-wrap",on:{click:function(e){t.showDoc()}}},[a("i",{staticClass:"icon-user-size  icon-diamond"}),t._v("\n                      "+t._s(t.getUserInfo.account.balance)+"\n                  ")]),a("span",{staticClass:"tip-wrap",on:{click:t.showDoc}},[t._v("!")])])])])},n=[],i=a("a322"),o=(a("7f7f"),a("e17f"),a("2241")),c=a("c93e"),r=a("2f62"),u={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(c["a"])({},Object(r["b"])({getUserInfo:function(t){return t.userInfo.userInfoInner}})),components:Object(i["a"])({},o["a"].name,o["a"]),methods:{showDoc:function(t){var e;e="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录",o["a"].alert({message:e})}}},l=u,d=(a("0b6e"),a("2877")),f=Object(d["a"])(l,s,n,!1,null,null,null);f.options.__file="uesrHead.vue";e["a"]=f.exports},d399:function(t,e,a){"use strict";var s=a("1988"),n=a("2b0e"),i=a("d282"),o=a("a142"),c=a("6605"),r=a("ad06"),u=a("543e"),l=Object(i["a"])("toast"),d=l[0],f=l[1],p=d({mixins:[c["a"]],props:{icon:String,className:null,loadingType:String,forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:function(){this.toggleClickable()},forbidClick:function(){this.toggleClickable()}},methods:{toggleClickable:function(){var t=this.value&&this.forbidClick;if(this.clickable!==t){this.clickable=t;var e=t?"add":"remove";document.body.classList[e]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")}},render:function(t){var e=this.type,a=this.icon,s=this.message,n=this.loadingType,i=a||"success"===e||"fail"===e;function c(){return i?t(r["a"],{class:f("icon"),attrs:{name:a||e}}):"loading"===e?t(u["a"],{class:f("loading"),attrs:{color:"white",type:n}}):void 0}function l(){if(Object(o["b"])(s)&&""!==s)return"html"===e?t("div",{class:f("text"),domProps:{innerHTML:s}}):t("div",{class:f("text")},[s])}return t("transition",{attrs:{name:"van-fade"},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[t("div",{directives:[{name:"show",value:this.value}],class:[f([this.position,{text:!i&&"loading"!==e}]),this.className]},[c(),l()])])}}),h={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",onClose:null,onOpened:null,duration:3e3,position:"middle",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null},_=[],v=!1,g=Object(s["a"])({},h);function m(t){return Object(o["c"])(t)?t:{message:t}}function C(){if(o["d"])return{};if(!_.length||v){var t=new(n["default"].extend(p))({el:document.createElement("div")});_.push(t)}return _[_.length-1]}function w(t){return t=Object(s["a"])({},t),t.overlay=t.mask,delete t.mask,delete t.duration,t}function b(t){void 0===t&&(t={});var e=C();return e.value&&e.updateZIndex(),t=Object(s["a"])({},g,m(t),{clear:function(){e.value=!1,t.onClose&&t.onClose(),v&&!o["d"]&&e.$on("closed",function(){clearTimeout(e.timer),_=_.filter(function(t){return t!==e});var t=e.$el.parentNode;t&&t.removeChild(e.$el),e.$destroy()})}}),Object(s["a"])(e,w(t)),clearTimeout(e.timer),t.duration>0&&(e.timer=setTimeout(function(){e.clear()},t.duration)),e}var I=function(t){return function(e){return b(Object(s["a"])({type:t},m(e)))}};["loading","success","fail"].forEach(function(t){b[t]=I(t)}),b.clear=function(t){_.length&&(t?(_.forEach(function(t){t.clear()}),_=[]):v?_.shift().clear():_[0].clear())},b.setDefaultOptions=function(t){Object(s["a"])(g,t)},b.resetDefaultOptions=function(){g=Object(s["a"])({},h)},b.allowMultiple=function(t){void 0===t&&(t=!0),v=t},b.install=function(){n["default"].use(p)},n["default"].prototype.$toast=b;e["a"]=b},e27a:function(t,e,a){},e7e5:function(t,e,a){"use strict";a("68ef"),a("4d75"),a("09fe"),a("b258")}}]);
//# sourceMappingURL=mifi_card_info.afe90a6f.js.map