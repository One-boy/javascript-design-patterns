/**
 * 观察者模式实现
 */

// 首先有一个观察者列表类
// 它是一个列表，提供增删改查观察者的方法

class ObserverList {
    constructor() {
        // 存储观察者列表的数组
        this.observerList = []
    }
    // 增加观察者
    add(obj) {
        return this.observerList.push(obj)
    }
    // 清空所有观察者
    clearAll() {
        this.observerList = []
    }
    // 观察者列表的长度
    getCount() {
        return this.observerList.length
    }
    // 根据索引获取一个观察者
    getByIndex(index) {
        if (index > -1 && index < this.getCount()) {
            return this.observerList[index]
        }
    }
    // 根据索引插入一个观察者
    insertByIndex(obj, index) {
        let pointer = -1 // 记录插入的位置
        if (index === 0) {
            // 插入头部
            this.observerList.unshift(obj)
            pointer = index
        } else if (index === this.getCount()) {
            // 插入尾部
            this.add(obj)
            pointer = index
        }
        // else ...
        return pointer
    }
    // 根据观察者和起始索引，获取观察者所在位置
    indexOf(obj = {}, startIndex = 0) {
        let pointer = -1 // 记录位置
        this.observerList.forEach((item, index) => {
            if (index >= startIndex && item === obj) {
                pointer = index
            }
        })
        return pointer
    }
    // 删除对应索引位置的观察者
    removeIndexAt(index) {
        if (index === 0) {
            this.observerList.shift()
        } else if (index === this.getCount()) {
            this.observerList.pop()
        }
    }
}

// 其次有一个subject（目标）
// 它维护一个观察者列表，可以增加删除观察者
// 重要的是可以把变化逐一通知给维护的观察者列表

class Subject {
    constructor() {
        // 创建一个观察者列表实例
        this.observers = new ObserverList()
    }
    // 增加观察者
    addObserver(observer) {
        this.observers.add(observer)
    }
    // 移除观察者
    removeObserver(observer) {
        this.observers.removeIndexAt(this.observers.indexOf(observer, 0))
    }
    // 广播，逐一通知观察者，即调用观察者都会按照要求实现的update方法。
    notify(context) {
        const observerCount = this.observers.getCount()
        for (let i = 0; i < observerCount; i++) {
            const observer = this.observers.getByIndex(i)
            if (observer && observer.update) {
                observer.update(context)
            }
        }
    }
}

// 最后有一个观察者类，它有update方法
class Observer {
    constructor(name = '无名氏') {
        // 给观察者起个名字吧
        this.name = name
    }
    // 观察者的update方法，即接受subject的通知
    update(context) {
        console.log(`观察者[${this.name}]接受到通知：`, context)
    }
}


// 使用
// 创建一个目标
const subject = new Subject()
// 创建多个观察者并加入subject让其维护
const observer1 = new Observer('观察者1')
const observer2 = new Observer('观察者2')
const observer3 = new Observer()
// 观察者3重写一下update方法
observer3.update = (context) => {
    console.log('无名氏重写udpate，收到通知', context)
}
subject.addObserver(observer1)
subject.addObserver(observer2)
subject.addObserver(observer3)
// 触发通知
setTimeout(() => {
    subject.notify('你好世界！。')
    subject.notify({ text: '我是对象' })
}, 2000)

