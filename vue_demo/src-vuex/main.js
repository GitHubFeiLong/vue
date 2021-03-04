import Vue from 'vue';
import App from './App.vue'
import store from './store'

// 配置对象的属性名都是一些确定的名称，不能随便修改
new Vue({
    el:"#app",
    components:{App},
    template:'<App/>',
    // 所有组件对象都多了一个属性：$store
    store
});