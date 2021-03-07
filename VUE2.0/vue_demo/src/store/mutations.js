/* 
    包含多个由action触发去直接更新状态的方法的对象
*/
import {ADD_TODO, DELETE_ITEM, SELECT_ALL_TODOS,CLEAR_ALL_COMPLETE, RECEIVE_TODOS} from './mutation-types'
export default {
    [ADD_TODO] (state, {todo}) {
        state.todos.unshift(todo)
    },
    [DELETE_ITEM] (state, {index}) {
        state.todos.splice(index, 1)
    },
    [SELECT_ALL_TODOS] (state, {boo}){
        console.log("SELECT_ALL_TODOS", boo);
        state.todos.forEach(todo => {
            todo.complete = boo
        });
    },
    [CLEAR_ALL_COMPLETE] (state) {
        state.todos = state.todos.filter(todo => !todo.complete)
    },
    [RECEIVE_TODOS] (state, todos) {
        state.todos = todos;
    }
}