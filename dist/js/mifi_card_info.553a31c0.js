(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_info"],{"0b6e":function(t,e,a){"use strict";var n=a("e27a"),s=a.n(n);s.a},2241:function(t,e,a){"use strict";var n,s=a("1988"),i=a("2b0e"),o=a("fe7e"),c=Object(o["a"])({render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(t.tag,{tag:"component",class:t.b([t.type,t.size,{block:t.block,plain:t.plain,round:t.round,square:t.square,loading:t.loading,disabled:t.disabled,unclickable:t.disabled||t.loading,"bottom-action":t.bottomAction}]),attrs:{type:t.nativeType,disabled:t.disabled},on:{click:t.onClick}},[t.loading?a("loading",{attrs:{size:"20px",color:"default"===t.type?void 0:""}}):a("span",{class:t.b("text")},[t._t("default",[t._v(t._s(t.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(t){this.loading||this.disabled||this.$emit("click",t)}}}),r=a("6605"),l=Object(o["a"])({render:function(){var t,e=this,a=e.$createElement,n=e._self._c||a;return n("transition",{attrs:{name:"van-dialog-bounce"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:[e.b(),e.className]},[e.title?n("div",{class:e.b("header",{isolated:!e.message&&!e.$slots.default}),domProps:{textContent:e._s(e.title)}}):e._e(),e.message||e.$slots.default?n("div",{class:e.b("content")},[e._t("default",[e.message?n("div",{class:e.b("message",(t={"has-title":e.title},t[e.messageAlign]=e.messageAlign,t)),domProps:{innerHTML:e._s(e.message)}}):e._e()])],2):e._e(),n("div",{staticClass:"van-hairline--top",class:e.b("footer",{buttons:e.showCancelButton&&e.showConfirmButton})},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:e.showCancelButton,expression:"showCancelButton"}],class:e.b("cancel"),attrs:{loading:e.loading.cancel,size:"large"},on:{click:function(t){e.handleAction("cancel")}}},[e._v("\n        "+e._s(e.cancelButtonText||e.$t("cancel"))+"\n      ")]),n("van-button",{directives:[{name:"show",rawName:"v-show",value:e.showConfirmButton,expression:"showConfirmButton"}],class:[e.b("confirm"),{"van-hairline--left":e.showCancelButton&&e.showConfirmButton}],attrs:{size:"large",loading:e.loading.confirm},on:{click:function(t){e.handleAction("confirm")}}},[e._v("\n        "+e._s(e.confirmButtonText||e.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:c},mixins:[r["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(t){var e=this;this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,function(a){!1!==a&&e.onClose(t),e.loading[t]=!1})):this.onClose(t)},onClose:function(t){this.$emit("input",!1),this.$emit(t),this.callback&&this.callback(t)}}}),u=a("a142"),d=function(){n=new(i["a"].extend(l))({el:document.createElement("div")}),n.$on("input",function(t){n.value=t}),document.body.appendChild(n.$el)},f=function t(e){return u["e"]?Promise.resolve():new Promise(function(a,i){n||d(),Object(s["a"])(n,t.currentOptions,e,{resolve:a,reject:i})})};f.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(t){n["confirm"===t?"resolve":"reject"](t)}},f.alert=f,f.confirm=function(t){return f(Object(s["a"])({showCancelButton:!0},t))},f.close=function(){n&&(n.value=!1)},f.setDefaultOptions=function(t){Object(s["a"])(f.currentOptions,t)},f.resetDefaultOptions=function(){f.currentOptions=Object(s["a"])({},f.defaultOptions)},f.install=function(){i["a"].use(l)},i["a"].prototype.$dialog=f,f.resetDefaultOptions();e["a"]=f},"2fcb":function(t,e,a){},"54ee":function(t,e,a){"use strict";var n=a("c10b"),s=a.n(n);s.a},"885f":function(t,e,a){"use strict";a.r(e);var n,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-wrap"},[a("user-header",{directives:[{name:"show",rawName:"v-show",value:t.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:t.authorizeUserInfo}}),a("div",{staticClass:"top-info"},[a("div",{staticClass:"top-info-left"},[a("div",{staticClass:"card-recent-wrap"},[a("p",[t._v("近期查询")]),a("div",{staticClass:"card-status-wrap"},[a("span",{staticClass:"card-status",class:t.usageInfo.auth_status>=3?"status-gradient":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.real_name_state)+"\n                    ")]),""==t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:t.usageInfo.status>=3?"status-gradient":"status-gradient-green"},[t._v("\n                        "+t._s(t.filterCardInfo.card_str_state)+"\n                    ")]):t._e(),""!=t.filterCardInfo.device_state?a("span",{staticClass:"card-status",class:1==t.filterCardInfo.device_state.code?"status-gradient-green":"status-gradient-warning"},[t._v("\n                        "+t._s(t.filterCardInfo.device_state.state)+"\n                    ")]):t._e()])]),a("p",{staticClass:"iccid-wrap"},[t._v(t._s(t.iccid))]),a("div",{staticClass:"card-info"},[a("div",[a("span",[t._v(t._s(t.filterCardInfo.used_flow))]),a("p",[t._v("已用流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.surplus_flow))]),a("p",[t._v("剩余流量")])]),a("span",{staticClass:"divider"}),a("div",[a("span",[t._v(t._s(t.filterCardInfo.today_used_flow))]),a("p",[t._v("今日用量")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.changedCard}},[a("span",{staticClass:"iconfont icon-exchange"}),a("p",[t._v("更换卡号")])])])])]),a("div",{staticClass:"card-function-wrap"},[a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.buyPlan}},[a("span",{staticClass:"iconfont icon-recharge"}),a("p",[t._v("购买套餐")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"item-function-wrap",on:{click:t.flowCheck}},[a("span",{staticClass:"iconfont icon-info"}),a("p",[t._v("流量查询")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.checkOrder}},[a("span",{staticClass:"iconfont icon-txt"}),a("p",[t._v("订单查询")])])]),a("div",{staticClass:"function-group-wrap"},[a("div",{on:{click:t.couponExchange}},[a("span",{staticClass:"iconfont icon-coupon"}),a("p",[t._v("卡券兑换")])]),a("span",{staticClass:"divider"}),a("div",{on:{click:t.toQuestion}},[a("span",{staticClass:"iconfont icon-question"}),a("p",[t._v("问题中心")])]),a("span",{staticClass:"divider"}),a("div",{staticClass:"change-network-wrap",on:{click:t.toChangeNework}},[a("span",{staticClass:"iconfont icon-change"}),a("p",[t._v("网速慢,切换网络")])])])])],1)},i=[],o=a("a322"),c=(a("7f7f"),a("e7e5"),a("d399")),r=a("c93e"),l=(a("cadf"),a("551c"),a("097d"),a("2f62")),u=a("c5dc"),d=a("35df"),f=a("db04"),p={name:"index",data:function(){return{iccid:Object(d["h"])("check_iccid"),auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],usageInfo:{},filterCardInfo:{today_used_flow:"",used_flow:"",surplus_flow:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1},recording_list:Object(d["h"])("recording_list","arr")||[]}},computed:Object(r["a"])({},Object(l["b"])({isShowUser:function(t){return t.userInfo.showUser},authorizeUserInfo:function(t){return t.userInfo.userInfoInner}})),components:(n={},Object(o["a"])(n,c["a"].name,c["a"]),Object(o["a"])(n,"userHeader",u["a"]),n),created:function(){this.iccid?this.initial():this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(){var t=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),Object(f["a"])("/api/v1/app/cards/status/usage",{iccid:this.iccid,type:1}).then(function(e){if(t.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==e.state){if(Object(d["m"])("check_realNameSource",e.data.source),t.usageInfo=e.data,e.data.today_used_flow>=0?e.data.today_used_flow>=1024?t.filterCardInfo.today_used_flow="".concat(Object(d["n"])(e.data.today_used_flow/1024),"G"):t.filterCardInfo.today_used_flow="".concat(Object(d["n"])(e.data.today_used_flow),"M"):t.filterCardInfo.today_used_flo="0.00M",e.data.used>=0&&e.data.total>=0?(e.data.used>=1024?t.filterCardInfo.used_flow="".concat(Object(d["n"])(e.data.used/1024),"G"):t.filterCardInfo.used_flow="".concat(Object(d["n"])(e.data.used),"M"),e.data.total>=0?e.data.used>=1024?t.filterCardInfo.surplus_flow="".concat(Object(d["n"])((e.data.total-e.data.used)/1024),"G"):t.filterCardInfo.surplus_flow="".concat(Object(d["n"])(e.data.total-e.data.used),"M"):t.filterCardInfo.surplus_flow="无限量"):(t.filterCardInfo.used_flow="暂无",t.filterCardInfo.surplus_flow="暂无"),0==t.usageInfo.auth_status&&t.usageInfo.need_auth){var a=t.checkAllCardStatus();1==a.state?(t.iccid=a.iccid,Object(d["m"])("check_iccid",t.iccid),t.initial()):t.$router.push({path:"/weixin/new_card/real_name"})}t.inArray(t.usageInfo.source,[1,4])>=0?t.auth_status.push("手淘实名"):t.auth_status.push("已实名"),t.usageInfo.need_auth?t.filterCardInfo.real_name_state=t.auth_status[t.usageInfo.auth_status]:t.filterCardInfo.real_name_state="已实名",t.inArray(t.usageInfo.source,[1,5])>=0&&t.usageInfo.imei&&(t.usageInfo.imei&&t.usageInfo.fenli?2==t.usageInfo.status?t.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:t.filterCardInfo.device_state={state:"机卡分离",code:2}:t.filterCardInfo.device_state={state:"机卡已绑定",code:1}),t.filterCardInfo.card_str_state=t.card_state[t.usageInfo.status]}else t.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:e.msg?e.msg:"获取数据信息失败，请稍后再试"})})},buyPlan:function(){this.$router.push("/mifi/plan/group")},flowCheck:function(){this.$router.push("/mifi/plan/usage")},checkOrder:function(){this.$router.push("/mifi/order/index")},couponExchange:function(){this.$router.push("/mifi/coupon/index")},toQuestion:function(){this.$router.push("/weixin/question/index")},changedCard:function(){this.$router.push("/mifi/card/lookup")},toChangeNework:function(){this.$router.push("/mifi/card/change_network")},inArray:function(t,e,a){return null==e?-1:e.indexOf(t,a)},checkAllCardStatus:function(){var t;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){t=this.recording_list[e].iccid;break}return t?{state:1,iccid:t}:void 0},toRealName:function(){3!=this.usageInfo.auth_status&&4!=this.usageInfo.auth_status?0==this.usageInfo.auth_status&&this.usageInfo.need_auth&&(Object(d["m"])("check_realNameSource",this.usageInfo.source),this.$router.push({path:"/weixin/new_card/real_name"})):Object(c["a"])({position:"top",message:"此卡已实名"})}}},h=p,m=(a("54ee"),a("2877")),_=Object(m["a"])(h,s,i,!1,null,null,null);_.options.__file="index.vue";e["default"]=_.exports},b258:function(t,e,a){},c10b:function(t,e,a){},c5dc:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-wrap"},[a("div",{staticClass:"user-inner-wrap"},[a("div",{staticClass:"user-name-wrap"},[a("img",{attrs:{src:t.getUserInfo.avatar}}),a("span",{staticClass:"user-name"},[t._v(t._s(t.getUserInfo.nickname))])]),a("div",[a("span",[t._v("余额:")]),a("span",{staticClass:"icon-diamond-wrap"},[a("i",{staticClass:"icon-user-size  icon-diamond"}),t._v("\n                      "+t._s(t.getUserInfo.account.rmb)+"\n                  ")]),a("span",{staticClass:"icon-elb-wrap"},[a("i",{staticClass:"icon-user-size icon-elb"}),t._v("\n                      "+t._s(t.getUserInfo.account.elb)+"\n                  ")]),a("span",{staticClass:"tip-wrap",on:{click:t.showDoc}},[t._v("!")])])])])},s=[],i=a("a322"),o=(a("7f7f"),a("e17f"),a("2241")),c=a("c93e"),r=(a("cadf"),a("551c"),a("097d"),a("2f62")),l={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(c["a"])({},Object(r["b"])({getUserInfo:function(t){return t.userInfo.userInfoInner}})),components:Object(i["a"])({},o["a"].name,o["a"]),methods:{showDoc:function(){o["a"].alert({message:"钻石：翼联会员体系下通用虚拟货币,可以用于:购买套餐,充值话费,游戏娱乐,购买优惠商品;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})}}},u=l,d=(a("0b6e"),a("2877")),f=Object(d["a"])(u,n,s,!1,null,null,null);f.options.__file="uesrHead.vue";e["a"]=f.exports},d399:function(t,e,a){"use strict";var n=a("1988"),s=a("2b0e"),i=a("fe7e"),o=a("6605"),c=["success","fail","loading"],r=Object(i["a"])({render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"van-fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b([t.style,t.position])},["text"===t.style?a("div",[t._v(t._s(t.message))]):t._e(),"html"===t.style?a("div",{domProps:{innerHTML:t._s(t.message)}}):t._e(),"default"===t.style?["loading"===t.type?a("loading",{attrs:{color:"white",type:t.loadingType}}):a("icon",{class:t.b("icon"),attrs:{name:t.type}}),t.isDef(t.message)?a("div",{class:t.b("text")},[t._v("\n        "+t._s(t.message)+"\n      ")]):t._e()]:t._e()],2)])},name:"toast",mixins:[o["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==c.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var t=this.value&&this.forbidClick;if(this.clickable!==t){this.clickable=t;var e=t?"add":"remove";document.body.classList[e]("van-toast--unclickable")}}}}),l=a("a142"),u={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},d=function(t){return Object(l["d"])(t)?t:{message:t}},f=[],p=!0,h=Object(n["a"])({},u);function m(){if(l["e"])return{};if(!f.length||!p){var t=new(s["a"].extend(r))({el:document.createElement("div")});document.body.appendChild(t.$el),f.push(t)}return f[f.length-1]}function _(t){return t.overlay=t.mask,t}function v(t){void 0===t&&(t={});var e=m();return t=Object(n["a"])({},h,d(t),{clear:function(){e.value=!1,p||l["e"]||(document.body.removeChild(e.$el),e.$destroy())}}),Object(n["a"])(e,_(t)),clearTimeout(e.timer),t.duration>0&&(e.timer=setTimeout(function(){e.clear()},t.duration)),e}var g=function(t){return function(e){return v(Object(n["a"])({type:t},d(e)))}};["loading","success","fail"].forEach(function(t){v[t]=g(t)}),v.clear=function(t){f.length&&(t?(f.forEach(function(t){t.clear()}),f=[]):p?f[0].clear():f.shift().clear())},v.setDefaultOptions=function(t){Object(n["a"])(h,t)},v.resetDefaultOptions=function(){h=Object(n["a"])({},u)},v.allowMultiple=function(t){void 0===t&&(t=!0),p=!t},v.install=function(){s["a"].use(r)},s["a"].prototype.$toast=v;e["a"]=v},e17f:function(t,e,a){"use strict";a("68ef"),a("4d75"),a("2fcb")},e27a:function(t,e,a){},e7e5:function(t,e,a){"use strict";a("68ef"),a("4d75"),a("b258")}}]);
//# sourceMappingURL=mifi_card_info.553a31c0.js.map