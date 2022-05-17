<template>
  <section class="todos">
    <h2>Tasks</h2>
    <AppInput @newtodo="handleNewTodo" />
    <AppTodo
      @toggletodo="handleToggleTodo"
      @removetodo="handreMoveTodo"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    />
  </section>
</template>

<script setup>
  import { useStore } from "vuex";
  import { onBeforeMount, computed } from "vue";
  import AppInput from "./components/AppInput.vue";
  import AppTodo from "./components/AppTodo.vue";

  onBeforeMount(async () => {
    store.dispatch("getAllTodos");
  });

  const store = useStore();
  const todos = computed(() => store.state.todos);

  function handleNewTodo(event) {
    console.log(event);
  }

  function handleToggleTodo(event) {
    console.log(event);
  }

  function handreMoveTodo(event) {
    console.log(event);
  }
</script>
