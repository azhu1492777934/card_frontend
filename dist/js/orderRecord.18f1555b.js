(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orderRecord"],{"0774":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"orderRecord",style:{height:e.bodyHeight+"px"}},[i("div",{staticClass:"search"},[i("form",{attrs:{action:"/"}},[i("van-search",{attrs:{placeholder:"请输入要查询的手表手机号",shape:"round"},on:{search:e.onSearch,cancel:e.onCancel,clear:e.onSearch},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}},[i("div",{attrs:{slot:"left-icon"},slot:"left-icon"})]),i("b",{on:{click:e.onSearch}})],1)]),e.finished?i("div",{staticClass:"tab"},[i("ul",e._l(e.tabList,function(t,n){return i("li",{key:n,class:{active:e.currentType==n},on:{click:function(t){e.getCurrentType(n)}}},[e._v(e._s(t))])}))]):e._e(),i("div",{staticClass:"recordList"},[i("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.getList},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.list,function(t,n){return i("div",{key:n},[i("div",{staticClass:"orderContent"},[i("div",[i("div",{staticClass:"planMsg"},[i("div",[e._v("¥"+e._s(t.price))]),i("div",[e._v(e._s(t.rating_name))])]),i("div",{staticClass:"planDetails"},[i("div",[i("div",[e._v("订单编号:"+e._s(t.no))]),0==t.refund&&0==t.status?i("div",[e._v("未支付")]):e._e(),0==t.refund&&1==t.status?i("div",[e._v("已支付")]):e._e(),0==t.refund&&2==t.status?i("div",{staticClass:"rcved"},[e._v("已到账")]):e._e(),2==t.refund?i("div",{staticClass:"refunded"},[e._v("已退款")]):e._e(),1==t.refund?i("div",[e._v("退款中")]):e._e()]),i("div",[e._v(e._s(t.rate_plan.describe))])])]),i("div",{staticClass:"planTime"},[i("div",[e._v("下单时间："+e._s(t.paid_at))]),0==t.refund&&1==t.status||0==t.refund&&2==t.status?i("div",{on:{click:function(i){e.showMe(t.id)}}},[e._v("申请退款")]):e._e()]),i("div",{staticClass:"phoneNo"},[i("div",[e._v("手表手机号:"+e._s(t.msisdn[0]))])])])])}))],1),i("van-dialog",{attrs:{title:"退款原因","show-cancel-button":"","confirm-button-text":"确认退款","cancel-button-text":"暂不退款","before-close":e.cfmRefund},model:{value:e.showRefund,callback:function(t){e.showRefund=t},expression:"showRefund"}},[i("div",[i("van-field",{attrs:{label:"设备品牌：",type:"textarea",placeholder:"请输入设备品牌",rows:"1",autosize:""},model:{value:e.refundInfo.brand,callback:function(t){e.$set(e.refundInfo,"brand",t)},expression:"refundInfo.brand"}}),i("van-field",{attrs:{label:"设备型号：",type:"textarea",placeholder:"请输入设备型号",rows:"1",autosize:""},model:{value:e.refundInfo.model,callback:function(t){e.$set(e.refundInfo,"model",t)},expression:"refundInfo.model"}}),i("van-field",{attrs:{label:"使用地址：",type:"textarea",placeholder:"请输入使用地址",rows:"1",autosize:""},model:{value:e.refundInfo.address,callback:function(t){e.$set(e.refundInfo,"address",t)},expression:"refundInfo.address"}}),i("van-field",{attrs:{label:"退款原因：",type:"textarea",placeholder:"请输入退款原因",rows:"1",autosize:""},model:{value:e.refundInfo.reason,callback:function(t){e.$set(e.refundInfo,"reason",t)},expression:"refundInfo.reason"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:e.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝账号：",type:"textarea",placeholder:"请输入支付宝账号",rows:"1",autosize:""},model:{value:e.refundInfo.aliAccount,callback:function(t){e.$set(e.refundInfo,"aliAccount",t)},expression:"refundInfo.aliAccount"}}),i("van-field",{directives:[{name:"show",rawName:"v-show",value:e.isShowAccount,expression:"isShowAccount"}],attrs:{label:"支付宝姓名：",type:"textarea",placeholder:"请输入支付宝姓名",rows:"1",autosize:""},model:{value:e.refundInfo.aliName,callback:function(t){e.$set(e.refundInfo,"aliName",t)},expression:"refundInfo.aliName"}})],1)])],1)},s=[],a=(i("a481"),i("9a83"),i("f564")),o=(i("ac6a"),i("c93e")),r=(i("4467"),i("c36e")),c=(i("68ef"),i("1146"),i("1988")),l=i("fe7e"),u=i("3583"),d=i("a142"),f=Object(l["a"])({render:function(){var e,t=this,i=t.$createElement,n=t._self._c||i;return n("cell",{class:t.b((e={error:t.error,disabled:t.$attrs.disabled,"min-height":"textarea"===t.type&&!t.autosize},e["label-"+t.labelAlign]=t.labelAlign,e)),attrs:{icon:t.leftIcon,title:t.label,center:t.center,border:t.border,"is-link":t.isLink,required:t.required}},[t._t("left-icon",null,{slot:"icon"}),t._t("label",null,{slot:"title"}),n("div",{class:t.b("body")},["textarea"===t.type?n("textarea",t._g(t._b({ref:"input",class:t.b("control",t.inputAlign),attrs:{readonly:t.readonly},domProps:{value:t.value}},"textarea",t.$attrs,!1),t.listeners)):n("input",t._g(t._b({ref:"input",class:t.b("control",t.inputAlign),attrs:{type:t.type,readonly:t.readonly},domProps:{value:t.value}},"input",t.$attrs,!1),t.listeners)),t.showClear?n("icon",{class:t.b("clear"),attrs:{name:"clear"},on:{touchstart:function(e){return e.preventDefault(),t.onClear(e)}}}):t._e(),t.$slots.icon||t.icon?n("div",{class:t.b("icon"),on:{click:t.onClickIcon}},[t._t("icon",[n("icon",{attrs:{name:t.icon}})])],2):t._e(),t.$slots.button?n("div",{class:t.b("button")},[t._t("button")],2):t._e()],1),t.errorMessage?n("div",{class:t.b("error-message"),domProps:{textContent:t._s(t.errorMessage)}}):t._e()],2)},name:"field",inheritAttrs:!1,mixins:[u["a"]],props:{error:Boolean,leftIcon:String,readonly:Boolean,clearable:Boolean,labelAlign:String,inputAlign:String,onIconClick:Function,autosize:[Boolean,Object],errorMessage:String,type:{type:String,default:"text"}},data:function(){return{focused:!1}},watch:{value:function(){this.$nextTick(this.adjustSize)}},mounted:function(){this.format(),this.$nextTick(this.adjustSize)},computed:{showClear:function(){return this.clearable&&this.focused&&""!==this.value&&this.isDef(this.value)&&!this.readonly},listeners:function(){return Object(c["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress,focus:this.onFocus,blur:this.onBlur})}},methods:{focus:function(){this.$refs.input&&this.$refs.input.focus()},blur:function(){this.$refs.input&&this.$refs.input.blur()},format:function(e){void 0===e&&(e=this.$refs.input);var t=e,i=t.value,n=this.$attrs.maxlength;return"number"===this.type&&this.isDef(n)&&i.length>n&&(i=i.slice(0,n),e.value=i),i},onInput:function(e){this.$emit("input",this.format(e.target))},onFocus:function(e){this.focused=!0,this.$emit("focus",e),this.readonly&&this.blur()},onBlur:function(e){this.focused=!1,this.$emit("blur",e)},onClickIcon:function(){this.$emit("click-icon"),this.onIconClick&&this.onIconClick()},onClear:function(){this.$emit("input",""),this.$emit("clear")},onKeypress:function(e){if("number"===this.type){var t=e.keyCode,i=-1===String(this.value).indexOf("."),n=t>=48&&t<=57||46===t&&i||45===t;n||e.preventDefault()}"search"===this.type&&13===e.keyCode&&this.blur(),this.$emit("keypress",e)},adjustSize:function(){var e=this.$refs.input;if("textarea"===this.type&&this.autosize&&e){e.style.height="auto";var t=e.scrollHeight;if(Object(d["d"])(this.autosize)){var i=this.autosize,n=i.maxHeight,s=i.minHeight;n&&(t=Math.min(t,n)),s&&(t=Math.max(t,s))}t&&(e.style.height=t+"px")}}}}),h=(i("c194"),i("7744")),v=(i("2994"),i("2bdd")),p=(i("f032"),Object(l["a"])({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.b({"show-action":e.showAction}),style:{background:e.background}},[i("field",e._g(e._b({attrs:{clearable:"",type:"search",value:e.value,border:!1,"left-icon":"search"}},"field",e.$attrs,!1),e.listeners),[e._t("left-icon",null,{slot:"left-icon"})],2),e.showAction?i("div",{class:e.b("action")},[e._t("action",[i("div",{on:{click:e.onBack}},[e._v(e._s(e.$t("cancel")))])])],2):e._e()],1)},name:"search",inheritAttrs:!1,components:{Field:f},props:{value:String,showAction:Boolean,background:{type:String,default:"#f2f2f2"}},computed:{listeners:function(){return Object(c["a"])({},this.$listeners,{input:this.onInput,keypress:this.onKeypress})}},methods:{onInput:function(e){this.$emit("input",e)},onKeypress:function(e){13===e.keyCode&&(e.preventDefault(),this.$emit("search",this.value)),this.$emit("keypress",e)},onBack:function(){this.$emit("input",""),this.$emit("cancel")}}})),b=(i("cadf"),i("551c"),i("097d"),i("35df")),g=i("db04"),m=i("2f62"),_={data:function(){return{searchValue:"",bodyHeight:"",tabList:["全部","已支付","已到账","已退款"],currentType:0,list:[],savedList:[],loading:!1,finished:!1,showRefund:!1,message:"",currentId:"",isShowAccount:!1,refundInfo:{brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}}},components:{"van-search":p,"van-list":v["a"],"van-cell":h["a"],"van-field":f,"van-cell-group":r["a"]},computed:Object(o["a"])({},Object(m["b"])({authorizedUserInfo:function(e){return e.userInfo.userInfoInner}})),created:function(){3==Object(b["i"])("refundPayType")&&(this.isShowAccount=!0)},mounted:function(){this.bodyHeight=document.documentElement.clientHeight},methods:{onSearch:function(){var e=this,t=[];""!=this.searchValue?(0==this.list.length&&this.getCurrentList(this.currentType),this.list.forEach(function(i){-1!=i.msisdn[0].indexOf(e.searchValue)&&t.push(i)}),0==t.length?this.list=[]:this.list=t):this.getCurrentList(this.currentType)},onCancel:function(){},getCurrentType:function(e){this.currentType=e,this.getCurrentList(e)},getList:function(){var e=this;Object(g["a"])("/api/v1/app/order/status",{user_id:Object(b["i"])("userInfo","obj").account.user_id}).then(function(t){1==t.state?(e.list=t.data[0],e.savedList=t.data[0]):Object(a["a"])({message:t.msg}),e.loading=!1,e.finished=!0})},getCurrentList:function(e){if(0==e)this.list=this.savedList;else if(1==e){var t=[];this.savedList.forEach(function(e){1==e.status&&t.push(e)}),this.list=t}else if(2==e){var i=[];this.savedList.forEach(function(e){2==e.status&&i.push(e)}),this.list=i}else if(3==e){var n=[];this.savedList.forEach(function(e){2==e.refund&&n.push(e)}),this.list=n}else this.list=[]},showMe:function(e){this.showRefund=!0,this.currentId=e,this.refundInfo={brand:"",model:"",address:"",reason:"",aliAccount:"",aliName:""}},cfmRefund:function(e,t){var i=this;if("confirm"===e){if(!this.refundInfo.brand)return Object(a["a"])({message:"请填写设备品牌"}),void t(!1);if(!this.refundInfo.model)return Object(a["a"])({message:"请填写设备型号"}),void t(!1);if(!this.refundInfo.address)return Object(a["a"])({message:"请填写设备使用地址"}),void t(!1);if(!this.refundInfo.reason)return Object(a["a"])({message:"请填写退款理由"}),void t(!1);if(this.isShowAccount){if(!this.refundInfo.aliAccount)return Object(a["a"])({message:"请填写支付宝账号"}),void t(!1);if(!this.refundInfo.aliName)return Object(a["a"])({message:"请填写支付宝实名验证真实姓名"}),void t(!1)}for(var n in this.refundInfo)this.refundInfo[n]=this.refundInfo[n].replace(/\ +/g,""),this.refundInfo[n]=this.refundInfo[n].replace(/[\r\n]/g,"");Object(g["b"])("/api/v1/app/cards/refund",{order_id:this.currentId,device_brand:this.refundInfo.brand,device_model:this.refundInfo.model,use_address:this.refundInfo.address,refund_reason:this.refundInfo.reason,refund_account:this.refundInfo.aliAccount,refund_account_name:this.refundInfo.aliName,user_id:this.authorizedUserInfo.account.user_id}).then(function(e){1==e.state?(Object(a["a"])({message:"退款申请成功,3-5个工作日退款将原路返还至用户账户,请耐心等候",background:"#60ce53"}),t(),i.currentType=0,i.getList()):(Object(a["a"])({message:e.msg}),i.currentType=0,i.getList(),t())})}else t()}}},k=_,y=(i("ba4a"),i("2877")),w=Object(y["a"])(k,n,s,!1,null,null,null);w.options.__file="orderRecord.vue";t["default"]=w.exports},1146:function(e,t,i){},2221:function(e,t,i){},2994:function(e,t,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(e,t,i){"use strict";var n=i("fe7e"),s=i("023d"),a=i("db78");t["a"]=Object(n["a"])({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:e.b()},[e._t("default"),e.loading?i("div",{class:e.b("loading")},[e._t("loading",[i("loading",{class:e.b("loading-icon")}),i("span",{class:e.b("loading-text")},[e._v(e._s(e.loadingText||e.$t("loadingTip")))])])],2):e._e(),e.finished&&e.finishedText?i("div",{class:e.b("finished-text")},[e._v("\n    "+e._s(e.finishedText)+"\n  ")]):e._e()],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300}},mounted:function(){this.scroller=s["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var e=this.$el,t=this.scroller,i=s["a"].getVisibleHeight(t);if(i&&"none"!==s["a"].getComputedStyle(e).display&&null!==e.offsetParent){var n=s["a"].getScrollTop(t),a=n+i,o=!1;if(e===t)o=t.scrollHeight-a<this.offset;else{var r=s["a"].getElementTop(e)-s["a"].getElementTop(t)+s["a"].getVisibleHeight(e);o=r-i<this.offset}o&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(e){this.binded!==e&&(this.binded=e,(e?a["b"]:a["a"])(this.scroller,"scroll",this.check))}}})},4467:function(e,t,i){"use strict";i("68ef"),i("2221")},"61c0":function(e,t,i){},a481:function(e,t,i){i("214f")("replace",2,function(e,t,i){return[function(n,s){"use strict";var a=e(this),o=void 0==n?void 0:n[t];return void 0!==o?o.call(n,a,s):i.call(String(a),n,s)},i]})},ba4a:function(e,t,i){"use strict";var n=i("61c0"),s=i.n(n);s.a},c0c2:function(e,t,i){},c194:function(e,t,i){"use strict";i("68ef")},c36e:function(e,t,i){"use strict";var n=i("fe7e"),s=i("db78"),a="@@clickoutsideContext",o={bind:function(e,t){var i=function(t){e.contains(t.target)||e[a].callback()};e[a]={handler:i,callback:t.value,arg:t.arg||"click"},Object(s["b"])(document,e[a].arg,i)},update:function(e,t){e[a].callback=t.value},unbind:function(e){Object(s["a"])(document,e[a].arg,e[a].handler)},install:function(e){e.directive("clickoutside",{bind:this.bind,unbind:this.unbind})}},r=i("3875"),c=.15;t["a"]=Object(n["a"])({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside:touchstart",value:e.onClick,expression:"onClick",arg:"touchstart"}],class:e.b(),on:{click:function(t){e.onClick("cell")},touchstart:e.startDrag,touchmove:e.onDrag,touchend:e.endDrag,touchcancel:e.endDrag}},[i("div",{class:e.b("wrapper"),style:e.wrapperStyle,on:{transitionend:function(t){e.swipe=!1}}},[e.leftWidth?i("div",{class:e.b("left"),on:{click:function(t){t.stopPropagation(),e.onClick("left")}}},[e._t("left")],2):e._e(),e._t("default"),e.rightWidth?i("div",{class:e.b("right"),on:{click:function(t){t.stopPropagation(),e.onClick("right")}}},[e._t("right")],2):e._e()],2)])},name:"swipe-cell",mixins:[r["a"]],props:{onClose:Function,disabled:Boolean,leftWidth:Number,rightWidth:Number},directives:{Clickoutside:o},data:function(){return{offset:0,draging:!1}},computed:{wrapperStyle:function(){return{transform:"translate3d("+this.offset+"px, 0, 0)",transition:this.draging?"none":".6s cubic-bezier(0.18, 0.89, 0.32, 1)"}}},methods:{open:function(e){var t="left"===e?this.leftWidth:-this.rightWidth;this.swipeMove(t),this.resetSwipeStatus()},close:function(){this.offset=0},resetSwipeStatus:function(){this.swiping=!1,this.opened=!0},swipeMove:function(e){void 0===e&&(e=0),this.offset=e,e&&(this.swiping=!0),!e&&(this.opened=!1)},swipeLeaveTransition:function(e){var t=this.offset,i=this.leftWidth,n=this.rightWidth,s=this.opened?1-c:c;e>0&&-t>n*s&&n>0?this.open("right"):e<0&&t>i*s&&i>0?this.open("left"):this.swipeMove()},startDrag:function(e){this.disabled||(this.draging=!0,this.touchStart(e),this.opened&&(this.startX-=this.offset))},onDrag:function(e){if(!this.disabled){this.touchMove(e);var t=this.deltaX;t<0&&(-t>this.rightWidth||!this.rightWidth)||t>0&&(t>this.leftWidth||t>0)&&!this.leftWidth||"horizontal"===this.direction&&(e.preventDefault(),this.swipeMove(t))}},endDrag:function(){this.disabled||(this.draging=!1,this.swiping&&this.swipeLeaveTransition(this.offset>0?-1:1))},onClick:function(e){void 0===e&&(e="outside"),this.$emit("click",e),this.offset&&(this.onClose?this.onClose(e,this):this.swipeMove(0))}}})},f032:function(e,t,i){}}]);
//# sourceMappingURL=orderRecord.18f1555b.js.map