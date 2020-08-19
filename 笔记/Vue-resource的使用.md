# Vue-resource的使用

## 一、Vue-resource的作用

   vue-resource是在vue中发起ajax请求的一个第三方包，由于vue-resource依赖于Vue，要在Vue.js源文件后面引用vue-resource的源文件

## 二、常用的三种请求方法（get post jsonp)

### 		1、get请求

```javascript
this.$http.get('/someUrl',[config]).then(response => {
    // success callback
  }, response => {
    // error callback
  });
```

示例：

```javascript
// 获取所有品牌列表
 this.$http.get('api/getprodlist').then(result => {
                        var result = result.body;
   											//判断请求成功与否，并返回反馈
                        if (result.status === 0) {
                            // 返回status ===0 表示获取数据成功
                            this.list = result.message
                        } else {
                            alert('获取列表数据失败')
                        }
                    })
```



### 2、post请求

```javascript
this.$http.post('/someUrl',[body],[config]).then(response => {
    // success callback
  	//[body]是要post的数据
  }, response => {
    // error callback
  });
```

```javascript
 this.$http.post('url/api/addproduct', { name: this.name },{ emulateJSON: true }).then(result => {
                        if (result.body.status === 0) {
                            // 成功了
                            // 添加完成后手动调用getAllList()就可以刷新品牌列表
                            this.getAllList();
                            this.name = '';
                        } else {
                            // 失败了
                            alert('添加品牌失败')
                        }
                    })
```



### 3、jsonp请求

```javascript
this.$http.jsonp('/someUrl',[config]).then(response => {
    // success callback
  }, response => {
    // error callback
  });
```

根据具接口的要求和需求使用相应的请求方法。

## 三、全局规范

  为了避免不同接口的规范问题出现的错误，可在发送请求时将emulateJSON属性设置为true。同时也可以全局设置emulateJSON,在使用请求是就可以不再进行设置。

```javascript
Vue.http.options.emulateJSON = true;
```

## 四、设置全局根路径

为了避免每次请求需要输入较长的url地址，同时为了方便更换url地址进行维护，可以设置全局的url根路径。

```javascript
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
```

 tip:全局配置了请求数据的根域名，每次发起单独http请求时候，请求的url前不加/，否者不启用根路径拼接。



更多vue-resource使用，可访问[vue-resource项目主页](https://github.com/pagekit/vue-resource)。

