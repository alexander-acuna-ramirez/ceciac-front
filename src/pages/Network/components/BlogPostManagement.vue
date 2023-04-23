<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  network: {
    required: true,
    type: Number
  },
});


</script>
<template>
    <q-card>
        <q-card-section class="flex justify-end">
            <q-btn color="primary" icon="add" label="Crear" :to="'/blog/posts/create/' + props.network" />
        </q-card-section>
        <q-card-section>

        </q-card-section>
    </q-card>
</template>
<style></style>
