# vue
根据尚硅谷的Vue视频进行学习,并根据之前的在B站看视频做的笔记进行适当融合
38已完
## 01_Hello World
写一个简单的vue，需要以下步骤：
1. 引入Vue.js
```html
<script type="text/javascript" src="../node_modules/vue/dist/vue.js"></script>
``` 
2. 创建一个容器 
```html
   <div id="app"></div>
```
3. 创建一个Vue的实例(在script标签下)
```javascript
var vm = new Vue({
    el: '#app', // 表示当前我们new 的这个Vue实例，要控制页面上的那个区域
    // 这里的data 就是MVVM 中的M，专门保存每个页面的数据
    data: { // data 属性中，存放的是el中要用到的数据
        msg: '欢迎学习Vue' // 通过Vue提供的指令，很方便的就能把数据渲染到页面上，程序员不在手动操作DOM元素了【前端的Vue之类的框架，不提倡我们去手动的操作DOM元素了】
    }
});
```
4. 双向数据绑定: v-model
```html
<input type="text" v-model="msg">
```
5. 使用插值表达式 {{var}}给标签赋值
```html
<p>hello, {{ username }}</p>
```       
6. 理解vue的mvvm实现
> MVVM
        model（M）：模型，数据对象（data）
        view(V):视图，模板页面
        viewModel(VM)：视图模型（Vue的实例）
        
## 02_模板语法
* 模板的理解:
    * 动态的htmL页面 包含了一些js语法代码,双大括号表达式
    * 指令(以`v-`开以的自定义标签属性)
* 双大括号表达式
        语法: `{{exp}}`
        功能:向页面输出数据，可以调用对象的方法(可以写JS代码：`{{msg.toUpperCase()}}`)
* 指令一:强制数据绑定(写在data中)
        功能:指定变化的属性值
        完整写法: `v-bind:xxx='yyy'` //yyy会作为表达式解析执行
        简洁写法: `:xxx='yyy'`
* 指令二:绑定事件监听(写在 methods 中)
        功能:绑定指定事件名的回调函数
        完整写法: `v-on:click="test"` // test会作为方法执行
        简洁写法：`@click="test"` 
## 03_计算属性和监视
1.计算属性
> 在`computed`属性对象中定义计算属性的方法，在页面中使用`{{方法名}}`来显示计算的结果 
```javascript
computed:{
    // 什么时候执行：初始化显示时/相关的data属性数据发生变化
    // 计算并返回当前属性的值
    fullName1(){  // 计算属性中的一个方法，方法的返回值作为属性值
        console.log("fullName1 调用了");
        return this.firstName + ' ' + this.lastName;
    },
    fullName3 : {
        // 回调函数 1. 你定义的 2.你没有调用 3.但最终它执行了
        // 什么时候调用？当需要读取当前属性值的时候调用
        // 用来做什么？根据相关的数据计算并返回当前属性的值
        // 回调函数，计算并返回当前属性的值
        get () {
            return this.firstName + ' ' + this.lastName;
        },
        // 回调函数，监视当前属性值的变化，当属性值发生改变时回调，更新相关的属性数据
        set (val) { // val 就是fullName3 的最新属性值
            var names = val.split(' ');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
},
```

2．监视属性
> 通过vm对象的`$watch()`或`watch`配置来监视指定的属性，当属性变化时，回调函数自动调用，在函数内部进行计算  
```javascript
watch:{ // 配置监视
    firstName:function(newVal, oldval){ // firstName 发生变化
        console.log(this); // this 就是 vm对象
        this.fullName2 = newVal + ' ' + this.lastName
    }
}

vm.$watch('lastName', function(newVal, oldVal){
    // 更新fullName2
    this.fullName2 = this.firstName + ' ' + newVal;
})
```

3.计算属性高级
> 通过getter/setter实现对属性数据的显示和监视，计算属性存在缓存，,多次读取只执行一次getter计算
        getter:属性的get方法
        setter：属性的设置方法    
