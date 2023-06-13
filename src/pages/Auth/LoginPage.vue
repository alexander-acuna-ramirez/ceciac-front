<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { AuthService, RegisterService } from 'src/services';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { User, Country, UserProfileType, Profession } from 'src/models';
import { Rules } from 'src/utils';

const panel = ref(false);
const authService = new AuthService();
const $q = useQuasar();
const authStore = useAuthStore();
const registerService = new RegisterService();
const router = useRouter();
const userData = reactive({
  email: '',
  password: '',
});
const registerUser = reactive<User>({
  name: '',
  lastname: '',
  orcid_code: '',
  password: '',
  email: '',
  professional_summary: null,
  summary: null,
  id_logo: null,
  id_banner: null,
  id_profession: null,
  id_country: '',
  email_verified_at: null,
});
const countries = reactive<Country[]>([]);
const professions = reactive<Profession[]>([]);
const userProfileTypes = reactive<UserProfileType[]>([]);
const userProfileTypesSelection = ref(null);

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

async function register(e: Event) {
  try {
    e.preventDefault();
    console.log(registerUser);
    let data = {
      ...registerUser,
      userProfiles: userProfileTypesSelection.value
    }
    const login = await registerService.store(data);
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
}

function changeForm(e: Event) {
  e.preventDefault();
  panel.value = !panel.value;
}


async function loadCountries() {
  const response = await registerService.countries();
  countries.push(...response.data);
}

async function loadUserProfileTypes() {
  const response = await registerService.userTypeProfiles();
  userProfileTypes.push(...response.data);
}


async function loadProfessions() {
  const response = await registerService.professions();
  professions.push(...response.data);
}
onMounted(() => {
  loadCountries();
  loadProfessions();
  loadUserProfileTypes();
})
</script>

<template>
  <div style="height: 100vh" class="auth-container">
    <div :class="{ container: true, 'right-panel-active': panel }" id="container">
      <div class="form-container sign-up-container">
        <q-form @submit="register">
          <div class="text-h4 text-secondary text-bold q-pa-sm q-mb-sm">Crear cuenta</div>
          <div class="row q-col-gutter-sm">
            <q-input class="col-12 col-md-6" dense v-model="registerUser.name" type="text" label="Nombre" outlined
              lazy-rules :rules="[Rules.required]" />
            <q-input class="col-12 col-md-6" dense v-model="registerUser.lastname" type="text" label="Apellidos" outlined
              lazy-rules :rules="[Rules.required]" />
            <q-input class="col-12" dense v-model="registerUser.email" type="text" label="E-mail" outlined
              :rules="[Rules.email]" />
            <q-input class="col-12" dense v-model="registerUser.password" type="password" label="Contraseña" outlined
              :rules="[Rules.required]" />
            <q-select class="col-12 col-sm-12 col-md-6" dense outlined v-model="registerUser.id_country"
              :options="countries" label="Pais" emit-value map-options option-value="id" option-label="name"
              :rules="[Rules.required]" />
            <q-select class="col-12 col-sm-12 col-md-6" dense outlined v-model="registerUser.id_profession"
              :options="professions" label="Profesión" emit-value map-options option-value="id" option-label="name"
              :rules="[Rules.required]" />
            <q-select class="col-12" dense label="¿Qué eres?" outlined v-model="userProfileTypesSelection" use-input
              use-chips multiple input-debounce="0" :options="userProfileTypes" option-value="id" option-label="name"
              emit-value map-options :rules="[Rules.required]" />
          </div>

          <a href="#" @click="changeForm">¿Tienes cuenta? Inicia Sesión Aqui!</a>
          <button class="bg-primary" type="submit">Registrarse</button>
        </q-form>
      </div>
      <div class="form-container sign-in-container">
        <q-form @submit="onSubmit">
          <div class="text-h4 text-secondary text-bold q-pa-sm q-mb-sm">Iniciar sesión</div>
          <div class="row">
            <q-input class="col-12" v-model="userData.email" type="text" label="E-mail" outlined lazy-rules :rules="[
              (val: any) => (val && val.length > 0) || 'Ingrese un correo válido',
            ]">
              <template v-slot:append>
                <q-icon name="alternate_email" />
              </template>
            </q-input>
            <q-input class="col-12" v-model="userData.password" type="password" label="Contraseña" outlined lazy-rules
              :rules="[
                (val: any) =>
                  (val && val.length > 0) || 'Ingrese una contraseña válida',
              ]">
              <template v-slot:append>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>


          <span class="text-subtitle2">¿Olvidaste tu contraseña? <router-link to="/recover-password"
              class="text-secondary">Recuperala
              Aquí</router-link></span>
          <button type="submit" class="bg-primary q-mt-sm">Iniciar sesión</button>
        </q-form>
      </div>
      <div class="overlay-container">
        <div class="overlay bg-primary">
          <div class="overlay-panel overlay-left">
            <div class="text-h4 text-bold">¡Bienvenido de vuelta!</div>
            <p>Para seguir conectado con nosotros, inicia sesión con tu información personal</p>
            <button class="ghost" id="signIn" @click="panel = !panel">Iniciar sesión</button>
          </div>
          <div class="overlay-panel overlay-right">
            <div class="text-h3 text-bold">¡Hola, amigo!</div>
            <p>Ingresa tus datos personales y comienza tu viaje con nosotros</p>
            <button class="ghost" id="signUp" @click="panel = !panel">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid white;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15%;
  height: 100%;
  text-align: center;
}

.form-input {
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}



@media (max-width: $breakpoint-sm-max) {
  .container {
    width: 100%;
    height: 100%;
  }

  .sign-up-container {
    width: 100%;
  }

  .sign-in-container {
    width: 100%;
  }

  .overlay-container {
    display: none;
  }


  .container .sign-in-container {
    transform: translate(0%);
  }

  .container .sign-up-container {
    transform: translate(100%);
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%) !important;
  }

  .container.right-panel-active .sign-up-container {
    transform: translate(0%);
  }

  form {
    padding: 0px 10%;
  }

}

@media (max-width: $breakpoint-xs-max) {
  .container {
    width: 100%;
    height: 100%;
  }

  form {
    padding: 0px 5%;
  }
}



.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
