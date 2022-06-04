<template>
  <div :class="{ completed: todo.completed }">
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
  div {
    margin: 5px;
    background-color: var(--red-400);
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  .completed {
    background-color: var(--bluegray-900);
    opacity: 0.5;
    color: var(--text-color);
  }

  h2 {
    max-width: 80%;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-width: 5px;
  }

  button {
    margin-left: 5px;
    opacity: 1;
  }

  button:hover {
    cursor: pointer;
  }

  button:first-of-type {
    margin-left: auto;
  }
</style>
