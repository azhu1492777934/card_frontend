(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_plan_group"],{"076d":function(t,e,i){},2994:function(t,e,i){"use strict";i("68ef"),i("c0c2")},"2bdd":function(t,e,i){"use strict";var n=i("fe7e"),s=i("023d"),a=i("db78");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[t._t("default"),t.loading?i("div",{class:t.b("loading")},[t._t("loading",[i("loading",{class:t.b("loading-icon")}),i("span",{class:t.b("loading-text")},[t._v(t._s(t.loadingText||t.$t("loadingTip")))])])],2):t._e(),t.finished&&t.finishedText?i("div",{class:t.b("finished-text")},[t._v("\n    "+t._s(t.finishedText)+"\n  ")]):t._e()],2)},name:"list",model:{prop:"loading"},props:{loading:Boolean,finished:Boolean,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:Number,default:300}},mounted:function(){this.scroller=s["a"].getScrollEventTarget(this.$el),this.handler(!0),this.immediateCheck&&this.$nextTick(this.check)},destroyed:function(){this.handler(!1)},activated:function(){this.handler(!0)},deactivated:function(){this.handler(!1)},watch:{loading:function(){this.$nextTick(this.check)},finished:function(){this.$nextTick(this.check)}},methods:{check:function(){if(!this.loading&&!this.finished){var t=this.$el,e=this.scroller,i=s["a"].getVisibleHeight(e);if(i&&"none"!==s["a"].getComputedStyle(t).display&&null!==t.offsetParent){var n=s["a"].getScrollTop(e),a=n+i,o=!1;if(t===e)o=e.scrollHeight-a<this.offset;else{var c=s["a"].getElementTop(t)-s["a"].getElementTop(e)+s["a"].getVisibleHeight(t);o=c-i<this.offset}o&&(this.$emit("input",!0),this.$emit("load"))}}},handler:function(t){this.binded!==t&&(this.binded=t,(t?a["b"]:a["a"])(this.scroller,"scroll",this.check))}}})},"39aa":function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"plan-group-wrapper"},[n("div",{ref:"btnChoosePlan",staticClass:"btn-choose-plan-wrap",on:{click:t.showPLanDetail}},[n("div",[n("span",[t._v(t._s(t.cur_plan_group_name))]),n("span",[t._v("=")])])]),n("div",{ref:"planList",staticClass:"group-list-wrap"},["[]"!=JSON.stringify(t.group_list)?n("ul",{staticClass:"plan-list-wrap"},t._l(t.group_list,function(e,s){return n("li",{class:{activedPlan:s==t.choose_plan_index,"plan-sell-done":"False"!=e.surplus_times&&e.surplus_times<=0},on:{click:function(e){t.choosePlanClick(s)}}},[n("div",{staticClass:"plan-info-wrap"},[n("p",{staticClass:"plan-name"},[t._v("\n                        "+t._s(e.name)+"\n                    ")]),n("p",{staticClass:"plan-limited-wrap"},[n("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=e.surplus_times&&e.surplus_times>0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times>0"}],staticClass:"limited-num"},[t._v("剩"+t._s(e.surplus_times)+"笔")]),n("span",{directives:[{name:"show",rawName:"v-show",value:0!=e.is_elb_deductible,expression:"inner_item.is_elb_deductible!=0"}],staticClass:"limited-num"},[t._v("可抵扣"+t._s(e.max_deductible_elb)+"个ELB")])]),n("p",{staticClass:"plan-desc"},[t._v("\n                        "+t._s(e.describe?e.describe:e.remark?e.remark:"")+"\n                    ")])]),n("div",{staticClass:"plan-price-wrap"},[n("p",[t._v("￥"+t._s(e.price))]),n("p",[t._v("￥"+t._s(e.market_price))])]),e.is_recommend?n("img",{staticClass:"recommend",attrs:{src:i("868f"),alt:""}}):t._e(),n("span",{directives:[{name:"show",rawName:"v-show",value:"False"!=e.surplus_times&&e.surplus_times<=0,expression:"inner_item.surplus_times!='False' && inner_item.surplus_times<=0"}],staticClass:"icon-sell-done"})])})):t._e(),t.showNoData?n("div",[n("img",{staticClass:"noOrderPic",attrs:{src:i("75ca"),alt:""}})]):t._e()]),n("div",{ref:"btnRechargeWrap",staticClass:"btn-recharge-wrap"},[n("button",{class:{noDataHide:"[]"==JSON.stringify(t.group_list)},on:{click:t.recharge}},[t._v("前往充值")])]),n("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:t.rechargeShow,callback:function(e){t.rechargeShow=e},expression:"rechargeShow"}},[n("p",{staticClass:"showTip"},[t._v("创建订单中,请等候")])]),n("van-popup",{attrs:{position:"bottom",overlay:!0,"lock-scroll":!0,"lazy-render":!0,"close-on-click-overlay":!0,loading:t.picker.loading},model:{value:t.picker.showPlanSelect,callback:function(e){t.$set(t.picker,"showPlanSelect",e)},expression:"picker.showPlanSelect"}},[n("van-picker",{ref:"picker",attrs:{"show-toolbar":"",title:"套餐选择",columns:t.columns},on:{confirm:t.handleConfirm,cancel:t.handleCancel}})],1),n("van-popup",{staticClass:"border-radius-10",attrs:{"close-on-click-overlay":!1},model:{value:t.appPay.show,callback:function(e){t.$set(t.appPay,"show",e)},expression:"appPay.show"}},[n("div",{staticClass:"appContext-pay-wrap"},[n("div",{staticClass:"title"},[t._v("\n                支付方式选择\n            ")]),n("div",{staticClass:"content"},[n("p",{class:{choose_type:t.appPay.type},on:{click:function(e){t.changePayType(1)}}},[t._v("微信支付")]),n("p",{class:{choose_type:!t.appPay.type},on:{click:function(e){t.changePayType(0)}}},[t._v("支付宝支付")])]),n("div",{staticClass:"footer"},[n("button",{on:{click:t.closePayType}},[t._v("取消")]),n("button",{on:{click:t.FinalAppPay}},[t._v("确定")])])])])],1)},a=[],o=(i("6b54"),i("9a83"),i("f564")),c=(i("ac6a"),i("a322")),l=(i("e17f"),i("2241")),r=(i("e7e5"),i("d399")),u=(i("2994"),i("2bdd")),h=(i("68ef"),i("a526"),i("f253")),p=(i("7f7f"),i("8a58"),i("e41f")),d=i("1fba"),f=i("db04"),m=i("35df"),g={name:"plan_group",data:function(){return{rechargeShow:!1,appPay:{show:!1,type:!0},cur_plan_group_name:"请选择套餐",client_type:Object(m["c"])(),showNoData:!1,iccid:Object(m["h"])("check_iccid"),group_list:[],choose_plan_index:0,picker:{showPlanSelect:!1,loading:!0,choose_plan_id:"",choose_type:""},scroll:null,columns:[{values:[]}]}},components:(n={},Object(c["a"])(n,p["a"].name,p["a"]),Object(c["a"])(n,h["a"].name,h["a"]),Object(c["a"])(n,u["a"].name,u["a"]),Object(c["a"])(n,r["a"].name,r["a"]),Object(c["a"])(n,l["a"].name,l["a"]),n),created:function(){this.iccid?this.initial({}):this.$router.push({path:"/mifi/card/lookup"})},methods:{initial:function(t){var e=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),this.$store.commit("mifiCommon/changeErrStatus",{show:!1}),this.choose_plan_index=0,Object(f["a"])("/api/v1/app/plan_group_list/and_plan_list",{iccid:this.iccid,plan_group_id:t.plan_group_id?t.plan_group_id:null,type:t.type?t.type:null}).then(function(t){e.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),e.picker.loading=!1,1===t.state?t.data.plan_group_list.length?(t.data.plan_group_list.map(function(t,i){e.columns[0].values.push({keyId:t.plan_group_id,text:t.plan_group_name})}),e.columns[0].values.length>0&&"请选择套餐"===e.cur_plan_group_name&&(e.cur_plan_group_name=e.columns[0].values[0].text),e.group_list=t.data.plan_list,t.data.plan_list.length?e.showNoData=!1:e.showNoData=!0,e.$nextTick(function(){var t=document.documentElement.clientHeight||document.body.clientHeight,i=e.$refs.btnChoosePlan.offsetHeight,n=e.$refs.btnRechargeWrap.offsetHeight;e.$refs.planList.style.height=t-i-n+"px",e.scroll?e.scroll.refresh():e.scroll=new d["a"](e.$refs.planList,{click:!0})})):e.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:t.msg?t.msg:"此卡暂无套餐数据"}):e.$store.commit("mifiCommon/changeErrStatus",{show:!0,errorMsg:t.msg?t.msg:"获取数据失败，请稍后再试"})})},choosePlanClick:function(t){this.choose_plan_index=t},showPLanDetail:function(){var t=this;this.picker.showPlanSelect=!0,this.picker.choose_plan_id?this.$nextTick(function(){t.$refs.picker.setColumnValue(0,t.picker.choose_plan_id),t.$refs.picker.setColumnValue(1,t.picker.choose_type)}):this.$nextTick(function(){t.$refs.picker.setColumnIndex(0,0),t.$refs.picker.setColumnIndex(1,0)})},handleConfirm:function(t){this.picker.choose_plan_id=t[0].keyId,this.picker.showPlanSelect=!1,this.cur_plan_group_name=t[0].text,this.initial({plan_group_id:this.picker.choose_plan_id,type:null})},handleCancel:function(){this.picker.showPlanSelect=!1},recharge:function(){var t=null,e=this,i=(new Date).getDate();t=this.group_list[this.choose_plan_index],t.surplus_times<=0?Object(r["a"])({message:"此套餐已售罄, 请更换套餐",position:"top"}):(t.iccid=Object(m["h"])("check_iccid"),Object(m["m"])("planInfo",t,"obj"),Object(m["h"])("userInfo","obj")?1==t.type&&t.day<=30&&i>=20&&i<=26?l["a"].confirm({title:"温馨提示",message:"您购买的套餐将在本月26号清零。"}).then(function(){e.toRechargeList(t)}):this.toRechargeList(t):Object(r["a"])({message:"请在微信或支付宝客服端打开充值",position:"top"}))},getToday:function(t){var e=new Date;t&&(e=new Date(t));var i=e.getFullYear(),n=e.getMonth()+1,s=e.getDate();return n<10&&(n="0"+n),s<10&&(s="0"+s),i+"-"+n+"-"+s},changePayType:function(t){this.appPay.type=!!t},closePayType:function(){this.appPay.type=!0,this.appPay.show=!1},FinalAppPay:function(){var t=Object(m["h"])("userInfo","obj");this.toRechargeList(t)},toRechargeList:function(t){var e=this,i=Object(m["h"])("userInfo","obj");if(i.account.rmb>0)Object(f["a"])("/api/v1/app/plans/renew_info",{user_id:Object(m["h"])("userInfo","obj").account.user_id,rating_id:t.id}).then(function(t){1==t.state?(Object(m["m"])("monthlyMsg",t.data,"obj"),e.$router.push({path:"/weixin/recharge/index"})):Object(o["a"])({message:t.msg})});else{var n={status:0,iccid:this.iccid,rating_id:t.id,price:t.price,recharge_price:t.price,user_id:i.account.user_id,env:this.client_type,start_time:this.getToday(),type:1};"alipay"===this.client_type||"wechat"===this.client_type?n.open_id=Object(m["h"])("decrypt_data","obj").openid:"app"===this.client_type&&(n.open_id=i.account.user_id),"wechat"===this.client_type?n.pay_type="WEIXIN":"alipay"===this.client_type&&(n.pay_type="ALIPAY"),this.rechargeShow=!1,Object(f["b"])("/api/v1/pay/weixin/create",n).then(function(t){1==t.state?(e.rechargeShow=!1,/<[^>]+>/.test(t.data)?document.write(t.data):t.data&&"[object String]"==Object.prototype.toString.call(t.data)&&"http"==t.data.substr(0,4)?"mifi"===e.global_variables.packed_project?location.href="".concat(e.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=t.data:(Object(o["a"])({message:"充值成功",background:"#60ce53"}),setTimeout(function(){"esim"==localStorage.getItem("currentType")?location.href="".concat(_this.global_variables.authorized_redirect_url,"/weixin/card/esim_usage"):"mifi"===_this.global_variables.packed_project?location.href="".concat(_this.global_variables.authorized_redirect_url,"/mifi/card/index"):location.href=t.data.return_url},1500))):(e.rechargeShow=!1,Object(o["a"])({message:t.msg}))})}}}},_=g,v=(i("b14c"),i("2877")),b=Object(v["a"])(_,s,a,!1,null,null,null);b.options.__file="plan_group.vue";e["default"]=b.exports},"868f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAkFBMVEUAAAD9XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA39XA0j09dWAAAAL3RSTlMAWff0F9cFKbgTtZUt+5OQHe9HDwPasWzrZQmbcVLSzeR6PiWsg0wwvV00yKWK3qx4HlAAAAPhSURBVGjetZbZkqowFEW3AlFEBgUHVBxwbrXP///dPQlI+vrS1YHsFwurXBxXNiSwmB7spefAWnp9gq0w2xacnZA1OLOtwdmJNTizrcHZiTU4sy3BtROOTTbZc8KxySZ7Tjg22WTPCccmm+w54dhkkz0nHJtssueEY5NN9pxwbLLJnhOOTTbZc8KxySZ7Tjgdsbt/iLSTZRH/BjdnT4FHd3DtJOzThNmLSWdwzXby/PvC7LA7LdrJBsJltrzTetcNXPs+JajZMZJPeusOXgHkLCUSOH53ANdstZYCeFIMDDz6SPsObp7uQs492NJnWrPZ944CIece5utWcO1kMu8706qDNXvk494Krtl5triwE+JUvocuEPHV/OxouJkTzwcgDpMHs6VvxV6dSH6eNdzQ9wnAeDR197VvF9fUVfdw5xpu2MECQOoC5dt38VyN5ac71M7N+31JUFzx9j0Nz7jfXPgjatKigzQ6UAFct4o9oSmEmlvHiL2v+k0UpUBANx/TpVpKxdYxcMLwQdXvSEC20Ut4boanwGptBGe2zuPlVP3+krJpvyc1eOoDMemYnyFUv2cFvphcsd0bCxJRqOGm7P5ZdfCA4+zNHlbj67e6gROK5hJ+kWwKIF7ymX/3JIffbNXeX9iTe7B1mI2V7PI+lyOuIfuyLOt+RytsGvb4L04OQFZ46xX8OanU8CyiXSm/Cl/AZUlVZn9i02sMoGA2C9BwAYiIFDI8lQ3bG/zByTKYhfvbXYhK7i58/5t0k0AENXLimLC3V8RV/RCoBcwnJHNH4t1SoKab+V4muE4oWAH48mjExdsqEUfe8/lSepcx801nYM5r6faAcdC8/Jxzb+OQpAtJN3Ci4qVIBK9lfyOQ/fDe71PVczyN2RTeASRy3gIf3hU9PW4NfIczUnkK4ECsIPnpvcltZ+L7dTxVPzoCyZCZH951DDoo1AMZnpQO/+z+73172ZmzKYyZPnIW2eGcAZ/emXVdGve72m+SIkMZ+zim/3tnlojN+82pHp3r7NtF/hQ/vZ8GyCIzJzolgJj2Li4UNN4XGVZA0JItlw9wR3QZlEpS7b0HiMDIt064Yb0HIelBGjgU132ffUFE7XyrHeDoUcDVWyeYOkSx8u618q2z9oikbKH2N6YDfjxu71uHnQBlU04gbeX7M9N6Ies9I2/j+zOjFICr6cmpAyf60LzaZEjnNR3psDM2DTMWEYjmWLE+tfatE67LnVpKZaYr31qMOjVz32+G79jfw2aOoSU2OSVE37jfv7hZAHm3vnXmPq57O0548sfiYYvNseRbxYJvw/NJdu9bY2Ns0fc/n4fpQRIasTIAAAAASUVORK5CYII="},a526:function(t,e,i){},b14c:function(t,e,i){"use strict";var n=i("076d"),s=i.n(n);s.a},c0c2:function(t,e,i){},d9d4:function(t,e,i){"use strict";e["a"]={props:{title:String,loading:Boolean,showToolbar:Boolean,cancelButtonText:String,confirmButtonText:String,visibleItemCount:{type:Number,default:5},itemHeight:{type:Number,default:44}}}},f253:function(t,e,i){"use strict";var n=i("fe7e"),s=i("1128");function a(t){return Array.isArray(t)?t.map(function(t){return a(t)}):"object"===typeof t?Object(s["a"])({},t):t}var o=i("a142"),c=200,l=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:[t.b(),t.className],style:t.columnStyle,on:{touchstart:t.onTouchStart,touchmove:function(e){return e.preventDefault(),t.onTouchMove(e)},touchend:t.onTouchEnd,touchcancel:t.onTouchEnd}},[i("ul",{style:t.wrapperStyle},t._l(t.options,function(e,n){return i("li",{staticClass:"van-ellipsis",class:t.b("item",{disabled:t.isDisabled(e),selected:n===t.currentIndex}),style:t.optionStyle,domProps:{innerHTML:t._s(t.getOptionText(e))},on:{click:function(e){t.setIndex(n,!0)}}})}),0)])},name:"picker-column",props:{valueKey:String,className:String,itemHeight:Number,defaultIndex:Number,initialOptions:Array,visibleItemCount:Number},data:function(){return{startY:0,offset:0,duration:0,startOffset:0,options:a(this.initialOptions),currentIndex:this.defaultIndex}},created:function(){this.$parent.children&&this.$parent.children.push(this),this.setIndex(this.currentIndex)},destroyed:function(){var t=this.$parent.children;t&&t.splice(t.indexOf(this),1)},watch:{defaultIndex:function(){this.setIndex(this.defaultIndex)}},computed:{count:function(){return this.options.length},baseOffset:function(){return this.itemHeight*(this.visibleItemCount-1)/2},columnStyle:function(){return{height:this.itemHeight*this.visibleItemCount+"px"}},wrapperStyle:function(){return{transition:this.duration+"ms",transform:"translate3d(0, "+(this.offset+this.baseOffset)+"px, 0)",lineHeight:this.itemHeight+"px"}},optionStyle:function(){return{height:this.itemHeight+"px"}}},methods:{onTouchStart:function(t){this.startY=t.touches[0].clientY,this.startOffset=this.offset,this.duration=0},onTouchMove:function(t){var e=t.touches[0].clientY-this.startY;this.offset=Object(o["f"])(this.startOffset+e,-this.count*this.itemHeight,this.itemHeight)},onTouchEnd:function(){if(this.offset!==this.startOffset){this.duration=c;var t=Object(o["f"])(Math.round(-this.offset/this.itemHeight),0,this.count-1);this.setIndex(t,!0)}},adjustIndex:function(t){t=Object(o["f"])(t,0,this.count);for(var e=t;e<this.count;e++)if(!this.isDisabled(this.options[e]))return e;for(var i=t-1;i>=0;i--)if(!this.isDisabled(this.options[i]))return i},isDisabled:function(t){return Object(o["d"])(t)&&t.disabled},getOptionText:function(t){return Object(o["d"])(t)&&this.valueKey in t?t[this.valueKey]:t},setIndex:function(t,e){t=this.adjustIndex(t)||0,this.offset=-t*this.itemHeight,t!==this.currentIndex&&(this.currentIndex=t,e&&this.$emit("change",t))},setValue:function(t){for(var e=this.options,i=0;i<e.length;i++)if(this.getOptionText(e[i])===t)return this.setIndex(i)},getValue:function(){return this.options[this.currentIndex]}}}),r=i("d9d4");e["a"]=Object(n["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:t.b()},[t.showToolbar?i("div",{staticClass:"van-hairline--top-bottom",class:t.b("toolbar")},[t._t("default",[i("div",{class:t.b("cancel"),on:{click:function(e){t.emit("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),t.title?i("div",{staticClass:"van-ellipsis",class:t.b("title"),domProps:{textContent:t._s(t.title)}}):t._e(),i("div",{class:t.b("confirm"),on:{click:function(e){t.emit("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])])],2):t._e(),t.loading?i("div",{class:t.b("loading")},[i("loading")],1):t._e(),i("div",{class:t.b("columns"),style:t.columnsStyle,on:{touchmove:function(t){t.preventDefault()}}},[t._l(t.simple?[t.columns]:t.columns,function(e,n){return i("picker-column",{key:n,attrs:{"value-key":t.valueKey,"initial-options":t.simple?e:e.values,"class-name":e.className,"default-index":e.defaultIndex,"item-height":t.itemHeight,"visible-item-count":t.visibleItemCount},on:{change:function(e){t.onChange(n)}}})}),i("div",{staticClass:"van-hairline--top-bottom",class:t.b("frame"),style:t.frameStyle})],2)])},name:"picker",mixins:[r["a"]],components:{PickerColumn:l},props:{columns:Array,valueKey:{type:String,default:"text"}},data:function(){return{children:[]}},computed:{frameStyle:function(){return{height:this.itemHeight+"px"}},columnsStyle:function(){return{height:this.itemHeight*this.visibleItemCount+"px"}},simple:function(){return this.columns.length&&!this.columns[0].values}},watch:{columns:function(){this.setColumns()}},methods:{setColumns:function(){var t=this,e=this.simple?[{values:this.columns}]:this.columns;e.forEach(function(e,i){t.setColumnValues(i,a(e.values))})},emit:function(t){this.simple?this.$emit(t,this.getColumnValue(0),this.getColumnIndex(0)):this.$emit(t,this.getValues(),this.getIndexes())},onChange:function(t){this.simple?this.$emit("change",this,this.getColumnValue(0),this.getColumnIndex(0)):this.$emit("change",this,this.getValues(),t)},getColumn:function(t){return this.children[t]},getColumnValue:function(t){var e=this.getColumn(t);return e&&e.getValue()},setColumnValue:function(t,e){var i=this.getColumn(t);i&&i.setValue(e)},getColumnIndex:function(t){return(this.getColumn(t)||{}).currentIndex},setColumnIndex:function(t,e){var i=this.getColumn(t);i&&i.setIndex(e)},getColumnValues:function(t){return(this.children[t]||{}).options},setColumnValues:function(t,e){var i=this.children[t];i&&JSON.stringify(i.options)!==JSON.stringify(e)&&(i.options=e,i.setIndex(0))},getValues:function(){return this.children.map(function(t){return t.getValue()})},setValues:function(t){var e=this;t.forEach(function(t,i){e.setColumnValue(i,t)})},getIndexes:function(){return this.children.map(function(t){return t.currentIndex})},setIndexes:function(t){var e=this;t.forEach(function(t,i){e.setColumnIndex(i,t)})}}})}}]);
//# sourceMappingURL=mifi_plan_group.b4c894f6.js.map