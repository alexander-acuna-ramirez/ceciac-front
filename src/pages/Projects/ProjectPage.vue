<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { ProjectService } from 'src/services/ProjectService';
import { RouteParams, useRoute } from 'vue-router';
import { Project } from 'src/models/Project';
import { useRouter } from 'vue-router';
import { Functions } from 'src/utils';
import { useAuthStore } from 'src/stores/auth.store';

const authStore = useAuthStore();
const projectService = new ProjectService();
const route = useRoute();
const router = useRouter();
const slide = ref(1);
const participating = ref(false);
const loading = ref(false);
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

async function loadProject() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.show(id as string);
    Object.assign(project, response.data);
    console.log(project);
  } catch (e) {
    router.push('/not-found');
  }
}

async function loadParticipation() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.projectParticipation(id as string);
    if (response.status == 200) {
      participating.value = true;
    }
  } catch (e) {
    console.error(e);
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
    const response = await projectService.participate(id as string);
    if (response.status == 200) {
      participating.value = true;
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    loadParticipation();
  }
}

onMounted(() => {
  loadProject();
  loadParticipation();
});
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-carousel
            :swipeable="true"
            :autoplay="true"
            :vertical="true"
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            style="max-height: 250px"
          >
            <q-carousel-slide
              :key="idx"
              v-for="(file, idx) in project.files"
              :name="file.filename"
              :img-src="file.fullpath"
            />
          </q-carousel>
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
                    unelevated
                    class="q-my-md"
                    :disable="participating || loading"
                    :loading="loading"
                    :color="!participating ? 'primary' : 'accent'"
                    rounded
                    no-caps
                    @click="enroll"
                  >
                    {{
                      participating ? 'Ya estas inscrito' : 'Unirse al proyecto'
                    }}
                  </q-btn>
                </div>
              </div>
              <!--
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
                      {{ project.network?.name }}
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
                  <q-card-section>
                    <q-chip v-for="tag in project.tags" :key="tag.id" size="sm">
                      {{ tag.name }}
                    </q-chip>
                  </q-card-section>
                </q-card>
              </div>-->
            </div>
          </q-card-section>
          <q-tabs class="text-accent" inline-label align="left" v-model="tab">
            <q-tab
              name="description"
              icon="description"
              label="Descripción"
              no-caps
            />
            <q-tab name="alarms" icon="groups" label="Participantes" no-caps />
            <q-tab
              name="movies"
              icon="update"
              label="Actualizaciones"
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
                  {{ project.network?.name }}
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
              <q-card-section>
                <q-chip v-for="tag in project.tags" :key="tag.id" size="sm">
                  {{ tag.name }}
                </q-chip>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
.full-width {
  width: 100%;
}
</style>
