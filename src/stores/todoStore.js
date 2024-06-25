import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: []
  }),
  actions: {
    addTodo(newTodo) {
      if (newTodo.trim() !== '') {
        this.todoList.push({ title: newTodo.trim(), completed: false });
      }
    },
    deleteTodo(index) {
      this.todoList.splice(index, 1);
    }
  }
});
