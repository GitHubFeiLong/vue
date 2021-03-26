# VUE3

## 创建项目

> Vue CLI 3需要 nodeJs ≥ 8.9 

### 安装

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

### 创建项目

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

### vue.config.js

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

## 入口ts

```typescript
// 程序的主入口文件,ts文件,是main.ts
// 引入createApp函数,创建对应的应用,产生应用的实例对象
import { createApp } from 'vue'
// 引入App组件(所有组件的父级组件)
import App from './App.vue'
// 创建App应用返回对应的实例对象,调用mount方法进行挂载
createApp(App).mount('#app')
```

## defineComponent

vue3之前，子组件暴露一个默认的对象就可以了，vue3使用defineComponent函数，defineComponent函数,目的是定义一个组件,内部可以传入一个配置对象：

```typescript
// vue2
export default{};

// vue3
import { defineComponent } from 'vue'
// 暴露出去一个定义好的组件
export default defineComponent({
  // 当前组件的名字是App
  name: 'App',
})
```

## setup

使用setup代替之前的data和methods属性。

+ vue2：

  ```javascript
  export default {
     data(){
         return {
             msg:'hello vue component',
         }
     },
     methods:{
          hello(){
      		alert('hello');
  		},
     }
  }
  ```

+ vue3

  ```javascript
  import { defineComponent } from 'vue'
  export default defineComponent({
      name: 'App',
    	setup(){
          // 定义变量
          let msg = 'hello vue component';
          function hello () {
              alert('hello');
          }
          return {
              msg,
              hello
          }
      }
  })
  ```

> 注意：vue3将组件的方法和数据都写在setup方法中，然后通过返回一个对象共组件其他地方使用。上面的数据我们使用的是普通类型，不具有响应式（数据修改后，页面不重新渲染）

### setup细节问题

+ setup是在beforeCreate生命周期回调之前就执行了,而且就执行一次
+ 由此可以推断出:setup在执行的时候,当前的组件还没有创建出来,也就意味着:组件实例对象this根本就不能用，this是undefined,说明,就不能通过this再去调用data/computed/methods/props中的相关内容了。其实所有的composition API相关回调函数中也都不可以
+ setup中的返回值是一个对象,内部的属性和方法是给html模版使用的
+ setup中的对象内部的属性和data函数中的return对象的属性都可以在html模版中使用
+ setup中的对象中的属性和data函数中的对象中的属性会合并为组件对象的属性
+ setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法
+ 在Vue3中尽量不要混合的使用data和setup及methods和setup
+ 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
+ setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

参数：

```javascript
 setup(props, { attrs, slots, emit }) 
```

+ props参数,是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用props接收到的所有的属性，包含props配置声明且传入了的所有属性的对象
+ context参数,是一个对象,里面有attrs对象(获取当前组件标签上的所有的属性的对象,但是该属性是在props中没有声明接收的所有的尚需经的对象),emit方法(分发事件的),slots对象(插槽)，包含没有在props配置中声明的属性的对象, 相当于 this.$attrs

## ref

ref是一个函数,作用:定义一个响应式的数据,返回的是一个Ref对象,对象中有一个value属性,如果需要对数据进行操作,需要使用该Ref对象调用value属性的方式进行数据的操作，html模版中是不需要使用.value属性的写法

将上面的vue3代码稍加改动，就能实现响应式数据

```javascript
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'App',
  	setup(){
        // 定义变量
        let msg = ref('hello vue component');
        function hello () {
            alert('hello');
        }
        return {
            msg,
            hello
        }
    }
})
```

> 这里使用vue提供的ref函数，将数据变为响应式数据，此时的msg 就变成Ref对象了，如果要获取里面的数据，需要使用`msg.value`，而html中，如果需要获取数据，直接使用就可以了。

## reactive

reactive，作用: 定义多个数据的响应式

 `const proxy = reactive(obj)`: 接收一个普通对象然后返回该普通对象的响应式代理器对象。响应式转换是“深层的”：会影响对象内部所有嵌套的属性。内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的。

