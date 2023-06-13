<script lang="ts" setup>
import { NetworkService } from 'src/services/NetworkService';
import { NetworkRepresentative, Network } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';
import { ref, onMounted, reactive } from 'vue';
import ProjectsManagement from './components/ProjectsManagement.vue';
import EventsManagement from './components/EventsManagement.vue';
import BlogPostManagement from './components/BlogPostManagement.vue';
import BuildingPage from 'src/components/BuildingPage.vue';
import { useQuasar } from 'quasar';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';

const tab = ref('projects');
const $q = useQuasar();
const networkService = new NetworkService();
const cropDialog = ref(false);
const cropStepperStep = ref(1);
const cropPreview = ref('');
const cropMode = ref(-1);

const cropAspectRatio = ref(1);
const fileCrop = ref<File | null>(null);

const authStore = useAuthStore();
const networkRepresentative = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 1,
});
const network = reactive<Network>({
  id: 0,
  name: '',
  email: '',
  contact_name: '',
  contact_email: '',
  country_id: 0,
  description: '',
  social_network: '',
  web: '',
  description_2: '',
});
const members = reactive<NetworkRepresentative[]>([]);

async function loadNetwork() {
  const response = await networkService.getUserNetwork(authStore.getUser.id);
  Object.assign(networkRepresentative, response.data);
  Object.assign(network, networkRepresentative.network);
  loadMembers();
}
async function loadMembers() {
  const response = await networkService.networkMembers(network.id as number);
  members.splice(0, members.length);
  members.push(...response.data);
  console.log(members);
}
function openIconChange() {
  cropAspectRatio.value = 1;
  cropDialog.value = true;
  cropMode.value = -1;
}

async function nextCropStep() {
  switch (cropStepperStep.value) {
    case 1:
      if (fileCrop.value == null) return;
      console.log(fileCrop.value);
      cropPreview.value = URL.createObjectURL(fileCrop.value);
      cropStepperStep.value++;
      break;
    case 2:

      if (!cropper) return;
      const croppedFile = await cropper.getFile({
        originalFile: fileCrop.value,
        type: 'blob',
      });
      if (!croppedFile) return;
      const formData = new FormData();
      if (cropMode.value === -1) {
        formData.append('network_logo', croppedFile, 'logo.jpg');
        await networkService.uploadLogo(formData, network.id as number);
      } else {
        formData.append('network_banner', croppedFile, 'banner.jpg');
        await networkService.uploadBanner(formData, network.id as number);
      }
      cropDialog.value = false;
      cropStepperStep.value = 1;
      cropPreview.value = '';
      cropMode.value = -1;
      fileCrop.value = null;
      loadNetwork();


      break;
    default:
      break;
  }
}

function openBannerChange() {

  cropAspectRatio.value = 16 / 3;
  cropMode.value = 1;
  cropDialog.value = true;
}

