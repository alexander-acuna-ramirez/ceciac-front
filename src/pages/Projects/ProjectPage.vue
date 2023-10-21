<script setup lang="ts">
import { ref, onMounted, reactive, onUnmounted, watch } from 'vue';
import { ProjectService, LoggerService } from 'src/services';
import { RouteParams, useRoute } from 'vue-router';
import {
  Project,
  ProjectParticipant,
  User,
  UserInteraction,
  UserInteractionDuration,
} from 'src/models';
import { useRouter } from 'vue-router';
import { Functions } from 'src/utils';
import { useAuthStore } from 'src/stores/auth.store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const authStore = useAuthStore();
const projectService = new ProjectService();
const route = useRoute();
const router = useRouter();
const participants = reactive<ProjectParticipant[]>([]);
const slide = ref(1);
const loggerService = new LoggerService();
const participationStatus = ref(1);
const loading = ref(false);

const scrollThreshold = 200; // Puedes ajustar este valor según tus necesidades
const isScrolledDown = ref(false);

const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  end_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
});
const tab = ref('description');
const participantsPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const interactionDuration: UserInteractionDuration = {
  content_id: 0,
  start_time: new Date().getTime().toString(),
  end_time: '',
  content_type: 'Project',
};

async function loadProject() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.show(id as string);
    Object.assign(project, response.data);
    if (!authStore.isAuthenticated) return;
    const loggerData: UserInteraction = {
      content_id: project.id ?? 0,
      content_type: 'Project',
      event: 'ProjectEntered',
    };
    loggerService.registerEvent(loggerData);
    interactionDuration.content_id = project.id as unknown as number;
  } catch (e) {
    router.push('/not-found');
  }
}

async function loadParticipation() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.projectParticipation(id as string);
    if (response.status == 200) {
      participationStatus.value = response.data.participation_type;
    }
  } catch (e) {
    console.error(e);
  }
}

function handleScroll() {
  console.log('Scrolled: ' + isScrolledDown.value);
  if (
    window.scrollY > scrollThreshold &&
    authStore.isAuthenticated &&
    !isScrolledDown.value
  ) {
    let { id } = route.params as RouteParams;
    const loggerData: UserInteraction = {
      content_id: id as unknown as number,
      content_type: 'Project',
      event: 'ProjectMoreDetails',
    };
    loggerService.registerEvent(loggerData);
    isScrolledDown.value = true;
  }
}

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
    loading.value = true;
    let { id } = route.params as RouteParams;
    const response = await projectService.projectParticipants(
      id.toString(),
      page,
      perpage,
      sortBy,
      sortOrder,
      searchTerm,
      start_date,
      end_date
    );
    participants.slice(0, participants.length);
    participants.push(...response.data.data);
    participantsPagination.value.rowsNumber = response.data.last_page;
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudieron cargar los participantes',
    });
  } finally {
    loading.value = false;
  }
}

async function enroll() {
  loading.value = true;
  try {
    if (!authStore.isAuthenticated) {
      router.push({
        path: '/login',
        query: {
          redirect: 'ProjectPage',
          identifier: project.id ?? '',
        },
      });
      return;
    }
    let { id } = route.params as RouteParams;
    const loggerData: UserInteraction = {
      content_id: project.id ?? 0,
      content_type: 'Project',
      event: 'ProjectEnrollment',
    };

    loggerService.registerEvent(loggerData);
    const response = await projectService.participate(id as string);
    if (response.status == 200) {
      participationStatus.value = -1;
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    loadParticipation();
  }
}

function visitNetwork() {
  if (authStore.isAuthenticated) {
    let { id } = route.params as RouteParams;
    const contentId = id as string;
    const loggerData: UserInteraction = {
      content_id: contentId as unknown as number,
      content_type: 'Project',
      event: 'ProjectNetwork',
    };
    loggerService.registerEvent(loggerData);
  }
  router.push('/network/' + project.network?.id);
}
function sendDuration() {
  interactionDuration.end_time = new Date().getTime().toString();
  loggerService.registerDuration(interactionDuration);
}

watch(tab, (tab: string) => {
  if (authStore.isAuthenticated && tab == 'participants') {
    const loggerData: UserInteraction = {
      content_id: project.id ?? 0,
      content_type: 'Project',
      event: 'ProjectParticipants',
    };
    loggerService.registerEvent(loggerData);
  }
});

onMounted(() => {
  loadProject();
  loadParticipation();
  loadParticipants(1);
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  sendDuration();
});
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-img
            :src="project.file?.fullpath"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            height="250px"
            style="border-radius: 5px"
          />
          <q-card-section>
            <div class="row q-py-md">
              <div class="col-12 col-md-12 flex column justify-center">
                <div class="text-h4 text-secondary text-bold q-mt-md">
                  {{ project.name }}
                </div>
                <div class="text-subtitle1 text-accent q-mt-md">
                  {{ project.description }}
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
                    @click="enroll"
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
                    @click="enroll"
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
                <div class="q-pa-md" v-html="project.synopsis"></div>
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
                      :src="project.network?.logo?.fullpath"
                      spinner-color="primary"
                      spinner-size="82px"
                    ></q-img>
                  </q-avatar>
                  <span
                    class="text-accent q-ml-md"
                    @click="visitNetwork"
                    style="cursor: pointer"
                  >
                    {{ project.network?.name }}
                  </span>
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="text-subtitle2 text-secondary">
                  <span class="text-primary text-bold"
                    >Duración del proyecto:
                  </span>
                  De {{ Functions.formatDate(project.release_date) }} a
                  {{ Functions.formatDate(project.end_date) }}
                </div>
              </q-card-section>

              <q-separator inset />
              <q-card-section class="row">
                <span class="col-6 text-accent">
                  <span class="text-bold">{{
                    project.participants_count
                  }}</span>
                  participantes
                </span>
                <span class="col-6 text-accent">
                  <q-icon name="science" />
                  {{ project.type?.name }}
                </span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="participants">
        <div class="gallery" v-if="participants.length > 0">
          <profile-card
            v-for="user in participants"
            :key="user.id"
            :member="(user.user as User)"
          ></profile-card>
        </div>

        <div style="width: 100%" v-else>
          <span>No existen usuarios registrados</span>
        </div>

        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 5px;
          "
          v-if="participantsPagination.rowsNumber < 1"
        >
          <q-pagination
            v-model="participantsPagination.page"
            :max="participantsPagination.rowsNumber"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
.full-width {
  width: 100%;
}
</style>
