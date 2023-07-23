<script setup lang="ts">
import { Event, Network } from 'src/models';
import { useQuasar } from 'quasar';
import { ExploreService, BlogService, NetworkService } from 'src/services';
import { onMounted, reactive, ref, watch } from 'vue';
import EventCard from '../Events/components/EventCard.vue';
import { useRoute } from 'vue-router';

interface FilterOption {
  label: string;
  value: any;
  disable: boolean;
}
const $q = useQuasar();
const route = useRoute();
const exploreService = new ExploreService();
const networkService = new NetworkService();
const events = reactive<Event[]>([]);
const optionsCategory = reactive<FilterOption[]>([
  {
    label: 'Presencial',
    value: 0,
    disable: false,
  },
  {
    label: 'Virtual',
    value: 1,
    disable: false,
  },
]);

const optionsModality = reactive<FilterOption[]>([
  {
    label: 'Privado',
    value: 0,
    disable: false,
  },
  {
    label: 'Publico',
    value: 1,
    disable: false,
  },
]);

const paginationData = reactive({
  current_page: 1,
  total: 0,
  last_page: 0,
  perpage: 10,
  sortOrder: 'desc',
  sortBy: 'title',
});

const perpageOptions = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '50',
    value: 50,
  },
];

const sortOptions = [
  {
    label: 'Titulo',
    value: 'title',
  },
  {
    label: 'Descripción',
    value: 'description',
  },
  {
    label: 'Institución',
    value: 'id_network',
  },
  {
    label: 'Fecha de creación',
    value: 'created_at',
  },
];

const sortOrder = [
  {
    label: 'Ascendente',
    value: 'asc',
  },
  {
    label: 'Descendente',
    value: 'desc',
  },
];
const current = ref(1);
const networks = reactive<Network[]>([]);
const searchData = reactive({
  start_date: '',
  end_date: '',
  searchTerm: '',
  is_public: [],
  is_online: [],
  institutions: [],
  sortOrder: '',
  sortBy: '',
});
async function getEvents(page = 1) {
  $q.loading.show();
  console.log(searchData);
  searchData.sortOrder = paginationData.sortOrder;
  searchData.sortBy = paginationData.sortBy;
  try {
    const response = await exploreService.getEvents({
      page,
      perpage: paginationData.perpage,
      ...searchData,
    });
    events.splice(0, events.length);
    events.push(...response.data.data);
    Object.assign(paginationData, response.data);
  } catch (e) {
    console.error(e);
  } finally {
    $q.loading.hide();
  }
}

async function getNetworks() {
  const response = await networkService.getNetworks();
  networks.push(...response.data);
}

function clearFilters() {
  Object.assign(searchData, {
    start_date: '',
    end_date: '',
    searchTerm: '',
    is_public: [],
    is_online: [],
    institutions: [],
  });
  getEvents(1);
}

const institutionSelected = ref<Network | null>(null);

watch(current, (val) => {
  getEvents(val);
});
watch(
  () => searchData.searchTerm,
  (term) => {
    if (
      term.length >= 5 ||
      term.length == 0 ||
      term == null ||
      term == undefined
    ) {
      getEvents(1);
    }
    //getEvents(1);
  }
);
watch(
  () => paginationData.perpage,
  (page) => {
    getEvents(1);
  }
);
watch(
  () => paginationData.sortBy,
  (sortBy) => {
    getEvents(1);
  }
);
watch(
  () => paginationData.sortOrder,
  (sortOrder) => {
    getEvents(1);
  }
);

