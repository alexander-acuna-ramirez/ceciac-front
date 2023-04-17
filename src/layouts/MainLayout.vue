<template>
  <q-layout view="hHh lpR fFf" style="background-color: #eff4fb">
    <q-header class="bg-white text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-accent text-bold">

        </q-toolbar-title>
        <q-space />
        <!--<q-btn flat round color="primary" icon="home" />
        <q-btn flat round color="primary" icon="group" />
        <q-btn flat round color="primary" icon="notifications" />
        <q-btn flat round color="primary" icon="mail" />-->
        <q-input v-model="searchTerm" filled type="text" label="Buscar" dense>
          <template v-slot:append>
            <q-icon name="magnify" />
          </template>
        </q-input>
        <q-separator spaced inset vertical color="primary" />
        <q-avatar rounded>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div>
          <span class="text-bold text-primary q-ml-sm">Alexander</span> <br>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!--<q-footer class="bg-primary text-white q-pa-md">
      <div class="row">
        <div class="col">
          <div class="flex items-center">
            <q-img src="~assets/img/ceciac-logo.png" class="col-logo-img" />
            <div class="col-logo-text">
              <div class="text-weight-bold">Mi Empresa</div>
              <div>¡Tu tienda en línea favorita!</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="text-weight-bold">Important Links</div>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="col">
          <div class="text-weight-bold">Community</div>
          <ul>
            <li><a href="#">Newsfeed</a></li>
            <li><a href="#">Groups</a></li>
            <li><a href="#">Friends</a></li>
            <li><a href="#">Forums</a></li>
          </ul>
        </div>

        <div class="col">
          <div class="text-weight-bold">Community</div>
          <ul>
            <li><a href="#">Newsfeed</a></li>
            <li><a href="#">Groups</a></li>
            <li><a href="#">Friends</a></li>
            <li><a href="#">Forums</a></li>
          </ul>
        </div>
      </div>
    </q-footer>-->
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const searchTerm = ref('')
</script>
<style scoped lang="scss">
/* Estilos personalizados para la columna del logo */
.col-logo {
  display: flex;
  align-items: center;
}

.col-logo-img {
  max-width: 50px;
  margin-right: 10px;
}

.col-logo-text {
  font-size: 14px;
}

a {
  color: white;
  text-decoration: none;
}

li {
  list-style: none;
}
</style>
