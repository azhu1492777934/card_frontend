(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orderRecord"],{"0774":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"orderRecord",style:{height:t.bodyHeight+"px"}},[i("div",{staticClass:"search"},[i("form",{attrs:{action:"/"}},[i("van-search",{attrs:{placeholder:"请输入要查询的手表手机号",shape:"round"},on:{search:t.onSearch,cancel:t.onCancel,clear:t.onSearch},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}},[i("div",{attrs:{slot:"left-icon"},slot:"left-icon"})]),i("b",{on:{click:t.onSearch}})],1)]),t.finished?i("div",{staticClass:"tab"},[i("ul",t._l(t.tabList,function(e,n){return i("li",{key:n,class:{active:t.currentType==n},on:{click:function(e){t.getCurrentType(n)}}},[t._v(t._s(e))])}))]):t._e(),i("div",{staticClass:"recordList"},[i("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.getList},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,function(e,n){return i("div",{key:n},[i("div",{staticClass:"orderContent"},[i("div",[i("div",{staticClass:"planMsg"},[i("div",[t._v("¥"+t._s(e.price))]),i("div",[t._v(t._s(e.rating_name))])]),i("div",{staticClass:"planDetails"},[i("div",[i("div",[t._v("订单编号:"+t._s(e.no))]),0==e.refund&&0==e.status?i("div",[t._v("未支付")]):t._e(),0==e.refund&&1==e.status?i("div",[t._v("已支付")]):t._e(),0==e.refund&&2==e.status?i("div",{staticClass:"rcved"},[t._v("已到账")]):t._e(),2==e.refund?i("div",{staticClass:"refunded"},[t._v("已退款")]):t._e(),1==e.refund?i("div",[t._v("退款中")]):t._e()]),i("div",[t._v(t._s(e.rate_plan.describe))])])]),i("div",{staticClass:"planTime"},[i("div",[t._v("下单时间："+t._s(e.paid_at))]),0==e.refund&&1==e.status||0==e.refund&&2==e.status?i("div",{on:{click:function(i){t.showMe(e.id)}}},[t._v("申请退款")]):t._e()]),i("div",{staticClass:"phoneNo"},[i("div",[t._v("手表手机号:"+t._s(e.msisdn[0]))])])])])}))],1),i("van-dialog",{attrs:{title:"退款原因","show-cancel-button":"","confirm-button-text":"确认退款","cancel-button-text":"暂不退款","before-close":t.cfmRefund},model:{value:t.showRefund,callback:function(e){t.showRefund=e},expression:"showRefund"}},[i("div",[i("van-field",{attrs:{label:"设备品牌：",type:"textarea",placeholder:"请输入设备品牌",rows:"1",autosize:""},model:{value:t.refundInfo.brand,callback:function(e){t.$set(t.refundInfo,"brand",e)},expression:"refundInfo.brand"}}),i("van-field",{attrs:{label:"设备型号：",type:"textarea",placeholder:"请输入设备型号",rows:"1",autosize:""},model:{value:t.refundInfo.model,callback:function(e){t.$set(t.refundInfo,"model",e)},expression:"refundInfo.model"}}),i("van-field",{attrs:{label:"使用地址：",type:"textarea",placeholder:"请输入使用地址",rows:"1",autosize:""},model:{value:t.refundInfo.address,callback:function(e){t.$set(t.refundInfo,"address",e)},expression:"refundInfo.address"}}),i("van-field",{attrs:{label:"退款原因：",type:"textarea",placeholder:"请输入退款原因",rows:"1",autosize:""},model:{value:t.refundInfo.reason,callback:function(e){t.$set(t.refundInfo,"reason",e)},expression:"refundInfo.reason"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:t.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝账号：",type:"textarea",placeholder:"请输入支付宝账号",rows:"1",autosize:""},model:{value:t.refundInfo.aliAccount,callback:function(e){t.$set(t.refundInfo,"aliAccount",e)},expression:"refundInfo.aliAccount"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:t.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝姓名：",type:"textarea",placeholder:"请输入支付宝姓名",rows:"1",autosize:""},model:{value:t.refundInfo.aliName,callback:function(e){t.$set(t.refundInfo,"aliName",e)},expression:"refundInfo.aliName"}})],1)])],1)},s=[],a=(i("9a83"),i("f564")),o=(i("ac6a"),i("c93e")),r=(i("4467"),i("c36e")),c=(i("68ef"),i("1146"),i("1988")),l=i("fe7e"),u=i("3583"),d=i("a142"),f=Object(l["a"])({render:function(){var t,e=this,i=e.$createElement,n=e._self._c||i;return n("cell",{class:e.b((t={error:e.error,disabled:e.$attrs.disabled,"min-height":"textarea"===e.type&&!e.autosize},t["label-"+e.labelAlign]=e.labelAlign,t)),attrs:{icon:e.leftIcon,title:e.label,center:e.center,border:e.border,"is-link":e.isLink,required:e.required}},[e._t("left-icon",null,{slot:"icon"}),e._t("label",null,{slot:"title"}),n("div",{class:e.b("body")},["textarea"===e.type?n("textarea",e._g(e._b({ref:"input",class:e.b("control",e.inputAlign),attrs:{readonly:e.readonly},domProps:{value:e.value}},"textarea",e.$attrs,!1),e.listeners)):n("input",e._g(e._b({ref:"input",class:e.b("control",e.inputAlign),attrs:{type:e.type,readonly:e.readonly},domProps:{value:e.value}},"input",e.$attrs,!1),e.listeners)),e.showClear?n("icon",{class:e.b("clear"),attrs:{name:"clear"},on:{touchstart:function(t){return t.preventDefault(),e.onClear(t)}}}):e._e(),e.$slots.icon||e.icon?n("div",{class:e.b("icon"),on:{click:e.onClickIcon}},[e._t("icon",[n("icon",{attrs:{name:e.icon}})])],2):e._e(),e.$slots.button?n("div",{class:e.b("button")},[e._t("button")],2):e._e()],1),e.errorMessage?n("div",{class:e.b("error-message"),domProps:{textContent:e._s(e.errorMessage)}}):e._e()],2)},name:"field",inheritAttrs:!1,mixins:[u["a"]],props:{error:Boolean,leftIcon:String,readonly:Boolean,clearable:Boolean,labelAlign:String,inputAlign:String,onIconClick:Function,autosize:[Boolean,Object],errorMessage:String,type:{type:String,default:"text"}},data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&this.isDef(this.value)&&!this.readonly},listeners:function(){return Object(c["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur})}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(t){void 0===t&&(t=this.$refs.input);var e=t,i=e.value,n=this.$attrs.maxlength;return"number"===this.type&&this.isDef(n)&&i.length>n&&(i=i.slice(0,n),t.value=i),i},onInput:function(t){this.$emit("input",this.format(t.target))},onFocus:function(t){this.focused=!0,this.$emit("focus",t),this.readonly&&this.blur()},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},onClickIcon:function(){this.$emit("click-icon"),this.onIconClick&&this.onIconClick()},onClear:function(){this.$emit("input",""),this.$emit("clear")},onKeypress:function(t){if("number"===this.type){var e=t.keyCode,i=-1===String(this.value).indexOf("."),n=e>=48&&e<=57||46===e&&i||45===e;n||t.preventDefault()}"search"===this.type&&13===t.keyCode&&this.blur(),this.$emit("keypress",t)},adjustSize:function(){var t=this.$refs.input;if("textarea"===this.type&&this.autosize&&t){t.style.height="auto";var e=t.scrollHeight;if(Object(d["d"])(this.autosize)){var i=this.autosize,n=i.maxHeight,s=i.minHeight;n&&(e=Math.min(e,n)),s&&(e=Math.max(e,s))}e&&(t.style.height=e+"px")}}}}),h=(i("c194"),i("7744")),v=(i("2994"),i("2bdd")),p=(i("f032"),Object(l["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b({"show-action":t.showAction}),style:{background:t.background}},[i("field",t._g(t._b({attrs:{clearable:"",type:"search",value:t.value,border:!1,"left-icon":"search"}},"field",t.$attrs,!1),t.listeners),[t._t("left-icon",null,{slot:"left-icon"})],2),t.showAction?i("div",{class:t.b("action")},[t._t("action",[i("div",{on:{click:t.onBack}},[t._v(t._s(t.$t("cancel")))])])],2):t._e()],1)},name:"search",inheritAttrs:!1,components:{Field:f},props:{value:String,showAction:Boolean,background:{type:String,default:"#f2f2f2"}},computed:{listeners:function(){return Object(c["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress})}},methods:{onInput:function(t){this.$emit("input",t)},onKeypress:function(t){13===t.keyCode&&(t.preventDefault(),this.$emit("search",this.value)),this.$emit("keypress",t)},onBack:function(){this.$emit("input",""),this.$emit("cancel")}}})),b=(i("cadf"),i("551c"),i("097d"),i("35df")),g=i("db04"),m=i("2f62"),_={data:function(){return{searchValue:"",bodyHeight:"",tabList:["全部","已支付","已到账","已退款"],currentType:0,list:[],savedList:[],loading:!1,finished:!1,showRefund:!1,message:"",currentId:"",isShowAccount:!1,refundInfo:{brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}}},components:{"van-search":p,"van-list":v["a"],"van-cell":h["a"],"van-field":f,"van-cell-group":r["a"]},computed:Object(o["a"])({},Object(m["b"])({authorizedUserInfo:function(t){return t.userInfo.userInfoInner}})),created:function(){3==Object(b["h"])("refundPayType")&&(this.isShowAccount=!0)},mounted:function(){this.bodyHeight=document.documentElement.clientHeight},methods:{onSearch:function(){var t=this,e=[];""!=this.searchValue?(0==this.list.length&&this.getCurrentList(this.currentType),this.list.forEach(function(i){-1!=i.msisdn[0].indexOf(t.searchValue)&&e.push(i)}),0==e.length?this.list=[]:this.list=e):this.getCurrentList(this.currentType)},onCancel:function(){},getCurrentType:function(t){this.currentType=t,this.getCurrentList(t)},getList:function(){var t=this;Object(g["a"])("/api/v1/app/order/status",{user_id:Object(b["h"])("userInfo","obj").account.user_id}).then(function(e){1==e.state?(t.list=e.data[0],t.savedList=e.data[0]):Object(a["a"])({message:e.msg}),t.loading=!1,t.finished=!0})},getCurrentList:function(t){if(0==t)this.list=this.savedList;else if(1==t){var e=[];this.savedList.forEach(function(t){1==t.status&&e.push(t)}),this.list=e}else if(2==t){var i=[];this.savedList.forEach(function(t){2==t.status&&i.push(t)}),this.list=i}else if(3==t){var n=[];this.savedList.forEach(function(t){2==t.refund&&n.push(t)}),this.list=n}else this.list=[]},showMe:function(t){this.showRefund=!0,this.currentId=t,this.refundInfo={brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}},cfmRefund:function(t,e){var i=this;if("confirm"===t){if(!this.refundInfo.brand)return Object(a["a"])({message:"请填写设备品牌"}),void e(!1);if(!this.refundInfo.model)return Object(a["a"])({message:"请填写设备型号"}),void e(!1);if(!this.refundInfo.address)return Object(a["a"])({message:"请填写设备使用地址"}),void e(!1);if(!this.refundInfo.reason)return Object(a["a"])({message:"请填写退款理由"}),void e(!1);if(this.isShowAccount){if(!this.refundInfo.aliAccount)return Object(a["a"])({message:"请填写支付宝账号"}),void e(!1);if(!this.refundInfo.aliName)return Object(a["a"])({message:"请填写支付宝实名验证真实姓名"}),void e(!1)}Object(g["b"])("/api/v1/app/cards/refund",{order_id:this.currentId,device_brand:this.refundInfo.brand,device_model:this.refundInfo.model,use_address:this.refundInfo.address,refund_reason:this.refundInfo.reason,refund_account:this.refundInfo.aliAccount,refund_account_name:this.refundInfo.aliName,user_id:this.authorizedUserInfo.account.user_id}).then(function(t){1==t.state?(Object(a["a"])({message:"退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候",background:"#60ce53"}),e(),i.getList()):(Object(a["a"])({message:t.msg}),i.getList(),e())})}else e()}}},k=_,y=(i("ba4a"),i("2877")),w=Object(y["a"])(k,n,s,!1,null,null,null);w.options.__file="orderRecord.vue";e["default"]=w.exports},1146:function(t,e,i){},2221:function(t,e,i){},2994:function(t,e,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(t,e,i){"use strict";var n=i("fe7e"),s=i("023d"),a=i("db78");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[t._t("default"),t.loading?i("div",{class:t.b("loading")},[t._t("loading",[i("loading",{class:t.b("loading-icon")}),i("span",{class:t.b("loading-text")},[t._v(t._s(t.loadingText||t.$t("loadingTip")))])])],2):t._e(),t.finished&&t.finishedText?i("div",{class:t.b("finished-text")},[t._v("\n    "+t._s(t.finishedText)+"\n  ")]):t._e()],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300}},mounted:function(){this.scroller=s["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var t=this.$el,e=this.scroller,i=s["a"].getVisibleHeight(e);if(i&&"none"!==s["a"].getComputedStyle(t).display&&null!==t.offsetParent){var n=s["a"].getScrollTop(e),a=n+i,o=!1;if(t===e)o=e.scrollHeight-a<this.offset;else{var r=s["a"].getElementTop(t)-s["a"].getElementTop(e)+s["a"].getVisibleHeight(t);o=r-i<this.offset}o&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(t){this.binded!==t&&(this.binded=t,(t?a["b"]:a["a"])(this.scroller,"scroll",this.check))}}})},4467:function(t,e,i){"use strict";i("68ef"),i("2221")},"61c0":function(t,e,i){},ba4a:function(t,e,i){"use strict";var n=i("61c0"),s=i.n(n);s.a},c0c2:function(t,e,i){},c194:function(t,e,i){"use strict";i("68ef")},c36e:function(t,e,i){"use strict";var n=i("fe7e"),s=i("db78"),a="@@clickoutsideContext",o={bind:function(t,e){var i=function(e){t.contains(e.target)||t[a].callback()};t[a]={handler:i,callback:e.value,arg:e.arg||"click"},Object(s["b"])(document,t[a].arg,i)},update:function(t,e){t[a].callback=e.value},unbind:function(t){Object(s["a"])(document,t[a].arg,t[a].handler)},install:function(t){t.directive("clickoutside",{bind:this.bind,unbind:this.unbind})}},r=i("3875"),c=.15;e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside:touchstart",value:t.onClick,expression:"onClick",arg:"touchstart"}],class:t.b(),on:{click:function(e){t.onClick("cell")},touchstart:t.startDrag,touchmove:t.onDrag,touchend:t.endDrag,touchcancel:t.endDrag}},[i("div",{class:t.b("wrapper"),style:t.wrapperStyle,on:{transitionend:function(e){t.swipe=!1}}},[t.leftWidth?i("div",{class:t.b("left"),on:{click:function(e){e.stopPropagation(),t.onClick("left")}}},[t._t("left")],2):t._e(),t._t("default"),t.rightWidth?i("div",{class:t.b("right"),on:{click:function(e){e.stopPropagation(),t.onClick("right")}}},[t._t("right")],2):t._e()],2)])},name:"swipe-cell",mixins:[r["a"]],props:{onClose:Function,disabled:Boolean,leftWidth:Number,rightWidth:Number},directives:{Clickoutside:o},data:function(){return{offset:0,draging:!1}},computed:{wrapperStyle:function(){return{transform:"translate3d("+this.offset+"px, 0, 0)",transition:this.draging?"none":".6s cubic-bezier(0.18, 0.89, 0.32, 1)"}}},methods:{open:function(t){var e="left"===t?this.leftWidth:-this.rightWidth;this.swipeMove(e),this.resetSwipeStatus()},close:function(){this.offset=0},resetSwipeStatus:function(){this.swiping=!1,this.opened=!0},swipeMove:function(t){void 0===t&&(t=0),this.offset=t,t&&(this.swiping=!0),!t&&(this.opened=!1)},swipeLeaveTransition:function(t){var e=this.offset,i=this.leftWidth,n=this.rightWidth,s=this.opened?1-c:c;t>0&&-e>n*s&&n>0?this.open("right"):t<0&&e>i*s&&i>0?this.open("left"):this.swipeMove()},startDrag:function(t){this.disabled||(this.draging=!0,this.touchStart(t),this.opened&&(this.startX-=this.offset))},onDrag:function(t){if(!this.disabled){this.touchMove(t);var e=this.deltaX;e<0&&(-e>this.rightWidth||!this.rightWidth)||e>0&&(e>this.leftWidth||e>0)&&!this.leftWidth||"horizontal"===this.direction&&(t.preventDefault(),this.swipeMove(e))}},endDrag:function(){this.disabled||(this.draging=!1,this.swiping&&this.swipeLeaveTransition(this.offset>0?-1:1))},onClick:function(t){void 0===t&&(t="outside"),this.$emit("click",t),this.offset&&(this.onClose?this.onClose(t,this):this.swipeMove(0))}}})},f032:function(t,e,i){}}]);
//# sourceMappingURL=orderRecord.bf7e4ab2.js.map