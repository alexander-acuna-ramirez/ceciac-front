<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { ProjectService } from 'src/services/ProjectService';
import ProjectCard from 'src/pages/Projects/components/ProjectCard.vue';
import { Project } from '@models/Project';

const props = defineProps({
  network: {
    required: true,
    type: Number
  },
});

const projectService = new ProjectService();
const projects = reactive<Project[]>([]);

async function loadProjects(page = 1, perpage = 10) {
  const response = await projectService.loadNetworkProjects(page, perpage, null, props.network);
  projects.push(response.data);
}

const searchTerm = ref('');

onMounted(() => {
  loadProjects();
});
</script>
<template>
  <q-card flat>
    <q-card-section class="flex justify-between">
      <q-input v-model="searchTerm" type="text" label="Buscar proyecto" filled />
      <div>
        <q-btn color="primary" icon="add" label="Crear"
          :to="{ name: 'ProjectCreate', params: { network: props.network } }" />
      </div>
    </q-card-section>
    <q-card-section>
      <project-card v-for="project in projects" :project="project" :key="project.id"></project-card>
    </q-card-section>
  </q-card>
</template>
<style></style>
