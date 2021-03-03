# vue_demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 额外信息
### 打包编译
1. 下载serve：npm i serve -g
2. 打包：npm run build (此时会生成dist目录)
3. 运行serve：serve dist
### eslint
在`npm run dev` 后，eslint会检查代码，根据控制台提示进行修复代码。
一些小问题，我们不认为是问题的代码格式，可以在`.eslintrc.js`中的`rules`中添加规则
开发时，在`.eslintignore` 忽略特定的文件，后面在统一修复

### 开发组件 （comment_page）
使用组件化开发页面
1. 编写入口文件 main.js
```javascript
import Vue from 'vue';
import App from './App.vue'

new Vue({
    el:"#app",
    components:{App},
    template:'<App/>'
});
```
2. 编写组件App.vue
```javascript
import Add from './components/Add.vue';
import List from './components/List.vue';
export default {
    data () {
        return {
            comments:[
                {
                    name:'Bob',
                    content:"Vue 不错"
                },
                {
                    name:'Jack',
                    content:"Vue 好难"
                },
                {
                    name:'rose',
                    content:"Vue 挺简单的"
                },
            ]
        }
    },
    components:{
        Add,
        List
    }
}
```
> 需要引入所需要的组件，如App.vue 需要Add和List组件，那么就需要import进来。
注意：数据使用 `data(){return{}}` 进行编写。
在`components`属性中 写上引入的组件名，然后在template中使用标签(<Add/> 或者 <List/>) 进行使用。
如果需要传递参数，例如给List组件传递data中comments数据，那么需要在template中这样使用：`<List :comments="comments"/>` (其中 `:comments` 为传值的名称，在List取值时使用同样的名称。如果写`:` 就只是普通的属性)

3. List.vue组件使用App.vue 传递的comments数据：
```javascript
export default {
    // 声明接收属性:这个属性，就会成为组件对象的属性
    // 这种方式只指定属性名
    props:['comments'],
    components:{
        Item
    }
}
```
> 这里使用的是 `props` 属性，上面使用 `props:['comments']` 的的方式（需保证 props的值和前面传值名称一致），这样在template里面就可以使用`comments` 数据。
也可以使用：
```javascript
props:{
    // 这种方式指定属性名和属性值的类型
    comment:Object
}
```
4. 修改App.vue,新增添加评论方法
```javascript
 methods:{
    // 添加评论
    addComment(comment){
        this.comments.unshift(comment);
    }
},
```
将方法传递给Add组件:`<Add :addComment="addComment"/>`

5. 编写添加用户评论组件Add.vue
```javascript
export default {
    props:{
        // 指定属性名/属性值的类型/必要性
        addComment:{
            type: Function,
            required: true
        }
    },
    data () {
        return {
            name:'',
            content:'',
        }
    },
    methods:{
        add () {
            // 1. 检查输入的合法性
            const name = this.name.trim()
            const content = this.content.trim();

            if (!name || !content) {
                alert("姓名或内容不能为空！");
                return;
            }
            // 2. 根据输入的数据，封装成一个comment对象
            const comment = {name, content}
            // 3.将comment添加到comments数组中
            this.addComment(comment);
            // 4. 清除输入
            this.name = '';
            this.content = ''
        },
    }
}
```
> Add组件有个点击事件触发add()方法，add()方法组装数据，然后调用 App组件传递过来的addComment方法。
注意：数据在那个组件，更新数据的行为就应该定义在哪个组件

6. 删除评论
思路：先在Item组件定义删除方法，然后在App组件定义删除方法（因为评论数据定义在App组件中）然后逐层传递（App-->List-->Item）App定义的删除方法。最后在Item中调用方法。此时发现需要额外的参数（数组下标），从List组件中传递参数index到Item。
使用`v-show="comments.length==0"` 动态显示标签。

