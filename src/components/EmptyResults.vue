<template>
    <div class="lex flex-center column">
        <q-img src="~assets/img/app/empty-box.png" class="logo-img text-center" style="width: 100px;" />
        <div class="text-center text-bold text-h5 text-secondary">{{ titulo }}</div>
        <div class="text-center ">{{ descripcion }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
});
</script>