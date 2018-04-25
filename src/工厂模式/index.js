/**
 * 工厂模式示例
 */


// 下面展示如何使用工厂模式来实现车辆工厂


// 定义车辆中的小汽车类
class Car {
    constructor({ doors = 4, state = '新品牌', color = 'red' }) {
        this.doors = doors
        this.state = state
        this.color = color
    }
}

// 定义车辆中的卡车类
class Truck {
    constructor({ wheelSize = 'large', state = '已使用', color = 'red' }) {
        this.wheelSize = wheelSize
        this.state = state
        this.color = color
    }
}


// 定义车辆工厂
class Vehicle {
    constructor() {
        // 该工厂的制造工具，默认是car类
        this.vehicleClass = Car
    }

    // 创建车辆实例的方法
    createVehicle(options) {
        if (options.type === 'car') {
            this.vehicleClass = Car
        } else {
            this.vehicleClass = Truck
        }
        return new this.vehicleClass(options)
    }
}


// 使用
const factory = new Vehicle()
// 用工厂的创建方法创建一个小汽车
const myCar = factory.createVehicle({ type: 'car', doors: 2, state: '我的新两门跑车' })
console.log(myCar, myCar instanceof Car)