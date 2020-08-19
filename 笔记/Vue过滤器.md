# Vue中的过滤器

## 一、全局过滤器

定义一个全局过滤器

```javascript
Vue.filter('msgFormat'， function(msg){
  ......//过滤规则
})
```

全局均可私有该过滤器。

## 二、私有过滤器

定义一个私有过滤器：

```javascript
var vm = new Vue({
	el:'#app',
	data:{},
	methods:{},
	filters:{
		过滤器名称:function(msg){
			......//过滤规则
		}
	}
})
```

只有当前`vm`示例控制的`dom`能使用该私有过滤器

## 三、过滤器的参数

​     以一个全局过滤器为例子:

```javascript
 Vue.filter('msgFormat', function (msg, arg, arg2) {
            //    replace()方法中可以定义正则表达式
            return msg.replace(/单纯/g, arg + arg2)
        })
```

过滤器的`fucntion`的第一个参数`msg`是固定的，是通过过滤管道符`|`传入的待过滤数据,过滤器可以拥有多个过滤参数

​	在实例中使用过滤器：

```html
<div id="app">
        <!-- 过滤器可以传递多个参数，可以多次调用 -->
  			 <!-- '疯狂'是传递给参数arg的值，‘123’是传递给arg2的值 -->
        <p>{{msg | msgFormat('疯狂','123') |test}}</p>
    </div>
```

```javascript
var vm = new Vue({
   el: '#app',
            data: {
            msg: "曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人",
            dt: new Date()
            },
  					
  					filters:{
              test:function(msg){
                return msg + '========='
							}
            }
})
```

当一个全局过滤器和私有过滤器同名时，过滤器遵循就近原则，有限调用私有过滤器（视提供参数而定）。

