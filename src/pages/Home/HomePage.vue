<template>
    <q-page padding>
        <!--HERO-->
        <section class="row" style="min-height: 650px;">
            <div class="col-12 col-sm-12 col-md-6 q-pa-sm flex items-center">
                <div style="text-align: center;" class="q-py-lg">
                    <small class="text-bold text-secondary text-uppercase">Inicia un nuevo proyecto aquí!</small>
                    <div class="text-h2 text-bold text-secondary ">Plataforma de integración de la
                        RED <span class="text-primary">CECIAC</span></div>
                    <div class="text-subtitle1 q-mb-sm text-accent">
                        Fortalecer capacidades de gestión de innovación (tecnológica, no tecnológica) con orientación
                        prosocial
                        en Universidades Consorcio GESIT
                    </div>

                    <div>
                        <q-input v-model="searchTerm" type="text" label="Label" filled />
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-12 col-md-6 flex items-center justify-center">
                <div class="flex flex-center justify-center no-wrap">
                    <div
                        style="height: 450px; min-width: 150px; border-radius: 15px; background-image: url('src/assets/img/app/innovation1.webp'); background-position: center; background-size: cover;">

                    </div>

                    <div class="q-mx-sm"
                        style="height: 450px; min-width: 150px; border-radius: 15px; margin-top: 100px;  background-image: url('src/assets/img/app/innovation2.jpeg'); background-position: center; background-size: cover;">

                    </div>

                    <div
                        style="height: 450px; min-width: 150px; border-radius: 15px; background-image: url('src/assets/img/app/innovation3.jpeg'); background-position: center; background-size: cover;">

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
                <div class="bg-white rounded-borders q-mt-lg" style=" width: 80%;">
                    <q-img width="15%" src="src/assets/img/app/institutions/ucsm.svg" spinner-size="82px"
                        style="filter: grayscale(100%);" />
                    <q-img width="15%" src="src/assets/img/app/institutions/citec.jpg" spinner-size="82px" />
                    <q-img width="15%" src="src/assets/img/app/institutions/epsol.jpg" spinner-size="82px" />
                    <q-img width="15%" src="src/assets/img/app/institutions/IncubaUdeC.png" spinner-size="82px" />
                </div>
            </div>

        </section>
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

        </section>
    </q-page>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
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
</script>
  
<style scoped lang="scss"></style>