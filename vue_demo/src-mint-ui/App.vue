<template>
    <div>
        <mt-button type="default" @click.native="handleClick">default</mt-button>
        <mt-button type="primary">primary</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        methods:{
            handleClick() {
                Toast('提示信息');
            }
        }
    }
</script>
     
<style>
</style>