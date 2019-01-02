<template>
    <div class="card-connection-wrap">

    </div>
</template>

<style lang="less">
    @import "../../assets/less/utitlies";
    @import "../../assets/less/common";

</style>


<script>
    // @ is an alias to /src
    import {checkICCID, setStorage, formatterCardTime, getStorage, sortObj} from '../../utilies'
    import {Toast, Popup} from 'vant'
    import {_post} from "../../http";

    export default {
        name: "home",
        data() {
            return {

            }
        },
        components: {
            [Toast.name]: Toast,
            [Popup.name]: Popup,
        },
        created() {

        },
        methods: {

        }

    };
</script>

