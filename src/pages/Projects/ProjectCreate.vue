<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { ProjectType, Project } from 'src/models';
import { QStepper } from 'quasar';
import { useQuasar } from 'quasar';
import BannerComponent from 'src/components/BannerComponent.vue';
import { ProjectTypeService, ProjectService } from 'src/services';
import { useRouter, useRoute, RouteParams } from 'vue-router';

const router = useRouter();
const route = useRoute();
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
  id_network: null,
  type_id: null,
  end_date: '',
});

const stepper = ref();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const files = ref(null);

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

  if (route.params.network) {
    let { network } = route.params as RouteParams;
    project.id_network = parseInt(network as string);
  }
  const response = await projectService.store(project);
  const projectCreated: Project = response.data;
  const filesData = new FormData();
  const dataFiles: File[] = files.value ?? [];
  dataFiles.forEach((e) => filesData.append('project_images[]', e));
  await projectService.uploadProjectFiles(
    filesData,
    projectCreated.id as number
  );

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
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!--<div class="col-12 flex flex-center justify-center">
        <banner-component description="Explora nuevos proyectos"
          title="Empieza un nuevo proyecto aqui!"></banner-component>
      </div>-->
      <div class="col-12 flex flex-center justify-center">
        <q-stepper v-model="step" ref="stepper" color="primary" animated flat style="width: 100%;"
          class="rounded-corners">

          <template v-slot:message>
            <q-banner v-if="step === 0" class="q-px-lg">
              <div class="text-h5 text-bold text-primary">
                Escojamos el tipo de proyecto
              </div>
              <div class="text-subtitle2 text-accent">
                Escoge el tipo de proyecto que deseas publicar a continuación
              </div>
            </q-banner>
            <q-banner v-else-if="step === 1" class="q-px-lg">
              <div class="text-h5 text-bold text-primary">
                Escojamos el tipo de proyecto
              </div>
              <div class="text-subtitle2 text-accent">
                Escoge el tipo de proyecto que deseas publicar a continuación
              </div>
            </q-banner>
            <q-banner v-else-if="step === 2" class="bg-green-8 text-white q-px-lg">
              The Ad template is disabled - this won't be displayed
            </q-banner>
            <q-banner v-else class="bg-blue-8 text-white q-px-lg">
              The final step is creating the ad...
            </q-banner>
          </template>



          <q-step :name="0" title="Información Básica" icon="settings" :done="step > 1">

            <div class="row q-col-gutter-xl">
              <div class="col-12 col-md-4">
                <q-card class="w-full">
                  <q-img src="~assets/img/app/projectTypes/projectType-1.webp" spinner-color="primary"
                    spinner-size="82px">
                    <div class="absolute-bottom text-subtitle1 text-center">
                      Emprendimiento
                    </div>
                  </q-img>
                </q-card>
              </div>

              <div class="col-12 col-md-4">
                <q-card class="w-full">
                  <q-img src="~assets/img/app/projectTypes/projectType-2.webp" spinner-color="primary"
                    spinner-size="82px">
                    <div class="absolute-bottom text-subtitle1 text-center">
                      Innovación
                    </div>
                  </q-img>
                </q-card>

              </div>
              <div class="col-12 col-md-4">
                <q-card class="w-full">
                  <q-img src="~assets/img/app/projectTypes/projectType-3.webp" spinner-color="primary"
                    spinner-size="82px">
                    <div class="absolute-bottom text-subtitle1 text-center">
                      <strong>Investigación</strong>
                    </div>
                  </q-img>
                </q-card>
              </div>
            </div>
          </q-step>
          <q-step :name="1" title="Información Básica" icon="settings" :done="step > 1" class="q-px-lg">
            <q-form ref="firstStepForm" class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input filled v-model="project.name" label="Titulo" hint="El titulo de tu proyecto" lazy-rules :rules="[
                      (val: any) =>
                        (val !== null && val !== '') ||
                        'Por favor, ingresa el titulo',
                    ]" />
                </div>
                <div class="col-12 col-md-6">
                  <q-select filled v-model="project.type_id" :options="projectTypes" option-value="id" option-label="name"
                    emit-value map-options label="Tipo de proyecto" :rules="[
                        (val: any) =>
                          (val !== null && val !== '') ||
                          'Por favor, ingresa el tipo de proyecto',
                      ]" />
                </div>
                <div class="col-12">
                  <q-input type="textarea" filled v-model="project.description" label="Descripción"
                    hint="Una descripción breve de tu proyecto" lazy-rules :rules="[
                        (val: any) =>
                          (val !== null && val !== '') ||
                          'Por favor ingresa  la descripción',
                        (val: any) => val.length <= 255 || 'La descripción no puede ser mayor a 255 caracteres.'
                      ]" />
                </div>
              </div>
            </q-form>
          </q-step>

          <q-step :name="2" title="Definición del proyecto" icon="create_new_folder" :done="step > 2">
            <q-form ref="secondStepForm" class="q-gutter-md">
              <q-editor :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  ['token', 'hr', 'link', 'custom_btn'],
                  ['fullscreen'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                ]" v-model="project.synopsis" min-height="10rem" hint="Aqui puedes explicar todo tu proyecto" />
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
            <q-file v-model="files" label="Selecciona las imagenes relacionadas a tu proyecto" filled style="width: 100%"
              use-chips multiple>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="flex justify-end">
              <q-btn v-if="step > 1" flat color="primary" @click="($refs.stepper as QStepper).previous()" label="Atras"
                class="q-ml-sm" icon="chevron_left" />

              <q-btn @click="nextStep()" color="primary" :icon="step === 4 ? 'save' : 'chevron_right'" rounded>
                <strong>{{ (step === 4) ? 'Terminar' : 'Continuar' }}</strong>
              </q-btn>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>
