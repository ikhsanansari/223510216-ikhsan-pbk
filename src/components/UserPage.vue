<template>
  <div class="column">
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
</template>

<script>
export default {
  data() {
    return {
      users: [],
      userName: '',
      selectedUserId: null,
      selectedUserName: '',
      userPosts: []
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
        this.userName = '';
        this.getUserPosts();
      } else {
        this.selectedUserId = null;
        this.selectedUserName = '';
        this.userPosts = [];
      }
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style scoped>
.column {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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

.card {
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
}
</style>
