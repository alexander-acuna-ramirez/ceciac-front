<script lang="ts" setup>
import { NetworkService } from 'src/services/NetworkService';
import { NetworkRepresentative, Network } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';
import { ref, onMounted, reactive } from 'vue';
import { QTableColumn, useQuasar, QTableProps } from 'quasar';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import { Functions } from 'src/utils';

const tab = ref('projects');
const $q = useQuasar();
const networkService = new NetworkService();
const cropDialog = ref(false);
const cropStepperStep = ref(1);
const cropPreview = ref('');
const cropMode = ref(-1);
const membersDialog = ref(false);
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

const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.user.name,
  },
  {
    name: 'email',
    required: true,
    label: 'E-mail',
    align: 'left',
    field: (row) => row.user.email,
  },
  {
    name: 'rank',
    align: 'center',
    label: 'Rango',
    field: 'rank',
    sortable: false,
  },
  {
    name: 'created_at',
    label: 'Fecha de asignación',
    field: 'created_at',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Fecha de asignación',
    field: 'created_at',
    sortable: false,
  },
];

const ranks = [
  {
    label: 'Administrador',
    value: 1,
  },
  {
    label: 'Gestor',
    value: 2,
  },
  {
    label: 'Miembro',
    value: 3,
  },
];
const memberAddRequest = reactive({
  user: '',
  rank: '',
});
const membersAddDialog = ref(false);
const paginationMembers = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const options = ref([]);
const isLoaded = ref(false);
const members = reactive<NetworkRepresentative[]>([]);

