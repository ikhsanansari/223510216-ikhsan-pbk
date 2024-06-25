<template>
  <div class="column">
    <form @submit.prevent="getUserAlbums" class="form">
      <label for="userName">Nama User:</label>
      <input type="text" v-model="userName" list="userNames" id="userName" autocomplete="off" class="input">
      <datalist id="userNames">
        <option v-for="user in filteredUsers" :key="user.id">{{ user.name }}</option>
      </datalist>
      <label for="albumId">ID Album (opsional):</label>
      <input type="number" v-model="albumId" id="albumId" min="1" class="input">
      <button type="submit" class="button">Tampilkan Album</button>
    </form>
    <div v-if="userAlbums.length > 0">
      <h2>Album oleh {{ selectedUserName }}</h2>
      <div v-for="album in userAlbums" :key="album.id" class="card">
        <h3>{{ album.title }}</h3>
        <div v-for="photo in album.photos" :key="photo.id" class="photo">
          <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showFullSizePhoto(photo.url)" />
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>
    <div v-if="fullSizePhoto" class="full-size-photo-overlay" @click="closeFullSizePhoto">
      <img :src="fullSizePhoto" alt="Full Size Photo" class="full-size-photo" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      albums: [],
      userName: '',
      albumId: null,
      selectedUserName: '',
      userAlbums: [],
      fullSizePhoto: null
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
    async getAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    async getUserAlbums() {
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
    },
    showFullSizePhoto(photoUrl) {
      this.fullSizePhoto = photoUrl;
    },
    closeFullSizePhoto() {
      this.fullSizePhoto = null;
    }
  },
  created() {
    this.getUsers();
    this.getAlbums();
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

.photo {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.photo img {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
}


.full-size-photo-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Mengatur z-index agar overlay muncul di atas elemen lain */
}

.full-size-photo {
  max-width: 90%;
  max-height: 90%;
  border-radius: 5px;
}
</style>
