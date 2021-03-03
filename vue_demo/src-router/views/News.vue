<template>
    <div> 
        <ul>
            <li v-for="(news, index) in newsArr" :key="index">{{news}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newsArr:[
                    'news1',
                    'news2',
                    'news3',
                    'news4'
                ]
            }
        }
    }
</script>

<style>

</style>