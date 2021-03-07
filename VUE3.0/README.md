# Vue3新特性
看到哪了 9 看完了
## TypeScript
### 安装TypeScript
使用npm安装
```bash
npm install -g typescript
```
检查安装是否成功
```bash
tsc -v
```
### 编写ts文件
> 01_TypeScript\01_ts的第一次

总结：
1. ts的文件中如果直接书写js语法的代码，那么在html文件中直接引入ts文件，在谷歌浏览器中是可以直接使用的。
2. 如果ts文件中有了ts的语法代码，那么就需要把这个ts文件编译成js文件，在html文件中引入js的文件来使用。
3. ts文件中的函数中的形参，如果使用了某个类型进行修饰，那么最终在编译的js文件中是没有这个类型的。
4. ts文件中的变量使用的是let进行修饰，编译的js文件中的修饰符就变成了var了。

### vscode自动编译
1. 生成配置文件`tsconfig.json`
```bash
tsc --init
```
2. 修改tsconfig.json配置
```json
{
    "outDir": "./js",                              /*把ts文件最终编译后放在js目录中*/
     "strict": false,                                 /* 不使用严格模式 */
}
```
3. 启动监视任务
在Visual Studio Code 中菜单栏中点击`终端`，然后在下拉菜单中找到`运行任务`,然后点击弹框中的`显示所有任务`，最后点击 `tsc:watch...` (监视)

### 类型注解
例如(下面函数的参数加上了一个`: string`)
```typescript
// 类型注解：是一种轻量级的为函数或者变量添加的约束
(() => {
    // str是string类型的
    function showMsg (str : string) {
        return '床前明月光,' + str;
    }

    let msg = '疑是地上霜';
    // msg是数组
    // let msg = [10, 20, 30];
    // 智能的错误提醒
    console.log(showMsg(msg));
})()
```

### 接口
```typescript
// 接口：是一种能力，一种约束
(() => {
    // 定义一个接口
    interface Iperson {
        firstName:string// 姓氏
        lastName:string // 名字
    }
    // 输出姓名
    function showFullName (person: Iperson) {
        return person.firstName + '_' + person.lastName
    }

    const person = {
        // firstName: '东方',
        lastName: '不败',
    }

    console.log(showFullName(person));
})()
```

### 类
```typescript
// 类，ts中书写js中的类，演示效果
(() => {
    // 定义一个接口
    interface Iperson {
        firstName:string// 姓氏
        lastName:string // 名字
    }
    // 定义一个类
    class Person {
        // 定义公共的字段（属性）
        firstName:string// 姓氏
        lastName:string // 名字
        fullName:string
        // 定义一个构造函数
        constructor (firstName:string, lastName:string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + '_' + lastName;
        }
    }

    // 定义个函数
    function showFullName (person:Iperson) {
        return person.firstName + '_' + person.lastName;
    }

    // 实例化对象
    const person = new Person('诸葛', '孔明');
    console.log(showFullName(person));
})()
```

### 使用webpack 打包TS
1. 下载依赖
> 不能用最新的，可能会出现错误（视频教程里用的老版本）
```bash
npm i typescript
npm i webpack@4.41.5 webpack-cli@3.3.10
npm i webpack-dev-server@3.10.2
npm i html-webpack-plugin@4.5.0 clean-webpack-plugin@3.0.0
npm i ts-loader
npm i cross-env
``` 

##

##
