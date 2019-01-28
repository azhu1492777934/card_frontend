<template>
    <div class="card-dialog-wrap">
        <div class="card-dialog van-dialog">
            <div class="card-dialog_header van-dialog__header">
                {{dialogObj.title}}
            </div>
            <div class="van-dialog__message van-dialog__message--has-title">
                {{dialogObj.content}}
            </div>
            <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
                <button @click="dialogCancel" class="van-button van-button--default van-button--large van-dialog__cancel">
                    <span class="van-button__text">取消</span>
                </button>
                <button @click="dialConfirm" class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left">
                    <span class="van-button__text">确认</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dialog",
        props:{
            dialogObj:{
                type:Object
            }
        },
        methods:{
            dialogCancel(){
                this.$emit('dialogCancel')

            },
            dialConfirm(){
                this.$emit('dialConfirm')
            }

        }
    }
</script>

<style lang="less" scoped>
    .card-dialog-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
    }
</style>