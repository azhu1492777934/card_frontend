(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["helpCenter"],{"027a":function(t,e,i){"use strict";var n=i("ae90"),a=i.n(n);a.a},"6d7d":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"helpCenter"},t._l(t.itemsList,function(e,n){return i("div",{key:n,staticClass:"items"},[i("div",{on:{click:function(e){t.showCurrent(n,t.activeType)}}},[i("div",{class:{activated:t.activated==n&&t.activeType}}),i("div",[t._v(t._s(e.title))])]),t.activated==n&&t.activeType?i("div",[i("van-collapse",{attrs:{accordion:""},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(e.childTitle,function(e,n){return i("van-collapse-item",{key:n,attrs:{title:e.title,name:n+1}},[t._v("\n              "+t._s(e.content)+"\n            ")])}))],1):t._e()])}))},a=[],c=(i("68ef"),i("bff0"),i("8624")),s=i("fe7e"),l=i("3583"),o=i("f331"),r=Object(s["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:[t.b(),{"van-hairline--top":t.index}]},[i("cell",t._b({class:t.b("title",{disabled:t.disabled,expanded:t.expanded}),on:{click:t.onClick}},"cell",t.$props,!1),[t._t("title",null,{slot:"title"}),t._t("icon",null,{slot:"icon"}),t._t("value"),t._t("right-icon",null,{slot:"right-icon"})],2),t.inited?i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],ref:"wrapper",class:t.b("wrapper"),on:{transitionend:t.onTransitionEnd}},[i("div",{ref:"content",class:t.b("content")},[t._t("default")],2)]):t._e()],1)},name:"collapse-item",mixins:[l["a"],o["a"]],props:{name:[String,Number],disabled:Boolean,isLink:{type:Boolean,default:!0}},data:function(){return{show:null,inited:null}},computed:{items:function(){return this.parent.items},index:function(){return this.items.indexOf(this)},currentName:function(){return this.isDef(this.name)?this.name:this.index},expanded:function(){var t=this;if(!this.parent)return null;var e=this.parent.value;return this.parent.accordion?e===this.currentName:e.some(function(e){return e===t.currentName})}},created:function(){this.findParent("van-collapse"),this.items.push(this),this.show=this.expanded,this.inited=this.expanded},destroyed:function(){this.items.splice(this.index,1)},watch:{expanded:function(t,e){var i=this;null!==e&&(t&&(this.show=!0,this.inited=!0),this.$nextTick(function(){var e=i.$refs,n=e.content,a=e.wrapper;if(n&&a){var s=n.clientHeight+"px";a.style.height=t?0:s,Object(c["a"])(function(){a.style.height=t?s:0})}}))}},methods:{onClick:function(){if(!this.disabled){var t=this.parent,e=t.accordion&&this.currentName===t.value?"":this.currentName,i=!this.expanded;this.parent.switch(e,i)}},onTransitionEnd:function(){this.expanded?this.$refs.wrapper.style.height=null:this.show=!1}}}),u=Object(s["a"])({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"van-hairline--top-bottom",class:t.b()},[t._t("default")],2)},name:"collapse",props:{accordion:Boolean,value:[String,Number,Array]},data:function(){return{items:[]}},methods:{switch:function(t,e){this.accordion||(t=e?this.value.concat(t):this.value.filter(function(e){return e!==t})),this.$emit("change",t),this.$emit("input",t)}}}),d=[{title:"设备使用和充值问题",childTitle:[{title:"1、充值的流量可以退吗？",content:"答：不管是带套餐购买还是自助充值，30天内可以申请退流量。超过30天则不可退流量，退流量规则为：9元/G，不足1G按1G计算，最高可以退79元。比如：A用户充值了3个月流量，使用15天后要申请退流量，设备用了6G（不足1G按1G计算），则扣A用户9X6=54元。"},{title:"2、如何申请退流量呢？",content:"答：用户可以联系网销平台（卖家）售后客服，报备设备iccid号申请退流量，也可以打开物联网通信运营商微信公众号，点击在线客服，申请退流量。"},{title:"3、退流量流程是什么？多久可以到账？",content:"答：用户如需要退流量，先联系总部或网销卖家，报备设备的iccid号，按照退流量规则计算，用户自助充值的流量资费，原路退回用户账户，带套餐购买的由卖家退款至用户，一般1-3个工作日会退回。"},{title:"4、新讯MiFi的有流量使用规则吗？",content:"答：新讯MiFi只限个人使用，禁止长时间下载和BT传输，禁止商业用途，新讯MiFi每月最高可用527GB，当天可用17GB，不限速，当月超过70GB时，采取7*5*5规则，即当天用网7GB时，断网2小时，2小时恢复后可用5GB，再断网2小时，一共为17GB。"},{title:"5、527套餐有时候不够用，有其他的加油包可以充值吗？",content:"答：有，你可选择购买小流量套餐，有3G，10G等小套餐。"},{title:"6、我刚充值了1个月流量套餐，还没有到期又充值了12个月，请问流量有效期怎么计算的？",content:"答：复充流量会叠加，看选择的生效时间计算，建议流量到期后27日充值。"},{title:"7、新讯MiFi支持跨境吗？",content:"答：新讯MiFi只限国内使用，暂不支持港澳台和跨境使用。"}]},{title:"设备故障问题",childTitle:[{title:"1、有时候网速很慢，怎么回事？",content:"答：新讯MiFi为联通卡，网速很慢，有很多种情况：一、当地4G信号弱，可以通过设备查看4G信号标识，小于2格表示当前4G信号弱，你可以关机移动500-1000米的位置，重启设备再连网；二、新讯MiFi和上网设备距离较远，距离最好不要超过15米，越近信号会越好，且不要有墙面或障碍物阻隔；三、用网人数过多，长时间传输和下载会降低网速，可以断开其他设备，再观察网速情况；四、用网高峰期，4G信号资源紧缺，新讯MiFi为可以移动数据终端，用网高峰期会降低网速，避开人流多的地方，移动位置重新开机。"},{title:"2、我的设备无法开机，是什么原因呢？",content:"答：请查看设备电量是否小于5%，电量过低无法开机，请在关机状态充电20分钟后再开机，正常充电时电池灯会闪烁红灯，充满后转为蓝色并常亮。"},{title:"3、我的设备电池充不进电。",content:"答：电池充不进电，有可能是数据线的问题，请检查USB接口，请使用配套适配器，标准为输入电压：5V，电流：1.5A，如果是设备端的接口损坏，建议返厂维修。"},{title:"4、我的设备续航时间没有产品说明书上的时间久，怎么回事？",content:"答：设备续航时间根据用网情况和人数来决定，长时间下载或者BT传输，用网人数越多，则续航时间越少，一般情况下，一个人使用都会达到理想的续航时间。"},{title:"5、如何保护电池寿命？",content:"答：切勿充电边用，边充电边用会大量损耗电池寿命，要时常关注设备电量，当设备的电量低于10%时，立即充电，不要等到设备电量耗尽，自动关机状态再充电。"},{title:"6、我的设备读取不到SIM卡？",content:"答：读取不到SIM卡，有可能设备在移动或者拿放过程中卡座松动，建议取卡再安装一次，如仍不能读取SIM卡，请联系客服刷新或换卡。"},{title:"7、新讯MiFi经常断网，怎么回事？",content:"答：信号弱，或者无信号覆盖，所在的位置没有4G基站，或者处于基站的边缘，设备可能死机或者卡死，建议长按开关键关机，过5分钟开机再连网。"},{title:"8、新讯MiFi发烫是属于正常情况吗？发烫会有影响吗？",content:"答：设备发烫是属于正常情况，因用网时间长，或者用网人数多，用一段时间会发烫，设备发烫会导致断网或者自动关机，一旦出现设备发烫，建议暂停下载和传输，关闭上网设备WiFi，关机5分钟再开启。"},{title:"9、设备的屏幕不亮或者花屏？",content:"答：设备屏幕不亮或者花屏，可能是在设备使用过程中不当造成，建议用户联系卖家，可以换新和返厂维修。"}]},{title:"SIM卡和WiFi问题",childTitle:[{title:"1、忘记WiFi名称和密码怎么办？",content:"答：请详细阅读设备使用说明书，浏览器打开http://192.168.0.1网址，恢复出厂设置，恢复后关机重启，输入默认的密码即可。"},{title:"2、如何更改设备的热点名称和密码？",content:"答：请详细阅读设备使用说明书，浏览器打开http://192.168.0.1网址进行更改。"},{title:"3、找不到WiFi热点？",content:"答：是否更改或隐藏了WiFi热点，浏览器打开http://192.168.0.1进行查看是否隐藏，检查当地信号或SIM卡，联系客服刷新。"},{title:"4、新讯MiFi可以直接连接台式电脑吗？",content:"答、可以，用USB接口数据线连接设备和电脑，打开设备，屏幕亮起后，安装“MravellDIAGUSBDevice”驱动，可以通过混合模式连接电脑和WiFi设备。"},{title:"5、新讯MiFi可以配其他的卡吗？",content:"答：不可以，新讯MiFi为一体机，自带流量卡，卡已经内置在设备中，如果要配其他的卡，一切因SIM卡导致的设备故障、网络问题均和厂商无关。"},{title:"6、新讯MiFi内置的卡可以用在手机上吗？",content:"答：不可以，新讯MiFi内置的SIM卡为物联网流量卡，不能用于手机终端。"},{title:"7、新讯MiFi限速吗？",content:"答：不限速，全程4G高速网络，下行理论值达150Mbps，上行理论值达50Mbps，如果网速不稳定请查看当地4G信号或是否有4G信号覆盖。"},{title:"8、如何管理和查看自己的流量使用情况？",content:"答：打开物联网通信运营商微信公众号，首次输入iccid号会默认设备，点击可以查看流量总套餐和剩余流量。"}]},{title:"售后服务问题",childTitle:[{title:"1、你们的售后政策是怎样的？",content:"答：不管在你哪里购买的新讯MiFi，只要满足条件都可以享受“30天内无理由退货、一年换新、2年保修”服务，售后直接联系卖家即可。"},{title:"2、我要出国一段时间，新讯MiFi有一段时间不用，可以暂停流量吗？",content:"答：不可以，流量一旦开通，将不能暂停，可以关闭流量，但不能延长有效期天数。"},{title:"3、我的新讯MiFi丢了怎么办？卡内的流量还有效吗？",content:"答：如果新讯MiFi不小心被盗或丢了，建议购买新设备，收到设备后联系总部客服或卖家，报备iccid号，可以将之前的设备流量转移到新设备上。"},{title:"4、如何联系总部客服？",content:"答、关注物联网通信运营商微信公众号，点击菜单在线客服，客服值班时间为周一至周日：09:00-24:00在线为你服务。"},{title:"5、我的新讯MiFi开不了机，确认是设备坏了，如何维修？",content:"答：如果确认设备已经非人为因素而导致的设备故障，2年内可以申请保修服务，用户先联系总部客服或卖家售后，告知返厂收件信息后，用户用纸条写清楚姓名、电话、地址、设备故障邮寄回深圳总部，总部收到后登记，收到设备后3个工作日邮寄设备给用户。"},{title:"6、返厂维修的收件地址、联系人和电话？",content:"答：地址：广东深圳石岩街道办石龙仔一路森海诺科创大厦4楼，收件人：韩双双（总部售后）电话：13227530017。"},{title:"7、保修期间返厂维修收费吗？邮费怎么算？",content:"答：、2年内设备返修期间是免费的，如果是电池和主板坏了，（售后会电话通知用户）需要购买电池和主板，按成本价计算（具体价格以产品为准）如果需要翻新，换外观、配件和包装，统一标准为30元/套，邮费采取谁邮寄，谁出邮费的政策。"}]}],h=d,p={data:function(){return{itemsList:h,activated:0,activeName:"",activeType:!1}},components:{vanCollapse:u,vanCollapseItem:r},created:function(){},methods:{showCurrent:function(t){this.activated==t?this.activeType=!this.activeType:(this.activeType=!0,this.activated=t)}}},f=p,v=(i("027a"),i("2877")),m=Object(v["a"])(f,n,a,!1,null,null,null);m.options.__file="helpCenter.vue";e["default"]=m.exports},8624:function(t,e,i){"use strict";(function(t){i.d(e,"a",function(){return o});var n=i("a142"),a=Date.now();function c(t){var e=Date.now(),i=Math.max(0,16-(e-a)),n=setTimeout(t,i);return a=e+i,n}var s=n["e"]?t:window,l=s.requestAnimationFrame||s.webkitRequestAnimationFrame||c;s.cancelAnimationFrame||s.webkitCancelAnimationFrame||s.clearTimeout;function o(t){return l.call(s,t)}}).call(this,i("c8ba"))},ae90:function(t,e,i){},bff0:function(t,e,i){},f331:function(t,e,i){"use strict";e["a"]={data:function(){return{parent:null}},methods:{findParent:function(t){var e=this.$parent;while(e){if(e.$options.name===t){this.parent=e;break}e=e.$parent}}}}}}]);
//# sourceMappingURL=helpCenter.99fad990.js.map