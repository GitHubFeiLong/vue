# VUE
>该文件是将自己对观看Vue学习视频进行的一个笔记汇总记录

## Vue 的基本认识

英文官网: https://vuejs.org/
中文官网: https://cn.vuejs.org/  

1. 渐进式 JavaScript 框架 
2. 作者: 尤雨溪(一位华裔前 Google 工程师) 
3. 作用: 动态构建用户界面 

### Vue 的特点

1. Vue 的特点
2. 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
3. 它本身只关注 UI, 可以轻松引入 vue 插件或其它第三库开发项目

### 与其它前端 JS 框架的关联  

1. 借鉴 angular 的模板和数据绑定技术
2. 借鉴 react 的组件化和虚拟 DOM 技术

### Vue 扩展插件  

1. vue-cli: vue 脚手架
2. vue-resource(axios): ajax 请求
3. vue-router: 路由  
4. vuex: 状态管理  
5. vue-lazyload: 图片懒加载  
6. vue-scroller: 页面滑动相关  
7. mint-ui: 基于 vue 的 UI 组件库(移动端)  
8. element-ui: 基于 vue 的 UI 组件库(PC 端)  

##  Vue 简单使用

> 使用浏览器应用商店，下载 Vue.js devtools 插件

### 开发基本流程

1. 导入vue包

```html
<!-- 1.导入Vue包 -->
<script src="../../lib/vue.min.js"></script>
```

2. 创建一个Vue的实例

```javascript
// 当我们导入包之后，在浏览器的内存中么就多了一个Vue的构造函数
// 注意：我们 new 出来的 vm对象就是我们MVVM中 VM调度者
var vm = new Vue({
    el: '#app', // 表示当前我们new 的这个Vue实例，要控制页面上的那个区域
    // 这里的data 就是MVVM 中的M，专门保存每个页面的数据
    data: { // data 属性中，存放的是el中要用到的数据
        msg: '欢迎学习Vue' // 通过Vue提供的指令，很方便的就能把数据渲染到页面上，程序员不在手动操作DOM元素了【全段的Vue之类的框架，不提倡我们去手动的操作DOM元素了】

    }
});
```

3. 页面html中使用

```html
<!-- 将来new的Vue的实例，会控制这个元素中的所有内容 -->
<!-- Vue 实例所控制的这个元素区域，就是我们的V -->
<div id="app">
    <p>{{msg}}</p>
</div>
```

> 额外笔记：
>
> 这里使用了插值表达式`{{msg}}`给标签p进行赋值。
>
> 注意：在 vm 实例中，如果想要调用 data 上的数据，或者想要调用 methods 中的方法， 必须通过 this.数据属性名 或 this.方法名 来进行访问，这里的this，就表示我们 new 出来的 VM 实例对象
>
> 注意： VM实例，会监听自己身上 data 中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data上同步到页面中去：【好处：程序员只需要关心数据，不需要考虑考虑如何重新渲染DOM页面】
>
> MVVM
> model：模型，数据对象（data）
> view:视图，模板页面
> viewModel：视图模型（Vue的实例）

### Vue的指令

指令(以v-开以的自定义标签属性),注意：Vue中所有的指令，在调用的时候，都以 v- 开头

#### 插值表达式：`{{var}}` 

插值表达式`{{var}}` ，其中var就是定义在vue实例对象的data属性中的变量。注意,插值表达式会出现页面闪烁(页面加载时会看见插值表达式赋值前的代码)

> 插值表达式中，可以写js代码，例如:`{{msg}}`,其中msg变量存储的是一个字符串，那么可以这样使用：`{{msg.toUpperCase()}}`。

#### v-text

`v-text` 是没有闪烁的问题，v-text 会覆盖元素中原本的内容，但是插值表达式，只会替换自己的这个占位符，不会把整个元素的内容清空

```html
<h4 v-text="msg">====</h4>
```

#### v-html

 将字符串中的标签解析

```html
<div v-html="msg2"></div>
<script>
    var vm = new Vue({
        // 只列出data值
        data:{
           msg2:'<h1>哈哈 我是一个H1</h1>'
        },
    })
</script>
```

#### v-cloak

能够解决 插值表达式闪烁的问题,只会替换自己的这个占位符，不会把整个元素的内容清空