onMounted(() => {
  if (route.query.searchTerm) {
    searchData.searchTerm = route.query.searchTerm as string;
  }
  getEvents();
  getNetworks();
});
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3">
        <q-card flat class="rounded-corners">
          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Categorias</span>
            <q-option-group
              v-model="searchData.is_online"
              type="checkbox"
              :options="optionsCategory"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span class="text-subtitle2 text-accent">{{
                    opt.label
                  }}</span>
                </div>
              </template>
            </q-option-group>
          </q-card-section>

          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Modalidad</span>
            <q-option-group
              v-model="searchData.is_public"
              type="checkbox"
              :options="optionsModality"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span class="text-subtitle2 text-accent">{{
                    opt.label
                  }}</span>
                </div>
              </template>
            </q-option-group>
          </q-card-section>
          <q-separator spaced inset />
          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Fechas</span>
            <div class="row q-col-gutter-md">
              <q-input
                outlined
                v-model="searchData.start_date"
                mask="date"
                :rules="['date']"
                class="col-12 col-md-6"
                label="Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="searchData.start_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            unelevated
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                v-model="searchData.end_date"
                mask="date"
                :rules="['date']"
                class="col-12 col-md-6"
                label="Fin"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="searchData.end_date">
                        <div class="row items-center justify-end">
                          <q-btn
                            unelevated
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold"
              >Instituciones</span
            >
            <q-select
              outlined
              v-model="searchData.institutions"
              :options="networks"
              label="Institución"
              emit-value
              map-options
              option-label="name"
              option-value="id"
              multiple
              use-chips
            >
              <template v-slot:option="{ itemProps, opt }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <div
                      style="
                        display: flex;
                        flex-direction: row;
                        align-content: start;
                        align-items: start;
                        width: 100%;
                      "
                    >
                      <q-avatar
                        v-if="opt.logo"
                        size="40px"
                        font-size="52px"
                        rounded
                        text-color="white"
                      >
                        <img :src="opt.logo.fullpath" alt="" />
                      </q-avatar>
                      <q-avatar
                        v-else
                        size="40px"
                        font-size="52px"
                        class="my-img"
                        rounded
                      >
                        <q-img
                          src="~assets/img/app/user/user-profile-default.jpg"
                          spinner-color="primary"
                          spinner-size="82px"
                          height="100%"
                        >
                        </q-img>
                      </q-avatar>

                      <span class="q-ml-md">{{ opt.name }}</span>
                    </div>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
          <q-card-section class="flex justify-end">
            <q-btn
              unelevated
              color="accent"
              @click="clearFilters()"
              rounded
              flat
            >
              <strong>Limpiar Filtros</strong>
            </q-btn>

            <q-btn unelevated color="primary" @click="getEvents(1)" rounded>
              <strong>Filtrar</strong>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-9">
        <div>
          <q-toolbar class="bg-white text-accent q-py-md rounded-corners">
            <q-input
              v-model="searchData.searchTerm"
              type="text"
              label="Buscar"
              outlined
            >
              <template v-slot:append>
                <q-icon v-if="searchData.searchTerm === ''" name="search" />
                <q-icon
                  v-else
                  name="clear"
                  class="cursor-pointer"
                  @click="searchData.searchTerm = ''"
                /> </template
            ></q-input>
            <q-space />

            <!--<q-btn unelevated flat round dense icon="apps" class="q-mr-xs" />
                                                                <q-btn unelevated flat round dense icon="more_vert" />-->

            <q-select
              v-model="paginationData.perpage"
              :options="perpageOptions"
              option-label="label"
              option-value="value"
              label="Numero de elementos"
              outlined
              style="min-width: 200px"
              map-options
              emit-value
            />

            <q-select
              v-model="paginationData.sortBy"
              :options="sortOptions"
              option-label="label"
              option-value="value"
              label="Ordenar por"
              outlined
              style="min-width: 200px"
              class="q-ml-sm"
              map-options
              emit-value
            />

            <q-select
              v-model="paginationData.sortOrder"
              :options="sortOrder"
              option-label="label"
              option-value="value"
              label="Orden"
              outlined
              style="min-width: 200px"
              class="q-ml-sm"
              map-options
              emit-value
            />
          </q-toolbar>
          <div class="q-my-md">
            <span class="text-subtitle1 text-accent"
              >Mostrando {{ events.length }} resultados</span
            >
          </div>
          <div class="gallery q-mt-md">
            <event-card
              v-for="event in events"
              :event="event"
              :key="event.id"
            ></event-card>
          </div>
          <div
            class="flex flex-center q-mt-md"
            v-if="paginationData.last_page > 1"
          >
            <q-pagination v-model="current" :max="paginationData.last_page" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="scss" scoped>
.gallery {
  display: grid;
  gap: 3rem;
  grid-auto-rows: 27rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}

@media (max-width: $breakpoint-md-min) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 30rem;
    grid-template-columns: 1fr;
  }
}
</style>
