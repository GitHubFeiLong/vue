/**
 * 类类型
 * 类的类型，可以通过接口来实现
 */
(()=>{
    // 定义一个接口
    interface IFly {
        // 
        fly();
    }
    // 定义一类，这个类的类型就是上面定义的接口(实际上也可以理解为，IFly接口约束了当前的Person类)
    class Person implements IFly {
        // 实现接口中的方法
        fly () {
            console.log("Person fly");
        }
    }

    // 实例化对象
    const person = new Person();
    person.fly();


    interface ISwim {
        swim()
    }

    // 定义一类，类的类型是IFly和ISwim（当前这个类可以实现多个接口，一个类同时也可以被多个接口进行约束）
    class Person2 implements IFly, ISwim {
        fly(){
            console.log("person2 fly");
        };
        swim(){
            console.log("swim fly");
        }
    }
    const person2 = new Person2();
    person2.fly();
    person2.swim();

    // 总结：类可以通过接口的方式，来定义当前这个类的类型
    // 类可以实现一个接口，类也可以实现多个接口，要注意，接口中的内容都要真正的实现
    // 接口可以继承其它的多个接口

})()