### 开发组件 (todos_page)
1. 鼠标移入移出事件：
onmouseenter,onmouseleave:在元素内，不管是子元素还是本身，都不会触发onmouseleave
onmouseover，onmouseout：只要不是在元素本身（不包含子元素）都不执行，在元素子元素上就会执行 onmouseout
使用方式如下：
```html
<li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)"
    :style="{background:bgColor}">
```
> 注意：
vue在修改data中变量的数据后，如果页面没有绑定使用该变量，那么Vue.devetool.js中的数据还是老数据。

2. 难点：计算属性和监视。使用computed,在调用 computed 的属性时，不能加括号
```javascript
<span>已完成 {{completeSize}}</span>
<button v-show="completeSize > 0" class="btn btn-danger" @click="deleteCompleteTodos">清除已完成任务</button>

computed:{
    completeSize(){
        return this.todos.reduce((preTotal, todo) => {
        return preTotal + (todo.complate ? 1 : 0)
        }, 0);
    },
    isAllCheck : {
        get () {
            // completeSize 不要加括号
            return this.completeSize === this.todos.length && this.todos.length > 0
        },
        // value 是当前checkbox最新的值
        set (value) {
            this.selectAllTodos(value)
        }
    }
}
```
3. 保存到localStorage中，持久化数据
> 注意：
localStorage保存在文件中，且保存的数据格式是key-value格式，且key，value都是字符串类型。
// 下面表达式通过逻辑或进行非空判断并赋值（当前面为null 时，整个表达式返回 '[]'）
JSON.parse(window.localStorage.getItem('todos_key') || '[]')

### 组件之间通信

#### 父子组件传递
1. 父组件定义data数据或method
```html
<TodoList :todos="todos" />
```
2. 子组件使用 props 属性接收
```javascript
// 语法1：
props:['todos']
// 语法2（key是名称，value是类型）：
props:{
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
},
// 语法3：
props:{
    todos:{
        type: Array,
        required: true
    }
}
```
3. 使用：更用自身data数据一样使用
 
#### 绑定事件监听 --- 触发事件
1. 第一种：
给TodoHeader标签对象绑定addTodo事件监听
```html
<TodoHeader @addTodo="addTodo"/> 
```
在子组件中触发:其中第一个参数 addTodo 是事件名， 第二个参数是数据
```javascript
this.$emit("addTodo", todo);
```
2. 第二种：
给标签一个位置hander
```html
<TodoHeader ref="hander"/>
```
在vue加载成功后：
```javascript
// 执行异步代码
mounted () {
    // 这样是给App绑定了监听：this.$on('addTodo', this.addTodo);
    // 给<TodoHeader/> 绑定 addTodo事件监听
    this.$refs.hander.$on('addTodo', this.addTodo);
},
```
在子组件中触发事件
```javascript
// 触发自定义事件：addTodo
this.$emit("addTodo", todo);
```

#### 订阅消息 --- 发布消息
1. 下载：`npm install --save pubsub-js`
> pubsub-js: subscribe 方法（订阅消息）、 publish(发布消息)

2. 订阅消息
```javascript
mounted () {
    // 订阅消息
    // deleteTodo：消息名，发布消息要使用
    // msg：无用
    // index：参数数据
    PubSub.subscribe('deleteTodo', (msg, index)=>{
        this.deleteTodo(index);
    })
},
```
3. 发布消息
```javascript
// 发布消息
// deleteTodo:消息名
// index 参数
PubSub.publish('deleteTodo', index);
```

#### slot 插槽
在组件内，先定义插槽。其中，name定义插槽的名称。
```html
<label>
    <slot name="checkAll"></slot>
</label>
<span>
    <slot name="count"></slot>
</span>
<slot name="delete"></slot>
```
在父组件中写子组件标签，添加slot属性，值是插槽名称
```html
<TodoFooter>
    <input slot="checkAll" type="checkbox" v-model="isAllCheck"/>
    <span slot="count">已完成 {{completeSize}} / 全部 {{todos.length}} </span>
    <button slot="delete" v-show="completeSize > 0" class="btn btn-danger" @click="deleteCompleteTodos">清除已完成任务</button>
</TodoFooter>
```
这样就父组件可以不用传递数据给子组件了，因为插槽使用数据时，都在父组件内。

