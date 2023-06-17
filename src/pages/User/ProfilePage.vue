<template>
  <q-page padding>
    <q-card flat style="border-radius: 15px;">
      <div class="q-pa-sm">
        <q-img v-if="userData.banner" style="border-radius: 15px;" :src="userData.banner?.fullpath" :ratio="16 / 9"
          height="250px" spinner-color="primary" spinner-size="82px" fit="cover" class="my-img" @click="openBannerChange">
          <div v-if="editProfile" class="absolute-full text-subtitle2 flex flex-center my-text">
            <q-icon name="photo_camera" />
          </div>
        </q-img>

        <q-img v-else style="border-radius: 15px;" src="~assets/img/app/user/user-profile-banner-default.jpg"
          :ratio="16 / 9" height="250px" spinner-color="primary" spinner-size="82px" fit="cover" class="my-img"
          @click="openBannerChange">
          <div v-if="editProfile" class="absolute-full text-subtitle2 flex flex-center my-text">
            <q-icon name="photo_camera" />
          </div>
        </q-img>

      </div>
      <q-card-section>
        <div class="row">
          <div class="flex items-center justify-between" style="width: 100%; ">
            <div class="flex items-center">


              <q-avatar v-if="userData.logo" size="120px" font-size="52px" class="my-img" style="border-radius: 15px;">
                <q-img :src="userData.logo?.fullpath" spinner-color="primary" spinner-size="82px" height="100%">
                  <div v-if="editProfile" class="absolute-full text-subtitle2 flex flex-center my-text"
                    style="height: 100%;" @click="openLogoChange">
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>

              <q-avatar v-else size="120px" font-size="52px" class="my-img" style="border-radius: 15px;">
                <q-img src="~assets/img/app/user/user-profile-default.jpg" spinner-color="primary" spinner-size="82px"
                  height="100%">
                  <div v-if="editProfile" class="absolute-full text-subtitle2 flex flex-center my-text"
                    style="height: 100%;" @click="openLogoChange">
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>



              <!-- Nombre del perfil -->
              <div class="q-ml-sm">
                <div class="text-h4 text-secondary">
                  {{ fullName }}
                </div>
                <div class="text-secondary">
                  {{ userData.professional_summary }}
                </div>

                <div class="flex items-center">
                  <img :src="'https://flagcdn.com/w20/' + 'pe' + '.png'" />
                  <small class="q-ml-sm">PERÚ</small>
                </div>
              </div>
            </div>
            <!-- Chip para el rango de la persona -->
            <q-btn v-if="editProfile" color="primary" icon="edit" size="xs" round flat rounded
              @click="basicInfoDialog = !basicInfoDialog" />
          </div>
        </div>

      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-md-9">
        <div style="border-radius: 15px;">
          <router-view></router-view>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat style="border-radius: 15px;">
          <q-card-section class="q-pt-md q-px-md q-pb-none flex justify-between">
            <div class="text-h6 text-secondary text-bold">Acerca de</div>
            <q-btn size="xs" color="primary" icon="edit" flat round @click="openAboutMeDialog" v-if="editProfile" />
          </q-card-section>
          <q-card-section>
            <q-list separator>
              <q-item>
                <q-item-section>
                  {{ (userData.summary) ? userData.summary : 'Sin resumen' }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-secondary text-bold">Tipo de perfil</q-item-label>
                </q-item-section>
                <q-item-section>

                  <div><q-chip v-for="profileType in userData.profile_types" :key="profileType.id" size="small"
                      :label="profileType.name" /></div>
                </q-item-section>
              </q-item>
              <q-item v-if="userData.orcid_code != null && userData.orcid_code != ''">
                <q-item-section>
                  <q-item-label class="text-secondary text-bold">ORCID</q-item-label>
                </q-item-section>
                <q-item-section>
                  <div>
                    <a :href="'https://orcid.org/' + userData.orcid_code" target="_blank">
                      <img style="width: 100%;" src="~assets/img/app/user/ORCID_logo.png" alt="Perfil ORCID">
                    </a>
                  </div>
                </q-item-section>
              </q-item>
              <q-item v-if="userData.linkedin != null && userData.linkedin != ''">
                <q-item-section>
                  <q-item-label class="text-secondary text-bold">Linkedin</q-item-label>
                </q-item-section>
                <q-item-section>
                  <div>
                    <a :href="userData.linkedin || '#'" target="_blank">
                      <img style="width: 100%;" src="~assets/img/app/user/Logo-Linkedin.png" alt="Perfil Linkedin">
                    </a>
                  </div>
                </q-item-section>
              </q-item>
              <q-item v-if="userData.created_at">
                <q-item-section>
                  <q-item-label class="text-secondary text-bold">Fecha de registro</q-item-label>
                </q-item-section>
                <q-item-section>
                  <div>{{ Functions.formatDate(userData.created_at) }}</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>


      </div>
    </div>


    <!-- Profile basic info form -->
    <q-dialog v-model="basicInfoDialog">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-bold text-secondary">Información de presentación</div>
          <div class="text-subtitle2">Aqui encontraras información basica de tu perfil</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="saveBasicInfo">
            <div class="row q-col-gutter-sm">
              <q-input class="col-12 " dense v-model="userData.name" type="text" label="Nombre" filled lazy-rules
                :rules="[Rules.required]" />
              <q-input class="col-12 " dense v-model="userData.lastname" type="text" label="Apellidos" filled lazy-rules
                :rules="[Rules.required]" />
              <q-select class="col-12 col-sm-12 col-md-6" dense filled v-model="userData.id_country" :options="countries"
                label="Pais" emit-value map-options option-value="id" option-label="name" :rules="[Rules.required]" />
              <q-select class="col-12 col-sm-12 col-md-6" dense filled v-model="userData.id_profession"
                :options="professions" label="Profesión" emit-value map-options option-value="id" option-label="name"
                :rules="[Rules.required]" />
              <q-input rows="2" placeholder="Ej. Ingeniero de Sistemas | Analista de datos" class="col-12"
                v-model="userData.professional_summary" type="textarea" label="Titular" filled />
            </div>


            <div class="q-mt-md flex justify-end">
              <q-btn @click="() => { basicInfoDialog = !basicInfoDialog; loadProfile(); }" label="Cancelar" no-caps
                type="reset" color="primary" flat rounded class="q-ml-sm" />
              <q-btn no-caps type="submit" color="primary" rounded>
                <strong>Guardar</strong>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- About me basic info form -->
    <q-dialog v-model="aboutMeInfoDialog">
      <q-card style="min-width: 65%;">
        <q-card-section>
          <div class="text-h6 text-bold text-secondary">Acerca de</div>
          <div class="text-subtitle2">Comparte un poco de ti!</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="updateAboutMe">
            <div class="row q-col-gutter-sm">
              <q-select class="col-12" label="¿Qué eres?" filled v-model="userProfileTypesSelection" use-input use-chips
                multiple input-debounce="0" :options="userProfileTypes" option-value="id" option-label="name" emit-value
                map-options :rules="[Rules.required]" />

              <q-input mask="NNNN-NNNN-NNNN-NNNN" filled class="col-12 col-md-6" v-model="userData.orcid_code"
                label="Código Orcid" :rules="[Rules.orcid]">
                <template v-slot:append>
                  <q-avatar>
                    <img src="~assets/img/app/user/ORCID_ID.png">
                  </q-avatar>
                </template>
              </q-input>

              <q-input :rules="[Rules.optionalLinkedin]" filled class="col-12 col-md-6" v-model="userData.linkedin"
                label="Linkedin">
                <template v-slot:append>
                  <q-avatar>
                    <img src="~assets/img/app/user/LinkedIn.png">
                  </q-avatar>
                </template>
              </q-input>

              <q-input rows="2" placeholder="Ej. Ingeniero de Sistemas | Analista de datos" class="col-12"
                v-model="userData.summary" type="textarea" label="Acerca de mí" filled />



            </div>


            <div class="q-mt-md flex justify-end">
              <q-btn @click="() => { aboutMeInfoDialog = !aboutMeInfoDialog; loadProfile(); }" label="Cancelar" no-caps
                type="reset" color="primary" flat rounded class="q-ml-sm" />
              <q-btn no-caps type="submit" color="primary" rounded>
                <strong>Guardar</strong>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>
<script lang="ts" setup>
import { User, Country, Profession, UserProfileType } from 'src/models';
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute, RouteParams } from 'vue-router';
import { ProfileService, RegisterService } from 'src/services';
import { useQuasar } from 'quasar';
import { Rules, Functions } from 'src/utils';
import { useAuthStore } from 'src/stores/auth.store';

