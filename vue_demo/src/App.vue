<template>
    <div class="todo-container">
        <div class="todo-wrap">
           <TodoHeader :addTodo="addTodo"/>
           <TodoList :todos="todos" :deleteTodo="deleteTodo"/>
           <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos"
           :selectAllTodos="selectAllTodos"/>
        </div>
    </div>
</template>

<script>
    import TodoHeader from './components/TodoHeader.vue';
    import TodoList from './components/TodoList.vue';
    import TodoFooter from './components/TodoFooter.vue';
    export default {
        components:{
            TodoHeader,
            TodoList,
            TodoFooter
        },
        data () {
            return {
                todos:[
                    {title:'吃饭', complate: false},
                    {title:'睡觉', complate: true},
                    {title:'打豆豆', complate: false},
                ]
            }
        },
        methods:{
            addTodo(todo){
                this.todos.unshift(todo);
            },
            deleteTodo(index){
                this.todos.splice(index, 1)
            },
            // 删除所有选中的todo
            deleteCompleteTodos () {
                this.todos = this.todos.filter(todo => !todo.complate)
            },
            // 全选|全不选
            selectAllTodos (isCheck) {
                this.todos.forEach(todo => todo.complate = isCheck);
            }
        }
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