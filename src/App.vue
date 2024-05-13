<template>
  <div class="container">
    <div class="menu">
      <button @click="showUserPage">User</button>
      <button @click="showTodoPage">Todo List</button>
    </div>

    <div v-if="currentPage === 'user'" class="column">
      <form @submit.prevent="getUserPosts" class="form">
        <label for="userName">Nama User:</label>
        <input type="text" v-model="userName" list="userNames" id="userName" autocomplete="off" required @input="selectUser" class="input">
        <datalist id="userNames">
          <option v-for="user in filteredUsers" :key="user.id">{{ user.name }}</option>
        </datalist>
        <button type="submit" class="button">Tampilkan Postingan</button>
      </form>
      <div v-if="selectedUserId && userPosts.length > 0">
        <h2>Postingan oleh {{ selectedUserName }}</h2>
        <div v-for="post in userPosts" :key="post.id" class="card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>

    <div v-if="currentPage === 'todo'" class="column">
      <h2 class="todo-title">Todo List</h2>
      <input type="text" v-model="newTodo" placeholder="Tambahkan List Baru" class="input">
      <button @click="addTodo" class="button">Tambah</button>

      <!-- Tampilkan daftar todo -->
      <div v-for="(todo, index) in todoList" :key="index" class="todo-item">
        <input type="checkbox" v-model="todo.completed" class="checkbox">
        <span :class="{ 'completed': todo.completed }" class="todo-text">{{ todo.title }}</span>
        <button @click="confirmDelete(index)" class="delete-button">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      userName: '',
      selectedUserId: null,
      selectedUserName: '',
      userPosts: [],
      currentPage: 'user', // Atur halaman awal sebagai user
      newTodo: '',
      todoList: []
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.userName.toLowerCase()));
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async getUserPosts() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`);
        this.userPosts = await response.json();
        this.selectedUserName = this.users.find(user => user.id === parseInt(this.selectedUserId)).name;
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    },
    selectUser() {
      const selectedUser = this.users.find(user => user.name.toLowerCase() === this.userName.toLowerCase());
      if (selectedUser) {
        this.selectedUserId = selectedUser.id;
        this.selectedUserName = selectedUser.name;
        this.userName = ''; // Clear the input field after selecting a user
        this.getUserPosts();
      } else {
        this.selectedUserId = null;
        this.selectedUserName = '';
        this.userPosts = [];
      }
    },
    showUserPage() {
      this.currentPage = 'user';
    },
    showTodoPage() {
      this.currentPage = 'todo';
    },
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todoList.push({ title: this.newTodo.trim(), completed: false });
        this.newTodo = ''; // Kosongkan input setelah ditambahkan
      }
    },
    confirmDelete(index) {
      // Tampilkan pesan konfirmasi saat ingin menghapus
      if (confirm("Apakah Anda yakin ingin menghapus list ini?")) {
        this.deleteTodo(index);
      }
    },
    deleteTodo(index) {
      this.todoList.splice(index, 1);
      // Tampilkan pesan alert setelah berhasil menghapus
      alert("Selamat! Anda telah berhasil menghapus list.");
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.menu button {
  margin-right: 10px;
}

.column {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.label {
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button {
  background-color: #d4af37; /* Warna kuning */
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #daa520; /* Warna kuning yang sedikit lebih gelap */
}

.card {
  border: 1px solid #a9a9a9; /* Warna abu-abu */
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5; /* Warna abu-abu yang lebih terang */
}

.todo-title {
  margin-bottom: 10px;
  color: #a52a2a; /* Warna coklat */
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
  background-color: #8b0000; /* Warna merah coklat */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #b22222; /* Warna merah coklat yang lebih gelap ghhhg */
}
</style>
