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