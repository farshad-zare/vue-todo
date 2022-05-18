import { createStore } from "vuex";
import supabase from "./utils/client";

export default createStore({
  state() {
    return {
      todos: [],
    };
  },

  mutations: {
    addTask(state, payload) {
      state.todos.push(payload);
    },

    removeTask(state, id) {
      const tasks = state.todos.filter((todo) => todo.id !== id);
      state.todos = tasks;
    },

    toggleTaskStatus(state, payload) {
      state.todos[payload.id].completed = payload.value;
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
      commit("addTask", todo);

      try {
        const { error } = await supabase.from("todo").insert(todo).single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        console.log(error);
        commit("removeTask", todo.id);
      }
    },

    async deleteTodo({ commit }, payload) {
      commit("removeTask", payload.id);

      try {
        const { error } = await supabase
          .from("todo")
          .delete()
          .eq("id", payload.id);
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("addTask", payload);
        console.log(error);
      }
    },

    async toggleTodoStatus({ state, commit }, payload) {
      const taskID = state.todos.findIndex((todo) => todo.id === payload.id);
      const newVal = !state.todos[taskID].completed;

      commit("toggleTaskStatus", { id: taskID, value: newVal });

      try {
        const { error } = await supabase
          .from("todo")
          .update({ completed: newVal })
          .eq("id", payload.id)
          .single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("toggleTaskStatus", payload.id);
        console.log(error);
      }
    },
  },
});
