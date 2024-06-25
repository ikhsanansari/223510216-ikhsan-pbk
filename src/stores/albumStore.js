import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('album', {
  state: () => ({
    users: [],
    albums: [],
    userName: '',
    albumId: null,
    selectedUserName: '',
    userAlbums: []
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
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    async fetchUserAlbums() {
      try {
        let selectedUser = null;
        if (this.userName) {
          selectedUser = this.users.find(user => user.name.toLowerCase() === this.userName.toLowerCase());
        }
        if (selectedUser) {
          this.selectedUserName = selectedUser.name;
          const userAlbums = this.albums.filter(album => album.userId === selectedUser.id);
          this.userAlbums = this.albumId
            ? userAlbums.filter(album => album.id === parseInt(this.albumId))
            : userAlbums;

          for (let album of this.userAlbums) {
            const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`);
            const photos = await photosResponse.json();
            album.photos = photos;
          }
        } else if (this.albumId) {
          this.userAlbums = this.albums.filter(album => album.id === parseInt(this.albumId));
          for (let album of this.userAlbums) {
            const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`);
            const photos = await photosResponse.json();
            album.photos = photos;
          }
          this.selectedUserName = `ID Album: ${this.albumId}`;
        } else {
          this.userAlbums = [];
        }
      } catch (error) {
        console.error('Error fetching user albums and photos:', error);
      }
    }
  }
});
