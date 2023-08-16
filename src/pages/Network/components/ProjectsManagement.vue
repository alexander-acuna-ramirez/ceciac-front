<script setup lang="ts">
import { onMounted, ref, reactive, watch, toRef } from 'vue';
import { ProjectService } from 'src/services';
import { Project } from 'src/models/Project';
import LoadingCard from 'src/components/LoadingCard.vue';
import ProjectCard from 'src/pages/Projects/components/ProjectCard.vue';
//import ProjectNetworkFilter from './ProjectNetworkFilter.vue';
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
  last_page: 0,
});
const current = ref(1);
const loading = ref(false);
async function loadProjects(page = 1, perpage = 5) {
  loading.value = true;
  projects.splice(0, projects.length);
  const response = await projectService.loadNetworkProjects(
    page,
    perpage,
    null,
    props.network
  );
  projects.push(...response.data.data);
  Object.assign(paginationData, response.data);
  loading.value = false;
}

onMounted(() => {
  if (props.network != 0) loadProjects();
});
watch(toRef(props, 'network'), () => {
  loadProjects();
});

watch(current, (newX) => {
  loadProjects(newX, 5);
});
</script>
<template>
  <q-card flat>
    <q-card-section class="flex justify-between">
      <!--<project-network-filter></project-network-filter>-->
      <q-space />
      <div>
        <q-btn
          unelevated
          color="primary"
          icon="add"
          :to="{ name: 'ProjectCreate', params: { network: props.network } }"
          rounded
        >
          <strong>Crear</strong>
        </q-btn>
      </div>
    </q-card-section>

    <!-- Loading -->
    <q-card-section class="gallery" v-if="loading == true">
      <loading-card></loading-card>
      <loading-card></loading-card>
      <loading-card></loading-card>
      <loading-card></loading-card>
    </q-card-section>

    <!-- Loaded -->
    <q-card-section v-if="projects.length > 0" class="gallery">
      <project-card
        v-for="project in projects"
        :project="project"
        :key="project.id"
        :settings="true"
      ></project-card>
    </q-card-section>

    <!-- No results -->
    <q-card-section v-if="projects.length == 0 && loading == false">
      <empty-results
        style="height: 250px"
        titulo="No existen projectos"
        descripcion="Puedes crear uno!"
      ></empty-results>
    </q-card-section>

    <!-- Pagination -->
    <q-card-section v-if="projects.length > 0 && paginationData.last_page != 1">
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="paginationData.last_page" />
      </div>
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
