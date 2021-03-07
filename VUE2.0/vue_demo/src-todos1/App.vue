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
                // 从localStorage读取todos
                todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
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
        },
        // 深度监视
        watch:{
            todos : {
                // 深度监视
                deep: true, 
                handler: function (newVal, oldVal) {
                    // 将todos最新值的Json数据，保存到LocalStorage
                    window.localStorage.setItem('todos_key', JSON.stringify(newVal))
                }
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