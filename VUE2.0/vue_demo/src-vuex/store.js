/* Vuex的核心管理对象模块 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 状态
const state = { //初始化状态
    count:0,
}
// 包含多个更新state函数的对象
const mutations = {
    // 增加的mutation
    increment (state) {
        state.count++;
    },
    // 减少的mutation
    decrement (state) {
        state.count--;
    },
}
// 包含多个对应事件回调函数
const actions = {
    // 增加的action
    increment ({commit}) {
        // 提交mutation
        commit('increment')
    },
    // 减少的action
    decrement ({commit}) {
        // 提交mutation
        commit('decrement')
    },
    incrementIfOdd ({commit, state}) {
        if (state.count % 2 === 1) {
            // 提交mutation
            commit('increment')
        }
    },
    incrementAsync ({commit}) {
        // 在action中直接就可以执行异步代码
        setTimeout(()=>{
            // 提交mutation
            commit('increment')
        }, 1000)
    }
}

const getters = {
    // 不需要调用，只需要读取属性值
    evenOrOdd (state) {
        return state.count % 2 === 0 ? '偶数' : '奇数';
    }
}
// 包含多个getter计算属性函数的对象
export default new Vuex.Store({
    // 状态
    state,
    // 包含多个更新state函数的对象
    mutations,
    // 包含多个对应事件回调函数
    actions,
    // 包含多个getter计算属性函数的对象
    getters,
})