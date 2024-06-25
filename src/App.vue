<template>
  <div class="container">
    <div class="menu">
      <router-link to="/user"><button>User</button></router-link>
      <router-link to="/todo"><button>Todo List</button></router-link>
      <router-link to="/album"><button>Album</button></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
