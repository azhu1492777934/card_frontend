(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["card_lookup"],{"24b9":function(c,e,t){c.exports=t.p+"img/scanTop.5a342865.png"},"4e3c":function(c,e,t){"use strict";var i=function(){var c=this,e=c.$createElement,t=c._self._c||e;return t("div",{staticClass:"btn-wrap"},[t("button",{class:{disabled:c.btnState},attrs:{disabled:c.btnState},on:{click:c.clickThrotle}},[c._v("\n    "+c._s(c.btnText)+"\n    ")])])},n=[],s=(t("cadf"),t("551c"),t("097d"),{name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var c=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){c.btnState=!1},2e3)}}}),a=s,r=(t("d9ae"),t("2877")),o=Object(r["a"])(a,i,n,!1,null,null,null);o.options.__file="index.vue";e["a"]=o.exports},6648:function(c,e,t){"use strict";t.r(e);var i,n=function(){var c=this,e=c.$createElement,t=c._self._c||e;return t("div",{staticClass:"check-card-wrap"},[c._m(0),t("div",{staticClass:"search-wrap"},[t("input",{directives:[{name:"model",rawName:"v-model",value:c.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:c.iccid},on:{focus:c.handleIccidFocus,blur:function(e){return e.preventDefault(),c.iccidBlur(e)},input:function(e){e.target.composing||(c.iccid=e.target.value)}}}),t("span",{directives:[{name:"show",rawName:"v-show",value:c.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:c.clearInputIccid}},[c._v("×")]),t("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=c.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:c.scanIccid}}),t("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=c.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),t("div",{staticClass:"btn-check-wrap"},[t("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(e){c.searchIccid(c.iccid)}}})],1),t("div",{directives:[{name:"show",rawName:"v-show",value:c.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[t("p",{staticClass:"recording-title"},[t("span",[c._v("历史搜索记录")]),t("span",[c._v(c._s(c.recording_list.length)+"条")])]),t("ul",{staticClass:"recording-list-wrap"},c._l(c.recording_list,function(e,i){return t("li",[t("span",{on:{click:function(t){c.searchIccid(e.iccid)}}},[c._v(c._s(e.iccid))]),t("span",[c._v(c._s(e.searchTime))]),t("span",{on:{click:function(t){c.deleteIccid(e.iccid)}}},[c._v("×")])])}))]),t("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:c.checkShow,callback:function(e){c.checkShow=e},expression:"checkShow"}},[t("p",{staticClass:"showTip"},[c._v("正在检测中,请等候")])]),t("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:c.forbidden_click,callback:function(e){c.forbidden_click=e},expression:"forbidden_click"}})],1)},s=[function(){var c=this,e=c.$createElement,i=c._self._c||e;return i("div",{staticClass:"scanTop-wrap"},[i("img",{attrs:{src:t("24b9"),alt:""}})])}],a=(t("a481"),t("55dd"),t("9a83"),t("f564")),r=t("a322"),o=(t("7f7f"),t("8a58"),t("e41f")),l=t("35df"),h=t("db04"),d=t("4e3c"),u={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!1,client_type:Object(l["c"])(),showClearBtn:!1,forbidden_click:!0}},components:(i={},Object(r["a"])(i,o["a"].name,o["a"]),Object(r["a"])(i,"cardButton",d["a"]),i),created:function(){("wechat"!=this.client_type||"alipay"!=this.client_type||"app"!=this.client_type||Object(l["h"])("token"))&&(this.forbidden_click=!1);var c=this;if(Object(l["h"])("recording_list","arr")){var e=Object(l["h"])("recording_list","arr");e.length&&(this.recording_list=e,this.recording_show=!0)}Object(l["h"])("new_auth_search_iccid")?this.iccid=Object(l["h"])("new_auth_search_iccid"):Object(l["h"])("check_iccid")&&(this.iccid=Object(l["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(e){c.handleIccidFocus()},500));var t=Object(l["i"])("iccid")||Object(l["h"])("watch_card");if(t&&1==this.checkSearchIccid(t).state)if(Object(l["h"])("watchAutoSearch")>2&&(Object(l["k"])("watch_card"),Object(l["k"])("watchAutoSearch")),Object(l["h"])("watch_card_timestamp")){var i=Object(l["h"])("watch_card_timestamp"),n=(new Date).getTime();if(n>i){var s=(new Date).getTime()+6e4;Object(l["l"])("check_iccid",t),Object(l["l"])("watch_card_timestamp",s),this.processCheckIccid(t)}}else{this.iccid=t,Object(l["l"])("check_iccid",t);var r=(new Date).setTime((new Date).getTime()+6e4);Object(l["l"])("watch_card_timestamp",r),this.processCheckIccid(t)}else t&&Object(a["a"])({message:this.checkSearchIccid(t).msg})},methods:{searchIccid:function(c){c?this.checkSearchIccid(c).state?this.processCheckIccid(c):Object(a["a"])({message:this.checkSearchIccid(c).msg}):Object(a["a"])({message:"请输入ICCID"})},processCheckIccid:function(c){this.checkShow=!0;var e=!1,t=this;this.recording_list.length?(this.recording_list.map(function(t,i){t.iccid==c&&(t.searchTime=Object(l["f"])().searchTime,t.millisecond=Object(l["f"])().millisecond,e=!0)}),e||this.recording_list.push({iccid:c,searchTime:Object(l["f"])().searchTime,millisecond:Object(l["f"])().millisecond})):(this.recording_list.push({iccid:c,searchTime:Object(l["f"])().searchTime,millisecond:Object(l["f"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(l["l"])("recording_list",this.recording_list,"arr"),Object(h["b"])("/api/v1/app/new_auth/check_auth_",{iccid:c}).then(function(e){var i=Object(l["h"])("watchAutoSearch");i&&(i++,Object(l["l"])("watchAutoSearch",i)),1==e.state?(Object(l["l"])("originPrice",e.data.default_price),Object(l["l"])("check_iccid",e.data.iccid),Object(l["l"])("new_auth_search_iccid",c),1==e.data.status?t.$router.push({path:"/weixin/card/usage"}):2==e.data.status?(Object(l["l"])("check_realNameSource",e.data.source),t.$router.push({path:"/weixin/new_card/real_name"})):3==e.data.status&&t.$router.push({path:"/weixin/card/plan_list"})):(Object(a["a"])({message:e.msg}),t.checkShow=!1)})},scanIccid:function(){var c=this;"wechat"==this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(e){var t=e.resultStr;t.indexOf(",")>-1&&(t=t.substr(t.indexOf(",")+1,t.length)),c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)}}):"alipay"==this.client_type&&ap.scan(function(e){var t=e.code;c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)})},inArray:function(c,e,t){return null==e?-1:e.indexOf(c,t)},compare:function(c){return function(e,t){var i=e[c],n=t[c];return n-i}},checkSearchIccid:function(c){return c?(c.length<19||c.length>20||"89"!=c.substr(0,2))&&13!=c.length&&11!=c.length&&15!=c.length&&16!=c.length?{state:0,msg:"ICCID有误,请检查"}:{state:1}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(c){for(var e=-1,t=0;t<this.recording_list.length;t++)if(this.recording_list[t].iccid==c){e=t;break}e>=0&&(this.recording_list.splice(e,1),Object(l["l"])("recording_list",this.recording_list,"arr")),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(c,e){var t,i=this;return function(){for(var n=arguments.length,s=new Array(n),a=0;a<n;a++)s[a]=arguments[a];t&&clearTimeout(t),t=setTimeout(function(){c.apply(i,s)},e)}}}},p=u,_=(t("e0b1"),t("2877")),f=Object(_["a"])(p,n,s,!1,null,null,null);f.options.__file="lookup.vue";e["default"]=f.exports},"8a58":function(c,e,t){"use strict";t("68ef"),t("4d75")},a481:function(c,e,t){t("214f")("replace",2,function(c,e,t){return[function(i,n){"use strict";var s=c(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,s,n):t.call(String(s),i,n)},t]})},c520:function(c,e,t){},d9ae:function(c,e,t){"use strict";var i=t("dca3"),n=t.n(i);n.a},dca3:function(c,e,t){},e0b1:function(c,e,t){"use strict";var i=t("c520"),n=t.n(i);n.a},e41f:function(c,e,t){"use strict";var i=t("fe7e"),n=t("6605");e["a"]=Object(i["a"])({render:function(){var c,e=this,t=e.$createElement,i=e._self._c||t;return i("transition",{attrs:{name:e.currentTransition}},[e.shouldRender?i("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],class:e.b((c={},c[e.position]=e.position,c))},[e._t("default")],2):e._e()])},name:"popup",mixins:[n["a"]],props:{position:String,transition:String,overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},computed:{currentTransition:function(){return this.transition||(this.position?"popup-slide-"+this.position:"van-fade")}}})}}]);
//# sourceMappingURL=card_lookup.0761f1b1.js.map