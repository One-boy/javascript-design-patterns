/**
 * 发布订阅者模式实现
 */


class Pubsub {
    constructor() {
        // 订阅的话题列表
        this.topics = []
    }

    /**
     * 清空话题
     * @param {*} topic 清除单个话题时传递
     */
    clear(topic) {
        if (topic && this.topics[topic]) {
            this.topics[topic] = []
        } else {
            this.topics = []
        }
    }
    /**
     * 发布
     * @param {*} topic 发布的话题
     * @param {*} data 发布的数据
     */
    publish(topic, data) {
        if (this.topics[topic]) {
            this.topics[topic].forEach(func => {
                if (typeof func === 'function') {
                    func(topic, data)
                }
            })
        }
    }

    /**
     * 订阅
     * @param {*} topic // 订阅的话题
     * @param {*} func  // 通知回掉
     */
    subscribe(topic, func) {
        // 如果之前没有此话题，添加一个
        if (!this.topics[topic]) {
            this.topics[topic] = []
        }
        this.topics[topic].push(func)
    }
    /**
     * 取消订阅
     * @param {*} topic // 订阅的话题
     * @param {*} func  // 通知回掉
     */
    unsubscribe(topic, func) {
        if (this.topics[topic]) {
            this.topics[topic] = this.topics[topic].filter(item => !(item === func))
        }
    }
}


// 使用

const pubsub = new Pubsub()
// 创建多个订阅者
const subHandle1 = (topic, data) => {
    console.log("订阅者1", topic, data)
}
const subHandle2 = (topic, data) => {
    console.log("订阅者2", topic, data)
}
const subHandle3 = (topic, data) => {
    console.log("订阅者3", topic, data)
}

// 订阅
pubsub.subscribe('/login', subHandle1)

pubsub.subscribe('/logout', subHandle2)

// 同一个订阅者订阅不同话题
pubsub.subscribe('/login', subHandle3)
pubsub.subscribe('/logout', subHandle3)

setTimeout(() => {
    pubsub.publish('/login', '登录成功')
}, 2000)

setTimeout(() => {
    pubsub.publish('/logout', '退出成功')
    // 测试取消订阅
    // pubsub.unsubscribe('/logout', subHandle3)
    // 测试清空所有
    // pubsub.clear()
}, 3000)

setTimeout(() => {
    pubsub.publish('/logout', '退出成功2')
}, 4000)

