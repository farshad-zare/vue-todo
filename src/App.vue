<template>
  <Toast position="top-left" />
  <section class="todos">
    <h2>{{ t("app.title") }}</h2>
    <AppInput @newtodo="handleNewTodo" />
    <AppTodo
      @toggletodo="handleToggleTodo"
      @removetodo="handleMoveTodo"
      v-for="todo in todos"
      :key="todo.id ? todo.id : todo.title"
      :todo="todo"
    />
  </section>
</template>

<script setup>
  import { useI18n } from "vue-i18n";
  import { useStore } from "vuex";
  import { onBeforeMount, computed } from "vue";
  import AppInput from "./components/AppInput.vue";
  import AppTodo from "./components/AppTodo.vue";
  import "primevue/resources/themes/mdc-dark-deeppurple/theme.css";
  import Toast from "primevue/toast";

  const { t, locale } = useI18n({ useScope: "global" });
  const store = useStore();
  const todos = computed(() => store.state.todos);

  onBeforeMount(async () => {
    store.dispatch("getAllTodos");
    setTimeout(() => {
      locale.value = "en";
    }, 2000);
  });

  function handleNewTodo(event) {
    store.dispatch("addTodo", event);
  }

  function handleToggleTodo(event) {
    store.dispatch("toggleTodoStatus", event);
  }

  function handleMoveTodo(event) {
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
