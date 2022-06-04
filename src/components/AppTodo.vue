<template>
  <div class="todo-item">
    <h2>{{ todo.title }}</h2>
    <ElButton
      type="danger"
      circle
      :icon="Delete"
      @click="emits('removetodo', todo)"
    />
    <ElButton
      circle
      @click="emits('toggletodo', todo)"
      :icon="todo.completed ? CloseBold : Check"
      :type="todo.completed ? 'warning' : 'success'"
    />
  </div>
</template>

<script setup>
  import { ElButton } from "element-plus";
  import { Delete, Check, CloseBold } from "@element-plus/icons-vue";

  const props = defineProps({
    todo: Object,
  });
  const emits = defineEmits(["removetodo", "toggletodo"]);
</script>

<style scoped>
  .todo-item {
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;

    border: 1px solid white;
  }

  h2 {
    max-width: 80%;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-width: 5px;
  }

  button {
    margin-left: 5px;
  }

  button:hover {
    cursor: pointer;
  }

  button:first-of-type {
    margin-left: auto;
  }
</style>
