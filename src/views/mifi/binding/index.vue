<template>
    <div class="binding-wrap">
        <div class="userInfo">
            <div class="table-cell">
                <img :src="userInfo.headimgurl" alt="头像">
                <p>欢迎你，{{userInfo.nickname}}</p>
            </div>
        </div>
        <div class="info-wrap">
            <div class="iccid-wrap">
                <input type="text" placeholder="请输入您的ICCID号" v-model="iccid">
            </div>
            <div class="phone-wrap">
                <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone"/>
            </div>
            <div class="code-wrap">
                <input type="number" placeholder="请输入验证码" maxlength="10" v-model="code"/>
                <button :disabled="btnCode_disabled" class="getCode"  @click="getCode">{{codeText}}</button>
            </div>
            <div class="btn-login-wrap">
                <button :disabled="loginDisabled" @click="login">绑定</button>
            </div>
        </div>
        <van-popup :close-on-click-overlay="false" v-model="isLoginError">
            <p class="showTip">{{loginErrorMsg}}</p>
        </van-popup>
    </div>
</template>

<script>
    import {Notify,Popup} from 'vant'
    import {_post,_get} from "../../../http";
    import {getStorage, getUrlParam, setStorage,codeParam, checkBrowser,checkICCID} from "../../../utilies";

    export default {
        data() {
            return {
                userInfo:getStorage('decrypt_data','obj') || {
                    headimgurl:require('../../../assets/imgs/mifi/common/avatar.jpeg'),
                    nickname:'yoyoyo~'
                } ,
                load_user_msg:false,
                iccid:'',
                decrypt_data: {},//用户数据
                phone: '',
                code: '',
                codeText: "获取验证码",
                countdown: 60,
                client_type: checkBrowser(),
                btnCode_disabled:true,
                time:null,
                loginDisabled:false,
                isLoginError:false, // 当前用户是否会绑定用户失败
                loginErrorMsg:'', // 绑定失败信息
                checkInfo:{
                    iccid:false,
                    phone:false
                }
            }
        },
        components: {
            [Notify.name]: Notify,
            [Popup.name] : Popup
        },
        watch:{
            iccid(curVal,oldVal){
                let checkIccidResult = checkICCID(curVal);
                checkIccidResult.state==1 ? this.checkInfo.iccid = true : this.checkInfo.iccd = false;
                (this.checkInfo.iccid && this.checkInfo.phone) ? this.btnCode_disabled = false : this.btnCode_disabled = true
            },
            phone(curVal,oldVal){
                let checkPhoneResult = /^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(curVal);
                checkPhoneResult ? this.checkInfo.phone = true : this.checkInfo.phone = false;
                (this.checkInfo.iccid && this.checkInfo.phone) ? this.btnCode_disabled = false : this.btnCode_disabled = true
            }
        },
        created() {
            //获取用户信息
            this.decrypt_data = getStorage('decrypt_data','obj');
        },
        methods: {
            login() {
                if (this.phone == '' && this.code == '') {
                    Notify({message: '请填写您的登录信息'})
                    return
                } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)) {
                    Notify({message: '您的手机号码有误'})
                    return
                } else {
                    this.loginDisabled = true;
                    _post("/accountCenter/v2/user/bind?" + codeParam({},'post'), {
                        mobile: this.phone,
                        code: this.code,
                        from: this.client_type,
                        uuid: this.decrypt_data.openid,
                        nickname: this.decrypt_data.nickname,
                        gender: this.decrypt_data.sex,
                        avatar: this.decrypt_data.headimgurl
                    }).then((res) => {
                        this.loginDisabled = false;
                        if (res.error == 0 || res.error == 30002) {

                            if(res.error==0){
                                setStorage("token", res.data);
                            }
                            this.getUserInfo();

                        } else if (res.error == "11002") {

                            this.$emit("getToken");

                        } else{
                            this.isLoginError = true;
                            res.msg ? this.loginErrorMsg = res.msg : this.loginErrorMsg = '绑定用户失败，请反馈我司客服。'
                        }
                    })
                }
            },
            getCode() {
                if (this.phone == '') {
                    Notify({message: '请输入您的手机号码'})
                    return
                } else if (!(/^(13[0-9]|14[5679]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)) {
                    Notify({message: '请填写正确的手机号码'})
                    return
                } else {
                    let pre_three_num = this.phone.substr(0,3),
                        watch_card = ['145','146','166','177','199'];
                    if(watch_card.includes(pre_three_num)){
                        Notify({message:'不支持以145,146,166,177,199开头的手机号码'});
                        return
                    }else{
                        Notify({message:'温馨提示：请使用本人手机号绑定账号。'});
                    }
                    this.countDownFun();

                    _post("/accountCenter/v2/verify/send?" + codeParam({},'post'), {
                        mobile: this.phone
                    }).then((res) => {
                        if (res.error == 0) {
                            Notify({
                                message:'验证码发送成功',
                                background:'#60ce53'
                            })
                        } else if(res.error == "11002") {
                            this.$emit("getToken");
                        } else {
                            Notify({message:res.msg})
                        }
                    })
                }
            },
            countDownFun() {
                let _this = this;
                this.btnCode_disabled = true;

                clearInterval(this.timer);

                this.timer = setInterval(() => {
                    if (_this.countdown <= 0) {
                        _this.codeText = '获取验证码';
                        _this.countdown = 60;
                        if(this.checkInfo.iccid && this.checkInfo.phone){
                            _this.btnCode_disabled = false;
                        } else {
                            _this.btnCode_disabled = true;
                        }

                        clearInterval(_this.timer);
                    } else {
                        _this.codeText = this.countdown+'s';
                        _this.countdown--;
                    }
                }, 1000)
            },

            getUserInfo() {
                //获取用户信息
                this.load_user_msg = true;//用户信息遮罩
                _get("/accountCenter/v2/user/info?" + codeParam({}, 'get'))
                    .then(res => {
                        if (res.error == 0) {

                            if (res.data && JSON.stringify(res.data) != '{}') {
                                let UserInfo = {
                                    account: res.data.account,
                                    avatar: res.data.avatar,
                                    nickname: res.data.nickname,
                                }

                                setStorage('userInfo', UserInfo, 'obj');

                                if (this.client_type == 'wechat' || this.client_type == 'alipay') {
                                    this.$store.commit('userInfo/changeUserStatus', true);
                                    this.$store.commit('userInfo/changeUserInfo', UserInfo);
                                }

                                this.bindIot({
                                    iccid:this.iccid,
                                    phone:this.phone,
                                    user_id:res.data.account.user_id,
                                    code:this.code,
                                });

                                this.load_user_msg = false;

                            } else {

                                let _this = this;

                                Dialog.alert({
                                    title: '账号异常',
                                    message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题。',
                                }).then(() => {
                                    _this.load_user_msg = true;
                                    _this.load_user_info  = '账号异常';

                                })

                            }
                        } else if (res.error == '11002') {

                            this.$emit('getToken')

                        } else if(res.error == '10007'){
                            let curTimeStamp = (new Date()).getTime(),
                                timeSpan = res.extra - curTimeStamp;

                            setStorage('timeSpan',timeSpan);
                            this.getUserInfo();
                        }
                        else{
                            this.showAuthorityError('A-1'+res.error)
                        }
                    })

            },// 获取用户信息

            bindIot (params) {
                _post('/api/v1/app/bind/iccid_userid',{
                    iccid:params.iccid,
                    user_id:params.user_id,
                    mobile:params.phone,
                    code:params.code
                }).then(res=>{
                    if(res.state==1){
                        Notify({
                            message:'账户绑定成功',
                            background:'#60ce53'
                        });

                        this.iotCheckICCID(params.iccid);
                    }
                })
            },
            iotCheckICCID(iccid){
                _post('/api/v1/app/new_auth/check_auth_',{
                    iccid:iccid
                })
                    .then(res=>{
                        if(res.state==1){
                            if (res.data.status == 1) {
                                this.$router.push({path: '/mifi/card/index'}); // 实名成功
                            } else if (res.data.status == 2 || res.data.status == 3) {
                                setStorage('check_realNameSource', res.data.source)
                                this.$router.push({
                                    path: '/weixin/new_card/real_name',
                                    query:{from:'mifi'}
                                }); // 实名
                            }
                        }
                    })
            },
            showAuthorityError(flag){
                let _this = this;
                let _flag = flag ? flag : '';
                Dialog.alert({
                    title: '账号异常',
                    message: '您的账户信息存在问题,无法进行操作,请联系我司客服工作人员,我们将尽快为您解决问题'+_flag+'。',
                }).then(() => {
                    _this.load_user_msg = true;
                    _this.load_user_info  = '账号异常'+_flag;

                })
            }
        }
    }
