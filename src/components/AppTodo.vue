<template>
  <div :class="{ completed: todo.completed }">
    <h2>{{ todo.title }}</h2>
    <Button
      class="p-button-danger p-button-rounded"
      icon="pi pi-trash"
      @click="emits('removetodo', todo)"
    />
    <Button
      @click="emits('toggletodo', todo)"
      class="p-button-rounded p-button-success"
      :icon="todo.completed ? `pi pi-times` : `pi pi-check`"
    />
  </div>
</template>

<script setup>
  import Button from "primevue/button";

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

  .p-button-danger {
    margin-left: auto;
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
</style>
