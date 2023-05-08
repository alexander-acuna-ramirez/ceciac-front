<script lang="ts" setup>
import { Project } from 'src/models';
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
    <div>
        <q-card class="my-card" flat bordered>

            <q-img v-if="project.files?.length" :src="project.files[0].fullpath" :name="project.files[0].filename"
                spinner-color="primary" spinner-size="82px" style="height: 280px; " />
            <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px"
                style="height: 280px; " />

            <q-card-section class="flex justify-between">
                <div>
                    <div class="text-caption text-primary">
                        {{ project.type?.name }}
                    </div>

                    <div class="text-subtitle1 text-secondary">
                        {{ project.name }}
                    </div>

                </div>

                <div class="flex items-center">
                    <q-icon name="calendar_today" />
                    {{ formatDate(project.release_date) }}
                </div>
            </q-card-section>

            <q-card-actions class="q-pa-md">
                <q-btn :to="'/project/detail/' + project.id" color="primary" label="Ver Detalles" outline
                    style="width: 100%; border-radius: 8px;" no-caps />
            </q-card-actions>
        </q-card>
    </div>
</template>

<style scoped lang="scss">
a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
}

.my-card {
    height: auto;
    border-radius: 15px;
}
</style>
