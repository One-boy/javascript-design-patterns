/**
 * 命令模式实现
 */


// 首先我们实现一个简单的汽车购买服务
const carManage = {
    // 请求信息
    requestInfo: function (model, id) {
        console.log(`获取到信息是：型号 ${model} ,ID ${id} 是一款高级车`)
    },
    // 订购汽车
    buyCar: function (model, id) {
        console.log(`你成功购买${model} ${id}汽车`)
    },
}
carManage.requestInfo('宝马', 12)
carManage.buyCar('宝马x5', 555)

// 看上面代码，没有任何错误，从技术上讲它是完全有效的js代码
// 但有些情况下可能是不利的，比如
// 如果carManage里的核心API改变了会怎么样，这将要求程序里所有直接访问这些方法的对象都需要进行修改
// 这可能被视为一个耦合层，我们可以进一步抽象API来解决这个问题

// 我们希望调用的时候如下这样：
// carManage.execute('buyCar', '宝马', 123)

// 那么我们的carManage会添加如下方法:
carManage.execute = function (name) {
    return carManage[name] && carManage[name].apply(carManage, [].slice.call(arguments, 1))
}

// 这样，最终的示例调用看起来就像下面这样：
carManage.execute('buyCar', '宝马', 123)
carManage.execute('requestInfo', '宝马x5', 456)
carManage.execute('xxxxx', '宝马x5', 456)