```html
<style>
	[v-cloak]{
    	display: none;
    }
</style>
<p v-cloak>++++++{{msg}}-------</p>
```

#### v-bind 指令

 是vue中提供的用于**属性绑定**的指令(写在data中)，指令可以被简写为 `:`要绑定的属性:

```html
<img v-bind:src="imgUrl">
<img :src="imgUrl">
```

#### v-on

vue中提供了 v-on: **事件绑定** 机制(写在 methods 中)，指令可以被简写为`@`事件机制：

>  在Vue中，使用事件绑定机制，为元素指定处理函数的时候，可以添加小括号进行传参(add())

```html
 <!-- vue 中提供了 v-on: 事件绑定 机制 -->
<input type="button" value="按钮" v-on:click="show" v-on:mouseover="show">
<input type="button" value="按钮" @click="show" @mouseover="show">

<script>
    var vm = new Vue({
        el:"#app",
        methods:{ // 这个 method属性中定义了当前vue实例的所有可用的方法
            show:function(){
                alert("show");
            }
        }
    });
</script>
```

#### v-model

v-model指令**实现双向绑定**，v-bind: 只能实现数据的单向绑定，从 M 自动绑定到 V， 无法实现数据的双向绑定,使用 v-model 指令，可以实现 表单元素(input select checkbox textarea)和 Mode 中数据的双向数据绑定。**注意**：v-model 只能运用在表单元素中。

```html
<input type="text" v-model="msg">
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            msg:"大家都是好学生"
        }
    })
</script>
```

### 事件修饰符

1. 阻止冒泡`.stop`，下面的例子效果是：当点击button后不会触发div的点击事件

```html
<!-- 1、使用 .stop 阻止冒泡 -->
<div class="inner" @click="devHandler">
	<input type="button" value="戳他" @click.stop="btnHandler">
</div>
```

2. 使用 `.prevent` 阻止默认行为,下面点击a标签会调用定义的函数`link()`

```html
<a href="http://www.baidu.com" @click.prevent="link">跳转百度</a>

<script>
	var vm = new Vue({
        el:'#app',
        methods:{
            link(){
                console.log("这是 a标签点击的事件");
            }
        }
	})
</script>
```

3. 使用 .capture 实现捕获触发事件的机制。下面这样和默认冒泡是一样的效果

```html
<div class="inner" @click.capture="divHandler">
    <input type="button" value="戳他" @click="btnHandler">
</div>
<script>
	methods:{
        divHandler(){
            console.log("这是 inner div的点击事件");
        },
        btnHandler(){
            console.log("这是 触发了按钮的点击事件");
        }
    }
</script>
```

4. 使用 `.self` 实现只有点击当前元素时候才触发事件处理函数（`.self` 只会阻止自己身上冒泡行为的触发，并不会真正阻止冒泡的行为）

```html
<div class="inner" @click.self="devHandler">
    <input type="button" value="戳他" @click="btnHandler">
</div>
<script>
    divHandler(){
        console.log("这是 inner div的点击事件");
    },
    btnHandler(){
        console.log("这是 触发了按钮的点击事件");
    },
</script>
```

5. 使用 `.once` 只触发一次事件处理函数（同`.prevent`一样效果）

```html
<a href="http://www.baidu.com" @click.prevent.once="link">跳转百度</a>
```

> 其它笔记：
>
> 事件机制可以传递一个参数`$event`，使用此参数可以获取点触发事件的节点标签信息
>
> ```html
> <button @click="test4(123, $event)">test4</button>
> <script>
>     test4(num, event){
>         alert(num + '--' + event.target.innerHTML);
>     },
> </script>
> ```
>
> 
>
> 点击事件：`@click`, 案件事件：`@keyup`（回车事件：`@keyup.13` 或 `@keyup.enter`）



### Vue中的样式

#### class

1. 第一种是用方式，直接传递一个数组，注意： 这里的class需要使用 v-bind 做数据绑定

```html
<h1 :class="['thin','red', dataStr]">h1</h1>
```

2. 第二种在数组中使用三元表达式(flag是data中的变量)

```html
<h1 :class="['thin','red', flag?'active':'']">h1</h1>
```

3. 第三种在数组中使用对象来代替三元表达式，提高代码的可读性(flag是data中的变量)

```html
<h1 :class="['thin','red', {'active':flag}]">h1</h1>
```

