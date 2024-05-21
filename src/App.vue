<template>
  <div class="container">
    <div class="menu">
      <button @click="currentPage = 'user'">User</button>
      <button @click="currentPage = 'todo'">Todo List</button>
    </div>

    <UserPage v-if="currentPage === 'user'" />
    <TodoPage v-if="currentPage === 'todo'" />
  </div>
</template>

<script>
import UserPage from './components/UserPage.vue';
import TodoPage from './components/TodoPage.vue';

export default {
  components: {
    UserPage,
    TodoPage
  },
  data() {
    return {
      currentPage: 'user'
    };
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
</style>
