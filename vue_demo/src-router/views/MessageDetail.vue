<template>
    <ul v-if="messageDetail">
        <li>id: {{messageDetail.id}}</li>
        <li>title: {{messageDetail.title}}</li>
        <li>content: {{messageDetail.content}}</li>
    </ul>
</template>

<script>
    const allMessageDetails = [
        {id:1, title:'message001', content:'content1'},
        {id:2, title:'message002', content:'content2'},
        {id:3, title:'message003', content:'content3'}
    ]
    export default {
        data(){
            return {
                messageDetail:{}
            }
        },
        mounted(){
            const id = $route.params.id * 1;
            this.messageDetail = allMessageDetails.find(detail => detail.id === id)
        },
        watch:{
            $route: function (value) {
                const id = value.params.id * 1;
                this.messageDetail = allMessageDetails.find(detail => detail.id === id)
            }
        }
    }
</script>

<style>

</style>