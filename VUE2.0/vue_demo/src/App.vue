<template>
    <div class="todo-container">
        <div class="todo-wrap">
           <TodoHeader/>
           <TodoList/>
           <TodoFooter/>
        </div>
    </div>
</template>

<script>
    import TodoHeader from './components/TodoHeader.vue';
    import TodoList from './components/TodoList.vue';
    import TodoFooter from './components/TodoFooter.vue';
    export default {
        mounted () {
            // 发送命令给actions：异步获取保存todo数据
            this.$store.dispatch('reqTodos')
        },
        components:{
            TodoHeader,
            TodoList,
            TodoFooter
        },
        data () {
            return {
                // 从localStorage读取todos
                todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
            }
        },
        methods:{
            
        },
        // 深度监视
        /* watch:{
            todos : {
                // 深度监视
                deep: true, 
                handler: function (newVal, oldVal) {
                    // 将todos最新值的Json数据，保存到LocalStorage
                    window.localStorage.setItem('todos_key', JSON.stringify(newVal))
                }
            }
        } */
    }
</script>

<style>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>