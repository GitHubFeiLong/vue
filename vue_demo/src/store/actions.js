/* 
    接收组件通知触发mutation调用间接更新状态的方法的对象
*/
import {ADD_TODO, DELETE_ITEM, SELECT_ALL_TODOS,CLEAR_ALL_COMPLETE} from './mutation-types'

export default {
    addTodo ({commit}, todo) {
        // 提交对mutation的请求
        commit(ADD_TODO, {todo});
    },
    deleteItem ({commit}, index) {
        commit(DELETE_ITEM, {index})
    },
    selectAllTodos ({commit}, boo) {
        console.log("123");
        commit(SELECT_ALL_TODOS, {boo});
    },
    clearAllComplete ({commit}) {
        commit(CLEAR_ALL_COMPLETE)
    }
}