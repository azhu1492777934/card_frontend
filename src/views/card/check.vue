<template>
    <div class="check-wrap">
        <div class="check-wrap-top">
            <div v-show="showResult" class="icon-result-wrap">
                <span></span>
                <p>检测完毕</p>
            </div>
            <div :class="{'m-t-0':!showResult}" class="iccid-wrap">
                <input autofocus v-model="iccid" placeholder="请输入或扫描ICCID" type="text">
                <span @click="scanIccid" class="iconfont icon-scan"></span>
            </div>
            <button @click="btnCheck" :disabled="isDisabled">{{btnCheckText}}</button>
        </div>
        <!--检测结果-->
        <div v-show="showNormalResult" class="result-wrap">
            <div class="title">
                <span></span>
                <p>检测结果</p>
            </div>
            <div class="content">
                <p>卡状态正常,若不能正常使用可尝试一下操作</p>
                <ul>
                    <li>1、重新插卡</li>
                    <li>2、在信号良好的地方使用</li>
                    <li>3、检测设备是否支持2G网络</li>
                </ul>
            </div>
        </div>
        <div v-show="showOtherResult" class="result-wrap result-other-wrap">
            <div class="title">
                <span></span>
                <p>检测结果</p>
            </div>
            <div class="content">
                <p>{{otherResultMsg}}</p>
            </div>
            <div class="footer">
                <span @click="closeResult">否</span>
                <span @click="fixedCheckResult">是</span>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    @import "../../assets/less/utitlies";
    .check-wrap{
        .check-wrap-top {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            height: 518px;
            .bg-image('../../assets/imgs/card/check/bg-check-wrap');
            .m-t-0{
                margin-top: 0px !important;
            }
            .icon-result-wrap {
                position: absolute;
                top: 56px;
                font-size: 30px;
                color: #fff;
                text-align: center;
                span {
                    display: inline-block;
                    width: 213px;
                    height: 165px;
                    .bg-image('../../assets/imgs/card/check/icon-check-result');
                }
                p {
                    padding: 36px 0;
                }
            }
            .iccid-wrap {
                display: flex;
                align-items: center;
                padding: 0 15px 0 34px;
                margin-top: 210px;
                width: 70%;
                height: 76px;
                border: 1px solid #29cbfe;
                box-shadow: inset 0 0 40px 0 #3f97fe;
                input {
                    display: inline-block;
                    flex: 1;
                    height: 100%;
                    font-size: 32px;
                    color: #fff;
                }
                input::-webkit-input-placeholder{
                    color: #fff;
                    font-size: 30px;
                }
                span {
                    line-height: 1;
                    font-size: 75px;
                    color: #fff;
                }
            }
            button {
                position: absolute;
                bottom: -39px;
                display: block;
                width: 70%;
                height: 78px;
                font-size: 36px;
                color: #fff;
                line-height: 78px;
                background-color: #19DD75;
            }
        }
        .result-wrap{
            width: 86%;
            margin: 80px auto 0;
            padding: 45px 30px;
            box-shadow: 0 0 20px #e0dfdf;
            border-radius: 10px;
            box-sizing: border-box;
            font-size: 30px;
            .title{
                display:flex;
                align-items: center;
                padding-bottom: 30px;
                border-bottom: 4px dashed #666;
                color: #888;
                span{
                    display: inline-block;
                    margin-right: 10px;
                    width: 20px;
                    height: 20px;
                    background-color: #19dd75;
                    border-radius: 50%;
                }
            }
            .content{
                padding: 20px 0 20px;
                text-align: left;
                color: #666;
                line-height: 60px;
                ul{
                    text-indent: 60px;
                }
            }
        }

        .result-other-wrap{
            padding: 0;
            .title{
                margin: 0 30px;
                padding-top: 45px;
                border-bottom: 2px solid #d2d2d2;
            }
            .content{
                padding: 70px 0;
                text-align: center;
            }
            .footer{
                display: flex;
                border-top: 1PX solid #f5f5f5;
                span{
                    flex: 1;
                    padding: 20px 0;
                    &:first-child{
                        border-right: 1PX solid #f5f5f5;
                    }
                    &:last-child{
                        color: #19dd75;
                    }
                }
            }

        }
    }

</style>

