(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orderRecord"],{"0774":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"orderRecord",style:{height:t.bodyHeight+"px"}},[i("div",{staticClass:"search"},[i("form",{attrs:{action:"/"}},[i("van-search",{attrs:{placeholder:"请输入要查询的手表手机号",shape:"round"},on:{search:t.onSearch,cancel:t.onCancel,clear:t.onSearch},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}},[i("div",{attrs:{slot:"left-icon"},slot:"left-icon"})]),i("b",{on:{click:t.onSearch}})],1)]),t.finished?i("div",{staticClass:"tab"},[i("ul",t._l(t.tabList,function(e,n){return i("li",{key:n,class:{active:t.currentType==n},on:{click:function(e){t.getCurrentType(n)}}},[t._v(t._s(e)+"\n      ")])}))]):t._e(),i("div",{staticClass:"recordList"},[i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.getList},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,function(e,n){return i("div",{key:n},[i("div",{staticClass:"orderContent"},[i("div",[i("div",{staticClass:"planMsg"},[i("div",[t._v("¥"+t._s(e.price))]),i("div",[t._v(t._s(e.rating_name))])]),i("div",{staticClass:"planDetails"},[i("div",[i("div",[t._v("订单编号:"+t._s(e.no))]),0==e.refund&&0==e.status?i("div",[t._v("未支付")]):t._e(),0==e.refund&&1==e.status?i("div",[t._v("已支付")]):t._e(),0==e.refund&&2==e.status?i("div",{staticClass:"rcved"},[t._v("已到账")]):t._e(),2==e.refund?i("div",{staticClass:"refunded"},[t._v("已退款")]):t._e(),1==e.refund?i("div",[t._v("退款中")]):t._e()]),i("div",[t._v(t._s(e.rate_plan.describe))])])]),i("div",{staticClass:"planTime"},[i("div",[t._v("下单时间："+t._s(e.paid_at))]),0==e.refund&&1==e.status||0==e.refund&&2==e.status?i("div",{on:{click:function(i){t.showMe(e.id)}}},[t._v("申请退款\n            ")]):t._e()]),i("div",{staticClass:"phoneNo"},[i("div",[t._v("手表手机号:"+t._s(e.msisdn[0]))])])])])}))],1),i("van-dialog",{attrs:{title:"退款原因","show-cancel-button":"","confirm-button-text":"确认退款","cancel-button-text":"暂不退款","before-close":t.cfmRefund},model:{value:t.showRefund,callback:function(e){t.showRefund=e},expression:"showRefund"}},[i("div",[i("van-field",{attrs:{label:"设备品牌：",type:"textarea",placeholder:"请输入设备品牌",rows:"1",autosize:""},model:{value:t.refundInfo.brand,callback:function(e){t.$set(t.refundInfo,"brand",e)},expression:"refundInfo.brand"}}),i("van-field",{attrs:{label:"设备型号：",type:"textarea",placeholder:"请输入设备型号",rows:"1",autosize:""},model:{value:t.refundInfo.model,callback:function(e){t.$set(t.refundInfo,"model",e)},expression:"refundInfo.model"}}),i("van-field",{attrs:{label:"使用地址：",type:"textarea",placeholder:"请输入使用地址",rows:"1",autosize:""},model:{value:t.refundInfo.address,callback:function(e){t.$set(t.refundInfo,"address",e)},expression:"refundInfo.address"}}),i("van-field",{attrs:{label:"退款原因：",type:"textarea",placeholder:"请输入退款原因",rows:"1",autosize:""},model:{value:t.refundInfo.reason,callback:function(e){t.$set(t.refundInfo,"reason",e)},expression:"refundInfo.reason"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:t.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝账号：",type:"textarea",placeholder:"请输入支付宝账号",rows:"1",autosize:""},model:{value:t.refundInfo.aliAccount,callback:function(e){t.$set(t.refundInfo,"aliAccount",e)},expression:"refundInfo.aliAccount"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:t.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝姓名：",type:"textarea",placeholder:"请输入支付宝姓名",rows:"1",autosize:""},model:{value:t.refundInfo.aliName,callback:function(e){t.$set(t.refundInfo,"aliName",e)},expression:"refundInfo.aliName"}})],1)])],1)},s=[],r=(i("a481"),i("9a83"),i("f564")),a=(i("ac6a"),i("c93e")),o=(i("4467"),i("c36e")),c=(i("68ef"),i("09fe"),i("1146"),i("2638")),l=i.n(c),u=i("1988"),d=i("ad06"),h=i("7744"),f=i("dfaf"),b=i("1325"),v=i("a8c1"),p=i("d282"),g=i("a142"),m=i("ea8e");function k(){return!g["d"]&&/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())}var y=Object(p["a"])("field"),w=y[0],I=y[1],O=w({inheritAttrs:!1,props:Object(u["a"])({},f["a"],{error:Boolean,leftIcon:String,rightIcon:String,readonly:Boolean,clearable:Boolean,labelWidth:[String,Number],labelClass:null,labelAlign:String,inputAlign:String,autosize:[Boolean,Object],errorMessage:String,errorMessageAlign:String,type:{type:String,default:"text"}}),data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&Object(g["b"])(this.value)&&!this.readonly},listeners:function(){var t=Object(u["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur});return delete t.click,t},labelStyle:function(){var t=this.labelWidth;if(t)return{width:Object(m["a"])(t)}}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(t){if(void 0===t&&(t=this.$refs.input),t){var e=t,i=e.value,n=this.$attrs.maxlength;return"number"===this.type&&Object(g["b"])(n)&&i.length>n&&(i=i.slice(0,n),t.value=i),i}},onInput:function(t){t.target.composing||this.$emit("input",this.format(t.target))},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.$emit("blur",t),k()&&window.scrollTo(0,Object(v["b"])())},onClick:function(t){this.$emit("click",t)},onClickLeftIcon:function(){this.$emit("click-left-icon")},onClickRightIcon:function(){this.$emit("click-right-icon")},onClear:function(t){Object(b["c"])(t),this.$emit("input",""),this.$emit("clear")},onKeypress:function(t){if("number"===this.type){var e=t.keyCode,i=-1===String(this.value).indexOf("."),n=e>=48&&e<=57||46===e&&i||45===e;n||Object(b["c"])(t)}"search"===this.type&&13===t.keyCode&&this.blur(),this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(g["c"])(this.autosize)){var i=this.autosize,n=i.maxHeight,s=i.minHeight;n&&(e=Math.min(e,n)),s&&(e=Math.max(e,s))}e&&(t.style.height=e+"px")}},renderInput:function(){var t=this.$createElement,e=this.slots("input");if(e)return t("div",{class:I("control",this.inputAlign)},[e]);var i={ref:"input",class:I("control",this.inputAlign),domProps:{value:this.value},attrs:Object(u["a"])({},this.$attrs,{readonly:this.readonly}),on:this.listeners,directives:[{name:"model",value:this.value}]};return"textarea"===this.type?t("textarea",l()([{},i])):t("input",l()([{attrs:{type:this.type}},i]))},renderLeftIcon:function(){var t=this.$createElement,e=this.slots("left-icon")||this.leftIcon;if(e)return t("div",{class:I("left-icon"),on:{click:this.onClickLeftIcon}},[this.slots("left-icon")||t(d["a"],{attrs:{name:this.leftIcon}})])},renderRightIcon:function(){var t=this.$createElement,e=this.slots,i=e("right-icon")||this.rightIcon;if(i)return t("div",{class:I("right-icon"),on:{click:this.onClickRightIcon}},[e("right-icon")||t(d["a"],{attrs:{name:this.rightIcon}})])}},render:function(t){var e,i=this.slots,n=this.labelAlign,s={icon:this.renderLeftIcon};return i("label")&&(s.title=function(){return i("label")}),t(h["a"],{attrs:{icon:this.leftIcon,size:this.size,title:this.label,center:this.center,border:this.border,isLink:this.isLink,required:this.required,clickable:this.clickable,titleStyle:this.labelStyle,titleClass:[I("label",n),this.labelClass],arrowDirection:this.arrowDirection},class:I((e={error:this.error,disabled:this.$attrs.disabled},e["label-"+n]=n,e["min-height"]="textarea"===this.type&&!this.autosize,e)),scopedSlots:s,on:{click:this.onClick}},[t("div",{class:I("body")},[this.renderInput(),this.showClear&&t(d["a"],{attrs:{name:"clear"},class:I("clear"),on:{touchstart:this.onClear}}),this.renderRightIcon(),i("button")&&t("div",{class:I("button")},[i("button")])]),this.errorMessage&&t("div",{class:I("error-message",this.errorMessageAlign)},[this.errorMessage])])}}),j=(i("c194"),i("2994"),i("2bdd")),x=(i("f032"),i("ba31")),C=Object(p["a"])("search"),S=C[0],_=C[1],$=C[2];function L(t,e,i,n){function s(){if(i.label||e.label)return t("div",{class:_("label")},[i.label?i.label():e.label])}function r(){if(e.showAction)return t("div",{class:_("action")},[i.action?i.action():t("div",{on:{click:s}},[$("cancel")])]);function s(){Object(x["a"])(n,"input",""),Object(x["a"])(n,"cancel")}}var a={attrs:n.data.attrs,on:Object(u["a"])({},n.listeners,{input:function(t){Object(x["a"])(n,"input",t)},keypress:function(t){13===t.keyCode&&(Object(b["c"])(t),Object(x["a"])(n,"search",e.value)),Object(x["a"])(n,"keypress",t)}})},o=Object(x["b"])(n);return delete o.attrs,t("div",l()([{class:_({"show-action":e.showAction}),style:{background:e.background}},o]),[t("div",{class:_("content",e.shape)},[s(),t(O,l()([{attrs:{type:"search",border:!1,value:e.value,leftIcon:e.leftIcon,rightIcon:e.rightIcon,clearable:e.clearable},scopedSlots:{"left-icon":i["left-icon"],"right-icon":i["right-icon"]}},a]))]),r()])}L.props={value:String,label:String,rightIcon:String,showAction:Boolean,shape:{type:String,default:"square"},clearable:{type:Boolean,default:!0},background:{type:String,default:"#fff"},leftIcon:{type:String,default:"search"}};var T=S(L),A=i("35df"),B=i("db04"),R=i("2f62"),z={data:function(){return{searchValue:"",bodyHeight:"",tabList:["全部","已支付","已到账","已退款"],currentType:0,list:[],savedList:[],loading:!1,finished:!1,showRefund:!1,message:"",currentId:"",isShowAccount:!1,refundInfo:{brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}}},components:{"van-search":T,"van-list":j["a"],"van-cell":h["a"],"van-field":O,"van-cell-group":o["a"]},computed:Object(a["a"])({},Object(R["b"])({authorizedUserInfo:function(t){return t.userInfo.userInfoInner}})),created:function(){3==Object(A["j"])("refundPayType")&&(this.isShowAccount=!0)},mounted:function(){this.bodyHeight=document.documentElement.clientHeight},methods:{onSearch:function(){var t=this,e=[];""!=this.searchValue?(0==this.list.length&&this.getCurrentList(this.currentType),this.list.forEach(function(i){-1!=i.msisdn[0].indexOf(t.searchValue)&&e.push(i)}),0==e.length?this.list=[]:this.list=e):this.getCurrentList(this.currentType)},onCancel:function(){},getCurrentType:function(t){this.currentType=t,this.getCurrentList(t)},getList:function(){var t=this;Object(B["a"])("/api/v1/app/order/status",{recharge_type:0,user_id:Object(A["j"])("userInfo","obj").account.user_id}).then(function(e){1==e.state?(t.list=e.data[0],t.savedList=e.data[0]):Object(r["a"])({message:e.msg}),t.loading=!1,t.finished=!0})},getCurrentList:function(t){if(0==t)this.list=this.savedList;else if(1==t){var e=[];this.savedList.forEach(function(t){1==t.status&&e.push(t)}),this.list=e}else if(2==t){var i=[];this.savedList.forEach(function(t){2==t.status&&i.push(t)}),this.list=i}else if(3==t){var n=[];this.savedList.forEach(function(t){2==t.refund&&n.push(t)}),this.list=n}else this.list=[]},showMe:function(t){this.showRefund=!0,this.currentId=t,this.refundInfo={brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}},cfmRefund:function(t,e){var i=this;if("confirm"===t){if(!this.refundInfo.brand)return Object(r["a"])({message:"请填写设备品牌"}),void e(!1);if(!this.refundInfo.model)return Object(r["a"])({message:"请填写设备型号"}),void e(!1);if(!this.refundInfo.address)return Object(r["a"])({message:"请填写设备使用地址"}),void e(!1);if(!this.refundInfo.reason)return Object(r["a"])({message:"请填写退款理由"}),void e(!1);if(this.isShowAccount){if(!this.refundInfo.aliAccount)return Object(r["a"])({message:"请填写支付宝账号"}),void e(!1);if(!this.refundInfo.aliName)return Object(r["a"])({message:"请填写支付宝实名验证真实姓名"}),void e(!1)}for(var n in this.refundInfo)this.refundInfo[n]=this.refundInfo[n].replace(/\ +/g,""),this.refundInfo[n]=this.refundInfo[n].replace(/[\r\n]/g,"");Object(B["b"])("/api/v1/app/cards/refund",{order_id:this.currentId,device_brand:this.refundInfo.brand,device_model:this.refundInfo.model,use_address:this.refundInfo.address,refund_reason:this.refundInfo.reason,refund_account:this.refundInfo.aliAccount,refund_account_name:this.refundInfo.aliName,user_id:this.authorizedUserInfo.account.user_id}).then(function(t){1==t.state?(Object(r["a"])({message:"退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候",background:"#60ce53"}),e(),i.currentType=0,i.getList()):(Object(r["a"])({message:t.msg}),i.currentType=0,i.getList(),e())})}else e()}}},M=z,N=(i("ba4a"),i("2877")),W=Object(N["a"])(M,n,s,!1,null,null,null);W.options.__file="orderRecord.vue";e["default"]=W.exports},1146:function(t,e,i){},2221:function(t,e,i){},2994:function(t,e,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(t,e,i){"use strict";var n=i("d282"),s=i("543e"),r=i("5fbe"),a=i("a8c1"),o=Object(n["a"])("list"),c=o[0],l=o[1],u=o[2];e["a"]=c({mixins:[Object(r["a"])(function(t){this.scroller||(this.scroller=Object(a["c"])(this.$el)),t(this.scroller,"scroll",this.check)})],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300},direction:{type:String,default:"down"}},mounted:function(){this.immediateCheck&&this.$nextTick(this.check)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!(this.loading||this.finished||this.error)){var t,e=this.$el,i=this.scroller,n=this.offset,s=this.direction;t=i.getBoundingClientRect?i.getBoundingClientRect():{top:0,bottom:i.innerHeight};var r=t.bottom-t.top;if(!r||"none"===window.getComputedStyle(e).display||null===e.offsetParent)return!1;var a=!1,o=this.$refs.placeholder.getBoundingClientRect();a="up"===s?o.top-t.top<=n:o.bottom-t.bottom<=n,a&&(this.$emit("input",!0),this.$emit("load"))}},clickErrorText:function(){this.$emit("update:error",!1),this.$nextTick(this.check)}},render:function(t){var e=t("div",{ref:"placeholder",class:l("placeholder")});return t("div",{class:l(),attrs:{role:"feed","aria-busy":this.loading}},["down"===this.direction?this.slots():e,this.loading&&t("div",{class:l("loading"),key:"loading"},[this.slots("loading")||t(s["a"],{attrs:{size:"16"}},[this.loadingText||u("loading")])]),this.finished&&this.finishedText&&t("div",{class:l("finished-text")},[this.finishedText]),this.error&&this.errorText&&t("div",{on:{click:this.clickErrorText},class:l("error-text")},[this.errorText]),"up"===this.direction?this.slots():e])}})},4467:function(t,e,i){"use strict";i("68ef"),i("2221")},"482d":function(t,e,i){"use strict";function n(t,e,i){return Math.min(Math.max(t,e),i)}i.d(e,"a",function(){return n})},"61c0":function(t,e,i){},7744:function(t,e,i){"use strict";var n=i("1988"),s=i("2638"),r=i.n(s),a=i("d282"),o=i("a142"),c=i("dfaf"),l=i("ba31"),u=i("48f4"),d=i("ad06"),h=Object(a["a"])("cell"),f=h[0],b=h[1];function v(t,e,i,n){var s=e.icon,a=e.size,c=e.title,h=e.label,f=e.value,v=e.isLink,p=e.arrowDirection,g=i.title||Object(o["b"])(c),m=i.default||Object(o["b"])(f),k=i.label||Object(o["b"])(h),y=k&&t("div",{class:[b("label"),e.labelClass]},[i.label?i.label():h]),w=g&&t("div",{class:[b("title"),e.titleClass],style:e.titleStyle},[i.title?i.title():t("span",[c]),y]),I=m&&t("div",{class:[b("value",{alone:!i.title&&!c}),e.valueClass]},[i.default?i.default():t("span",[f])]),O=i.icon?i.icon():s&&t(d["a"],{class:b("left-icon"),attrs:{name:s}}),j=i["right-icon"],x=j?j():v&&t(d["a"],{class:b("right-icon"),attrs:{name:p?"arrow-"+p:"arrow"}});function C(t){Object(l["a"])(n,"click",t),Object(u["a"])(n)}var S={center:e.center,required:e.required,borderless:!e.border,clickable:v||e.clickable};return a&&(S[a]=a),t("div",r()([{class:b(S),on:{click:C}},Object(l["b"])(n)]),[O,w,I,x,i.extra&&i.extra()])}v.props=Object(n["a"])({},c["a"],u["b"]),e["a"]=f(v)},a481:function(t,e,i){i("214f")("replace",2,function(t,e,i){return[function(n,s){"use strict";var r=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,r,s):i.call(String(r),n,s)},i]})},ba4a:function(t,e,i){"use strict";var n=i("61c0"),s=i.n(n);s.a},c0c2:function(t,e,i){},c194:function(t,e,i){"use strict";i("68ef"),i("09fe")},c36e:function(t,e,i){"use strict";var n=i("d282"),s=i("482d"),r=i("1325"),a=i("3875"),o=i("2b0e"),c=function(t){return o["default"].extend({data:function(){var e=this,i=function(i){e.$el.contains(i.target)||e[t.method]()};return{clickOutsideHandler:i}},mounted:function(){Object(r["b"])(document,t.event,this.clickOutsideHandler)},beforeDestroy:function(){Object(r["a"])(document,t.event,this.clickOutsideHandler)}})},l=Object(n["a"])("swipe-cell"),u=l[0],d=l[1],h=.15;e["a"]=u({mixins:[a["a"],c({event:"touchstart",method:"onClick"})],props:{onClose:Function,disabled:Boolean,leftWidth:Number,rightWidth:Number,name:{type:[String,Number],default:""}},data:function(){return{offset:0,dragging:!1}},computed:{computedLeftWidth:function(){return this.leftWidth||this.getWidthByRef("left")},computedRightWidth:function(){return this.rightWidth||this.getWidthByRef("right")}},methods:{getWidthByRef:function(t){if(this.$refs[t]){var e=this.$refs[t].getBoundingClientRect();return e.width}return 0},open:function(t){var e="left"===t?this.computedLeftWidth:-this.computedRightWidth;this.swipeMove(e),this.resetSwipeStatus()},close:function(){this.offset=0},resetSwipeStatus:function(){this.swiping=!1,this.opened=!0},swipeMove:function(t){void 0===t&&(t=0),this.offset=Object(s["a"])(t,-this.computedRightWidth,this.computedLeftWidth),this.offset?this.swiping=!0:this.opened=!1},swipeLeaveTransition:function(t){var e=this.offset,i=this.computedLeftWidth,n=this.computedRightWidth,s=this.opened?1-h:h;"right"===t&&-e>n*s&&n>0?this.open("right"):"left"===t&&e>i*s&&i>0?this.open("left"):this.swipeMove(0)},startDrag:function(t){this.disabled||(this.dragging=!0,this.startOffset=this.offset,this.touchStart(t))},onDrag:function(t){this.disabled||(this.touchMove(t),"horizontal"===this.direction&&(Object(r["c"])(t),this.swipeMove(this.deltaX+this.startOffset)))},endDrag:function(){this.disabled||(this.dragging=!1,this.swiping&&this.swipeLeaveTransition(this.offset>0?"left":"right"))},onClick:function(t){void 0===t&&(t="outside"),this.$emit("click",t),this.offset&&(this.onClose?this.onClose(t,this,{name:this.name}):this.swipeMove(0))}},render:function(t){var e=this,i=function(t,i){return function(n){i&&n.stopPropagation(),e.onClick(t)}},n={transform:"translate3d("+this.offset+"px, 0, 0)",transition:this.dragging?"none":".6s cubic-bezier(0.18, 0.89, 0.32, 1)"};return t("div",{class:d(),on:{click:i("cell"),touchstart:this.startDrag,touchmove:this.onDrag,touchend:this.endDrag,touchcancel:this.endDrag}},[t("div",{class:d("wrapper"),style:n,on:{transitionend:function(){e.swiping=!1}}},[this.slots("left")&&t("div",{ref:"left",class:d("left"),on:{click:i("left",!0)}},[this.slots("left")]),this.slots(),this.slots("right")&&t("div",{ref:"right",class:d("right"),on:{click:i("right",!0)}},[this.slots("right")])])])}})},dfaf:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[String,Number],value:[String,Number],label:[String,Number],arrowDirection:String,border:{type:Boolean,default:!0}}},f032:function(t,e,i){}}]);
//# sourceMappingURL=orderRecord.13024e6d.js.map