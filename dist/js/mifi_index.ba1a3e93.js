(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mifi_index"],{"0155":function(i,e,t){},8073:function(i,e,t){"use strict";var c=t("0155"),a=t.n(c);a.a},ab68:function(i,e,t){"use strict";t.r(e);var c=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div")},a=[],r=(t("55dd"),t("a322")),n=(t("7f7f"),t("9a83"),t("f564")),s=t("35df"),d=t("db04"),o={name:"index",data:function(){return{recording_list:Object(s["j"])("recording_list","arr")||[],iccid:"",client_type:Object(s["d"])()}},components:Object(r["a"])({},n["a"].name,n["a"]),created:function(){if("wechat"==this.client_type||"alipay"==this.client_type){if(Object(s["j"])("token"))if(Object(s["j"])("check_iccid")){this.iccid=Object(s["j"])("check_iccid");var i=this.checkAllCardStatus();1==i.state?this.$router.push({path:"/mifi/card/index"}):this.checkIccid(this.iccid)}else this.$router.push({path:"/mifi/card/lookup"})}else this.$router.push("/mifi/card/lookup")},methods:{checkIccid:function(i){var e=this;this.$store.commit("mifiCommon/changeLoadingStatus",{flag:!0}),Object(d["b"])("/api/v1/app/new_auth/check_auth_",{iccid:i}).then(function(t){e.$store.commit("mifiCommon/changeLoadingStatus",{flag:!1}),1==t.state?(Object(s["p"])("check_iccid",t.data.iccid),Object(s["p"])("new_auth_search_iccid",i),e.recordingIccid({iccid:t.data.iccid,realname:2!=t.data.status&&3!=t.data.status}),1==t.data.status?e.$router.push({path:"/mifi/card/index"}):2!=t.data.status&&3!=t.data.status||(Object(s["p"])("check_realNameSource",t.data.source),e.$router.push({path:"/weixin/new_card/real_name",query:{from:"mifi"}}))):e.$router.push({path:"/mifi/card/lookup"})})},checkAllCardStatus:function(){var i;if(this.recording_list.length<=1)return{state:0};for(var e=0;e<this.recording_list.length;e++)if(this.recording_list[e].realname){i=this.recording_list[e].iccid;break}return i?{state:1,iccid:i}:void 0},compare:function(i){return function(e,t){var c=e[i],a=t[i];return a-c}},recordingIccid:function(i){var e=!1;this.recording_list.length?(this.recording_list.map(function(t,c){t.iccid==i.iccid&&(t.searchTime=Object(s["h"])().searchTime,t.millisecond=Object(s["h"])().millisecond,t.realname=i.realname,e=!0)}),e||this.recording_list.push({iccid:i.iccid,searchTime:Object(s["h"])().searchTime,millisecond:Object(s["h"])().millisecond,realname:i.realname})):this.recording_list.push({iccid:i.iccid,searchTime:Object(s["h"])().searchTime,millisecond:Object(s["h"])().millisecond,realname:i.realname}),this.recording_list.sort(this.compare("millisecond")),this.recording_list.length>20&&this.recording_list.splice(20),Object(s["p"])("recording_list",this.recording_list,"arr")}}},h=o,l=(t("8073"),t("2877")),u=Object(l["a"])(h,c,a,!1,null,"bbe2a468",null);u.options.__file="mifi_index.vue";e["default"]=u.exports}}]);
//# sourceMappingURL=mifi_index.ba1a3e93.js.map