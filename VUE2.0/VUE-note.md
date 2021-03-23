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

### Vue的属性

#### watch

- **类型**：`{ [key: string]: string | Function | Object | Array }`

- **详细**：

  一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个 property。

> 通过vm对象的$watch()或watch配置来监视指定的属性，当属性变化时，回调函数自动调用，在函数内部进行计算。
>
> ```javascript
>  watch:{ // 配置监视
>      firstName:function(newVal, oldval){ // firstName 发生变化
>          console.log(this); // this 就是 vm对象
>          this.fullName2 = newVal + ' ' + this.lastName
>      }
>  }
> 
> vm.$watch('lastName', function(newVal, oldVal){
>     // 更新fullName2
>     this.fullName2 = this.firstName + ' ' + newVal;
> })
> ```
>
> 

#### computed

- **类型**：`{ [key: string]: Function | { get: Function, set: Function } }`

- **详细**：

  计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

  注意如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

  ```
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

  计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算。注意，如果某个依赖 (比如非响应式 property) 在该实例范畴之外，则计算属性是**不会**被更新的。

>  在computed属性对象中定义计算属性的方法，在页面中使用{{方法名}}来显示计算的结果.
> 什么时候执行：初始化显示时/相关的data属性数据发生变化
>
> ```javascript
>  computed:{
>      // 什么时候执行：初始化显示时/相关的data属性数据发生变化
>      // 计算并返回当前属性的值
>      fullName1(){  // 计算属性中的一个方法，方法的返回值作为属性值
>          console.log("fullName1 调用了");
>          return this.firstName + ' ' + this.lastName;
>      },
>          fullName3 : {
>              // 回调函数 1. 你定义的 2.你没有调用 3.但最终它执行了
>              // 什么时候调用？当需要读取当前属性值的时候调用
>              // 用来做什么？根据相关的数据计算并返回当前属性的值
>              // 回调函数，计算并返回当前属性的值
>              get () {
>                  return this.firstName + ' ' + this.lastName;
>              },
>                  // 回调函数，监视当前属性值的变化，当属性值发生改变时回调，更新相关的属性数据
>                  set (val) { // val 就是fullName3 的最新属性值
>                      var names = val.split(' ');
>                      this.firstName = names[0];
>                      this.lastName = names[1];
>                  }
>          }
> 
>  },
> ```
>
> 

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

#### 自定义指令

1. 注册全局指令

```javascript
Vue.directive('my-directive', function(el, binding){
	el.innerHTML = binding.value.toUpperCase();
})
```

2. 注册局部指令

```javascript
vm = new Vue({ // 配置对象
    el:'#app',  // element 选择器
    data:{  
        msg1:'Think iN jAva'
    },
    /* 局部指令：只在当前vm管理范围内有效 */
    directives:{
        'my-directive':{
            bind(el, binding){
                el.innerHTML = binding.value.toUpperCase()
            }
        }
    }
});
```

3. 使用指令: v-my-directive='xxx'

>  el:指令属性所在的标签对象
> binding:包含指令相关信息数据的对象

### 事件

#### 点击事件

使用方式：`v-on:click="fun"` or `@click="fun"`

#### 键盘事件

使用方式：`v-on:keyup.enter="fun"` or `@keyup.13="fun"`

#### 移入移出事件

onmouseenter,onmouseleave、onmouseover，onmouseout 两组鼠标移入移出事件。使用方式：`@mouseenter`...

它们之间的区别：

onmouseenter,onmouseleave:在元素内，不管是子元素还是本身，都不会触发onmouseleave

onmouseover，onmouseout：只要不是在元素本身（不包含子元素）都不执行，在元素子元素上就会执行 onmouseout

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

> 下载：`npm i vue-resource -D` `npm i axios -D`

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

在需要使用的模板文件中引入

```javascript
import axios from 'axios';
```

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

### 组件

> 注意：不论是哪种方式创建出来的组件，组件的template属性指向的模板内容，必须有且只能有唯一的一个根元素

#### 创建组件的方式

**方式一**：使用 Vue.extend 来创建全局的Vue组件。

```html
<div id='app'>
    <!-- 如果要使用组件，直接把组建的名称，以HTML 标签的形式，引入到页面中，即可 -->
    <my-com1></my-com1>
