<template>
    <router-link :to="'/project/detail/' + project.id">
        <q-card class="my-card" flat bordered style="max-width: 290px; height: auto">
            <q-img v-if="project.files?.length" :src="project.files[0].fullpath" :name="project.files[0].filename"
                spinner-color="primary" spinner-size="82px" style="min-height: 220px" />
            <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px" />
            <q-card-section>
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        {{ project.name }}
                    </div>
                    <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                        {{ project.type?.name }}
                    </div>
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    {{ project.network?.name }}
                </div>
                <div class="text-caption text-grey text-description">
                    {{ project.description }}
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat color="primary">
                    {{ project.release_date }} | {{ project.end_date }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </router-link>
</template>

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
</script>
<style scoped lang="scss">
a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
}
</style>