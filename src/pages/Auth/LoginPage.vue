<script setup lang="ts">
import { reactive } from 'vue';
import { AuthService } from 'src/services';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const authService = new AuthService();
const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();
const userData = reactive({
  email: '',
  password: '',
});
const onSubmit = async () => {
  try {
    const login = await authService.login(userData.email, userData.password);
    if (login.data.success != true) {
      $q.notify({
        color: 'negative',
        message: 'Usuario o contraseña incorrecta!',
        icon: 'report_problem',
      });
      return;
    }
    let loginData = login.data.data;
    authStore.setToken(loginData.token)
    authStore.setUser(loginData.user);

    router.push('/');
  } catch (e) {
    $q.notify({
      color: 'negative',
      message: 'Usuario o contraseña incorrecta!',
      icon: 'report_problem',
    });
    console.error(e);
  }
};
</script>

<template>
  <div class="row" style="height: 100vh">
    <div class="col-md-7">
      <q-img src="~assets/img/network.jpeg" style="width: 100%; height: 100%" />
    </div>
    <div class="col-12 col-sm-12 col-md-5 flex justify-center items-center">
      <div style="min-width: 70%" class="q-pa-xl">
        <div class="text-h5 text-center text-secondary text-bold">
          BIENVENIDO
        </div>

        <q-form @submit="onSubmit" class="q-gutter-y-md">
          <div class="flex justify-center">
            <label class="text-secondary">Ingrese a su cuenta</label>
          </div>
          <q-input v-model="userData.email" type="text" label="E-mail" outlined lazy-rules :rules="[
              (val: any) => (val && val.length > 0) || 'Ingrese un correo valido',
            ]" />
          <q-input v-model="userData.password" type="password" label="Contraseña" outlined lazy-rules :rules="[
              (val: any) =>
                (val && val.length > 0) || 'Ingrese una contraseña valida',
            ]" />

          <q-btn color="primary" icon="login" label="Ingresar" style="width: 100%" type="submit" />

          <div class="flex justify-center">
            <span class="text-center text-secondary">
              Red CECIAC - © Copyright {{ new Date().getFullYear() }}
            </span>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
