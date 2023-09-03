<script setup lang="ts">
import NavbarComponent from 'src/components/NavbarComponent.vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();
const leftDrawerOpen = ref(false);
function handleMenu() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  authStore.logout();
  router.push('/home');
}
</script>
<template>
  <q-layout view="lHh lpR fFf" style="background-color: #eeeeeed8">
    <navbar-component @menu-open="handleMenu()"></navbar-component>
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >
      <div class="q-pa-md" style="max-width: 95%; margin: auto">
        <q-list padding class="rounded-borders text-accent">
          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            v-if="authStore.isAuthenticated"
            class="text-subtitle2 text-primary"
          >
            <q-item-section avatar>
              <q-avatar size="50px" rounded>
                <img
                  v-if="authStore.getUser.logo != ''"
                  :src="authStore.getUser.logo"
                  alt="USER LOGO"
                />
                <img
                  v-if="authStore.getUser.logo == ''"
                  src="~assets/img/app/user/user-profile-default.jpg"
                  alt="USER LOGO"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section
              >Bienvenido(a) {{ authStore.user.name }}</q-item-section
            >
          </q-item>
          <q-separator spaced v-if="authStore.isAuthenticated" />
          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/network-management"
            v-if="authStore.getUser.network"
          >
            <q-item-section avatar>
              <q-icon name="folder" />
            </q-item-section>

            <q-item-section>Gestionar Red</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/under-construction"
          >
            <q-item-section avatar>
              <q-icon name="folder" />
            </q-item-section>

            <q-item-section>Portafolio</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/our-members"
          >
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>Nosotros</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/explore/projects"
          >
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>Proyectos</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/explore/events"
          >
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>

            <q-item-section>Eventos</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/explore/blog"
          >
            <q-item-section avatar>
              <q-icon name="topic" />
            </q-item-section>

            <q-item-section>Blog</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/login"
            v-if="!authStore.isAuthenticated"
          >
            <q-item-section avatar>
              <q-icon name="window" />
            </q-item-section>

            <q-item-section>Registro</q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            to="/login"
            v-if="!authStore.isAuthenticated"
          >
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section>Iniciar Sesión</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            active-class="text-secondary"
            v-else
            @click="logout"
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>Cerrar Sesión</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
      <footer-component></footer-component>
    </q-page-container>
  </q-layout>
</template>
<style scoped lang="scss"></style>
