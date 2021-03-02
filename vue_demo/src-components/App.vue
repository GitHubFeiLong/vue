<template>
    <div>
        <header class="site-header jumbotron">
        <div class="container">
            <div class="row">
            <div class="col-xs-12">
                <h1>请发表对Vue的评论</h1>
            </div>
            </div>
        </div>
        </header>
        <div class="container">
            <Add :addComment="addComment"/>
            <List :comments="comments" :deleteComponent="deleteComponent"/>
        </div>
    </div>
</template>

<script>
    import Add from './components/Add.vue';
    import List from './components/List.vue';
    export default {
        data () {
            return {
                // 数据在那个组件，更新数据的行为就应该定义在哪个组件
                comments:[
                    {
                        name:'Bob',
                        content:"Vue 不错"
                    },
                    {
                        name:'Jack',
                        content:"Vue 好难"
                    },
                    {
                        name:'rose',
                        content:"Vue 挺简单的"
                    },
                ]
            }
        },
        methods:{
            // 添加评论
            addComment(comment){
                this.comments.unshift(comment);
            },
            // 删除指定下标的评论
            deleteComponent(index) {
                this.comments.splice(index, 1)
            }
        },
        components:{
            Add,
            List
        }
    }
</script>

<style>

</style>