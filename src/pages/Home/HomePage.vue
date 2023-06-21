<template>
    <q-page padding>
        <!--HERO-->
        <section class="row" style="min-height: 450px;">
            <div class="col-12 col-sm-12 col-md-6 q-pa-sm flex items-center justify-center">
                <div style="text-align: left; width: 80%;" class="q-py-md">
                    <small class="text-bold text-secondary text-uppercase">Inicia un nuevo proyecto aquí!</small>
                    <div class="text-h3 text-bold text-secondary ">Plataforma de integración de la
                        RED <span class="text-primary">CECIAC</span></div>
                    <div class="text-subtitle1 q-mb-sm text-accent">
                        Fortalecer capacidades de gestión de innovación (tecnológica, no tecnológica) con orientación
                        prosocial
                        en Universidades Consorcio GESIT
                    </div>

                    <div>
                        <q-form @submit.prevent="searchData" @reset="onReset" class="row q-col-gutter-md">

                            <q-select v-model="contentType" :options="options" outlined label="¿Que Buscas?"
                                option-label="label" option-value="value" class="col-12 col-md-3" map-options emit-value
                                filled />
                            <q-input v-model="searchTerm" type="text" label="Comenzar a buscar" filled
                                class="col-12 col-md-9">
                                <template v-slot:prepend>
                                    <q-icon name="search" />
                                </template>
                                <template v-slot:append>
                                    <q-btn rounded unelevated type="submit" color="primary" class="q-ml-sm"
                                        @click="searchData()">
                                        <strong>Buscar</strong>
                                    </q-btn>
                                </template>
                            </q-input>
                        </q-form>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 flex items-center justify-center">
                <div class="flex flex-center justify-center no-wrap" style="width: 80%;">
                    <div class="hero-decoration hero-decoration-first">

                    </div>

                    <div class="q-mx-sm hero-decoration hero-decoration-second">

                    </div>

                    <div class="hero-decoration hero-decoration-third">


                    </div>
                </div>
            </div>
        </section>

        <section class="q-mt-xl">
            <div
                style="text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <small class="text-uppercase text-center text-bold text-primary">Quienes nos conforman</small>
                <div class="text-center text-h4 text-bold text-secondary">
                    Nuestros Miembros
                </div>

            </div>

            <div style="width: 100%;" class="q-my-lg">

                <Carousel :wrap-around="true" :items-to-show="itemsToShow" :autoplay="5000">
                    <Slide v-for="slide in slides" :key="slide.id">
                        <div class="carousel__item">
                            <q-img :src="slide.src" spinner-color="primary" spinner-size="82px"
                                class="carousel__item-image" />
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>

            </div>

        </section>
        <!--
        <section class="q-mt-xl">
            <div class="text-center text-h5 text-bold text-secondary">
                Preguntas Frecuentes
            </div>
            <q-list class="bg-white">
                <q-expansion-item :label="item.question" v-for="(item, idx) in faq" :key="idx">
                    <q-card>
                        <q-card-section>
                            {{ item.answer }}
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </section>-->
    </q-page>
</template>
  
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const slide = ref(1);
const searchTerm = ref("");
const faq = [
    {
        question: "¿Qué es ceciac?",
        answer: "CECIAC es el Centro de Cómputo para el Instituto de Investigación de la Facultad de Ingeniería de la UNI."
    },
    {
        question: "¿Cómo puedo acceder a la red de CECIAC?",
        answer: "Debes solicitar una cuenta de usuario al administrador del CECIAC y seguir las instrucciones de acceso proporcionadas."
    },
    {
        question: "¿Qué recursos tecnológicos puedo encontrar en CECIAC?",
        answer: "CECIAC cuenta con diversos recursos tecnológicos como servidores, software especializado, sistemas de almacenamiento, entre otros."
    },
    {
        question: "¿Qué tipo de proyectos se pueden desarrollar en CECIAC?",
        answer: "CECIAC es un centro de cómputo que ofrece recursos y tecnología para el desarrollo de proyectos de investigación y desarrollo en diversas áreas de la ingeniería."
    },
    {
        question: "¿Cómo puedo obtener soporte técnico para los recursos de CECIAC?",
        answer: "Debes comunicarte con el personal técnico del CECIAC para solicitar soporte técnico y asistencia en caso de problemas con los recursos proporcionados."
    }
];
const slides = [
    { id: 1, title: 'citec', src: 'img/institutions/citec.jpg' },
    { id: 2, title: 'espol', src: 'img/institutions/epsol.jpg' },
    //{ id: 3, title: 'i3lab', src: 'img/institutions/i3lab.png' },
    //{ id: 4, title: 'IncubaUdec', src: 'img/institutions/IncubaUdeC.png' },
    //{ id: 5, title: 'Incutemi', src: 'img/institutions/incutemi.png' },
    //{ id: 6, title: 'Innicia', src: 'img/institutions/innicia.png' },

    { id: 7, title: 'Ucsm', src: 'img/institutions/ucsm.svg' },
    { id: 8, title: 'Unam', src: 'img/institutions/unam.jpg' },
    { id: 9, title: 'Utp', src: 'img/institutions/utp.jpg' },
    { id: 10, title: 'Upc', src: 'img/institutions/upc.png' }
];

const options = [
    {
        label: "Proyectos",
        value: 1
    },
    {
        label: "Eventos",
        value: 2
    },
    {
        label: "Blog",
        value: 3
    }
];

const itemsToShow = computed(() => {
    let value = 1;
    if ($q.screen.gt.sm) {
        value = 2;
    }
    if ($q.screen.gt.md) {
        value = 3;
    }
    if ($q.screen.gt.lg) {
        value = 4;
    }
    return value
});

const contentType = ref(1);
function searchData() {

    switch (contentType.value) {

        case 1:
            router.push('/explore/projects?searchTerm=' + searchTerm.value)
            break;
        case 2:
            router.push('/explore/events?searchTerm=' + searchTerm.value)
            break;
        case 3:
            router.push('/explore/blog?searchTerm=' + searchTerm.value)
            break;

        default:
            break;
    }
}

</script>
  
<style scoped lang="scss">
.carousel__item {
    background-color: white;
    border-radius: 5px;
    width: 80%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    .carousel__item-image {
        height: auto;
        width: 50%;
    }
}

.hero-decoration {
    height: 60vh;
    width: 33.33%;
    min-width: 150px;
    border-radius: 15px;
    background-position: center;
    background-size: cover;
}

.hero-decoration-first {
    background-image: url('assets/img/app/innovation1.webp');
}

.hero-decoration-second {
    background-image: url('assets/img/app/innovation2.jpeg');
    margin-top: 100px;
}

.hero-decoration-third {
    background-image: url('assets/img/app/innovation3.jpeg');
}
</style>