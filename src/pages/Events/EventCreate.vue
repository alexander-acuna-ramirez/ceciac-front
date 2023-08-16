<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { QStepper, useQuasar } from 'quasar';
import { Event } from 'src/models/Event';
import { EventService, TagService } from 'src/services';
import { Rules } from 'src/utils';
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { useToolbarConfig } from 'src/composables/useToolbarConfig';
import { Tag } from 'src/models';

const cropPreview = ref('');
const eventService = new EventService();
const tagService = new TagService();
const toolbarConfig = useToolbarConfig();
const route = useRoute();
const router = useRouter();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const fourthStepForm = ref();
const $q = useQuasar();
const step = ref(1);
const stepper = ref();
const eventTags = ref(null);
const loading = ref(false);
const event = reactive<Event>({
  title: '', //
  description: '', //
  event_content: '',
  id_network: null, //
  id_user: null, //
  id_file: null,
  location: '',
  date_time: '', //
  end_date_time: '', //
  is_public: 1,
  is_online: 1, //
});
const tags = reactive<Tag[]>([]);
const eventConfig = [
  { label: 'Publico', value: 1 },
  { label: 'Privado', value: 0 },
];
const eventType = [
  { label: 'Presencial', value: 0 },
  { label: 'Virtual', value: 1 },
];
const eventFile = ref();

function nextStep() {
  switch (step.value) {
    case 1:
      firstStepForm.value.validate().then((success: boolean) => {
        if (success) stepper.value.next();
      });
      break;
    case 2:
      event.event_content == ''
        ? $q.notify({
            color: 'negative',
            message: 'Tu evento necesita una descripción!',
            icon: 'report_problem',
          })
        : stepper.value.next();
      break;
    case 3:
      if (!(new Date(event.date_time) < new Date(event.end_date_time))) {
        $q.notify({
          color: 'negative',
          message:
            'La fecha de finalización debe ser posterior a la de inicio!',
          icon: 'report_problem',
        });
        return;
      }
      thirdStepForm.value.validate().then((success: boolean) => {
        if (success) {
          stepper.value.next();
        }
      });
      break;
    case 4:
      fourthStepForm.value.validate().then((success: boolean) => {
        if (success) {
          saveEvent();
        }
      });
      break;
    default:
      break;
  }
}

async function saveEvent() {
  try {
    loading.value = true;
    const { network } = route.params as RouteParams;
    event.id_network = parseInt(network as string);
    const res = await eventService.store(event);
    const eventCreated = res.data as Event;
    const fileData = new FormData();
    fileData.append('event_file', eventFile.value);
    const eventId =
      typeof eventCreated.id !== 'undefined' ? eventCreated.id : '';
    await eventService.uploadEventFile(fileData, eventId);
    const tagsId: number[] = eventTags.value ?? [];
    await eventService.storeEventTags(eventId, tagsId);
    router.push('/event/detail/' + eventCreated.id);
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudo crear el evento, intentalo más tarde!',
    });
  } finally {
    loading.value = false;
  }
}

function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 2) {
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

function defaultReleaseDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

function optionsFn(date: string) {
  const defaultDate = defaultReleaseDate();
  return date >= defaultDate;
}

function optionsEndFn(date: string) {
  const defaultDate = event.date_time;
  return new Date(date) >= new Date(defaultDate);
}

watch(eventFile, (file: File) => {
  cropPreview.value = URL.createObjectURL(file);
});
</script>

<template>
  <q-page padding class="flex justify-center items-center">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      flat
      vertical
      class="rounded-corners stepperContainer"
    >
      <template v-slot:message>
        <q-banner v-if="step === 1" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">Comencemos el evento</div>
          <div class="text-subtitle2 text-accent">
            Comencemos definiendo los datos basicos del evento
          </div>
        </q-banner>

        <q-banner v-else-if="step === 2" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">Definamos el Evento</div>
          <div class="text-subtitle2 text-accent">
            Describa a continuación el evento
          </div>
        </q-banner>
        <q-banner v-else-if="step === 3" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">
            Programemos su evento
          </div>
          <div class="text-subtitle2 text-accent">
            Definamos las fechas en las que se sucedera su evento
          </div>
        </q-banner>
        <q-banner v-else-if="step === 4" class="q-px-lg">
          <div class="text-h5 text-bold text-primary">
            Imagenes de su evento
          </div>
          <div class="text-subtitle2 text-accent">
            Escoga la imagen que mejor defina su evento
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
                outlined
                v-model="event.title"
                label="Titulo"
                hint="El titulo de tu evento"
                lazy-rules
                :rules="[Rules.required, Rules.maxLength]"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="event.is_public"
                :options="eventConfig"
                option-value="value"
                option-label="label"
                emit-value
                map-options
                label="Tipo de evento"
                :rules="[(val) => val !== null && val !== '']"
              />
            </div>
            <div class="col-12">
              <q-input
                type="textarea"
                outlined
                v-model="event.description"
                label="Descripción"
                hint="Una descripción breve de tu evento"
                lazy-rules
                :rules="[Rules.required, Rules.maxShortLength]"
              />
            </div>

            <div class="col-12">
              <q-select
                label="Tags"
                outlined
                v-model="eventTags"
                use-input
                use-chips
                multiple
                input-debounce="0"
                :options="tags"
                @filter="filterFn"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                :rules="[Rules.required]"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                outlined
                v-model="event.is_online"
                :options="eventType"
                option-value="value"
                option-label="label"
                emit-value
                map-options
                label="Modalidad"
                :rules="[(val) => val !== null]"
              />
            </div>

            <div class="col-12 col-md-6" v-if="event.is_online == 0">
              <q-input
                outlined
                v-model="event.location"
                label="Ubicación"
                lazy-rules
                :rules="[Rules.required]"
              />
            </div>
          </div>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Definición del evento"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-form ref="secondStepForm" class="q-gutter-md">
          <q-editor
            :toolbar="toolbarConfig.toolbarConfig"
            v-model="event.event_content"
            min-height="10rem"
            hint="Aqui puedes explicar todo tu evento"
          />
        </q-form>
      </q-step>

      <q-step :name="3" title="Programar evento" icon="event" :done="step > 2">
        <q-form ref="thirdStepForm" class="q-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="event.date_time"
              label="Inicio del evento"
              :rules="[Rules.required]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="event.date_time"
                      mask="YYYY-MM-DD HH:mm"
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="event.date_time"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
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
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6">
            <q-input
              :disable="event.date_time == null || event.date_time == ''"
              outlined
              v-model="event.end_date_time"
              label="Fin del evento"
              :rules="[Rules.required]"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="event.end_date_time"
                      mask="YYYY-MM-DD HH:mm"
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

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="event.end_date_time"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
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
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-form>
      </q-step>

      <q-step :name="4" title="Imagenes" icon="image" :done="step > 3">
        <q-form ref="fourthStepForm">
          <q-file
            :disable="loading"
            outlined
            clearable
            v-model="eventFile"
            label="Imagen del evento"
            :rules="[Rules.required, Rules.fileType, Rules.fileSize]"
          />
        </q-form>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-end">
          <q-btn
            unelevated
            :disable="loading"
            v-if="step > 1"
            flat
            color="accent"
            @click="($refs.stepper as QStepper).previous()"
            label="Atras"
            class="q-mr-sm"
            icon="chevron_left"
            rounded
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