</script>

<style lang="less">
    @import "../../../assets/less/utitlies";

    html, body, #app, .binding-wrap {
        height: 100%
    }

    .binding-wrap {
        .userInfo {
            display: table;
            width: 100%;
            height: 537px;
            margin-bottom: 50px;
            .bg-image('../../assets/imgs/mifi/binding/mifi_binding_bg');
            .table-cell{
                display: table-cell;
                vertical-align: middle;
            }
            img{
                width: 170px;
                height: 170px;
                margin: -32px 0 30px;
                border-radius: 20px;
                box-shadow: 0 0 20px 0 rgba(0,0,0,0.5);
            }
            p{
                font-size: 34px;
                font-weight: 500;
            }
        }
        .info-wrap {
            width: 75%;
            margin: 0 auto;
            .phone-wrap, .code-wrap ,.iccid-wrap{
                margin-bottom: 40px;
                text-align: left;
                border-bottom: 1px solid #dadada;
                input {
                    display: inline-block;
                    padding: 20px 0;
                    font-size: 36px;
                    color: #443f37;
                }
            }
            .code-wrap {
                display: flex;
                justify-content: space-between;
                input{
                    display: inline-block;
                    width: 57%;
                    font-size: 36px;
                }
                button {
                    width: 175px;
                    display: inline-block;
                    margin-bottom: 20px;
                    padding: 0;
                    text-align: center;
                    color: #f5c253;
                    font-size: 34px;
                    border-bottom: 2px solid #ffd655;
                    background-color: transparent;
                    &:disabled{
                        color: #989898;
                        border-bottom: 2px solid #c6c6c6;
                    }
                }
            }

            .btn-login-wrap {
                button {
                    display: inline-block;
                    width: 100%;
                    height: 80px;
                    margin-top: 90px;
                    border-radius: 80px;
                    line-height: 80px;
                    background: #fff;
                    color: #443f37;
                    font-size: 36px;
                    background-image: linear-gradient( 45deg, #f0b546 10%, #fdd47a 100%);
                }
            }
        }
    }

</style>