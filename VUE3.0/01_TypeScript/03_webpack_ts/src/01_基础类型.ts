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


})()