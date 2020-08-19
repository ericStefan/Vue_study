# watch、computed属性（计算属性）

## 一、watch属性

使用watch属性，可以见识data中指定的数据的变化，然后出发watch中对应的function处理函数。watch属性属性名就是data中的数据名称。

```javascript
var vm = new Vue({
  el:'#app',
  data:{
    firstnaem:'',
  },
  methods:{},
  wtach:{
    'firstname':function(newVal,oldVal){
      .......
    }
  }
})
```

watch中的fucntion提供了两个参数：`newVal`和`oldVal`,分别表示修改后的数据和修改前的数据。watch属性的function只是监听数据的变化，不用返回数据。

## 二、使用watch监听路由地址

将路由的`$route.path`绑定到`watch`属性上，即可以监听路由地址的改变。由于路由地址是不可见的，使用watch属性能够较容易监听到路由地址的改变。

```javascript
watch: {
        // 监听路由的$route.path
        '$route.path':function(newVal,oldVal){
        // console.log(oldVal+'---'+newVal)
         if(newVal === '/login'){
               console.log('欢迎进入登录界面')
           				}else if(newVal === '/register'){
                        console.log('欢迎进入注册界面')
                    }
                }
            },
```

```html
 <router-link to="/login">登录</router-link>
 <router-link to="/register">注册</router-link>
 <router-view></router-view>
```

## 三、computed属性（计算属性）

```javascript
var vm = new Vue({
  el:'#app',
  data:{
    firstname:'',
		middlename:'',
		lastname:'',    
  },
  methods:{},
  computed: {
                'fullname':function(){
                    console.log('ok')
                    // 计算属性函数必须有返回值
                    return this.firstname +'-'+ this.middlename+'-'+this.lastname
                }
            },
})
```

页面上的输入框：

```html
<input type="text" v-model="firstname">+
<input type="text" v-model='middlename'>+
<input type="text" v-model="lastname">=
<input type="text" v-model="fullname">
```

注意：

1、"计算属性"的本质是一个方法，在使用的时候，把他们的名称直接当作属性来使用，不能加小括号调用

2、只要只算属性内部所用到的data内部任何数据发生变化，就会立即重新计算这个计算属性的值。（如果使用的是方法进行计算，则每个数据都需要被绑定，而计算属性不需要。）

3、计算属性的求值结果会被缓存起来，方便下次使用，如果，计算属性中的所有数据都没发生变化，则不会重新对计算熟悉求值。

下面使用了三次计算属性的值，但由于数据没有发生改变，计算属性只会执行一次计算，这减少了浏览器的计算负担。

```html
<p>{{fullname}}</p>
<p>{{fullname}}</p>
<p>{{fullname}}</p>
<p>{{fullname}}</p>
```

