<template>
    <div class="check-card-wrap">
        <div class="scanTop-wrap">
            <img src="../../assets/imgs/card/lookup/scanTop.png" alt="">
        </div>
        <div class="search-wrap">
            <input v-model="iccid" placeholder="扫码或手动输入iccid号或11位电话号" type="text">
            <span @click="scanIccid" class="iconfont icon-scan bounceIn animated"></span>
            <span class="icon-scanTip"></span>
        </div>
        <div class="btn-check-wrap">
            <button @click="searchIccid(iccid)">查询</button>
        </div>
        <div v-show="recording_show" class="recording-wrap">
            <p class="recording-title">
                <span>历史搜索记录</span>
                <span>{{recording_list.length}}条</span>
            </p>
            <ul class="recording-list-wrap">
                <li v-for="(item,index) in recording_list">
                    <span @click="searchIccid(item.iccid)">{{item.iccid}}</span>
                    <span>{{item.searchTime}}</span>
                    <span @click="deleteIccid(item.iccid)">&times</span>
                </li>
            </ul>
        </div><!--历史记录-->
        <van-popup :close-on-click-overlay="false" v-model="checkShow">
            <p class="showTip">正在检测中,请等候</p>
        </van-popup>
    </div>
</template>

<style lang="less">
    @import "../../assets/less/utitlies";
    @import "../../assets/less/common";

    .check-card-wrap {
        padding: 0 40px;
        .scanTop-wrap {
            padding: 35px 0 70px;
            text-align: center;
            img {
                display: block;
                width: 77%;
                margin: 0 auto;
                height: auto;
            }
        }
        .search-wrap {
            position: relative;
            display: flex;
            height: 80px;
            margin-bottom: 50px;
            align-items: center;
            border: 2px solid #38b5ed;
            border-radius: 7px;
            input {
                flex: 6;
                padding-left: 20px;
                font-size: 30px;
            }
            .icon-scan {
                font-size: 78px;
                color: #38b5ed;
                line-height: 1;
            }
            .icon-scanTip {
                position: absolute;
                top: -73px;
                right: 0;
                width: 221px;
                height: 73px;
                background-image: url("../../assets/imgs/card/lookup/scanTip.png");
                background-size: 100% 100%;
            }
        }
        .btn-check-wrap {
            padding-bottom: 50px;
            button {
                display: inline-block;
                width: 50%;
                height: 70px;
                line-height: 70px;
                font-size: 28px;
                color: #fff;
                background-color: #38b5ed;
                text-align: center;
                border-radius: 70px;
            }
        }
        .recording-wrap {
            background-color: #000;
            .recording-list-wrap {
                max-height: 260px;
                overflow: auto;
            }
            li {
                display: flex;
                padding: 20px;
                align-items: center;
                background-color: #fff;
                line-height: 1;
                font-size: 24px;
                border-bottom: 1px solid #f0f0f0;
                box-sizing: border-box;
                &:last-child {
                    border-bottom: none;
                }
                span {
                    &:first-child {
                        flex: 4;
                        text-align: left;
                    }
                    &:nth-child(2) {
                        flex: 2;
                        text-align: right;
                    }
                    &:last-child{
                        max-width: 20px;
                        font-size: 48px;
                        line-height: .5;
                        padding-left: 10px;
                        color: #e0e0e0;
                    }

                }
            }
        }
        .recording-title {
            display: flex;
            padding: 20px;
            background-color: #e8eefc;
            color: #5679bf;
            span {
                &:first-child {
                    flex: 4;
                    text-align: left;
                }
                &:last-child {
                    flex: 2;
                    text-align: right;
                }
            }
        }

    }
</style>


