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

    toggleTaskStatus(state, id) {
      const taskID = state.todos.findIndex((todo) => todo.id === id);
      state.todos[taskID].completed = !state.todos[taskID].completed;
    },
  },

  actions: {
    async getAllTodos(context) {
      let { data: todos, error } = await supabase
        .from("todo")
        .select("*")
        .order("id");
      todos.forEach((todo) => {
        context.commit("addTask", todo);
      });
    },

    async addTodo(context, todo) {
      const { data, error } = await supabase.from("todo").insert(todo).single();
      context.commit("addTask", data);
      if (error) {
        console.log(error);
      }
    },

    async deleteTodo(context, id) {
      try {
        const  data  = await supabase.from("todo").delete().eq("id", id);
        console.log(data);
        context.commit("removeTask", id);
      } catch (error) {
        console.error("error", error);
      }
    },

    async toggleTodoStatus({ state, commit }, id) {
      const taskID = state.todos.findIndex((todo) => todo.id === id);
      console.log(id);
      console.log(state.todos[taskID]);
      const newVal = !state.todos[taskID].completed;

      const { error } = await supabase
        .from("todo")
        .update({ completed: newVal })
        .eq("id", id)
        .single();
      commit("toggleTaskStatus", id);
      if (error) {
        alert(error.message);
        console.error("There was an error updating", error);
        return;
      }
    },
  },
});
