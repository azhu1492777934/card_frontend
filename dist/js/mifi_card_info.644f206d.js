(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_info"],{"0b6e":function(t,a,e){"use strict";var s=e("e27a"),i=e.n(s);i.a},"54ee":function(t,a,e){"use strict";var s=e("c10b"),i=e.n(s);i.a},"885f":function(t,a,e){"use strict";e.r(a);var s,i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-wrap"},["mifi"!=t.global_variables.packed_project?e("user-header",{directives:[{name:"show",rawName:"v-show",value:t.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:t.authorizeUserInfo}}):t._e(),e("div",{staticClass:"top-info"},[e("div",{staticClass:"top-info-left"},[e("div",{staticClass:"card-recent-wrap"},[e("p",[t._v("近期查询")]),e("div",{staticClass:"card-status-wrap"},[e("span",{staticClass:"card-status",class:t.usageInfo.auth_status>=3?"status-gradient":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.real_name_state)+"\n                    ")]),""==t.filterCardInfo.device_state?e("span",{staticClass:"card-status",class:t.usageInfo.status>=3?"status-gradient":"status-gradient-green"},[t._v("\n                        "+t._s(t.filterCardInfo.card_str_state)+"\n                    ")]):t._e(),""!=t.filterCardInfo.device_state?e("span",{staticClass:"card-status",class:1==t.filterCardInfo.device_state.code?"status-gradient-green":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.device_state.state)+"\n                    ")]):t._e()])]),e("p",{staticClass:"iccid-wrap"},[t._v(t._s(t.iccid))]),e("div",{staticClass:"card-info"},[e("div",[e("span",[t._v(t._s(t.filterCardInfo.used_flow))]),e("p",[t._v("已用流量")])]),e("span",{staticClass:"divider"}),e("div",[e("span",[t._v(t._s(t.filterCardInfo.surplus_flow))]),e("p",[t._v("剩余流量")])]),e("span",{staticClass:"divider"}),e("div",[e("span",[t._v(t._s(t.filterCardInfo.today_used_flow))]),e("p",[t._v("今日用量")])]),e("span",{staticClass:"divider"}),e("div",{on:{click:t.changedCard}},[e("span",{staticClass:"iconfont icon-exchange"}),e("p",[t._v("更换卡号")])])])])]),e("div",{staticClass:"card-function-wrap"},[e("div",{staticClass:"function-group-wrap"},[e("div",{on:{click:t.buyPlan}},[e("span",{staticClass:"iconfont icon-recharge"}),e("p",[t._v("购买套餐")])]),e("span",{staticClass:"divider"}),e("div",{staticClass:"item-function-wrap",on:{click:t.flowCheck}},[e("span",{staticClass:"iconfont icon-info"}),e("p",[t._v("流量查询")])]),e("span",{staticClass:"divider"}),e("div",{on:{click:t.checkOrder}},[e("span",{staticClass:"iconfont icon-txt"}),e("p",[t._v("订单查询")])])]),e("div",{staticClass:"function-group-wrap"},[e("div",{on:{click:t.couponExchange}},[e("span",{staticClass:"iconfont icon-coupon"}),e("p",[t._v("卡券兑换")])]),e("span",{staticClass:"divider"}),e("div",{on:{click:t.toQuestion}},[e("span",{staticClass:"iconfont icon-question"}),e("p",[t._v("问题中心")])]),e("span",{staticClass:"divider"}),e("div",{staticClass:"change-network-wrap",on:{click:t.toChangeNework}},[e("span",{staticClass:"iconfont icon-change"}),e("p",[t._v("网速慢,切换网络")])])]),e("div",{staticClass:"function-group-wrap"},[e("div",{on:{click:t.toChangeCard}},[e("span",{staticClass:"iconfont icon-changeCard"}),e("p",[t._v("卡更换")])]),e("span",{staticClass:"divider"}),e("div",{on:{click:t.toChangeEq}},[e("span",{staticClass:"iconfont icon-changeEq"}),e("p",[t._v("设备更换")])]),e("span",{staticClass:"divider",staticStyle:{opacity:"0"}}),e("div")])])],1)},n=[],o=e("a322"),c=(e("7f7f"),e("e7e5"),e("d399")),r=e("c93e"),u=e("2f62"),d=e("c5dc"),l=e("35df"),f=e("db04"),p={name:"index",data:function(){return{iccid:Object(l["j"])("check_iccid"),auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],usageInfo:{},filterCardInfo:{today_used_flow:"",used_flow:"",surplus_flow:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1},recording_list:Object(l["j"])("recording_list","arr")||[]}},computed:Object(r["a"])({},Object(u["b"])({isShowUser:function(t){return t.userInfo.showUser},authorizeUserInfo:function(t){return t.userInfo.userInfoInner}})),components:(s={},Object(o["a"])(s,c["a"].name,c["a"]),Object(o["a"])(s,"userHeader",d["a"]),s),created:function(){this.iccid?this.initial():this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),Object(f["a"])("/api/v1/app/cards/status/usage",{iccid:this.iccid,type:1}).then(function(a){if(t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==a.state){if(Object(l["o"])("check_realNameSource",a.data.source),t.usageInfo=a.data,a.data.today_used_flow>=0?a.data.today_used_flow>=1024?t.filterCardInfo.today_used_flow="".concat(Object(l["p"])(a.data.today_used_flow/1024),"G"):t.filterCardInfo.today_used_flow="".concat(Object(l["p"])(a.data.today_used_flow),"M"):t.filterCardInfo.today_used_flo="0.00M",a.data.used>=0&&a.data.total>=0?(a.data.used>=1024?t.filterCardInfo.used_flow="".concat(Object(l["p"])(a.data.used/1024),"G"):t.filterCardInfo.used_flow="".concat(Object(l["p"])(a.data.used),"M"),a.data.total>=0?a.data.used>=1024?t.filterCardInfo.surplus_flow="".concat(Object(l["p"])((a.data.total-a.data.used)/1024),"G"):t.filterCardInfo.surplus_flow="".concat(Object(l["p"])(a.data.total-a.data.used),"M"):t.filterCardInfo.surplus_flow="无限量"):(t.filterCardInfo.used_flow="暂无",t.filterCardInfo.surplus_flow="暂无"),0==t.usageInfo.auth_status&&t.usageInfo.need_auth){var e=t.checkAllCardStatus();1==e.state?(t.iccid=e.iccid,Object(l["o"])("check_iccid",t.iccid),t.initial()):t.$router.push({path:"/weixin/new_card/real_name"})}t.inArray(t.usageInfo.source,[1,4])>=0?t.auth_status.push("手淘实名"):t.auth_status.push("已实名"),t.usageInfo.need_auth?t.filterCardInfo.real_name_state=t.auth_status[t.usageInfo.auth_status]:t.filterCardInfo.real_name_state="已实名",t.inArray(t.usageInfo.source,[1,5])>=0&&t.usageInfo.imei&&(t.usageInfo.imei&&t.usageInfo.fenli?2==t.usageInfo.status?t.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:t.filterCardInfo.device_state={state:"机卡分离",code:2}:t.filterCardInfo.device_state={state:"机卡已绑定",code:1}),t.filterCardInfo.card_str_state=t.card_state[t.usageInfo.status],localStorage.setItem("is_flow_card",1)}else t.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:a.msg?a.msg:"获取数据信息失败，请稍后再试"})})},buyPlan:function(){this.$router.push("/mifi/plan/group")},flowCheck:function(){this.$router.push("/mifi/plan/usage")},checkOrder:function(){this.$router.push("/mifi/order/index")},couponExchange:function(){this.$router.push("/mifi/coupon/index")},toQuestion:function(){this.$router.push("/weixin/question/index")},changedCard:function(){this.$router.push("/mifi/card/lookup")},toChangeNework:function(){this.$router.push("/mifi/card/change_network")},toChangeCard:function(){this.$router.push({name:"eqReplaceMent",params:{status:1}}),localStorage.setItem("replaceStatus",1)},toChangeEq:function(){this.$router.push({name:"eqReplaceMent",params:{status:0}}),localStorage.setItem("replaceStatus",0)},inArray:function(t,a,e){return null==a?-1:a.indexOf(t,e)},checkAllCardStatus:function(){var t;if(this.recording_list.length<=1)return{state:0};for(var a=0;a<this.recording_list.length;a++)if(this.recording_list[a].realname){t=this.recording_list[a].iccid;break}return t?{state:1,iccid:t}:void 0},toRealName:function(){3!=this.usageInfo.auth_status&&4!=this.usageInfo.auth_status?0==this.usageInfo.auth_status&&this.usageInfo.need_auth&&(Object(l["o"])("check_realNameSource",this.usageInfo.source),this.$router.push({path:"/weixin/new_card/real_name"})):Object(c["a"])({position:"top",message:"此卡已实名"})}}},_=p,h=(e("54ee"),e("2877")),v=Object(h["a"])(_,i,n,!1,null,null,null);v.options.__file="index.vue";a["default"]=v.exports},b258:function(t,a,e){},c10b:function(t,a,e){},c5dc:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"user-wrap"},[e("div",{staticClass:"user-inner-wrap"},[e("div",{staticClass:"user-name-wrap"},[e("img",{attrs:{src:t.getUserInfo.avatar}}),e("span",{staticClass:"user-name"},[t._v(t._s(t.getUserInfo.nickname))])]),e("div",[e("span",[t._v("余额:")]),e("span",{staticClass:"icon-diamond-wrap",on:{click:function(a){t.showDoc()}}},[e("i",{staticClass:"icon-user-size  icon-diamond"}),t._v("\n                      "+t._s(t.getUserInfo.account.balance)+"\n                  ")]),e("span",{staticClass:"tip-wrap",on:{click:t.showDoc}},[t._v("!")])])])])},i=[],n=e("a322"),o=(e("7f7f"),e("e17f"),e("2241")),c=e("c93e"),r=e("2f62"),u={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(c["a"])({},Object(r["b"])({getUserInfo:function(t){return t.userInfo.userInfoInner}})),components:Object(n["a"])({},o["a"].name,o["a"]),methods:{showDoc:function(t){var a;a="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录",o["a"].alert({message:a})}}},d=u,l=(e("0b6e"),e("2877")),f=Object(l["a"])(d,s,i,!1,null,null,null);f.options.__file="uesrHead.vue";a["a"]=f.exports},d399:function(t,a,e){"use strict";var s=e("1988"),i=e("2b0e"),n=e("fe7e"),o=e("6605"),c=["success","fail","loading"],r=Object(n["a"])({render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("transition",{attrs:{name:"van-fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b([t.style,t.position])},["text"===t.style?e("div",[t._v(t._s(t.message))]):t._e(),"html"===t.style?e("div",{domProps:{innerHTML:t._s(t.message)}}):t._e(),"default"===t.style?["loading"===t.type?e("loading",{attrs:{color:"white",type:t.loadingType}}):e("icon",{class:t.b("icon"),attrs:{name:t.type}}),t.isDef(t.message)?e("div",{class:t.b("text")},[t._v("\n        "+t._s(t.message)+"\n      ")]):t._e()]:t._e()],2)])},name:"toast",mixins:[o["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==c.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var t=this.value&&this.forbidClick;if(this.clickable!==t){this.clickable=t;var a=t?"add":"remove";document.body.classList[a]("van-toast--unclickable")}}}}),u=e("a142"),d={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},l=function(t){return Object(u["d"])(t)?t:{message:t}},f=[],p=!0,_=Object(s["a"])({},d);function h(){if(u["e"])return{};if(!f.length||!p){var t=new(i["default"].extend(r))({el:document.createElement("div")});document.body.appendChild(t.$el),f.push(t)}return f[f.length-1]}function v(t){return t.overlay=t.mask,t}function g(t){void 0===t&&(t={});var a=h();return t=Object(s["a"])({},_,l(t),{clear:function(){a.value=!1,p||u["e"]||(document.body.removeChild(a.$el),a.$destroy())}}),Object(s["a"])(a,v(t)),clearTimeout(a.timer),t.duration>0&&(a.timer=setTimeout(function(){a.clear()},t.duration)),a}var m=function(t){return function(a){return g(Object(s["a"])({type:t},l(a)))}};["loading","success","fail"].forEach(function(t){g[t]=m(t)}),g.clear=function(t){f.length&&(t?(f.forEach(function(t){t.clear()}),f=[]):p?f[0].clear():f.shift().clear())},g.setDefaultOptions=function(t){Object(s["a"])(_,t)},g.resetDefaultOptions=function(){_=Object(s["a"])({},d)},g.allowMultiple=function(t){void 0===t&&(t=!0),p=!t},g.install=function(){i["default"].use(r)},i["default"].prototype.$toast=g;a["a"]=g},e27a:function(t,a,e){},e7e5:function(t,a,e){"use strict";e("68ef"),e("4d75"),e("b258")}}]);
//# sourceMappingURL=mifi_card_info.644f206d.js.map