(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["repeatRecharge"],{"02de":function(e,t,i){"use strict";function a(e){var t=window.getComputedStyle(e),i="none"===t.display,a=null===e.offsetParent&&"fixed"!==t.position;return i||a}i.d(t,"a",function(){return a})},2994:function(e,t,i){"use strict";i("68ef"),i("e3b3"),i("c0c2")},"2bdd":function(e,t,i){"use strict";var a=i("d282"),n=i("02de"),s=i("a8c1"),c=i("5fbe"),r=i("543e"),o=Object(a["a"])("list"),l=o[0],d=o[1],p=o[2];t["a"]=l({mixins:[Object(c["a"])(function(e){this.scroller||(this.scroller=Object(s["d"])(this.$el)),e(this.scroller,"scroll",this.check)})],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var e=this;this.$nextTick(function(){if(!(e.innerLoading||e.finished||e.error)){var t,i=e.$el,a=e.scroller,s=e.offset,c=e.direction;t=a.getBoundingClientRect?a.getBoundingClientRect():{top:0,bottom:a.innerHeight};var r=t.bottom-t.top;if(!r||Object(n["a"])(i))return!1;var o=!1,l=e.$refs.placeholder.getBoundingClientRect();o="up"===c?t.top-l.top<=s:l.bottom-t.bottom<=s,o&&(e.innerLoading=!0,e.$emit("input",!0),e.$emit("load"))}})},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var e=this.$createElement;if(this.innerLoading&&!this.finished)return e("div",{key:"loading",class:d("loading")},[this.slots("loading")||e(r["a"],{attrs:{size:"16"}},[this.loadingText||p("loading")])])},genFinishedText:function(){var e=this.$createElement;if(this.finished){var t=this.slots("finished")||this.finishedText;if(t)return e("div",{class:d("finished-text")},[t])}},genErrorText:function(){var e=this.$createElement;if(this.error){var t=this.slots("error")||this.errorText;if(t)return e("div",{on:{click:this.clickErrorText},class:d("error-text")},[t])}}},render:function(){var e=arguments[0],t=e("div",{ref:"placeholder",key:"placeholder",class:d("placeholder")});return e("div",{class:d(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():t,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():t])}})},"7d18":function(e,t,i){"use strict";i.r(t);var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"repeat-plan-wrap"},[i("div",{ref:"activityPage",staticClass:"activityPage"}),i("div",{ref:"vanSwiperWwrap",staticClass:"van-swipe-wrap"},[i("ul",{staticClass:"plan-list-wrap"},e._l(e.repeat_plan_list,function(t,a){return i("li",{class:{activedPlan:a==e.choose_plan_index,"plan-sell-done":"False"!=t.surplus_times&&t.surplus_times<=0},on:{click:function(t){e.choosePlanClick(a)}}},[i("div",{staticClass:"plan-info-wrap"},[i("p",{staticClass:"plan-name",class:{"plan-icon-recommend":t.is_recommend}},[t.is_recommend?i("span",{staticClass:"iconfont icon-recommend"}):e._e(),e._v("\n            "+e._s(t.name)+"\n          ")]),i("p",{staticClass:"plan-limited-wrap"},[i("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times>0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times>0"}],staticClass:"limited-num"},[e._v("剩"+e._s(t.surplus_times)+"笔")])]),i("p",{staticClass:"plan-desc"},[e._v("\n            "+e._s(t.describe?t.describe:t.remark?t.remark:"")+"\n          ")])]),i("div",{staticClass:"plan-price-wrap"},[i("p",{staticClass:"plan-price"},[i("i"),e._v("\n            ￥"+e._s(t.repeat_recharge_price))]),i("del",{staticClass:"plan-origin-price"},[e._v("原价:￥"+e._s(t.price))])]),i("span",{staticClass:"plan-selected"}),i("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times<=0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times<=0"}],staticClass:"icon-sell-done"})])}))]),i("div",{ref:"refPlanButton2",staticClass:"btn-recharge-wrap ",class:{noDataHide:e.load_plan_list}},[i("button",{staticClass:"realNameButton",on:{click:e.goRealName}},[e._v("跳过此步，去实名")])]),i("div",{ref:"refPlanButton",staticClass:"btn-recharge-wrap",class:{noDataHide:e.load_plan_list}},[i("button",{on:{click:e.recharge}},[e._v("立即复充")])]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_plan_list,callback:function(t){e.load_plan_list=t},expression:"load_plan_list"}},[i("p",{staticClass:"showTip"},[e._v(e._s(e.load_plan_msg))])]),i("div",{directives:[{name:"show",rawName:"v-show",value:""==e.load_plan_msg,expression:"load_plan_msg==''"}],staticClass:"fixed-wrap-loading"},[e._m(0)]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.rechargeShow,callback:function(t){e.rechargeShow=t},expression:"rechargeShow"}},[i("p",{staticClass:"showTip"},[e._v("创建订单中,请等候")])])],1)},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"loading-common-center"}},[i("div",{attrs:{id:"loading-common-center-inner"}},[i("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],c=(i("9a83"),i("f564")),r=(i("6b54"),i("a322")),o=(i("2994"),i("2bdd")),l=(i("8a58"),i("e41f")),d=(i("7f7f"),i("e7e5"),i("d399")),p=(i("cadf"),i("551c"),i("097d"),i("7212")),u=i("35df"),h=i("db04"),f={name:"home",data:function(){var e=this;return{client_type:Object(u["d"])(),moth_plan:null,accumulated_plan:null,speedup_plan:null,load_plan_list:!1,load_plan_msg:"",plan_type:[],plan_type_name:[],cur_plan_type_index:0,choose_plan_index:0,plan_list:{},ref_plan_type:null,swiperOption:{on:{slideChangeTransitionEnd:function(t){e.cur_plan_type_index=this.activeIndex}}},rechargeShow:!1,repeat_plan_list:[],auth_url:"",allow_recharge:""}},components:(a={},Object(r["a"])(a,d["a"].name,d["a"]),Object(r["a"])(a,l["a"].name,l["a"]),Object(r["a"])(a,o["a"].name,o["a"]),Object(r["a"])(a,"swiper",p["swiper"]),Object(r["a"])(a,"swiperSlide",p["swiperSlide"]),a),computed:{swiper:function(){return this.$refs.swiperVant.swiper}},created:function(){var e=this;Object(u["p"])("plan_list_new_card"),Object(h["a"])("/api/v1/app/repeat_recharge/plans",{iccid:Object(u["j"])("check_iccid")}).then(function(t){if(1===t.state){if(0===t.data.rate_plans.length)return location.href=t.data.auth_url,!1;Object(u["n"])({iccid:Object(u["j"])("check_iccid"),type:6}),e.load_plan_msg=t.msg,e.load_plan_list=!1,e.repeat_plan_list=t.data.rate_plans,e.auth_url=t.data.auth_url,e.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,i=e.$refs.refPlanButton.offsetHeight,a=e.$refs.refPlanButton2.offsetHeight,n=e.$refs.activityPage.offsetHeight,s=Object(u["j"])("userHeight")||44;"wechat"===e.client_type||"alipay"===e.client_type?e.$refs.vanSwiperWwrap.style.height=t-i-a-n-s+"px":e.$refs.vanSwiperWwrap.style.height=t-i-a-n+"px"})}else e.load_plan_list=!0,e.load_plan_msg=t.msg})},methods:{swiperOnChange:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0},planTypeClikc:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0,this.swiper.slideTo(e)},choosePlanClick:function(e){this.choose_plan_index=e},recharge:function(){if("alipay"===this.client_type||"wechat"===this.client_type){var e=this.repeat_plan_list[this.choose_plan_index];e.iccid=Object(u["j"])("check_iccid"),e.price=e.repeat_recharge_price,e.is_repeat_plan=!0,Object(u["q"])("planInfo",e,"obj"),this.directRecharge(e)}else Object(d["a"])({position:"top",message:"请在微信或支付宝客户端充值"})},goRealName:function(){location.href=this.auth_url},directRecharge:function(e){var t=this;try{var i={},a=this;i.status=0,i.recharge_price=e.price,i.price=e.price,"alipay"===this.client_type||"wechat"===this.client_type?i.open_id=(Object(u["j"])("decrypt_data","obj")||{}).openid:"app"===this.client_type&&(i.open_id=Object(u["j"])("userInfo","obj").account.user_id),i.iccid=e.iccid||Object(u["j"])("check_iccid"),i.rating_id=e.id,i.user_id=Object(u["j"])("userInfo","obj").account.user_id,i.env=this.client_type,"app"===this.client_type?this.appPay.type?i.pay_type="WEIXIN":i.pay_type="ALIPAY":"wechat"===this.client_type?i.pay_type="WEIXIN":"alipay"===this.client_type&&(i.pay_type="ALIPAY"),i.start_time=this.getToday(),i.type=0,e.is_repeat_plan&&(i.is_repeat_plan=1),this.rechargeShow=!0,Object(h["b"])("/api/v1/pay/weixin/create",i).then(function(e){1===e.state?(t.rechargeShow=!1,/<[^>]+>/.test(e.data)?document.write(e.data):e.data&&"[object String]"===Object.prototype.toString.call(e.data)&&"http"===e.data.substr(0,4)?"mifi"===t.global_variables.packed_project?location.href="".concat(t.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data:(Object(c["a"])({message:"充值成功",background:"#60ce53"}),setTimeout(function(){"esim"===localStorage.getItem("currentType")?location.href="".concat(a.global_variables.authorized_redirect_url,"/weixin/card/esim_usage"):"mifi"===a.global_variables.packed_project?location.href="".concat(a.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data.return_url},1500))):"10015"==e.state?(Object(c["a"])({message:e.msg}),setTimeout(function(){a.$router.push({path:"/weixin/card/plan_list"})},1500)):(t.rechargeShow=!1,Object(c["a"])({message:e.msg}))})}catch(e){Object(d["a"])({position:"top",message:e.message})}},getToday:function(e){var t=new Date;e&&(t=new Date(e));var i=t.getFullYear(),a=t.getMonth()+1,n=t.getDate();return a<10&&(a="0"+a),n<10&&(n="0"+n),i+"-"+a+"-"+n}}},_=f,g=(i("e3c8"),i("2877")),m=Object(g["a"])(_,n,s,!1,null,null,null);m.options.__file="repeatRecharge.vue";t["default"]=m.exports},b258:function(e,t,i){},c0c2:function(e,t,i){},d399:function(e,t,i){"use strict";var a=i("1988"),n=i("2b0e"),s=i("d282"),c=i("a142"),r=0;function o(e){e?(r||document.body.classList.add("van-toast--unclickable"),r++):(r--,r||document.body.classList.remove("van-toast--unclickable"))}var l=i("6605"),d=i("ad06"),p=i("543e"),u=Object(s["a"])("toast"),h=u[0],f=u[1],_=h({mixins:[Object(l["a"])()],props:{icon:String,className:null,iconPrefix:String,loadingType:String,forbidClick:Boolean,closeOnClick:Boolean,message:[Number,String],type:{type:String,default:"text"},position:{type:String,default:"middle"},transition:{type:String,default:"van-fade"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:"toggleClickable",forbidClick:"toggleClickable"},methods:{onClick:function(){this.closeOnClick&&this.close()},toggleClickable:function(){var e=this.value&&this.forbidClick;this.clickable!==e&&(this.clickable=e,o(e))},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")},genIcon:function(){var e=this.$createElement,t=this.icon,i=this.type,a=this.iconPrefix,n=this.loadingType,s=t||"success"===i||"fail"===i;return s?e(d["a"],{class:f("icon"),attrs:{classPrefix:a,name:t||i}}):"loading"===i?e(p["a"],{class:f("loading"),attrs:{type:n}}):void 0},genMessage:function(){var e=this.$createElement,t=this.type,i=this.message;if(Object(c["c"])(i)&&""!==i)return"html"===t?e("div",{class:f("text"),domProps:{innerHTML:i}}):e("div",{class:f("text")},[i])}},render:function(){var e,t=arguments[0];return t("transition",{attrs:{name:this.transition},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[t("div",{directives:[{name:"show",value:this.value}],class:[f([this.position,(e={},e[this.type]=!this.icon,e)]),this.className],on:{click:this.onClick}},[this.genIcon(),this.genMessage()])])}}),g=i("092d"),m={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",overlay:!1,onClose:null,onOpened:null,duration:2e3,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null,closeOnClick:!1,closeOnClickOverlay:!1},v={},b=[],y=!1,w=Object(a["a"])({},m);function j(e){return Object(c["e"])(e)?e:{message:e}}function k(e){return document.body.contains(e)}function C(){if(c["g"])return{};if(b=b.filter(function(e){return!e.$el.parentNode||k(e.$el)}),!b.length||y){var e=new(n["default"].extend(_))({el:document.createElement("div")});e.$on("input",function(t){e.value=t}),b.push(e)}return b[b.length-1]}function x(e){return Object(a["a"])({},e,{overlay:e.mask||e.overlay,mask:void 0,duration:void 0})}function O(e){void 0===e&&(e={});var t=C();return t.value&&t.updateZIndex(),e=j(e),e=Object(a["a"])({},w,v[e.type||w.type],e),e.clear=function(){t.value=!1,e.onClose&&(e.onClose(),e.onClose=null),y&&!c["g"]&&t.$on("closed",function(){clearTimeout(t.timer),b=b.filter(function(e){return e!==t}),Object(g["a"])(t.$el),t.$destroy()})},Object(a["a"])(t,x(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var T=function(e){return function(t){return O(Object(a["a"])({type:e},j(t)))}};["loading","success","fail"].forEach(function(e){O[e]=T(e)}),O.clear=function(e){b.length&&(e?(b.forEach(function(e){e.clear()}),b=[]):y?b.shift().clear():b[0].clear())},O.setDefaultOptions=function(e,t){"string"===typeof e?v[e]=t:Object(a["a"])(w,e)},O.resetDefaultOptions=function(e){"string"===typeof e?v[e]=null:(w=Object(a["a"])({},m),v={})},O.allowMultiple=function(e){void 0===e&&(e=!0),y=e},O.install=function(){n["default"].use(_)},n["default"].prototype.$toast=O;t["a"]=O},e3c8:function(e,t,i){"use strict";var a=i("fae0"),n=i.n(a);n.a},e7e5:function(e,t,i){"use strict";i("68ef"),i("a71a"),i("9d70"),i("3743"),i("4d75"),i("e3b3"),i("b258")},fae0:function(e,t,i){}}]);
//# sourceMappingURL=repeatRecharge.d9a7b48b.js.map