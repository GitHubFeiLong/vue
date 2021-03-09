/**
 * 接口
 * 接口是对象的状态（属性）和行为（方法）的抽象（描述）。
 */
(() => {
    // 默认属性是可读可写
    interface IPerson {
        // readonly 是只读的
        readonly id:number,
        name:string,
        age:number,
        // `?` 属性是可选的
        sex ?:string
    }
    const person:IPerson = {
        id:1,
        name:'小甜甜',
        age:18,
        sex:'女'
    }
    console.log(person)
})()