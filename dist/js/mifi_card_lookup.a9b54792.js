(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_card_lookup"],{"207a":function(c,e,t){},"24b9":function(c,e,t){c.exports=t.p+"img/scanTop.5a342865.png"},"4e3c":function(c,e,t){"use strict";var i=function(){var c=this,e=c.$createElement,t=c._self._c||e;return t("div",{staticClass:"btn-wrap"},[t("button",{class:{disabled:c.btnState},attrs:{disabled:c.btnState},on:{click:c.clickThrotle}},[c._v("\n    "+c._s(c.btnText)+"\n    ")])])},s=[],n={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var c=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){c.btnState=!1},2e3)}}},a=n,r=(t("d9ae"),t("2877")),o=Object(r["a"])(a,i,s,!1,null,null,null);o.options.__file="index.vue";e["a"]=o.exports},"72e8":function(c,e,t){"use strict";var i=t("207a"),s=t.n(i);s.a},a481:function(c,e,t){t("214f")("replace",2,function(c,e,t){return[function(i,s){"use strict";var n=c(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,n,s):t.call(String(n),i,s)},t]})},cd1e:function(c,e,t){"use strict";t.r(e);var i,s=function(){var c=this,e=c.$createElement,i=c._self._c||e;return i("div",{staticClass:"check-card-wrap"},[i("div",{ref:"ref_top",staticClass:"scanTop-wrap"},[i("img",{attrs:{src:t("24b9"),alt:""}})]),i("div",{ref:"ref_search",staticClass:"search-wrap"},[i("input",{directives:[{name:"model",rawName:"v-model",value:c.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:c.iccid},on:{focus:c.handleIccidFocus,blur:function(e){return e.preventDefault(),c.iccidBlur(e)},input:function(e){e.target.composing||(c.iccid=e.target.value)}}}),i("span",{directives:[{name:"show",rawName:"v-show",value:c.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:c.clearInputIccid}},[c._v("×")]),i("span",{staticClass:"iconfont icon-scan bounceIn animated",on:{click:c.testClick}})]),i("div",{ref:"ref_button",staticClass:"btn-check-wrap"},[i("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(e){c.searchIccid(c.iccid)}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:c.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[i("p",{ref:"recording_title",staticClass:"recording-title"},[i("span",[c._v("历史搜索记录")]),i("span",[c._v(c._s(c.recording_list.length)+"条")])]),i("ul",{ref:"main_recording",staticClass:"recording-list-wrap"},c._l(c.recording_list,function(e,t){return i("li",[i("span",{on:{click:function(t){c.searchIccid(e.iccid)}}},[c._v(c._s(e.iccid))]),i("span",[c._v(c._s(e.searchTime))]),i("span",{on:{click:function(t){c.deleteIccid(e.iccid)}}},[c._v("×")])])}))])])},n=[],a=(t("55dd"),t("a481"),t("9a83"),t("f564")),r=t("a322"),o=(t("7f7f"),t("8a58"),t("e41f")),d=(t("cadf"),t("551c"),t("097d"),t("35df")),h=t("db04"),l=t("4e3c"),u={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",client_type:Object(d["c"])(),showClearBtn:!1}},components:(i={},Object(r["a"])(i,o["a"].name,o["a"]),Object(r["a"])(i,"cardButton",l["a"]),i),created:function(){var c=this;this.$store.commit("mifiCommon/changeErrStatus",{show:!1});var e=this;if(Object(d["h"])("recording_list","arr")){var t=Object(d["h"])("recording_list","arr");t.length&&(this.recording_list=t,this.recording_show=!0)}Object(d["h"])("new_auth_search_iccid")?this.iccid=Object(d["h"])("new_auth_search_iccid"):Object(d["h"])("check_iccid")&&(this.iccid=Object(d["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(c){e.handleIccidFocus()},500));var i=Object(d["i"])("iccid")||Object(d["h"])("watch_card");if(i&&1===this.checkSearchIccid(i).state)if(Object(d["h"])("watchAutoSearch")>2&&(Object(d["l"])("watch_card"),Object(d["l"])("watchAutoSearch")),Object(d["h"])("watch_card_timestamp")){var s=Object(d["h"])("watch_card_timestamp"),n=(new Date).getTime();if(n>s){var r=(new Date).getTime()+6e4;Object(d["m"])("check_iccid",i),Object(d["m"])("watch_card_timestamp",r),this.processCheckIccid(i)}}else{this.iccid=i,Object(d["m"])("check_iccid",i);var o=(new Date).setTime((new Date).getTime()+6e4);Object(d["m"])("watch_card_timestamp",o),this.processCheckIccid(i)}else i&&Object(a["a"])({message:this.checkSearchIccid(i).msg});this.recording_show&&this.$nextTick(function(){var e=document.documentElement.clientHeight||document.body.clientHeight,t=c.$refs.ref_top.offsetHeight,i=c.$refs.ref_search.offsetHeight,s=c.$refs.ref_button.offsetHeight,n=c.$refs.recording_title.offsetHeight;c.$refs.main_recording.style.height=e-t-i-s-n-50+"px"})},methods:{testClick:function(){var c=this;"wechat"===this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(e){var t=e.resultStr;t.indexOf(",")>-1&&(t=t.substr(t.indexOf(",")+1,t.length)),c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)}}):"alipay"===this.client_type&&ap.scan(function(e){var t=e.code;c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)})},searchIccid:function(c){c?this.checkSearchIccid(c).state?this.processCheckIccid(c):Object(a["a"])({message:this.checkSearchIccid(c).msg}):Object(a["a"])({message:"请输入ICCID"})},processCheckIccid:function(c){var e=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),Object(h["b"])("/api/v1/app/new_auth/check_auth_",{iccid:c}).then(function(c){e.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1});var t=Object(d["h"])("watchAutoSearch");t&&(t++,Object(d["m"])("watchAutoSearch",t)),1===c.state?(Object(d["m"])("check_iccid",c.data.iccid),Object(d["m"])("new_auth_search_iccid",c.data.iccid),e.recordingIccid({iccid:c.data.iccid,realname:2!==c.data.status&&3!==c.data.status}),1===c.data.status?e.$router.push({path:"/mifi/card/index"}):2!==c.data.status&&3!==c.data.status||(Object(d["m"])("check_realNameSource",c.data.source),e.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):Object(a["a"])({message:c.msg})})},recordingIccid:function(c){var e=!1;this.recording_list.length?(this.recording_list.map(function(t,i){t.iccid===c.iccid&&(t.searchTime=Object(d["f"])().searchTime,t.millisecond=Object(d["f"])().millisecond,t.realname=c.realname,e=!0)}),e||this.recording_list.push({iccid:c.iccid,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond,realname:c.realname})):(this.recording_list.push({iccid:c.iccid,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond,realname:c.realname}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(d["m"])("recording_list",this.recording_list,"arr",!0)},scanIccid:function(){var c=this;"wechat"===this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(e){var t=e.resultStr;t.indexOf(",")>-1&&(t=t.substr(t.indexOf(",")+1,t.length)),c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)}}):"alipay"===this.client_type&&ap.scan(function(e){var t=e.code;c.iccid=t.replace(/\s*/g,""),c.processCheckIccid(c.iccid)})},inArray:function(c,e,t){return null==e?-1:e.indexOf(c,t)},compare:function(c){return function(e,t){var i=e[c],s=t[c];return s-i}},checkSearchIccid:function(c){return c?(c.length<19||c.length>20||"89"!=c.substr(0,2))&&13!=c.length&&11!=c.length&&15!=c.length&&16!=c.length?{state:0,msg:"ICCID有误,请检查"}:{state:1}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(c){for(var e=-1,t=0;t<this.recording_list.length;t++)if(this.recording_list[t].iccid===c){e=t;break}e>=0&&(this.recording_list.splice(e,1),Object(d["m"])("recording_list",this.recording_list,"arr")),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.$refs.iccidDom.focus(),this.showClearBtn=!1},iccidBlur:function(){this.showClearBtn=!1},debounce:function(c,e){var t,i=this;return function(){for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];t&&clearTimeout(t),t=setTimeout(function(){c.apply(i,n)},e)}}}},f=u,m=(t("72e8"),t("2877")),_=Object(m["a"])(f,s,n,!1,null,null,null);_.options.__file="lookup.vue";e["default"]=_.exports},d9ae:function(c,e,t){"use strict";var i=t("dca3"),s=t.n(i);s.a},dca3:function(c,e,t){}}]);
//# sourceMappingURL=mifi_card_lookup.a9b54792.js.map