<template>
   <div class="check-card-wrap">
       <p>
           <img src="" alt="">
       </p>
       <div class="search-wrap">
           <input type="text">
          <span></span>
       </div>
       <p>
           <button></button>
       </p>
       <ul>

       </ul><!--历史记录-->
   </div>
</template>

<style lang="less">
   @import "../../assets/less/utitlies";
   @import "../../assets/less/common";
   .check-card-wrap{

   }
</style>


<script>
    // @ is an alias to /src
    export default {
        name: "home",
        props: {
            options: {
                type: Object,

            }
        },
        data() {
            return {


            }
        },
        created() {


        },
        methods: {
            inArray:function (elem, arr, i) {
                return arr == null ? -1 : arr.indexOf( elem, i);
            },
        }
    };
</script>