```typescript
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    name: 'App',
  	setup(){
        // 定义变量
        const obj = {
          name: '小明',
          age: 20,
          wife: {
            name: '小甜甜',
            age: 18,
            cars: ['奔驰', '宝马', '奥迪'],
          },
        }
        // 把数据变成响应式的数据
        // 返回的是一个Proxy的代理对象,被代理的目标对象就是obj对象
        // user现在是代理对象,obj是目标对象
        // user对象的类型是Proxy
        const user = reactive<any>(obj)
    	console.log(user)
        const updateUser = () => {
          // 直接使用目标对象的方式来更新目标对象中的成员的值,是不可能的,只能使用代理对象的方式来更新数据(响应式数据)
          // obj.name += '==='
          // 下面的可以
          // user.name += '=='
          // user.age += 2
          // user.wife.name += '++'
          // user.wife.cars[0] = '玛莎拉蒂'

          // user---->代理对象,user---->目标对象
          // user对象或者obj对象添加一个新的属性,哪一种方式会影响界面的更新
          // obj.gender = '男' // 这种方式,界面没有更新渲染
          // user.gender = '男' // 这种方式,界面可以更新渲染,而且这个数据最终也添加到了obj对象上了
          // user对象或者obj对象中移除一个已经存在的属性,哪一种方式会影响界面的更新
          // delete obj.age // 界面没有更新渲染,obj中确实没有了age这个属性
          // delete user.age  // 界面更新渲染了,obj中确实没有了age这个属性

          // 总结: 如果操作代理对象,目标对象中的数据也会随之变化,同时如果想要在操作数据的时候,界面也要跟着重新更新渲染,那么也是操作代理对象

          // 通过当前的代理对象找到该对象中的某个属性,更改该属性中的某个数组的数据
          // user.wife.cars[1] = '玛莎拉蒂'

          // 通过当前的代理对象把目标对象中的某个数组属性添加一个新的属性
          user.wife.cars[3] = '奥拓'
        }
        return {
            user,
            updateUser
        }
    }
})
```

> 看代码上的注释即可

## ref与reactive细节

+ 两个都是Vue3的 composition API中2个最重要的响应式API(ref和reactive)

+ ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
+ 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
+ ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
+ reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
+ ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

## watch与watchEffect

### watch

```javascript
 // 监视----监视指定的数据
 watch(
 	user,
     ({ firstName, lastName }) => {
     fullName3.value = firstName + '_' + lastName
     },
     { immediate: true, deep: true }
 )
 // immediate 默认会执行一次watch,deep 深度监视


// watch---可以监视多个数据的
watch([user.firstName,user.lastName,fullName3],()=>{
   // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
   console.log('====')
 })
// 当我们使用watch监视非响应式的数据的时候,代码需要改一下
watch([()=>user.firstName, ()=>user.lastName,fullName3], () => {
    // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
    console.log('====')
})
```

### watchEffect

```javascript
// 监视,不需要配置immediate,本身默认就会进行监视,(默认执行一次)
watchEffect(() => {   
    fullName3.value = user.firstName + '_' + user.lastName
})
```

## 生命周期

vue：

```javascript
export default {
  beforeCreate() {
    console.log('2.x中的beforeCreate...')
  },
  created() {
    console.log('2.x中的created...')
  },
  beforeMount() {
    console.log('2.x中的beforeMount...')
  },
  mounted() {
    console.log('2.x中的mounted...')
  },
  beforeUpdate() {
    console.log('2.x中的beforeUpdate...')
  },
  updated() {
    console.log('2.x中的updated...')
  },
  // vue2.x中的beforeDestroy和destroyed这两个生命周期回调已经在vue3中改名了,所以,不能再使用了
  beforeUnmount() {
    console.log('2.x中的beforeUnmount...')
  },
  unmounted() {
    console.log('2.x中的unmounted...')
  },
}
```

vue3

```javascript
export default defineComponent({
   setup() {
    onBeforeMount(()=>{
      console.log('3.0中的onBeforeMount')
    })
    onMounted(()=>{
      console.log('3.0中的onMounted')
    })
    onBeforeUpdate(()=>{
      console.log('3.0中的onBeforeUpdate')
    })
    onUpdated(()=>{
       console.log('3.0中的onUpdated')
    })
    onBeforeUnmount(()=>{
       console.log('3.0中的onBeforeUnmount')
    })
    onUnmounted(()=>{
       console.log('3.0中的onUnmounted')
    })
    return {
      
    }
  }, 
})
```



## toRefs

toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref

