# `Vue`组件

## 一、组件的定义方式（三种）

1、使用`Vue.extend`创建全局`Vue`组件

```javascript
var com1 = Vue.extend({
            // 使用template属性指定了组件要展示的HTML结构
            template: '<h3>这是使用Vue.extend创建的组件</h3>'
        })
// 使用Vue.component('组件名称'，创建的模版对象)
Vue.component('myCom1', com1)
```
  可以将将模版对象直接写进`Vue.component`中

```javascript
Vue.component('mycom1', Vue.extend({
       template: "<h3>这是第二个组件</h3>"
}))
```

2、直接使用`Vue.component`,省略`Vue.extend`

```javascript
Vue.component('mycom2', {
      // 组件模版有且只能有一个根节点元素
      template: "<h3>这是直接使用Vue.compone创建的组件</h3>"
})
```

3、在`vm`实例控制的的div外部使用`<template>`定义template模版。

```javascript
Vue.component('mycom3', {
            template: "#temp1"
        })
```

```html
 <template id="temp1">
   <div>
  	<h1>这是通过template元素在外部定义的组件结构，有标签智能提示</h1>
   </div>
</template>
```

私有组件的定义：

```javascript
var vm2 = new Vue({
            el:"#app2",
            data:{},
            methods:{},
            directives:{},
            filters:{},
            components:{
                // 定义内部私有组件
                // 组件名称可以不用双引号括起来
                login:{
                    template:"<h1>这是私有的login组件</h1>"
                },

                sign:{
                    template:"#temp2"
                }
            },      
```

## 二、组件的使用及属性

在实例中直接将组件名称用标签的方式展示：

```html
<my-com1></my-com1>
```

需要注意的是`html`标签中只能使用小写，如果组件名称是驼峰命名的，如`myCom`,则在使用的时候将驼峰大写改为小写，并用`-`连接两个单词（my-com）。



   与`vm`实例类似，一个组件中可以包含data，methods, directives，filters、生命周期函数等。为了保证多次调用一个组件，每次调用的数据的独立性，data是一个返回对象的函数。

```
var com1 = {
		template:"#temp1",
		data(){
			return{
				msg:'',
			}
		},
		methods:{},
		directives:{},
		filters:{},
}
```



## 三、父组件向子组件传值（属性传递）

创建一个私有组件，在`props`中把父组件传递过来的`parentmsg`属性定义一下，这样，才能使用这个数据。：

```javascript
components: {
                com1: {
                    // 子组件中默认无法访问父组件中的数据
                    template: "<h1 @click='change()'>这是子组件---{{parentmsg}}</h1>",
                    props: ['parentmsg'];
                }
            },
```

对于一个`vm`实例，`com1`组件相当于一个子组件：

```javascript 
var vm = new Vue{
		el:'#app',
		data:{
			msg:'这是父组件'
		}
}
```

使用子组件，将父组件`vm`中的`msg`数据绑定到`parentmsg`属性上,子组件使用了父组件里的数据：

```php+HTML
<com1 v-bind:parentmsg="msg"></com1>
```

需要注意的是：

1、组件中所有props中的数据，都是通过父组件传递给子组件的
2、props中的数据是只读的,无法重新赋值（不可修改）

## 四、子组件给父组件传值（方法传递）

在`vm`实例中创建私有组件：

```javascript
var vm = new Vue({
  el:'#app',
  data:{
    msg:'这是父组件中的数据',
    msgFormSon:''
  },
  
  methods{
  getMsgFromSon(data){
  			this.msgFormSon = data;
  			console.log(this.msgFormSon)
			}
	},
    components:{
      com1
    }
})
```



子组件模版：

``` javascript
var com1 = {
	template:'#temp1',
	data(){
		return{
			msg:'传递给父组件的值'
		}
	},
	methods:{
		sendMsg(){
				this.$emit('func',this.msg)//这里的this.msg是子组件存放在data()中的
		}
	}
}
```

子组件模版：

```html
<template id="temp1">
  <div>
 				<input type="button" value="给父组件传递消息" @click='sendMsg'>
        </div>
    </template>
```

使用子组件，将父组件中的方法绑定到`func`上：

```html
<com1 @func='getMsgFromSon'></com1>
```

思路：通过调用子组件中的方法触发`this.$emit()`,这个方法会将`this.msg`（子组件中的`msg`）传递给`func()`,而在使用的时候，将父组件中的方法`getMsgFromSon()`绑定到了`func`属性上，进而子组件的值被传递近了父组件的方法中，实现子组件传递子给父组件。

## 五、`component`占位符

vue提供了`<component>`标签作为占位符，用来展示对应名称的组件：

```javascript
            <component :is="comName"></component>
```

其中`:is`属性用来绑定组件名称。

这个特性可以用来实现多个组件切换的功能：

```html
 <a href="" @click.prevent="comName = 'login'">登录</a>
 <a href="" @click.prevent="comName = 'register'">注册</a>
 <a href="" @click.prevent="comName = 'logout'">注销</a>
```

