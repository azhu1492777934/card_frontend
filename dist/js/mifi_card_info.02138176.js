(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_info"],{"54ee":function(t,e,a){"use strict";var i=a("c10b"),s=a.n(i);s.a},"885f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-wrap"},[a("div",{staticClass:"top-info"},[a("div",{staticClass:"top-info-left"},[a("p",[t._v("\n                近期查询"),a("span",{staticClass:"iconfont icon-refresh",on:{click:t.refreshCard}})]),a("p",[t._v(t._s(t.iccid))]),a("div",{staticClass:"card-status-wrap"},[a("div",[a("span",{staticClass:"card-status",class:t.usageInfo.auth_status>=3?"status-gradient":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.real_name_state)+"\n                    ")]),""==t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:t.usageInfo.status>=3?"status-gradient":"status-gradient-green"},[t._v("\n                        "+t._s(t.filterCardInfo.card_str_state)+"\n                    ")]):t._e(),""!=t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:1==t.filterCardInfo.device_state.code?"status-gradient-green":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.device_state.state)+"\n                    ")]):t._e()]),a("div",[a("router-link",{staticClass:"card-question",attrs:{to:{path:"/weixin/question/index",query:{from:"mifi"}}}},[t._v("?")]),a("router-link",{staticClass:"card-change",attrs:{to:"/mifi/card/lookup"}},[t._v(" 去变更> ")])],1)])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"top-info-right",class:{"no-need-realname":"已实名"===t.filterCardInfo.real_name_state||"手淘实名"===t.filterCardInfo.real_name_state},on:{click:t.toRealName}},[a("span",{staticClass:"iconfont icon-user"}),a("p",[t._v("去实名")])])]),a("div",{staticClass:"card-function-wrap"},[a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.buyPlan}},[a("span",{staticClass:"iconfont icon-cart"}),a("p",[t._v("购买套餐")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"item-function-wrap",on:{click:t.flowCheck}},[a("span",{staticClass:"iconfont icon-info"}),a("p",[t._v("流量查询")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.checkOrder}},[a("span",{staticClass:"iconfont icon-txt"}),a("p",[t._v("订单查询")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.couponExchange}},[a("span",{staticClass:"iconfont icon-coupon"}),a("p",[t._v("卡券兑换")])])])])])},s=[],n=a("a322"),c=(a("7f7f"),a("e7e5"),a("d399")),o=(a("cadf"),a("551c"),a("097d"),a("35df")),r=a("db04"),u={name:"index",data:function(){return{iccid:Object(o["h"])("check_iccid"),auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],usageInfo:{},filterCardInfo:{msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1},recording_list:Object(o["h"])("recording_list","arr")||[]}},components:Object(n["a"])({},c["a"].name,c["a"]),created:function(){this.iccid?this.initial():this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),Object(r["a"])("/api/v1/app/cards/status/usage",{iccid:this.iccid,type:1}).then(function(e){if(t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==e.state){if(Object(o["l"])("check_realNameSource",e.data.source),t.usageInfo=e.data,0==t.usageInfo.auth_status&&t.usageInfo.need_auth){var a=t.checkAllCardStatus();1==a.state?(t.iccid=a.iccid,Object(o["l"])("check_iccid",t.iccid),t.initial()):t.$router.push({path:"/weixin/new_card/real_name"})}t.inArray(t.usageInfo.source,[1,4])>=0?t.auth_status.push("手淘实名"):t.auth_status.push("已实名"),t.usageInfo.need_auth?t.filterCardInfo.real_name_state=t.auth_status[t.usageInfo.auth_status]:t.filterCardInfo.real_name_state="已实名",t.inArray(t.usageInfo.source,[1,5])>=0&&t.usageInfo.imei&&(t.usageInfo.imei&&t.usageInfo.fenli?2==t.usageInfo.status?t.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:t.filterCardInfo.device_state={state:"机卡分离",code:2}:t.filterCardInfo.device_state={state:"机卡已绑定",code:1}),t.filterCardInfo.card_str_state=t.card_state[t.usageInfo.status]}else t.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:e.msg?e.msg:"获取数据信息失败，请稍后再试"})})},refreshCard:function(){window.location.reload()},buyPlan:function(){this.$router.push("/mifi/plan/group")},flowCheck:function(){this.$router.push("/mifi/plan/usage")},checkOrder:function(){this.$router.push("/mifi/order/index")},couponExchange:function(){this.$router.push("/mifi/coupon/index")},inArray:function(t,e,a){return null==e?-1:e.indexOf(t,a)},checkAllCardStatus:function(){var t;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){t=this.recording_list[e].iccid;break}return t?{state:1,iccid:t}:void 0},toRealName:function(){3!=this.usageInfo.auth_status&&4!=this.usageInfo.auth_status?0==this.usageInfo.auth_status&&this.usageInfo.need_auth&&(Object(o["l"])("check_realNameSource",this.usageInfo.source),this.$router.push({path:"/weixin/new_card/real_name"})):Object(c["a"])({position:"top",message:"此卡已实名"})}}},l=u,d=(a("54ee"),a("2877")),f=Object(d["a"])(l,i,s,!1,null,null,null);f.options.__file="index.vue";e["default"]=f.exports},b258:function(t,e,a){},c10b:function(t,e,a){},d399:function(t,e,a){"use strict";var i=a("1988"),s=a("2b0e"),n=a("fe7e"),c=a("6605"),o=["success","fail","loading"],r=Object(n["a"])({render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"van-fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b([t.style,t.position])},["text"===t.style?a("div",[t._v(t._s(t.message))]):t._e(),"html"===t.style?a("div",{domProps:{innerHTML:t._s(t.message)}}):t._e(),"default"===t.style?["loading"===t.type?a("loading",{attrs:{color:"white",type:t.loadingType}}):a("icon",{class:t.b("icon"),attrs:{name:t.type}}),t.isDef(t.message)?a("div",{class:t.b("text")},[t._v("\n        "+t._s(t.message)+"\n      ")]):t._e()]:t._e()],2)])},name:"toast",mixins:[c["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==o.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var t=this.value&&this.forbidClick;if(this.clickable!==t){this.clickable=t;var e=t?"add":"remove";document.body.classList[e]("van-toast--unclickable")}}}}),u=a("a142"),l={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},d=function(t){return Object(u["d"])(t)?t:{message:t}},f=[],h=!0,p=Object(i["a"])({},l);function _(){if(u["e"])return{};if(!f.length||!h){var t=new(s["a"].extend(r))({el:document.createElement("div")});document.body.appendChild(t.$el),f.push(t)}return f[f.length-1]}function g(t){return t.overlay=t.mask,t}function m(t){void 0===t&&(t={});var e=_();return t=Object(i["a"])({},p,d(t),{clear:function(){e.value=!1,h||u["e"]||(document.body.removeChild(e.$el),e.$destroy())}}),Object(i["a"])(e,g(t)),clearTimeout(e.timer),t.duration>0&&(e.timer=setTimeout(function(){e.clear()},t.duration)),e}var v=function(t){return function(e){return m(Object(i["a"])({type:t},d(e)))}};["loading","success","fail"].forEach(function(t){m[t]=v(t)}),m.clear=function(t){f.length&&(t?(f.forEach(function(t){t.clear()}),f=[]):h?f[0].clear():f.shift().clear())},m.setDefaultOptions=function(t){Object(i["a"])(p,t)},m.resetDefaultOptions=function(){p=Object(i["a"])({},l)},m.allowMultiple=function(t){void 0===t&&(t=!0),h=!t},m.install=function(){s["a"].use(r)},s["a"].prototype.$toast=m;e["a"]=m},e7e5:function(t,e,a){"use strict";a("68ef"),a("4d75"),a("b258")}}]);
//# sourceMappingURL=mifi_card_info.02138176.js.map