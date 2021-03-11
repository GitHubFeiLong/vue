# Vue3新特性
看到哪了 26 看完了
https://www.tslang.cn/docs/handbook/basic-types.html
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
接口是对象的状态（属性）和行为（方法）的抽象（描述）。
> 默认属性是可读可写
readonly 是只读的 （readonly id:number）
`?` 属性是可选的（sex ?:string）
       
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

### 函数类型
```typescript
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名，它就像是一个只有参数列表和返回值类型的函数定义。参数列表的每个参数都需要名字和类型
(() => {
    // 函数类型：通过接口的方式作为函数的类型来使用

    // 定义一个接口，用来作为某个函数的类型使用
    interface ISearchFunc {
        // 定义一个调用签名
        (source:string, subString:string):boolean
    }
    // 定义一个函数，该类型就是上面定义的接口
    const searchString : ISearchFunc = function (source:string, subString:string):boolean {
        // 在字符串中source查询subString 字符串是否存在
        return source.search(subString) > -1;
    }

    console.log(searchString('字符串', '字串'));
})()
```

### 使用webpack 打包TS
下载依赖
> 不能用最新的，可能会出现错误（视频教程里用的老版本）
```bash
npm i typescript
npm i webpack@4.41.5 webpack-cli@3.3.10
npm i webpack-dev-server@3.10.2
npm i html-webpack-plugin@4.5.0 clean-webpack-plugin@3.0.0
npm i ts-loader
npm i cross-env
``` 

#### 基础类型
```typescript
// 基础类型
(() => {
    /*
        布尔类型: boolean
        基本语法：let 变量名：数据类型 = 值
    */
    let flag:boolean = true
    console.log(flag);

    /*
        数字类型: number
        十进制、二进制（0b开头）、八进制（0o开头）、十六进制（0x开头）
    */
   let a1:number = 10
   let a2:number = 0b1010
   let a3:number = 0o12
   let a4:number = 0xa
   console.log(a1, a2, a3, a4);

   /*
        字符串类型：string
   */
    let str1:string = '字符串变量';
    console.log(str1);

    /*
        字符串和数字之间拼接
    */
   console.log(str1 + a1);

   /*
        undefined和null是可以作为其他类型的子类型（其他类型变量可以赋值成null或undefined）需要关闭严格模式 ts的配置文件（"strict": false,   ）
   */
   let und:undefined = undefined;
   let nul:null = null;
   console.log(undefined, null);
})()
```
>总结：ts中变量一开始是什么类型，后期就只能使用这个类型进行赋值

### ts基础数据类型
> 为了让程序有价值，我们需要能够处理最简单的数据单元：数字，字符串，结构体，布尔值等。 TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。
1. 布尔类型（boolean）
基本语法：let 变量名：数据类型 = 值
```typescript
let flag:boolean = true
```
2. 数字类型（number）
> 和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。十进制、二进制（0b开头）、八进制（0o开头）、十六进制（0x开头）
```typescript
let a1:number = 10
let a2:number = 0b1010
let a3:number = 0o12
let a4:number = 0xa
console.log(a1, a2, a3, a4);
```
3. 字符串类型（string）
> 使用 string表示文本数据类型。 和JavaScript一样，可以使用双引号（ "）或单引号（'）表示字符串。还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `），并且以${ expr }这种形式嵌入表达式
```typescript
let str1:string = '字符串变量';
console.log(str1);
```
4. undefined和null
> TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：
默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。（其他类型变量可以赋值成null或undefined）需要关闭严格模式 ts的配置文件（"strict": false, ）
```typescript
let und:undefined = undefined;
let nul:null = null;
console.log(undefined, null);
```
5. 数组类型：
>第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
let 变量名:数据类型[] = [x,y,z]
第二种方式是使用数组泛型，Array<元素类型>：
let 变量名：Array<数据类型> = [x,y,z]
数组定义后，里面的数据类型必须和定义数组的时候的类型保持一致
```typescript
let arr1 : number [] = [1,2,3];
let arr2 : Array<number> = [4,5,6];

console.log(arr1,arr2);
```
6. 元组类型
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
```typescript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
7. 枚举类型
enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
```typescript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
或者，全部都采用手动赋值：
```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```
枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```
8. any类型
> 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量
```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
9. void类型
>某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
```typescript
function warnUser(): void {
    console.log("This is my warning message");
}

function showMsg():void {
    console.log("return void type");
}
console.log(showMsg());
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;
```
10. 对象类型（object）
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

使用object类型，就可以更好的表示像Object.create这样的API。例如：
```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```
11. 联合类型（Union Types）
表示取值可以为多种类型中的一种。
```typescript
let hh : number | boolean = 100;
hh = false;
```
12. 类型断言
告诉编译器，变量什么数据类型:
语法一： <类型>变量（<string>str）
语法二：变量 as 类型 (str as string)

13. 类型推断
在没有明确指定变量数据类型时，会推断出一个类型。
```typescript
// 方式一：推断出number类型，此时二次赋值时只能赋number类型
let txt1 = 100;
// txt1 = 'qw';
// 方式二：先声明一个变量（此时就是any类型），后面可以任意类型赋值 
let txt2;
txt2 = 100;
txt2 = 'ad';
```

14. Never
never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

下面是一些返回never类型的函数：
```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```
15. 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：
```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
另一个为as语法：
```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

关于let
你可能已经注意到了，我们使用let关键字来代替大家所熟悉的JavaScript关键字var。 let关键字是JavaScript的一个新概念，TypeScript实现了它。 我们会在以后详细介绍它，很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。
##
##
##
