<script setup lang="ts">
import { ref } from 'vue';
const searchTerm = ref("");
</script>

<template>
  <q-header class="text-white bg-white q-px-xl" style="height: 80px;" height-hint="61.59">
    <q-toolbar class="q-py-sm q-px-md" style="height: 100%;">


      <div style="height: 100%;">
        <img src="~assets/img/ceciac-logo.png" style="height: 99%; width: auto;">
      </div>

      <q-space />

      <div v-if="$q.screen.gt.sm" class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
        <router-link to="/feed" class="text-primary text-bold" style="text-decoration: none;">PORTAFOLIO</router-link>
        <router-link to="/feed" class="text-primary text-bold" style="text-decoration: none;">NOSOTROS</router-link>
        <router-link to="/feed" class="text-primary text-bold" style="text-decoration: none;">PROYECTOS</router-link>
        <router-link to="/feed" class="text-primary text-bold" style="text-decoration: none;">BLOG</router-link>
        <router-link to="/feed" class="text-primary text-bold" style="text-decoration: none;">REGISTRATE</router-link>
      </div>

      <q-space />

      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-btn color="primary" label="Iniciar Sesión" no-caps rounded to="/login" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
