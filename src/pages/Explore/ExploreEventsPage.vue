<script setup lang="ts">
import { Event } from 'src/models';
import BannerComponent from 'src/components/BannerComponent.vue';
import { ExploreService } from 'src/services';
import { onMounted, reactive, ref, watch } from 'vue';
import EventCard from '../Events/components/EventCard.vue';

const exploreService = new ExploreService();
const events = reactive<Event[]>([]);
const paginationData = reactive({
    current_page: 1,
    total: 0,
    last_page: 0,
});
const current = ref(1);
const dateData = reactive({
    from: "",
    to: "",
});
const searchData = reactive({
    start_date: "",
    end_date: "",
    searchTerm: ""
})
async function getEvents(page = 1) {
    const response = await exploreService.getEvents(page, searchData.start_date, searchData.end_date, searchData.searchTerm);
    events.splice(0, events.length);
    events.push(...response.data.data);
    Object.assign(paginationData, response.data);
}
watch(current, (val) => {
    getEvents(val);
})

onMounted(() => {
    getEvents();
});
</script>
<template>
    <q-page padding>
    <div class="row">
        <banner-component title="Explora, inspira y crea con nosotros"
            description="Encuentra proyectos innovadores, eventos únicos y posts interesantes en nuestra plataforma!"
            class="border-corners"></banner-component>
    </div>
    <!--<div class="row">
            <div class="col-12">
                <div class="text-h4 text-primary text-bold">
                    Explora nuevos proyectos
                </div>
                <div class="text-subtitle2 text-secondary text-bold">
                    Busca los proyectos que más te interesen!
                </div>
            </div>
        </div>-->
    <div class="row q-mt-md q-col-gutter-md">
        <div class="col-12 col-md-3">
            <q-card flat>
                <q-card-section class="row q-col-gutter-md">
                        <div class="col-12 col-md-12">
                            <q-input v-model="searchData.searchTerm" type="text" label="Buscar" outlined>
                            </q-input>

                            <q-btn style="width: 100%;" color="primary" icon="filter_alt" label="Filtrar"
                                @click="getEvents()" class="q-mt-md" />
                        </div>
                        <!--
                                    <div class="col-12 col-md-2">
                                        <q-input label="Fecha de Inicio" outlined v-model="searchData.start_date" mask="date">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="dateData.from">
                                                    <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-2">
                            <q-input label="Fecha de Inicio" outlined v-model="searchData.end_date" mask="date">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="dateData.from">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>-->
                </q-card-section>
            </q-card>
        </div>
        <div class="col-12 col-md-9">
            <div>
                <div class="gallery">
                    <event-card v-for="event in events" :event="event" :key="event.id"></event-card>
                </div>
                <div class="flex flex-center q-mt-md">
                    <q-pagination v-model="current" :max="paginationData.last_page" />
                </div>
            </div>
        </div>
        <!--<div class="col-12 col-md-3">
                <div>
                    <q-input v-model="searchData.searchTerm" type="text" label="Buscar" outlined>
                                    <template v-slot:append>
                                        <q-btn color="primary" icon="search" @click="getEvents()" flat />
                                    </template>
                                </q-input>
                            </div>

                            <div class="q-mt-md flex row">
                                <div class="col-12 col-md-6">
                                    <q-input outlined v-model="dateData.from" mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date v-model="dateData.from">
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                    <q-input outlined v-model="dateData.from" mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                    <q-date v-model="dateData.from">
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

                        </div>-->
        </div>
    </q-page>
</template>
<style lang="scss" scoped>
.gallery {
    display: grid;
    gap: 3rem;
    grid-auto-rows: 27rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}


@media (max-width: $breakpoint-md-min) {
    .gallery {
        display: grid;
        gap: 1rem;
        grid-auto-rows: 30rem;
        grid-template-columns: 1fr;
    }
}
</style>
