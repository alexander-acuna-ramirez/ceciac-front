<script setup lang="ts">
import { ref, reactive } from 'vue';
import { QStepper, useQuasar } from 'quasar';
import { Event } from 'src/models/Event';
import BannerComponent from 'src/components/BannerComponent.vue';
import { EventService } from 'src/services';
import { Rules } from 'src/utils';
import { useRoute, RouteParams, useRouter } from 'vue-router';

const eventService = new EventService();
const route = useRoute();
const router = useRouter();
const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();
const $q = useQuasar();
const step = ref(1);
const stepper = ref();
const event = reactive<Event>({
    title: '',//
    description: '',//
    event_content: '',
    id_network: null,//
    id_user: null,//
    id_file: null,
    location: '',
    date_time: '',//
    end_date_time: '',//
    is_public: 1,
    is_online: 1//
});

const bannerTitle = "Difunde un nuevo evento desde aqui!";
const eventConfig = [
    { label: "Publico", value: 1 },
    { label: "Privado", value: 0 },
];

const eventType = [
    { label: "Presencial", value: 1 },
    { label: "Virtual", value: 0 },
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
            console.log("HERE");
            thirdStepForm.value.validate().then((success: boolean) => {
                if (success) {
                    console.log("HERE 2");
                    saveEvent();
                }
            });
            break;
        default:
            break;
    }
}

async function saveEvent() {
    const { network } = route.params as RouteParams;
    event.id_network = parseInt(network as string);
    const res = await eventService.store(event);
    const eventCreated = res.data as Event;
    const fileData = new FormData();
    fileData.append('event_file', eventFile.value);
    const eventId = typeof eventCreated.id !== 'undefined' ? eventCreated.id : '';
    const response = await eventService.uploadEventFile(fileData, eventId);

    router.push('/event/detail/' + eventCreated.id);
}
</script>

<template>
    <q-page padding>

        <div class="row q-col-gutter-md">
            <div class="col-12 flex flex-center justify-center">
                <banner-component style="width: 90%" :title="bannerTitle"
                    description="Explora otro eventos similares"></banner-component>
            </div>
            <div class="col-12 flex flex-center justify-center">
                <q-stepper v-model="step" ref="stepper" color="primary" animated flat style="width: 90%">
                    <q-step :name="1" title="Información Básica" icon="settings" :done="step > 1">
                        <q-form ref="firstStepForm" class="q-gutter-md">
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-md-6">
                                    <q-input filled v-model="event.title" label="Titulo" hint="El titulo de tu evento"
                                        lazy-rules :rules="[
                                                (val) =>
                                                    (val !== null && val !== '') ||
                                                    'Por favor, ingresa el titulo',
                                            ]" />
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-select filled v-model="event.is_public" :options="eventConfig" option-value="value"
                                        option-label="label" emit-value map-options label="Tipo de evento" :rules="[
                                                (val) =>
                                                    (val !== null && val !== '') ||
                                                    'Por favor, ingresa el titulo',
                                            ]" />
                                </div>
                                <div class="col-12">
                                    <q-input type="textarea" filled v-model="event.description" label="Descripción"
                                        hint="Una descripción breve de tu evento" lazy-rules :rules="[
                                                (val) =>
                                                    (val !== null && val !== '') ||
                                                    'Por favor ingresa  la descripción',
                                            ]" />
                                </div>

                                <div class="col-12 col-md-6">
                                    <q-input filled v-model="event.date_time" label="Inicio del evento" :rules="[
                                            (val) =>
                                                (val !== null && val !== '') ||
                                                'Por favor ingresa el comienzo del evento',
                                        ]">
                                        <template v-slot:prepend>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date v-model="event.date_time" mask="YYYY-MM-DD HH:mm">
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>

                                        <template v-slot:append>
                                            <q-icon name="access_time" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-time v-model="event.date_time" mask="YYYY-MM-DD HH:mm" format24h>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>


                                <div class="col-12 col-md-6">
                                    <q-input filled v-model="event.end_date_time" label="Fin del evento" :rules="[
                                            (val) =>
                                                (val !== null && val !== '') ||
                                                'Por favor selecciona el termino del evento',
                                        ]">
                                        <template v-slot:prepend>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date v-model="event.end_date_time" mask="YYYY-MM-DD HH:mm">
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>

                                        <template v-slot:append>
                                            <q-icon name="access_time" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-time v-model="event.end_date_time" mask="YYYY-MM-DD HH:mm" format24h>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-time>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-12 col-md-6">
                                    <q-select filled v-model="event.is_online" :options="eventType" option-value="value"
                                        option-label="label" emit-value map-options label="Tipo de evento" :rules="[
                                                (val) =>
                                                    (val !== null && val !== '') ||
                                                    'Por favor, ingresa el tipo de evento',
                                            ]" />
                                </div>


                                <div class="col-12 col-md-6" v-if="event.is_online == 1">
                                    <q-input filled v-model="event.location" label="Ubicación" lazy-rules :rules="[
                                            (val) =>
                                                (val !== null && val !== '') ||
                                                'Por favor, ingresa la ubicación',
                                        ]" />
                                </div>
                            </div>
                        </q-form>
                    </q-step>

                    <q-step :name="2" title="Definición del proyecto" icon="create_new_folder" :done="step > 2">
                        <q-form ref="secondStepForm" class="q-gutter-md">
                            <q-editor v-model="event.event_content" min-height="10rem"
                                hint="Aqui puedes explicar todo tu proyecto" />
                        </q-form>
                    </q-step>

                    <q-step :name="3" title="Cronograma" icon="calendar_month" :done="step > 3">
                        <q-form ref="thirdStepForm" class="q-gutter-md">
                            <q-file filled v-model="eventFile" label="Imagen del proyecto"
                                :rules="[Rules.required, Rules.fileType, Rules.fileSize]" />
                        </q-form>
                    </q-step>


                    <template v-slot:navigation>
                        <q-stepper-navigation class="flex justify-end">
                            <q-btn v-if="step > 1" flat color="primary" @click="($refs.stepper as QStepper).previous()"
                                label="Atras" class="q-ml-sm" icon="chevron_left" />
                            <q-btn @click="nextStep()" color="primary" :label="step === 3 ? 'Terminar' : 'Continuar'"
                                :icon="step === 3 ? 'save' : 'chevron_right'" />
                        </q-stepper-navigation>
                    </template>
                </q-stepper>
            </div>
        </div>
    </q-page>
</template>
