<template>
    <div>
        <!--调用授权 启动页-->
    </div>
</template>

<script>
    import {getStorage, checkBrowser} from "../../utilies";
    import {_post} from "../../http";

    export default {
        name: "index",
        data() {
            return {
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
                        this.checkIccid(this.iccid);
                    } else {
                        this.$router.push({path:'/mifi/card/lookup'})
                    }
                }

            } else {
                this.$router.push('/mifi/card/lookup')
            }
        },
        methods: {
            checkIccid(iccid) {
                _post('/api/v1/app/new_auth/check_auth_', {
                    iccid: iccid
                }).then(res => {
                    if (res.data.status == 1) {
                        this.$router.push({path: '/mifi/card/index'}); // 实名成功
                    } else if (res.data.status == 2 || res.data.status == 3) {
                        setStorage('check_realNameSource', res.data.source)
                        this.$router.push({
                            path: '/weixin/new_card/real_name',
                            query: { source: 'mifi' }
                        }); // 实名
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>