<template>
    <div class="login-wrap">
        <div class="info-wrap">
            <div class="phone-wrap">
                <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone"/>
            </div>
            <div class="code-wrap">
                <input type="text" placeholder="请输入验证码" maxlength="10" v-model="code"/>
                <button class="getCode" @click="getCode">{{codeText}}</button>
            </div>
            <div class="btn-login-wrap">
                <button>登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {codeParam} from "../../utilies";
    import {_post} from "../../http";
    import {getStorage,getUrlParam,setStorage} from "../../utilies";

    export default{
        data(){
            return {
                phone:"",
                code:"",
                codeText:"获取验证码",
                countdown:60,
                userData:{}
            }
        },
        created(){

            /*this.userData = localStorage.getItem('decrypt_data');
            console.log(this.userData)*/
            if(getStorage('token')){
                this.userData = getStorage('userData');
            }else{
                if(getUrlParam('data')){
                    setStorage('auth_data',getUrlParam('data'))
                }
                if(getStorage('auth_data')){
                    if(getStorage('state')==getUrlParam('state')){
                        //解密data
                        _post('/accountCenter/v2/secret/decrypt?',)
                    }//状态
                }
            }
        },
        methods:{
            login(){

                if(this.phone=='' || this.code==''){
                    alert("请填写相关信息");
                }else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)){
                    alert("请填写正确的手机号码");
                }else{



                    this.$http.post("/api/v2/user/bind?"+rechargeParam({},true,true),{
                        mobile:this.phone,
                        code:this.code,
                        from:this.isAlipayOrWechat().split(',')[0],
                        uuid:this.userData.openid,
                        nickname:this.userData.nickname,
                        gender:this.userData.sex,
                        avatar:this.userData.headimgurl
                    },{emulateJSON:true}).then((response) => {
                        if(response.data.error == 0){
                            alert("绑定成功");
                            this.showLogin=false;
                            localStorage.setItem("token",response.data.data);
                            this.$router.push('/home')
                        }else if(response.data.error == "11002"){
                            this.$emit("getToken");
                        }else{
                            alert(response.data.msg);

                        }
                    })
                }
            },
            getCode(){
                if(this.codeText=="获取验证码"){
                    if(this.phone==''){
                        alert("请填写手机号码")
                    }else if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(this.phone)){
                        alert("请填写正确的手机号码");
                    }else{
                        this.$http.post("/api/v2/verify/send?"+rechargeParam({},true,true),{
                            mobile:this.phone
                        },{emulateJSON:true}).then((response) => {
                            if(response.data.error == 0){
                                this.settime();

                            }else if(response.data.error == "11002"){
                                this.$emit("getToken");
//								this.refreshToken();
                            }else{
                                alert(response.data.msg);

                            }
                        })
                    }
                }else{
                    alert("操作频繁，请稍后重试")
                }

            },
            settime(){
                let timer = setInterval(() => {
                    if (this.countdown <= 0) {
                        this.codeText="获取验证码";
                        this.countdown = 60;
                        clearInterval(timer);

                    } else {
                        this.codeText=this.countdown;
                        this.countdown--;
                    }
                },1000)
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/utitlies";
    html,body,#app,.login-wrap{
        height: 100%
    }
    .login-wrap{
        display: flex;
        align-items: center;
        width: 100%;
        .bg-image('../../assets/imgs/login/login_bg');
        .info-wrap{
            width: 70%;
            margin: 0 auto;
            text-align: left;
            .phone-wrap,.code-wrap{
                margin-bottom: 40px;
                background:rgba(255,255,255,0.7);
                border-radius:7px;
                box-shadow:0 18px 9px 0 rgba(5,87,197,0.18);
                input{
                    display: inline-block;
                    padding: 20px 0 20px 15px;
                    font-size: 30px;
                    color: #000;
                }
            }
            .code-wrap{
                display: flex;
                align-items: center;
                button{
                    display: inline-block;
                    padding: 12px 30px;
                    border-radius: 6px;
                    color: #23B0FE;
                    line-height: 1;
                    background-color: #fff;
                }
            }

            .btn-login-wrap{
                button{
                    display: inline-block;
                    width: 100%;
                    padding: 20px;
                    background:#fff;
                    color: #23B0FE;
                    font-size:34px;
                    box-shadow:-1px 14px 9px 0px rgba(5,87,197,0.18);
                    border-radius:10px;
                    line-height: 1;
                }

            }
        }
    }

</style>