<script>
    // @ is an alias to /src
    import {setStorage, formatterCardTime, getStorage,getUrlParam,checkBrowser,codeParam} from '../../utilies'
    import {Popup , Notify} from 'vant'
    import {_post,_get} from "../../http";

    export default {
        name: "home",
        data() {
            return {
                state: '',//防跨域攻击
                userInfo:{}, //用户信息
                sort_recording_list: {}, // 排序查询列表
                recording_list: [],
                recording_show: false,
                iccid: '',
                checkShow: false,//查询遮罩
                client_type: '',//当前客户端环境 微信/支付宝
                appContext:'', //判断当前是否为app环境

            }
        },
        components: {
            [Popup.name]: Popup,
        },
        created() {

            if (checkBrowser() == 'wechat') {

                this.client_type = 'wechat';

            } else if (checkBrowser() == 'alipay') {

                this.client_type = 'alipay';
            }

            /*获取用户信息*/
            if ( this.client_type == 'wechat' || this.client_type == 'alipay' || this.appContext ) {

                if (getStorage('token')) {

                    this.getUserInfo().then(res => {
                        if (res.state==1) {

                            // this.showUser = true;
                            this.userInfo = getStorage('userInfo');

                            this.$store.commit('userInfo/changeUserStatus',true);
                            this.$store.commit('userInfo/changeUserInfo',this.userInfo);

                        }else if (!res.state) {
                            Notify({message: res.msg})
                        }
                    })

                } else {
                    if (getUrlParam('data')) {
                        setStorage('auth_data', getUrlParam('data'))
                    }
                    if (getStorage('auth_data')) {
                        /*
                        * 已授权操作 重定向后操作
                        * */
                        if (getStorage('state') == getUrlParam('state')) {
                            //解密data
                            _post('/accountCenter/v2/secret/decrypt?' + codeParam({}, 'post'), {
                                data: getStorage('auth_data')
                            }).then(res => {
                                if (res.error == 0) {
                                    this.decrypt_data = res.data.data;
                                    setStorage('decrypt_data', res.data.data);

                                    //login
                                    _post('/accountCenter/v2/auth/login?' + codeParam({}, 'post'), {
                                        uuid: res.data.data.openid,
                                        code: res.data.code
                                    }).then(res => {
                                        if (res.error == 0) {

                                            setStorage('token', res.data);//获取token

                                            this.getUserInfo().then(res => {
                                                if (res.state==1) {
                                                    // this.showUser = true
                                                    this.userInfo = getStorage('userInfo');

                                                    this.$store.commit('userInfo/changeUserStatus',true);
                                                    this.$store.commit('userInfo/changeUserInfo',this.userInfo);

                                                } else if(!res.state){
                                                    Notify({message: res.msg})
                                                }
                                            })

                                        } else if (res.error == '11002') {

                                           this.$emit('getToken')

                                        } else if (res.error == '30005' || res.error == '11003') {

                                            this.$store.commit('userInfo/changeUserStatus',false);

                                            this.$router.push({path:'/login'})

                                        } else {
                                            Notify({
                                                message: res.msg
                                            })
                                        }
                                    })
                                } else if (res.error == '11002') {

                                   this.$emit('getToken')

                                } else {

                                    Notify({
                                        message: res.msg
                                    })
                                }
                            })
                            // end 状态
                        }
                        /*
                       * end 已授权操作
                       * */
                    } else {
                        this.state = Math.random().toString(36).substr(2);
                        setStorage('state', this.state);
                        //授权
                        _get('/accountCenter/v2/oauth/authorize?' + codeParam({
                            client_type: this.client_type,
                            redirect_uri: 'http://cardserver-test.china-m2m.com',
                            scope: 'userinfo',
                            state: this.state
                        }, 'get'))
                            .then(res => {
                                if (res.error == 0) {

                                    location.href = res.data

                                } else if (res.error == '11002') {

                                   this.$emit('getToken')

                                } else {

                                    Notify({
                                        message: res.msg
                                    })
                                }
                            })
                    }
                }

            } else {
                // this.showUser = false;
                this.$store.commit('userInfo/changeUserStatus',false);

            }
            /*end 获取用户信息*/


            if(getStorage('check_iccid')){

                this.iccid = getStorage('check_iccid');
            }

            if (getStorage('recording_list')) {
                let local_recording_list = getStorage('recording_list')

                if(local_recording_list.length){

                    this.recording_list = local_recording_list;
                    this.recording_show = true
                }
            }


            let scanWatchCardIccid = getUrlParam('iccid') ||  getStorage('watch_card');


            if(scanWatchCardIccid && this.checkSearchIccid(scanWatchCardIccid).state==1){

                if(getStorage('watch_card_timestamp')){

                    var watch_card_timestamp = getStorage('watch_card_timestamp')
                    var cur_date = new Date().getTime();

                    if(cur_date>watch_card_timestamp){
                        let setTime  = new Date().getTime()+(1*60*1000);
                        setStorage('check_iccid',scanWatchCardIccid)
                        setStorage('watch_card_timestamp',setTime);
                        this.processCheckIccid(scanWatchCardIccid);//自动查询
                    }else{
                        let isWatchCardResult  = checkICCID(scanWatchCardIccid);
                        if(isWatchCardResult.state){
                            this.iccid = scanWatchCardIccid
                        }else{
                            Notify({message:isWatchCardResult.msg})
                        }
                    }
                }else{
                    this.iccid = scanWatchCardIccid;
                    setStorage('check_iccid',scanWatchCardIccid)
                    let setTime  = new Date().setTime(new Date().getTime()+1*60*1000);
                    setStorage('watch_card_timestamp',setTime);

                    this.processCheckIccid(scanWatchCardIccid);//自动查询
                }

            }else{
               if(scanWatchCardIccid){
                   Notify({message:this.checkSearchIccid(scanWatchCardIccid).msg});
               }
            }
        },
        methods: {

            getUserInfo() {
                //获取用户信息
                return new Promise((resolve, reject) => {
                    _get("/accountCenter/v2/user/info?" + codeParam({}, 'get'))
                        .then(res => {
                            if (res.error == 0) {
                                let UserInfo = {
                                    account: res.data.account,
                                    avatar: res.data.avatar,
                                    nickname: res.data.nickname
                                }
                                setStorage('userInfo', UserInfo);

                                this.$store.dispatch('invokeChange',UserInfo);
                                this.$store.dispatch('invokeUserStatus',true);

                                resolve({
                                    state: 1,
                                    msg: '获取用户信息成功'
                                })
                            } else if (res.error == "11002") {

                               this.$emit('getToken')

                            } else {
                                resolve({
                                    state: 0,
                                    msg: res.msg
                                })
                            }
                        }).catch(err => {
                        resolve({
                            state: 0,
                            msg: '服务开小差啦,请稍后再试'
                        })
                    })
                })

            },// 获取用户信息

            searchIccid: function (iccid) {
                if (!iccid) {
                    Notify({message:'请输入ICCID'});
                    return
                }
                if (!this.checkSearchIccid(iccid).state) {
                    Notify({message:this.checkSearchIccid(iccid).msg});
                    return
                }
                this.processCheckIccid(iccid);
            },
            processCheckIccid: function (iccid) {
                this.checkShow = true
                let isExist = false,
                    _this = this;
                if (this.recording_list.length) {

                    this.recording_list.map(function (item, index) {
                        if (item.iccid == iccid) {
                            item.searchTime = formatterCardTime().searchTime
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        this.recording_list.push({
                            'iccid': iccid,
                            'searchTime': formatterCardTime().searchTime,
                            'millisecond': formatterCardTime().millisecond
                        })
                    }
                } else {
                    this.recording_list.push({
                        'iccid': iccid,
                        'searchTime': formatterCardTime().searchTime,
                        'millisecond': formatterCardTime().millisecond
                    })
                    this.recording_show = true;
                }

                this.recording_list.sort(this.compare('millisecond'));

                if(this.recording_list.length>20){
                    this.recording_list.splice(20)
                }

                setStorage('recording_list', this.recording_list)

                //查询
                _post('/api/v1/app/new_auth/check_auth_',{
                    iccid:iccid,
                }).then(res=>{
                    if(!res.state){
                        Notify({
                            message:res.msg
                        })
                        _this.checkShow = false
                    }else{
                        setStorage('check_iccid',iccid);
                       if(res.data.status==1){
                           _this.$router.push({path:'/card/usage'});
                       }else if(res.data.status==2){
                           setStorage('check_realNameSource',res.data.source)
                           _this.$router.push({path:'/new_card/real_name'});
                       }else if(res.data.status==3){
                           _this.$router.push({path:'/card/plan_list'});
                       }
                    }
                })

            },

            scanIccid(){
                let _this = this;

                if(this.client_type=='wechat'){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            if(result &&( result.length==19 || result.length==20 )){
                                _this.iccid = (result.replace(/[^0-9]*/g, ""));
                                _this.processCheckIccid(_this.iccid)
                            }else{
                                Notify({message:'请扫描正确的ICCID'});
                            }
                        }
                    });
                }else if(this.client_type=='alipay'){

                    ap.scan(function(res){
                        var result = res.code; // 当needResult 为 1 时，扫码返回的结果

                        _this.iccid = (result.replace(/[^0-9]*/g, ""));
                        _this.processCheckIccid(_this.iccid)
                    });
                }
            },
            inArray: function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf(elem, i);
            },
            compare: function (property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            },
            checkSearchIccid:function (iccid) {
                if(!iccid){
                    return {
                        state:0,
                        msg:'请输入ICCID'
                    }
                }
                if ((iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) != "89") && (iccid.length != 13 && iccid.length != 11 && iccid.length != 15 && iccid.length != 16)) {
                    return{
                        state:0,
                        msg:'ICCID有误,请检查'
                    };
                }
                return{
                    state:1
                }
            },
            deleteIccid:function (iccid) {
                let deleteIndex = -1 ;
                for(let i = 0;i<this.recording_list.length;i++){
                    if(this.recording_list[i].iccid==iccid){
                        deleteIndex = i
                        break
                    }
                }
                if(deleteIndex>=0){
                    this.recording_list.splice(deleteIndex,1);
                    setStorage('recording_list',this.recording_list);
                }

                if(!this.recording_list.length){
                    this.recording_show = false
                }
            }
        }

    };
</script>

