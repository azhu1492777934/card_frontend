(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["repeatRecharge"],{2994:function(e,t,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(e,t,i){"use strict";var a=i("d282"),n=i("543e"),s=i("5fbe"),c=i("a8c1"),l=Object(a["a"])("list"),r=l[0],o=l[1],d=l[2];t["a"]=r({mixins:[Object(s["a"])(function(e){this.scroller||(this.scroller=Object(c["c"])(this.$el)),e(this.scroller,"scroll",this.check)})],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300},direction:{type:String,default:"down"}},mounted:function(){this.immediateCheck&&this.$nextTick(this.check)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!(this.loading||this.finished||this.error)){var e,t=this.$el,i=this.scroller,a=this.offset,n=this.direction;e=i.getBoundingClientRect?i.getBoundingClientRect():{top:0,bottom:i.innerHeight};var s=e.bottom-e.top;if(!s||"none"===window.getComputedStyle(t).display||null===t.offsetParent)return!1;var c=!1,l=this.$refs.placeholder.getBoundingClientRect();c="up"===n?l.top-e.top<=a:l.bottom-e.bottom<=a,c&&(this.$emit("input",!0),this.$emit("load"))}},clickErrorText:function(){this.$emit("update:error",!1),this.$nextTick(this.check)}},render:function(e){var t=e("div",{ref:"placeholder",class:o("placeholder")});return e("div",{class:o(),attrs:{role:"feed","aria-busy":this.loading}},["down"===this.direction?this.slots():t,this.loading&&e("div",{class:o("loading"),key:"loading"},[this.slots("loading")||e(n["a"],{attrs:{size:"16"}},[this.loadingText||d("loading")])]),this.finished&&this.finishedText&&e("div",{class:o("finished-text")},[this.finishedText]),this.error&&this.errorText&&e("div",{on:{click:this.clickErrorText},class:o("error-text")},[this.errorText]),"up"===this.direction?this.slots():t])}})},"7d18":function(e,t,i){"use strict";i.r(t);var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"repeat-plan-wrap"},[i("div",{ref:"activityPage",staticClass:"activityPage"}),i("div",{ref:"vanSwiperWwrap",staticClass:"van-swipe-wrap"},[i("ul",{staticClass:"plan-list-wrap"},e._l(e.repeat_plan_list,function(t,a){return i("li",{class:{activedPlan:a==e.choose_plan_index,"plan-sell-done":"False"!=t.surplus_times&&t.surplus_times<=0},on:{click:function(t){e.choosePlanClick(a)}}},[i("div",{staticClass:"plan-info-wrap"},[i("p",{staticClass:"plan-name",class:{"plan-icon-recommend":t.is_recommend}},[t.is_recommend?i("span",{staticClass:"iconfont icon-recommend"}):e._e(),e._v("\n            "+e._s(t.name)+"\n          ")]),i("p",{staticClass:"plan-limited-wrap"},[i("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times>0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times>0"}],staticClass:"limited-num"},[e._v("剩"+e._s(t.surplus_times)+"笔")])]),i("p",{staticClass:"plan-desc"},[e._v("\n            "+e._s(t.describe?t.describe:t.remark?t.remark:"")+"\n          ")])]),i("div",{staticClass:"plan-price-wrap"},[i("p",{staticClass:"plan-price"},[i("i"),e._v("\n            ￥"+e._s(t.repeat_recharge_price))]),i("del",{staticClass:"plan-origin-price"},[e._v("原价:￥"+e._s(t.price))])]),i("span",{staticClass:"plan-selected"}),i("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times<=0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times<=0"}],staticClass:"icon-sell-done"})])}))]),i("div",{ref:"refPlanButton2",staticClass:"btn-recharge-wrap ",class:{noDataHide:e.load_plan_list}},[i("button",{staticClass:"realNameButton",on:{click:e.goRealName}},[e._v("跳过此步，去实名")])]),i("div",{ref:"refPlanButton",staticClass:"btn-recharge-wrap",class:{noDataHide:e.load_plan_list}},[i("button",{on:{click:e.recharge}},[e._v("立即复充")])]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_plan_list,callback:function(t){e.load_plan_list=t},expression:"load_plan_list"}},[i("p",{staticClass:"showTip"},[e._v(e._s(e.load_plan_msg))])]),i("div",{directives:[{name:"show",rawName:"v-show",value:""==e.load_plan_msg,expression:"load_plan_msg==''"}],staticClass:"fixed-wrap-loading"},[e._m(0)]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.rechargeShow,callback:function(t){e.rechargeShow=t},expression:"rechargeShow"}},[i("p",{staticClass:"showTip"},[e._v("创建订单中,请等候")])])],1)},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"loading-common-center"}},[i("div",{attrs:{id:"loading-common-center-inner"}},[i("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],c=(i("6b54"),i("9a83"),i("f564")),l=i("a322"),r=(i("2994"),i("2bdd")),o=(i("8a58"),i("e41f")),d=(i("7f7f"),i("e7e5"),i("d399")),p=i("7212"),u=i("35df"),h=i("db04"),_={name:"home",data:function(){var e=this;return{client_type:Object(u["c"])(),moth_plan:null,accumulated_plan:null,speedup_plan:null,load_plan_list:!1,load_plan_msg:"",plan_type:[],plan_type_name:[],cur_plan_type_index:0,choose_plan_index:0,plan_list:{},ref_plan_type:null,swiperOption:{on:{slideChangeTransitionEnd:function(t){e.cur_plan_type_index=this.activeIndex}}},rechargeShow:!1,repeat_plan_list:[],auth_url:"",allow_recharge:""}},components:(a={},Object(l["a"])(a,d["a"].name,d["a"]),Object(l["a"])(a,o["a"].name,o["a"]),Object(l["a"])(a,r["a"].name,r["a"]),Object(l["a"])(a,"swiper",p["swiper"]),Object(l["a"])(a,"swiperSlide",p["swiperSlide"]),a),computed:{swiper:function(){return this.$refs.swiperVant.swiper}},created:function(){var e=this;Object(u["m"])("plan_list_new_card"),Object(h["a"])("/api/v1/app/repeat_recharge/plans",{iccid:Object(u["i"])("check_iccid")}).then(function(t){if(1===t.state){if(0===t.data.rate_plans.length)return location.href=t.data.auth_url,!1;Object(u["l"])({iccid:Object(u["i"])("check_iccid"),type:6}),e.load_plan_msg=t.msg,e.load_plan_list=!1,e.repeat_plan_list=t.data.rate_plans,e.auth_url=t.data.auth_url,e.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,i=e.$refs.refPlanButton.offsetHeight,a=e.$refs.refPlanButton2.offsetHeight,n=e.$refs.activityPage.offsetHeight,s=Object(u["i"])("userHeight")||44;"wechat"===e.client_type||"alipay"===e.client_type?e.$refs.vanSwiperWwrap.style.height=t-i-a-n-s+"px":e.$refs.vanSwiperWwrap.style.height=t-i-a-n+"px"})}else e.load_plan_list=!0,e.load_plan_msg=t.msg})},methods:{swiperOnChange:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0},planTypeClikc:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0,this.swiper.slideTo(e)},choosePlanClick:function(e){this.choose_plan_index=e},recharge:function(){var e=this.repeat_plan_list[this.choose_plan_index];e.iccid=Object(u["i"])("check_iccid"),e.price=e.repeat_recharge_price,e.is_repeat_plan=!0,Object(u["n"])("planInfo",e,"obj"),this.directRecharge(e)},goRealName:function(){location.href=this.auth_url},directRecharge:function(e){var t=this;if("alipay"===this.client_type||"wechat"===this.client_type){var i={},a=this;i.status=0,i.recharge_price=e.price,i.price=e.price,"alipay"===this.client_type||"wechat"===this.client_type?i.open_id=(Object(u["i"])("decrypt_data","obj")||{}).openid:"app"===this.client_type&&(i.open_id=Object(u["i"])("userInfo","obj").account.user_id),i.iccid=e.iccid||Object(u["i"])("check_iccid"),i.rating_id=e.id,i.user_id=Object(u["i"])("userInfo","obj").account.user_id,i.env=this.client_type,"app"===this.client_type?this.appPay.type?i.pay_type="WEIXIN":i.pay_type="ALIPAY":"wechat"===this.client_type?i.pay_type="WEIXIN":"alipay"===this.client_type&&(i.pay_type="ALIPAY"),i.start_time=this.getToday(),i.type=0,e.is_repeat_plan&&(i.is_repeat_plan=1),this.rechargeShow=!0,Object(h["b"])("/api/v1/pay/weixin/create",i).then(function(e){1===e.state?(t.rechargeShow=!1,/<[^>]+>/.test(e.data)?document.write(e.data):e.data&&"[object String]"===Object.prototype.toString.call(e.data)&&"http"===e.data.substr(0,4)?"mifi"===t.global_variables.packed_project?location.href="".concat(t.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data:(Object(c["a"])({message:"充值成功",background:"#60ce53"}),setTimeout(function(){"esim"===localStorage.getItem("currentType")?location.href="".concat(a.global_variables.authorized_redirect_url,"/weixin/card/esim_usage"):"mifi"===a.global_variables.packed_project?location.href="".concat(a.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data.return_url},1500))):"10015"==e.state?(Object(c["a"])({message:e.msg}),setTimeout(function(){a.$router.push({path:"/weixin/card/plan_list"})},1500)):(t.rechargeShow=!1,Object(c["a"])({message:e.msg}))})}else Object(c["a"])({message:"请在微信或支付宝客户端充值"})},getToday:function(e){var t=new Date;e&&(t=new Date(e));var i=t.getFullYear(),a=t.getMonth()+1,n=t.getDate();return a<10&&(a="0"+a),n<10&&(n="0"+n),i+"-"+a+"-"+n}}},f=_,m=(i("e3c8"),i("2877")),g=Object(m["a"])(f,n,s,!1,null,null,null);g.options.__file="repeatRecharge.vue";t["default"]=g.exports},b258:function(e,t,i){},c0c2:function(e,t,i){},d399:function(e,t,i){"use strict";var a=i("1988"),n=i("2b0e"),s=i("d282"),c=i("a142"),l=i("6605"),r=i("ad06"),o=i("543e"),d=Object(s["a"])("toast"),p=d[0],u=d[1],h=p({mixins:[l["a"]],props:{icon:String,className:null,loadingType:String,forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:function(){this.toggleClickable()},forbidClick:function(){this.toggleClickable()}},methods:{toggleClickable:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")}},render:function(e){var t=this.type,i=this.icon,a=this.message,n=this.loadingType,s=i||"success"===t||"fail"===t;function l(){return s?e(r["a"],{class:u("icon"),attrs:{name:i||t}}):"loading"===t?e(o["a"],{class:u("loading"),attrs:{color:"white",type:n}}):void 0}function d(){if(Object(c["b"])(a)&&""!==a)return"html"===t?e("div",{class:u("text"),domProps:{innerHTML:a}}):e("div",{class:u("text")},[a])}return e("transition",{attrs:{name:"van-fade"},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[e("div",{directives:[{name:"show",value:this.value}],class:[u([this.position,{text:!s&&"loading"!==t}]),this.className]},[l(),d()])])}}),_={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",onClose:null,onOpened:null,duration:3e3,position:"middle",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null},f=[],m=!1,g=Object(a["a"])({},_);function v(e){return Object(c["c"])(e)?e:{message:e}}function b(){if(c["d"])return{};if(!f.length||m){var e=new(n["default"].extend(h))({el:document.createElement("div")});f.push(e)}return f[f.length-1]}function y(e){return e=Object(a["a"])({},e),e.overlay=e.mask,delete e.mask,delete e.duration,e}function w(e){void 0===e&&(e={});var t=b();return t.value&&t.updateZIndex(),e=Object(a["a"])({},g,v(e),{clear:function(){t.value=!1,e.onClose&&e.onClose(),m&&!c["d"]&&t.$on("closed",function(){clearTimeout(t.timer),f=f.filter(function(e){return e!==t});var e=t.$el.parentNode;e&&e.removeChild(t.$el),t.$destroy()})}}),Object(a["a"])(t,y(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var k=function(e){return function(t){return w(Object(a["a"])({type:e},v(t)))}};["loading","success","fail"].forEach(function(e){w[e]=k(e)}),w.clear=function(e){f.length&&(e?(f.forEach(function(e){e.clear()}),f=[]):m?f.shift().clear():f[0].clear())},w.setDefaultOptions=function(e){Object(a["a"])(g,e)},w.resetDefaultOptions=function(){g=Object(a["a"])({},_)},w.allowMultiple=function(e){void 0===e&&(e=!0),m=e},w.install=function(){n["default"].use(h)},n["default"].prototype.$toast=w;t["a"]=w},e3c8:function(e,t,i){"use strict";var a=i("fae0"),n=i.n(a);n.a},e7e5:function(e,t,i){"use strict";i("68ef"),i("4d75"),i("09fe"),i("b258")},fae0:function(e,t,i){}}]);
//# sourceMappingURL=repeatRecharge.04cf60c1.js.map