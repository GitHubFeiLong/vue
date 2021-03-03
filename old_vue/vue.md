# Vue 

## Vue 基本代码

1. 导入Vue包： 

   ```html
   <script src="../lib/vue.min.js"></script>
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

   

4. 使用插值表达式 {{var}}给标签赋值

   ```html
   <div id="app">
       <p>{{msg}}</p>
   </div>
   ```

   

范例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 1.导入Vue包 -->
    <script src="../lib/vue.min.js"></script>
</head>
<body>
    <!-- 将来new的Vue的实例，会控制这个元素中的所有内容 -->
    <!-- Vue 实例所控制的这个元素区域，就是我们的V -->
    <div id="app">
        <p>{{msg}}</p>
    </div>

    <script>
        // 2. 创建一个Vue的实例
        // 当我们导入包之后，在浏览器的内存中么就多了一个Vue的构造函数
        // 注意：我们 new 出来的 vm对象就是我们MVVM中 VM调度者
        var vm = new Vue({
            el: '#app', // 表示当前我们new 的这个Vue实例，要控制页面上的那个区域
            // 这里的data 就是MVVM 中的M，专门保存每个页面的数据
            data: { // data 属性中，存放的是el中要用到的数据
                msg: '欢迎学习Vue' // 通过Vue提供的指令，很方便的就能把数据渲染到页面上，程序员不在手动操作DOM元素了【全段的Vue之类的框架，不提倡我们去手动的操作DOM元素了】

            }
        });
    </script>
</body>
</html>
```



## Vue v-cloak 插值表达式

1. 插值表达式{{}}
   插值表达式{{}}：有闪烁
2. v-cloak
   v-cloak 能够解决 插值表达式闪烁的问题,只会替换自己的这个占位符，不会把整个元素的内容清空
3. v-text
   v-text 是没有闪烁的问题,会覆盖元素中原本的内容
4. v-html 
   将字符串中的标签解析
5. v-bind
   是vue中提供的用于**属性绑定**的指令，指令可以被简写为 :要绑定的属性
6. v-on
   中提供了 v-on: **事件绑定** 机制
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
     <style>
         /* [v-cloak]{
             display: none;
         } */
     </style>
</head>
<body>
    <div id="app">
        <!-- 使用 v-cloak 能够解决 插值表达式闪烁的问题 -->
        <p v-cloak>++++++{{msg}}-------</p>
        <!-- 默认 v-text 是没有闪烁的问题 -->
        <!-- v-text 会覆盖元素中原本的内容，但是插值表达式，只会替换自己的这个占位符，不会把整个元素的内容清空 -->
        <h4 v-text="msg">====</h4>

        <div>{{msg2}}</div>
        <div v-text="msg2"></div>
        <div v-html="msg2"></div>

        <!-- v-bind:是vue中提供的用于绑定属性的指令 -->
        <!-- 注意v-bind： 指令可以被简写为 :要绑定的属性 -->
        <!-- v-bind 中，可以写合法的JS表达式 -->
        <!-- <input type="button" value="按钮" v-bind:title="mytitle + '额外的'">
        <input type="button" value="按钮" :title="mytitle"> -->

        <!-- vue 中提供了 v-on: 事件绑定 机制 -->
        <!-- <input type="button" value="按钮" v-on:click="show" v-on:mouseover="show"> -->
        <input type="button" value="按钮" @click="show" @mouseover="show">

        
    </div>

    <!-- 1.导入Vue包 -->
    <script src="../lib/vue.min.js"></script>

    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                msg:123,
                msg2:'<h1>哈哈 我是一个H1</h1>',
                mytitle:"这是自定义的title" 
            },
            methods:{ // 这个 method属性中定义了当前vue实例的所有可用的方法
                show:function(){
                    alert("show");
                }
            }
        });
    </script>
</body>
</html>

<!-- 1. 如何定义一个基本的Vue代码结构 -->
<!-- 2. 插值表达式 和 v-text -->
<!-- 3. v-cloak -->
<!-- 4. v-html -->
<!-- 5. v-bind Vue提供的属性绑定机制  缩写是 ‘:’ -->
<!-- 6. v-on Vue提供的事件绑定机制   缩写是 ’@‘ -->
```



## Vue 跑马灯效果

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

     <!-- 1.导入Vue包 -->
     <script src="../lib/vue.min.js"></script>
</head>
<body>
    

    <div id="app">
        <input type="button" value="浪起来" @click="lang">
        <input type="button" value="低调" v-on:click="stop">
        <h4>{{msg}}</h4>
    </div>

    <script>
        // 注意在 vm 实例中，如果想要调用 data 上的数据，或者想要调用 methods 中的方法， 必须通过 this.数据属性名 或 this.方法名 来进行
        // 访问，这里的this，就表示我们 new 出来的 VM 实例对象
        var vm = new Vue({
            el:"#app",
            data:{
                msg:"猥琐发育，别浪~~",
                intervalId:null // 在data商定一 定时器Id
            },
            methods:{
                lang(){
                    if (this.intervalId != null)return false;
                    this.intervalId = setInterval(() => {
                        console.log(this.msg);
                        var start = this.msg.substring(0,1);
                        var end = this.msg.substring(1);
                        this.msg = end + start;
                    }, 1000);
                   
                    // 注意： VM实例，会监听自己身上 data 中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data上同步到页面中去：
                    // 【好处：程序员只需要关心数据，不需要考虑考虑如何重新渲染DOM页面】
                },
                stop(){ //停止
                    console.log("stop");  
                    clearInterval(this.intervalId)    
                    this.intervalId = null          
                }

            }
        })
    </script>
</body>
</html>
```



