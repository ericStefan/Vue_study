//module.exports = {}  这是node中向外暴露成员的方式

export default{//这是使用ES6规范的方式向外暴露成员
    name:'张三',
    age:'14'
}

//exports default向外暴露的成员可以用任意变量来接收
// 注意：在一个模块中，export default只允许向外暴露1次

export var title = '小星星' 
export var content = 'hahaha'
// 在一个模块中可以同时使用export default和export向外暴露成员
// 使用export只能使用{}的形式接收，这种形式叫做【按需导出】
// 注意：export可以向外暴露多个成员，同时，某些成员在import的时候不需要，可一不在{}中定义
// 注意：使用export导出的成员必须严格按照到处时的名称使用{}按需接收
// 注意：使用export导出的成员可以使用as来取别名