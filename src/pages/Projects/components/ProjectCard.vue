<script lang="ts" setup>
import { Project } from 'src/models';
import { Functions } from 'src/utils';
import { ref } from 'vue';
const slide = ref(1);
defineProps({
    project: {
        required: true,
        type: Object as () => Project,
    },
});

function formatDate(date: string) {
    const fecha = new Date("2003-07-02");
    const fechaFormateada = fecha.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return fechaFormateada;
}
</script>
<template>
    <q-card class="my-card rounded-corners" flat bordered>

        <q-img v-if="project.files?.length" :src="project.files[0].fullpath" :name="project.files[0].filename"
            spinner-color="primary" spinner-size="82px" style="height: 45%; ">
            <q-chip :label="project.type?.name" />
        </q-img>
        <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px"
            style="height: 45%; ">
            <q-chip :label="project.type?.name" />
        </q-img>

        <q-card-section style="height: 35%;">
            <div class="text-subtitle1 text-bold text-secondary">
                <router-link :to="'/project/detail/' + project.id" class="post-title">{{ project.name }}</router-link>
            </div>

            <div class="text-caption text-description post-desc">
                {{ project.description }}
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: 15%;">
            <div class="row no-wrap ">
                <q-avatar size="45px" rounded>
                    <img :src="project.network?.logo?.fullpath" alt="" />
                </q-avatar>
                <div class="q-ml-md column">
                    <div class="col text-subtitle2 text-accent">
                        {{ project.network?.name }}
                    </div>
                    <div class="text-subtitle2  text-accent">
                        Lanzamiento {{ Functions.formatDate(project.release_date) }}
                    </div>
                </div>
            </div>

        </q-card-section>
    </q-card>
</template>

<style scoped lang="scss">
.my-card {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    overflow-y: hidden;
}

a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
}

.post-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-desc {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