4. 第四种在为 class 使用 v-bind 绑定 对象的时候，对象的属性是类名，由于 对象的属性可带引号，也可不带引号，所以这里可以没写引号；属性的值是一个标识符（为true时class才会生效）

```html
<h1 :class="{thin:true, red:false, active:true, italic:false}">h1</h1> 
```

5. 使用data巧妙进行class绑定

```html
 <h1 :class="classObj">h1</h1>
<script>
	data : {
        flag:false,
        classObj:{thin:true, red:true, active:true, italic:false}
    }
</script>
```

#### style

1. 直接使用对象（对象就是无序键值对的集合（注意：键不能有中横线））

```html
<span :style='{color:"red", "background-color":"blue", "font-weight":100}'>这是一个h1</span>
```

2. 使用 data 中的数据进行样式设置 

```html
<span :style='styleObj1'>这是一个h1</span>

<script>
	data:{
        styleObj1:{color:"red", "background-color":"blue", "font-weight":100},
    }
</script>
```

3. 使用多个样式对象

```html
<span :style='[styleObj1, styleObj2]'>这是一个h1</span>
<script>
	data : {
        styleObj1:{color:"red", "background-color":"blue", "font-weight":100},
        styleObj2:{"font-style":"italic"}
    }
</script>
```

### 动画

1.使用 transition 元素，把 需要被动画控制的元素，包裹起来。

> transition 元素 是Vue官方提供的。
>
> ```html
> <transition>
>  <h3 v-if="flag">这是一个h3</h3>
> </transition>
> ```
>
> 可以自定义name属性：
>
> ```html
> <transition name="my">
>     <h3 v-if="flag2">这是一个h3</h3>
> </transition>
> ```
>
> 这时`v-`都要改成`my-`
>
> ```css
> .my-enter,.my-leave-to{
>     opacity: 0;
>     transform:translateY(100px)
> }
> .my-enter-active,.v-leave-active{
>     transition: all 0.8s ease;
> }
> ```

2. 自定义两组样式，来控制transition 内部的元素实现动画。

   + v-enter 【这是一个时间点】是进入之前，元素的起始状态，此时还没开始进入。

   + v-enter-active 【入场动画的时间段】。

   + v-leave-to 是动画离开之后，离开的终止状态，此时，元素动画已经结束

   + v-leave-active 【离场动画的时间段】

   > 如果 `<transition name="my"></transition>` 使用了`name`属性，那么`v-enter` 要写成`my-enter`,其他同理。

3. 使用第三方ui框架，实现第三方类修改样式显示

```html
<transition enter-active-class="animate__bounceIn" leave-active-class=" animate__bounceOut">
    <h3 v-if="flag">这是一个h3</h3>
</transition>
```

4. 使用 :duration 来统一设置 入场和离场时候的动画时长

```html
<transition :duration="100" enter-active-class=" animate__bounceIn" leave-active-class=" animate__bounceOut">
        <h3 v-if="flag">这是一个h3</h3>
    </transition>

  <!-- 使用 :durationm"{ enter: 200， leave: 400 }” 来分别设置入场的时长和离场的时长-->
<transition :duration="{enter:200, leave:400}" enter-active-class=" animate__bounceIn" leave-active-class=" animate__bounceOut">
        <h3 v-if="flag">这是一个h3</h3>
    </transition>
```

5. 使用钩子函数

```html
<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
    <div class="ball" v-show="flag"></div>
</transition>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            flag:false
        }
        , methods:{
            // 注意：动画钩子函数的第一个参数：el，表示要执行动画的那个DOM元素是个原生的DOM对象
            // document.getElementById('') 方式获取到的原生js对象
            beforeEnter(el){
                // beforeEnter 表示动画入场之前，此时，动画尚未开始，可以在beforeEnter中设置元素开始动画之前的起始样式
                // 设置小球开始动画之前的，起始位置
                el.style.transform = "translate(0,0)";
            }
            ,enter(el, done){
                // 这句话没有实际的作用，但是不写，出不来动画效果
                // 可以认为 el.offsetWidth 会强制刷新
                el.offsetWidth
                // enter 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的结束状态
                el.style.transform = "translate(150px,450px)";
                el.style.transition = "all 1s ease";

                // 这里的done，其实就是 afterEnter函数，也就是说：done 是afterEnter 函数的引用
                done();
            }
            ,afterEnter(el){
                // 动画完成之后，会调用after
                console.log("ok")
                this.flag = false;
            }
        }
    })
</script>
```