## Vue 事件修饰符

1. stop：使用 .stop 阻止冒泡
2. prevent：使用 .prevent 阻止默认行为
3. capture：使用 .capture 实现捕获触发事件的机制
4. self：使用 .self 实现只有点击当前元素时候才触发事件处理函数
5. once：使用 .once 只触发一次事件处理函数

**stop 和 self的区别：**
.self 只会阻止自己身上冒泡行为的触发，并不会真正阻止冒泡的行为

范例：

```html
<!DOCTYPE html>
<html lang="cn">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width,initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <script src="../lib/vue.min.js"></script>
   <title>Document</title>
   <style>
       .outer{
           height:200px;
           background-color: darkred;
       }
       .inner {
           height:150px;
           background-color: darkblue;
       }
   </style>
</head>
<body>
   
<div id='app'>
    <!-- 1、使用 .stop 阻止冒泡 -->
    <!-- <div class="inner" @click="devHandler">
        <input type="button" value="戳他" @click.stop="btnHandler">
    </div> -->

    <!-- 2、使用 .prevent 阻止默认行为 -->
    <!-- <a href="http://www.baidu.com" @click.prevent="link">跳转百度</a> -->

    <!-- 3、使用 .capture 实现捕获触发事件的机制 -->
    <!-- <div class="inner" @click.capture="devHandler">
        <input type="button" value="戳他" @click="btnHandler">
    </div> -->

    <!-- 4、使用 .self 实现只有点击当前元素时候才触发事件处理函数 -->
    <!-- <div class="inner" @click.self="devHandler">
        <input type="button" value="戳他" @click="btnHandler">
    </div>  -->

    <!-- 5、 使用 .once 只触发一次事件处理函数-->
    <a href="http://www.baidu.com" @click.prevent.once="link">跳转百度</a>

    <!-- 演示： .stop 和 .self 的区别 -->
    <!-- <div class="outer" @click="div2Handler">
        <div class="inner" @click="divHandler">
            <input type="button" value="戳他" @click.stop="btnHandler">
        </div>
    </div> -->

    <!-- .self 只会阻止自己身上冒泡行为的触发，并不会真正阻止冒泡的行为 -->
    <!-- <div class="outer" @click="div2Handler">
        <div class="inner" @click.self="divHandler">
            <input type="button" value="戳他" @click="btnHandler">
        </div>
    </div>  -->

</div>
<script>
var vm = new Vue({
    el:'#app',
    data : {
        msg:"a",
    },
    methods:{
        divHandler(){
            console.log("这是 inner div的点击事件");
        },
        btnHandler(){
            console.log("这是 触发了按钮的点击事件");
        },
        link(){
            console.log("这是 a标签点击的事件");
        },
        div2Handler(){
            console.log("这是点击的 outer div");
        }
    }
})
</script>
</body>
</html>
```



## Vue v-model 实现双向绑定

 v-bind: 只能实现数据的单向绑定，从 M 自动绑定到 V， 无法实现数据的双向绑定,使用 v-model 指令，可以实现 表单元素(input select checkbox textarea)和 Mode 中数据的双向数据绑定

**注意**：v-model 只能运用在表单元素中

范例：

```html
<!DOCTYPE html>
<html lang="cn">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width,initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <script src="../lib/vue.min.js"></script>
   <title>Document</title>
</head>
<body>
   
<div id='app'>
    <h4>{{msg}}</h4>

    <!-- v-bind: 只能实现数据的单向绑定，从 M 自动绑定到 V， 无法实现数据的双向绑定 -->
    <!-- <input type="text" v-bind:value="msg"> -->
    
    <!-- 使用 v-model 指令，可以实现 表单元素和 Mode 中数据的双向数据绑定 -->
    <!-- 注意：v-model 只能运用在表单元素中 -->
    <!-- input select checkbox textarea -->
    <input type="text" v-model="msg">
    
</div>
<script>
var vm = new Vue({
    el:'#app',
    data : {
        msg:"大家都是好学生"
    }
})
</script>
</body>
</html>
```



## Vue 中的class

**传统使用**方式:

```html
<h1 class="red thin">h1</h1>
```

**Vue 使用**方式：

1. 第一种是用方式，直接传递一个数组，注意： 这里的class需要使用 v-bind 做数据绑定

   ```html
   <!-- 结果是class="thin red" -->
   <h1 :class="['thin','red']">h1</h1>
   ```

