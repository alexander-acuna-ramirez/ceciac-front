<script lang="ts" setup>
import { NetworkService } from 'src/services/NetworkService';
import { NetworkRepresentative, Network } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';
import { ref, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, RouteParams, useRouter } from 'vue-router';
import NetworkHeroLoading from './components/NetworkHeroLoading.vue';
import DefaultUserLogo from 'src/assets/img/app/user/user-profile-default.jpg';
import DefaultUserBanner from 'src/assets/img/app/user/user-profile-banner-default.jpg';

const tab = ref('projects');
const $q = useQuasar();
const router = useRouter();
const networkService = new NetworkService();
const authStore = useAuthStore();
const route = useRoute();
const networkData = reactive<Network>({
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
    let { network } = route.params as RouteParams;
    const response = await networkService.getNetwork(network as string);
    Object.assign(networkData, response.data);
    isLoaded.value = true;
  } catch (e) {
    console.error(e);
    router.push('/home');
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error cargando la información!',
    });
  } finally {
    loading.value = false;
    //$q.loading.hide();
  }
}

onMounted(() => {
  loadNetwork();
});
</script>
<template>
  <q-page padding>
    <q-card flat bordered>
      <q-skeleton
        v-if="loading"
        width="100%"
        square
        animation="fade"
        class="institutionBanner"
      />
      <q-img
        v-if="!loading"
        :src="
          networkData.banner ? networkData.banner?.fullpath : DefaultUserBanner
        "
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        fit="cover"
        class="my-img institutionBanner"
      >
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
              :src="
                networkData.logo ? networkData.logo?.fullpath : DefaultUserLogo
              "
              spinner-color="primary"
              spinner-size="82px"
            >
            </q-img>
          </q-avatar>

          <div class="col q-pl-sm q-mt-none">
            <!-- Nombre de la institución -->
            <div>
              <div class="text-h4 text-secondary q-mt-md">
                {{ networkData.name }}
              </div>
              <div class="text-secondary">
                {{ networkData.email }}
              </div>

              <div v-if="networkData.country">
                <div>
                  <span>
                    <img
                      :src="
                        'https://flagcdn.com/w20/' +
                        networkData.country?.iso.toLowerCase() +
                        '.png'
                      "
                    />
                    <small class="q-ml-sm">{{
                      networkData.country?.name
                    }}</small></span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Chip para el rango de la persona -->
          <div></div>
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
            :to="'/network/' + route.params.network"
            exact
            no-caps
          />
          <q-route-tab
            label="Eventos"
            icon="event"
            :to="'/network/' + route.params.network + '/events'"
            exact
            no-caps
          />
          <q-route-tab
            label="Blog"
            icon="book"
            :to="'/network/' + route.params.network + '/blog'"
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
            :network="networkData.id"
            :rank="1"
            v-if="isLoaded"
          ></RouterView>
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
