import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      todos: [
        {
          id: 1927,
          user_id: 3870,
          title: "Umbra conscendo videlicet cognomen sit.",
          due_on: "2022-05-28T00:00:00.000+05:30",
          status: "completed",
        },
      ],
    };
  },
  mutations: {
    addTask(state, payload) {
      state.todos.push(payload);
    },
  },
  actions: {
    async addTodo(context, todo) {
      const data = JSON.stringify(todo);
      console.log(data);
      const url = "https://gorest.co.in/public/v2/users/100/todos";
      try {
        const rawResponse = await fetch(url, {
          method: "POST",
          headers: {
            authorization:
              "Bearer d699237ed3e9ce06e30353c96b6496d14f65cce7d86624aafae79f070fddbe06",
          },
          body: data,
        });
        const content = await rawResponse.json();
        context.commit("addTask", todo);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
