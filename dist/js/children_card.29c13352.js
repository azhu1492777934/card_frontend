(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["children_card"],{2241:function(e,t,i){"use strict";var n,c=i("1988"),s=i("2b0e"),a=i("fe7e"),o=Object(a["a"])({render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i(e.tag,{tag:"component",class:e.b([e.type,e.size,{block:e.block,plain:e.plain,round:e.round,square:e.square,loading:e.loading,disabled:e.disabled,unclickable:e.disabled||e.loading,"bottom-action":e.bottomAction}]),attrs:{type:e.nativeType,disabled:e.disabled},on:{click:e.onClick}},[e.loading?i("loading",{attrs:{size:"20px",color:"default"===e.type?void 0:""}}):i("span",{class:e.b("text")},[e._t("default",[e._v(e._s(e.text))])],2)],1)},name:"button",props:{text:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,disabled:Boolean,nativeType:String,bottomAction:Boolean,tag:{type:String,default:"button"},type:{type:String,default:"default"},size:{type:String,default:"normal"}},methods:{onClick:function(e){this.loading||this.disabled||this.$emit("click",e)}}}),r=i("6605"),l=Object(a["a"])({render:function(){var e,t=this,i=t.$createElement,n=t._self._c||i;return n("transition",{attrs:{name:"van-dialog-bounce"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:[t.b(),t.className]},[t.title?n("div",{class:t.b("header",{isolated:!t.message&&!t.$slots.default}),domProps:{textContent:t._s(t.title)}}):t._e(),t.message||t.$slots.default?n("div",{class:t.b("content")},[t._t("default",[t.message?n("div",{class:t.b("message",(e={"has-title":t.title},e[t.messageAlign]=t.messageAlign,e)),domProps:{innerHTML:t._s(t.message)}}):t._e()])],2):t._e(),n("div",{staticClass:"van-hairline--top",class:t.b("footer",{buttons:t.showCancelButton&&t.showConfirmButton})},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showCancelButton,expression:"showCancelButton"}],class:t.b("cancel"),attrs:{loading:t.loading.cancel,size:"large"},on:{click:function(e){t.handleAction("cancel")}}},[t._v("\n        "+t._s(t.cancelButtonText||t.$t("cancel"))+"\n      ")]),n("van-button",{directives:[{name:"show",rawName:"v-show",value:t.showConfirmButton,expression:"showConfirmButton"}],class:[t.b("confirm"),{"van-hairline--left":t.showCancelButton&&t.showConfirmButton}],attrs:{size:"large",loading:t.loading.confirm},on:{click:function(e){t.handleAction("confirm")}}},[t._v("\n        "+t._s(t.confirmButtonText||t.$t("confirm"))+"\n      ")])],1)])])},name:"dialog",components:{VanButton:o},mixins:[r["a"]],props:{title:String,message:String,callback:Function,className:[String,Object,Array],beforeClose:Function,messageAlign:String,confirmButtonText:String,cancelButtonText:String,showCancelButton:Boolean,showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{handleAction:function(e){var t=this;this.beforeClose?(this.loading[e]=!0,this.beforeClose(e,function(i){!1!==i&&t.onClose(e),t.loading[e]=!1})):this.onClose(e)},onClose:function(e){this.$emit("input",!1),this.$emit(e),this.callback&&this.callback(e)}}}),d=i("a142"),u=function(){n=new(s["a"].extend(l))({el:document.createElement("div")}),n.$on("input",function(e){n.value=e}),document.body.appendChild(n.$el)},h=function e(t){return d["e"]?Promise.resolve():new Promise(function(i,s){n||u(),Object(c["a"])(n,e.currentOptions,t,{resolve:i,reject:s})})};h.defaultOptions={value:!0,title:"",message:"",overlay:!0,className:"",lockScroll:!0,beforeClose:null,messageAlign:"",confirmButtonText:"",cancelButtonText:"",showConfirmButton:!0,showCancelButton:!1,closeOnClickOverlay:!1,callback:function(e){n["confirm"===e?"resolve":"reject"](e)}},h.alert=h,h.confirm=function(e){return h(Object(c["a"])({showCancelButton:!0},e))},h.close=function(){n&&(n.value=!1)},h.setDefaultOptions=function(e){Object(c["a"])(h.currentOptions,e)},h.resetDefaultOptions=function(){h.currentOptions=Object(c["a"])({},h.defaultOptions)},h.install=function(){s["a"].use(l)},s["a"].prototype.$dialog=h,h.resetDefaultOptions();t["a"]=h},"24b9":function(e,t,i){e.exports=i.p+"img/scanTop.5a342865.png"},"2f94":function(e,t,i){},"2fcb":function(e,t,i){},"4e3c":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"btn-wrap"},[i("button",{class:{disabled:e.btnState},attrs:{disabled:e.btnState},on:{click:e.clickThrotle}},[e._v("\n    "+e._s(e.btnText)+"\n    ")])])},c=[],s={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var e=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){e.btnState=!1},2e3)}}},a=s,o=(i("d9ae"),i("2877")),r=Object(o["a"])(a,n,c,!1,null,null,null);r.options.__file="index.vue";t["a"]=r.exports},"8a58":function(e,t,i){"use strict";i("68ef"),i("4d75")},"9d51":function(e,t,i){"use strict";var n=i("2f94"),c=i.n(n);c.a},a481:function(e,t,i){i("214f")("replace",2,function(e,t,i){return[function(n,c){"use strict";var s=e(this),a=void 0==n?void 0:n[t];return void 0!==a?a.call(n,s,c):i.call(String(s),n,c)},i]})},acde:function(e,t,i){"use strict";i.r(t);var n,c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"check-card-wrap"},[e._m(0),i("p",{staticClass:"search_title"},[e._v("请扫描或输入您的ICCID,我们将为您查询您的儿童手表卡卡机号～")]),i("div",{staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:e.iccid},on:{focus:e.handleIccidFocus,blur:function(t){return t.preventDefault(),e.iccidBlur(t)},input:function(t){t.target.composing||(e.iccid=t.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:e.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:e.clearInputIccid}},[e._v("×")]),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:e.scanIccid}}),i("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=e.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),i("div",{staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(t){e.searchIccid(e.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{staticClass:"recording-title"},[i("span",[e._v("历史搜索记录")]),i("span",[e._v(e._s(e.recording_list.length)+"条")])]),i("ul",{staticClass:"recording-list-wrap"},e._l(e.recording_list,function(t,n){return i("li",[i("span",{on:{click:function(i){e.searchIccid(t.iccid)}}},[e._v(e._s(t.iccid))]),i("span",[e._v(e._s(t.searchTime))]),i("span",{on:{click:function(i){e.deleteIccid(t.iccid)}}},[e._v("×")])])}))]),i("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:e.checkShow,callback:function(t){e.checkShow=t},expression:"checkShow"}},[i("p",{staticClass:"showTip"},[e._v("正在查询手表卡，请等候")])])],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"scanTop-wrap"},[n("img",{attrs:{src:i("24b9"),alt:""}})])}],a=(i("a481"),i("55dd"),i("9a83"),i("f564")),o=i("a322"),r=(i("e17f"),i("2241")),l=(i("7f7f"),i("8a58"),i("e41f")),d=i("35df"),u=i("db04"),h=i("4e3c"),f={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!1,client_type:Object(d["c"])(),showClearBtn:!1}},components:(n={},Object(o["a"])(n,l["a"].name,l["a"]),Object(o["a"])(n,r["a"].name,r["a"]),Object(o["a"])(n,"cardButton",h["a"]),n),created:function(){var e=this;if(Object(d["h"])("recording_list","arr")){var t=Object(d["h"])("recording_list","arr");t.length&&(this.recording_list=t,this.recording_show=!0)}Object(d["h"])("new_auth_search_iccid")?this.iccid=Object(d["h"])("new_auth_search_iccid"):Object(d["h"])("check_iccid")&&(this.iccid=Object(d["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(){e.handleIccidFocus()},500))},methods:{searchIccid:function(e){e?this.checkSearchIccid(e).state?this.processCheckIccid(e):Object(a["a"])({message:this.checkSearchIccid(e).msg}):Object(a["a"])({message:"请输入ICCID"})},processCheckIccid:function(e){var t=this;this.checkShow=!0;var i=!1;this.recording_list.length?(this.recording_list.map(function(t,n){t.iccid==e&&(t.searchTime=Object(d["f"])().searchTime,t.millisecond=Object(d["f"])().millisecond,i=!0)}),i||this.recording_list.push({iccid:e,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond})):(this.recording_list.push({iccid:e,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(d["l"])("recording_list",this.recording_list,"arr"),Object(u["b"])("/api/v1/app/search_mobile",{iccid:e}).then(function(i){t.checkShow=!1,1==i.state?(Object(d["l"])("check_iccid",i.data.iccid),Object(d["l"])("new_auth_search_iccid",e),"89"==i.data.msisdn.substr(0,2)?r["a"].alert({message:"手表手机号："+i.data.msisdn.substring(2,i.data.msisdn.length)}):r["a"].alert({message:"手表手机号："+i.data.msisdn})):Object(a["a"])({message:i.msg})})},scanIccid:function(){var e=this;"wechat"==this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(t){var i=t.resultStr;!i||19!=i.length&&20!=i.length?Object(a["a"])({message:"请扫描正确的ICCID"}):(e.iccid=i.replace(/[^0-9]*/g,""),e.processCheckIccid(e.iccid))}}):"alipay"==this.client_type&&ap.scan(function(t){var i=t.code;e.iccid=i.replace(/[^0-9]*/g,""),e.processCheckIccid(e.iccid)})},inArray:function(e,t,i){return null==t?-1:t.indexOf(e,i)},compare:function(e){return function(t,i){var n=t[e],c=i[e];return c-n}},checkSearchIccid:function(e){return e?e.length<19||e.length>20||"89"!=e.substr(0,2)?{state:0,msg:"ICCID有误,请检查"}:{state:1}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(e){for(var t=-1,i=0;i<this.recording_list.length;i++)if(this.recording_list[i].iccid==e){t=i;break}t>=0&&(this.recording_list.splice(t,1),Object(d["l"])("recording_list",this.recording_list,"arr")),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.showClearBtn=!1,this.$refs.iccidDom.focus()},iccidBlur:function(){this.showClearBtn=!1},debounce:function(e,t){var i,n=this;return function(){for(var c=arguments.length,s=new Array(c),a=0;a<c;a++)s[a]=arguments[a];i&&clearTimeout(i),i=setTimeout(function(){e.apply(n,s)},t)}}}},p=f,m=(i("9d51"),i("2877")),v=Object(m["a"])(p,c,s,!1,null,null,null);v.options.__file="index.vue";t["default"]=v.exports},d9ae:function(e,t,i){"use strict";var n=i("dca3"),c=i.n(n);c.a},dca3:function(e,t,i){},e17f:function(e,t,i){"use strict";i("68ef"),i("4d75"),i("2fcb")},e41f:function(e,t,i){"use strict";var n=i("fe7e"),c=i("6605");t["a"]=Object(n["a"])({render:function(){var e,t=this,i=t.$createElement,n=t._self._c||i;return n("transition",{attrs:{name:t.currentTransition}},[t.shouldRender?n("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],class:t.b((e={},e[t.position]=t.position,e))},[t._t("default")],2):t._e()])},name:"popup",mixins:[c["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=children_card.29c13352.js.map