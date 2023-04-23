<template>
    <router-link :to="'/event/detail/' + event.id">
        <q-card class="my-card" flat bordered style="max-width: 290px; height: auto;">
            <q-img v-if="event.file" :src="event.file.fullpath" :name="event.file.filename" spinner-color="primary"
                spinner-size="82px" style="min-height: 220px;" />
            <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px" />
            <q-card-section>
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        {{ event.title }}
                    </div>
                    <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                        {{ (event.is_online == 1) ? "Virtual" : "Presencial" }}
                    </div>
                </div>

            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    {{ event.network?.name }}
                </div>
                <div class="text-caption text-grey text-description">
                    {{ event.description }}
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat color="primary">
                    {{ event.date_time }} | {{ event.end_date_time }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </router-link>
</template>
  
<script lang="ts" setup>
import { Event } from 'src/models';
import { ref } from 'vue';
const slide = ref(1);
defineProps({
    event: {
        required: true,
        type: Object as () => Event,
    }
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