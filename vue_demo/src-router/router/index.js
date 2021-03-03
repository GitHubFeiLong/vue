/* 
    路由器模块
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Home from '../views/Home.vue';
import News from '../views/News.vue';
import Message from '../views/Message.vue';
import MessageDetail from '../views/MessageDetail.vue';
// 明确地安装路由功能：
Vue.use(VueRouter);

export default new VueRouter({
    // 配置n个路由
    routes:[
        {
            path:'/',
            redirect:'/about'
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children:[
                {
                    path:'',
                    redirect:'news'
                },
                {
                    //path最左侧的 '/' 代表根路径
                    path: 'news', 
                    component: News
                },
                {
                    path: '/home/message',
                    component: Message,
                    children:[
                        {
                            // 使用:id占位
                            path:'/home/message/detail/:id',
                            component: MessageDetail
                        }
                    ]
                }
            ]
        },
        
    ]
})