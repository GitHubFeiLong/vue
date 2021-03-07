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