(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Layout"],{"08cd":function(e,a,t){"use strict";t.r(a);var s,r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"inner-wrap"},[t("user-header",{directives:[{name:"show",rawName:"v-show",value:e.isShowUser,expression:"isShowUser"}],attrs:{userInfoData:e.authorizeUserInfo}}),t("router-view",{on:{getUserData:e.getUserInfo}}),t("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_user_msg,callback:function(a){e.load_user_msg=a},expression:"load_user_msg"}},[t("van-loading",{attrs:{type:"spinner",size:"30",color:"#fff"}})],1)],1)},i=[],n=(t("28a5"),t("6b54"),t("c93e")),o=t("a322"),c=(t("ac1e"),t("543e")),l=(t("8a58"),t("e41f")),f=(t("9a83"),t("f564")),d=(t("7f7f"),t("e17f"),t("2241")),u=(t("cadf"),t("551c"),t("097d"),t("2f62")),_=t("c5dc"),p=t("db04"),g=t("35df"),h={name:"App",data:function(){return{client_type:Object(g["c"])(),state:"",appContext:!1,load_user_msg:!1,load_user_info:"加载用户信息,请等候"}},components:(s={userHeader:_["a"]},Object(o["a"])(s,d["a"].name,d["a"]),Object(o["a"])(s,f["a"].name,f["a"]),Object(o["a"])(s,l["a"].name,l["a"]),Object(o["a"])(s,c["a"].name,c["a"]),s),computed:Object(n["a"])({},Object(u["b"])({isShowUser:function(e){return e.userInfo.showUser},authorizeUserInfo:function(e){return e.userInfo.userInfoInner}})),created:function(){if(Object(g["n"])("timeSpan",0),Object(g["j"])("iccid")){var e=Object(g["j"])("iccid");1===Object(g["e"])(e).state&&(Object(g["n"])("watch_card",e),Object(g["n"])("watchAutoSearch",1))}else Object(g["m"])("watch_card"),Object(g["m"])("watchAutoSearch");var a=this;if("app"===this.client_type){var t=navigator.userAgent.toLowerCase();if(/(ylkids_android)/.test(t))this.showHtmlcallJava2();else if(/(ios1.1.0)/.test(t)){window.webkit.messageHandlers.getIosToken.postMessage(null);setTimeout(function(){a.authorized()},500)}}else this.authorized()},methods:{showHtmlcallJava2:function(){var e=window.jsInterface.GetToken();localStorage.setItem("token",e),this.authorized()},plusReady:function(){localStorage.setItem("token",plus.storage.getItem("appToken")),this.authorized()},authorized:function(){if("wechat"===this.client_type||"alipay"===this.client_type||"app"===this.client_type){if(Object(g["i"])("userInfo","obj")){this.$store.commit("userInfo/changeUserStatus",!0);var e=document.querySelector(".user-wrap");e&&Object(g["n"])("userHeight",e.offsetHeight),"mifi"===this.global_variables.packed_project&&this.$store.commit("userInfo/changeUserStatus",!1)}if(("wechat"===this.client_type&&Object(g["i"])("wechat_version")!==this.global_variables.version||"alipay"===this.client_type&&Object(g["i"])("alipay_version")!==this.global_variables.version)&&(Object(g["m"])("token"),Object(g["m"])("state")),Object(g["i"])("token"))"mifi"!==this.global_variables.packed_project&&this.getUserInfo();else{var a=this;d["a"].alert({title:"授权",message:"为了您的账号安全，我们需要您对本站进行授权操作并绑定账号。"}).then(function(){a.authorizedRediect()})}}else this.$store.commit("userInfo/changeUserStatus",!1)},GetUrlRelativePath:function(){var e=document.location.toString(),a=e.split("//"),t=a[1].indexOf("/"),s=a[1].substring(t);return-1!==s.indexOf("?")&&(s=s.split("?")[0]),s},getUserInfo:function(){var e=this;this.load_user_msg=!0,Object(p["a"])("/accountCenter/v2/user/info?"+Object(g["f"])({},"get")).then(function(a){if(e.load_user_msg=!1,0===a.error)if(a.data&&"{}"!==JSON.stringify(a.data)){var t={account:a.data.account,avatar:a.data.avatar,nickname:a.data.nickname};if(Object(g["n"])("userInfo",t,"obj"),"wechat"===e.client_type||"alipay"===e.client_type){e.$store.commit("userInfo/changeUserStatus",!0),e.$store.commit("userInfo/changeUserInfo",t);var s=document.querySelector(".user-wrap");s&&Object(g["n"])("userHeight",s.offsetHeight),"mifi"===e.global_variables.packed_project&&e.$store.commit("userInfo/changeUserStatus",!1)}else"app"===e.client_type&&e.$store.commit("userInfo/changeUserInfo",t)}else{var r=e;d["a"].alert({title:"账号异常",message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。",showConfirmButton:!1}).then(function(){r.load_user_msg=!0,r.load_user_info="账号异常"})}else if(11002===a.error)e.$emit("getToken");else if(10007===a.error){var i=Date.parse(new Date)/1e3,n=a.extra-i;Object(g["n"])("timeSpan",n),e.getUserInfo()}else 20014===a.error?Object(f["a"])({message:"请求超时"}):a.status||a.error?e.showAuthorityError("A"+a.error):e.showAuthorityError("A-R"+JSON.stringify(a))})},showDoc:function(){d["a"].alert({message:"可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额;\nELB：可通过阅读微信文章、充值话费和活动套餐等方式免费领取，用于商品现金抵扣、游戏娱乐等"})},authorizedRediect:function(){var e=this;this.state=Math.random().toString(36).substr(2)+(new Date).getTime(),Object(g["n"])("state",this.state);var a=this.GetUrlRelativePath();if(Object(g["n"])("authorized_redirect_uri",a),Object(g["j"])("iccid")){var t=Object(g["j"])("iccid");1===Object(g["e"])(t).state&&(Object(g["n"])("watch_card",t),Object(g["n"])("watchAutoSearch",1))}else Object(g["m"])("watch_card"),Object(g["m"])("watchAutoSearch");Object(p["a"])("/accountCenter/v2/oauth/authorize?"+Object(g["f"])({client_type:this.client_type,redirect_uri:this.global_variables.authorized_redirect_url+"/authority",scope:"userinfo",state:this.state},"get")).then(function(a){0===a.error?("wechat"===e.client_type?Object(g["n"])("wechat_version",e.global_variables.version):"alipay"===e.client_type&&Object(g["n"])("alipay_version",e.global_variables.version),location.href=a.data):11002===a.error?e.$emit("getToken"):e.this.showAuthorityError("C"+a.error)})},showAuthorityError:function(e){var a=this,t=e||"";d["a"].alert({title:"账号异常",showConfirmButton:!1,message:"您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题"+t+"。"}).then(function(){a.load_user_msg=!0,a.load_user_info="账号异常"+t})}}},v=h,w=(t("0a9a"),t("2877")),I=Object(w["a"])(v,r,i,!1,null,null,null);I.options.__file="layout.vue";a["default"]=I.exports},"0a9a":function(e,a,t){"use strict";var s=t("39aa3"),r=t.n(s);r.a},"0b6e":function(e,a,t){"use strict";var s=t("e27a"),r=t.n(s);r.a},"2c78":function(e,a,t){"use strict";t.r(a);var s,r=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"plan-usage-wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.load_skeleton,expression:"!load_skeleton"}]},[s("div",{ref:"refCardInfo",staticClass:"card-info-wrap"},[s("div",{staticClass:"operation-logo-wrap"},[s("img",{attrs:{src:e.filterCardInfo.operator_logo,alt:""}})]),s("div",{staticClass:"card-info-detail"},[e.filterCardInfo.is_watch_card?s("p",[e._v("手表手机号:"+e._s(e.filterCardInfo.msisdn))]):s("p",[e._v("MSISDN:"+e._s(e.filterCardInfo.msisdn))]),s("p",{class:{"p-t-45":!e.usageInfo.imei||"864319031839011"==e.usageInfo.imei}},[e._v("\n            ICCID:"+e._s(e.usageInfo.iccid)+"(编码:"+e._s(e.usageInfo.source)+")")]),e.usageInfo.imei&&"864319031839011"!=e.usageInfo.imei?s("p",[e._v("IMEI:"+e._s(e.usageInfo.imei))]):e._e(),s("div",{staticClass:"card-state-wrap"},[s("div",[s("span",{class:e.usageInfo.auth_status>=3?"cl-state-normal":"cl-state-warning"},[e._v(e._s(e.filterCardInfo.real_name_state))]),""==e.filterCardInfo.device_state?s("span",{class:1!=e.usageInfo.status?"cl-state-warning":"cl-state-primary"},[e._v(e._s(e.filterCardInfo.card_str_state))]):e._e(),""!=e.filterCardInfo.device_state?s("span",{class:1==e.filterCardInfo.device_state.code?"cl-state-primary":"cl-state-warning"},[e._v(e._s(e.filterCardInfo.device_state.state))]):e._e()]),s("div",[s("em",{on:{click:e.refreshOrActivated}},[e._v(e._s(e.filterCardInfo.refresh_actived))]),"app"!=e.client_type?s("router-link",{attrs:{to:"/weixin/question/index"}},[e._v("问题中心>")]):e._e()],1)])])]),s("div",{ref:"refCardData"},[e.filterCardInfo.is_flow_card?s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[e._v("剩余流量")]),s("span",[e._v(e._s(this.filterCardInfo.flow_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[e._v("总流量:"+e._s(this.filterCardInfo.flow_card_usage.total_flow)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.flow_card_usage.used_flow))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:e.toConnection}},[s("a",[e._v(" 流量用量详情> ")])])])]):s("div",{staticClass:"card-used-wrap"},[s("p",{staticClass:"card-surplus-flow"},[s("span",[e._v("剩余流量")]),s("span",[e._v(e._s(this.filterCardInfo.watch_card_usage.detail_right))])]),s("div",{staticClass:"card-flow-detail"},[s("div",{staticClass:"card-used-data-wrap"},[s("p",[s("span",[e._v("总流量:"+e._s(this.filterCardInfo.watch_card_usage.total_flow)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.watch_card_usage.used_flow))])]),s("p",[s("span",[e._v("总通话:"+e._s(this.filterCardInfo.watch_card_usage.total_voice)+" / ")]),s("span",[e._v("已使用:"+e._s(this.filterCardInfo.watch_card_usage.used_voice))])])]),s("div",{staticClass:"to-flow-wrap",on:{click:e.toConnection}},[s("a",[e._v(" 流量用量详情> ")])])])])]),s("div",{staticClass:"card-plan-wrap"},[s("p",{ref:"refPlanTitle",staticClass:"card-plan-wrap-title"},e._l(e.plan_title_array,function(a,t){return s("span",{class:{checked:t==e.cur_plan_type_index},on:{click:function(a){e.planTypeClikc(t)}}},[e._v(e._s(a))])})),s("div",{staticClass:"van-swipe-wrap"},[s("swiper",{ref:"mySwiper",attrs:{options:e.swiperOption}},[s("swiper-slide",[e.hasUsagePlan?s("ul",{staticClass:"usage-plan-wrap"},e._l(e.usageInfo.usage.plans,function(a,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[e._v(e._s(a.rps_name))]),s("div",{staticClass:"plan-describe"},[a.planCellInfo&&"{}"!=JSON.stringify(a.planCellInfo)?s("div",["MG500"!=a.planCellInfo.key?s("div",[a.describe&&"None"!=a.describe?s("p",[s("span",[e._v(e._s(a.describe))]),s("br"),s("span",{},[e._v(e._s(a.remark))])]):s("p",[s("span",[e._v(e._s(a.remark))])])]):e._e(),a.planCellInfo.max_high?s("span",[e._v("高速流量:"+e._s(a.planCellInfo.max_high)+",已使用"+e._s(a.planCellInfo.used_high))]):e._e(),s("br"),a.planCellInfo.max_normal?s("span",[e._v("中速流量:"+e._s(a.planCellInfo.max_normal))]):e._e()]):s("div",[a.describe&&"None"!=a.describe?s("p",[s("span",[e._v(e._s(a.describe))]),s("br"),s("span",[e._v(e._s(a.remark))])]):s("p",[s("span",[e._v(e._s(a.remark))])])])])]),s("div",{staticClass:"plan-date-wrap"},[e.inArray(e.usageInfo.source,e.watch_source)>=0||e.inArray(e.usageInfo.source,[1,7,8])>=0?s("p",{staticClass:"plan-date"},[s("span",[e._v("开始日期:"+e._s(e.filterDate(a.activated_at)))]),s("br"),s("span",[e._v("有效日期:"+e._s(e.filterDate(a.expired_at)))])]):a.expired_at?s("p",{staticClass:"plan-date"},[s("span",[e._v("有效日期:"+e._s(e.filterDate(a.expired_at)))])]):e._e(),a.planCellInfo&&"{}"!=JSON.stringify(a.planCellInfo)?s("div",{staticClass:"speedup-wrap"},[(a.planCellInfo.key,s("span",[1==a.planCellInfo.plan_cell_status?s("a",{attrs:{href:"javascript:;"}},[e._v("购买加速包")]):e._e()]))]):e._e(),e.usagePlanLength>1?s("div",{staticClass:"prefer_use"},[1e3==a.priority?s("a",{on:{click:function(t){e.prefer_use_operate(e.usageInfo.iccid,a.id,a.priority,e.usageInfo.source)}}},[e._v("优先使用")]):e._e(),0==a.priority?s("a",{on:{click:function(t){e.prefer_use_operate(e.usageInfo.iccid,a.id,a.priority,e.usageInfo.source)}}},[e._v("取消优先")]):e._e()]):e._e()])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("b066"),alt:""}})])]),s("swiper-slide",[e.hasOrderPlan?s("ul",{staticClass:"order-plan-wrap"},e._l(e.usageInfo.orders,function(a,t){return s("li",[s("div",{staticClass:"plan-info-wrap"},[s("p",{staticClass:"plan-name"},[e._v(e._s(a.name))]),2522==a.rating_id?s("p",{staticClass:"plan-describe"},[s("span",[e._v("月底清零,30天有效,全国通用,有效期或流量任一用完即停机，套餐包含：20G高速流量，480G中速流量，中速流量可使用加速包提升为高速流量。")])]):s("p",{staticClass:"plan-describe"},[a.describe&&"None"!=a.describe&&""!=a.describe?s("span",[e._v(e._s(a.describe))]):e._e(),s("br"),a.describe&&""!=a.describe&&"None"!=a.describe?e._e():s("span",{},[e._v(e._s(a.remark))])]),s("p",{staticClass:"plan-orderNo"},[e._v("订单号:"+e._s(a.no))])]),s("div",{staticClass:"plan-date-wrap"},[s("p",{staticClass:"plan-date"},[s("span",[e._v("续费日期:"+e._s(e.filterDate(a.created_at)))])]),s("p",{staticClass:"plan-order-status-wrap"},[s("span",[e._v(e._s(e.order_state[a.status]))])])])])})):s("div",{staticClass:"no-plan"},[s("img",{attrs:{src:t("96ab"),alt:""}})])])],1)],1)]),s("div",{ref:"refCardButton",staticClass:"btn-recharge-wrap"},[s("button",{on:{click:e.recharge}},[e._v("充值续费")]),s("router-link",{attrs:{to:"/weixin/coupon/index"}},[e._v("卡券兑换")])],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.load_skeleton,expression:"load_skeleton"}],staticClass:"fixed-wrap-loading"},[e._m(0)])])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"loading-common-center"}},[t("div",{attrs:{id:"loading-common-center-inner"}},[t("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),t("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],n=(t("6b54"),t("a322")),o=(t("e7e5"),t("d399")),c=(t("8a58"),t("e41f")),l=(t("7f7f"),t("9a83"),t("f564")),f=(t("cadf"),t("551c"),t("097d"),t("cd81")),d=t("7212"),u=t("35df"),_=t("db04"),p={name:"home",data:function(){var e=this;return{client_type:Object(u["c"])(),iccid:"",load_skeleton:!0,load_plan_msg:"",watch_source:[5,10,12,17,18,20,22],auth_status:["未实名","审核中","审核不通过"],card_state:["未激活","已激活","已停机","已废弃","可测试","可激活"],order_state:["未支付","已支付","已到账"],plan_title_array:["当前套餐","历史续费套餐"],cur_plan_type_index:0,filterCardInfo:{operator_logo:"",msisdn:"",device_state:"",card_str_state:"",real_name_state:"",refresh_actived:"",is_watch_card:!1,is_flow_card:!1,watch_card_usage:{total_flow:"",used_flow:"",total_voice:"",used_voice:"",detail_right:""},flow_card_usage:{total_flow:"",used_flow:"",detail_right:""}},hasUsagePlan:!1,usagePlanLength:0,hasOrderPlan:!1,usageInfo:{},swiperOption:{on:{slideChangeTransitionEnd:function(a){e.cur_plan_type_index=this.activeIndex}}},prefer_priority:0}},components:(s={},Object(n["a"])(s,l["a"].name,l["a"]),Object(n["a"])(s,c["a"].name,c["a"]),Object(n["a"])(s,o["a"].name,o["a"]),Object(n["a"])(s,"UsageSkeleton",f["a"]),Object(n["a"])(s,"swiper",d["swiper"]),Object(n["a"])(s,"swiperSlide",d["swiperSlide"]),s),created:function(){var e=this;this.$route.query.iccid&&Object(_["a"])("/api/v1/app/cards/telcom/usage",{iccid:this.$route.query.iccid}).then(function(a){e.load_skeleton=!1,1===a.state?(e.usageInfo=a.data,0===e.usageInfo.operator?e.filterCardInfo.operator_logo=t("2c53"):1===e.usageInfo.operator?e.filterCardInfo.operator_logo=t("2e44"):e.filterCardInfo.operator_logo=t("634e"),e.inArray(e.usageInfo.source,e.watch_source)>=0&&19!==e.usageInfo.source&&"86"===e.usageInfo.msisdn.substr(0,2)?e.filterCardInfo.msisdn=e.usageInfo.msisdn.substr(2,e.usageInfo.msisdn.length):e.filterCardInfo.msisdn=e.usageInfo.msisdn,e.inArray(e.usageInfo.source,[1,4])>=0?e.auth_status.push("手淘实名"):e.auth_status.push("已实名"),e.usageInfo.need_auth?e.filterCardInfo.real_name_state=e.auth_status[e.usageInfo.auth_status]:e.filterCardInfo.real_name_state="已实名",e.filterCardInfo.real_name_state=e.auth_status[e.usageInfo.auth_status],e.inArray(e.usageInfo.source,[0,2]),e.inArray(e.usageInfo.source,[1,5])>=0&&e.usageInfo.imei&&(e.usageInfo.usage.imei&&e.usageInfo.fenli?2===e.usageInfo.status?e.filterCardInfo.device_state={state:"机卡已分离停机",code:2}:e.filterCardInfo.device_state={state:"机卡分离",code:2}:e.filterCardInfo.device_state={state:"机卡已绑定",code:1}),e.filterCardInfo.card_str_state=e.card_state[e.usageInfo.status],2===e.usageInfo.status?e.filterCardInfo.refresh_actived="激活":e.filterCardInfo.refresh_actived="刷新",e.inArray(e.usageInfo.source,e.watch_source)>=0?(e.filterCardInfo.is_watch_card=!0,e.filterCardInfo.is_flow_card=!1,1===e.usageInfo.usage.noMax?(e.filterCardInfo.watch_card_usage.total_flow="无限",e.filterCardInfo.watch_card_usage.detail_right="无限"):(e.filterCardInfo.watch_card_usage.total_flow=e.flowUnit(e.usageInfo.usage.total,0,1),e.filterCardInfo.watch_card_usage.detail_right=e.flowUnit(0,{watchCard:!0,total:e.usageInfo.usage.total,used:e.usageInfo.usage.used},0)),e.filterCardInfo.watch_card_usage.used_flow=e.flowUnit(e.usageInfo.usage.used,0,0),1===e.usageInfo.usage.noMaxVoice?e.filterCardInfo.watch_card_usage.total_voice="无限":e.filterCardInfo.watch_card_usage.total_voice=Object(u["o"])(e.usageInfo.usage.totalVoice)+"分钟",e.filterCardInfo.watch_card_usage.used_voice=Object(u["o"])(e.usageInfo.usage.usedVoice)+"分钟",localStorage.setItem("is_flow_card",0)):(e.filterCardInfo.is_watch_card=!1,e.filterCardInfo.is_flow_card=!0,6!==e.usageInfo.source&&1!==e.usageInfo.usage.noMax||(e.filterCardInfo.flow_card_usage.total_flow="无限",e.filterCardInfo.flow_card_usage.detail_right="无限"),6!==e.usageInfo.source&&1!==e.usageInfo.usage.noMax&&(e.filterCardInfo.flow_card_usage.total_flow=e.flowUnit(e.usageInfo.usage.total,0,1),e.filterCardInfo.flow_card_usage.detail_right=e.flowUnit(0,{flowCard:!0,total:e.usageInfo.usage.total,used:e.usageInfo.usage.used},0)),e.filterCardInfo.flow_card_usage.used_flow=e.flowUnit(e.usageInfo.usage.used,0,0),localStorage.setItem("is_flow_card",1)),e.hasUsagePlan=!!e.usageInfo.usage.plans.length,e.usagePlanLength=e.usageInfo.usage.plans.length,e.hasOrderPlan=!!e.usageInfo.orders.length,e.$nextTick(function(){e.$refs.mySwiper.swiper.slideTo(0,500,!1);var a=document.documentElement.clientHeight||document.body.clientHeight,t=e.$refs.refCardInfo.offsetHeight,s=e.$refs.refCardData.offsetHeight,r=e.$refs.refCardButton.offsetHeight,i=e.$refs.refPlanTitle.offsetHeight,n=Object(u["i"])("userHeight")||44;"wechat"===e.client_type||"alipay"===e.client_type?e.$refs.mySwiper.$el.style.height=a-t-s-r-i-n+"px":e.$refs.mySwiper.$el.style.height=a-t-s-r-i+"px"})):Object(o["a"])({icon:"warning-o",message:a.msg,mask:!0,duration:0,forbidClick:!0})})},mounted:function(){},methods:{planTypeClikc:function(e){this.cur_plan_type_index=e,this.$refs.mySwiper.swiper.slideTo(e)},recharge:function(){Object(l["a"])({message:"临时链接，无法充值"})},refreshOrActivated:function(){Object(l["a"])({message:"临时链接，无法使用"})},toConnection:function(){Object(l["a"])({message:"临时链接，无法使用"})},inArray:function(e,a,t){return null==a?-1:a.indexOf(e,t)},flowUnit:function(e,a,t){return"[object Object]"===Object.prototype.toString.call(a)&&a.watchCard?a.total===a.used?"0.00MB":Object(u["o"])(a.total-a.used)+"MB":"[object Object]"===Object.prototype.toString.call(a)&&a.flowCard?a.total===a.used?"0.00GB":Object(u["o"])(Object(u["o"])(a.total/1024)-Object(u["o"])(a.used/1e3))+"GB":t?e>=1024?Object(u["o"])(e/1024)+"GB":Object(u["o"])(e)+"MB":e>=1e3?Object(u["o"])(e/1e3)+"GB":Object(u["o"])(e)+"MB"},prefer_use_operate:function(e,a,t,s){Object(l["a"])({message:"临时链接，无法使用"})}}},g=p,h=(t("d69c"),t("2877")),v=Object(h["a"])(g,r,i,!1,null,null,null);v.options.__file="usage_bak.vue";a["default"]=v.exports},"39aa3":function(e,a,t){},"468b":function(e,a,t){},c5dc:function(e,a,t){"use strict";var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"user-wrap"},[t("div",{staticClass:"user-inner-wrap"},[t("div",{staticClass:"user-name-wrap"},[t("img",{attrs:{src:e.getUserInfo.avatar}}),t("span",{staticClass:"user-name"},[e._v(e._s(e.getUserInfo.nickname))])]),t("div",[t("span",[e._v("余额:")]),t("span",{staticClass:"icon-diamond-wrap",on:{click:function(a){e.showDoc()}}},[t("i",{staticClass:"icon-user-size  icon-diamond"}),e._v("\n                      "+e._s(e.getUserInfo.account.balance)+"\n                  ")]),t("span",{staticClass:"tip-wrap",on:{click:e.showDoc}},[e._v("!")])])])])},r=[],i=t("a322"),n=(t("7f7f"),t("e17f"),t("2241")),o=t("c93e"),c=(t("cadf"),t("551c"),t("097d"),t("2f62")),l={name:"uesrHead",props:{userInfoData:{type:Object}},computed:Object(o["a"])({},Object(c["b"])({getUserInfo:function(e){return e.userInfo.userInfoInner}})),components:Object(i["a"])({},n["a"].name,n["a"]),methods:{showDoc:function(e){var a;a="余额：可用于购买套餐，套餐用量不停机时叠加包续费扣除。充值套餐剩余的钱会自动存到余额，也可将钻石转成余额,可以到公众号的“个人中心”菜单里查看余额的订单和消费记录",n["a"].alert({message:a})}}},f=l,d=(t("0b6e"),t("2877")),u=Object(d["a"])(f,s,r,!1,null,null,null);u.options.__file="uesrHead.vue";a["a"]=u.exports},d69c:function(e,a,t){"use strict";var s=t("468b"),r=t.n(s);r.a},e27a:function(e,a,t){}}]);
//# sourceMappingURL=Layout.55f221ff.js.map