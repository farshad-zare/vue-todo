<template>
  <Toast position="top-right" />
  <section class="todos">
    <h2 class="app-title">{{ t("app.title") }}</h2>
    <!-- <AppInput @newtodo="handleNewTodo" /> -->
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
  // import AppInput from "./components/AppInput.vue";
  import AppTodo from "./components/AppTodo.vue";

  const { t, locale } = useI18n({ useScope: "global" });
  const store = useStore();
  const todos = computed(() => store.state.todos);
  // const notif = computed(() => store.state.notif);

  onBeforeMount(async () => {
    store.dispatch("getAllTodos");
    setTimeout(() => {
      locale.value = "en";
    }, 2000);
  });

  // watch(notif, () => {
  //   if (notif.value) {
  //     notify.add(notif.value);
  //   }
  // });

  // function handleNewTodo(event) {
  //   store.dispatch("addTodo", event);
  // }

  // function handleToggleTodo(event) {
  //   store.dispatch("toggleTodoStatus", event);
  // }

  // function handleMoveTodo(event) {
  //   store.dispatch("deleteTodo", event);
  // }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #010e17;
    min-height: 100vh;
    min-width: 100vw;
  }

  .todos {
    max-width: 28rem;
    background-color: #003a47;
    margin: 0 auto;
    margin-top: 2rem;
    padding: 10px;

    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .app-title {
    color: #8bcf75;
    margin: 0 auto;
    display: inline;
  }
</style>
