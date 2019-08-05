<template>
    <router-view @getUserData="getUserInfo"/>
</template>

<script>
    export default {
        name: "userCenter_wrapper",
        methods:{
            getUserInfo(){
                this.$emit('getUserData');
            }
        }
    }
</script>

<style scoped>

</style>