6. transition-group

 在实现列表过渡的时候，如果需要过渡的元素是通过 v-for 循环渲染出来的，不能使用 `transition` 包裹，需要使用 `transition-group` 。如果要为 v-for 循环创建的元素设置动画，必须为每一个元素 设置 `:key` 属性,给 transition-group 添加 `appear`属性 ，实现页面刚入场时候的效果。通过为 transition-group 元素，设置`tag`属性，指定transition-group 渲染为指定的元素，如果不指定 tag属性默认渲染为 span元素

```html
<transition-group appear tag="ul">
    <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
        {{ item.id }} --- {{ item.name }}
    </li>
</transition-group>
```



### 条件渲染

#### v-if / v-else-if / v-else

> `v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”。

 v-if的特点：每次都会重新删除或创建元素
v-if 有较高的切换性能消耗
如果元素涉及到频繁的切换，最好不要使用v-if

#### v-show

v-show的特点：每次不会重新进行DOM的删除和创建操作，只是切换了display的属性值
v-show 有较高的初始渲染消耗
如果元素可能永远也不会显示出来被用户看到，则推荐使用v-if

#### v-if VS v-show

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

### 循环

> Vue本身只是监视了数组的改变，没有监视数组内部数据的改变。（界面不会更新）
>
> Vue重写了数组中的一系列改变数组内部数据的方法（先调用原生，然后更新界面）---> 数组内部变化。（界面自动变化）
>
> Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
>
> push()
>
> pop()
>
> shift()
>
> unshift()
>
> splice()
>
> sort()
>
> reverse()

#### v-for循环普通数组

```html
<div id='app'>
    <!-- item是循环的当前对象，i是索引，可以省略索引直接使用：v-for="item in list" -->
    <p v-for="(item, i) in list">索引值：{{i}}， 值：{{item}}</p>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            <!--这里是普通数组-->
            list:[1,2,3,4,5,6]
        }
    })
</script>
```

#### v-for循环对象数组

```html
<div id='app'>
    <p v-for="(user, i) in list">索引：{{i}} ID:{{user.id}}, name:{{user.name}}</p>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            <!--这里是对象数组-->
            list:[
                {id:1, name:'张三1'},
                {id:2, name:'张三2'},
                {id:3, name:'张三3'},
                {id:4, name:'张三4'},
            ]
        }
    })
```

#### v-for循环对象

```html
<div id='app'>
    <!-- 注意：在遍历对象身上的键值对的时候，除了有val key，在第三个位置还有一个索引 -->
    <p v-for="(val, key, index) in user">值是：{{val}}， 键是：{{key}}, 索引值：{{index}}</p>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            user:{
                id:1,
                name:"zhangshan",
                gender:'男'
            }
        }
    })
</script>
```

#### **v-for迭代数字**

```html
<div id='app'>
    <!-- in 后面我们放过 普通数组，对象数组，对象，还可以放数字 -->
    <!-- 注意：如果使用v-for迭代数字的话，前面的count 值从1 开始（1..10） -->
    <p v-for="count in 10"> 这是第 {{count}} 次循环</p>
</div>
```

#### **v-for 循环中key属性的使用**

```html
<!-- 注意：v-for循环的时候，key属性只能使用name或者string -->
<!-- 注意key 在使用的时候，必须使用 v-bind: 书香绑定的形式，指定key的值 -->
<!-- 在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题，必须在使用v-for的同时，指定唯一的字符串/数字 类型:key 值 -->
<p v-for="item in list" v-bind:key="item.id">
    <input type="checkbox">{{item.id}} ---
    {{item.name}}
</p>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            id:"",
            name:"",
            list:[
                {id:1, name:'李斯'},
                {id:2, name:'秦始皇'},
                {id:3, name:'赵高'},
                {id:4, name:'韩非'},
                {id:5, name:"荀子"}
            ]
        },
        methods:{
            add(){
                this.list.unshift({id:this.id, name:this.name})
            }
        }
    })
