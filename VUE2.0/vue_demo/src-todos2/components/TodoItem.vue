<template>
    <!-- 
      区别：
      onmouseenter,onmouseleave:在元素内，不管是子元素还是本身，都不会触发onmouseleave
      
      onmouseover，onmouseout：只要不是在元素本身（不包含子元素）都不执行，在元素子元素上就会执行 onmouseout
    -->
    <li @mouseenter="handleShow(true)" @mouseleave="handleShow(false)"
    :style="{background:bgColor}">
        <label>
            <input type="checkbox" v-model="todo.complate"/>
            <span>{{todo.title}}</span>
        </label>
        <button class="btn btn-danger" v-show="isShow"  style="display:none" @click="deleteItem">删除</button>
    </li>
</template>

<script>
    import PubSub from 'pubsub-js';
    export default {
      props:{
          index:{
            type:Number
          },
          todo:{
            type:Object
          }
      },
      data(){
        return {
          // 默认背景颜色白色
          bgColor:"white",
          // 按钮默认是否哦不现实
          isShow: false,

        }
      },
      methods:{
        handleShow(isShow){
          console.log(isShow);
          if (isShow) {
            this.bgColor = "#aaa",
            this.isShow = true;
            return;
          }
            this.bgColor = "white",
            this.isShow = false;
        },
        deleteItem () {
          const {todo, index,deleteTodo} = this;
          if (window.confirm(`确认删除 ${todo.title} 吗`)) {
            // deleteTodo(index)
            // 发布消息
            PubSub.publish('deleteTodo', index);
          }

        }
      },
      
    }
</script>

<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>