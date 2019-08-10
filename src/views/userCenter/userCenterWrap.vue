<template>
    <router-view @getUserData="getUserInfo" @getToken="getNewToken"/>
</template>

<script>
    export default {
        name: "userCenter_wrapper",
        methods:{
            getUserInfo(){
                this.$emit('getUserData');
            },
            getNewToken(){
                this.$emit("getToken");
            }


        }
    }
</script>

<style scoped>

</style>