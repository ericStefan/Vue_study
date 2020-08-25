<template>
  <div>
    <h1>这是App的组件</h1>
    <!--  -->
    <mt-button type="danger" @click="show()">default</mt-button>
    <mt-button type="danger" size="large" plain icon="more">default</mt-button>
    <mt-button type="danger" size="small" disabled>default</mt-button>
    <mt-button type="primary">按钮</mt-button>

    <button type="button" class="mui-btn mui-btn-royal">紫色</button>
    
    <router-link to="/account">Account</router-link>
    <router-link to="/goodslist">GoodsList</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
// 按需导入Toast组件
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      toastInstanse: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //模拟获取列表的一个Ajax方法
      // 在互殴去数据执勤啊，立即弹出Toast提示用户，正在加载数据
      this.show();
      this.toastInstanse;
      setTimeout(() => {
        // 3秒过后，数据获取回来了，要把Toast移除
        this.toastInstanse.close();
      }, 3000);
    },
    show() {
      this.toastInstanse = Toast({
        message: "提示信息",
        position: "middle",
        duration: -1, //duration的值为-1则弹出后不消失
        iconClass: "glyphicon glyphicon-heart", //设置图标的类
        className: "mytoast",
      });
    },
  },
};
</script>