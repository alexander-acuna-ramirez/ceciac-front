<script setup lang="ts">
import { defineEmits } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(['menu-open']);

function logout() {
  authStore.logout();
  router.push('/home');
}

function openMenu() {
  emit('menu-open');
}
</script>

<template>
  <q-header>
    <q-toolbar class="text-white bg-white">
      <router-link to="/home">
        <img
          src="~assets/img/ceciac-logo.png"
          style="height: 80px; width: auto"
        />
      </router-link>

      <q-space />

      <div
        v-if="$q.screen.gt.sm"
        class="q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
      >
        <router-link
          to="/portfolio"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Portafolio</router-link
        >
        <router-link
          to="/our-members"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Nosotros</router-link
        >
        <router-link
          to="/explore/projects"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Proyectos</router-link
        >
        <router-link
          to="/explore/events"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Eventos</router-link
        >
        <router-link
          to="/explore/blog"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Blog</router-link
        >
        <router-link
          to="/login"
          class="text-primary text-bold"
          style="text-decoration: none"
          >Registro</router-link
        >
      </div>

      <q-space />

      <div
        class="q-pl-sm q-gutter-sm row items-center no-wrap"
        v-if="$q.screen.gt.sm"
      >
        <q-btn
          unelevated
          class="no-shadow"
          color="primary"
          rounded
          no-caps
          to="/login"
          v-if="!authStore.isAuthenticated"
        >
          <small><strong>Iniciar Sesión</strong></small>
        </q-btn>

        <div class="flex userloged" v-else>
          <q-avatar
            rounded
            size="50px"
            v-if="
              authStore.getUser.logo !== '' && authStore.getUser.logo != null
            "
          >
            <img :src="authStore.getUser.logo" alt="USER LOGO" />
            <img
              src="~assets/img/app/user/user-profile-default.jpg"
              alt="USER LOGO"
            />
          </q-avatar>

          <q-avatar rounded size="50px" v-else>
            <img
              src="~assets/img/app/user/user-profile-default.jpg"
              alt="USER LOGO"
            />
          </q-avatar>

          <div class="q-ml-md">
            <div class="text-primary text-subtitle2 text-bold">
              {{ authStore.getUser.name + ' ' + authStore.getUser.lastname }}
            </div>
            <div class="text-accent text-caption">
              {{ authStore.getUser.email }}
            </div>
          </div>

          <q-menu>
            <q-list style="min-width: 100px" class="text-secondary">
              <q-item
                clickable
                v-close-popup
                :to="'/profile/' + authStore.getUser.id"
              >
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Perfil</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                to="/network-management"
                v-if="authStore.getUser.network"
              >
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-section>Gestionar Red</q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                to="/portfolio-create"
                v-if="authStore.getUser.network"
              >
                <q-item-section avatar>
                  <q-icon name="groups" />
                </q-item-section>
                <q-item-section>Publicaciones CECIAC</q-item-section>
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
        </div>
      </div>

      <q-btn
        unelevated
        v-else
        dense
        flat
        round
        icon="menu"
        color="primary"
        @click="openMenu"
      />
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.userLoged:hover {
  background-color: rgb(246, 247, 248);
}
</style>
