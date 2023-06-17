<script setup lang="ts">
import { Project, Network, ProjectType } from 'src/models';
import { useQuasar } from 'quasar';
import { ExploreService, BlogService, NetworkService } from 'src/services';
import { onMounted, reactive, ref, watch } from 'vue';
import ProjectCard from '../Projects/components/ProjectCard.vue';
import { useRoute } from 'vue-router';

interface FilterOption {
    label: string,
    value: any,
    disable: boolean
}
const $q = useQuasar();
const exploreService = new ExploreService();
const blogService = new BlogService();
const networkService = new NetworkService();
const projects = reactive<Project[]>([]);
const optionsCategory = reactive<FilterOption[]>([]);
const route = useRoute();
const paginationData = reactive({
    current_page: 1,
    total: 0,
    last_page: 0,
    perpage: 10,
    sortOrder: "desc",
    sortBy: "name",
});

const perpageOptions = [
    {
        label: "5",
        value: 5,
    },
    {
        label: "10",
        value: 10,
    },
    {
        label: "20",
        value: 20,
    },
    {
        label: "50",
        value: 50,
    }
]

const sortOptions = [
    {
        label: "Nombre",
        value: "name",
    },
    {
        label: "Descripción",
        value: "descripcion",
    },
    {
        label: "Institución",
        value: "id_network",
    },
    {
        label: "Fecha de creación",
        value: "created_at",
    }
]

const sortOrder = [
    {
        label: "Ascendente",
        value: "asc",
    },
    {
        label: "Descendente",
        value: "desc",
    },
]
const current = ref(1);
const networks = reactive<Network[]>([])
const searchData = reactive({
    start_date: '',
    end_date: '',
    searchTerm: '',
    category: [],
    institutions: [],
});
async function getPosts(page = 1) {
    $q.loading.show();
    try {
        const response = await exploreService.getProjects({
            page,
            perpage: paginationData.perpage,
            ...searchData
        });
        projects.splice(0, projects.length);
        projects.push(...response.data.data);
        Object.assign(paginationData, response.data);
    } catch (e) {
        console.error(e);
    } finally {
        $q.loading.hide();
    }
}

async function getCategories() {
    const response = await exploreService.getProjectTypes();
    const categories: ProjectType[] = response.data;

    optionsCategory.push(...categories.map((e) => {
        return {
            label: e.name, value: e.id, disable: false
        }
    }));
}

async function getNetworks() {
    const response = await networkService.getNetworks();
    networks.push(...response.data);
}

function clearFilters() {
    Object.assign(searchData, {
        start_date: '',
        end_date: '',
        searchTerm: '',
        category: [],
        institutions: [],
    });
    getPosts(1);
}



watch(current, (val) => {
    getPosts(val);
});

watch(() => searchData.searchTerm, (term) => {
    if (term.length >= 5 || term.length == 0 || term == null || term == undefined) {
        getPosts(1);
    }
    //getPosts(1);
});
watch(() => paginationData.perpage, (page) => {
    getPosts(1);
});
watch(() => paginationData.sortBy, (sortBy) => {
    getPosts(1);
});
watch(() => paginationData.sortOrder, (sortOrder) => {
    getPosts(1);
})

onMounted(() => {
    if (route.query.searchTerm) {
        searchData.searchTerm = route.query.searchTerm as string;
    }
    getPosts();
    getCategories();
    getNetworks();
});
</script>
<template>
    <q-page padding>
        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-3">
                <q-card flat class=" rounded-corners ">

                    <q-card-section>
                        <span class="text-subtitle1 text-accent text-bold">Categorias</span>
                        <q-option-group v-model="searchData.category" type="checkbox" :options="optionsCategory">
                            <template v-slot:label="opt">
                                <div class="row items-center">
                                    <span class="text-subtitle2 text-accent">{{ opt.label }}</span>
                                </div>
                            </template>
                        </q-option-group>
                    </q-card-section>
                    <q-separator spaced inset />
                    <q-card-section>
                        <span class="text-subtitle1 text-accent text-bold">Fechas</span>
                        <div class="row q-col-gutter-md">
                            <q-input filled v-model="searchData.start_date" mask="date" :rules="['date']"
                                class="col-12 col-md-6" label="Inicio">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="searchData.start_date">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                            <q-input filled v-model="searchData.end_date" mask="date" :rules="['date']"
                                class="col-12 col-md-6" label="Fin">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="searchData.end_date">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                    </q-card-section>
                    <q-card-section>
                        <span class="text-subtitle1 text-accent text-bold">Instituciones</span>
                        <q-select filled v-model="searchData.institutions" :options="networks" label="Institución"
                            emit-value map-options option-label="name" option-value="id" multiple use-chips>

                            <template v-slot:option="{ itemProps, opt, }">
                                <q-item v-bind="itemProps">

                                    <q-item-section>
                                        <div
                                            style="display:flex; flex-direction: row; align-content: start; align-items: start; width: 100%; ">

                                            <q-avatar v-if="opt.logo" size="40px" font-size="52px" rounded
                                                text-color="white">
                                                <img :src="opt.logo.fullpath" alt="">
                                            </q-avatar>
                                            <q-avatar v-else size="40px" font-size="52px" class="my-img" rounded>
                                                <q-img src="~assets/img/app/user/user-profile-default.jpg"
                                                    spinner-color="primary" spinner-size="82px" height="100%">

                                                </q-img>
                                            </q-avatar>

                                            <span class="q-ml-md">{{ opt.name }}</span>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </q-card-section>
                    <q-card-section class="flex justify-end">
                        <q-btn color="accent" @click="clearFilters()" rounded flat>
                            <strong>Limpiar Filtros</strong>
                        </q-btn>

                        <q-btn color="primary" @click="getPosts(1)" rounded>
                            <strong>Filtrar</strong>
                        </q-btn>

                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-9">
                <div>
                    <q-toolbar class="bg-white text-accent q-py-md rounded-corners">
                        <q-input v-model="searchData.searchTerm" type="text" label="Buscar" filled>
                            <template v-slot:append>
                                <q-icon v-if="searchData.searchTerm === ''" name="search" />
                                <q-icon v-else name="clear" class="cursor-pointer" @click="searchData.searchTerm = ''" />
                            </template></q-input>
                        <q-space />

                        <!--<q-btn flat round dense icon="apps" class="q-mr-xs" />
                                                                <q-btn flat round dense icon="more_vert" />-->


                        <q-select v-model="paginationData.perpage" :options="perpageOptions" option-label="label"
                            option-value="value" label="Numero de elementos" filled style="min-width: 200px;" map-options
                            emit-value />

                        <q-select v-model="paginationData.sortBy" :options="sortOptions" option-label="label"
                            option-value="value" label="Ordenar por" filled style="min-width: 200px;" class="q-ml-sm"
                            map-options emit-value />

                        <q-select v-model="paginationData.sortOrder" :options="sortOrder" option-label="label"
                            option-value="value" label="Orden" filled style="min-width: 200px;" class="q-ml-sm" map-options
                            emit-value />
                    </q-toolbar>
                    <div class="q-my-md">
                        <span class="text-subtitle1 text-accent ">Mostrando {{ projects.length }} resultados</span>

                    </div>
                    <div class="gallery q-mt-md">

                        <project-card v-for="project in projects" :project="project" :key="project.id"></project-card>
                    </div>
                    <div class="flex flex-center q-mt-md" v-if="paginationData.last_page > 1">
                        <q-pagination v-model="current" :max="paginationData.last_page" />
                    </div>
                </div>
            </div>
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
