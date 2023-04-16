<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import ProjectTypeService from 'src/services/ProjectTypeService';
import { ProjectType } from 'src/models/ProjectType';
import { QStepper } from 'quasar';

const stepper = ref();
const accept = ref(false);
const projectTypes = reactive<ProjectType[]>([]);
const step = ref(1);
const project = reactive({
  editor: '',
  public: false,
  informative: false,
  project_type: null,
  description: '',
  title: ''
});

onMounted(() => {
  loadProjectTypes();
});
async function loadProjectTypes() {
  try {
    const response = await ProjectTypeService.getAll();
    const types: ProjectType[] = response.data;
    projectTypes.push(...types);
  } catch (e) {
    console.error(e);
  }
}
async function onSubmit() {
  console.log(1);
}
async function onReset() {
  console.log(1);
}
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-9">
        <q-stepper v-model="step" ref="stepper" color="primary" animated flat>
          <q-step :name="1" title="Información Básica" icon="settings" :done="step > 1">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input outlined v-model="project.title" label="Titulo" hint="El titulo de tu proyecto" lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Por favor, ingresa el titulo',
                    ]" />
                </div>
                <div class="col-12">
                  <q-input type="textarea" filled v-model="project.description" label="Descripción"
                    hint="Una descripción breve de tu proyecto" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Por favor ingresa  la descripción',
                    ]" />
                </div>
                <div class="col-6">
                  <q-select filled v-model="project.project_type" :options="projectTypes" option-value="id"
                    option-label="name" map-options label="Tipo de proyecto" />
                </div>
              </div>

              <q-toggle v-model="accept" label="Acepto los terminos y condiciones" />
            </q-form>
          </q-step>

          <q-step :name="2" title="Definición del proyecto" icon="create_new_folder" :done="step > 2">
            <q-editor v-model="project.editor" min-height="5rem" />
          </q-step>

          <q-step :name="3" title="Cronograma" icon="calendar_month">
            This step won't show up because it is disabled.
          </q-step>

          <q-step :name="4" title="Multimedia" icon="photo_library">
            Try out different ad text to see what brings in the most customers,
            and learn how to enhance your ads using features like ad extensions.
            If you run into any problems with your ads, find out how to tell if
            they're running and how to resolve approval issues.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="($refs.stepper as QStepper).next()" color="primary"
                :label="step === 4 ? 'Terminar' : 'Continuar'" />
              <q-btn v-if="step > 1" flat color="primary" @click="($refs.stepper as QStepper).previous()" label="Atras"
                class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
      <div class="col-3">
        <q-card class="my-card" flat>
          <q-card-section>
            <div class="text-bold text-secondary">Categorias</div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-xs"></div>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm" flat>
          <q-card-section>
            <div class="text-bold text-secondary">Configuración</div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-toggle v-model="project.public" label="¿Es un proyecto publico?" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-toggle v-model="project.informative" label="¿Es un proyecto informativo?" />
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-sm" flat>
          <q-card-section>
            <q-list bordered>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>Icon as avatar</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
