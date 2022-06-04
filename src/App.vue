<template>
  <section class="todos">
    <h2 class="app-title">{{ t("app.title") }}</h2>
    <el-button plain> Error </el-button>
    <AppInput @newtodo="handleNewTodo" />
    <div class="not-done-todos">
      <AppTodo
        @toggletodo="handleToggleTodo"
        @removetodo="handleMoveTodo"
        v-for="todo in notDonTodos"
        :key="todo.id ? todo.id : todo.title"
        :todo="todo"
      />
    </div>
    <div class="done-todos">
      <AppTodo
        @toggletodo="handleToggleTodo"
        @removetodo="handleMoveTodo"
        v-for="todo in donTodos"
        :key="todo.id ? todo.id : todo.title"
        :todo="todo"
      />
    </div>
  </section>
</template>

<script setup>
  import { computed, onBeforeMount } from "vue";
  import { useStore } from "vuex";
  import { useI18n } from "vue-i18n";
  import { ElButton } from "element-plus";

  import AppInput from "./components/AppInput.vue";
  import AppTodo from "./components/AppTodo.vue";

  const { t, locale } = useI18n({ useScope: "global" });

  const store = useStore();
  const donTodos = computed(() => store.getters.doneTodos);
  const notDonTodos = computed(() => store.getters.notDoneTodos);

  onBeforeMount(store.dispatch("getAllTodos"));

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

  .not-done-todos {
    background-color: crimson;
    width: 100%;
    margin-top: 5px;
  }

  .done-todos {
    background-color: #8bcf75;
    width: 100%;
    margin-top: 5px;
  }

  .app-title {
    color: #8bcf75;
    margin: 0 auto;
    display: inline;
  }
</style>
