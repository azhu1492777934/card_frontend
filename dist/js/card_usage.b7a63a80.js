(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_usage"],{2134:function(e,a,t){},"2c53":function(e,a,t){e.exports=t.p+"img/unicom-logo.82459452.svg"},"2e44":function(e,a,t){e.exports=t.p+"img/mobile-logo.113f99e2.png"},"414a":function(e,a,t){},"51d7":function(e,a,t){"use strict";var s=t("2134"),i=t.n(s);i.a},"634e":function(e,a,t){e.exports=t.p+"img/telecom-logo.5f1f3403.svg"},"96ab":function(e,a,t){e.exports=t.p+"img/bg_no_recharge.aecc9531.svg"},a0ad:function(e,a,t){"use strict";var s=t("414a"),i=t.n(s);i.a},b066:function(e,a,t){e.exports=t.p+"img/bg_no_plan.275be51a.svg"},b258:function(e,a,t){},d399:function(e,a,t){"use strict";var s=t("1988"),i=t("2b0e"),n=t("d282"),r=t("a142"),o=t("6605"),l=t("ad06"),c=t("543e"),d=Object(n["a"])("toast"),f=d[0],u=d[1],_=f({mixins:[o["a"]],props:{icon:String,className:null,loadingType:String,forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:function(){this.toggleClickable()},forbidClick:function(){this.toggleClickable()}},methods:{toggleClickable:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var a=e?"add":"remove";document.body.classList[a]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")}},render:function(e){var a=this.type,t=this.icon,s=this.message,i=this.loadingType,n=t||"success"===a||"fail"===a;function o(){return n?e(l["a"],{class:u("icon"),attrs:{name:t||a}}):"loading"===a?e(c["a"],{class:u("loading"),attrs:{color:"white",type:i}}):void 0}function d(){if(Object(r["b"])(s)&&""!==s)return"html"===a?e("div",{class:u("text"),domProps:{innerHTML:s}}):e("div",{class:u("text")},[s])}return e("transition",{attrs:{name:"van-fade"},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[e("div",{directives:[{name:"show",value:this.value}],class:[u([this.position,{text:!n&&"loading"!==a}]),this.className]},[o(),d()])])}}),p={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",onClose:null,onOpened:null,duration:3e3,position:"middle",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null},g=[],h=!1,v=Object(s["a"])({},p);function C(e){return Object(r["c"])(e)?e:{message:e}}function I(){if(r["d"])return{};if(!g.length||h){var e=new(i["default"].extend(_))({el:document.createElement("div")});g.push(e)}return g[g.length-1]}function w(e){return e=Object(s["a"])({},e),e.overlay=e.mask,delete e.mask,delete e.duration,e}function m(e){void 0===e&&(e={});var a=I();return a.value&&a.updateZIndex(),e=Object(s["a"])({},v,C(e),{clear:function(){a.value=!1,e.onClose&&e.onClose(),h&&!r["d"]&&a.$on("closed",function(){clearTimeout(a.timer),g=g.filter(function(e){return e!==a});var e=a.$el.parentNode;e&&e.removeChild(a.$el),a.$destroy()})}}),Object(s["a"])(a,w(e)),clearTimeout(a.timer),e.duration>0&&(a.timer=setTimeout(function(){a.clear()},e.duration)),a}var b=function(e){return function(a){return m(Object(s["a"])({type:e},C(a)))}};["loading","success","fail"].forEach(function(e){m[e]=b(e)}),m.clear=function(e){g.length&&(e?(g.forEach(function(e){e.clear()}),g=[]):h?g.shift().clear():g[0].clear())},m.setDefaultOptions=function(e){Object(s["a"])(v,e)},m.resetDefaultOptions=function(){v=Object(s["a"])({},p)},m.allowMultiple=function(e){void 0===e&&(e=!0),h=e},m.install=function(){i["default"].use(_)},i["default"].prototype.$toast=m;a["a"]=m},e7e5:function(e,a,t){"use strict";t("68ef"),t("4d75"),t("09fe"),t("b258")},fdca:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"plan-usage-wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.load_skeleton,expression:"!load_skeleton"}]},[s("div",{ref:"refCardInfo",staticClass:"card-info-wrap"},[s("div",{staticClass:"operation-logo-wrap"},[s("img",{attrs:{src:e.filterCardInfo.operator_logo,alt:""}})]),s("div",{staticClass:"card-info-detail"},[e.filterCardInfo.is_watch_card?s("p",[e._v("手表手机号:"+e._s(e.filterCardInfo.msisdn))]):s("p",[e._v("MSISDN:"+e._s(e.filterCardInfo.msisdn))]),s("p",{class:{"p-t-45":!e.usageInfo.imei||"864319031839011"==e.usageInfo.imei}},[e._v("\n              ICCID:"+e._s(e.usageInfo.iccid)+"(编码:"+e._s(e.usageInfo.source)+")")]),e.usageInfo.imei&&"864319031839011"!=e.usageInfo.imei?s("p",[e._v("IMEI:"+e._s(e.usageInfo.imei))]):e._e(),s("div",{staticClass:"card-state-wrap"},[s("div",[s("span",{class:e.usageInfo.auth_status>=3?"cl-state-normal":"cl-state-warning"},[e._v(e._s(e.filterCardInfo.real_name_state))]),""==e.filterCardInfo.device_state?s("span",{class:e.usageInfo.status>=3?"cl-state-warning":"cl-state-primary"},[e._v(e._s(e.filterCardInfo.card_str_state))]):e._e(),""!=e.filterCardInfo.device_state?s("span",{class:1==e.filterCardInfo.device_state.code?"cl-state-primary":"cl-state-warning"},[e._v(e._s(e.filterCardInfo.device_state.state))]):e._e()]),s("div",[s("em",{on:{click:e.refreshOrActivated}},[e._v(e._s(e.filterCardInfo.refresh_actived))]),"app"!=e.client_type?s("router-link",{attrs:{to:"/weixin/question/index"}},[e._v("问题中心>")]):e._e()],1)])])]),s("div",{ref:"refCardData"},[e.filterCardInfo.is_flow_card?s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[e._v("剩余流量")]),s("span",[e._v(e._s(this.filterCardInfo.flow_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[e._v("总流量:"+e._s(this.filterCardInfo.flow_card_usage.total_flow)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.flow_card_usage.used_flow))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:e.toConnection}},[s("a",[e._v(" 流量用量详情> ")])])])]):s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[e._v("剩余流量")]),s("span",[e._v(e._s(this.filterCardInfo.watch_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[e._v("总流量:"+e._s(this.filterCardInfo.watch_card_usage.total_flow)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.watch_card_usage.used_flow))])]),s("p",[s("span",[e._v("总通话:"+e._s(this.filterCardInfo.watch_card_usage.total_voice)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.watch_card_usage.used_voice))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:e.toConnection}},[s("a",[e._v(" 流量用量详情> ")])])])])]),s("div",{staticClass:"card-plan-wrap"},[s("p",{ref:"refPlanTitle",staticClass:"card-plan-wrap-title"},e._l(e.plan_title_array,function(a,t){return s("span",{class:{checked:t==e.cur_plan_type_index},on:{click:function(a){e.planTypeClikc(t)}}},[e._v(e._s(a))])})),s("div",{staticClass:"van-swipe-wrap"},[s("swiper",{ref:"mySwiper",attrs:{options:e.swiperOption}},[s("swiper-slide",[e.hasUsagePlan?s("ul",{staticClass:"usage-plan-wrap"},e._l(e.usageInfo.usage.plans,function(a,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[e._v(e._s(a.rps_name))]),s("div",{staticClass:"plan-describe"},[a.planCellInfo&&"{}"!=JSON.stringify(a.planCellInfo)?s("div",["MG500"!=a.planCellInfo.key?s("div",[a.describe&&"None"!=a.describe?s("p",[s("span",[e._v(e._s(a.describe))]),s("br"),s("span",{},[e._v(e._s(a.remark))])]):s("p",[s("span",[e._v(e._s(a.remark))])])]):e._e(),a.planCellInfo.max_high?s("span",[e._v("高速流量:"+e._s(a.planCellInfo.max_high)+",已使用"+e._s(a.planCellInfo.used_high))]):e._e(),s("br"),a.planCellInfo.max_normal?s("span",[e._v("中速流量:"+e._s(a.planCellInfo.max_normal))]):e._e()]):s("div",[a.describe&&"None"!=a.describe?s("p",[s("span",[e._v(e._s(a.describe))]),s("br"),s("span",[e._v(e._s(a.remark))])]):s("p",[s("span",[e._v(e._s(a.remark))])])])])]),s("div",{staticClass:"plan-date-wrap"},[e.inArray(e.usageInfo.source,e.watch_source)>=0||e.inArray(e.usageInfo.source,[1,7,8])>=0?s("p",{staticClass:"plan-date"},[s("span",[e._v("开始日期:"+e._s(e.filterDate(a.activated_at)))]),s("br"),s("span",[e._v("有效日期:"+e._s(e.filterDate(a.expired_at)))])]):a.expired_at?s("p",{staticClass:"plan-date"},[s("span",[e._v("有效日期:"+e._s(e.filterDate(a.expired_at)))])]):e._e(),a.planCellInfo&&"{}"!=JSON.stringify(a.planCellInfo)?s("div",{staticClass:"speedup-wrap"},["MG500"!=a.planCellInfo.key?s("span",[1==a.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_80"}},[e._v("购买加速包")]):e._e()]):s("span",[1==a.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_500"}},[e._v("购买加速包")]):e._e()])]):e._e(),e.usagePlanLength>1?s("div",{staticClass:"prefer_use"},[1e3==a.priority?s("a",{on:{click:function(t){e.prefer_use_operate(e.usageInfo.iccid,a.id,a.priority,e.usageInfo.source)}}},[e._v("优先使用")]):e._e(),0==a.priority?s("a",{on:{click:function(t){e.prefer_use_operate(e.usageInfo.iccid,a.id,a.priority,e.usageInfo.source)}}},[e._v("取消优先")]):e._e()]):e._e()])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("b066"),alt:""}})])]),s("swiper-slide",[e.hasOrderPlan?s("ul",{staticClass:"order-plan-wrap"},e._l(e.usageInfo.orders,function(a,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[e._v(e._s(a.name))]),2522==a.rating_id?s("p",{staticClass:"plan-describe"},[s("span",[e._v("月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。")])]):s("p",{staticClass:"plan-describe"},[a.describe&&"None"!=a.describe&&""!=a.describe?s("span",[e._v(e._s(a.describe))]):e._e(),s("br"),a.describe&&""!=a.describe&&"None"!=a.describe?e._e():s("span",{},[e._v(e._s(a.remark))])]),s("p",{staticClass:"plan-orderNo"},[e._v("订单号:"+e._s(a.no))])]),s("div",{staticClass:"plan-date-wrap"},[s("p",{staticClass:"plan-date"},[s("span",[e._v("续费日期:"+e._s(e.filterDate(a.created_at)))])]),s("p",{staticClass:"plan-order-status-wrap"},[s("span",[e._v(e._s(e.order_state[a.status]))])])])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("96ab"),alt:""}})])])],1)],1)]),s("div",{ref:"refCardButton",staticClass:"btn-recharge-wrap"},[s("button",{on:{click:e.recharge}},[e._v("充值续费")]),s("router-link",{attrs:{to:"/weixin/coupon/index"}},[e._v("卡券兑换")])],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.load_skeleton,expression:"load_skeleton"}],staticClass:"fixed-wrap-loading"},[e._m(0)])])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"loading-common-center"}},[t("div",{attrs:{id:"loading-common-center-inner"}},[t("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],n=(t("6b54"),t("a322")),r=(t("e7e5"),t("d399")),o=(t("8a58"),t("e41f")),l=(t("7f7f"),t("9a83"),t("f564")),c=(t("cadf"),t("551c"),t("097d"),function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"usage-skeletons-wrapper"},[e._m(0),t("div",{staticClass:"middle-wrapper"}),t("div",{staticClass:"list-wrapper"},e._l(e.list,function(e,a){return t("li")}))])}),d=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"top-wrapper"},[t("div",{staticClass:"top-left"}),t("div",{staticClass:"top-right"},[t("p"),t("p"),t("div",{staticClass:"tag-wrapper"},[t("span"),t("span"),t("span"),t("span")])])])}],f={name:"List",data:function(){return{list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}}},u=f,_=(t("a0ad"),t("2877")),p=Object(_["a"])(u,c,d,!1,null,null,null);p.options.__file="Usage.vue";var g,h=p.exports,v=t("7212"),C=t("35df"),I=t("db04"),w={name:"home",data:function(){var e=this;return{client_type:Object(C["c"])(),iccid:"",load_skeleton:!0,load_plan_msg:"",watch_source:[5,10,12,17,18,20,22],auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],order_state:["未支付","已支付","已到帐"],plan_title_array:["当前套餐","历史续费套餐"],cur_plan_type_index:0,filterCardInfo:{operator_logo:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1,watch_card_usage:{total_flow:"",used_flow:"",total_voice:"",used_voice:"",detail_right:""},flow_card_usage:{total_flow:"",used_flow:"",detail_right:""}},hasUsagePlan:!1,usagePlanLength:0,hasOrderPlan:!1,usageInfo:{},swiperOption:{on:{slideChangeTransitionEnd:function(a){e.cur_plan_type_index=this.activeIndex}}},prefer_priority:0}},components:(g={},Object(n["a"])(g,l["a"].name,l["a"]),Object(n["a"])(g,o["a"].name,o["a"]),Object(n["a"])(g,r["a"].name,r["a"]),Object(n["a"])(g,"UsageSkeleton",h),Object(n["a"])(g,"swiper",v["swiper"]),Object(n["a"])(g,"swiperSlide",v["swiperSlide"]),g),created:function(){var e=this;localStorage.setItem("currentType","card"),Object(C["i"])("iccid")&&"cardPool"===Object(C["i"])("type")?(localStorage.setItem("check_iccid",Object(C["i"])("iccid")),localStorage.setItem("isCardPool",!0)):localStorage.removeItem("isCardPool"),Object(C["h"])("check_iccid")?(this.iccid=Object(C["h"])("check_iccid"),Object(I["a"])("/api/v1/app/cards/telcom/usage",{iccid:Object(C["h"])("check_iccid")}).then(function(a){1===a.state?(e.load_skeleton=!1,e.usageInfo=a.data,0===e.usageInfo.operator?e.filterCardInfo.operator_logo=t("2c53"):1===e.usageInfo.operator?e.filterCardInfo.operator_logo=t("2e44"):e.filterCardInfo.operator_logo=t("634e"),e.inArray(e.usageInfo.source,e.watch_source)>=0&&19!==e.usageInfo.source&&"86"===e.usageInfo.msisdn.substr(0,2)?e.filterCardInfo.msisdn=e.usageInfo.msisdn.substr(2,e.usageInfo.msisdn.length):e.filterCardInfo.msisdn=e.usageInfo.msisdn,e.inArray(e.usageInfo.source,[1,4])>=0?e.auth_status.push("手淘实名"):e.auth_status.push("已实名"),e.usageInfo.need_auth?e.filterCardInfo.real_name_state=e.auth_status[e.usageInfo.auth_status]:e.filterCardInfo.real_name_state="已实名",e.filterCardInfo.real_name_state=e.auth_status[e.usageInfo.auth_status],e.inArray(e.usageInfo.source,[0,2]),e.inArray(e.usageInfo.source,[1,5])>=0&&e.usageInfo.imei&&(e.usageInfo.usage.imei&&e.usageInfo.fenli?2===e.usageInfo.status?e.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:e.filterCardInfo.device_state={state:"机卡分离",code:2}:e.filterCardInfo.device_state={state:"机卡已绑定",code:1}),e.filterCardInfo.card_str_state=e.card_state[e.usageInfo.status],2===e.usageInfo.status?e.filterCardInfo.refresh_actived="激活":e.filterCardInfo.refresh_actived="刷新",e.inArray(e.usageInfo.source,e.watch_source)>=0?(e.filterCardInfo.is_watch_card=!0,e.filterCardInfo.is_flow_card=!1,1===e.usageInfo.usage.noMax?(e.filterCardInfo.watch_card_usage.total_flow="无限",e.filterCardInfo.watch_card_usage.detail_right="无限"):(e.filterCardInfo.watch_card_usage.total_flow=e.flowUnit(e.usageInfo.usage.total,0,1),e.filterCardInfo.watch_card_usage.detail_right=e.flowUnit(0,{watchCard:!0,total:e.usageInfo.usage.total,used:e.usageInfo.usage.used},0)),e.filterCardInfo.watch_card_usage.used_flow=e.flowUnit(e.usageInfo.usage.used,0,0),1===e.usageInfo.usage.noMaxVoice?e.filterCardInfo.watch_card_usage.total_voice="无限":e.filterCardInfo.watch_card_usage.total_voice=Object(C["n"])(e.usageInfo.usage.totalVoice)+"分钟",e.filterCardInfo.watch_card_usage.used_voice=Object(C["n"])(e.usageInfo.usage.usedVoice)+"分钟",localStorage.setItem("is_flow_card",0)):(e.filterCardInfo.is_watch_card=!1,e.filterCardInfo.is_flow_card=!0,6!==e.usageInfo.source&&1!==e.usageInfo.usage.noMax||(e.filterCardInfo.flow_card_usage.total_flow="无限",e.filterCardInfo.flow_card_usage.detail_right="无限"),6!==e.usageInfo.source&&1!==e.usageInfo.usage.noMax&&(e.filterCardInfo.flow_card_usage.total_flow=e.flowUnit(e.usageInfo.usage.total,0,1),e.filterCardInfo.flow_card_usage.detail_right=e.flowUnit(0,{flowCard:!0,total:e.usageInfo.usage.total,used:e.usageInfo.usage.used},0)),e.filterCardInfo.flow_card_usage.used_flow=e.flowUnit(e.usageInfo.usage.used,0,0),localStorage.setItem("is_flow_card",1)),e.hasUsagePlan=!!e.usageInfo.usage.plans.length,e.usagePlanLength=e.usageInfo.usage.plans.length,e.hasOrderPlan=!!e.usageInfo.orders.length,e.$nextTick(function(){e.$refs.mySwiper.swiper.slideTo(0,500,!1);var a=document.documentElement.clientHeight||document.body.clientHeight,t=e.$refs.refCardInfo.offsetHeight,s=e.$refs.refCardData.offsetHeight,i=e.$refs.refCardButton.offsetHeight,n=e.$refs.refPlanTitle.offsetHeight,r=Object(C["h"])("userHeight")||44;"wechat"===e.client_type||"alipay"===e.client_type?e.$refs.mySwiper.$el.style.height=a-t-s-i-n-r+"px":e.$refs.mySwiper.$el.style.height=a-t-s-i-n+"px"})):Object(r["a"])({icon:"warning-o",message:a.msg,mask:!0,duration:0,forbidClick:!0})})):this.$router.push({path:"/weixin/card/lookup"})},mounted:function(){},methods:{planTypeClikc:function(e){this.cur_plan_type_index=e,this.$refs.mySwiper.swiper.slideTo(e)},recharge:function(){Object(C["m"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/plan_list"})},refreshOrActivated:function(){if("刷新"===this.filterCardInfo.refresh_actived)location.reload();else{if(!this.usageInfo.canActivated)return void Object(l["a"])({message:"无效套餐,无法激活",background:"#ff0752"});if(this.usageInfo.usage.used>=this.usageInfo.usage.total&&this.usageInfo.usage.total>0)return void Object(l["a"])({message:"流量已用完,不能激活,请充值",background:"#ff0752"});Object(I["b"])("/api/v1/app/activated",{iccid:"8934564565432345"}).then(function(e){1===e.state&&Object(l["a"])({message:"请在5分钟内放回原绑定的设备中开机,否则会被停机",background:"#00c2ff"})})}},toConnection:function(){Object(C["m"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/connection"})},inArray:function(e,a,t){return null==a?-1:a.indexOf(e,t)},flowUnit:function(e,a,t){return"[object Object]"===Object.prototype.toString.call(a)&&a.watchCard?a.total===a.used?"0.00MB":Object(C["n"])(a.total-a.used)+"MB":"[object Object]"===Object.prototype.toString.call(a)&&a.flowCard?a.total===a.used?"0.00GB":Object(C["n"])(Object(C["n"])(a.total/1024)-Object(C["n"])(a.used/1e3))+"GB":t?e>=1024?Object(C["n"])(e/1024)+"GB":Object(C["n"])(e)+"MB":e>=1e3?Object(C["n"])(e/1e3)+"GB":Object(C["n"])(e)+"MB"},prefer_use_operate:function(e,a,t,s){1e3===t?this.prefer_priority=0:0===t&&(this.prefer_priority=1e3),Object(I["b"])("/api/v1/app/plans/stick",{iccid:e,rating_id:a,priority:this.prefer_priority,source:s}).then(function(e){1===e.state&&(Object(l["a"])({message:e.msg}),setTimeout(function(){location.reload()},1e3))})}}},m=w,b=(t("51d7"),Object(_["a"])(m,s,i,!1,null,null,null));b.options.__file="usage.vue";a["default"]=b.exports}}]);
//# sourceMappingURL=card_usage.b7a63a80.js.map