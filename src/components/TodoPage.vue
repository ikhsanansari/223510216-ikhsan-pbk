<template>
    <div class="column">
      <h2 class="todo-title">Todo List</h2>
      <input type="text" v-model="newTodo" placeholder="Tambahkan List Baru" class="input">
      <button @click="addTodo" class="button">Tambah</button>
  
      <div v-for="(todo, index) in todoList" :key="index" class="todo-item">
        <input type="checkbox" v-model="todo.completed" class="checkbox">
        <span :class="{ 'completed': todo.completed }" class="todo-text">{{ todo.title }}</span>
        <button @click="confirmDelete(index)" class="delete-button">Hapus</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodo: '',
        todoList: []
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() !== '') {
          this.todoList.push({ title: this.newTodo.trim(), completed: false });
          this.newTodo = '';
        }
      },
      confirmDelete(index) {
        if (confirm("Apakah Anda yakin ingin menghapus list ini?")) {
          this.deleteTodo(index);
        }
      },
      deleteTodo(index) {
        this.todoList.splice(index, 1);
        alert("Selamat! Anda telah berhasil menghapus list.");
      }
    }
  };
  </script>
  
  <style scoped>
  .column {
    width: 100%;
  }
  
  .todo-title {
    margin-bottom: 10px;
    color: #a52a2a;
  }
  
  .input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .button {
    background-color: #d4af37;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #daa520;
  }
  
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .checkbox {
    margin-right: 5px;
  }
  
  .todo-text {
    flex-grow: 1;
  }
  
  .delete-button {
    background-color: #8b0000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #b22222;
  }
  </style>
  