<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';

const authStore = useAuthStore();

</script>

<template>
  <q-header>
    <q-toolbar class="text-white bg-white">

      <router-link to="/home">
        <img src="~assets/img/ceciac-logo.png" style="height: 80px; width: auto;">
      </router-link>


      <q-space />

      <div v-if="$q.screen.gt.sm" class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
        <router-link to="#" class="text-primary text-bold" style="text-decoration: none;">PORTAFOLIO</router-link>
        <router-link to="#" class="text-primary text-bold" style="text-decoration: none;">NOSOTROS</router-link>
        <router-link to="/explore/projects" class="text-primary text-bold"
          style="text-decoration: none;">PROYECTOS</router-link>
        <router-link to="#" class="text-primary text-bold" style="text-decoration: none;">BLOG</router-link>
        <router-link to="#" class="text-primary text-bold" style="text-decoration: none;">REGISTRATE</router-link>
      </div>

      <q-space />

      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-btn color="primary" outline rounded label="Iniciar Sesión" no-caps to="/login"
          v-if="!authStore.isAuthenticated" />

        <q-btn v-else color="primary" :label="'Bienvenido(a) ' + authStore.getUser.name" no-caps outline rounded>
          <q-menu fit>
            <q-list style="min-width: 100px" class="text-secondary">
              <q-item clickable v-close-popup to="/network-managment" v-if="authStore.getUser.network">
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-section>Gestionar Red</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>Configuraciones</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="authStore.logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
