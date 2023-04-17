<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { ProjectType, Project } from 'src/models';
import { QStepper } from 'quasar';
import { useQuasar } from 'quasar';
import SectionBanner from 'src/components/SectionBanner.vue';
import { ProjectTypeService, ProjectService } from 'src/services';
import { useRouter } from 'vue-router';

const router = useRouter();
const projectService = new ProjectService();
const projectTypeService = new ProjectTypeService();
const $q = useQuasar();
const projectTypes = reactive<ProjectType[]>([]);
const step = ref(1);
const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  synopsis: '',
  network_id: 1,
  type_id: null,
  end_date: '',
});

const stepper = ref();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const files = reactive([]);

onMounted(() => {
  loadProjectTypes();
});

async function loadProjectTypes() {
  try {
    const response = await projectTypeService.getAll();
    const types: ProjectType[] = response.data;
    projectTypes.push(...types);
  } catch (e) {
    console.error(e);
  }
}
async function saveProject() {
  const response = await projectService.store(project);
  const projectCreated: Project = response.data;
  router.push({
    name: "ProjectPage",
    params: {
      id: projectCreated.id
    }
  });
  console.log(response);
}

function nextStep() {
  switch (step.value) {
    case 1:
      firstStepForm.value.validate().then((success: boolean) => {
        if (success) stepper.value.next();
      });
      break;
    case 2:
      project.synopsis == ''
        ? $q.notify({
          color: 'negative',
          message: 'Tu projecto necesita una descripción!',
          icon: 'report_problem',
        })
        : stepper.value.next();
      break;
    case 3:
      thirdStepForm.value.validate().then((success: boolean) => {
        console.log(success);
        if (success) stepper.value.next();
      });
      break;
    case 4:
      saveProject();
      break;
    default:
      break;
  }
}
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 flex flex-center justify-center">
        <section-banner style="width: 70%"></section-banner>
      </div>
      <div class="col-12 flex flex-center justify-center">
        <q-stepper v-model="step" ref="stepper" color="primary" animated flat style="width: 70%">
          <q-step :name="1" title="Información Básica" icon="settings" :done="step > 1">
            <q-form ref="firstStepForm" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input filled v-model="project.name" label="Titulo" hint="El titulo de tu proyecto" lazy-rules :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Por favor, ingresa el titulo',
                  ]" />
                </div>
                <div class="col-12 col-md-6">
                  <q-select filled v-model="project.type_id" :options="projectTypes" option-value="id" option-label="name"
                    emit-value map-options label="Tipo de proyecto" :rules="[
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
              </div>
            </q-form>
          </q-step>

          <q-step :name="2" title="Definición del proyecto" icon="create_new_folder" :done="step > 2">
            <q-form ref="secondStepForm" class="q-gutter-md">
              <q-editor v-model="project.synopsis" min-height="10rem" hint="Aqui puedes explicar todo tu proyecto" />
            </q-form>
          </q-step>

          <q-step :name="3" title="Cronograma" icon="calendar_month" :done="step > 3">
            <q-form class="q-gutter-md" ref="thirdStepForm">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input filled v-model="project.release_date" mask="date" label="Fecha de lanzamiento"
                    :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="project.release_date">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input filled v-model="project.end_date" mask="date" :rules="['date']" label="Fecha de culminación">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="project.end_date">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-form>
          </q-step>

          <q-step :name="4" title="Multimedia" icon="photo_library">
            <q-uploader style="width: 100%" url="http://localhost:4444/upload" label="Imagenes" multiple
              :hide-upload-btn="true" accept=".jpg, image/*" />
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step > 1" flat color="primary" @click="($refs.stepper as QStepper).previous()" label="Atras"
                class="q-ml-sm" icon="chevron_left" />
              <q-btn @click="nextStep()" color="primary" :label="step === 4 ? 'Terminar' : 'Continuar'"
                :icon="step === 4 ? 'save' : 'chevron_right'" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>
