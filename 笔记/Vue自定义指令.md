# Vue自定义指令

## 一、自定义指令的定义

##### 1、全局指令定义

```javascript
Vue.directive('指令名称',{
  bind:function(el){
    .....//指令内容
  }
  
  inserted:function(el){
  	.....//指令内容
}
})
```

##### 2、 私有指令定义

```javascript
directives:{
  '指令名称':{
     bind:function(el){
    		.....//指令内容
  		}
  
  	inserted:function(el){
  			.....//指令内容
			}
  	}
}
```

## 二、钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。



tips:

- 常用钩子函数是bind、inserted、update。
- 与js行为相关的操作，一般在inserted中执行，如果绑定到bind中，因为元素还没有被插入到DOM中去，js的操作没有DOM对象，就不会起作用。
- 与样式相关的操作，一般放在bind中，因为无论元素有没有被插入到DOM中，样式总是会起作用。

## 三、钩子函数参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- `binding`一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
- `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

一个示例：

```javascript
 directives:{
              'fontweight':{
                    bind:function(el,binding){
                       el.style.fontWeight = binding.value;
                    },
               
                'fontsize': function(el,binding){
                  //在反复调用bind和updated钩子函数时候，可采用这种简写方式
                  //这个function等同于把代码写进了bind和update中去
                    el.style.fontSize = parseInt(binding.value) + 'px'
                }
             },
```

function的第一个参数`el`是固定的,表示被绑定了指令的那个元素。

binding是一个形参（参数名称可自己命名），可以传递指令名称、指令的`value`值，指令的字符串表达形式等。

## 四、调用指令

调用指令时，要在指令名称前加上`v-`前缀。可以给指令参数赋值，需要注意的是，如果赋值内容是数值或者变量则直接写在`“”`内，如果赋值内容是字符串，需要在`""`内再使用`''`。

```html
    <div id="app2">
        <p v-fontweight="900" v-fontsize = "'30px'">{{dt|dateFormat}}</p>
    </div>
```

