(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_info"],{"0b6e":function(t,e,a){"use strict";var s=a("e27a"),n=a.n(s);n.a},"54ee":function(t,e,a){"use strict";var s=a("c10b"),n=a.n(s);n.a},"885f":function(t,e,a){"use strict";a.r(e);var s,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-wrap"},["mifi"!=t.global_variables.packed_project?a("user-header",{directives:[{name:"show",rawName:"v-show",value:t.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:t.authorizeUserInfo}}):t._e(),a("div",{staticClass:"top-info"},[a("div",{staticClass:"top-info-left"},[a("div",{staticClass:"card-recent-wrap"},[a("p",[t._v("近期查询")]),a("div",{staticClass:"card-status-wrap"},[a("span",{staticClass:"card-status",class:t.usageInfo.auth_status>=3?"status-gradient":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.real_name_state)+"\n                    ")]),""==t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:t.usageInfo.status>=3?"status-gradient":"status-gradient-green"},[t._v("\n                        "+t._s(t.filterCardInfo.card_str_state)+"\n                    ")]):t._e(),""!=t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:1==t.filterCardInfo.device_state.code?"status-gradient-green":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.device_state.state)+"\n                    ")]):t._e()])]),a("p",{staticClass:"iccid-wrap"},[t._v(t._s(t.iccid))]),a("div",{staticClass:"card-info"},[a("div",[a("span",[t._v(t._s(t.filterCardInfo.used_flow))]),a("p",[t._v("已用流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.surplus_flow))]),a("p",[t._v("剩余流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.today_used_flow))]),a("p",[t._v("今日用量")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.changedCard}},[a("span",{staticClass:"iconfont icon-exchange"}),a("p",[t._v("更换卡号")])])])])]),a("div",{staticClass:"card-function-wrap"},[a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.buyPlan}},[a("span",{staticClass:"iconfont icon-recharge"}),a("p",[t._v("购买套餐")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"item-function-wrap",on:{click:t.flowCheck}},[a("span",{staticClass:"iconfont icon-info"}),a("p",[t._v("流量查询")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.checkOrder}},[a("span",{staticClass:"iconfont icon-txt"}),a("p",[t._v("订单查询")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.couponExchange}},[a("span",{staticClass:"iconfont icon-coupon"}),a("p",[t._v("卡券兑换")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.toQuestion}},[a("span",{staticClass:"iconfont icon-question"}),a("p",[t._v("问题中心")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"change-network-wrap",on:{click:t.toChangeNework}},[a("span",{staticClass:"iconfont icon-change"}),a("p",[t._v("网速慢,切换网络")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.toChangeCard}},[a("span",{staticClass:"iconfont icon-changeCard"}),a("p",[t._v("卡更换")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.toChangeEq}},[a("span",{staticClass:"iconfont icon-changeEq"}),a("p",[t._v("设备更换")])]),a("span",{staticClass:"divider",staticStyle:{opacity:"0"}}),a("div")])])],1)},i=[],o=(a("28a5"),a("6bde")),r=(a("e17f"),a("2241")),c=a("a322"),u=(a("7f7f"),a("e7e5"),a("d399")),l=a("c93e"),d=(a("cadf"),a("551c"),a("097d"),a("2f62")),f=a("c5dc"),p=a("35df"),h=a("db04"),g={name:"index",data:function(){return{iccid:Object(p["j"])("check_iccid"),auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],usageInfo:{},filterCardInfo:{today_used_flow:"",used_flow:"",surplus_flow:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1},recording_list:Object(p["j"])("recording_list","arr")||[]}},computed:Object(l["a"])({},Object(d["b"])({isShowUser:function(t){return t.userInfo.showUser},authorizeUserInfo:function(t){return t.userInfo.userInfoInner}})),components:(s={},Object(c["a"])(s,u["a"].name,u["a"]),Object(c["a"])(s,"userHeader",f["a"]),s),created:function(){this.iccid?this.initial():this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),Object(h["a"])("/api/v1/app/cards/status/usage",{iccid:this.iccid,type:1}).then(function(e){if(t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==e.state){Object(p["q"])("check_realNameSource",e.data.source),t.usageInfo=e.data;if(e.data.today_used_flow>=0?e.data.today_used_flow>=1024?t.filterCardInfo.today_used_flow="".concat(Object(p["r"])(e.data.today_used_flow/1024),"G"):t.filterCardInfo.today_used_flow="".concat(Object(p["r"])(e.data.today_used_flow),"M"):t.filterCardInfo.today_used_flo="0.00M",e.data.used>=0&&e.data.total>=0?(e.data.used>=1024?t.filterCardInfo.used_flow="".concat(Object(p["r"])(e.data.used/1024),"G"):t.filterCardInfo.used_flow="".concat(Object(p["r"])(e.data.used),"M"),e.data.total>=0?e.data.used>=1024?t.filterCardInfo.surplus_flow="".concat(Object(p["r"])((e.data.total-e.data.used)/1024),"G"):t.filterCardInfo.surplus_flow="".concat(Object(p["r"])(e.data.total-e.data.used),"M"):t.filterCardInfo.surplus_flow="无限量"):(t.filterCardInfo.used_flow="暂无",t.filterCardInfo.surplus_flow="暂无"),0==t.usageInfo.auth_status&&t.usageInfo.need_auth){var a=t.checkAllCardStatus();1==a.state?(t.iccid=a.iccid,Object(p["q"])("check_iccid",t.iccid),t.initial()):t.$router.push({path:"/weixin/new_card/real_name"})}t.inArray(t.usageInfo.source,[1,4])>=0?t.auth_status.push("手淘实名"):t.auth_status.push("已实名"),t.usageInfo.need_auth?t.filterCardInfo.real_name_state=t.auth_status[t.usageInfo.auth_status]:t.filterCardInfo.real_name_state="已实名",t.inArray(t.usageInfo.source,[1,5])>=0&&t.usageInfo.imei&&(t.usageInfo.imei&&t.usageInfo.fenli?2==t.usageInfo.status?t.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:t.filterCardInfo.device_state={state:"机卡分离",code:2}:t.filterCardInfo.device_state={state:"机卡已绑定",code:1}),t.filterCardInfo.card_str_state=t.card_state[t.usageInfo.status],localStorage.setItem("is_flow_card",1)}else t.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:e.msg?e.msg:"获取数据信息失败，请稍后再试"})})},buyPlan:function(){var t=this;if(23==this.usageInfo.source)if(""!=this.usageInfo.activated_date){var e=this.dateDiff(this.usageInfo.activated_date,this.usageInfo.current_time);if(e>360)r["a"].confirm({title:"提示",message:"您的物联网卡已到期,无法继续充值,请更换卡",confirmButtonText:"去换卡",cancelButtonText:"取消"}).then(function(){t.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)}).catch(function(){return!1});else if(360-e<=30){var a=(360-e).toFixed(0);r["a"].confirm({title:"提示",message:"您的物联网卡还有"+a+"天到期,到期后无法继续充值使用,请更换卡",confirmButtonText:"去换卡",cancelButtonText:"取消"}).then(function(){t.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)}).catch(function(){return!1})}else this.$router.push("/mifi/plan/group")}else this.$router.push("/mifi/plan/group");else this.$router.push("/mifi/plan/group")},flowCheck:function(){this.$router.push("/mifi/plan/usage")},checkOrder:function(){this.$router.push("/mifi/order/index")},couponExchange:function(){var t=this;if(23==this.usageInfo.source)if(""!=this.usageInfo.activated_date){var e=this.dateDiff(this.usageInfo.activated_date,this.usageInfo.current_time);if(e>360)r["a"].confirm({title:"提示",message:"您的物联网卡已到期,无法继续充值,请更换卡",confirmButtonText:"去换卡",cancelButtonText:"取消"}).then(function(){t.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)}).catch(function(){return!1});else if(360-e<=30){var a=(360-e).toFixed(0);r["a"].confirm({title:"提示",message:"您的物联网卡还有"+a+"天到期,到期后无法继续充值使用,请更换卡",confirmButtonText:"去换卡",cancelButtonText:"取消"}).then(function(){t.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)}).catch(function(){return!1})}else this.$router.push("/mifi/coupon/index")}else this.$router.push("/mifi/coupon/index");else this.$router.push("/mifi/coupon/index")},toQuestion:function(){this.$router.push("/weixin/question/index")},changedCard:function(){this.$router.push("/mifi/card/lookup")},toChangeNework:function(){this.$router.push("/mifi/card/change_network")},toChangeCard:function(){this.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)},toChangeEq:function(){this.$router.push({name:"eqReplaceMent",params:{status:0}}),localStorage.setItem("replaceStatus",0)},inArray:function(t,e,a){return null==e?-1:e.indexOf(t,a)},checkAllCardStatus:function(){var t;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){t=this.recording_list[e].iccid;break}return t?{state:1,iccid:t}:void 0},toRealName:function(){3!=this.usageInfo.auth_status&&4!=this.usageInfo.auth_status?0==this.usageInfo.auth_status&&this.usageInfo.need_auth&&(Object(p["q"])("check_realNameSource",this.usageInfo.source),this.$router.push({path:"/weixin/new_card/real_name"})):Object(u["a"])({position:"top",message:"此卡已实名"})},dateDiff:function(t,e){var a=Object(o["a"])(t),s=Object(o["a"])(e);return"string"==a?t=this.stringToTime(t):t.getTime&&(t=t.getTime()),"string"==s?e=this.stringToTime(e):e.getTime&&(e=e.getTime()),(e-t)/1e3/60/60/24},stringToTime:function(t){var e=t.split(" ",2),a=(e[0]?e[0]:"").split("-",3),s=(e[1]?e[1]:"").split(":",3);return new Date(parseInt(a[0],10)||null,(parseInt(a[1],10)||1)-1,parseInt(a[2],10)||null,parseInt(s[0],10)||null,parseInt(s[1],10)||null,parseInt(s[2],10)||null).getTime()}}},m=g,v=(a("54ee"),a("2877")),_=Object(v["a"])(m,n,i,!1,null,null,null);_.options.__file="index.vue";e["default"]=_.exports},b258:function(t,e,a){},c10b:function(t,e,a){},c5dc:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-wrap"},[a("div",{staticClass:"user-inner-wrap"},[a("div",{staticClass:"user-name-wrap"},[a("img",{attrs:{src:t.getUserInfo.avatar}}),a("span",{staticClass:"user-name"},[t._v(t._s(t.getUserInfo.nickname))])]),a("div",[a("span",[t._v("余额:")]),a("span",{staticClass:"icon-diamond-wrap",on:{click:function(e){t.showDoc()}}},[a("i",{staticClass:"icon-user-size  icon-diamond"}),t._v("\n                      "+t._s(t.getUserInfo.account.balance)+"\n                  ")]),a("span",{staticClass:"tip-wrap",on:{click:t.showDoc}},[t._v("!")])])])])},n=[],i=a("a322"),o=(a("7f7f"),a("e17f"),a("2241")),r=a("c93e"),c=a("2f62"),u={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(r["a"])({},Object(c["b"])({getUserInfo:function(t){return t.userInfo.userInfoInner}})),components:Object(i["a"])({},o["a"].name,o["a"]),methods:{showDoc:function(t){var e;e="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录",o["a"].alert({message:e})}}},l=u,d=(a("0b6e"),a("2877")),f=Object(d["a"])(l,s,n,!1,null,null,null);f.options.__file="uesrHead.vue";e["a"]=f.exports},d399:function(t,e,a){"use strict";var s=a("1988"),n=a("2b0e"),i=a("d282"),o=a("a142"),r=a("6605"),c=a("ad06"),u=a("543e"),l=Object(i["a"])("toast"),d=l[0],f=l[1],p=d({mixins:[r["a"]],props:{icon:String,className:null,iconPrefix:String,loadingType:String,forbidClick:Boolean,closeOnClick:Boolean,message:[Number,String],type:{type:String,default:"text"},position:{type:String,default:"middle"},transition:{type:String,default:"van-fade"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:"toggleClickable",forbidClick:"toggleClickable"},methods:{onClick:function(){this.closeOnClick&&this.close()},toggleClickable:function(){var t=this.value&&this.forbidClick;if(this.clickable!==t){this.clickable=t;var e=t?"add":"remove";document.body.classList[e]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")},genIcon:function(){var t=this.$createElement,e=this.icon,a=this.type,s=this.iconPrefix,n=this.loadingType,i=e||"success"===a||"fail"===a;return i?t(c["a"],{class:f("icon"),attrs:{classPrefix:s,name:e||a}}):"loading"===a?t(u["a"],{class:f("loading"),attrs:{type:n}}):void 0},genMessage:function(){var t=this.$createElement,e=this.type,a=this.message;if(Object(o["b"])(a)&&""!==a)return"html"===e?t("div",{class:f("text"),domProps:{innerHTML:a}}):t("div",{class:f("text")},[a])}},render:function(){var t,e=arguments[0];return e("transition",{attrs:{name:this.transition},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[e("div",{directives:[{name:"show",value:this.value}],class:[f([this.position,(t={},t[this.type]=!this.icon,t)]),this.className],on:{click:this.onClick}},[this.genIcon(),this.genMessage()])])}}),h={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",overlay:!1,onClose:null,onOpened:null,duration:2e3,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null,closeOnClick:!1,closeOnClickOverlay:!1},g={},m=[],v=!1,_=Object(s["a"])({},h);function C(t){return Object(o["c"])(t)?t:{message:t}}function I(){if(o["d"])return{};if(!m.length||v){var t=new(n["default"].extend(p))({el:document.createElement("div")});t.$on("input",function(e){t.value=e}),m.push(t)}return m[m.length-1]}function w(t){return Object(s["a"])({},t,{overlay:t.mask||t.overlay,mask:void 0,duration:void 0})}function b(t){void 0===t&&(t={});var e=I();return e.value&&e.updateZIndex(),t=C(t),t=Object(s["a"])({},_,{},g[t.type||_.type],{},t),t.clear=function(){e.value=!1,t.onClose&&t.onClose(),v&&!o["d"]&&e.$on("closed",function(){clearTimeout(e.timer),m=m.filter(function(t){return t!==e});var t=e.$el.parentNode;t&&t.removeChild(e.$el),e.$destroy()})},Object(s["a"])(e,w(t)),clearTimeout(e.timer),t.duration>0&&(e.timer=setTimeout(function(){e.clear()},t.duration)),e}var k=function(t){return function(e){return b(Object(s["a"])({type:t},C(e)))}};["loading","success","fail"].forEach(function(t){b[t]=k(t)}),b.clear=function(t){m.length&&(t?(m.forEach(function(t){t.clear()}),m=[]):v?m.shift().clear():m[0].clear())},b.setDefaultOptions=function(t,e){"string"===typeof t?g[t]=e:Object(s["a"])(_,t)},b.resetDefaultOptions=function(t){"string"===typeof t?g[t]=null:(_=Object(s["a"])({},h),g={})},b.allowMultiple=function(t){void 0===t&&(t=!0),v=t},b.install=function(){n["default"].use(p)},n["default"].prototype.$toast=b;e["a"]=b},e27a:function(t,e,a){},e7e5:function(t,e,a){"use strict";a("68ef"),a("a71a"),a("9d70"),a("09fe"),a("3743"),a("4d75"),a("e3b3"),a("b258")}}]);
//# sourceMappingURL=mifi_card_info.832e9882.js.map