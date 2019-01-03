<template>
    <div class="btn-wrap">
        <button
                :disabled="btnState"
                @click="clickThrotle"
                :class="{'disabled':btnState}"
        >
        {{btnText}}
        </button>
    </div>
</template>

<script>
    export default {
        name:'btn-common',
        props:{
            btnText:{
                type:String
            }
        },
        data() {
            return {
                btnState:false,
                timer:null,
            }
        },

        created() {

        },
        methods:{
            clickThrotle(){
                let _this =  this;
                this.$emit('clickThrotle');
                this.btnState = true
                clearTimeout(this.timer)
                this.timer = setTimeout(function () {
                    _this.btnState = false
                },2000)
            },
        }
    }
</script>

<style lang="less">
    .btn-wrap{
        button{
            &.disabled{
                opacity: .5 !important;
            }
        }
    }

</style>