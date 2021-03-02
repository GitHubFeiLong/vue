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
鼠标移入移出事件：
onmouseenter,onmouseleave:在元素内，不管是子元素还是本身，都不会触发onmouseleave
onmouseover，onmouseout：只要不是在元素本身（不包含子元素）都不执行，在元素子元素上就会执行 onmouseout
使用方式如下：
```html
<li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)"
    :style="{background:bgColor}">
```
> 注意：
vue在修改data中变量的数据后，如果页面没有绑定使用该变量，那么Vue.devetool.js中的数据还是老数据。

难点：计算属性和监视。使用computed,在调用 computed 的属性时，不能加括号
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