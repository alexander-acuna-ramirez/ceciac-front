<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    network: {
        required: true,
        type: Number
    },
});

const searchTerm = ref("");


</script>
<template>
    <q-card>
        <q-card-section class="flex justify-end">
            <q-input v-model="searchTerm" type="text" label="Buscar proyecto" filled />
            <q-btn color="primary" icon="add" label="Crear" :to="'/event/create/' + props.network" />
        </q-card-section>
        <q-card-section>

        </q-card-section>
    </q-card>
</template>
<style></style>