</div>
<javascript>
    // 1. 创建组件
	var com1 = Vue.extend({
        // 通过template属性，制定了组件要展示的的HTML 结构
        template:'<h3>这是使用 Vue.extend 创建的组件</h3>' 
    });
    // 使用组件
    Vue.component('myCom1', com1);
</javascript>
```

> Vue.component 第一个参数：组件的名称，将来在引入组件的时候，就是一个标签形式来引入它。 第二个参数： Vue.extend 创建的组件，其中template就是组件将来要展示的HTML内容

**方式二**：直接使用 component

```html
<div id='app'>
    <!-- 还是使用标签形式进行引用自己的组件 -->
    <mycom2></mycom2>
</div>
<script>
    Vue.component('mycom2', Vue.extend({
        template:`<div>
            		<h3>这是直接使用 Vue.component 创建出来的组件</h3>
            		<span>123</span>
    			</div>`
    }))
</script>
```

**方式三**：在被控制的 #app 外面 使用 template 元素，定义组件的HTML结构

```html
<div id='app'>
    <mycom3></mycom3>
    <login></login>
</div>
<!-- 在被控制的 #app 外面  使用 template 元素，定义组件的HTML结构 -->
<template id="temp1">
    <div>
        <h1>这是通过template元素，在外部定义的组件结构，这个方式，有代码的提示和高亮</h1>
        <h3>好用，不错！</h3>
    </div>
</template>
<script>
    // 全局
    Vue.component('mycom3',{
        template:'#temp1'
    })
    var vm = new Vue({
        el:'#app',
        // 局部
        components:{
            // 定义实例内部私有的组件
            login:{
                // template:'<h1>这是私有的 login 组件</h1>'
                template:'#temp1'
            }
        }
    })
</script>
```

#### 组件中的data和methods

1. 组件可以有自己的`data`数据。
2. 组件的`data` 和 实例得 data 有点不一样，实例中得 data可以为一个对象，但是组件中得data必须是一个方法。且这个方法内部，必须返回一个对象才行。

3. 组件中的 data 数据，使用方式，和实例中的data 使用方式完全一样。
4. 组件中的 `methods` 和实例的 methods属性一样使用

```javascript
 Vue.component('mycom1',{
     template:'<h1 @click="myFun">这是全局组件 ---- {{msg}}</h1>',
     data:function(){
         return {
             msg: '这是组件中的 data 定义数据'
         };
     },
     methods: {
         myFun(){
             alert(1);
         }
     }
 })
```

> 当我们的data是一个函数的时候，每一个实例的data属性都是独立的，不会相互影响了。

#### 组件之间切换方式

1. 使用`v-if v-else-if v-else`

```html
<div id='app'>
    <a href="javascript:void(0)" @click.prevent="flag=true">登录</a>
    <a href="javascript:void(0)" @click.prevent="flag=false">注册</a>
    <login v-if="flag"></login>
    <register v-else></register>
</div>
<script>
Vue.component('login',{
    template:'<h3>登录组件</h3>'
})
Vue.component('register',{
    template:'<h3>注册组件</h3>'
})
var vm = new Vue({
    el:'#app',
    data : {
        flag:true
    }
})
</script>
```

2. 使用vue提供的标签`component` 来进行占位

```html
<component :is="complateId"></component>
var vm = new Vue({
    el:'#app',
    data : {
        //  当前 component 组件的名称
        complateId:"login"
    }
})
```

> component 是一个占位符，` :is` 属性，可以用来指定要展示的组件的名称

#### 组件切换动画

mode： 控制离开/进入过渡的时间序列。有效的模式有 `"out-in"` 和 `"in-out"`；默认同时进行。

```html
<style>
    .v-enter,.v-leave-to{
        opacity:0;
        transform: translateX(150px);
    }

    .v-enter-active, .v-leave-active{
        transition:all 0.5s ease;
    }

