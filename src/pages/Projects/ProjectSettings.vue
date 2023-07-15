<script setup lang="ts">
import { useRoute, RouteParams } from 'vue-router';
import { ProjectService } from 'src/services';
import { Project } from 'src/models';
import { reactive, onMounted, ref } from 'vue';
import { Rules } from 'src/utils';

const route = useRoute();
const projectService = new ProjectService();
const tab = ref('info');
const splitterModel = ref(20);
const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  end_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
});
const projectTags = ref(null);

async function getProject() {
  let { id } = route.params as RouteParams;
  const response = await projectService.show(id as string);
  Object.assign(project, response.data);
}

onMounted(() => {
  getProject();
});
</script>

<template>
  <q-page padding>
    <q-toolbar class="q-my-md">
      <q-toolbar-title class="text-secondary text-bold text-subtitle1">
      </q-toolbar-title>
      <q-btn unelevated rounded dense icon="delete" color="red" flat>
        <strong>ARCHIVAR</strong>
      </q-btn>
    </q-toolbar>

    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-secondary">
          <q-tab name="info" icon="info" label="Información General" no-caps />
          <q-tab
            name="alarms"
            icon="collections"
            label="Imagenes y recursos"
            no-caps
          />
          <q-tab name="alarms" icon="notes" label="Contenido" no-caps />
          <q-tab name="movies" icon="groups" label="Participantes" no-caps />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="info">
            <div class="text-subtitle2 q-mb-md text-secondary text-bold">
              Información General
            </div>
            <q-form class="q-gutter-md q-pa-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    v-model="project.name"
                    label="Titulo"
                    hint="El titulo de tu proyecto"
                    lazy-rules
                    filled
                    :rules="[Rules.required, Rules.maxLength]"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    v-model="project.type_id"
                    :options="[]"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    label="Tipo de proyecto"
                    :rules="[Rules.required]"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    filled
                    type="textarea"
                    v-model="project.description"
                    label="Descripción"
                    hint="Una descripción breve de tu proyecto"
                    lazy-rules
                    :rules="[Rules.required, Rules.maxLength]"
                  />
                </div>
                <div class="col-12">
                  <q-select
                    label="Tags"
                    filled
                    v-model="projectTags"
                    use-input
                    use-chips
                    multiple
                    input-debounce="0"
                    :options="[]"
                    option-value="id"
                    option-label="name"
                    emit-value
                    map-options
                    :rules="[Rules.required]"
                  />
                </div>
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<style lang="scss" scoped></style>