```javascript
computed:{
    fullName3 : {
        // 什么时候调用？当需要读取当前属性值的时候调用
        // 用来做什么？根据相关的数据计算并返回当前属性的值
        // 回调函数，计算并返回当前属性的值
        get () {
            return this.firstName + ' ' + this.lastName;
        },
        // 回调函数，监视当前属性值的变化，当属性值发生改变时回调，更新相关的属性数据
        set (val) { // val 就是fullName3 的最新属性值
            var names = val.split(' ');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
},
```

> 本节扩展：
回调函数概念： 1. 你定义的 2.你没有调用 3.但最终它执行了
## 04_class与style绑定
+ 理解
    在应用界面中，某个(些)元素的样式是变化的，class/styLe绑定就是专门用来实现动态样式效果的技术
+ class绑定： `class = 'xxx'`
    * xxx可以是字符串
    * xxx可以是对象
    * xxx可以是数组
+ style绑定 `:style="{color:activeColor,fontSize:fontSize + 'px'}"`,其中activecolor/fontsize 是data属性
## 05_条件渲染
条件渲染指令:`v-if`、`v-else`、`v-show`
>  如果需要频繁切换v-show较好
因为v-if是将标签删除，v-show是添加display样式属性隐藏
## 06_列表渲染
`v-for`指令,可以循环数组，也可以循环对象。
循环数组时，index就是数组索引;循环对象时，index就是对象的属性名
```javascript
v-for="(p, index) in persons"
``` 
### 数组更新检测
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
## 07_事件处理
1. 使用`v-on:click="test1"` 或 `@click="test1"`绑定点击事件
2. 使用`v-on:click.stop="test1"` 阻止事件冒泡
3. 使用`@click.prevent="test1"` 阻止标签默认行为
4. 使用`@keyup.13` 或 `@keyup.enter` 绑定回车事件
## 08_表单输入绑定
1. `@submit.prevent="handSubmit"` 将表单默认提交的行为，修改成执行函数handSubmit
2. 使用 `v-model` 实现双向数据绑定
## 09_Vue实例_生命周期
1. beforeCreate：这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它。注意，在beforeCreate 生命周期函数执行的时候，data和methods中的数据都还没初始化
2. created：在created中，data和methods都已经被初始化好了。如果要调用 methods中的方法，或者操作data中的数据，最早只能在created中进行操作
3. beforeMount：模板已经在内存编译完成，未渲染到页面中去。在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，还是之前的写的一些模板字符串
4. mounted：内存中的模板，已经真实的挂载到页面中，用户已经可以看到渲染好的页面了。注意，mounted 是实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例，就静静的 躺在我们内存中，一动不动。
5. beforeUpdate：这时候，表示 我们的界面还没有被更新 [数据已经被更新了]。当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data中的数据是最新的，页面尚未和最新的数据保持同步
6. updated：updated事件执行的时候,页面和 data 数据已经保持同步了,都是最新的
7. beforeDestory:当执行beforeDestroy钩子函数的时候, Vue实例就已经从运行阶段,进入到了销毁阶段。当执行beforeDestroy 的时候,实例身上所有的data和所有的methods，以及过滤器、指令....都处于可用状态,此时,还没有真正执行销毁的过程。
8. destoryed：当执行到destroyed函数的时候，组件已经被完全销毁了,此时, 组件中所有的数据、方法，指令、过滤器....都已经不可用了

> 其它杂记：
+ 当使用函数作为参数时（如：定时器的第一个匿名函数），使用箭头函数（()=>{}）此时箭头函数内使用的`this`关键字就会一层一层往外面找
+ vm.$destroy() // 销毁vm实例
## 10_过度与动画
1. 使用 transition 元素(Vue官方提供)，把 需要被动画控制的元素，包裹起来
```javascript
<transition>
    <h3 v-if="flag">这是一个h3</h3>
</transition>
```
2. 自定义两组样式，来控制transition 内部的元素实现动画
    + v-enter 【这是一个时间点】是进入之前，元素的起始状态，此时还没开始进入
    + v-leave-to 是动画离开之后，离开的终止状态，此时，元素动画已经结束
    + v-enter-active 【入场动画的时间段】
    + v-leave-active 【离场动画的时间段】
