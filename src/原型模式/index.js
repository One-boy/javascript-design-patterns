/**
 * 原型模式实现
 */


// es5标准定义，有趣的，真正的原型继承要求使用Object.create()方法
// Object.create创建一个对象，拥有指定原型和可选的属性
// Object.create(prototype,optionalDescriptObjects)

const myCar = {
    name: '宝马x5',
    drive: function () {
        console.log('我开了...')
    },
    panic: function () {
        console.log('我凉了。.')
    }
}
// 使用Object.create实例化一个新的car
const newCar = Object.create(myCar)
console.log(newCar.name)
newCar.drive()



// 当然Object.create()还有第二个可选的参数，可以定义属于实例的非继承的属性

const newCar2 = Object.create(myCar, {
    id: {
        value: 123,
        enumerable: true,
    },
    model: {
        value: '宝马',
        enumerable: true,
    }
})

console.log(newCar2.name)
console.log(newCar2.model)
newCar2.drive()




// 当然如果不希望使用Object.create()实现原型模式
// 我们也可以向下面这样实现继承，即实现原型模式
const myCar2 = {
    init: function (model) {
        this.model = model
    },
    getModel: function () {
        return this.model || '未获取到型号'
    }
}

const createCar = function () {
    const F = function () { }
    F.prototype = myCar2
    return new F()
}

const newCar3 = createCar()
newCar3.init('奔驰')
console.log(newCar3.getModel())