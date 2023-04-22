<script setup lang="ts">
import { onMounted } from 'vue';
import { ProjectService } from 'src/services/ProjectService';

const props = defineProps({
  network: {
    required: true,
    type: Number
  },
});

const projectService = new ProjectService();

async function loadProjects(page = 1, perpage = 10) {
  const response = await projectService.loadNetworkProjects(page, perpage, null, props.network);
  console.log(response);
}

onMounted(() => {
  loadProjects();
});
</script>
<template>
  <q-card>
    <q-card-section class="flex justify-end">
      <q-btn color="primary" icon="add" label="Crear" :to="'/project/create/' + props.network" />
    </q-card-section>
    <q-card-section>

    </q-card-section>
  </q-card>
</template>
<style></style>