</style>
<!-- 通过 mode 属性，设置组件切换时候的 模式 -->
<transition mode="out-in">
    <component :is="complateId"></component>
</transition>
```

#### 组件之间的通信

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

3. 使用：跟用自身data数据一样使用

##### 绑定事件监听 --- 触发事件

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

##### 订阅消息 --- 发布消息

1. 下载：`npm install --save pubsub-js` （pubsub-js: subscribe 方法（订阅消息）、 publish(发布消息)）

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

##### **slot 插槽**

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



#### 父组件给子组件传值

父组件，可以在引用子组件的时候，通过 属性绑定(v-bind:) 的形式，把 需要传递给子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用。

例如下面的例子，将父组件的`msg` 值传递给子组件中

```html
<com1 v-bind:parentmsg="msg"></com1>
```

子组件在`props` 属性中先定义`parentmsg`，然后才能使用

```javascript
var vm = new Vue({
    el:'#app',
    data : {
        msg: '123 啊-父组件中的数据'
    }
    ,components:{
        com1:{
            // data 上的数据，都是可读可写的
            data(){
                return {
                    title: '123',
                };
            },
            template:'<h1 @click="change">这是子组件 --- {{ parentmsg }}</h1>',
            props: ['parentmsg'],
            methods:{
                change(){
                    this.parentmsg = '被修改了'
                }
            }
        }
    }
})
</script>
```

> 结论：经过演示，发现，子组件中，默认无法访问到父组件中的 data上的数据和 methods中的方法。
>
> 注意：子组件中的 data 数据，并不是通过父组件传递过来的，而是子组件自身私有的，比如：子组件通过 Ajax，请求回来的数据，都可以放到 data 身上；
>
> 注意：组件中的所有 props 中的数据，都是通过 父组件传递给子组件的。
>
> 组件也有生命周期钩子函数

#### 子组件使用父组件的方法

父组件向子组件传递方法，使用的是 事件绑定机制； v-on（@），当我们自定义了 一个 事件属性后之后（下面例子定义了一个`func`事件，当事件触发时，会执行父组件的`show`方法）， 那么子组件就能够 通过某些方式，来调用 传递进去的这个方法了。

```html
<com2 v-on:func="show"></com2>
```

然后，在子组件中就可以使用`$emit` 触发自定义的事件：

```html
<template id="tmp1">
    <div>
        <h1>这是 子组件</h1>
        <input @click="myclick" type="button" value="这是子组件中的按钮-点击它，触发父组件中的方法">
    </div>
</template>
<script>
    var com2 = {
        template: "#tmp1" // 通过指定了一个 Id，表示说，要去加载 这个指定id 的 template元素中的内容，当作组件的 HTML 结构
        ,data(){
            return {
                sonmsg:{name:"小头儿子", age: 6}
            }
        }
        , methods:{
            myclick(){
                // 当点击子组件的按钮的时候，如何调用 父组件传递过来的 func 方法，并调用这个方法
                // emit 英文原意：是触发，调用、发射的意思
                // this.$emit('func', 123, 456)
                this.$emit('func', this.sonmsg)
            }
        }
    }
