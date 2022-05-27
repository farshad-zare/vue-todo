import { createStore } from "vuex";
import supabase from "./utils/client";

export default createStore({
  state() {
    return {
      todos: [],
      notif: {},
    };
  },

  mutations: {
    addNotif(state, payload) {
      state.notif = payload;
    },

    addTask(state, payload) {
      state.todos.unshift(payload);
    },

    removeTask(state, payload) {
      const tasks = state.todos.filter((todo) => {
        if (payload.id) {
          return todo.id !== payload.id;
        } else {
          return todo.title !== payload.title;
        }
      });
      state.todos = tasks;
    },

    toggleTaskStatus(state, taskIndex) {
      state.todos[taskIndex].completed = !state.todos[taskIndex].completed;
    },
  },

  actions: {
    async getAllTodos({ commit }) {
      const { data: todos } = await supabase
        .from("todo")
        .select("*")
        .order("id");

      todos.forEach((todo) => {
        commit("addTask", todo);
      });
    },

    async addTodo({ commit }, todo) {
      const newTodo = { title: todo, completed: false };
      commit("addTask", newTodo);
      try {
        const { error } = await supabase.from("todo").insert(newTodo).single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        console.log(error);
        commit("removeTask", todo.title);
      }
    },

    async deleteTodo({ commit }, payload) {
      commit("removeTask", payload);

      const removeBy = payload.id ? "id" : "title";

      try {
        const { error } = await supabase
          .from("todo")
          .delete()
          .eq(removeBy, payload[removeBy]);
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("addTask", payload);
        console.log(error);
      }
    },

    async toggleTodoStatus({ state, commit }, payload) {
      const toggleBy = payload.id ? "id" : "title";
      const taskIndex = state.todos.findIndex(
        (todo) => todo[toggleBy] === payload[toggleBy]
      );

      const newVal = !state.todos[taskIndex].completed;

      commit("toggleTaskStatus", taskIndex);

      try {
        const { error } = await supabase
          .from("todo")
          .update({ completed: newVal })
          .eq(toggleBy, payload[toggleBy])
          .single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("toggleTaskStatus", taskIndex);
        console.log(error);
      }
    },
  },
});
