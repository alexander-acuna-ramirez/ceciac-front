<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import { ProjectType, Project, Tag } from 'src/models';
import { QStepper } from 'quasar';
import { useQuasar } from 'quasar';
//import BannerComponent from 'src/components/BannerComponent.vue';
import { ProjectTypeService, ProjectService, TagService } from 'src/services';
import { useRouter, useRoute, RouteParams } from 'vue-router';
import { useToolbarConfig } from 'src/composables/useToolbarConfig';
import { Rules } from 'src/utils';

const router = useRouter();
const route = useRoute();
const projectService = new ProjectService();
const projectTypeService = new ProjectTypeService();
const tagService = new TagService();
const $q = useQuasar();
const projectTypes = reactive<ProjectType[]>([]);
const tags = reactive<Tag[]>([]);
const step = ref(1);
const toolbarConfig = useToolbarConfig();

const project = reactive<Project>({
  name: '',
  description: '',
  release_date: '',
  synopsis: '',
  id_network: null,
  type_id: null,
  end_date: '',
});

const projectTags = ref(null);
const loading = ref(false);
const stepper = ref();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const fourthStepForm = ref();
//const files = reactive<File[]>([]);
const projectFile = ref();

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
  try {
    loading.value = true;
    if (route.params.network) {
      let { network } = route.params as RouteParams;
      project.id_network = parseInt(network as string);
    }
    const response = await projectService.store(project);
    const projectCreated: Project = response.data;

    const fileData = new FormData();
    fileData.append('project_file', projectFile.value);
    const eventId =
      typeof projectCreated.id !== 'undefined' ? projectCreated.id : '';
    await projectService.uploadProjectFile(fileData, eventId);
    let tagsId: number[] = projectTags.value ?? [];
    await projectService.storeProjectTags(projectCreated.id as number, tagsId);

    router.push({
      name: 'ProjectPage',
      params: {
        id: projectCreated.id,
      },
    });
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error al guardar el proyecto, intentelo más tarde!',
    });
  } finally {
    loading.value = false;
  }
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
        if (success) stepper.value.next();
      });
      break;
    case 4:
      fourthStepForm.value.validate().then((success: boolean) => {
        if (success) saveProject();
      });
      break;
    default:
      break;
  }
}
function optionsFn(date: string) {
  const defaultDate = defaultReleaseDate();
  return date >= defaultDate;
}

function optionsEndFn(date: string) {
  const defaultDate = project.release_date;
  return date >= defaultDate;
}

function defaultReleaseDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/*
function addFile(filesData: readonly File[]) {
  files.push(...filesData);
}
function removeFile(filesData: readonly File[]) {
  filesData.forEach((fileToRemove) => {
    const index = files.findIndex((file) => file === fileToRemove);
    if (index !== -1) {
      files.splice(index, 1);
    }
  });
}
*/
function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 2) {
      tags.splice(0, tags.length);
    } else {
      const needle = val.toLowerCase();
      const response = await tagService.get(needle);
      tags.splice(0, tags.length);
      tags.push(...response.data);
    }
  });
}

onMounted(() => {
  loadProjectTypes();
  project.release_date = defaultReleaseDate();
});

watch(
  () => project.release_date,
  () => {
    project.end_date = '';
  }
);
</script>

<template>
  <q-page padding class="flex justify-center items-center">
    <q-stepper
      vertical
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      flat
      class="stepperContainer"
    >
      <template v-slot:message>
        <q-banner v-if="step === 1" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">
            Comencemos el proyecto
          </div>
          <div class="text-subtitle2 text-accent">
            Comencemos definiendo los datos basicos del proyecto
          </div>
        </q-banner>

        <q-banner v-else-if="step === 2" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">
            Definamos el proyecto
          </div>
          <div class="text-subtitle2 text-accent">
            Definamos los datos del proyecto en el siguiente editor
          </div>
        </q-banner>
        <q-banner v-else-if="step === 3" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">
            Programemos su proyecto
          </div>
          <div class="text-subtitle2 text-accent">
            Definamos las fechas en las que se llevara a cabo
          </div>
        </q-banner>
        <q-banner v-else class="q-px-lg">
          <div class="text-h5 text-bold text-primary">Imagen</div>
          <div class="text-subtitle2 text-accent">
            Seleccione la imagen que represente su proyecto
          </div>
        </q-banner>
      </template>

      <q-step
        :name="1"
        title="Información Básica"
        icon="settings"
        :done="step > 1"
      >
        <q-form ref="firstStepForm" class="q-gutter-md">
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
                :options="projectTypes"
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
                :rules="[Rules.required, Rules.maxShortLength]"
              />
            </div>
            <div class="col-12">
              <q-select
                label="Tags"
                filled
                v-model="projectTags"
                use-input
                use-chips
                emit-value
                multiple
                input-debounce="0"
                :options="tags"
                @filter="filterFn"
                option-value="id"
                option-label="name"
                map-options
                :rules="[Rules.required]"
              />
            </div>
          </div>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Definición del proyecto"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-form ref="secondStepForm">
          <q-editor
            :toolbar="toolbarConfig.toolbarConfig"
            v-model="project.synopsis"
            min-height="10prem"
            hint="Aqui puedes explicar todo tu proyecto"
            filled
          />
        </q-form>
      </q-step>

      <q-step
        :name="3"
        title="Cronograma"
        icon="calendar_month"
        :done="step > 3"
      >
        <q-form class="q-gutter-md" ref="thirdStepForm">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="project.release_date"
                mask="date"
                label="Fecha de lanzamiento"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="project.release_date"
                        :options="optionsFn"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            unelevated
                            v-close-popup
                            label="Cerrar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="project.end_date"
                mask="date"
                :rules="['date']"
                label="Fecha de culminación"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="project.end_date"
                        :options="optionsEndFn"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            unelevated
                            v-close-popup
                            label="Cerrar"
                            color="primary"
                            flat
                          />
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

      <q-step :name="4" title="Imagen" icon="image">
        <!--<q-uploader
          flat
          bordered
          label="Imagenes del proyecto"
          multiple
          accept=".jpg, image/*"
          max-file-size="2048000"
          :hide-upload-btn="true"
          style="width: 100%; height: 450px"
          @added="addFile"
          @removed="removeFile"
        />-->

        <q-form ref="fourthStepForm">
          <q-file
            :disable="loading"
            filled
            clearable
            v-model="projectFile"
            label="Imagen del proyecto"
            :rules="[Rules.required, Rules.fileType, Rules.fileSize]"
          />
        </q-form>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-end">
          <q-btn
            unelevated
            v-if="step > 1"
            flat
            rounded
            color="primary"
            @click="($refs.stepper as QStepper).previous()"
            label="Atras"
            class="q-mr-sm"
            icon="chevron_left"
            :disable="loading"
          />

          <q-btn
            unelevated
            :loading="loading"
            @click="nextStep()"
            color="primary"
            :icon="step === 4 ? 'save' : 'chevron_right'"
            rounded
          >
            <strong>{{ step === 4 ? 'Terminar' : 'Continuar' }}</strong>
          </q-btn>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<style lang="scss" scoped>
.stepperContainer {
  width: 60%;
}

@media (max-width: $breakpoint-md-min) {
  .stepperContainer {
    width: 95%;
  }
}

@media (min-width: $breakpoint-md-max) {
  .stepperContainer {
    width: 60%;
  }
}
</style>
