# Vue过渡动画

## 一、过渡类名

![image-20200730020413048](C:\Users\64296\AppData\Roaming\Typora\typora-user-images\image-20200730020413048.png)

1. `v-enter`： 动画进入前的时间点，此时还未开始进入
2. `v-enter-active`：入场时间段。
3. `v-enter-to`：在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：离场时间段。
6. `v-leave-to`：离开后的时间点，离开的终止状态，此时，元素动画已经结束。

## 二、使用方法

#### 1、使用`<transition></transition>`标签过渡单个节点。

示例：

```html
 <transition>
            <h3 v-if="flag">这是一个h3</h3>
 </transition>
```

若有多个不同的节点需要渲染，为了进行区分，可以使用`transition`的name属性，定义过渡类名的前缀。例如，name="my"，则在`style`中类名就是`my-enter`。

```javascript
        <transition name="my">
            <!-- 使用transition的name属性可以自定义样式中类名前缀 -->
        <h6 v-if="flag2">这是一个h6</h6>
        </transition>
```

```css
.my-enter,
.my-leave-to{
            opacity: 0;
            transform: translateY(150px);
        }
```

可以结合第三方的动画库一起使用：

   其中相应的类名由动画库提供

```html
<transition name="ani"  enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" :duration="{enter:200,leave:400}">
            <!-- 使用第三方库animate.css渲染动画 -->
     <h4 v-if="flag3">这是一个h4</h3>
</transition>
```

绑定`duration`属性可以分别设置动画的进入时间和离开时间（毫秒）

#### 2、使用`<transition-group>`标签过渡列表

示例：

```html
<transition-group appear tag="ul">
    	 <li v-for="(item,i) in list" :key ="item.id" @click="del(i)">
								{{item.id}}------{{item.name}}
				</li>
</transition-group>
```

tips: 

1、使用v-for循环创建的元素设置动画，必须为每个元素设置:key属性

2、在`transition-group`中添加appear可以实现页面刚展示出来的入场效果

3、`transition-group`会被默认渲染成`<span>`标签，添加`tag`属性可以将`transition-group`渲染成指定的标签元素。这样可以避免一下不规范的标签嵌套，例如`<ul>`标签内嵌套`<span>`就不符合W3C标准。

## 三、动画钩子函数

钩子函数可以提供单独的动画时机（例如小球只抛出，不回来的动画）。

示例：

```html
       <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
         <div class="ball" v-show="flag"></div>
       </transition>
```

```javascript
  // 动画钩子函数的第一个参数el，表示要执行动画的那个DOM元素，是个原生的JS DOM对象
                // 大家可以认为，el是通过document.getElementById('')获取的js DOM对象
                beforeEnter(el){
                    // 动画入场之前，此时动画尚未开始，在beforeEnter中设置元素开始动画之前的起始样式
                    // 设置小球开始动画之前的起始位置
                    el.style.transform = "translate(0, 0)"
                },

                enter(el,done){
                    // 表示动画开始之后的样式，这里，可以设置小球完成动画之后的结束状态
                    // 这句话无实际作用，但是不写不能出过度动画，可以认为offsetWidth会强制动画刷新
                    el.offsetWidth
                    el.style.transform = "translate(150px, 450px)"
                    el.style.transition = 'all 1s ease'
                  // 这里的done，其实就是afterEnter这个函数，也就是说：done是afterEnter函数的引用
                  // 这个回调函数done()是必须的
                    done();
                },

                afterEnter(el){
                  //动画完成之后会调用afterEnter
                    this.flag = !this.flag;
                    console.log("ok")
                }
```



## 四、常用过渡动画

可以实现淡出淡入的效果，`translateX`和`translateY`分别表示沿x轴和y轴方向的动画。

`transition`可设置动画时长。

```css
 .v-enter,
 .v-leave-to{
            opacity: 0;
            transform:translateY(150px);
        }

  .v-enter-active,
  .v-leave-active{
            transition: all 0.6s ease;
        }
```

`.v-move`和`.v-leave-active`配合使用可以实现列表后面渐渐离开 (例如删除一行列表，下一行列表向上移动的过渡动画。)

```css

        .v-move
        {
            transition: all 0.6s ease;
        }

        .v-leave-active{
            position: absolute;
        }
```

