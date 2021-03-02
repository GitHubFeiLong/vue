<template>
    <div>
        <img class="logo" src="./assets/logo.png" alt="log">
        <!-- 3. 编写组件标签 -->
        <HellWorld/>
    </div> 
</template>

<script>
    // 1. 引入组件
    import HellWorld from './components/HelloWorld.vue';
    export default {
        // 2. 映射组件标签
        components : {
            HellWorld
        }
    };
</script>

<style>
    .logo {
        width:200px;
        height:200px;
    }
</style>