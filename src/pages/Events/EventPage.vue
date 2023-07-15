<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { EventService } from 'src/services';
import { RouteParams, useRoute } from 'vue-router';
import { Event } from 'src/models/Event';

const eventService = new EventService();
const route = useRoute();

const images = ref([
    'https://picsum.photos/id/1018/1920/1080',
    'https://picsum.photos/id/1025/1920/1080',
    'https://picsum.photos/id/1035/1920/1080',
]);
const loading = ref(false);
const slide = ref(1);
const event = reactive<Event>({
    title: '',
    description: '',
    event_content: '',
    id_network: '',
    id_user: '',
    id_file: '',
    location: '',
    date_time: '',
    end_date_time: '',
    is_public: 1,
    is_online: 1,
});

function participate() {
    // Aquí se podría agregar la lógica para participar en el proyecto
}
async function loadEvent() {
    try {
        let { id } = route.params as RouteParams;
        const response = await eventService.show(id as string);
        Object.assign(event, response.data);
    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    loadEvent();
});
</script>
<template>
    <q-page padding class="q-px-xl">
        <div class="row q-col-gutter-md">
            <div class="col-12">
                <q-img :src="event.file?.fullpath" :ratio="16 / 9" spinner-color="primary" spinner-size="82px"
                    height="350px" style="border-radius: 5px;" />
            </div>
        </div>
        <div class="row q-col-gutter-md q-mt-sm">

            <div class="col-9">
                <q-card flat>
                    <q-card-section>
                        <div class="q-pa-md text-primary text-bold text-h4">
                            {{ event.title }}
                        </div>
                        <div class="q-pa-md" v-html="event.event_content"></div>
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
                                <q-img :src="event.network?.logo?.fullpath" spinner-color="primary"
                                    spinner-size="82px"></q-img>
                            </q-avatar>

                            {{ event.network?.name }}
                        </div>
                    </q-card-section>
                </q-card>
                <q-card flat class="q-mt-sm">
                    <q-card-section>
                        <div class="text text-bold text-primary">
                            Ubicación
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div>
                            {{ event.location }}
                        </div>
                    </q-card-section>
                </q-card>

                <q-card flat class="q-mt-sm">
                    <q-card-section>
                        <div class="text text-bold text-primary">
                            Datos Generales
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-list bordered separator>

                            <q-item clickable v-ripple>
                                <q-item-section>
                                    <q-item-label overline class="text-primary">Fecha de Evento</q-item-label>
                                    <q-item-label class="text-secondary">{{ event.date_time }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section>
                                    <q-item-label overline class="text-primary">Fecha de lanzamiento</q-item-label>
                                    <q-item-label class="text-secondary">{{ event.end_date_time }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section>
                                    <q-item-label overline class="text-primary">Modalidad</q-item-label>
                                    <q-item-label class="text-secondary">{{ (event.is_online == 1) ? "Virtual" :
                                        "Presencial" }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>

                    </q-card-section>
                </q-card>

                <q-card flat class="q-mt-sm">
                    <q-card-section>
                        <div class="text text-bold text-primary">
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

                <q-btn unelevated class="q-mt-md" style="width: 100%;" color="primary" label="Participar"
                    @click="participate" />
            </div>
        </div>
    </q-page>
</template>

<style scoped>
.full-width {
    width: 100%;
}
</style>
