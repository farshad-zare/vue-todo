import { createStore } from "vuex";
import I18n from "@/I18n.js";
import { ElNotification } from "element-plus";
import supabase from "./utils/client";

export default createStore({
  state() {
    return {
      todos: [],
    };
  },

  mutations: {
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
        ElNotification({
          type: "error",
          title: I18n.global.t("notifs.getAllTasksErr.title"),
          message: error,
          duration: 3000,
        });
      }
    },

    async addTodo({ commit }, todo) {
      const newTodo = { title: todo, completed: false };

      ElNotification({
        type: "success",
        title: I18n.global.t("notifs.add.title"),
        message: I18n.global.t("notifs.add.message"),
        duration: 3000,
      });

      commit("addTask", newTodo);

      try {
        const { error } = await supabase.from("todo").insert(newTodo).single();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        ElNotification({
          type: "error",
          title: I18n.global.t("notifs.addErr.title"),
          message: error,
          duration: 3000,
        });

        commit("removeTask", newTodo);
      }
    },

    async deleteTodo({ commit }, payload) {
      commit("removeTask", payload);

      const removeBy = payload.id ? "id" : "title";
      ElNotification({
        type: "success",
        title: I18n.global.t("notifs.remove.title"),
        message: I18n.global.t("notifs.remove.message"),
        duration: 3000,
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
        ElNotification({
          type: "error",
          title: I18n.global.t("notifs.removeErr.title"),
          message: error,
          duration: 3000,
        });
        commit("addTask", payload);
      }
    },

    async toggleTodoStatus({ state, commit }, payload) {
      const toggleBy = payload.id ? "id" : "title";

      ElNotification({
        type: "success",
        title: I18n.global.t("notifs.toggle.title"),
        message: I18n.global.t("notifs.toggle.message"),
        duration: 3000,
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
        ElNotification({
          type: "error",
          title: I18n.global.t("notifs.toggleErr.title"),
          message: error,
          duration: 3000,
        });
        commit("toggleTaskStatus", taskIndex);
      }
    },
  },
});
