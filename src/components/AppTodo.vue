<template>
  <div>
    <h2>{{ todo.title }}</h2>
    <button @click="emits('removetodo', todo.id)">Remove</button>
    <button @click="emits('toggletodo', todo.id)">Toggle</button>
    <br />
  </div>
</template>

<script setup>
  const props = defineProps({
    todo: Object,
  });
  const emits = defineEmits(["removetodo", "toggletodo"]);
</script>

<style scoped>
  div {
    border: 1px solid red;
    margin: 5px;
  }
</style>
