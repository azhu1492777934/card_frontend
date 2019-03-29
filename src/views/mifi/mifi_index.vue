<template>
    <div>
        <!--调用授权 启动页-->
    </div>
</template>

<script>
    import {getStorage, checkBrowser,setStorage,formatterCardTime} from "../../utilies";
    import {_post} from "../../http";

    export default {
        name: "index",
        data() {
            return {
                recording_list: getStorage('recording_list','arr') || [],
                iccid: '',
                client_type: checkBrowser(),
            }
        },
        created() {
            // 完整实名授权 并且存在绑定iccid
            if (this.client_type == 'wechat' || this.client_type == 'alipay') {

                if (getStorage('token')) {
                    // 判断当前卡是否走完实名流程
                    if (getStorage('check_iccid')) {
                        this.iccid = getStorage('check_iccid');

                        let checkRecordingResult = this.checkAllCardStatus();
                        if(checkRecordingResult.state==1){
                           this.$router.push({path:'/mifi/card/index'});
                        }else{
                            this.checkIccid(this.iccid);
                        }

                    } else {
                        this.$router.push({path:'/mifi/card/lookup'});
                    }
                }

            } else {
                this.$router.push('/mifi/card/lookup');
            }
        },
        methods: {
            checkIccid(iccid) {
                this.$store.commit('mifiCommon/changeLoadingStatus',{flag:true});
                _post('/api/v1/app/new_auth/check_auth_', {
                    iccid: iccid,
                }).then(res => {
                    this.$store.commit('mifiCommon/changeLoadingStatus',{flag:false});
                    if (res.state == 1) {
                        setStorage('check_iccid', res.data.iccid);
                        setStorage('new_auth_search_iccid',iccid);

                        this.recordingIccid({
                            iccid:res.data.iccid,
                            realname:(res.data.status == 2 || res.data.status == 3 ) ? false : true
                        }); // 增加iccid实名记录

                        if (res.data.status == 1) {
                            this.$router.push({path: '/mifi/card/index',});
                        } else if (res.data.status == 2 || res.data.status == 3) {
                            setStorage('check_realNameSource', res.data.source);
                            this.$router.push({
                                path: '/weixin/new_card/real_name',
                                query:{from:'mifi'}
                            });
                        }
                    } else {
                        Notify({message: res.msg})
                    }
                })
            },
            checkAllCardStatus(){
                let iccid;
                if(this.recording_list.length <=1){
                    return{
                        state:0
                    }
                }else{
                    for(let i=0;i<this.recording_list.length;i++){
                        if(this.recording_list[i].realname){
                            iccid = this.recording_list[i].iccid;
                            break
                        }
                    }
                    if(iccid){
                        return{
                            state:1,
                            iccid:iccid
                        }
                    }
                }
            },
            compare: function (property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            },
            recordingIccid(params){
                let isExist = false;
                if (this.recording_list.length) {

                    this.recording_list.map(function (item, index) {
                        if (item.iccid == params.iccid) {
                            item.searchTime = formatterCardTime().searchTime;
                            item.millisecond = formatterCardTime().millisecond;
                            item.realname = params.realname;
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        this.recording_list.push({
                            'iccid': params.iccid,
                            'searchTime': formatterCardTime().searchTime,
                            'millisecond': formatterCardTime().millisecond,
                            'realname': params.realname,
                        })
                    }
                } else {
                    this.recording_list.push({
                        'iccid': params.iccid,
                        'searchTime': formatterCardTime().searchTime,
                        'millisecond': formatterCardTime().millisecond,
                        'realname': params.realname,
                    })
                }

                this.recording_list.sort(this.compare('millisecond'));

                if (this.recording_list.length > 20) {
                    this.recording_list.splice(20)
                }

                setStorage('recording_list', this.recording_list, 'arr')
            },
        }
    }
</script>

<style scoped>

</style>