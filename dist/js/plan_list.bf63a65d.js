(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["plan_list"],{"1d44":function(e,t,i){},2994:function(e,t,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(e,t,i){"use strict";var a=i("d282"),n=i("543e"),s=i("5fbe"),o=i("a8c1"),c=Object(a["a"])("list"),l=c[0],r=c[1],d=c[2];t["a"]=l({mixins:[Object(s["a"])(function(e){this.scroller||(this.scroller=Object(o["c"])(this.$el)),e(this.scroller,"scroll",this.check)})],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300},direction:{type:String,default:"down"}},mounted:function(){this.immediateCheck&&this.$nextTick(this.check)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!(this.loading||this.finished||this.error)){var e,t=this.$el,i=this.scroller,a=this.offset,n=this.direction;e=i.getBoundingClientRect?i.getBoundingClientRect():{top:0,bottom:i.innerHeight};var s=e.bottom-e.top;if(!s||"none"===window.getComputedStyle(t).display||null===t.offsetParent)return!1;var o=!1,c=this.$refs.placeholder.getBoundingClientRect();o="up"===n?c.top-e.top<=a:c.bottom-e.bottom<=a,o&&(this.$emit("input",!0),this.$emit("load"))}},clickErrorText:function(){this.$emit("update:error",!1),this.$nextTick(this.check)}},render:function(e){var t=e("div",{ref:"placeholder",class:r("placeholder")});return e("div",{class:r(),attrs:{role:"feed","aria-busy":this.loading}},["down"===this.direction?this.slots():t,this.loading&&e("div",{class:r("loading"),key:"loading"},[this.slots("loading")||e(n["a"],{attrs:{size:"16"}},[this.loadingText||d("loading")])]),this.finished&&this.finishedText&&e("div",{class:r("finished-text")},[this.finishedText]),this.error&&this.errorText&&e("div",{on:{click:this.clickErrorText},class:r("error-text")},[this.errorText]),"up"===this.direction?this.slots():t])}})},"705e":function(e,t,i){"use strict";i.r(t);var a,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"plan-wrap"},[i("div",{ref:"vanSwiperWwrap",staticClass:"van-swipe-wrap"},e._l(e.plan_list,function(t,a){return i("div",{key:a},["0"===a?i("div",{staticClass:"plan-type-name"},[e._v(e._s(e.plan_type_name[0]))]):e._e(),"1"===a?i("div",{staticClass:"plan-type-name"},[e._v(e._s(e.plan_type_name[1]))]):e._e(),"100"===a&&e.plan_list[100]?i("div",{staticClass:"plan-type-name"},[e._v(e._s("加油包"))]):e._e(),"5"===a?i("div",{staticClass:"plan-type-name"},[e._v(e._s(e.plan_type_name[5]))]):e._e(),"6"===a?i("div",{staticClass:"plan-type-name"},[e._v(e._s(e.plan_type_name[6]))]):e._e(),i("div",{staticClass:"planContent"},[e._l(t,function(t,n){return i("div",{key:n,class:{activedPlan:t.id==e.choose_plan_index,"plan-sell-done":"False"!=t.surplus_times&&t.surplus_times<=0},on:{click:function(i){e.choosePlanClick(t.id,a)}}},[i("el-popover",{attrs:{placement:"bottom",content:t.describe?t.describe:t.remark?t.remark:"",value:t.id==e.choose_plan_index&&e.firstStatus}},[i("div",{staticClass:"centerBox",attrs:{slot:"reference"},slot:"reference"},[i("div",{staticClass:"contentWord1"},[e._v(e._s(t.name))]),i("div",{staticClass:"contentWord2"}),i("div",{staticClass:"contentWord3"},[i("p",[e._v("￥"+e._s(t.price))]),i("del",[e._v("￥"+e._s(t.market_price))])]),i("p",{staticClass:"plan-name",class:{"plan-icon-recommend":t.is_recommend}},[t.is_recommend?i("span",{staticClass:"iconfont icon-recommend"}):e._e()]),t.image_url?i("div",{staticClass:"gift"},[i("img",{attrs:{src:t.image_url,alt:""}})]):e._e()])])],1)}),"100"===a&&e.plan_list[100]?i("div",{staticClass:"warning-wrapper"},[i("p",[e._v("加油包暂不支持退款请慎重选择")]),i("p",[e._v("加油包有效期和指定套餐有效期相同")]),i("p",[e._v("月套餐充值加油包仅当月有效")]),i("p",[e._v("加油包需充值到指定套餐中方可使用")])]):e._e()],2)])})),i("div",{ref:"refPlanButton",staticClass:"btn-recharge-wrap",class:{noDataHide:e.load_plan_list}},[i("button",{on:{click:e.recharge}},[e._v(e._s(e.recharge_btn_text))]),i("a",{on:{click:function(t){e.toCard()}}},[e._v("卡券兑换")])]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.load_plan_list,callback:function(t){e.load_plan_list=t},expression:"load_plan_list"}},[i("p",{staticClass:"showTip"},[e._v(e._s(e.load_plan_msg))])]),i("div",{directives:[{name:"show",rawName:"v-show",value:""==e.load_plan_msg,expression:"load_plan_msg==''"}],staticClass:"fixed-wrap-loading"},[e._m(0)]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.rechargeShow,callback:function(t){e.rechargeShow=t},expression:"rechargeShow"}},[i("p",{staticClass:"showTip"},[e._v("创建订单中,请等候")])])],1)},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"loading-common-center"}},[i("div",{attrs:{id:"loading-common-center-inner"}},[i("div",{staticClass:"loading-object",attrs:{id:"first_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"second_object"}}),i("div",{staticClass:"loading-object",attrs:{id:"third_object"}})])])}],o=(i("9a83"),i("f564")),c=(i("6b54"),i("55dd"),i("a322")),l=(i("e17f"),i("2241")),r=(i("2994"),i("2bdd")),d=(i("8a58"),i("e41f")),p=(i("7f7f"),i("e7e5"),i("d399")),u=i("c93e"),h=i("2f62"),_=i("35df"),f=i("db04"),m={name:"home",computed:Object(u["a"])({},Object(h["b"])({authorizedUserInfo:function(e){return e.userInfo.userInfoInner}})),data:function(){return{client_type:Object(_["d"])(),load_plan_list:!1,load_plan_msg:"",recharge_btn_text:"充值",plan_type:[],plan_type_name:{0:"累计套餐",1:"月套餐",2:"加油包",5:"周期性套餐",6:"超量自动续费套餐"},cur_plan_type_index:0,choose_plan_index:0,plan_list:{},hasValidatedPlan:Object(_["j"])("hasValidatedPlan"),rechargeShow:!1,ref_plan_type_index:0,firstStatus:!1,realnameType:Object(_["j"])("realnameType")}},components:(a={},Object(c["a"])(a,p["a"].name,p["a"]),Object(c["a"])(a,d["a"].name,d["a"]),Object(c["a"])(a,r["a"].name,r["a"]),Object(c["a"])(a,l["a"].name,l["a"]),a),created:function(){var e=this;"1"===Object(_["j"])("plan_list_new_card")&&Object(_["m"])({type:4,iccid:Object(_["j"])("check_iccid")});var t=this;Object(f["a"])("/api/v1/app/plan_list",{iccid:Object(_["j"])("check_iccid")}).then(function(i){if(1===i.state){if("{}"===JSON.stringify(i.data)||0===i.data.length)return e.load_plan_list=!0,void(e.load_plan_msg="此卡暂无充值套餐，请联系客服人员及时处理");for(var a in e.load_plan_msg=i.msg,e.load_plan_list=!1,e.plan_list=i.data,e.plan_list){for(var n=[],s=[],o=[],c=0;c<e.plan_list[a].length;c++)!0===e.plan_list[a][c].is_recommend?n.push(e.plan_list[a][c]):s.push(e.plan_list[a][c]);n.sort(e.compare2("price")),s.sort(e.compare2("price")),o=n.concat(s),e.plan_list[a]=o,e.plan_type.push(a)}if(e.hasValidatedPlan){var l=e.plan_list[2]||[];l.length&&(delete e.plan_list[2],e.plan_list[100]=l)}else e.plan_list[2]=null;for(var r in e.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,i=e.$refs.refPlanButton.offsetHeight,a=Object(_["j"])("userHeight")||44;"iphone"==e.global_variables.device&&"app"==e.client_type?e.$refs.vanSwiperWwrap.style.height=t-i-a-49+"px":("wechat"===e.client_type||e.client_type,e.$refs.vanSwiperWwrap.style.height=t-i-a+"px")}),setTimeout(function(){t.firstStatus=!0},100),i.data)if(i.data[r]||"undefined"===typeof i.data[r]||0===i.data[r])return e.choose_plan_index=i.data[r][0].id,e.ref_plan_type_index=r,e.choose_plan_index}else e.load_plan_list=!0,e.load_plan_msg=i.msg})},mounted:function(){},methods:{choosePlanClick:function(e,t){this.ref_plan_type_index=t,this.choose_plan_index=e,this.recharge_btn_text="2"===t?"选择叠加加油包套餐":"充值"},recharge:function(){for(var e=this,t=null,i=0;i<this.plan_list[this.ref_plan_type_index].length;i++)this.choose_plan_index==this.plan_list[this.ref_plan_type_index][i].id&&(t=this.plan_list[this.ref_plan_type_index][i]);t.surplus_times<=0?Object(p["a"])("此套餐已售罄, 请更换套餐"):(t.iccid=Object(_["j"])("check_iccid"),Object(_["p"])("planInfo",t,"obj"),"100"!==this.ref_plan_type_index?"1"!==this.realnameType?(Object(_["c"])(3),Object(f["a"])("/api/v1/app/plans/renew_info",{user_id:Object(_["j"])("userInfo","obj").account.user_id,rating_id:t.id}).then(function(t){1===t.state?(Object(_["p"])("monthlyMsg",t.data,"obj"),e.$router.push({path:"/weixin/recharge/index",query:{type:e.$route.query.type}})):Object(p["a"])({position:"top",message:t.msg})})):this.directRecharge(t):this.$router.push("/weixin/card/more_flow"))},directRecharge:function(e){var t=this;if(this.authorizedUserInfo.account.user_id){var i={status:this.authorizedUserInfo.account.balance>0?1:0,recharge_price:e.price,price:e.price,iccid:e.iccid||Object(_["j"])("check_iccid"),rating_id:e.id,user_id:Object(_["j"])("userInfo","obj").account.user_id,env:this.client_type,start_time:Object(_["b"])(),type:0,recharge_type:"mifi"===this.global_variables.packed_project?1:0,success_page:"".concat(window.location.protocol,"//").concat(window.location.host,"/weixin/recharge/callback"),failed_page:window.location.href};"alipay"!==this.client_type&&"wechat"!==this.client_type||(i.open_id=(Object(_["j"])("decrypt_data","obj")||{}).openid),"wechat"===this.client_type&&(i.pay_type="WEIXIN"),"alipay"===this.client_type&&(i.pay_type="ALIPAY"),"app"===this.client_type&&(i.open_id=this.authorizedUserInfo.account.user_id,this.appPay.type?i.pay_type="WEIXIN":i.pay_type="ALIPAY"),l["a"].confirm({title:"充值",message:"是否确认充值'".concat(e.name,"'?")}).then(function(){t.finalRecharge(i)}).catch(function(){})}else Object(p["a"])({position:"top",message:"请在微信或支付宝客户端充值"})},finalRecharge:function(e){var t=this;this.rechargeShow=!0;var i=document.querySelector("form");i&&document.removeChild(i);var a=this;Object(f["b"])("/api/v1/pay/weixin/create",e).then(function(e){if(1===e.state){if(t.rechargeShow=!1,/<[^>]+>/.test(e.data)){var i=document.createElement("div");i.innerHTML=e.data,document.body.appendChild(i),document.forms[0].submit()}e.data&&"[object String]"===Object.prototype.toString.call(e.data)&&"http"===e.data.substr(0,4)?"mifi"===t.global_variables.packed_project?location.href="".concat(t.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data:(Object(o["a"])({message:"创建订单成功",background:"#60ce53"}),setTimeout(function(){"esim"===localStorage.getItem("currentType")?location.href="".concat(a.global_variables.authorized_redirect_url,"/weixin/card/esim_usage"):"mifi"===a.global_variables.packed_project?location.href="".concat(a.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=e.data.return_url},1500))}else t.rechargeShow=!1,Object(o["a"])({message:e.msg})})},compare:function(e){return function(t){var i=t[e];return 1==i?-1:0==i?1:0}},compare2:function(e){return function(t,i){var a=t[e],n=i[e];return a>n?1:a<n?-1:0}},toCard:function(){Object(_["c"])(14),this.$router.push({path:"/weixin/coupon/index"})}}},v=m,g=(i("b004"),i("2877")),b=Object(g["a"])(v,n,s,!1,null,null,null);b.options.__file="plan_list.vue";t["default"]=b.exports},b004:function(e,t,i){"use strict";var a=i("1d44"),n=i.n(a);n.a},b258:function(e,t,i){},c0c2:function(e,t,i){},d399:function(e,t,i){"use strict";var a=i("1988"),n=i("2b0e"),s=i("d282"),o=i("a142"),c=i("6605"),l=i("ad06"),r=i("543e"),d=Object(s["a"])("toast"),p=d[0],u=d[1],h=p({mixins:[c["a"]],props:{icon:String,className:null,loadingType:String,forbidClick:Boolean,message:[String,Number],type:{type:String,default:"text"},position:{type:String,default:"middle"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:function(){this.toggleClickable()},forbidClick:function(){this.toggleClickable()}},methods:{toggleClickable:function(){var e=this.value&&this.forbidClick;if(this.clickable!==e){this.clickable=e;var t=e?"add":"remove";document.body.classList[t]("van-toast--unclickable")}},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")}},render:function(e){var t=this.type,i=this.icon,a=this.message,n=this.loadingType,s=i||"success"===t||"fail"===t;function c(){return s?e(l["a"],{class:u("icon"),attrs:{name:i||t}}):"loading"===t?e(r["a"],{class:u("loading"),attrs:{color:"white",type:n}}):void 0}function d(){if(Object(o["b"])(a)&&""!==a)return"html"===t?e("div",{class:u("text"),domProps:{innerHTML:a}}):e("div",{class:u("text")},[a])}return e("transition",{attrs:{name:"van-fade"},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[e("div",{directives:[{name:"show",value:this.value}],class:[u([this.position,{text:!s&&"loading"!==t}]),this.className]},[c(),d()])])}}),_={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",onClose:null,onOpened:null,duration:3e3,position:"middle",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null},f=[],m=!1,v=Object(a["a"])({},_);function g(e){return Object(o["c"])(e)?e:{message:e}}function b(){if(o["d"])return{};if(!f.length||m){var e=new(n["default"].extend(h))({el:document.createElement("div")});f.push(e)}return f[f.length-1]}function y(e){return e=Object(a["a"])({},e),e.overlay=e.mask,delete e.mask,delete e.duration,e}function j(e){void 0===e&&(e={});var t=b();return t.value&&t.updateZIndex(),e=Object(a["a"])({},v,g(e),{clear:function(){t.value=!1,e.onClose&&e.onClose(),m&&!o["d"]&&t.$on("closed",function(){clearTimeout(t.timer),f=f.filter(function(e){return e!==t});var e=t.$el.parentNode;e&&e.removeChild(t.$el),t.$destroy()})}}),Object(a["a"])(t,y(e)),clearTimeout(t.timer),e.duration>0&&(t.timer=setTimeout(function(){t.clear()},e.duration)),t}var x=function(e){return function(t){return j(Object(a["a"])({type:e},g(t)))}};["loading","success","fail"].forEach(function(e){j[e]=x(e)}),j.clear=function(e){f.length&&(e?(f.forEach(function(e){e.clear()}),f=[]):m?f.shift().clear():f[0].clear())},j.setDefaultOptions=function(e){Object(a["a"])(v,e)},j.resetDefaultOptions=function(){v=Object(a["a"])({},_)},j.allowMultiple=function(e){void 0===e&&(e=!0),m=e},j.install=function(){n["default"].use(h)},n["default"].prototype.$toast=j;t["a"]=j},e7e5:function(e,t,i){"use strict";i("68ef"),i("4d75"),i("09fe"),i("b258")}}]);
//# sourceMappingURL=plan_list.bf63a65d.js.map