<script setup lang="ts">
import { ProjectType, Project } from 'src/models';
import BannerComponent from 'src/components/BannerComponent.vue';
import { ExploreService } from 'src/services';
import { onMounted, reactive, ref, watch } from 'vue';
import ProjectCard from '../Projects/components/ProjectCard.vue';

const searchTerm = ref('');
const exploreService = new ExploreService();
const projectTypes = reactive<ProjectType[]>([]);
const projects = reactive<Project[]>([]);
const paginationData = reactive({
    current_page: 1,
    total: 0,
    last_page: 0,
});
const current = ref(1);
const projectType = ref();

async function getProjectTypes() {
    const response = await exploreService.getProjectTypes();
    projectTypes.push(...response.data);
}

async function getProjects(page = 1) {
    const response = await exploreService.getProjects(page, searchTerm.value, projectType.value);
    projects.splice(0, projects.length);
    projects.push(...response.data.data);
    Object.assign(paginationData, response.data);
}
watch(current, (val) => {
    getProjects(val);
})

onMounted(() => {
    getProjectTypes();
    getProjects();
});
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
    <div class="row q-mt-md q-col-gutter-md">
        <div class="col-12 col-md-9">
            <div>
                <div class="row q-col-gutter-md">
                    <project-card v-for="project in projects" :project="project" :key="project.id"
                        class="col-12 col-sm-6 col-md-4 col-lg-3"></project-card>
                </div>
                <div class="flex flex-center q-mt-md">
                    <q-pagination v-model="current" :max="paginationData.last_page" />
                </div>
            </div>
        </div>
        <div class="col-12 col-md-3">
            <div>
                    <q-input v-model="searchTerm" type="text" label="Buscar" outlined>
                        <template v-slot:append>
                            <q-btn color="primary" icon="search" @click="getProjects()" flat />
                        </template>
                    </q-input>
                </div>

                <!--<q-card class="q-mt-md" flat>

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
                    </q-card>-->

                <q-card class="q-mt-md" flat>
                    <q-card-section>
                        <div class="text-subtitle2 text-bold text-secondary">
                            Tipos de proyectos
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-list>
                            <q-item clickable v-ripple v-for="(category, key) in     projectTypes    " :key="key"
                                @click="projectType = category.id; getProjects();" :active="projectType == category.id">
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white" size="sm">{{
                                        category.projects_count
                                    }}</q-avatar>
                                </q-item-section>

                                <q-item-section>{{ category.name }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<style lang="scss" scoped></style>
