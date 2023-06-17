<script setup lang="ts">
import { defineEmits } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['menu-open'])

function logout() {
  authStore.logout();
  router.push('/home');
}

function openMenu() {
  emit('menu-open')
}
</script>

<template>
  <q-header>
    <q-toolbar class="text-white bg-white">

      <router-link to="/home">
        <img src="~assets/img/ceciac-logo.png" style="height: 80px; width: auto;">
      </router-link>


      <q-space />

      <div v-if="$q.screen.gt.sm" class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
        <router-link to="/under-construction" class="text-primary text-bold"
          style="text-decoration: none;">Portafolio</router-link>
        <router-link to="/our-members" class="text-primary text-bold"
          style="text-decoration: none;">Nosotros</router-link>
        <router-link to="/explore/projects" class="text-primary text-bold"
          style="text-decoration: none;">Proyectos</router-link>
        <router-link to="/explore/events" class="text-primary text-bold"
          style="text-decoration: none;">Eventos</router-link>
        <router-link to="/explore/blog" class="text-primary text-bold" style="text-decoration: none;">Blog</router-link>
        <router-link to="/login" class="text-primary text-bold" style="text-decoration: none;">Registro</router-link>
      </div>

      <q-space />


      <div class="q-pl-sm q-gutter-sm row items-center no-wrap" v-if="$q.screen.gt.sm">
        <q-btn style="box-shadow: none;" color="primary" rounded no-caps to="/login" v-if="!authStore.isAuthenticated">
          <small><strong>Iniciar Sesión</strong></small>
        </q-btn>

        <q-btn v-else style="box-shadow: none;" rounded color="primary" :label="'Bienvenido(a) ' + authStore.getUser.name"
          no-caps>
          <q-menu fit>
            <q-list style="min-width: 100px" class="text-accent">
              <q-item clickable v-close-popup :to="'/profile/' + authStore.getUser.id">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Perfil</q-item-section>
              </q-item>
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
              <q-item clickable v-close-popup @click="logout()">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <q-btn v-else dense flat round icon="menu" color="primary" @click="openMenu" />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