const $q = useQuasar();
const authStore = useAuthStore();
const profileService = new ProfileService();
const registerService = new RegisterService();
const userProfileTypesSelection = ref<any>(null);
const userData = reactive<User>({
  name: '',
  lastname: '',
  orcid_code: '',
  linkedin: null,
  email: '',
  professional_summary: '',
  summary: '',
  id_logo: null,
  id_banner: null,
  id_profession: null,
  id_country: 0,
});
const countries = reactive<Country[]>([]);
const professions = reactive<Profession[]>([]);
const userProfileTypes = reactive<UserProfileType[]>([]);
const basicInfoDialog = ref(false);
const aboutMeInfoDialog = ref(false);
const editProfile = ref(false);
const route = useRoute();
async function loadProfile() {
  if (route.params.user) {
    let { user } = route.params as RouteParams;
    const res = await profileService.loadProfile(user as string);
    Object.assign(userData, res.data);
  }
}
function openBannerChange() {
  $q.dialog({
    title: 'Banner',
    message: 'Selecciona el banner de tu perfil',
    prompt: {
      model: '',
      type: 'file',
      filled: true,
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    const files = data as FileList;
    const logo: File = files.item(0) ?? new File([], '');
    const formData = new FormData();
    formData.append('profile_banner', logo);
    await profileService.uploadBanner(formData);
    await loadProfile();
  });
}
function openLogoChange() {
  $q.dialog({
    title: 'Logo',
    message: 'Selecciona el logo de tu perfil',
    prompt: {
      model: '',
      type: 'file',
      filled: true,
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    const files = data as FileList;
    const logo: File = files.item(0) ?? new File([], '');
    const formData = new FormData();
    formData.append('profile_logo', logo);
    await profileService.uploadLogo(formData);
    await loadProfile();
  });
}

function openAboutMeDialog() {
  userProfileTypesSelection.value = userData.profile_types?.map(e => e.id);
  aboutMeInfoDialog.value = !aboutMeInfoDialog.value;
}

async function loadCountries() {
  const response = await registerService.countries();
  countries.push(...response.data);
}

async function loadProfessions() {
  const response = await registerService.professions();
  professions.push(...response.data);
}

async function saveBasicInfo() {
  let data = {
    name: userData.name,
    lastname: userData.lastname,
    id_country: userData.id_country,
    id_profession: userData.id_profession,
    professional_summary: userData.professional_summary,
  };
  await profileService.updateBasicInformation(data);
  basicInfoDialog.value = false;
  loadProfile();
}

async function updateAboutMe() {
  let data = {
    summary: userData.summary,
    orcid_code: userData.orcid_code,
    linkedin: userData.linkedin,
    profile_types: userProfileTypesSelection.value
  }
  await profileService.updateAboutMe(data);
  aboutMeInfoDialog.value = false;
  loadProfile();
}
async function loadUserProfileTypes() {
  const response = await registerService.userTypeProfiles();
  userProfileTypes.push(...response.data);
}

const fullName = computed(() => {
  return `${userData.name} ${userData.lastname}`
});



onMounted(() => {
  let { user } = route.params as RouteParams;
  if (authStore.getUser.id == user) {
    editProfile.value = true;
  }
  loadProfile();
  loadCountries();
  loadProfessions();
  loadUserProfileTypes();
});


</script>
<style lang="scss" scoped>
.overlapping {
  border: 2px solid white;
  position: absolute;
}

.my-img .my-text {
  visibility: hidden;
  opacity: 0;
  transition: .3s;
}

.my-img:hover .my-text {
  visibility: visible;
  opacity: 1;
  transition: .3s;
}
</style>
