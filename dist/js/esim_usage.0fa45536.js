(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["esim_usage"],{"175b":function(a,e,t){"use strict";t.r(e);var s,i=function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{staticClass:"plan-usage-wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!a.load_plan,expression:"!load_plan"}]},[s("div",{ref:"refCardInfo",staticClass:"card-info-wrap"},[s("div",{staticClass:"operation-logo-wrap"},[s("img",{attrs:{src:a.filterCardInfo.operator_logo,alt:""}})]),s("div",{staticClass:"card-info-detail"},[a.filterCardInfo.is_watch_card?s("p",[a._v("手表手机号:"+a._s(a.filterCardInfo.msisdn))]):s("p",[a._v("MSISDN:"+a._s(a.filterCardInfo.msisdn))]),s("p",{class:{"p-t-45":!a.usageInfo.imei||"864319031839011"==a.usageInfo.imei}},[a._v("ICCID:"+a._s(a.usageInfo.iccid)+"(编码:"+a._s(a.usageInfo.source)+")")]),a.usageInfo.imei&&"864319031839011"!=a.usageInfo.imei?s("p",[a._v("IMEI:"+a._s(a.usageInfo.imei))]):a._e(),s("div",{staticClass:"card-state-wrap"},[s("div",[s("span",{class:a.usageInfo.auth_status>=3?"cl-state-normal":"cl-state-warning"},[a._v(a._s(a.filterCardInfo.real_name_state))]),""==a.filterCardInfo.device_state?s("span",{class:a.usageInfo.status>=3?"cl-state-normal":"cl-state-primary"},[a._v(a._s(a.filterCardInfo.card_str_state))]):a._e(),""!=a.filterCardInfo.device_state?s("span",{class:1==a.filterCardInfo.device_state.code?"cl-state-primary":"cl-state-warning"},[a._v(a._s(a.filterCardInfo.device_state.state))]):a._e()]),s("div",[s("em",{on:{click:a.refreshOrActivated}},[a._v(a._s(a.filterCardInfo.refresh_actived))]),s("router-link",{attrs:{to:"/weixin/question/index"}},[a._v("?")])],1)])])]),s("div",{ref:"refCardData"},[a.filterCardInfo.is_flow_card?s("div",{staticClass:"flowStyle"},[s("div",{staticClass:"domesticFlow"},[s("div",[a._v("国内流量")]),s("div",[s("div",[s("div",[a._v("流量总量")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.total_flow))])]),s("div",[s("div",[a._v("已使用")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.used_flow))])]),s("div",[s("div",[a._v("剩余流量")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.detail_right))])])])]),s("div",{staticClass:"foreignFlow"},[s("div",[a._v("国际流量")]),s("div",[s("div",[s("div",[a._v("流量总量")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.fTotal_flow))])]),s("div",[s("div",[a._v("已使用")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.fUsed_flow))])]),s("div",[s("div",[a._v("剩余流量")]),s("div",[a._v(a._s(this.filterCardInfo.flow_card_usage.fDetail_right))])])])])]):s("div",[s("div",[s("div",[a._v("国内流量")]),s("div",[s("div",[s("div",[a._v("流量总量")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.total_flow))])]),s("div",[s("div",[a._v("已使用")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.used_flow))])]),s("div",[s("div",[a._v("剩余流量")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.detail_right))])])])]),s("div",[s("div",[a._v("国际流量")]),s("div",[s("div",[s("div",[a._v("流量总量")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.fTotal_flow))])]),s("div",[s("div",[a._v("已使用")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.fUsed_flow))])]),s("div",[s("div",[a._v("剩余流量")]),s("div",[a._v(a._s(this.filterCardInfo.watch_card_usage.fDetail_right))])])])])])]),s("div",{staticClass:"card-plan-wrap"},[s("p",{ref:"refPlanTitle",staticClass:"card-plan-wrap-title"},a._l(a.plan_title_array,function(e,t){return s("span",{class:{checked:t==a.cur_plan_type_index},on:{click:function(e){a.planTypeClikc(t)}}},[a._v(a._s(e))])})),s("div",{staticClass:"van-swipe-wrap"},[s("swiper",{ref:"mySwiper",attrs:{options:a.swiperOption}},[s("swiper-slide",[a.hasUsagePlan?s("ul",{staticClass:"usage-plan-wrap"},a._l(a.usageInfo.usage.plans,function(e,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[a._v(a._s(e.rps_name))]),s("div",{staticClass:"plan-split"}),s("div",{staticClass:"plan-describe"},[e.planCellInfo&&"{}"!=JSON.stringify(e.planCellInfo)?s("div",[e.describe&&"MG500"!=e.planCellInfo.key?s("span",[a._v(a._s(e.describe))]):a._e(),s("br"),e.planCellInfo.max_high?s("span",[a._v("高速流量:"+a._s(e.planCellInfo.max_high)+",已使用"+a._s(e.planCellInfo.used_high))]):a._e(),s("br")]):s("div",[e.describe&&"None"!=e.describe?s("p",[s("span",[a._v(a._s(e.describe))]),s("br"),s("span",[a._v(a._s(e.remark))])]):s("p",[s("span",[a._v(a._s(e.remark))])])])])]),s("div",{staticClass:"plan-date-wrap"},[a.inArray(a.usageInfo.source,a.watch_source)>=0||a.inArray(a.usageInfo.source,[1,7,8])>=0?s("p",{staticClass:"plan-date"},[s("span",[a._v("开始日期:"+a._s(a.filterDate(e.activated_at)))]),s("br"),s("span",[a._v("有效日期:"+a._s(a.filterDate(e.expired_at)))])]):e.expired_at?s("p",{staticClass:"plan-date"},[s("span",[a._v("有效日期:"+a._s(a.filterDate(e.expired_at)))])]):a._e(),e.planCellInfo&&"{}"!=JSON.stringify(e.planCellInfo)?s("div",{staticClass:"speedup-wrap"},["MG500"!=e.planCellInfo.key?s("span",[1==e.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_80"}},[a._v("购买加速包")]):a._e()]):s("span",[1==e.planCellInfo.plan_cell_status?s("a",{attrs:{href:"/weixin/speedup/plan_500"}}):a._e()])]):a._e(),a.usagePlanLength>1?s("div",{staticClass:"prefer_use"},[1e3==e.priority?s("a",{on:{click:function(t){a.prefer_use_operate(a.usageInfo.iccid,e.id,e.priority,a.usageInfo.source)}}},[a._v("优先使用")]):a._e(),0==e.priority?s("a",{on:{click:function(t){a.prefer_use_operate(a.usageInfo.iccid,e.id,e.priority,a.usageInfo.source)}}},[a._v("取消优先")]):a._e()]):a._e()])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("b066"),alt:""}})])]),s("swiper-slide",[a.hasOrderPlan?s("ul",{staticClass:"order-plan-wrap"},a._l(a.usageInfo.orders,function(e,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[a._v(a._s(e.name))]),s("div",{staticClass:"plan-split"}),2522==e.rating_id?s("p",{staticClass:"plan-describe"},[s("span",[a._v("月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。")])]):s("p",{staticClass:"plan-describe"},[s("span",[a._v(a._s(e.describe))]),s("span",[a._v(a._s(e.remark))])]),s("p",{staticClass:"plan-orderNo"},[a._v("订单号:"+a._s(e.no))])]),s("div",{staticClass:"plan-date-wrap"},[s("p",{staticClass:"plan-date"},[s("span",[a._v("续费日期:"+a._s(a.filterDate(e.created_at)))])]),s("p",{staticClass:"plan-order-status-wrap"},[s("span",[a._v(a._s(a.order_state[e.status]))])])])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("96ab"),alt:""}})])])],1)],1)]),s("div",{ref:"refCardButton",staticClass:"btn-recharge-wrap"},[s("button",{on:{click:a.recharge}},[a._v("充值续费")]),s("router-link",{attrs:{to:"/weixin/coupon/index"}},[a._v("卡券兑换")])],1)]),s("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:a.load_plan,callback:function(e){a.load_plan=e},expression:"load_plan"}},[s("p",{staticClass:"showTip"},[a._v(a._s(a.load_plan_msg))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:""==a.load_plan_msg,expression:"load_plan_msg==''"}],staticClass:"fixed-wrap-loading"},[a._m(0)])],1)},r=[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"loading-common-center"}},[t("div",{attrs:{id:"loading-common-center-inner"}},[t("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],o=(t("28a5"),t("6b54"),t("a322")),n=(t("8a58"),t("e41f")),l=(t("7f7f"),t("9a83"),t("f564")),d=t("7212"),f=t("35df"),c=t("db04"),_={name:"home",data:function(){var a=this;return{client_type:Object(f["d"])(),iccid:"",load_plan:!1,load_plan_msg:"",watch_source:[5,10,12,17,18,20,22],auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],order_state:["未支付","已支付","已到帐"],plan_title_array:["当前套餐","历史续费套餐"],cur_plan_type_index:0,filterCardInfo:{operator_logo:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1,watch_card_usage:{total_flow:"",used_flow:"",total_voice:"",used_voice:"",detail_right:"",fTotal_flow:"",fUsed_flow:"",fDetail_right:""},flow_card_usage:{total_flow:"",used_flow:"",detail_right:"",fTotal_flow:"",fUsed_flow:"",fDetail_right:""}},hasUsagePlan:!1,usagePlanLength:0,hasOrderPlan:!1,usageInfo:{},swiperOption:{on:{slideChangeTransitionEnd:function(e){a.cur_plan_type_index=this.activeIndex}}},prefer_priority:0}},components:(s={},Object(o["a"])(s,l["a"].name,l["a"]),Object(o["a"])(s,n["a"].name,n["a"]),Object(o["a"])(s,"swiper",d["swiper"]),Object(o["a"])(s,"swiperSlide",d["swiperSlide"]),s),created:function(){Object(f["k"])("type")&&localStorage.setItem("currentType",Object(f["k"])("type")),Object(f["k"])("iccid")?(this.iccid=Object(f["k"])("iccid"),localStorage.setItem("check_iccid",this.iccid),this.getMsg()):Object(f["j"])("check_iccid")?(this.iccid=Object(f["j"])("check_iccid"),this.getMsg()):this.$router.push({path:"/weixin/card/lookup",query:{isEsim:!0}})},mounted:function(){},methods:{getMsg:function(){var a=this;Object(c["a"])("/api/v1/app/cards/telcom/usage",{iccid:this.iccid}).then(function(e){if(1==e.state){a.load_plan_msg=e.msg,a.load_plan=!1,a.usageInfo=e.data,0==a.usageInfo.operator?a.filterCardInfo.operator_logo=t("2c53"):1==a.usageInfo.operator?a.filterCardInfo.operator_logo=t("2e44"):a.filterCardInfo.operator_logo=t("634e"),a.inArray(a.usageInfo.source,a.watch_source)>=0&&19!=a.usageInfo.source&&"86"==a.usageInfo.msisdn.substr(0,2)?a.filterCardInfo.msisdn=a.usageInfo.msisdn.substr(2,a.usageInfo.msisdn.length):a.filterCardInfo.msisdn=a.usageInfo.msisdn,a.inArray(a.usageInfo.source,[1,4])>=0?a.auth_status.push("手淘实名"):a.auth_status.push("已实名"),a.filterCardInfo.real_name_state=a.auth_status[a.usageInfo.auth_status],a.inArray(a.usageInfo.source,[0,2]),a.inArray(a.usageInfo.source,[1,5])>=0&&a.usageInfo.imei&&(a.usageInfo.usage.imei&&a.usageInfo.fenli?2==a.usageInfo.status?a.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:a.filterCardInfo.device_state={state:"机卡分离",code:2}:a.filterCardInfo.device_state={state:"机卡已绑定",code:1}),a.filterCardInfo.card_str_state=a.card_state[a.usageInfo.status],2==a.usageInfo.status?a.filterCardInfo.refresh_actived="激活":a.filterCardInfo.refresh_actived="刷新",a.inArray(a.usageInfo.source,a.watch_source)>=0?(a.filterCardInfo.is_watch_card=!0,a.filterCardInfo.is_flow_card=!1,1==a.usageInfo.usage.noMax?(a.filterCardInfo.watch_card_usage.total_flow="无限",a.filterCardInfo.watch_card_usage.detail_right="无限"):(a.filterCardInfo.watch_card_usage.total_flow=a.flowUnit(a.usageInfo.usage.total,0,1),a.filterCardInfo.watch_card_usage.fTotal_flow=a.flowUnit(a.usageInfo.usage.foreignTotal,0,1),a.filterCardInfo.watch_card_usage.detail_right=a.flowUnit(0,{watchCard:!0,total:a.usageInfo.usage.total,used:a.usageInfo.usage.used},0),a.filterCardInfo.watch_card_usage.fDetail_right=a.flowUnit(0,{watchCard:!0,total:a.usageInfo.usage.foreignTotal,used:a.usageInfo.usage.foreignUsed},0)),a.filterCardInfo.watch_card_usage.used_flow=a.flowUnit(a.usageInfo.usage.used,0,0),a.filterCardInfo.watch_card_usage.fUsed_flow=a.flowUnit(a.usageInfo.usage.foreignUsed,0,0),1==a.usageInfo.usage.noMaxVoice?a.filterCardInfo.watch_card_usage.total_voice="无限":a.filterCardInfo.watch_card_usage.total_voice=Object(f["r"])(a.usageInfo.usage.totalVoice)+"分钟",a.filterCardInfo.watch_card_usage.used_voice=Object(f["r"])(a.usageInfo.usage.usedVoice)+"分钟"):(a.filterCardInfo.is_watch_card=!1,a.filterCardInfo.is_flow_card=!0,6!=a.usageInfo.source&&1!=a.usageInfo.usage.noMax||(a.filterCardInfo.flow_card_usage.total_flow="无限",a.filterCardInfo.flow_card_usage.detail_right="无限"),6!=a.usageInfo.source&&1!=a.usageInfo.usage.noMax&&(a.filterCardInfo.flow_card_usage.total_flow=a.flowUnit(a.usageInfo.usage.total,0,1),a.filterCardInfo.flow_card_usage.fTotal_flow=a.flowUnit(a.usageInfo.usage.foreignTotal,0,1),a.filterCardInfo.flow_card_usage.detail_right=a.flowUnit(0,{flowCard:!0,total:a.usageInfo.usage.total,used:a.usageInfo.usage.used},0),a.filterCardInfo.flow_card_usage.fDetail_right=a.flowUnit(0,{flowCard:!0,total:a.usageInfo.usage.foreignTotal,used:a.usageInfo.usage.foreignUsed},0)),a.filterCardInfo.flow_card_usage.used_flow=a.flowUnit(a.usageInfo.usage.used,0,0),a.filterCardInfo.flow_card_usage.fUsed_flow=a.flowUnit(a.usageInfo.usage.foreignUsed,0,0)),a.hasUsagePlan=!!a.usageInfo.usage.plans.length,a.usagePlanLength=a.usageInfo.usage.plans.length,a.hasOrderPlan=!!a.usageInfo.orders.length;var s=a;a.$nextTick(function(){var a=document.documentElement.clientHeight||document.body.clientHeight,e=s.$refs.refCardInfo.offsetHeight,t=s.$refs.refCardData.offsetHeight,i=s.$refs.refCardButton.offsetHeight,r=s.$refs.refPlanTitle.offsetHeight;"wechat"==s.client_type||"alipay"==s.client_type?s.$refs.mySwiper.$el.style.height=a-e-t-i-r-44+"px":s.$refs.mySwiper.$el.style.height=a-e-t-i-r+"px"})}else a.load_plan=!0,a.load_plan_msg=e.msg})},planTypeClikc:function(a){this.cur_plan_type_index=a,this.$refs.mySwiper.swiper.slideTo(a)},recharge:function(){Object(f["q"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/esim_plan_list"})},refreshOrActivated:function(){if("刷新"==this.filterCardInfo.refresh_actived)location.reload();else{if(!this.usageInfo.canActivated)return void Object(l["a"])({message:"无效套餐,无法激活",background:"#ff0752"});if(this.usageInfo.usage.used>=this.usageInfo.usage.total&&this.usageInfo.usage.total>0)return void Object(l["a"])({message:"流量已用完,不能激活,请充值",background:"#ff0752"});Object(c["b"])("/api/v1/app/activated",{iccid:"8934564565432345"}).then(function(a){1==a.state&&Object(l["a"])({message:"请在5分钟内放回原绑定的设备中开机,否则会被停机",background:"#00c2ff"})})}},toConnnection:function(){Object(f["q"])("check_iccid",this.iccid),this.$router.push({path:"/weixin/card/connection"})},inArray:function(a,e,t){return null==e?-1:e.indexOf(a,t)},flowUnit:function(a,e,t){return"[object Object]"==Object.prototype.toString.call(e)&&e.watchCard?e.total==e.used?"0.00MB":Object(f["r"])(e.total-e.used)+"MB":"[object Object]"==Object.prototype.toString.call(e)&&e.flowCard?e.total==e.used?"0.00GB":Object(f["r"])(Object(f["r"])(e.total/1024)-Object(f["r"])(e.used/1e3))+"GB":t?a>=1024?Object(f["r"])(a/1024)+"GB":Object(f["r"])(a)+"MB":a>=1e3?Object(f["r"])(a/1e3)+"GB":Object(f["r"])(a)+"MB"},prefer_use_operate:function(a,e,t,s){1e3==t?this.prefer_priority=0:0==t&&(this.prefer_priority=1e3),Object(c["b"])("/api/v1/app/plans/stick",{iccid:a,rating_id:e,priority:this.prefer_priority,source:s}).then(function(a){1==a.state&&(Object(l["a"])({message:a.msg}),setTimeout(function(){location.reload()},1e3))})},GetUrlRelativePath:function(){var a=document.location.toString(),e=a.split("//"),t=e[1].indexOf("/"),s=e[1].substring(t);return-1!=s.indexOf("?")&&(s=s.split("?")[0]),s}}},u=_,g=(t("55e3"),t("2877")),p=Object(g["a"])(u,i,r,!1,null,null,null);p.options.__file="esim_usage.vue";e["default"]=p.exports},"2c53":function(a,e,t){a.exports=t.p+"img/unicom-logo.0b9e0b5f.svg"},"2e44":function(a,e,t){a.exports=t.p+"img/mobile-logo.113f99e2.png"},"55e3":function(a,e,t){"use strict";var s=t("92cb"),i=t.n(s);i.a},"634e":function(a,e,t){a.exports=t.p+"img/telecom-logo.8c605ac8.svg"},"92cb":function(a,e,t){},"96ab":function(a,e,t){a.exports=t.p+"img/bg_no_recharge.34c67f6d.svg"},b066:function(a,e,t){a.exports=t.p+"img/bg_no_plan.f23d9d1f.svg"}}]);
//# sourceMappingURL=esim_usage.0fa45536.js.map