onMounted(() => {
  loadNetwork();
});
</script>
<template>
  <q-page padding>
    <q-card flat style="border-radius: 15px">
      <div class="q-pa-sm">
        <q-img v-if="network.banner" style="border-radius: 15px" :src="network.banner?.fullpath" :ratio="16 / 9"
          height="250px" spinner-color="primary" spinner-size="82px" fit="cover" class="my-img">
          <div class="absolute-full text-subtitle2 flex flex-center my-text" @click="openBannerChange">
            <q-icon name="photo_camera" />
          </div>
        </q-img>

        <q-img v-else style="border-radius: 15px" src="~assets/img/app/user/user-profile-banner-default.jpg"
          :ratio="16 / 9" height="250px" spinner-color="primary" spinner-size="82px" fit="cover" class="my-img"
          @click="openBannerChange">
          <div class="absolute-full text-subtitle2 flex flex-center my-text">
            <q-icon name="photo_camera" />
          </div>
        </q-img>
      </div>
      <q-card-section>
        <div class="row">
          <div class="flex items-center justify-between" style="width: 100%">
            <div class="flex items-center">
              <q-avatar v-if="network.logo" size="120px" font-size="52px" class="my-img" style="border-radius: 15px">
                <q-img :src="network.logo?.fullpath" spinner-color="primary" spinner-size="82px" @click="openIconChange">
                  <div class="absolute-full text-subtitle2 flex flex-center my-text" @click="openIconChange">
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>

              <q-avatar v-else size="120px" font-size="52px" class="my-img" style="border-radius: 15px">
                <q-img src="~assets/img/app/user/user-profile-default.jpg" spinner-color="primary" spinner-size="82px"
                  height="100%">
                  <div class="absolute-full text-subtitle2 flex flex-center my-text" style="height: 100%"
                    @click="openIconChange">
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>

              <!-- Nombre de la institución -->
              <div class="q-ml-sm">
                <div class="text-h4 text-secondary">
                  {{ network.name }}
                </div>
                <div class="text-secondary">
                  {{ network.email }}
                </div>

                <div class="flex items-center">
                  <img :src="
                    'https://flagcdn.com/w20/' +
                    network.country?.iso.toLowerCase() +
                    '.png'
                  " />
                  <small class="q-ml-sm">{{ network.country?.name }}</small>
                </div>
              </div>
            </div>
            <!-- Chip para el rango de la persona -->
            <q-chip v-if="networkRepresentative.rank == 1" icon="star" label="Administrador" color="primary" />
            <q-chip v-if="networkRepresentative.rank == 2" icon="thumb_up" label="Gestor de contenido" color="primary" />
            <q-chip v-if="networkRepresentative.rank == 3" icon="person" label="Miembro" color="primary" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-md-9">
        <q-card flat style="border-radius: 15px">
          <q-tabs v-model="tab" class="text-secondary" active-color="primary" indicator-color="primary" align="justify">
            <q-tab name="projects" label="Proyectos" no-caps />
            <q-tab name="events" label="Eventos" no-caps />
            <q-tab name="blog" label="Blog" no-caps />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="projects" class="q-pa-none">
              <projects-management :network="network.id as number"></projects-management>
            </q-tab-panel>

            <q-tab-panel name="events" class="q-pa-none">
              <events-management :network="network.id as number"></events-management>
            </q-tab-panel>

            <q-tab-panel name="blog" class="q-pa-none">
              <blog-post-management :network="network.id as number"></blog-post-management>

            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat style="border-radius: 15px">
          <q-card-section>
            <div class="text-h6 text-primary">Miembros</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <q-list>
              <q-item v-for="member in members" :key="member.id">
                <q-item-section avatar>
                  <q-avatar size="50px" font-size="52px" rounded>
                    <q-img :src="network.logo?.fullpath" spinner-color="primary" spinner-size="82px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{
                    member.user?.name + ' ' + member.user?.lastname
                  }}</q-item-label>
                  <q-item-label caption v-if="member.rank == 1">Administrador</q-item-label>
                  <q-item-label caption v-if="member.rank == 2">Gestor de contenido</q-item-label>
                  <q-item-label caption v-if="member.rank == 3">Miembro</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" style="width: 100%" label="Administrar" flat />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- CROP IMAGE -->
    <q-dialog v-model="cropDialog">
      <q-card flat style="width: 100%">
        <q-card-section>
          <div class="text-h6 text-bold text-secondary">
            Actualización de imagenes
          </div>
          <div class="text-subtitle2">
            Escoge la imagen que represente tu organización
          </div>
        </q-card-section>
        <q-card-section>
          <q-stepper flat v-model="cropStepperStep" ref="stepper" color="primary" animated>
            <q-step :name="1" title="Seleccionar imagen" icon="settings" :done="cropStepperStep > 1">
              <q-file v-model="fileCrop" outlined label="Imagen" accept=".jpg, image/*" max-file-size="2048000" />
              <div class="q-mt-sm flex justify-end">
                <q-btn color="primary" @click="nextCropStep"> Siguiente </q-btn>
              </div>
            </q-step>

            <q-step :name="2" title="Redimensionar imagen" icon="create_new_folder" :done="cropStepperStep > 2">
              <VuePictureCropper :boxStyle="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }" :img="cropPreview" :options="{
  viewMode: 1,
  dragMode: 'crop',
  aspectRatio: cropAspectRatio,
}" />
              <div class="q-mt-sm flex justify-end">
                <q-btn color="primary" @click="nextCropStep"> Guardar </q-btn>
              </div>
            </q-step></q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<style lang="scss" scoped>
.overlapping {
  border: 2px solid white;
  position: absolute;
}

.my-img .my-text {
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
}

.my-img:hover .my-text {
  visibility: visible;
  opacity: 1;
  transition: 0.3s;
}
</style>
