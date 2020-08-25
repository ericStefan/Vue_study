<template>
    <div>
        <h1>这是Account组件</h1>

        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>
 
<style lang="scss" scoped>
    /* 普通的style标签只支持不同样式，设置lang属性可以启用scss或less */
    // 只要style标签是在.vue组件中定义，推荐为style开启scoped属性。
    body{
        font-style:italic;
    }
</style>