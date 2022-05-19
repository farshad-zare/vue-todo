<template>
  <InputText
    placeholder="New Todo"
    class="custom-input"
    v-model="newTodo"
    type="text"
  />
  <InputText
    placeholder="User Name"
    class="custom-input"
    v-model="newTodo"
    type="text"
  />
  <Button
    label="Submit"
    @click="handleClick"
    class="p-button-outlined p-button-primary"
  />
</template>

<script setup>
  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import { ref } from "vue";

  const emit = defineEmits(["newtodo"]);
  const newTodo = ref(null);

  function handleClick() {
    emit("newtodo", newTodo.value);
  }
</script>

<style>
  .custom-input {
    width: 100%;
    margin-bottom: 10px;
  }
</style>
