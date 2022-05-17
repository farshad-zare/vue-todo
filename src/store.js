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
  },
});
