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
  import "primevue/resources/themes/mdc-dark-deeppurple/theme.css";
  onBeforeMount(async () => {
    store.dispatch("getAllTodos");
  });

  const store = useStore();
  const todos = computed(() => store.state.todos);

  function handleNewTodo(event) {
    console.log(event);
  }

  function handleToggleTodo(event) {
    store.dispatch("toggleTodoStatus", event);
  }

  function handreMoveTodo(event) {
    store.dispatch("deleteTodo", event);
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--gray-900);
    min-height: 100vh;
    min-width: 100vw;
  }

  .todos {
    max-width: 28rem;
    background-color: var(--gray-800);
    margin: 0 auto;
    margin-top: 2rem;
    padding: 10px;
  }
</style>