```javascript
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '自来也',
      age: 47,
    })
    // const state2 = toRefs(state)
    const { name, age } = toRefs(state)
    // console.log(state2)
    // 定时器,更新数据,(如果数据变化了,界面也会随之变化,肯定是响应式的数据)
    setInterval(() => {
      // state.name += '=='
      // state2.name.value+='==='
      name.value += '==='
      console.log('======')
    }, 1000)

    const { name2, age2 } = useFeatureX()
    return {
      // state,
      // 下面的方式不行啊
      // ...state // 不是响应式的数据了---->{name:'自来也',age:47}
      // ...state2  toRefs返回来的对象
      name,
      age,
      name2,
      age2,
    }
  },
})
```

## ref获取页面元素

```vue
<template>
	<input type="text" ref="inputRef" />
</template>
<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue'
    export default defineComponent({
      name: 'App',
      // 需求:当页面加载完毕后,页面中的文本框可以直接获取焦点(自动获取焦点)
      setup() {
        // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
        const inputRef = ref<HTMLElement | null>(null)
        // 页面加载后的生命周期组合API
        onMounted(() => {
          inputRef.value && inputRef.value.focus() // 自动获取焦点
        })
        return {
          inputRef,
        }
      },
    })
</script>
```

## shallowReactive和shallowRef

```typescript
import { defineComponent, reactive, ref, shallowReactive, shallowRef} from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    // 深度劫持(深监视)----深度响应式
    const m1 = reactive({
      name: '鸣人',
      age: 20,
      car: {
        name: '奔驰',
        color: 'red',
      },
    })
    // 浅劫持(浅监视)----浅响应式
    const m2 = shallowReactive({
      name: '鸣人',
      age: 20,
      car: {
        name: '奔驰',
        color: 'red',
      },
    })
    // 深度劫持(深监视)----深度响应式----做了reactive的处理
    const m3 = ref({
      name: '鸣人',
      age: 20,
      car: {
        name: '奔驰',
        color: 'red',
      },
    })
     // 浅劫持(浅监视)----浅响应式
    const m4 = shallowRef({
      name: '鸣人',
      age: 20,
      car: {
        name: '奔驰',
        color: 'red',
      },
    })
    const update = () => {
      // 更改m1的数据---reactive方式
      // m1.name += '=='
      // m1.car.name += '=='
      // 更改m2的数据---shallowReactive
      // m2.name += '=='
      // m2.car.name += '==='
      // 更改m3的数据---ref方式
      // m3.value.name += '==='
      // m3.value.car.name += '==='
      // 更改m4的数据---shallowRef方式
      // m4.value.name += '==='
      // m4.value.name += '==='
      console.log(m3, m4)
    }
    return {
      m1,
      m2,
      m3,
      m4,
      update,
    }
  },
})
```

## readonly 和 shallowReadonly

```typescript
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '佐助',
      age: 20,
      car: {
        name: '奔驰',
        color: 'yellow',
      },
    })
    // 只读的数据---深度的只读
    // const state2 = readonly(state)
    // 只读的数据---浅只读的
    const state2 = shallowReadonly(state)
    const update = () => {
      // state2.name += '==='
      // state2.car.name += '=='

      // state2.name+='==='
      state2.car.name += '==='
    }
    return {
      state2,
      update,
    }
  },
})
```

## toRaw和markRaw

```typescript
import { defineComponent, markRaw, reactive, toRaw } from 'vue'
interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<UserInfo>({
      name: '小明',
      age: 20,
    })

    const testToRaw = () => {
      // 把代理对象变成了普通对象了,数据变化,界面不变化
      const user = toRaw(state)
      user.name += '=='
      console.log('哈哈,我好帅哦')
    }
    const testMarkRaw = () => {
      // state.likes = ['吃', '喝']
      // state.likes[0] += '=='
      // console.log(state)
      const likes = ['吃', '喝']
      // markRaw标记的对象数据,从此以后都不能再成为代理对象了
      state.likes = markRaw(likes)
      setInterval(() => {
        if (state.likes) {
          state.likes[0] += '='
          console.log('定时器走起来')
        }
      }, 1000)
    }
    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  },
})
```



## 响应式数据判断方法

+ isRef: 检查一个值是否为一个 ref 对象
+ isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
+ isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
+ isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

```javascript
setup(){
    // isRef: 检查一个值是否为一个 ref 对象
    console.log(isRef(ref({})))
    // isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
    console.log(isReactive(reactive({})))
    // isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
    console.log(isReadonly(readonly({})))
    // isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
    console.log(isProxy(readonly({})))
    console.log(isProxy(reactive({})))

    return{}
}
```

