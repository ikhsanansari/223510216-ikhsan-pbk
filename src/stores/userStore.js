import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    selectedUserId: null,
    selectedUserName: '',
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    selectUser(userName) {
      const selectedUser = this.users.find(user => user.name.toLowerCase() === userName.toLowerCase());
      if (selectedUser) {
        this.selectedUserId = selectedUser.id;
        this.selectedUserName = selectedUser.name;
      } else {
        this.selectedUserId = null;
        this.selectedUserName = '';
      }
    }
  }
});
