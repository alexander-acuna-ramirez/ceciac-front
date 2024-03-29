<script lang="ts" setup>
import { NetworkService } from 'src/services/NetworkService';
import { NetworkRepresentative, Network } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';
import { ref, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import NetworkHeroLoading from './components/NetworkHeroLoading.vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import DefaultUserLogo from 'src/assets/img/app/user/user-profile-default.jpg';
import DefaultUserBanner from 'src/assets/img/app/user/user-profile-banner-default.jpg';

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

const isLoaded = ref(false);
const loading = ref(false);

async function loadNetwork() {
  //$q.loading.show();
  loading.value = true;
  try {
    const response = await networkService.getUserNetwork(authStore.getUser.id);
    Object.assign(networkRepresentative, response.data);
    Object.assign(network, networkRepresentative.network);
    isLoaded.value = true;
  } catch (e) {
    console.error(e);
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error cargando la información!',
    });
  } finally {
    loading.value = false;
    //$q.loading.hide();
  }
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
    <q-card flat bordered>
      <!-- Image Banner -->
      <q-skeleton
        v-if="loading"
        width="100%"
        square
        animation="fade"
        class="institutionBanner"
      />
      <q-img
        v-if="!loading"
        :src="network.banner ? network.banner?.fullpath : DefaultUserBanner"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        fit="cover"
        class="my-img institutionBanner"
      >
        <div
          class="absolute-full text-subtitle2 flex flex-center my-text"
          @click="openBannerChange"
        >
          <q-icon name="photo_camera" />
        </div>
      </q-img>

      <q-card-section>
        <NetworkHeroLoading v-if="loading"></NetworkHeroLoading>
        <div class="row items-between wrap q-mt-sm institutionData" v-else>
          <q-avatar
            size="120px"
            font-size="52px"
            class="my-img rounded-corners"
          >
            <q-img
              :src="network.logo ? network.logo?.fullpath : DefaultUserLogo"
              spinner-color="primary"
              spinner-size="82px"
              @click="openIconChange"
            >
              <div
                class="absolute-full text-subtitle2 flex flex-center my-text"
                @click="openIconChange"
              >
                <q-icon name="photo_camera" />
              </div>
            </q-img>
          </q-avatar>

          <div class="col q-pl-sm q-mt-none">
            <!-- Nombre de la institución -->
            <div>
              <div class="text-h4 text-secondary q-mt-md">
                {{ network.name }}
              </div>
              <div class="text-secondary">
                {{ network.email }}
              </div>

              <div v-if="network.country">
                <div>
                  <span>
                    <img
                      :src="
                        'https://flagcdn.com/w20/' +
                        network.country?.iso.toLowerCase() +
                        '.png'
                      "
                    />
                    <small class="q-ml-sm">{{
                      network.country?.name
                    }}</small></span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Chip para el rango de la persona -->
          <div>
            <q-chip
              v-if="networkRepresentative.rank == 1"
              icon="star"
              label="Administrador"
            />
            <q-chip
              v-if="networkRepresentative.rank == 2"
              icon="thumb_up"
              label="Gestor de contenido"
            />
            <q-chip
              v-if="networkRepresentative.rank == 3"
              icon="person"
              label="Miembro"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-none q-px-none">
        <q-tabs
          v-model="tab"
          class="text-accent"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          inline-label
        >
          <q-route-tab
            label="Proyectos"
            icon="article"
            to="/network-management/projects"
            exact
            no-caps
          />
          <q-route-tab
            label="Eventos"
            icon="event"
            to="/network-management/events"
            exact
            no-caps
          />
          <q-route-tab
            label="Blog"
            icon="book"
            to="/network-management/blog"
            exact
            no-caps
          />
          <q-route-tab
            label="Miembros"
            icon="group"
            to="/network-management/members"
            exact
            no-caps
          />
        </q-tabs>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md q-mt-xs">
      <div class="col-12 col-md-12">
        <q-card flat bordered>
          <RouterView
            :network="network.id"
            :rank="networkRepresentative.rank"
            v-if="isLoaded"
          ></RouterView>
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
          <q-stepper
            flat
            v-model="cropStepperStep"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="Seleccionar imagen"
              icon="settings"
              :done="cropStepperStep > 1"
            >
              <q-file
                v-model="fileCrop"
                filled
                label="Imagen"
                accept=".jpg, image/*"
                max-file-size="2048000"
              />
              <div class="q-mt-sm flex justify-end">
                <q-btn unelevated color="primary" @click="nextCropStep">
                  Siguiente
                </q-btn>
              </div>
            </q-step>

            <q-step
              :name="2"
              title="Redimensionar imagen"
              icon="create_new_folder"
              :done="cropStepperStep > 2"
            >
              <VuePictureCropper
                :boxStyle="{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f8f8f8',
                  margin: 'auto',
                }"
                :img="cropPreview"
                :options="{
                  viewMode: 1,
                  dragMode: 'crop',
                  aspectRatio: cropAspectRatio,
                }"
              />
              <div class="q-mt-sm flex justify-end">
                <q-btn unelevated color="primary" @click="nextCropStep">
                  Guardar
                </q-btn>
              </div>
            </q-step></q-stepper
          >
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

.institutionBanner {
  height: 250px;
}

@media (max-width: $breakpoint-md-min) {
  .institutionBanner {
    height: 100px;
  }
  .institutionName {
    text-align: center;
  }

  .institutionData {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
}
</style>