</script>
```

#### **vuex**

插件：https://vuex.vuejs.org/zh/guide/

下载：npm i vuex -D

**基本使用**

使用：

+ 配置main.js

  ```javascript
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
  ```

+ 新增store.js

  ```javascript
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
  ```

+ 其它组件使用

  ```javascript
  /* 大括号表达式调用数据：$store.state.count */
  <p>click {{$store.state.count}} times count is {{evenOrOdd}}</p>
  /* 组件methods中调用 */
  methods:{
      increment () {
          // 通知vuex更新
          // 触发store中对应的action调用
          this.$store.dispatch('increment')
      },
      decrement() {
          // 触发store中对应的action调用
          this.$store.dispatch('decrement')
      },
      incrementIfOdd(){
          // 触发store中对应的action调用
          this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync(){
          // 触发store中对应的action调用
          this.$store.dispatch('incrementAsync')
      }
  },
  computed : {
      evenOrOdd () {
          return this.$store.getters.evenOrOdd
      }
  }
  ```

**简化代码使用**

App.vue

```javascript
import {mapState, mapGetters, mapActions} from 'vuex';

computed : {
    // mapState返回值对象:{count(){return this.$store.state.count}}
    ...mapState(['count']),
    // mapGetters() 返回值对象:{eventOrOdd(){return this.$store.getters.evenOrOdd}}
    // ...mapGetters(['evenOrOdd']),
    // 映射
    ...mapGetters({evenOrOdd2:'evenOrOdd'}),
},
methods:{
    ...mapActions(['increment','decrement', 'incrementIfOdd', 'incrementAsync'])
}
```

> **vuex笔记**
>
> 1. 新建文件夹store，在下面分别创建`index.js`,`actions.js`,`getters.js`, `index.js`,`mutations.js`,`state.js`
>
> 2. 基本使用
>
> ```javascript
> // 1. 调用vuex actions的方法，并传递一个参数 todo
> this.$store.dispatch('addTodo', todo)
> // actions中定义的addTodo方法，接收参数todo
> addTodo ({commit}, todo) {
>     // 提交对mutation的请求
>     commit(ADD_TODO, {todo});
> },
> // mutations中定义对应的方法，接收对象参数{todo}
> [ADD_TODO] (state, {todo}) {
>     state.todos.unshift(todo)
> },
> // 2. 使用 vuex 的 state中的数据
> <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index" />
> import {mapState} from 'vuex';
> export default {
>     computed:{
>         ...mapState(['todos'])
>     },
> }
> // 3.使用vuex的getters和actions
> import {mapGetters, mapActions} from 'vuex';
> export default {
>     computed:{
>         ...mapGetters(['totalCount', 'completeCount']),
>         isAllCheck : {
>             get () {
>             return this.$store.getters.isAllSelect
>             },
>             // value 是当前checkbox最新的值
>             set (value) {
>             this.$store.dispatch('selectAllTodos', value)
>             }
>         }
>     },
>     methods : {
>         // 调用方法
>         ...mapActions(['clearAllComplete']),
>     }
> }
> ```
>
> index.js
>
> ```javascript
> /* 
>     vuex 最核心的管理对象 store
> */
> import Vue from 'vue'
> import Vuex from 'vuex'
> import state from './state'
> import mutations from './mutations'
> import actions from './actions'
> import getters from './getters'
> 
> Vue.use(Vuex);
> 
> export default new Vuex.Store({
>     state,
>     mutations,
>     actions,
>     getters
> })
> ```
>
> state.js
>
> ```javascript
> /* 
>     状态对象
> */
> export default {
>     todos:[]
> }
> ```
>
> actions.js
>
> ```javascript
> /* 
>     接收组件通知触发mutation调用间接更新状态的方法的对象
> */
> import {ADD_TODO, DELETE_ITEM, SELECT_ALL_TODOS,CLEAR_ALL_COMPLETE} from './mutation-types'
> 
> export default {
>     addTodo ({commit}, todo) {
>         // 提交对mutation的请求
>         commit(ADD_TODO, {todo});
>     },
>     deleteItem ({commit}, index) {
>         commit(DELETE_ITEM, {index})
>     },
>     selectAllTodos ({commit}, boo) {
>         console.log("123");
>         commit(SELECT_ALL_TODOS, {boo});
>     },
>     clearAllComplete ({commit}) {
>         commit(CLEAR_ALL_COMPLETE)
>     }
> }
> ```
>
> mutations.js
>
> ```javascript
> /* 
>     包含多个由action触发去直接更新状态的方法的对象
> */
> import {ADD_TODO, DELETE_ITEM, SELECT_ALL_TODOS,CLEAR_ALL_COMPLETE} from './mutation-types'
> export default {
>     [ADD_TODO] (state, {todo}) {
>         state.todos.unshift(todo)
>     },
>     [DELETE_ITEM] (state, {index}) {
>         state.todos.splice(index, 1)
>     },
>     [SELECT_ALL_TODOS] (state, {boo}){
>         console.log("SELECT_ALL_TODOS", boo);
>         state.todos.forEach(todo => {
>             todo.complete = boo
>         });
>     },
>     [CLEAR_ALL_COMPLETE] (state) {
>         state.todos = state.todos.filter(todo => !todo.complete)
>     }
> }
> ```
>
> 
>
> mutation-types.js
>
> ```javascript
> /* 
>     所有mutation的名称常量
> */
> // 添加todo
> export const ADD_TODO = 'ADD_TODO';
> // 删除doto
> export const DELETE_ITEM = 'DELETE_ITEM';
> // 全选/全不选所有todo
> export const SELECT_ALL_TODOS = 'SELECT_ALL_TODOS';
> // 清除已完成的todos
> export const CLEAR_ALL_COMPLETE = 'CLEAR_ALL_COMPLETE';
> ```
>
> getters.js
>
> ```javascript
> import state from "./state";
> 
> /* 
>     包含所有基于state的getter计算属性的对象
> */
> export default {
>     // 总数量
>     totalCount(state){
>         return state.todos.length;
>     },
>     // 完成数量
>     completeCount(state){
>         return state.todos.reduce((preTotal, todo) => {
>             return preTotal + (todo.complete ?  1 : 0);
>         }, 0)
>     },
>     // 判断是否全部选中
>     isAllSelect (state, getters) {
>         console.log("isAllSelect", getters);
>         return getters.totalCount === getters.completeCount && getters.totalCount > 0;
>     }
> }
> ```

### 获取DOM节点

ref(英文单词 reference 的缩写)：为某个元素注册一个唯一标识，vue对象通过$refs属性访问这个元素对象,可以调用组件的方法等详细信息

```html
<div id='app'>
    <input type="button" value="获取元素" @click="getElement" ref="mybtn">
    <h3 ref="myh3">哈哈哈， 今天天天气不错</h3>
    <login ref="mylogin"></login>
</div>
<script>
    var login = {
        template:'<h1>登录组件</h1>',
        data(){
            return {
                msg:"son msg"
            }
        }
        ,methods : {
            show(){
                console.log("调用了子组件的方法");
            }
        }
    }

    var vm = new Vue({
        el:'#app',
        ,methods:{
            getElement(){
                console.log(this.$refs.myh3.innerText)
                console.log(this.$refs.mylogin.msg);
                this.$refs.mylogin.show()
            }
        },
        components:{
            "login":login
        }
    })
</script>
```





### 路由

> 下载路由:`npm i vue-router -D`
> 定义前台路由组件（放入views文件下）
> 新建路由器模块（router文件夹下的index.js）

#### 路由基本使用

1. 安装 vue-router 路由模块

```javascript
<script src="../../lib/vue-router.js"></script>
```

2. 创建一个路由对象

> 当导入 vue-router 包之后，在 window 全局对象中，就有了一个 路由的构造函数，叫做 VueRouter，在 new 路由对象的时候，可以为构造函数，传递一个配置对象

```javascript
// 明确地安装路由功能：
Vue.use(VueRouter);
var routerObj = new VueRouter({
    //  route // 这个配置对象中的 route 表示 【路由匹配规则】 的意思
    routes:[ // 路由匹配规则
        // 每个路由规则，都是一个对象，这个规则对象身上，有两个必须的属性：
        // 属性1：是path，表示监听哪个路由链接地址
        // 属性2：是 component， 表示，如果 路由是前面匹配到的 path，则展示 component 属性对应的那个组件
        //  注意：component 的属性值，必须是一个 组件模板对象，不能是模板名称（不能是字符串）
        // {path:'/', component: login},
        {path:'/', redirect: '/login'}, // 这里的 redirect 和 Node 中的 redirect 完全是两码事
        {path:'/login', component: login},
        {path:'/register', component:register}
    ]
    // 指定路由被选中时的class属性值
    ,linkActiveClass:'router-link-active'
});
```

> 当路由被选中时会有个class:router-link-active

3. 将路由规则对象，注册到vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件

```html
var vm = new Vue({
    el:'#app',
    data : {
    }
	// key和value名字相同时可以简写
	//,roter
    ,router:routerObj
})
```

4. 写html
   组件的内容会在`router-view`中显示，当点击`router-link`时，会根据`to`属性去路由里规则里面匹配，将匹配的组件显示到`router-view`上。

```html
<div id='app'>
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>
    <router-view></router-view>
</div>
```

#### 路由传参

1. query传参，通过?拼接的方式传递参数。这种方式的好处就是不用修改路由器配置：

```html
<router-link to="/login?id=10&name=张三">登录</router-link>
<script>
    var login = {
        template:"<h1>登录 --- {{ $route.query.id }}  ----  {{ $route.query.name }} </h1>",
        data(){
            return {
                msg:123
            }
        },
        created(){ // 组件的生命周期钩子函数
            // console.log(this.$route);
            console.log(this.$route.query.id);
        }
    }
    var router = new VueRouter({
        routes:[
            {path:"/login", component:login},
        ]
    })
    var vm = new Vue({
        el:'#app',
        data : {
        }
        ,router
    })
</script>
```

2. 在路由地址上加上参数,使用`:name`占位的方式配置路由器的path

```html
<router-link to="/login/10/haha">登录</router-link>
var router = new VueRouter({
    routes:[
        {path:"/login/:id/:name", component:login},
   ]
})
```

> 最后在组件的 `$route` 中取params
>
> ```javascript
> const id = this.$route.params.id
> ```

3. 在标签`<router-view>`标签上添加属性传参

```html
<router-view msg="abc"></router-view>
```

此时路由子组件通过`props`属性定义变量并使用:

```javascript
<h2>{{ msg }}</h2>
export default {
    props:{
        msg:String
    }
}
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



#### 路由嵌套

```javascript
var router = new VueRouter({
    routes:[
        {
            path:'/account', 
            component: account,
            // 使用 children 属性，实现子路由，同时，子路由的 path前面不要带 / ,否则
            // 永远以根路径开始请求，这样不方便我们用户去理解 URL地址
            children:[
                {path:"login", component:login},
                {path:"register", component:register},
            ]
        },
    ]    
})
```

### 插件

#### 自定义插件

1. 创建插件文件（vue-myPlugin.js）

```javascript
/* 
    Vue插件库
*/
(function(){
    // 需要向外暴露的插件对象
    const MyPlugin = {};

    // 插件对象必须有一个install方法
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或 property
        Vue.myGlobalMethod = function () {
          // 逻辑...
          console.log("Vue 函数对象的方法 myGlobalMethod");
        }
      
        // 2. 添加全局资源
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // 逻辑...
            el.textContent = binding.value.toUpperCase();
          }
        })
      
        // 3. 注入组件选项
        Vue.mixin({
          created: function () {
            // 逻辑...
          }
        })
      
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
          // 逻辑...
          console.log("Vue 实例对象的方法 $myMethod");
        }
      }  
    //   向外暴露
    window.MyPlugin = MyPlugin;
})()
```

2. 页面引入

```html
<script src="./vue-myPlugin.js"></script>
```

3. 使用

```javascript
Vue.use(MyPlugin); // 内部会执行 MyPlugin.install(Vue)中的 myGlobalMethod方法

// 调用实例方法$myMethod
vm.$myMethod();
```

### UI

#### mint-ui

```bash
npm i mint-ui -D
npm install --save-dev babel-plugin-component
```

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

## 使用 Vue-cli 创建项目



### 使用Vue-cli脚手架搭建webpack模板项目

1. 下载`vue-cli` 脚手架

```bash
npm i -g vue-cli
```

2. 初始化一个项目

```bash
vue init webpack vue-demo
```

#### 打包编译

1. 下载serve

```bash
serve：npm i serve -g
```

2. 打包(此时会生成dist目录)

```bash
npm run build
```

3. 运行serve

```bash
serve dist
```

#### eslint

在`npm run dev` 后，eslint会检查代码，根据控制台提示进行修复代码。一些小问题，我们不认为是问题的代码格式，可以在`.eslintrc.js`中的`rules`中添加规则，开发时，在`.eslintignore` 忽略特定的文件，后面在统一修复

#### 开发组件 （comment_page）

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
> 注意：数据使用 `data(){return{}}` 进行编写。
> 在`components`属性中 写上引入的组件名，然后在template中使用标签(<Add/> 或者 <List/>) 进行使用。
> 如果需要传递参数，例如给List组件传递data中comments数据，那么需要在template中这样使用：`<List :comments="comments"/>` (其中 `:comments` 为传值的名称，在List取值时使用同样的名称。如果写`:` 就只是普通的属性)

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
> 注意：数据在那个组件，更新数据的行为就应该定义在哪个组件

6. 删除评论

思路：先在Item组件定义删除方法，然后在App组件定义删除方法（因为评论数据定义在App组件中）然后逐层传递（App-->List-->Item）App定义的删除方法。最后在Item中调用方法。此时发现需要额外的参数（数组下标），从List组件中传递参数index到Item。

使用`v-show="comments.length==0"` 动态显示标签。

### Vue3 创建项目

> Vue CLI 3需要 nodeJs ≥ 8.9 

#### 安装

需要先写在之前安装的旧版本

```bash
npm uninstall vue-cli -g
```

安装

```bash
npm i @vue/cli -g
```

检查版本

```bash
vue -V
```

#### 创建项目

```bash
vue create <Project Name>
```

+ default（babel，eslint）：默认设置（直接enter）
+ Manually select features：自定义配置（按方向键 ↓）是我们所需要的面向生产的项目，提供可选功能的 npm 包

> 上下方向键：选择上下
> Enter：确认
> a:全选
> Space：选择/取消选择

```tex
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Babel //转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
( ) TypeScript// TypeScript是一个JavaScript（后缀.js）的超集（后缀.ts）包含并扩展了 JavaScript 的语法，需要被编译输出为 JavaScript在浏览器运行，目前较少人再用
( ) Progressive Web App (PWA) Support// 渐进式Web应用程序
( ) Router // vue-router（vue路由）
( ) Vuex // vuex（vue的状态管理模式）
( ) CSS Pre-processors // CSS 预处理器（如：less、sass）
( ) Linter / Formatter // 代码风格检查和格式化（如：ESlint）
( ) Unit Testing // 单元测试（unit tests）
( ) E2E Testing // e2e（end to end） 测试
```

vue.config.js

```javascript
module.exports = {
  baseUrl: '/',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: '',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {//除了 entry 之外都是可选的
      entry: 'src/index/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html',// 模板来源
      filename: 'index.html',// 在 dist/index.html 的输出
      title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    },
    subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },
  lintOnSave: true,// 是否在保存的时候检查
  productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
  css: {
    extract: true,// 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false,// 开启 CSS source maps
    loaderOptions: {},// css预设器配置项
    modules: false// 启用 CSS modules for all css / pre-processor files.
  },
  devServer: {// 环境配置
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  pluginOptions: {// 第三方插件配置
    // ...
  }
};
```

