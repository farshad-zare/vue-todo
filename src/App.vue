<template>
  <section class="todos">
    <h2>ToDo</h2>
    <label>
      <input v-model="newTodo" />
      <button @click="clickHandler">add new</button>
    </label>
    <h2 v-for="todo in todos" :key="todo.id">{{ todo.title }}</h2>
  </section>
</template>

<script setup>
  import { useStore } from "vuex";
  import { onBeforeMount, computed, ref } from "vue";
  const newTodo = ref(null);
  onBeforeMount(async () => {});

  const store = useStore();
  const todos = computed(() => store.state.todos);

  function clickHandler() {
    store.dispatch("addTodo", {
      id: 1858,
      user_id: 3701,
      user: "fddd gg",
      title: "Thesaurus sonitus ut itaque necessitatibus.",
      due_on: "2022-05-18T00:00:00.000+05:30",
      status: "completed",
    });
  }
</script>
