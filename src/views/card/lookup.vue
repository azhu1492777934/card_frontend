<template>
    <div class="check-card-wrap">
        <div class="scanTop-wrap">
            <img src="../../assets/imgs/card/lookup/scanTop.png" alt="">
        </div>
        <div class="search-wrap">
            <input v-model="iccid" placeholder="扫码或手动输入iccid号或11位电话号" type="text">
            <span class="iconfont icon-scan bounceIn animated"></span>
            <span class="icon-scanTip"></span>
        </div>
        <div class="btn-check-wrap">
            <button @click="searchIccid(iccid)">查询</button>
        </div>
        <div v-show="recording_show" class="recording-wrap">
            <p class="recording-title">
                <span>历史搜索记录</span>
                <span>{{recording_list_length}}条</span>
            </p>
            <ul class="recording-list-wrap">
                <li @click="searchIccid(item.iccid)" v-for="(item,index) in recording_list">
                    <span>{{item.iccid}}</span>
                    <span>{{item.searchTime}}</span>
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
                width: 80%;
                margin: 0 auto;
                height: auto;
            }
        }
        .search-wrap {
            position: relative;
            display: flex;
            height: 80px;
            margin-bottom: 70px;
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
            padding-bottom: 70px;
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
                    &:last-child {
                        flex: 2;
                        text-align: right;
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
    import {checkICCID, setStorage, formatterCardTime, getStorage, sortObj} from '../../utilies'
    import {Toast, Popup , Notify} from 'vant'
    import {_post} from "../../http";

    export default {
        name: "home",
        data() {
            return {
                sort_recording_list: {},
                recording_list: getStorage('recording_list')?getStorage('recording_list'):[],
                recording_list_length: getStorage('recording_list')?getStorage('recording_list').length:0,
                recording_show: false,
                iccid: '',
                checkShow: false,//查询遮罩
            }
        },
        components: {
            [Toast.name]: Toast,
            [Popup.name]: Popup,
        },
        created() {
            if (getStorage('recording_list')) {
                if(getStorage('recording_list').length){
                    this.recording_show = true;
                }
            }
        },
        methods: {
            searchIccid: function (iccid) {
                if (!iccid) {
                    Toast('请输入ICCID');
                    return
                }
                if (!checkICCID(iccid).state) {
                    Toast(checkICCID(iccid).msg);
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

                this.recording_list_length = this.recording_list.length;

                //查询
                _post('/api/v1/app/new_auth/check_auth_',{
                    iccid:iccid
                }).then(res=>{
                    if(!res.state){
                        Notify({
                            message:res.msg
                        })
                        _this.checkShow = false
                    }else{
                        setStorage('check_iccid',iccid);
                       if(res.data.status==1){
                           _this.$router.push({path:'/card/plan_list'});
                           //未实名
                       }else if(res.data.status==2){
                           setStorage('chec_realNameSource',res.data.source)
                           _this.$router.push({path:'/new_card/real_name'});
                       }else if(res.data.status==3){
                           _this.$router.push({path:'/card/usage'});
                       }
                    }
                })

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
            }
        }

    };
</script>