async function loadNetwork() {
  $q.loading.show();
  try {
    const response = await networkService.getUserNetwork(authStore.getUser.id);
    Object.assign(networkRepresentative, response.data);
    Object.assign(network, networkRepresentative.network);
    loadMembers(1, '', '', 'desc', 'name');

    isLoaded.value = true;
  } catch (e) {
    console.error(e);
  } finally {
    $q.loading.hide();
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
/*
function openMembers() {
  membersDialog.value = true;
}*/

async function onRequestMembers(props: QTableProps) {
  if (props.pagination) {
    //const { page, rowsPerPage, sortBy, descending } = props.pagination;
    //loadMembers(page, '', '', 'desc', 'name');
  }
}

async function addMember() {
  //networkService.networkAddMember()
}

async function loadMembers(
  page = 1,
  searchTerm: '',
  rank: '',
  sortOrder: 'desc',
  sortBy: 'name'
) {
  const response = await networkService.networkMembersManage(
    network.id as number,
    {
      page,
      searchTerm,
      rank,
      sortOrder,
      sortBy,
    }
  );

  members.splice(0, members.length);
  members.push(...response.data.data);
  paginationMembers.value.rowsNumber = response.data.total as number;
}
function filterUser(val: string, update: any, abort: any) {
  console.log(abort);
  update(async () => {
    if (val === '') {
      options.value = [];
    } else {
      const response = await networkService.networkSearchUser(
        network.id ?? '',
        val.trim()
      );
      options.value = response.data;
    }
  });
}

onMounted(() => {
  loadNetwork();
});
</script>
<template>
  <q-page padding>
    <q-card flat style="border-radius: 15px">
      <div class="q-pa-sm">
        <q-img
          v-if="network.banner"
          style="border-radius: 15px"
          :src="network.banner?.fullpath"
          :ratio="16 / 9"
          height="250px"
          spinner-color="primary"
          spinner-size="82px"
          fit="cover"
          class="my-img"
        >
          <div
            class="absolute-full text-subtitle2 flex flex-center my-text"
            @click="openBannerChange"
          >
            <q-icon name="photo_camera" />
          </div>
        </q-img>

        <q-img
          v-else
          style="border-radius: 15px"
          src="~assets/img/app/user/user-profile-banner-default.jpg"
          :ratio="16 / 9"
          height="250px"
          spinner-color="primary"
          spinner-size="82px"
          fit="cover"
          class="my-img"
          @click="openBannerChange"
        >
          <div class="absolute-full text-subtitle2 flex flex-center my-text">
            <q-icon name="photo_camera" />
          </div>
        </q-img>
      </div>
      <q-card-section>
        <div class="row">
          <div
            class="flex items-center justify-between institutionData"
            style="width: 100%"
          >
            <div class="flex institutionData">
              <q-avatar
                v-if="network.logo"
                size="120px"
                font-size="52px"
                class="my-img"
                style="border-radius: 15px"
              >
                <q-img
                  :src="network.logo?.fullpath"
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

              <q-avatar
                v-else
                size="120px"
                font-size="52px"
                class="my-img"
                style="border-radius: 15px"
              >
                <q-img
                  src="~assets/img/app/user/user-profile-default.jpg"
                  spinner-color="primary"
                  spinner-size="82px"
                  height="100%"
                >
                  <div
                    class="absolute-full text-subtitle2 flex flex-center my-text"
                    style="height: 100%"
                    @click="openIconChange"
                  >
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>

              <!-- Nombre de la institución -->
              <div class="q-ml-sm">
                <div class="text-h4 text-secondary institutionName">
                  {{ network.name }}
                </div>
                <div class="text-secondary institutionName">
                  {{ network.email }}
                </div>

                <div class="flex items-center">
                  <img
                    :src="
                      'https://flagcdn.com/w20/' +
                      network.country?.iso.toLowerCase() +
                      '.png'
                    "
                  />
                  <small class="q-ml-sm">{{ network.country?.name }}</small>
                </div>
              </div>
            </div>
            <!-- Chip para el rango de la persona -->
            <q-chip
              v-if="networkRepresentative.rank == 1"
              icon="star"
              label="Administrador"
              color="primary"
            />
            <q-chip
              v-if="networkRepresentative.rank == 2"
              icon="thumb_up"
              label="Gestor de contenido"
              color="primary"
            />
            <q-chip
              v-if="networkRepresentative.rank == 3"
              icon="person"
              label="Miembro"
              color="primary"
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
          style="
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
          "
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

    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-md-12">
        <q-card flat style="border-radius: 15px">
          <RouterView :network="network.id" v-if="isLoaded"></RouterView>
          <!--
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
          -->
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

    <q-dialog v-model="membersDialog">
      <q-card>
        <q-card-section>
          <q-table
            title="Miembros"
            :data="members"
            :columns="columns"
            row-key="id"
            v-model:pagination="paginationMembers"
            @request="onRequestMembers"
            flat
            :rows="members"
          >
            <template v-slot:top>
              <div class="text-h6 text-primary text-bold">Miembros</div>
              <q-space />
              <q-btn
                unelevated
                color="primary"
                icon="add"
                @click="membersAddDialog = true"
                rounded
              >
                <strong>Agregar</strong>
              </q-btn>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">
                  {{ props.row.user.name }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.user.email }}
                </q-td>
                <q-td key="rank" :props="props">
                  <q-chip
                    label="Administrador"
                    size="sm"
                    v-if="props.row.rank == 1"
                  />
                  <q-chip
                    label="Gestor de contenido"
                    size="sm"
                    v-if="props.row.rank == 2"
                  />
                  <q-chip
                    label="Miembro"
                    size="sm"
                    v-if="props.row.rank == 3"
                  />
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ Functions.formatDate(props.row.created_at) }}
                </q-td>
                <q-td key="actions" :props="props">
                  <q-btn
                    unelevated
                    flat
                    round
                    color="primary"
                    icon="close"
                    :disable="props.row.rank == 1"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="membersAddDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-primary text-bold">Agregar Usuario</div>
        </q-card-section>
        <q-card-section class="row q-col-gutter-md">
          <q-select
            class="col-12"
            filled
            v-model="memberAddRequest.user"
            use-input
            input-debounce="0"
            label="Buscar Usuarios"
            :options="options"
            @filter="filterUser"
            hint="Ingrese el e-mail"
            option-label="email"
            option-value="id"
            emit-value
            map-options
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-avatar size="50px" rounded>
                    <img
                      :src="scope.opt.logo.fullpath"
                      alt="Logo"
                      v-if="scope.opt.logo != null"
                    />
                    <img
                      src="~assets/img/app/user/user-profile-default.jpg"
                      alt="Logo"
                      v-else
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    scope.opt.name + ' ' + scope.opt.lastname
                  }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            class="col-12"
            v-model="memberAddRequest.rank"
            :options="ranks"
            label="Rango"
            filled
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            unelevated
            flat
            label="Cancelar"
            color="primary"
            v-close-popup
          />
          <q-btn
            unelevated
            flat
            label="Agregar"
            color="primary"
            @click="addMember()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Manage Users -->
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

@media (max-width: $breakpoint-md-min) {
  .institutionName {
    text-align: center;
  }

  .institutionData {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
