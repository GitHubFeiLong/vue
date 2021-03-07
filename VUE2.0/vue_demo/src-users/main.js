import Vue from 'vue';
import VueResource from 'vue-resource'
import App from './App.vue'


// 声明使用插件
// 内部会给vm对象和组件对象添加一个属性：$http
Vue.use(VueResource)

new Vue({
    el:"#app",
    components:{App},
    template:'<App/>'
});