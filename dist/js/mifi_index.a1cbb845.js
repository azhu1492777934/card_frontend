(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_index"],{"708d":function(i,e,t){},9436:function(i,e,t){"use strict";var c=t("708d"),a=t.n(c);a.a},ab68:function(i,e,t){"use strict";t.r(e);var c=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div")},a=[],r=(t("55dd"),t("35df")),s=t("db04"),n={name:"index",data:function(){return{recording_list:Object(r["h"])("recording_list","arr")||[],iccid:"",client_type:Object(r["c"])()}},created:function(){if("wechat"==this.client_type||"alipay"==this.client_type){if(Object(r["h"])("token"))if(Object(r["h"])("check_iccid")){this.iccid=Object(r["h"])("check_iccid");var i=this.checkAllCardStatus();1==i.state?this.$router.push({path:"/mifi/card/index"}):this.checkIccid(this.iccid)}else this.$router.push({path:"/mifi/card/lookup"})}else this.$router.push("/mifi/card/lookup")},methods:{checkIccid:function(i){var e=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),Object(s["b"])("/api/v1/app/new_auth/check_auth_",{iccid:i}).then(function(t){e.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==t.state?(Object(r["m"])("check_iccid",t.data.iccid),Object(r["m"])("new_auth_search_iccid",i),e.recordingIccid({iccid:t.data.iccid,realname:2!=t.data.status&&3!=t.data.status}),1==t.data.status?e.$router.push({path:"/mifi/card/index"}):2!=t.data.status&&3!=t.data.status||(Object(r["m"])("check_realNameSource",t.data.source),e.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):Notify({message:t.msg})})},checkAllCardStatus:function(){var i;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){i=this.recording_list[e].iccid;break}return i?{state:1,iccid:i}:void 0},compare:function(i){return function(e,t){var c=e[i],a=t[i];return a-c}},recordingIccid:function(i){var e=!1;this.recording_list.length?(this.recording_list.map(function(t,c){t.iccid==i.iccid&&(t.searchTime=Object(r["f"])().searchTime,t.millisecond=Object(r["f"])().millisecond,t.realname=i.realname,e=!0)}),e||this.recording_list.push({iccid:i.iccid,searchTime:Object(r["f"])().searchTime,millisecond:Object(r["f"])().millisecond,realname:i.realname})):this.recording_list.push({iccid:i.iccid,searchTime:Object(r["f"])().searchTime,millisecond:Object(r["f"])().millisecond,realname:i.realname}),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(r["m"])("recording_list",this.recording_list,"arr")}}},d=n,o=(t("9436"),t("2877")),h=Object(o["a"])(d,c,a,!1,null,"a2fa5772",null);h.options.__file="mifi_index.vue";e["default"]=h.exports}}]);
//# sourceMappingURL=mifi_index.a1cbb845.js.map