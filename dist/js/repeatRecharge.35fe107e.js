(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["repeatRecharge"],{2994:function(e,t,a){"use strict";a("68ef"),a("c0c2")},"2bdd":function(e,t,a){"use strict";var i=a("fe7e"),n=a("023d"),s=a("db78");t["a"]=Object(i["a"])({render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.b()},[e._t("default"),e.loading?a("div",{class:e.b("loading")},[e._t("loading",[a("loading",{class:e.b("loading-icon")}),a("span",{class:e.b("loading-text")},[e._v(e._s(e.loadingText||e.$t("loadingTip")))])])],2):e._e(),e.finished&&e.finishedText?a("div",{class:e.b("finished-text")},[e._v("\n    "+e._s(e.finishedText)+"\n  ")]):e._e()],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300}},mounted:function(){this.scroller=n["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var e=this.$el,t=this.scroller,a=n["a"].getVisibleHeight(t);if(a&&"none"!==n["a"].getComputedStyle(e).display&&null!==e.offsetParent){var i=n["a"].getScrollTop(t),s=i+a,l=!1;if(e===t)l=t.scrollHeight-s<this.offset;else{var c=n["a"].getElementTop(e)-n["a"].getElementTop(t)+n["a"].getVisibleHeight(e);l=c-a<this.offset}l&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(e){this.binded!==e&&(this.binded=e,(e?s["b"]:s["a"])(this.scroller,"scroll",this.check))}}})},"7d18":function(e,t,a){"use strict";a.r(t);var i,n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"repeat-plan-wrap"},[a("div",{ref:"activityPage",staticClass:"activityPage"}),a("div",{ref:"vanSwiperWwrap",staticClass:"van-swipe-wrap"},[a("ul",{staticClass:"plan-list-wrap"},e._l(e.repeat_plan_list,function(t,i){return a("li",{class:{activedPlan:i==e.choose_plan_index,"plan-sell-done":"False"!=t.surplus_times&&t.surplus_times<=0},on:{click:function(t){e.choosePlanClick(i)}}},[a("div",{staticClass:"plan-info-wrap"},[a("p",{staticClass:"plan-name",class:{"plan-icon-recommend":t.is_recommend}},[t.is_recommend?a("span",{staticClass:"iconfont icon-recommend"}):e._e(),e._v("\n                                "+e._s(t.name)+"\n                            ")]),a("p",{staticClass:"plan-limited-wrap"},[a("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times>0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times>0"}],staticClass:"limited-num"},[e._v("剩"+e._s(t.surplus_times)+"笔")])]),a("p",{staticClass:"plan-desc"},[e._v("\n                                "+e._s(t.describe?t.describe:t.remark?t.remark:"")+"\n                            ")])]),a("div",{staticClass:"plan-price-wrap"},[a("p",{staticClass:"plan-price"},[a("i"),e._v("\n                              ￥"+e._s(t.repeat_recharge_price))]),a("del",{staticClass:"plan-origin-price"},[e._v("原价:￥"+e._s(t.price))])]),a("span",{staticClass:"plan-selected"}),a("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=t.surplus_times&&t.surplus_times<=0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times<=0"}],staticClass:"icon-sell-done"})])}))]),a("div",{ref:"refPlanButton2",staticClass:"btn-recharge-wrap ",class:{noDataHide:e.load_plan_list}},[a("button",{staticClass:"realNameButton",on:{click:e.goRealName}},[e._v("跳过此步，去实名")])]),a("div",{ref:"refPlanButton",staticClass:"btn-recharge-wrap",class:{noDataHide:e.load_plan_list}},[a("button",{on:{click:e.recharge}},[e._v("立即复充")])]),a("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_plan_list,callback:function(t){e.load_plan_list=t},expression:"load_plan_list"}},[a("p",{staticClass:"showTip"},[e._v(e._s(e.load_plan_msg))])]),a("div",{directives:[{name:"show",rawName:"v-show",value:""==e.load_plan_msg,expression:"load_plan_msg==''"}],staticClass:"fixed-wrap-loading"},[e._m(0)]),a("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.rechargeShow,callback:function(t){e.rechargeShow=t},expression:"rechargeShow"}},[a("p",{staticClass:"showTip"},[e._v("创建订单中,请等候")])])],1)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"loading-common-center"}},[a("div",{attrs:{id:"loading-common-center-inner"}},[a("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),a("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),a("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],l=(a("6b54"),a("9a83"),a("f564")),c=a("a322"),r=(a("2994"),a("2bdd")),o=(a("8a58"),a("e41f")),p=(a("7f7f"),a("e7e5"),a("d399")),d=a("7212"),u=a("35df"),h=a("db04"),_={name:"home",data:function(){var e=this;return{client_type:Object(u["c"])(),moth_plan:null,accumulated_plan:null,speedup_plan:null,load_plan_list:!1,load_plan_msg:"",plan_type:[],plan_type_name:[],cur_plan_type_index:0,choose_plan_index:0,plan_list:{},ref_plan_type:null,swiperOption:{on:{slideChangeTransitionEnd:function(t){e.cur_plan_type_index=this.activeIndex}}},rechargeShow:!1,repeat_plan_list:[],auth_url:"",allow_recharge:""}},components:(i={},Object(c["a"])(i,p["a"].name,p["a"]),Object(c["a"])(i,o["a"].name,o["a"]),Object(c["a"])(i,r["a"].name,r["a"]),Object(c["a"])(i,"swiper",d["swiper"]),Object(c["a"])(i,"swiperSlide",d["swiperSlide"]),i),computed:{swiper:function(){return this.$refs.swiperVant.swiper}},created:function(){var e=this;Object(h["a"])("/api/v1/app/repeat_recharge/plans",{iccid:Object(u["h"])("check_iccid")}).then(function(t){if(1==t.state){if(0==t.data.rate_plans.length)return location.href=t.data.auth_url,!1;e.load_plan_msg=t.msg,e.load_plan_list=!1,e.repeat_plan_list=t.data.rate_plans,e.auth_url=t.data.auth_url,e.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,a=e.$refs.refPlanButton.offsetHeight,i=e.$refs.refPlanButton2.offsetHeight,n=e.$refs.activityPage.offsetHeight,s=Object(u["h"])("userHeight")||44;"wechat"==e.client_type||"alipay"==e.client_type?e.$refs.vanSwiperWwrap.style.height=t-a-i-n-s+"px":e.$refs.vanSwiperWwrap.style.height=t-a-i-n+"px"})}else e.load_plan_list=!0,e.load_plan_msg=t.msg})},methods:{swiperOnChange:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0},planTypeClikc:function(e){this.cur_plan_type_index=e,this.choose_plan_index=0,this.swiper.slideTo(e)},choosePlanClick:function(e){this.choose_plan_index=e},recharge:function(){var e=this.repeat_plan_list[this.choose_plan_index];e.iccid=Object(u["h"])("check_iccid"),e.price=e.repeat_recharge_price,e.is_repeat_plan=!0,Object(u["l"])("planInfo",e,"obj"),this.directRecharge(e)},goRealName:function(){location.href=this.auth_url},directRecharge:function(e){var t=this;if("alipay"==this.client_type||"wechat"==this.client_type){var a={},i=this;a.status=0,a.recharge_price=e.price,a.price=e.price,"alipay"==this.client_type||"wechat"==this.client_type?a.open_id=Object(u["h"])("decrypt_data","obj").openid:"app"==this.client_type&&(a.open_id=Object(u["h"])("userInfo","obj").account.user_id),a.iccid=e.iccid||Object(u["h"])("check_iccid"),a.rating_id=e.id,a.user_id=Object(u["h"])("userInfo","obj").account.user_id,a.env=this.client_type,"app"==this.client_type?this.appPay.type?a.pay_type="WEIXIN":a.pay_type="ALIPAY":"wechat"==this.client_type?a.pay_type="WEIXIN":"alipay"==this.client_type&&(a.pay_type="ALIPAY"),a.start_time=this.getToday(),a.type=0,e.is_repeat_plan&&(a.is_repeat_plan=1),this.rechargeShow=!0,Object(h["b"])("/api/v1/pay/weixin/create",a).then(function(e){1==e.state?(t.rechargeShow=!1,/<[^>]+>/.test(e.data)?document.write(e.data):e.data&&"[object String]"==Object.prototype.toString.call(e.data)&&"http"==e.data.substr(0,4)?"mifi"===t.global_variables.packed_project?location.href="".concat(t.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data:(Object(l["a"])({message:"充值成功",background:"#60ce53"}),setTimeout(function(){"esim"==localStorage.getItem("currentType")?location.href="".concat(i.global_variables.authorized_redirect_url,"/weixin/card/esim_usage"):"mifi"===i.global_variables.packed_project?location.href="".concat(i.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data.return_url},1500))):(t.rechargeShow=!1,Object(l["a"])({message:e.msg}))})}else Object(l["a"])({message:"请在微信或支付宝客户端充值"})},getToday:function(e){var t=new Date;e&&(t=new Date(e));var a=t.getFullYear(),i=t.getMonth()+1,n=t.getDate();return i<10&&(i="0"+i),n<10&&(n="0"+n),a+"-"+i+"-"+n}}},f=_,m=(a("e3c8"),a("2877")),g=Object(m["a"])(f,n,s,!1,null,null,null);g.options.__file="repeatRecharge.vue";t["default"]=g.exports},"8a58":function(e,t,a){"use strict";a("68ef"),a("4d75")},b258:function(e,t,a){},c0c2:function(e,t,a){},d399:function(e,t,a){"use strict";var i=a("1988"),n=a("2b0e"),s=a("fe7e"),l=a("6605"),c=["success","fail","loading"],r=Object(s["a"])({render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"van-fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b([e.style,e.position])},["text"===e.style?a("div",[e._v(e._s(e.message))]):e._e(),"html"===e.style?a("div",{domProps:{innerHTML:e._s(e.message)}}):e._e(),"default"===e.style?["loading"===e.type?a("loading",{attrs:{color:"white",type:e.loadingType}}):a("icon",{class:e.b("icon"),attrs:{name:e.type}}),e.isDef(e.message)?a("div",{class:e.b("text")},[e._v("\n        "+e._s(e.message)+"\n      ")]):e._e()]:e._e()],2)])},name:"toast",mixins:[l["a"]],props:{forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},loadingType:{type:String,default:"circular"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},computed:{style:function(){return-1!==c.indexOf(this.type)?"default":this.type}},mounted:function(){this.toggleClickale()},destroyed:function(){this.toggleClickale()},watch:{value:function(){this.toggleClickale()},forbidClick:function(){this.toggleClickale()}},methods:{toggleClickale:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}}}}),o=a("a142"),p={type:"text",mask:!1,message:"",value:!0,duration:3e3,position:"middle",loadingType:"circular",forbidClick:!1,overlayStyle:{}},d=function(e){return Object(o["d"])(e)?e:{message:e}},u=[],h=!0,_=Object(i["a"])({},p);function f(){if(o["e"])return{};if(!u.length||!h){var e=new(n["a"].extend(r))({el:document.createElement("div")});document.body.appendChild(e.$el),u.push(e)}return u[u.length-1]}function m(e){return e.overlay=e.mask,e}function g(e){void 0===e&&(e={});var t=f();return e=Object(i["a"])({},_,d(e),{clear:function(){t.value=!1,h||o["e"]||(document.body.removeChild(t.$el),t.$destroy())}}),Object(i["a"])(t,m(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var v=function(e){return function(t){return g(Object(i["a"])({type:e},d(t)))}};["loading","success","fail"].forEach(function(e){g[e]=v(e)}),g.clear=function(e){u.length&&(e?(u.forEach(function(e){e.clear()}),u=[]):h?u[0].clear():u.shift().clear())},g.setDefaultOptions=function(e){Object(i["a"])(_,e)},g.resetDefaultOptions=function(){_=Object(i["a"])({},p)},g.allowMultiple=function(e){void 0===e&&(e=!0),h=!e},g.install=function(){n["a"].use(r)},n["a"].prototype.$toast=g;t["a"]=g},e3c8:function(e,t,a){"use strict";var i=a("fae0"),n=a.n(i);n.a},e41f:function(e,t,a){"use strict";var i=a("fe7e"),n=a("6605");t["a"]=Object(i["a"])({render:function(){var e,t=this,a=t.$createElement,i=t._self._c||a;return i("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[n["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})},e7e5:function(e,t,a){"use strict";a("68ef"),a("4d75"),a("b258")},fae0:function(e,t,a){}}]);
//# sourceMappingURL=repeatRecharge.35fe107e.js.map