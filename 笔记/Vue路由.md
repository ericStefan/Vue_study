# Vue路由

## 一、创建一个全局路由

路由规则中，`path`属性表示监听的路由链接，匹配到相应的path则会展示`component`属性绑定的对应组件模版对象。

注意：component中绑定的是组件模版对象（不是组件名称）。

```javascript
 var routerObj = new VueRouter({
            //这个route表示路由匹配规则
            routes: [
                { path: '/login', component: login },
                { path: '/register', component: register }
            ],
        })
```

与路由匹配的组件模版：

```javascript
var login = {
            template: '<h1>登录组件</h1>'
        }

var register = {
            template: '<h1>注册组件</h1>'
        }
```

将路由注册到`vm`实例中:

```javascript
var vm = new Vue({
            el: '#app',
            data: {},
            methods: {},
            router: routerObj,
  					//如果路由名称也为router，则这行可以简写为router 
        });
```

在页面上使用路由：

```Html
 <div id="app">
        <router-link to="/login" tag="span">登录</router-link>
        <router-link to="/register" tag="span">注册</router-link>
        <router-view></router-view>
 </div>
```

`<router-link>`默认被渲染为`<a>`标签，使用`tag`属性可以渲染为指定的标签，渲染出来的元素均可以通过点击切换对应的组件。

`<router-view>`是`vue-router`提供的占位符元素，用来展示路由匹配规则。

## 二、默认路由和`CSS`样式

为了实现在用户点击前展示指定的默认路由，可在`route`规则中添加：

```javascript
{path:'/',redirect:'/login'}
```



为了能够对`<router-link>`j进行修饰，`vue-router`提供了`router-link-active`类，当展示了对应的组件，相应的`router-link`就会被设置为`router-link-active`类。

同是可以对`router-link-active`的类名进行自定义，通过下面方式：

```
var routerObj = new VueRouter({
            routes: [
								.......//路由规则
            ],
            
             linkActiveClass:'myactive',//自定义router-link-active的类名
        })
```

## 三、路由的参数传递

#### 		1、参数传递方式一

在`route-link`的to属性的`url`中添加参数

```html
<router-link to="/login?id=10&name=jack">登录</router-link>
```

在对应的组件模版中使用获取query中的数据。（使用路由后，会在data中存储一个$route对象，`router-link`中传递的参数会储存在$route对象中的`query`中）

``` javascript
var login ={
            template:'<h1>登录组件---{{$route.query.id}}----{{$route.query.name}}</h1>',
            created() {//组件的生命周期钩子函数
                console.log(this.$route)
            },
        }
```



### 2、参数传递方式二

在路由规则中绑定参数：

```javascript
var router = new VueRouter({
            routes:[
                {path:'/register/:id/:name',component: register}
            ]
        })
```

在`router-link`添加参数的值：

```html
 <router-link to="/register/20/rose">注册</router-link>
```

在组件模版中调用参数：(路由规则中绑定的参数被存放在`$route`属性的`params`)

```javascript
var register ={
            template:'<h1>注册组件----{{$route.params.id}}----{{$route.params.name}}</h1>',
            created() {
                console.log(this.$route.params.id)
            },
        }
```

## 四、路由嵌套

使用路由规则｛｝中的`children`属性，可以将子路由嵌套在父路由上。

```javascript
var router = new VueRouter({
            routes: [
                { path: '/', redirecr: '' },
                {
                    path: '/account',
                    component: account,
                  // 使用children属性进行子路由的嵌套
                  // 子路由的path前不要带/，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
                    children:[
                        {path:'login',component:login},
                        {path:'register',component:register}
                    ]
                },
            ]
        })
```

在父组件模版中嵌套子路由，并给子路由提供展示元素的`<router-view>`

```html
<template id="temp1">
        <div>
            <h1>这是Account</h1>
            <router-link to="/account/login">登录</router-link>
            <router-link to="/account/register">注册</router-link>
           <!-- 给嵌套的路由组件提供展示元素 -->
            <router-view></router-view>
        </div>

    </template>
```

展示父组件和路由：

```html
<router-link to="/account">Account</router-link>
<router-view></router-view>
```

## 五、路由实现视图布局（同时展示多个路由组件）

对于多个组件模版：

```javascript
 var header = {
            template:'<h1 class="header">这是顶部的Box</h1>'
        }

        var mainBox ={
            template:'<h1 class="main">这是主header</h1>'
        }

        var leftBox = {
            template:'<h1 class="left">这是左侧Box</h1>'
        }
```

可以将多个组件模版绑定在一个路由规则的`components`上(注意s)：

```javascript
 routes:[
        {path:'/',components:{
                    'default':header,
                    'left':leftBox,
                    'main':mainBox
                }},
            ]
```

给`<router-view>`绑定name对应的name属性，即可在同一个URL地址上的对应的容器例展示组件了

```html
<router-view name="default"></router-view>
<router-view name="left"></router-view>
<router-view name="main"></router-view>
```

