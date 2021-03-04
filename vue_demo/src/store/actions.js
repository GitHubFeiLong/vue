/* 
    接收组件通知触发mutation调用间接更新状态的方法的对象
*/
import {ADD_TODO, DELETE_ITEM, SELECT_ALL_TODOS,CLEAR_ALL_COMPLETE, RECEIVE_TODOS} from './mutation-types'
import storageUtil from '../util/StorageUtil'

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
    },
    // 异步获取todos并更新状态
    reqTodos ({commit}) {
        // 模拟
        setTimeout(()=>{
            // 1000
            const todos = storageUtil.readTodos()
            // 提交mutation
            commit(RECEIVE_TODOS, todos)
        }, 1000)
    }
}