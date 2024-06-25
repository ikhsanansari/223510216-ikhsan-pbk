<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <div class="q-gutter-md">
          <q-btn flat dense round icon="menu" @click="$q.layout.toggleLeft"/>
          <q-toolbar-title>
            My App
          </q-toolbar-title>
          <q-space/>
          <q-tabs align="right" class="text-white">
            <q-tab route="/user" :to="{ path: '/user' }">User</q-tab>
            <q-tab route="/todo" :to="{ path: '/todo' }">Todo List</q-tab>
            <q-tab route="/album" :to="{ path: '/album' }">Album</q-tab>
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'NavbarLayout'
};
</script>

<style scoped>
</style>
