<script setup lang="ts">
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { ProjectService, ProjectTypeService } from 'src/services';
import { File, NetworkRepresentative, Project, ProjectType } from 'src/models';
import { reactive, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';

import ProjectBasicInfo from './components/ProjectBasicInfo.vue';
import ProjectContent from './components/ProjectContent.vue';
import ProjectParticipants from './components/ProjectParticipants.vue';
import ProjectUploads from './components/ProjectUploads.vue';
import { AxiosError } from 'axios';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const projectService = new ProjectService();
const tab = ref('info');
const splitterModel = ref(20);
const projectTypeService = new ProjectTypeService();
const projectTypes = reactive<ProjectType[]>([]);
const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  end_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
});
const userRank = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 0,
});
const projectEdit = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  end_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
});
const projectFile = reactive<File>({
  filename: '',
  mime: '',
  path: '',
  fullpath: '',
});
const projectFileEdit = reactive<File>({
  filename: '',
  mime: '',
  path: '',
  fullpath: '',
});

async function getProject() {
  try {
    console.log('Loading again...');
    let { id } = route.params as RouteParams;
    const response = await projectService.show(id as string);
    Object.assign(project, response.data);
    Object.assign(projectEdit, response.data);

    Object.assign(projectFile, response.data.file);
    Object.assign(projectFileEdit, response.data.file);
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error cargando el proyecto!',
    });
  }
}
async function loadProjectTypes() {
  try {
    const response = await projectTypeService.getAll();
    const types: ProjectType[] = response.data;
    projectTypes.push(...types);
  } catch (e) {
    console.error(e);
  }
}

async function checkOwnership() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.checkOwnership(id as string);
    Object.assign(userRank, response.data);
  } catch (e) {
    router.push({
      name: 'Unauthorized',
    });
  }
}

async function deleteProject() {
  const confirmationDialog = $q.dialog({
    title: 'Archivar Proyecto',
    message: '¿Está realmente seguro de archivar este proyecto?',
    cancel: true,
    persistent: true,
  });

  confirmationDialog.onOk(async () => {
    try {
      $q.loading.show();

      if (project.id) {
        await projectService.deleteProject(project.id);
      }

      $q.notify({
        type: 'positive',
        message: 'Proyecto archivado!',
      });

      router.push('/network-management/projects');
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 403) {
        $q.notify({
          color: 'info',
          message: 'No tiene permiso para realizar esta acción!',
          icon: 'info',
        });
      } else {
        $q.notify({
          color: 'negative',
          message: 'Ocurrió un problema!',
          icon: 'report_problem',
        });
      }
    } finally {
      $q.loading.hide();
    }
  });
}

onMounted(async () => {
  $q.loading.show();
  await checkOwnership();
  await loadProjectTypes();
  await getProject();
  $q.loading.hide();
});

watch(tab, (newValue) => {
  console.log(newValue);
  console.log(projectEdit);
  console.log(project);
  Object.assign(projectEdit, project);
  Object.assign(projectFile, projectEdit);
});
</script>

<template>
  <q-page padding :class="{ 'q-px-xl': !$q.screen.lt.md }">
    <div class="flex justify-between q-my-lg">
      <div class="text-h4 text-primary text-bold q-mb-md">
        {{ project.name }}
      </div>
      <div>
        <q-btn
          color="primary"
          icon="visibility"
          label="Ver Proyecto"
          :to="'/project/detail/' + project.id"
          unelevated
          no-caps
          rounded
        />
        <q-btn
          icon="delete"
          color="red"
          rounded
          label="Archivar"
          unelevated
          no-caps
          :disable="userRank.rank != 1"
          @click="deleteProject()"
          class="q-ml-md"
        />
      </div>
    </div>

    <q-card flat bordered>
      <!-- MOBILE VIEW -->

      <div v-if="$q.screen.lt.md">
        <q-tabs v-model="tab" class="text-accent" inline-label align="left">
          <q-tab name="info" icon="info" label="Información General" no-caps />
          <q-tab
            name="resources"
            icon="collections"
            label="Imagenes y recursos"
            no-caps
          />
          <q-tab name="content" icon="notes" label="Contenido" no-caps />
          <q-tab
            name="participants"
            icon="groups"
            label="Participantes"
            no-caps
          />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          horizontal
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="info">
            <project-basic-info
              :project="projectEdit"
              :project-types="projectTypes"
              @updated="getProject()"
            ></project-basic-info>
          </q-tab-panel>

          <q-tab-panel name="resources">
            <project-uploads
              :file="projectFile"
              :project="project"
              @updated="getProject()"
            ></project-uploads>
          </q-tab-panel>

          <q-tab-panel name="content">
            <project-content
              :content="projectEdit.synopsis"
              @updated="getProject()"
            ></project-content>
          </q-tab-panel>

          <q-tab-panel name="participants">
            <project-participants
              :project="project.id ?? 0"
            ></project-participants>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- DESKTOP VIEW -->
      <q-splitter v-model="splitterModel" v-else>
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-accent"
            inline-label
            switch-indicator
          >
            <q-tab
              name="info"
              icon="info"
              label="Información General"
              no-caps
            />
            <q-tab
              name="resources"
              icon="collections"
              label="Imagenes y recursos"
              no-caps
            />
            <q-tab name="content" icon="notes" label="Contenido" no-caps />
            <q-tab
              name="participants"
              icon="groups"
              label="Participantes"
              no-caps
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="info">
              <project-basic-info
                :project="projectEdit"
                :project-types="projectTypes"
                @updated="getProject()"
              ></project-basic-info>
            </q-tab-panel>

            <q-tab-panel name="resources">
              <project-uploads
                :file="projectFile"
                :project="project"
              ></project-uploads>
            </q-tab-panel>

            <q-tab-panel name="content">
              <project-content
                :content="projectEdit.synopsis"
              ></project-content>
            </q-tab-panel>

            <q-tab-panel name="participants">
              <project-participants
                :project="project.id ?? 0"
              ></project-participants>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>
<style lang="scss" scoped></style>