2. 第二种在数组中使用三元表达式

   ```html
   <!-- 结果是class="thin red" -->
   <h1 :class="['thin','red', flag?'active':'']">h1</h1>
   <script>
       var vm = new Vue({
           el:'#app',
           data : {
               flag:false
           }
       })
   </script>
   ```

3. 第三种在数组中使用对象来代替三元表达式，提高代码的可读性

   ```html
   <!-- 结果是class="thin red" -->
   <!-- 这里的 {'active':flag} flag是data中的数据，active是class的值 -->
   <h1 :class="['thin','red', {'active':flag}]">h1</h1>
   
   <script>
       var vm = new Vue({
           el:'#app',
           data : {
               flag:false
           }
       })
   </script>
   ```

4. 第四种在为 class 使用 v-bind 绑定 对象的时候，对象的属性是类名，由于 对象的属性可带引号，也可不带引号，所以这里可以没写引号；属性的值是一个标识符

   ```html
   <!-- 结果是class="thin active" -->
   <h1 :class="{thin:true, red:false, active:true, italic:false}">h1</h1>
   ```

5. 使用data巧妙进行class绑定

   ```html
   <!-- 结果是class="thin red active" -->
   <h1 :class="classObj">h1</h1>

   <script>
       var vm = new Vue({
           el:'#app',
           data : {
                classObj:{thin:true, red:true, active:true, italic:false}
           }
       })
   </script>
   ```
   



## Vue 中的 style

1. 直接使用对象

   ```html
   <!-- 对象就是无序键值对的集合（注意：键不能有中横线） -->
   <span :style='{color:"red", "background-color":"blue", "font-weight":100}'>这是一个h1</span>
   ```

2. 使用 data 中的数据进行样式设置 

   ```html
   <span :style='styleObj1'>这是一个h1</span>
   
   <script>
       var vm = new Vue({
           el:'#app',
           data : {
               styleObj1:{color:"red", "background-color":"blue", "font-weight":100},
               styleObj2:{"font-style":"italic"}
           }
       })
   </script>
   ```

3. 使用多个样式对象

   ```html
   <span :style='[styleObj1, styleObj2]'>这是一个h1</span>
   
   <script>
       var vm = new Vue({
           el:'#app',
           data : {
               styleObj1:{color:"red", "background-color":"blue", "font-weight":100},
               styleObj2:{"font-style":"italic"}
           }
       })
   </script>
   ```



## Vue v-for循环

### v-for循环普通数组

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



### v-for循环对象数组

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
</script>
```



### v-for循环对象

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



### v-for迭代数字

```html
<div id='app'>
    <!-- in 后面我们放过 普通数组，对象数组，对象，还可以放数字 -->
    <!-- 注意：如果使用v-for迭代数字的话，前面的count 值从1 开始（1..10） -->
    <p v-for="count in 10"> 这是第 {{count}} 次循环</p>
</div>
<script>
var vm = new Vue({
    el:'#app',
    data : {
    }
})
</script>
```



### v-for 循环中key属性的使用

```html
<div id='app'>
    <div>
        <label>Id:
            <input type="text" v-model="id">
        </label>
        <label>name:
            <input type="text" v-model="name">
        </label>
        <input type="button" value="添加" v-on:click="add">
    </div>

    <!-- 注意：v-for循环的时候，key属性只能使用name或者string -->
    <!-- 注意key 在使用的时候，必须使用 v-bind: 书香绑定的形式，指定key的值 -->
    <!-- 在组件中，使用v-for循环的时候，或者在一些特殊情况中，如果v-for有问题，必须在使用v-for的同时，指定唯一的字符串/数字 类型:key 值 -->
    <p v-for="item in list" v-bind:key="item.id">
        <input type="checkbox">{{item.id}} ---
        {{item.name}}
    </p>
</div>
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



## V-if 和V-show的使用

|      | v-if                                                     | v-show                                                       |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------ |
| 特点 | 每次都会重新删除或创建元素                               | 每次不会重新进行DOM的删除和创建操作，只是切换了display的属性值 |
| 性能 | 有较高的切换性能消耗                                     | 有较高的初始渲染消耗                                         |
| 场景 | 如果元素可能永远也不会显示出来被用户看到，则推荐使用v-if | 如果元素涉及到频繁的切换，最好使用v-show                     |



```html
<div id='app'>
    <!-- <input type="button" value="按钮" v-on:click="toggle"> -->
    <input type="button" value="按钮" v-on:click="flag=!flag">

    <!-- v-if的特点：每次都会重新删除或创建元素 -->
    <!-- v-if 有较高的切换性能消耗 -->
    <!-- 如果元素涉及到频繁的切换，最好使用v-show -->
    <h3 v-if="flag">这是用v-if控制的元素</h3>

    <!-- v-show的特点：每次不会重新进行DOM的删除和创建操作，只是切换了display的属性值 -->
    <!-- v-show 有较高的初始渲染消耗 -->
    <!-- 如果元素可能永远也不会显示出来被用户看到，则推荐使用v-if -->
    <h3 v-show="flag">这是用v-show控制的元素</h3>
    
    
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data : {
            flag:true
        },
        methods:{
            toggle(){
                this.flag = !this.flag;
            }
        }
    })
</script>
```

