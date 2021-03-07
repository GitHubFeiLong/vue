<template>
    <div>
        <p class="msg">{{msg}}</p>
    </div>
</template>

<script>
    // 配置对象（与Vue一致）
    export default {
        // 原来data可以写对象也可以写函数，组件内必须写函数
        data(){
            return {
                msg:"Hello Vue Component"
            }
        }
    };
</script>

<style>
    .msg {
        color:red;
        font-size: 35px;
    }
</style>