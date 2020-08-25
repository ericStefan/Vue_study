import Vue from 'vue';
import app from './App.vue';
// 导入自定义router
import router from './router.js';
//导入bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import './css/app.css'

//引入babel/polyfill 
import "@babel/polyfill"

// 导入Mint-UI
// import MintUI from 'mint-ui'     //把所有组件都导入进来
// import 'mint-ui/lib/style.css'   //这里省略了node_modules

// Vue.use(MintUI)

// 按需导入Mint-UI组件
import {Button} from 'mint-ui';
Vue.component('mt-button',Button)

// 导入mui的样式表，和bootstrap用法一致
import './lib/mui/css/mui.min.css'

var vm = new Vue({
    el: '#app',
    data: {
        msg:'123'
    },
    methods: {},
    router,
    render:c=>c(app)
});

//注意：app这个组件，是通过vm实例render函数渲染出来的，render函数如果要渲染组件，渲染出来的组件只能放到el:"#app"所指定的元素中
