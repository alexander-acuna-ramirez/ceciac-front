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
      <q-input v-model="searchTerm" type="text" label="Buscar proyecto" filled>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn unelevated color="primary" icon="add" :to="{ name: 'ProjectCreate', params: { network: props.network } }"
          rounded>
          <strong>Crear</strong>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section v-if="projects.length > 0" class="gallery">
      <project-card v-for="project in projects" :project="project" :key="project.id"></project-card>
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
