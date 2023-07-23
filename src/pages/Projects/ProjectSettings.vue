<script setup lang="ts">
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { ProjectService, ProjectTypeService } from 'src/services';
import { Project, ProjectType } from 'src/models';
import { reactive, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

import ProjectBasicInfo from './components/ProjectBasicInfo.vue';
import ProjectContent from './components/ProjectContent.vue';
import ProjectParticipants from './components/ProjectParticipants.vue';
import ProjectUploads from './components/ProjectUploads.vue';

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

async function getProject() {
  let { id } = route.params as RouteParams;
  const response = await projectService.show(id as string);
  Object.assign(project, response.data);
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
    await projectService.checkOwnership(id as string);
  } catch (e) {
    router.push('/not-found');
  }
}

async function deleteProject() {
  $q.dialog({
    title: 'Archivar Proyecto',
    message: '¿Esta realmente seguro de archivar este proyecto?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      $q.loading.show();
      if (project.id) await projectService.deleteProject(project.id);
      $q.notify({
        type: 'positive',
        message: 'Proyecto archivado!',
      });
      router.push('/network-management/projects');
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: 'No se pudo archivar!',
      });
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
</script>

<template>
  <q-page padding class="q-px-xl">
    <div class="flex justify-between q-my-lg">
      <div class="text-h4 text-primary text-bold">
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
          @click="deleteProject()"
          class="q-ml-md"
        />
      </div>
    </div>

    <!-- MOBILE VIEW -->

    <div v-if="$q.screen.lt.md">
      <q-tabs
        v-model="tab"
        vertical
        class="text-accent"
        inline-label
        switch-indicator
      >
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
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="info">
          <project-basic-info
            :project="project"
            :project-types="projectTypes"
            @updated="getProject()"
          ></project-basic-info>
        </q-tab-panel>

        <q-tab-panel name="resources">
          <project-uploads :files="project.files ?? []"></project-uploads>
        </q-tab-panel>

        <q-tab-panel name="content">
          <project-content :content="project.synopsis"></project-content>
        </q-tab-panel>

        <q-tab-panel name="participants">
          <project-participants
            :project="project.id ?? 0"
          ></project-participants>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- DESKTOP VIEW -->
    <q-splitter
      v-model="splitterModel"
      style="background-color: white"
      class="q-pa-md"
      v-else
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-accent"
          inline-label
          switch-indicator
        >
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
              :project="project"
              :project-types="projectTypes"
              @updated="getProject()"
            ></project-basic-info>
          </q-tab-panel>

          <q-tab-panel name="resources">
            <project-uploads :files="project.files ?? []"></project-uploads>
          </q-tab-panel>

          <q-tab-panel name="content">
            <project-content :content="project.synopsis"></project-content>
          </q-tab-panel>

          <q-tab-panel name="participants">
            <project-participants
              :project="project.id ?? 0"
            ></project-participants>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>
<style lang="scss" scoped></style>
