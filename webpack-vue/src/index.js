// 在webpack中import Vue from 'vue'导入构造函数，功能不完整，只提供了
import Vue from 'vue/dist/vue.js'

// var Vue = require('vue')
var vm = new Vue({
    el: '#app',
    data: {
        msg:'123'
    },
    methods: {}
});