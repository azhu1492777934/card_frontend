(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_usage"],{2134:function(a,e,t){},"51d7":function(a,e,t){"use strict";var s=t("2134"),r=t.n(s);r.a},fdca:function(a,e,t){"use strict";t.r(e);var s,r=function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"plan-usage-wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!a.load_skeleton,expression:"!load_skeleton"}]},[s("div",{ref:"refCardInfo",staticClass:"card-info-wrap"},[s("div",{staticClass:"operation-logo-wrap"},[s("img",{attrs:{src:a.filterCardInfo.operator_logo,alt:""}})]),s("div",{staticClass:"card-info-detail"},[a.filterCardInfo.is_watch_card?s("p",[a._v("手表手机号:"+a._s(a.filterCardInfo.msisdn))]):s("p",[a._v("MSISDN:"+a._s(a.filterCardInfo.msisdn))]),s("p",{class:{"p-t-45":!a.usageInfo.imei||"864319031839011"==a.usageInfo.imei}},[a._v("\n              ICCID:"+a._s(a.usageInfo.iccid)+"(编码:"+a._s(a.usageInfo.source)+")")]),a.usageInfo.imei&&"864319031839011"!=a.usageInfo.imei?s("p",[a._v("IMEI:"+a._s(a.usageInfo.imei))]):a._e(),s("div",{staticClass:"card-state-wrap"},[s("div",[s("span",{class:a.usageInfo.auth_status>=3?"cl-state-normal":"cl-state-warning"},[a._v(a._s(a.filterCardInfo.real_name_state))]),""==a.filterCardInfo.device_state?s("span",{class:1!=a.usageInfo.status?"cl-state-warning":"cl-state-primary"},[a._v(a._s(a.filterCardInfo.card_str_state))]):a._e(),""!=a.filterCardInfo.device_state?s("span",{class:1==a.filterCardInfo.device_state.code?"cl-state-primary":"cl-state-warning"},[a._v(a._s(a.filterCardInfo.device_state.state))]):a._e()]),s("div",[s("em",{on:{click:a.refreshOrActivated}},[a._v(a._s(a.filterCardInfo.refresh_actived))]),"app"!=a.client_type?s("router-link",{attrs:{to:"/weixin/question/index"}},[a._v("问题中心>")]):a._e()],1)])])]),s("div",{ref:"refCardData"},[a.filterCardInfo.is_flow_card?s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[a._v("剩余流量")]),s("span",[a._v(a._s(this.filterCardInfo.flow_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[a._v("总流量:"+a._s(this.filterCardInfo.flow_card_usage.total_flow)+" / ")]),s("span",[a._v("已使用:"+a._s(this.filterCardInfo.flow_card_usage.used_flow))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:a.toConnection}},[s("a",[a._v(" 流量用量详情> ")])])])]):s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[a._v("剩余流量")]),s("span",[a._v(a._s(this.filterCardInfo.watch_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[a._v("总流量:"+a._s(this.filterCardInfo.watch_card_usage.total_flow)+" / ")]),s("span",[a._v("已使用:"+a._s(this.filterCardInfo.watch_card_usage.used_flow))])]),s("p",[s("span",[a._v("总通话:"+a._s(this.filterCardInfo.watch_card_usage.total_voice)+" / ")]),s("span",[a._v("已使用:"+a._s(this.filterCardInfo.watch_card_usage.used_voice))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:a.toConnection}},[s("a",[a._v(" 流量用量详情> ")])])])])]),s("div",{staticClass:"card-plan-wrap"},[s("p",{ref:"refPlanTitle",staticClass:"card-plan-wrap-title"},a._l(a.plan_title_array,function(e,t){return s("span",{class:{checked:t==a.cur_plan_type_index},on:{click:function(e){a.planTypeClikc(t)}}},[a._v(a._s(e))])})),s("div",{staticClass:"van-swipe-wrap"},[s("swiper",{ref:"mySwiper",attrs:{options:a.swiperOption}},[s("swiper-slide",[a.hasUsagePlan?s("ul",{staticClass:"usage-plan-wrap"},a._l(a.usageInfo.usage.plans,function(e,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[a._v(a._s(e.rps_name))]),s("div",{staticClass:"plan-describe"},[e.planCellInfo&&"{}"!=JSON.stringify(e.planCellInfo)?s("div",["MG500"!=e.planCellInfo.key?s("div",[e.describe&&"None"!=e.describe?s("p",[s("span",[a._v(a._s(e.describe))]),s("br"),s("span",{},[a._v(a._s(e.remark))])]):s("p",[s("span",[a._v(a._s(e.remark))])])]):a._e(),e.planCellInfo.max_high?s("span",[a._v("高速流量:"+a._s(e.planCellInfo.max_high)+",已使用"+a._s(e.planCellInfo.used_high))]):a._e(),s("br"),e.planCellInfo.max_normal?s("span",[a._v("中速流量:"+a._s(e.planCellInfo.max_normal))]):a._e()]):s("div",[e.describe&&"None"!=e.describe?s("p",[s("span",[a._v(a._s(e.describe))]),s("br"),s("span",[a._v(a._s(e.remark))])]):s("p",[s("span",[a._v(a._s(e.remark))])])])])]),s("div",{staticClass:"plan-date-wrap"},[a.inArray(a.usageInfo.source,a.watch_source)>=0||a.inArray(a.usageInfo.source,[1,7,8])>=0?s("p",{staticClass:"plan-date"},[s("span",[a._v("开始日期:"+a._s(a.filterDate(e.activated_at)))]),s("br"),s("span",[a._v("有效日期:"+a._s(a.filterDate(e.expired_at)))])]):e.expired_at?s("p",{staticClass:"plan-date"},[s("span",[a._v("有效日期:"+a._s(a.filterDate(e.expired_at)))])]):a._e(),e.planCellInfo&&"{}"!=JSON.stringify(e.planCellInfo)?s("div",{staticClass:"speedup-wrap"},["MG500"!=e.planCellInfo.key?s("span",[1==e.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_80"}},[a._v("购买加速包")]):a._e()]):s("span",[1==e.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_500"}},[a._v("购买加速包")]):a._e()])]):a._e(),a.usagePlanLength>1?s("div",{staticClass:"prefer_use"},[1e3==e.priority?s("a",{on:{click:function(t){a.prefer_use_operate(a.usageInfo.iccid,e.id,e.priority,a.usageInfo.source)}}},[a._v("优先使用")]):a._e(),0==e.priority?s("a",{on:{click:function(t){a.prefer_use_operate(a.usageInfo.iccid,e.id,e.priority,a.usageInfo.source)}}},[a._v("取消优先")]):a._e()]):a._e()])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("b066"),alt:""}})])]),s("swiper-slide",[a.hasOrderPlan?s("ul",{staticClass:"order-plan-wrap"},a._l(a.usageInfo.orders,function(e,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[a._v(a._s(e.name))]),2522==e.rating_id?s("p",{staticClass:"plan-describe"},[s("span",[a._v("月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。")])]):s("p",{staticClass:"plan-describe"},[e.describe&&"None"!=e.describe&&""!=e.describe?s("span",[a._v(a._s(e.describe))]):a._e(),s("br"),e.describe&&""!=e.describe&&"None"!=e.describe?a._e():s("span",{},[a._v(a._s(e.remark))])]),s("p",{staticClass:"plan-orderNo"},[a._v("订单号:"+a._s(e.no))])]),s("div",{staticClass:"plan-date-wrap"},[s("p",{staticClass:"plan-date"},[s("span",[a._v("续费日期:"+a._s(a.filterDate(e.created_at)))])]),s("p",{staticClass:"plan-order-status-wrap"},[s("span",[a._v(a._s(a.order_state[e.status]))])])])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("96ab"),alt:""}})])])],1)],1)]),s("div",{ref:"refCardButton",staticClass:"btn-recharge-wrap"},[s("button",{on:{click:a.recharge}},[a._v("充值续费")]),s("router-link",{attrs:{to:"/weixin/coupon/index"}},[a._v("卡券兑换")])],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:a.load_skeleton,expression:"load_skeleton"}],staticClass:"fixed-wrap-loading"},[a._m(0)])])},i=[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"loading-common-center"}},[t("div",{attrs:{id:"loading-common-center-inner"}},[t("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],n=(t("6b54"),t("a322")),o=(t("e7e5"),t("d399")),l=(t("8a58"),t("e41f")),c=(t("7f7f"),t("9a83"),t("f564")),d=(t("cadf"),t("551c"),t("097d"),t("cd81")),f=t("7212"),_=t("35df"),u=t("db04"),p={name:"home",data:function(){var a=this;return{client_type:Object(_["c"])(),iccid:"",load_skeleton:!0,load_plan_msg:"",watch_source:[5,10,12,17,18,20,22],auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],order_state:["未支付","已支付","已到账"],plan_title_array:["当前套餐","历史续费套餐"],cur_plan_type_index:0,filterCardInfo:{operator_logo:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1,watch_card_usage:{total_flow:"",used_flow:"",total_voice:"",used_voice:"",detail_right:""},flow_card_usage:{total_flow:"",used_flow:"",detail_right:""}},hasUsagePlan:!1,usagePlanLength:0,hasOrderPlan:!1,usageInfo:{},swiperOption:{on:{slideChangeTransitionEnd:function(e){a.cur_plan_type_index=this.activeIndex}}},prefer_priority:0}},components:(s={},Object(n["a"])(s,c["a"].name,c["a"]),Object(n["a"])(s,l["a"].name,l["a"]),Object(n["a"])(s,o["a"].name,o["a"]),Object(n["a"])(s,"UsageSkeleton",d["a"]),Object(n["a"])(s,"swiper",f["swiper"]),Object(n["a"])(s,"swiperSlide",f["swiperSlide"]),s),created:function(){var a=this;Object(_["h"])("check_iccid")?(this.iccid=Object(_["h"])("check_iccid"),Object(u["a"])("/api/v1/app/cards/telcom/usage",{iccid:Object(_["h"])("check_iccid")}).then(function(e){a.load_skeleton=!1,1===e.state?(a.usageInfo=e.data,0===a.usageInfo.operator?a.filterCardInfo.operator_logo=t("2c53"):1===a.usageInfo.operator?a.filterCardInfo.operator_logo=t("2e44"):a.filterCardInfo.operator_logo=t("634e"),a.inArray(a.usageInfo.source,a.watch_source)>=0&&19!==a.usageInfo.source&&"86"===a.usageInfo.msisdn.substr(0,2)?a.filterCardInfo.msisdn=a.usageInfo.msisdn.substr(2,a.usageInfo.msisdn.length):a.filterCardInfo.msisdn=a.usageInfo.msisdn,a.inArray(a.usageInfo.source,[1,4])>=0?a.auth_status.push("手淘实名"):a.auth_status.push("已实名"),a.usageInfo.need_auth?a.filterCardInfo.real_name_state=a.auth_status[a.usageInfo.auth_status]:a.filterCardInfo.real_name_state="已实名",a.filterCardInfo.real_name_state=a.auth_status[a.usageInfo.auth_status],a.inArray(a.usageInfo.source,[0,2]),a.inArray(a.usageInfo.source,[1,5])>=0&&a.usageInfo.imei&&(a.usageInfo.usage.imei&&a.usageInfo.fenli?2===a.usageInfo.status?a.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:a.filterCardInfo.device_state={state:"机卡分离",code:2}:a.filterCardInfo.device_state={state:"机卡已绑定",code:1}),a.filterCardInfo.card_str_state=a.card_state[a.usageInfo.status],2===a.usageInfo.status?a.filterCardInfo.refresh_actived="激活":a.filterCardInfo.refresh_actived="刷新",a.inArray(a.usageInfo.source,a.watch_source)>=0?(a.filterCardInfo.is_watch_card=!0,a.filterCardInfo.is_flow_card=!1,1===a.usageInfo.usage.noMax?(a.filterCardInfo.watch_card_usage.total_flow="无限",a.filterCardInfo.watch_card_usage.detail_right="无限"):(a.filterCardInfo.watch_card_usage.total_flow=a.flowUnit(a.usageInfo.usage.total,0,1),a.filterCardInfo.watch_card_usage.detail_right=a.flowUnit(0,{watchCard:!0,total:a.usageInfo.usage.total,used:a.usageInfo.usage.used},0)),a.filterCardInfo.watch_card_usage.used_flow=a.flowUnit(a.usageInfo.usage.used,0,0),1===a.usageInfo.usage.noMaxVoice?a.filterCardInfo.watch_card_usage.total_voice="无限":a.filterCardInfo.watch_card_usage.total_voice=Object(_["n"])(a.usageInfo.usage.totalVoice)+"分钟",a.filterCardInfo.watch_card_usage.used_voice=Object(_["n"])(a.usageInfo.usage.usedVoice)+"分钟",localStorage.setItem("is_flow_card",0)):(a.filterCardInfo.is_watch_card=!1,a.filterCardInfo.is_flow_card=!0,6!==a.usageInfo.source&&1!==a.usageInfo.usage.noMax||(a.filterCardInfo.flow_card_usage.total_flow="无限",a.filterCardInfo.flow_card_usage.detail_right="无限"),6!==a.usageInfo.source&&1!==a.usageInfo.usage.noMax&&(a.filterCardInfo.flow_card_usage.total_flow=a.flowUnit(a.usageInfo.usage.total,0,1),a.filterCardInfo.flow_card_usage.detail_right=a.flowUnit(0,{flowCard:!0,total:a.usageInfo.usage.total,used:a.usageInfo.usage.used},0)),a.filterCardInfo.flow_card_usage.used_flow=a.flowUnit(a.usageInfo.usage.used,0,0),localStorage.setItem("is_flow_card",1)),a.hasUsagePlan=!!a.usageInfo.usage.plans.length,a.usagePlanLength=a.usageInfo.usage.plans.length,a.hasOrderPlan=!!a.usageInfo.orders.length,a.$nextTick(function(){a.$refs.mySwiper.swiper.slideTo(0,500,!1);var e=document.documentElement.clientHeight||document.body.clientHeight,t=a.$refs.refCardInfo.offsetHeight,s=a.$refs.refCardData.offsetHeight,r=a.$refs.refCardButton.offsetHeight,i=a.$refs.refPlanTitle.offsetHeight,n=Object(_["h"])("userHeight")||44;"wechat"===a.client_type||"alipay"===a.client_type?a.$refs.mySwiper.$el.style.height=e-t-s-r-i-n+"px":a.$refs.mySwiper.$el.style.height=e-t-s-r-i+"px"})):Object(o["a"])({icon:"warning-o",message:e.msg,mask:!0,duration:0,forbidClick:!0})})):this.$router.push({path:"/weixin/card/lookup"})},mounted:function(){},methods:{planTypeClikc:function(a){this.cur_plan_type_index=a,this.$refs.mySwiper.swiper.slideTo(a)},recharge:function(){Object(_["m"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/plan_list"})},refreshOrActivated:function(){if("刷新"===this.filterCardInfo.refresh_actived)location.reload();else{if(!this.usageInfo.canActivated)return void Object(c["a"])({message:"无效套餐,无法激活",background:"#ff0752"});if(this.usageInfo.usage.used>=this.usageInfo.usage.total&&this.usageInfo.usage.total>0)return void Object(c["a"])({message:"流量已用完,不能激活,请充值",background:"#ff0752"});Object(u["b"])("/api/v1/app/activated",{iccid:"8934564565432345"}).then(function(a){1===a.state&&Object(c["a"])({message:"请在5分钟内放回原绑定的设备中开机,否则会被停机",background:"#00c2ff"})})}},toConnection:function(){Object(_["m"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/connection"})},inArray:function(a,e,t){return null==e?-1:e.indexOf(a,t)},flowUnit:function(a,e,t){return"[object Object]"===Object.prototype.toString.call(e)&&e.watchCard?e.total===e.used?"0.00MB":Object(_["n"])(e.total-e.used)+"MB":"[object Object]"===Object.prototype.toString.call(e)&&e.flowCard?e.total===e.used?"0.00GB":Object(_["n"])(Object(_["n"])(e.total/1024)-Object(_["n"])(e.used/1e3))+"GB":t?a>=1024?Object(_["n"])(a/1024)+"GB":Object(_["n"])(a)+"MB":a>=1e3?Object(_["n"])(a/1e3)+"GB":Object(_["n"])(a)+"MB"},prefer_use_operate:function(a,e,t,s){1e3===t?this.prefer_priority=0:0===t&&(this.prefer_priority=1e3),Object(u["b"])("/api/v1/app/plans/stick",{iccid:a,rating_id:e,priority:this.prefer_priority,source:s}).then(function(a){1===a.state&&(Object(c["a"])({message:a.msg}),setTimeout(function(){location.reload()},1e3))})}}},g=p,h=(t("51d7"),t("2877")),I=Object(h["a"])(g,r,i,!1,null,null,null);I.options.__file="usage.vue";e["default"]=I.exports}}]);
//# sourceMappingURL=card_usage.12aa1abb.js.map