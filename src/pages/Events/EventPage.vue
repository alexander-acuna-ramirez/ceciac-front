<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { EventService, LoggerService } from 'src/services';
import { RouteParams, useRoute } from 'vue-router';
import { Event, UserInteraction, ProjectParticipant } from 'src/models';
import { Functions } from 'src/utils';
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import ProfileCard from '../User/components/ProfileCard.vue';
import { User } from 'src/models';

const $q = useQuasar();
const tab = ref('description');
const eventService = new EventService();
const route = useRoute();
const event = reactive<Event>({
  title: '',
  description: '',
  event_content: '',
  id_network: '',
  id_user: '',
  id_file: '',
  location: '',
  date_time: '',
  end_date_time: '',
  is_public: 1,
  is_online: 1,
});
const participants = reactive<ProjectParticipant[]>([]);
const participationStatus = ref(0);
const loading = ref(false);
const loggerService = new LoggerService();

async function participate() {
  try {
    loading.value = true;
    let { id } = route.params as RouteParams;
    await eventService.participate(id as string);
    const loggerData: UserInteraction = {
      content_id: event.id ?? 0,
      content_type: 'Event',
      event: 'EventEnrollment',
    };
    loggerService.registerEvent(loggerData);
  } catch (e) {
    console.error(e);
  } finally {
    loadParticipation();
    loading.value = false;
  }
}

async function loadEvent() {
  try {
    let { id } = route.params as RouteParams;
    const response = await eventService.show(id as string);
    Object.assign(event, response.data);
    const loggerData: UserInteraction = {
      content_id: event.id ?? 0,
      content_type: 'Event',
      event: 'EventEntered',
    };
    loggerService.registerEvent(loggerData);
  } catch (e) {
    console.error(e);
  }
}
async function loadParticipation() {
  try {
    let { id } = route.params as RouteParams;
    const response = await eventService.participation(id as string);
    if (response.data.participation_type) {
      participationStatus.value = response.data.participation_type;
    }
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 401) {
      participationStatus.value = -1;
    } else {
      $q.notify({
        color: 'negative',
        message: 'Ocurrió un error cargando el evento, intente más tarde!',
        icon: 'report_problem',
      });
    }
    console.error(error);
  }
}

function getEventDate() {
  const date = event.date_time ? new Date(event.date_time) : new Date();
  return {
    month: date
      .toLocaleString('es-ES', {
        month: 'long',
      })
      .toUpperCase(),
    day: date.getDate(),
    year: date.getFullYear(),
  };
}

const participantsPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

async function loadParticipants(
  page = 1,
  perpage = 10,
  sortBy = 'created_at',
  sortOrder = 'desc',
  searchTerm = '',
  start_date = '',
  end_date = ''
) {
  try {
    let { id } = route.params as RouteParams;
    loading.value = true;
    const response = await eventService.eventParticipants(
      id as string,
      page,
      perpage,
      sortBy,
      sortOrder,
      searchTerm,
      start_date,
      end_date
    );
    participants.splice(0, participants.length);
    participants.push(...response.data.data);
    participantsPagination.value.rowsNumber = response.data.total;
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudieron cargar los participantes',
    });
  } finally {
    loading.value = false;
  }
}

watch(
  () => participantsPagination.value.page,
  (page) => {
    loadParticipants(page);
  }
);

onMounted(() => {
  loadEvent();
  loadParticipation();
  loadParticipants(1);
});
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-img
            :src="event.file?.fullpath"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            height="250px"
            style="border-radius: 5px"
          />
          <q-card-section>
            <div class="row q-py-md q-col-gutter-lg">
              <div class="col-12 col-md-2">
                <div class="bg-secondary dateContainer text-white">
                  <div class="text-h5">{{ getEventDate().month }}</div>
                  <div class="text-h2">{{ getEventDate().day }}</div>

                  <div class="text-h5">{{ getEventDate().year }}</div>
                </div>
              </div>
              <div class="col-12 col-md-10 flex column justify-center">
                <div class="text-h4 text-secondary text-bold q-mt-md">
                  {{ event.title }}
                </div>
                <div class="text-subtitle1 text-accent q-mt-md">
                  {{ event.description }}
                </div>
                <div>
                  <q-btn
                    v-if="participationStatus == -1"
                    unelevated
                    class="q-my-md"
                    color="primary"
                    rounded
                    no-caps
                    to="/login"
                    :loading="loading"
                    @click="participate"
                  >
                    Participar
                  </q-btn>

                  <q-btn
                    v-else
                    unelevated
                    class="q-my-md"
                    :color="participationStatus != 1 ? 'accent' : 'primary'"
                    rounded
                    no-caps
                    :loading="loading"
                    :disable="participationStatus != 1"
                    @click="participate"
                  >
                    {{
                      participationStatus === 3 ? 'Participando' : 'Participar'
                    }}
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-tabs class="text-accent" inline-label align="left" v-model="tab">
            <q-tab
              name="description"
              icon="description"
              label="Descripción"
              no-caps
            />

            <q-tab
              name="participants"
              icon="groups"
              label="Participantes"
              no-caps
            />
          </q-tabs>
        </q-card>
      </div>
    </div>

    <q-tab-panels v-model="tab" animated class="bg-transparent q-pt-md">
      <q-tab-panel name="description" class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-8">
            <q-card flat bordered>
              <q-card-section>
                <div class="q-pa-md" v-html="event.event_content"></div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2 text-accent">
                  <q-avatar
                    rounded
                    size="30px"
                    font-size="52px"
                    text-color="white"
                    class="my-img"
                  >
                    <q-img
                      v-if="event.network && event.network.logo"
                      :src="event.network?.logo?.fullpath"
                      spinner-color="primary"
                      spinner-size="82px"
                    ></q-img>

                    <img
                      v-else
                      src="~assets/img/app/user/user-profile-banner-default.jpg"
                      alt="Network Logo"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                  </q-avatar>
                  {{ event.network?.name }}
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="text-subtitle2 text-secondary">
                  <span class="text-primary text-bold"
                    >Duración del evento:
                  </span>
                  De {{ Functions.formatDate(event.date_time) }} a
                  {{ Functions.formatDate(event.end_date_time) }}
                </div>
              </q-card-section>

              <q-separator inset />
              <q-card-section class="row">
                <span class="col-6 text-accent">
                  <span class="text-bold">{{ event.participants_count }}</span>
                  participantes
                </span>
                <span class="col-6 text-accent">
                  <q-icon name="science" />
                  {{ event.is_online }}
                </span>
              </q-card-section>
              <q-card-section>
                <q-chip v-for="tag in event.tags" :key="tag.id" size="sm">
                  {{ tag.name }}
                </q-chip>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="participants">
        <div class="gallery">
          <profile-card
            v-for="user in participants"
            :key="user.id"
            :member="(user.user as User)"
          ></profile-card>
        </div>

        <div style="width: 100%; display: flex; justify-content: center">
          <q-pagination
            v-model="participantsPagination.page"
            :max="participantsPagination.rowsNumber"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped lang="scss">
.full-width {
  width: 100%;
}

.dateContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  text-align: center;
  min-height: 200px;
}

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
