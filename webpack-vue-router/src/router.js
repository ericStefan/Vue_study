import Vue from 'vue';
import VueRouter from 'vue-router';
import account from './main/Account.vue';
import goodslist from './main/GoodsList.vue';
import login from './subcom/login.vue';
import register from './subcom/register.vue';
// 注意数据包的引用顺序，要在vue-router之后应用router相关的路由信息
Vue.use(VueRouter);
var router = new VueRouter({
    routes:[
        { path: '/', redirecr: '' },
        {
            path:'/account',
            component:account,
            children:[
                {path:'register',component:register},
                {path:'login',component:login},

            ]
        },
        {path:'/goodslist',component:goodslist},
    ]
})

// 把路由暴露出去
export default router;