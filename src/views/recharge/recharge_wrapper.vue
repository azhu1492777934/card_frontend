<template>
    <router-view @getUserData="getUserInfo"/>
</template>

<script>
    export default {
        name: "recharge_wrapper",
        methods:{
            getUserInfo(){
                this.$emit('getUserData');
            }
        }
    }
</script>

<style scoped>

</style>