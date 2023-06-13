<script setup lang="ts">
import { onMounted, ref, reactive, watch, toRef } from 'vue';
import { ProjectService } from 'src/services/ProjectService';
import ProjectCard from 'src/pages/Projects/components/ProjectCard.vue';
import { Project } from '@models/Project';
import EmptyResults from 'src/components/EmptyResults.vue';

const props = defineProps({
  network: {
    required: true,
    type: Number,
  },
});

const projectService = new ProjectService();
const projects = reactive<Project[]>([]);
const paginationData = reactive({
  current_page: 1,
  total: 0,
  last_page: 0
});
const current = ref(1);
async function loadProjects(page = 1, perpage = 5) {
  projects.splice(0, projects.length);
  console.log(props.network, "NETWORK");
  const response = await projectService.loadNetworkProjects(page, perpage, null, props.network);
  projects.push(...response.data.data);
  Object.assign(paginationData, response.data);
}

const searchTerm = ref('');

onMounted(() => {
  if (props.network != 0) loadProjects();
});
watch(toRef(props, 'network'), (newNetwork) => {
  console.log(newNetwork, "network, changed")
  loadProjects();
});

watch(current, (newX) => {
  loadProjects(newX, 5);
})

</script>
<template>
  <q-card flat>
    <q-card-section class="flex justify-between">
      <q-input v-model="searchTerm" type="text" label="Buscar proyecto" outlined>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn color="primary" icon="add" :to="{ name: 'ProjectCreate', params: { network: props.network } }" rounded>
          <strong>Crear</strong>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section v-if="projects.length > 0" class="row q-col-gutter-lg ">
      <project-card v-for="project in projects" :project="project" :key="project.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"></project-card>
    </q-card-section>
    <q-card-section v-if="projects.length > 0 && paginationData.last_page != 1">
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="paginationData.last_page" />
      </div>
    </q-card-section>
    <q-card-section v-if="projects.length == 0">
      <empty-results titulo="No existen projectos" descripcion="Puedes crear uno!"></empty-results>
    </q-card-section>
  </q-card>
</template>
<style lang="scss"></style>
