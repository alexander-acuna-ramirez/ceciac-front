<script setup lang="ts">
import { ref } from 'vue';
import BannerComponent from 'src/components/BannerComponent.vue';
const searchTerm = ref('');


</script>
<template>
    <q-page padding>
        <div class="row">
            <banner-component title="Explora, inspira y crea con nosotros"
                description="Encuentra proyectos innovadores, eventos únicos y posts interesantes en nuestra plataforma!"></banner-component>
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
        <div class="row q-mt-md">
            <div class="col-12 col-md-9">
                a
            </div>
            <div class="col-12 col-md-3">
                <div>
                    <q-input v-model="searchTerm" type="text" label="Buscar" filled>

                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>

                <q-card class="q-mt-md" flat>

                    <q-card-section>
                        <q-list>
                            <q-item clickable v-ripple disable>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" icon="feed" rounded />
                                </q-item-section>

                                <q-item-section>Posts</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" icon="event" rounded />
                                </q-item-section>

                                <q-item-section>Eventos</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-avatar rounded color="primary" text-color="white" icon="tips_and_updates" />
                                </q-item-section>

                                <q-item-section>Proyectos</q-item-section>
                            </q-item>


                        </q-list>
                    </q-card-section>
                </q-card>

                <q-card class="q-mt-md" flat>
                    <q-card-section>
                        <div class="text-subtitle2 text-bold text-secondary">
                            Categorias
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-list>
                            <q-item clickable v-ripple disable>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" icon="feed" rounded />
                                </q-item-section>

                                <q-item-section>Posts</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" icon="event" rounded />
                                </q-item-section>

                                <q-item-section>Eventos</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-avatar rounded color="primary" text-color="white" icon="tips_and_updates" />
                                </q-item-section>

                                <q-item-section>Proyectos</q-item-section>
                            </q-item>


                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<style lang="scss" scoped></style>