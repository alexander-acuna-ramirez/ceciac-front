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


const tab = ref('projects');
const $q = useQuasar();
const networkService = new NetworkService();
const authStore = useAuthStore();
const networkRepresentative = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 1
})
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
const members = reactive<NetworkRepresentative[]>([])


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
  $q.dialog({
    title: 'Logo',
    message: 'Selecciona el logo de tu institución',
    prompt: {
      model: "", // << here is the magic
      type: 'file',
      filled: true // optional
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    const files = data as FileList;
    const logo: File = files.item(0) ?? new File([], "");

    const formData = new FormData();
    formData.append('network_logo', logo);

    await networkService.uploadLogo(formData, network.id as number);
    await loadNetwork();
  })
}

function openBannerChange() {
  $q.dialog({
    title: 'Banner',
    message: 'Selecciona el banner de tu institución',
    prompt: {
      model: "", // << here is the magic
      type: 'file',
      filled: true // optional
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    const files = data as FileList;
    const logo: File = files.item(0) ?? new File([], "");

    const formData = new FormData();
    formData.append('network_banner', logo);

    await networkService.uploadBanner(formData, network.id as number);
    await loadNetwork();
  })
}


onMounted(() => {
  loadNetwork();
});

</script>
<template>
  <q-page padding>
    <q-card flat style="border-radius: 15px;">
      <div class="q-pa-sm">
        <q-img style="border-radius: 15px;" :src="network.banner?.fullpath" :ratio="16 / 9" height="250px"
          spinner-color="primary" spinner-size="82px" fit="cover" class="my-img">
          <div class="absolute-full text-subtitle2 flex flex-center my-text" @click="openBannerChange">
            <q-icon name="photo_camera" />
          </div>
        </q-img>

      </div>
      <q-card-section>
        <div class="row">
          <div class="flex items-center justify-between" style="width: 100%; ">
            <div class="flex items-center">
              <q-avatar size="120px" font-size="52px" class="my-img" style="border-radius: 15px;">
                <q-img :src="network.logo?.fullpath" spinner-color="primary" spinner-size="82px">
                  <div class="absolute-full text-subtitle2 flex flex-center my-text" @click="openIconChange">
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
                  <img :src="'https://flagcdn.com/w20/' + network.country?.iso.toLowerCase() + '.png'" />
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
        <q-card flat style="border-radius: 15px;">
          <q-tabs v-model="tab" class="text-secondary" active-color="primary" indicator-color="primary" align="justify">
            <q-tab name="projects" label="Proyectos" no-caps />
            <q-tab name="events" label="Eventos" no-caps />
            <q-tab name="posts" label="Posts" no-caps />
            <q-tab name="ajustes" label="Ajustes" no-caps />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="projects" class="q-pa-none">
              <projects-management :network="network.id as number"></projects-management>
            </q-tab-panel>

            <q-tab-panel name="events" class="q-pa-none">
              <events-management :network="network.id as number"></events-management>
            </q-tab-panel>

            <q-tab-panel name="posts" class="q-pa-none">
              <!--<blog-post-management :network="network.id as number"></blog-post-management>-->
              <building-page></building-page>
            </q-tab-panel>
            <q-tab-panel name="ajustes" class="q-pa-none">
              <!--<blog-post-management :network="network.id as number"></blog-post-management>-->
              <building-page></building-page>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat style="border-radius: 15px;">
          <q-card-section>
            <div class="text-h6 text-primary text-bold">
              Miembros
            </div>
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
                  <q-item-label>{{ member.user?.name + " " + member.user?.lastname }}</q-item-label>
                  <q-item-label caption v-if="member.rank == 1">Administrador</q-item-label>
                  <q-item-label caption v-if="member.rank == 2">Gestor de contenido</q-item-label>
                  <q-item-label caption v-if="member.rank == 3">Mimebro</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" style="width: 100%;" label="Administrar" flat />
          </q-card-section>


        </q-card>
      </div>
    </div>

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
  transition: .3s;
}

.my-img:hover .my-text {
  visibility: visible;
  opacity: 1;
  transition: .3s;
}
</style>
