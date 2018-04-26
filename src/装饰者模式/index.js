/**
 * 装饰者模式示例
 */


// 下面展示如何使用装饰模式来实现购买苹果笔记本的功能

// 默认的苹果笔记本构造类
class MacBook {
    constructor() { }
    // 默认笔记本花费
    cost() {
        return 11000
    }
    // 尺寸
    screenSize() {
        return 11.6
    }
}

const mb = new MacBook()
console.log(mb)
// 原构造类默认是没有加内存后的报价的
console.log(typeof mb.addMemeCost) // undefined

// 这里添加一个装饰器函数
// 为MacBook类添加（装饰）一个方法，此方法是加内存后的报价
function decorator(targetClass) {
    targetClass.prototype.addMemeCost = function () {
        // 加了内存后价格加1000块。
        return this.cost + 1000
    }
    return targetClass
}

const NewMacBook = decorator(MacBook)
const newMb = new NewMacBook()
console.log(typeof newMb.addMemeCost) // function
// 此时的mac实例就可以查询加内存后的报价了。
console.log(newMb.addMemeCost())


// 总结下，装饰者模式就是给原基础类对象增加功能，如一些属性或方法，增强原有功能。