### ajax请求
1. 下载：`npm i vue-resource -D` `npm i axios -D`
2. vue-resource使用
main.js
```javascript
import VueResource from 'vue-resource'
// 声明使用插件
// 内部会给vm对象和组件对象添加一个属性：$http
Vue.use(VueResource)
```
其它模板文件直接使用
```javascript
this.$http.get(url).then(
    // 成功回调
    response => {
        const result = response.data;
        const mostRepo = result.items[0];
        this.repoUrl = mostRepo.html_url;
        this.repoName = mostRepo.name;
    },
    // 失败回调
    response =>{
        alert("请求失败");
    }
);
```
3. axios 使用
在需要使用的模板文件中引入
```javascript
import axios from 'axios';
```
调用
```javascript
// 使用axios 发送ajax请求
axios.get(url).then(response => {
    const result = response.data;
            const mostRepo = result.items[0];
            this.repoUrl = mostRepo.html_url;
            this.repoName = mostRepo.name;
}).catch(error =>{
    alert("请求失败");
})
```

### UI
1. 下载
```bash
npm i mint-ui -D

npm install --save-dev babel-plugin-component
```
2. 使用： mint-ui
官网地址：https://mint-ui.github.io/#!/zh-cn
+ 修改`.babelrc`文件
```javascript
"plugins": ["transform-vue-jsx", "transform-runtime", ["component", [
            {
                "libraryName": "mint-ui",
                "style": true
            }
        ]
    ]
]
```
+ main.js 编写引入组件
```javascript
import { Button } from 'mint-ui';
// 'mt-button' 为标签名（<mt-button></mt-button>）
// 注册成标签（全局）
Vue.component('mt-button', Button);
// 作用同上
Vue.component(Button.name, Button);
```
+ 使用：
```html
<!-- 引入几个js文件 -->
<!-- built files will be auto injected -->
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
    if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
    } if(!window.Promise) {
    document
    .writeln("<script src='https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js'><\/script>");
    }
</script>
```
+ vue模板文件
```html
<mt-button type="default" @click.native="handleClick">default</mt-button>
```

### 路由
1. 下载路由:`npm i vue-router -D`
2. 定义前台路由组件（放入views文件下）
3. 新建路由器模块（router文件夹下的index.js）
```javascript
/* 
    路由器模块
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Home from '../views/Home.vue';

// 明确地安装路由功能：
Vue.use(VueRouter);
export default new VueRouter({
    // 配置n个路由
    routes:[
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        },
        {
            path:'/',
            redirect:'/about'
        }
    ]
})
```
4. 在主组件App中使用路由：
```html
<router-link to="/about" class="list-group-item">About</router-link>
<router-link to="/home" class="list-group-item">Home</router-link>
<!-- 在需要显示组件的地方使用标签 -->
<router-view></router-view>
```
> 当路由被选中时会有个class:router-link-active
#### 嵌套路由
```javascript
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
            component: Message
        }
    ]
},
```
#### 缓存路由组件
```html
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
#### 向路由传递数据
+ 在路由地址上加上参数：
```javascript
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
```
router-link 标签上添加参数
```html
 <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
```
最后在组件的 `$route` 中取params
```javascript
const id = $route.params.id
```
+ 在标签上添加属性传值
```html
<router-view msg="abc"></router-view>
```
此时路由子组件通过`props`属性定义变量
```javascript
export default {
    props:{
        msg:String
    }
}
```
最后使用
```html
<h2>{{ msg }}</h2>
```

#### 编程式路由导航
1. 定义事件
```html
<button @click="pushShow(message.id)">push查看</button>
<button @click="replaceShow(message.id)">replace查看</button>
```
2. 定义方法
```javascript
methods:{
    pushShow(id){
        this.$router.push(`/home/message/detail/${id}`)
    },
    replaceShow(id){
        this.$router.replace(`/home/message/detail/${id}`)
    }
},
```
3. 回退方法：
```html
<button @click="$router.back()">回退</button>
```