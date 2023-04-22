<script lang="ts" setup>
import { NetworkService } from 'src/services/NetworkService';
import { NetworkRepresentative, Network } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';
import { ref, onMounted, reactive } from 'vue';
import ProjectsManagement from './components/ProjectsManagement.vue';

const tab = ref('projects');
const networkService = new NetworkService();
const authStore = useAuthStore();
const networkRepresentative = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 1
})
const network = reactive<Network>({
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

const members = [

];

async function loadNetwork() {
  const response = await networkService.getUserNetwork(authStore.getUser.id);
  Object.assign(networkRepresentative, response.data);
  Object.assign(network, networkRepresentative.network);
}

onMounted(() => {
  loadNetwork();
});

</script>
<template>
  <q-page padding class="q-px-xl">
    <div class="row">
      <div class="flex items-center justify-between" style="width: 100%; min-height: 200px;">
        <div class="flex items-center">
          <q-avatar size="100px" font-size="52px" color="teal" text-color="white">
            <q-img src="https://picsum.photos/id/237/200/200" spinner-color="primary" spinner-size="82px" />
          </q-avatar>
          <!-- Nombre de la institución -->
          <div class="q-ml-sm text-h4 text-secondary">
            {{ network.name }}
          </div>
          <div>
            <small>{{ network.country?.name }}</small>
          </div>
        </div>
        <!-- Chip para el rango de la persona -->
        <q-chip v-if="networkRepresentative.rank == 1" icon="star" label="Administrador" color="primary" />
        <q-chip v-if="networkRepresentative.rank == 2" icon="thumb_up" label="Gestor de contenido" color="primary" />
        <q-chip v-if="networkRepresentative.rank == 3" icon="person" label="Miembro" color="primary" />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-9">
        <q-card flat class="q-pa-md">
          <q-tabs v-model="tab" dense class="text-secondary" active-color="primary" indicator-color="primary"
            align="justify">
            <q-tab name="projects" label="Projectos" />
            <q-tab name="events" label="Eventos" />
            <q-tab name="posts" label="Posts" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="projects">
              <projects-management :network="network.id as number"></projects-management>
            </q-tab-panel>

            <q-tab-panel name="events">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="posts">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat>
          <q-card-section>
            <div class="text-h6 text-primary text-bold">
              Miembros
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <q-list>
              <!--
              <q-item v-for="member in members" :key="member.id">
                <q-item-section avatar>
                  <q-avatar size="50px" font-size="52px" color="teal" text-color="white">
                    <q-img :src="member.avatar" spinner-color="primary" spinner-size="82px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ member.name }}</q-item-label>
                  <q-item-label caption>{{ member.rank }}</q-item-label>
                </q-item-section>
              </q-item>
              -->
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
</style>
