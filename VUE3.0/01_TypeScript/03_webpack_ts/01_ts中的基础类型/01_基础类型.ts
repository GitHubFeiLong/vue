// 基础类型
/*
    总结：ts中变量一开始是什么类型，后期就只能使用这个类型进行赋值
*/
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

    /*
        数组类型：
        定义方式1：let 变量名:数据类型[] = [x,y,z]
        定义方式2：let 变量名：Array<数据类型> = [x,y,z]
        数组定义后，里面的数据类型必须和定义数组的时候的类型保持一致
    */
   let arr1 : number [] = [1,2,3];
   let arr2 : Array<number> = [4,5,6];
  
   console.log(arr1,arr2); 

   /*
        元组类型:
        在定义数组的时候，类型和数据的个数一开始就已经限定了
   */
    let arr3 :[string, number, boolean] = ['汉字', 18, true];
    console.log(arr3);

    /*
        枚举类型:
        每个数据值都可以叫元素，每个元素都有自己的编号（从零开始，后面递增1）
        也可以手动指定值（red=10,后面的green就是11）
    */
   enum Color {
       red,green,blue
   }
   let color:Color = Color.blue;

   /*
        any类型:
        不确定变量什么类型时，可以使用any.
   */
  let str:any = 100;
  str = 'str';
  let anyArr:any[] = ['str', 1, true];

   /**
    * void类型
    */
   function showMsg():void {
        console.log("return void type");
   }
   console.log(showMsg());

   /**
    * object类型
    */
   function getObj (obj:object):object {
        console.log(obj);
        return {
            name:'卡卡西',
            age: 27
        }
   }
   console.log(getObj({age:18}));

    /**
     * 联合类型（Union Types）表示取值可以为多种类型中的一种。
     * 需求1：定义一个函数得到一个数字或字符串值的字符串形式值
     * 类型断言：
     * 告诉编译器，变量什么数据类型
     * <类型>变量（<string>str）、变量 as 类型 (str as string)
     */
   function getString(str:number | string){
        console.log(str)
   }
  
   getString(1);getString('2');
   // 需求定义一个函数得到一个数字或字符串长度
   function getLength (str:string|number) : number{
       if ((<string>str).length) {
           console.log("类型断言");
            return (<string>str).length;
       }
        return str.toString().length;
   }
   console.log(getLength("asd"));

   /**
    * 类型推断，在没有明确指定变量数据类型时，会推断出一个类型。
    */
   // 方式一：推断出number类型，此时二次赋值时只能赋number类型
   let txt1 = 100;
   // txt1 = 'qw';
   // 方式二：先声明一个变量（此时就是any类型），后面可以任意类型赋值 
   let txt2;
   txt2 = 100;
   txt2 = 'ad';

})()