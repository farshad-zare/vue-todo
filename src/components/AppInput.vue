<template>
  <input v-model="newTodo" type="text" />
  <button @click="handleClick">add new task</button>
</template>

<script setup>
  import { ref } from "vue";

  const emit = defineEmits(["newtodo"]);
  const newTodo = ref(null);

  function handleClick() {
    emit("newtodo", newTodo.value);
  }
</script>
