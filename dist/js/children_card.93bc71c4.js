(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["children_card"],{"24b9":function(c,i,e){c.exports=e.p+"img/scanTop.5a342865.png"},"2f94":function(c,i,e){},"4e3c":function(c,i,e){"use strict";var t=function(){var c=this,i=c.$createElement,e=c._self._c||i;return e("div",{staticClass:"btn-wrap"},[e("button",{class:{disabled:c.btnState},attrs:{disabled:c.btnState},on:{click:c.clickThrotle}},[c._v("\n    "+c._s(c.btnText)+"\n    ")])])},s=[],n={name:"btn-common",props:{btnText:{type:String}},data:function(){return{btnState:!1,timer:null}},created:function(){},methods:{clickThrotle:function(){var c=this;this.$emit("clickThrotle"),this.btnState=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){c.btnState=!1},2e3)}}},a=n,r=(e("d9ae"),e("2877")),o=Object(r["a"])(a,t,s,!1,null,null,null);o.options.__file="index.vue";i["a"]=o.exports},"9d51":function(c,i,e){"use strict";var t=e("2f94"),s=e.n(t);s.a},a481:function(c,i,e){e("214f")("replace",2,function(c,i,e){return[function(t,s){"use strict";var n=c(this),a=void 0==t?void 0:t[i];return void 0!==a?a.call(t,n,s):e.call(String(n),t,s)},e]})},acde:function(c,i,e){"use strict";e.r(i);var t,s=function(){var c=this,i=c.$createElement,e=c._self._c||i;return e("div",{staticClass:"check-card-wrap"},[c._m(0),e("p",{staticClass:"search_title"},[c._v("请扫描或输入您的ICCID,我们将为您查询您的儿童手表卡卡机号～")]),e("div",{staticClass:"search-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:c.iccid,expression:"iccid"}],ref:"iccidDom",attrs:{placeholder:"扫码或手动输入iccid号或11位电话号",type:"text"},domProps:{value:c.iccid},on:{focus:c.handleIccidFocus,blur:function(i){return i.preventDefault(),c.iccidBlur(i)},input:function(i){i.target.composing||(c.iccid=i.target.value)}}}),e("span",{directives:[{name:"show",rawName:"v-show",value:c.showClearBtn,expression:"showClearBtn"}],staticClass:"clearIccid",on:{click:c.clearInputIccid}},[c._v("×")]),e("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=c.client_type,expression:"client_type!='app'"}],staticClass:"iconfont icon-scan bounceIn animated",on:{click:c.scanIccid}}),e("span",{directives:[{name:"show",rawName:"v-show",value:"app"!=c.client_type,expression:"client_type!='app'"}],staticClass:"icon-scanTip"})]),e("div",{staticClass:"btn-check-wrap"},[e("card-button",{attrs:{btnText:"查询"},on:{clickThrotle:function(i){c.searchIccid(c.iccid)}}})],1),e("div",{directives:[{name:"show",rawName:"v-show",value:c.recording_show,expression:"recording_show"}],staticClass:"recording-wrap"},[e("p",{staticClass:"recording-title"},[e("span",[c._v("历史搜索记录")]),e("span",[c._v(c._s(c.recording_list.length)+"条")])]),e("ul",{staticClass:"recording-list-wrap"},c._l(c.recording_list,function(i,t){return e("li",[e("span",{on:{click:function(e){c.searchIccid(i.iccid)}}},[c._v(c._s(i.iccid))]),e("span",[c._v(c._s(i.searchTime))]),e("span",{on:{click:function(e){c.deleteIccid(i.iccid)}}},[c._v("×")])])}))]),e("van-popup",{attrs:{"close-on-click-overlay":!1},model:{value:c.checkShow,callback:function(i){c.checkShow=i},expression:"checkShow"}},[e("p",{staticClass:"showTip"},[c._v("正在查询手表卡，请等候")])])],1)},n=[function(){var c=this,i=c.$createElement,t=c._self._c||i;return t("div",{staticClass:"scanTop-wrap"},[t("img",{attrs:{src:e("24b9"),alt:""}})])}],a=(e("a481"),e("55dd"),e("9a83"),e("f564")),r=e("a322"),o=(e("e17f"),e("2241")),l=(e("7f7f"),e("8a58"),e("e41f")),d=e("35df"),h=e("db04"),u=e("4e3c"),p={name:"home",data:function(){return{sort_recording_list:{},recording_list:[],recording_show:!1,iccid:"",checkShow:!1,client_type:Object(d["c"])(),showClearBtn:!1}},components:(t={},Object(r["a"])(t,l["a"].name,l["a"]),Object(r["a"])(t,o["a"].name,o["a"]),Object(r["a"])(t,"cardButton",u["a"]),t),created:function(){var c=this;if(Object(d["h"])("recording_list","arr")){var i=Object(d["h"])("recording_list","arr");i.length&&(this.recording_list=i,this.recording_show=!0)}Object(d["h"])("new_auth_search_iccid")?this.iccid=Object(d["h"])("new_auth_search_iccid"):Object(d["h"])("check_iccid")&&(this.iccid=Object(d["h"])("check_iccid")),this.$watch("iccid",this.debounce(function(){c.handleIccidFocus()},500))},methods:{searchIccid:function(c){c?this.checkSearchIccid(c).state?this.processCheckIccid(c):Object(a["a"])({message:this.checkSearchIccid(c).msg}):Object(a["a"])({message:"请输入ICCID"})},processCheckIccid:function(c){var i=this;this.checkShow=!0;var e=!1;this.recording_list.length?(this.recording_list.map(function(i,t){i.iccid==c&&(i.searchTime=Object(d["f"])().searchTime,i.millisecond=Object(d["f"])().millisecond,e=!0)}),e||this.recording_list.push({iccid:c,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond})):(this.recording_list.push({iccid:c,searchTime:Object(d["f"])().searchTime,millisecond:Object(d["f"])().millisecond}),this.recording_show=!0),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(d["m"])("recording_list",this.recording_list,"arr"),Object(h["b"])("/api/v1/app/search_mobile",{iccid:c}).then(function(e){i.checkShow=!1,1==e.state?(Object(d["m"])("check_iccid",e.data.iccid),Object(d["m"])("new_auth_search_iccid",c),"89"==e.data.msisdn.substr(0,2)?o["a"].alert({message:"手表手机号："+e.data.msisdn.substring(2,e.data.msisdn.length)}):o["a"].alert({message:"手表手机号："+e.data.msisdn})):Object(a["a"])({message:e.msg})})},scanIccid:function(){var c=this;"wechat"==this.client_type?this.wx.scanQRCode({needResult:1,scanType:["barCode","qrCode"],success:function(i){var e=i.resultStr;!e||19!=e.length&&20!=e.length?Object(a["a"])({message:"请扫描正确的ICCID"}):(c.iccid=e.replace(/[^0-9]*/g,""),c.processCheckIccid(c.iccid))}}):"alipay"==this.client_type&&ap.scan(function(i){var e=i.code;c.iccid=e.replace(/[^0-9]*/g,""),c.processCheckIccid(c.iccid)})},inArray:function(c,i,e){return null==i?-1:i.indexOf(c,e)},compare:function(c){return function(i,e){var t=i[c],s=e[c];return s-t}},checkSearchIccid:function(c){return c?c.length<19||c.length>20||"89"!=c.substr(0,2)?{state:0,msg:"ICCID有误,请检查"}:{state:1}:{state:0,msg:"请输入ICCID"}},deleteIccid:function(c){for(var i=-1,e=0;e<this.recording_list.length;e++)if(this.recording_list[e].iccid==c){i=e;break}i>=0&&(this.recording_list.splice(i,1),Object(d["m"])("recording_list",this.recording_list,"arr")),this.recording_list.length||(this.recording_show=!1)},handleIccidFocus:function(){this.iccid?this.showClearBtn=!0:this.showClearBtn=!1},clearInputIccid:function(){this.iccid="",this.showClearBtn=!1,this.$refs.iccidDom.focus()},iccidBlur:function(){this.showClearBtn=!1},debounce:function(c,i){var e,t=this;return function(){for(var s=arguments.length,n=new Array(s),a=0;a<s;a++)n[a]=arguments[a];e&&clearTimeout(e),e=setTimeout(function(){c.apply(t,n)},i)}}}},m=p,f=(e("9d51"),e("2877")),_=Object(f["a"])(m,s,n,!1,null,null,null);_.options.__file="index.vue";i["default"]=_.exports},d9ae:function(c,i,e){"use strict";var t=e("dca3"),s=e.n(t);s.a},dca3:function(c,i,e){}}]);
//# sourceMappingURL=children_card.93bc71c4.js.map