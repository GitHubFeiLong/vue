<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <!-- 给TodoHeader标签对象绑定addTodo事件监听 -->
           <!-- <TodoHeader @addTodo="addTodo"/> -->
           <TodoHeader ref="hander"/>
           <TodoList :todos="todos" />
           <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos"
           :selectAllTodos="selectAllTodos"/>
           <TodoFooter>
               <input slot="checkAll" type="checkbox" v-model="isAllCheck"/>
               <span slot="count">已完成 {{completeSize}} / 全部 {{todos.length}} </span>
               <button slot="delete" v-show="completeSize > 0" class="btn btn-danger" @click="deleteCompleteTodos">清除已完成任务</button>
           </TodoFooter>
        </div>
    </div>
</template>

/* 
    绑定事件监听 ---订阅消息
    触发事件 --- 发布消息
 */
<script>
    import PubSub from 'pubsub-js';
    import TodoHeader from './components/TodoHeader.vue';
    import TodoList from './components/TodoList.vue';
    import TodoFooter from './components/TodoFooter.vue';
    import storageUtil from './util/StorageUtil.js';
    export default {
        components:{
            TodoHeader,
            TodoList,
            TodoFooter
        },
        data () {
            return {
                // 从localStorage读取todos
                todos: storageUtil.readTodos()
            }
        },
        computed:{
            completeSize(){
            return this.todos.reduce((preTotal, todo) => {
            return preTotal + (todo.complate ? 1 : 0)
            }, 0);
            },
            isAllCheck : {
            get () {
                return this.completeSize === this.todos.length && this.todos.length > 0
            },
            // value 是当前checkbox最新的值
            set (value) {
                this.selectAllTodos(value)
            }
            }
        },
        // 执行异步代码
        mounted () {
            // 给<TodoHeader/> 绑定 addTodo事件监听
            // 这样是给App绑定了监听 this.$on('addTodo', this.addTodo);
            this.$refs.hander.$on('addTodo', this.addTodo);

            // 订阅消息
            PubSub.subscribe('deleteTodo', (msg, index)=>{
                this.deleteTodo(index);
            })
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
                /* handler: function (newVal, oldVal) {
                    // 将todos最新值的Json数据，保存到LocalStorage
                    // window.localStorage.setItem('todos_key', JSON.stringify(newVal))
                    storageUtil.saveTodos(newVal)
                } */
                handler: storageUtil.saveTodos
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