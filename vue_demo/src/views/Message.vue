<template>
    <div>
        <ul v-if="messages.length > 0">
            <li v-for="(message) in messages" :key="message.id">
                <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
                <button @click="pushShow(message.id)">push查看</button>
                <button @click="replaceShow(message.id)">replace查看</button>
            </li>
        </ul>
        <button @click="$router.back()">回退</button>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                messages:[]
            }
        },
        methods:{
            pushShow(id){
                this.$router.push(`/home/message/detail/${id}`)
            },
            replaceShow(id){
                this.$router.replace(`/home/message/detail/${id}`)
            }
        },
        mounted () {
            // 模拟ajax请求，从后台获取数据
            setTimeout(()=>{
                this.messages = [
                    {id:1, title:'message001'},
                    {id:2, title:'message002'},
                    {id:3, title:'message003'}
                ]
            },1000)
        }
    }
</script>

<style>

</style>