```css
.v-enter,
.v-leave-to{
    opacity: 0;
    transform:translateX(100px)
}
.v-enter-active,.v-leave-active{
    transition: all 0.8s ease;
}
```
3. transition 使用自定义name名称
```javascript
<transition name="my">
    <h3 v-if="flag2">这是一个h3</h3>
</transition>
```
此时的css应该如下书写：
```css
.my-enter,
.my-leave-to{
    opacity: 0;
    transform:translateX(100px)
}
.my-enter-active,.my-leave-active{
    transition: all 0.8s ease;
}
```
4. transition标签 `:duration`属性
```javascript
<transition enter-active-class=" animate__bounceIn" leave-active-class=" animate__bounceOut">
    <h3 v-if="flag">这是一个h3</h3>
</transition>

<!-- 使用 :duration 来统一设置 入场和离场时候的动画时长 -->
<!-- <transition :duration="100" enter-active-class="animate__bounceIn" leave-active-class=" animate__bounceOut">
    <h3 v-if="flag">这是一个h3</h3>
</transition> -->

<!-- 使用 :durationm"{ enter: 200， leave: 400 }” 来分别设置入场的时长和离场的时长 -->
<transition :duration="{enter:200, leave:400}" enter-active-class=" animate__bounceIn" leave-active-class=" animate__bounceOut">
    <h3 v-if="flag">这是一个h3</h3>
</transition>
```
5. 使用钩子函数
```javascript
<!-- 使用 transition 元素 把小球包裹起来 -->
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    <div class="ball" v-show="flag"></div>
</transition>

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
```
6. 列表动画
```javascript
    <!-- 在实现列表过渡的时候，如果需要过渡的元素是通过 v-for 循环渲染出来的，不能使用 transition 包裹，需要使用 transition-group -->
    <!-- 如果要用 v-for 循环创建的元素设置动画，必须为每一个元素 设置 :key 属性 -->
    <!-- 给 transition-group 添加 appear属性 ，实现页面刚入场时候的效果 -->
    <!-- 通过为 transition-group 元素，设置tag属性，指定transition-group 渲染为指定的元素，如果不指定 tag属性 默认渲染为 span元素 -->
    <transition-group appear tag="ul">
        <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
            {{ item.id }} --- {{ item.name }}
        </li>
    </transition-group>
```
## 11_过滤器
1.  定义一个Vue 全局过滤器，名字叫做 dateString
```javascript
// value表示过滤前的值
// format='YYYY-MM-DD HH:mm:ss' ：形参默认值，当不传参数时，默认值
Vue.filter('dateString', function(value, format='YYYY-MM-DD HH:mm:ss'){
    return moment(value).format(format);
})
```
2. 调用过滤器
过滤器可以传递多个参数到过滤器中的function中,也可以调用多个过滤器
```html
 <p>完整版：{{date | dateString}}</p>
```
> 拓展：
moment 是一个强大的时间库
## 12_指令
常用内置指令：
+ v:text :更新元素的textcontent
+ v-html :更新元素的InnerHTML
+ v-if :如果为true,当前标签才会输出到页面
+ v-else:如果为false,当前标签才会输出到页面
+ v-show :通过控制display样式来控制显示/隐藏
+ v-for :遍历数组/对象
+ v-on :绑定事件监听，一般简写为@
+ v-bind :强制绑定解析表达式，可以省略v-bindv-model :双向数据绑定
+ ref :为某个元素注册一个唯一标识，vue对象通过$refs属性访问这个元素对象v-cloak :使用它防止闪现表达式，与css配合: [v-cloak] { display: none }
自定义指令：
1. 自定义全局指令
```javascript
Vue.directive('my-directive', function(el, binding){
    el.innerHTML = binding.value.toUpperCase();
})
```
2. 自定义局部指令
```javascript
directives:{
    'my-directive':{
        bind(el, binding){
            el.innerHTML = binding.value.toUpperCase()
        }
    }
}
```
## 13_插件
使用Vue开发一个插件
>注意
html内先引用vue，然后再引入 vue-myPlugin.js


