// 在webpack中import Vue from 'vue'导入构造函数，功能不完整，只提供了runtime-only方式
// import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue';
import login from './login.vue'
// 默认webpack无法打包.vue文件，需要安装相关的loader
// npm i vue-loader vue-template-compiler -D
// 在配置文件中，新增loader配置项{test:/\.vue$/,vue:'vue-loader'}
// var login = {
//     template:"<h1>这是网页创建的组件</h1>"
// }

var vm = new Vue({
    el: '#app',
    data: {
        msg:'123'
    },
    methods: {},
    render:function(createElements){//在webpack中，如果想要通过vue把一个组件放到页面中展示，vm实例中render函数可以实现。
        return createElements(login)
    }

    // render:c=>c(login)  上面的render可以简写
});

import m1,{title as title123,content} from "./test";
console.log(m1)
console.log(title123 + '---' + content)