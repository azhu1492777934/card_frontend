<template>
    <div class="card-connection-wrap">
        <div v-show="!load_connection" class="card-connection-inner">
            <div v-show="cur_checked" class="connection-title-wrap">
                <span>连接开始</span>
                <span>用量(KB)</span>
                <span>持续时间(s)</span>
            </div>
            <div class="flow-data-wrap">
                <ul v-show="cur_checked">
                    <li v-for="(item,index) in connection_flow_list">
                        <span>{{item.time}}</span>
                        <span>{{item.data}}</span>
                        <span>{{item.duration}}</span>
                    </li>
                </ul>
            </div>

            <div v-show="!cur_checked" class="connection-title-wrap">
                <span>连接开始</span>
                <span>呼叫号码</span>
                <span>持续时间(min)</span>
            </div>
            <div class="flow-data-wrap no-padding-top">
                <ul v-show="!cur_checked">
                    <li v-for="(item,index) in connection_voice_list">
                        <span>{{item.time}}</span>
                        <span>{{/[\u4e00-\u9fa5\u767e\u5343\u96f6]/.test(item.number)? item.number:item.number.substr(0,3)+'xxxx'+item.number.substr(8,item.number.length) }}</span>
                        <span>{{item.duration}}</span>
                    </li>
                </ul>
            </div>

            <div v-show="hasVocie" class="connection-footer">
                <span @click="changeChecked" :class="{'checked':cur_checked}">流量</span>
                <span @click="changeChecked" :class="{'checked':!cur_checked}">通话</span>
            </div>
        </div>

        <van-popup :close-on-click-overlay="false" v-model="load_connection">
            <p class="showTip">{{load_connection_msg}}</p>
        </van-popup>

    </div>
</template>

<style lang="less">
    @import "../../assets/less/utitlies";
    @import "../../assets/less/common";

    .card-connection-wrap{
        color: #444;

        .connection-title-wrap{
            position: fixed;
            display: flex;
            width: 100%;
            top:0;
            left: 0;
            color: #fff;
            background-image: linear-gradient(135deg, #f7c17c 10%, #f98a00 100%);
            span{
                flex: 1;
                font-size: 32px;
                padding: 20px 0;
                border-bottom: 1px solid #f5f5f5;

            }

        }
        .flow-data-wrap{
            padding-top: 80px;
            font-size: 30px;
            li{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #f5f5f5;
                span{
                    flex: 1;
                }
                &:nth-child(2n){
                    /*border-color: #f98a00;*/
                }
            }
        }
        .no-padding-top{
            padding-top: 0px;
        }
        .connection-footer{
            position: fixed;
            left: 0;
            bottom:0;
            display: flex;
            width: 100%;
            background-color: #fff;
            font-size: 32px;
            span{
                flex: 1;
                padding: 20px 0;
                &.checked{
                    color: #fff;
                    background-color: #f98a00;
                }
            }
        }

    }

</style>


<script>
    // @ is an alias to /src
    import {checkICCID, setStorage, formatterCardTime, getStorage, sortObj} from '../../utilies'
    import {Toast, Popup,Notify} from 'vant'
    import {_get} from "../../http";

    export default {
        name: "home",
        data() {
            return {
                hasVocie:false,
                load_connection:true,
                load_connection_msg:'加载连接数据,请等候',
                connection_flow_list:[],
                connection_voice_list:[],
                cur_checked:true,
            }
        },
        components: {
            [Popup.name]: Popup,
            [Notify.name]:Notify
        },
        created() {
            if(getStorage('check_iccid')){
                _get('/api/v1/app/detail',{
                    iccid:getStorage('check_iccid')
                }).then(res=>{
                    if(res.state==1){
                        this.connection_flow_list = res.data.data
                        if(res.data.data.length || res.data.voice.length){
                            this.load_connection = false;
                        }
                        if(res.data.data.length && res.data.voice.length){
                            this.hasVocie = true;
                            this.connection_voice_list = res.data.voice
                        }else if(!res.data.data.length && res.data.voice.length){
                            this.hasVocie = false;//关闭切换按钮
                            this.connection_voice_list = res.data.voice
                            this.cur_checked = false;//关闭流量链接详情按钮

                        } else{
                            this.load_connection_msg = true;
                            this.load_connection_msg = '暂无连接数据'
                        }
                    }else{
                        this.load_connection_msg = res.msg
                    }
                })
            }

        },
        methods: {
            changeChecked:function(){
                this.cur_checked = !this.cur_checked
            }
        }

    };
</script>

