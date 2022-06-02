import { createStore } from "vuex";
import supabase from "./utils/client";
import I18n from "@/I18n.js";
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
      try {
        const { data: todos, error } = await supabase
          .from("todo")
          .select("*")
          .order("id");

        if (error) throw error.message;

        todos.forEach((todo) => {
          commit("addTask", todo);
        });
      } catch (error) {
        commit("addNotif", {
          severity: "error",
          summary: I18n.global.t("notifs.getAllTasksErr.summary"),
          detail: error,
          life: 3000,
        });
      }
    },

    async addTodo({ commit }, todo) {
      const newTodo = { title: todo, completed: false };

      commit("addNotif", {
        severity: "success",
        summary: I18n.global.t("notifs.add.summary"),
        detail: I18n.global.t("notifs.add.detail"),
        life: 3000,
      });

      commit("addTask", newTodo);

      try {
        const { error } = await supabase.from("todo").insert(newTodo).single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("addNotif", {
          severity: "error",
          summary: I18n.global.t("notifs.addErr.summary"),
          detail: error,
          life: 3000,
        });

        commit("removeTask", newTodo);
      }
    },

    async deleteTodo({ commit }, payload) {
      commit("removeTask", payload);

      const removeBy = payload.id ? "id" : "title";
      commit("addNotif", {
        severity: "success",
        summary: I18n.global.t("notifs.remove.summary"),
        detail: I18n.global.t("notifs.remove.detail"),
        life: 3000,
      });

      try {
        const { error } = await supabase
          .from("todo")
          .delete()
          .eq(removeBy, payload[removeBy]);
        if (error) {
          throw error.message;
        }
      } catch (error) {
        commit("addNotif", {
          severity: "error",
          summary: I18n.global.t("notifs.removeErr.summary"),
          detail: error,
          life: 3000,
        });
        commit("addTask", payload);
      }
    },

    async toggleTodoStatus({ state, commit }, payload) {
      const toggleBy = payload.id ? "id" : "title";

      commit("addNotif", {
        severity: "success",
        summary: I18n.global.t("notifs.toggle.summary"),
        detail: I18n.global.t("notifs.toggle.detail"),
        life: 3000,
      });

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
        commit("addNotif", {
          severity: "error",
          summary: I18n.global.t("notifs.toggleErr.summary"),
          detail: error,
          life: 3000,
        });
        commit("toggleTaskStatus", taskIndex);
      }
    },
  },
});
