<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { ProjectService } from 'src/services/ProjectService';
import { RouteParams, useRoute } from 'vue-router';
import { Project } from '@models/Project';

const projectService = new ProjectService();
const route = useRoute();

const slide = ref(1);
const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  end_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
});

function participate() {
  // Aquí se podría agregar la lógica para participar en el proyecto
}
async function loadProject() {
  try {
    let { id } = route.params as RouteParams;
    const response = await projectService.show(id as string);
    Object.assign(project, response.data);
    console.log(project);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  loadProject();
});
</script>
<template>
  <q-page padding class="q-px-xl">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-carousel :swipeable="true" :autoplay="true" :vertical="true" animated v-model="slide" arrows navigation
          infinite>
          <q-carousel-slide :key="idx" v-for="(file, idx) in project.files" :name="file.filename"
            :img-src="file.fullpath" />
        </q-carousel>
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-sm">

      <div class="col-9">
        <q-card flat>
          <q-card-section>
            <div class="q-pa-md text-primary text-bold text-h4">
              {{ project.name }}
            </div>
            <div class="q-pa-md" v-html="project.synopsis"></div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat>
          <q-card-section>
            <div class="text text-bold text-primary">
              Organizador
            </div>
          </q-card-section>
          <q-card-section>
            <div>
              <q-avatar rounded size="30px" font-size="52px" color="teal" text-color="white" class="my-img">
                <q-img :src="project.network?.logo?.fullpath" spinner-color="primary" spinner-size="82px"></q-img>
              </q-avatar>

              {{ project.network?.name }}
            </div>
          </q-card-section>
        </q-card>
        <q-card flat class="q-mt-sm">
          <q-card-section>
            <div class="text text-bold text-primary text-h6">
              Datos Generales
            </div>
          </q-card-section>
          <q-card-section>
            <q-list bordered separator>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline class="text-primary">Fecha de lanzamiento</q-item-label>
                  <q-item-label class="text-secondary">{{ project.release_date }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline class="text-primary">Fecha de lanzamiento</q-item-label>
                  <q-item-label class="text-secondary">{{ project.release_date }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label overline class="text-primary">Tipo de proyecto</q-item-label>
                  <q-item-label class="text-secondary">{{ project.type?.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </q-card-section>
        </q-card>

        <q-card flat class="q-mt-sm">
          <q-card-section>
            <div class="text text-bold text-primary text-h6">
              Tags
            </div>
          </q-card-section>
          <q-card-section>
            <q-chip color="primary" text-color="white" icon="event">
              Tecnologia
            </q-chip>
            <q-chip color="primary" text-color="white" icon="event">
              Sociedad
            </q-chip>
            <q-chip color="primary" text-color="white" icon="event">
              Derecho
            </q-chip>

          </q-card-section>
        </q-card>

        <q-btn class="q-mt-md" style="width: 100%;" color="primary" label="Participar" @click="participate" />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.full-width {
  width: 100%;
}
</style>