<script>
    // @ is an alias to /src
    import {checkBrowser,checkICCID,setStorage,getUrlParam} from "../../utilies";
    import {Notify} from 'vant'
    import {_get,_post} from "../../http";

    export default {
        name: "watch_card",

        data() {
            return {
                operatorType:0,
                iccid:'',
                showResult:false,
                btnCheckText:'开始检测',
                isDisabled:false,
                showNormalResult:false,//卡检测正常时
                showOtherResult:false,//其他检测结果
                otherResultMsg:'',
                checkType:'',//卡未实名,未激活,无套餐
                objCheckResult:null,//检查结果
            }
        },
        components:{
            [Notify.name]:Notify,
        },
        created() {
            this.operatorType = getUrlParam('type');
        },
        methods: {
            scanIccid(){
                let _this = this;

                if(checkBrowser()=='wechat'){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["barCode", "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            if(result &&( result.length==19 || result.length==20 )){
                                _this.iccid = (result.replace(/\s*]*/g, ""));
                                _this.processCheckIccid(_this.iccid)
                            }else{
                                Notify({message:'请扫描正确的ICCID'});
                            }
                        }
                    });
                }else if(checkBrowser()=='alipay'){

                    ap.scan(function(res){
                        var result = res.code; // 当needResult 为 1 时，扫码返回的结果

                        _this.iccid = (result.replace(/\s*/g, ""));
                        _this.processCheckIccid(_this.iccid)
                    });
                }
            },
            closeResult(){
                this.showOtherResult = false
            },
            processCheckIccid(iccid){
                if(checkICCID(iccid).state==1){
                    this.showNormalResult = false;
                    this.showOtherResult = false;
                    this.showResult = false
                    this.btnCheckText = '检测中...';
                    this.isDisabled = true;
                    _get('/api/v1/app/cards/check',{
                        iccid:iccid,
                        is_server:this.operatorType==1 ? 1:0
                    }).then(res=>{
                        this.btnCheckText = '开始检测';
                        this.isDisabled = false;
                        this.showResult = true;
                        this.objCheckResult = res;

                        if(res.state){
                            if(res.state==1){

                                this.showNormalResult = true
                            }else {
                                this.checkType = res.state;

                                if(res.state=='11001'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '未查询到此卡相关信息，请检查您的卡号是否正确';
                                }
                                if(res.state=='11002'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '卡尚未实名，是否立即实名'
                                }
                                if(res.state=='11003'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '卡未激活，是否激活此卡'
                                }
                                if(res.state=='11004'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '卡暂无套餐，是否前往充值'
                                }
                                if(res.stata=='11005'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '基站信号弱,请切换套餐'
                                }
                                if(res.state=='11007'){
                                    this.showOtherResult = true;
                                    this.otherResultMsg = '卡已停机,是否前往充值'
                                }
                                if(this.operatorType==1){
                                    if(res.stata=='11006'){
                                        this.showOtherResult = true;
                                        this.otherResultMsg = '深圳移动未下发套餐'
                                    }
                                }
                            }
                        }else{
                            Notify({message:res.msg});
                        }
                    })
                }else{
                    Notify({message:checkICCID(iccid).msg})
                    return
                }
            },
            btnCheck(){
                this.processCheckIccid(this.iccid);
            },
            fixedCheckResult(){
                if(this.checkType=='11001') {
                    this.showOtherResult = false
                }

                if(this.checkType=='11002'){
                    setStorage('check_realNameSource',this.objCheckResult.data.source);
                    setStorage('check_iccid',this.iccid);
                   this.$router.push({path:'/weixin/new_card/real_name'})//需要返回source
                }

                if(this.checkType=='11003'){
                    _post('/api/v1/app/activated', {
                        iccid: this.iccid
                    })
                        .then(res => {
                            this.showOtherResult = false
                            if (res.state==1) {
                                Notify({
                                    message: '请在5分钟内放回原绑定的设备中开机,否则会被停机',
                                    background: '#00c2ff'
                                })
                            }else{
                                Notify({message:res.msg})
                            }
                        })

                }
                if(this.checkType=='11004' || this.checkType=='11007'){
                    setStorage('check_iccid',this.iccid);
                    this.$router.push({path:'/weixin/card/plan_list'});
                }
                if(this.checkType=='11005'){
                    setStorage('check_iccid',this.iccid);
                    if(localStorage.getItem("currentType")=="esim"){
                        this.$router.push({path:'/weixin/card/esim_usage'})
                    }else{
                        this.$router.push({path:'/weixin/card/usage'})
                    }
                }

            }

        }
    };
</script>

