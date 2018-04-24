/**
 * 外观模式示例
 */


// 如通用的事件监听器
// 提供 一个通用的接口，但是对使用者隐藏了内部的复杂实现
const addMyEvent = function (ele, event, fn) {
    if (ele.addEventLlistener) { // 现代浏览器
        ele.addEventLlistener(event, fn, false)
    } else if (ele.attachEvent) {  // ie
        ele.attachEvent(`on${event}`, fn)
    } else {
        ele[`on${event}`] = fn
    }
}


// 其它如jQuery使用了大量的外观模式
// 如$(document).ready(...)


