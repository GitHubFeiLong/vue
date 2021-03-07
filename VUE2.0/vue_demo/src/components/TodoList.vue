<template>
     <ul class="todo-main">
        <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index" />
    </ul>
</template>

<script>
    import {mapState} from 'vuex';
    import TodoItem from './TodoItem.vue';
    import storageUtil from '../util/StorageUtil'
    export default {
      computed:{
        ...mapState(['todos'])
      },
      components:{
        TodoItem,
      },
      watch:{
        todos:{
          deep:true,
          handler:storageUtil.saveTodos
        }
      }
    }
</script>

<style>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>