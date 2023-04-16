<template>
  <q-layout view="hHh lpR fFf" style="background-color: #eff4fb">
    <q-header class="bg-white text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-accent text-bold">
          <q-img src="~assets/img/ceciac-logo.png" spinner-color="primary" style="width: 10%; height: auto" />
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
          <small class="text-secondary">@alexander</small>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const searchTerm = ref('')
</script>