</script>
```

### 过滤器

#### 全局过滤器

所谓的全局过滤器，所有vue实例共享。

过滤器的定义语法：

```javascript
Vue.filter('过滤器的名称', function(){})
```

>  过滤器中的function，第一个参数，已经被规定死了， 永远都是过滤器管道符前面 传递过来的数据

例如：

> 这里使用形参`str2`的默认值为空字符串。
>
> 过滤器可以传递多个参数到过滤器中的function中
>
> 也可以调用多个过滤器 msgFormat 和 test

```javascript
<p>{{msg | msgFormat('疯狂', '123') | test }}</p>

// 定义一个Vue 全局过滤器，名字叫做msgFormat
Vue.filter('msgFormat', function(data, str1, str2=''){
    // 字符串的 replace方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
    return data.replace(/单纯/g, str1 + str2);
})
Vue.filter('test', function(data){
    return data + "=====";
})

```

> 时间格式库：moment

### 生命周期

#### beforeCreate

表示实例完全被创建出来之前，会执行它。

> 注意：在beforeCreate 生命周期函数执行的时候，data和methods中的数据都还没初始化。

#### created

在created中，data和methods都已经被初始化好了,如果要调用 methods中的方法，或者操作data中的数据，最早只能在created中进行操作。

#### beforeMount

表示 模板已经在内存编译完成，未渲染到页面中去，在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，还是之前的写的一些模板字符串

#### mounted

表示，内存中的模板，已经真实的挂载到页面中，用户已经可以看到渲染好的页面了。

> 注意：mounted 是实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例，就静静的 躺在我们内存中，一动不动

#### beforeUpdate

这时候，表示 我们的界面还没有被更新 （数据已经被更新了），当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data中的数据是最新的，页面尚未和最新的数据保持同步

#### updated

updated事件执行的时候,页面和 data 数据已经保持同步了,都是最新的。

#### beforeDestory

当执行beforeDestroy钩子函数的时候, Vue实例就已经从运行阶段,进入到了销毁阶段。当执行beforeDestroy 的时候,实例身上所有的data和所有的methods，以及过滤器、指令....都处于可用状态,此时,还没有真正执行销毁的过程

#### destoryed

当执行到destroyed函数的时候，组件已经被完全销毁了,此时, 组件中所有的数据、方法，指令、过滤器....都已经不可用了

> ```javascript
> var vm = new Vue({
>   el:'#app',
>   data : {},
>   methods:{},
>   beforeCreate(){ }
>   ,created(){}
>   ,beforeMount() {}
>   ,mounted(){}
>   // 接下来是运行中的两个事件
>   ,beforeUpdate(){}
>   ,updated(){}
>   ,beforeDestory(){}
>   ,destoryed(){}
> })
> ```



### Ajax请求

#### vue-resource

注意：vue-resource 依赖于 Vue，所以先后顺序注意（先引入Vue，然后再引入vue-resource）

> ```javascript
> import Vue from 'vue';
> import VueResource from 'vue-resource'
> 
> // 声明使用插件
> // 内部会给vm对象和组件对象添加一个属性：$http
> Vue.use(VueResource)
> ```
>
> 声明使用插件vue-resource后，vue有一个$http属性可以使用。

##### get请求

```javascript
// 发ajax请求获取数据
const url = `https://api.github.com/search/repositories?q=v&sort=stars`;
// 发送get请求
this.$http.get(url).then(
    // 成功回调
    response => {
        const result = response.data;
    },
    // 失败回调
    response =>{
        alert("请求失败");
    }
);
```

##### post请求

```javascript
// 发送post请求
// 发起post 请求 application/x-www-form-urlencodecd
// 手动发起 的post请求，默认没有表单格式，所以，有的服务器处理不了
// 通过post方法的第三个参数,设置提交的内容类型为普通表单数据格式{ emulateJSON : true}
this.$http.post('http://vue.studyit.io/api/post',{}, {emulateJSON:true})
    .then(function(result){
        // 通过 result.body拿到服务器返回的成功的数据
        console.log(result.body);
});

```

##### jsonp 请求

```javascript
this.$http.jsonp('http://vue.studyit.io/api/jsonp')
    .then(function(result){
        // 通过 result.body拿到服务器返回的成功的数据
        console.log(result.body);
});
```

#### [axios](http://www.axios-js.com/)

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

##### 特性：

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

##### 案例

执行 `GET` 请求

```javascript
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行 `POST` 请求

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行多个并发请求

```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

