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

const stepper = ref();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const files = reactive<File[]>([]);

onMounted(() => {
  loadProjectTypes();
  //loadTags();
  project.release_date = defaultReleaseDate();
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

/*async function loadTags() {
  try {
    const response = await tagService.get();
    const data: Tag[] = response.data;
    tags.push(...data);

    console.log(data);
  } catch (e) {
    console.error(e);
  }
}*/

async function saveProject() {
  if (route.params.network) {
    let { network } = route.params as RouteParams;
    project.id_network = parseInt(network as string);
  }
  const response = await projectService.store(project);
  const projectCreated: Project = response.data;
  const filesData = new FormData();
  const dataFiles: File[] = files;
  dataFiles.forEach((e) => filesData.append('project_images[]', e));
  await projectService.uploadProjectFiles(
    filesData,
    projectCreated.id as number
  );
  let tagsId: number[] = projectTags.value ?? [];
  await projectService.storeProjectTags(projectCreated.id as number, tagsId);

  router.push({
    name: 'ProjectPage',
    params: {
      id: projectCreated.id,
    },
  });
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
function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 3) {
      tags.splice(0, tags.length);
    } else {
      const needle = val.toLowerCase();
      //const response = await api.get('api/v1/filtered-tags?search=' + needle);
      const response = await tagService.get(needle);
      tags.splice(0, tags.length);
      tags.push(...response.data);
    }
  });
}

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
          <div class="text-h5 text-bold text-primary">
            Seleccionemos los recursos de su proyecto
          </div>
          <div class="text-subtitle2 text-accent">
            Seleccione las imagenes que describiran su proyecto
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
                outlined
                :rules="[Rules.required, Rules.maxLength]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                outlined
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
                outlined
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
                outlined
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
            outlined
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
                outlined
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
                            label="Close"
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
                outlined
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
                            label="Close"
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

      <q-step :name="4" title="Multimedia" icon="photo_library">
        <q-uploader
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
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-end">
          <q-btn
            unelevated
            v-if="step > 1"
            flat
            color="primary"
            @click="($refs.stepper as QStepper).previous()"
            label="Atras"
            class="q-ml-sm"
            icon="chevron_left"
          />

          <q-btn
            unelevated
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
