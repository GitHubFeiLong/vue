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