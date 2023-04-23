<template>
    <q-card>
        <q-card-section>
            <q-item-label header lines="2">{{ project.name }}</q-item-label>
            <q-item-label subheader>{{ project.type?.name }}</q-item-label>
            <q-item-label>{{ project.release_date }}</q-item-label>
            <q-item-label>{{ project.end_date }}</q-item-label>
        </q-card-section>

        <q-card-section>
            <q-item-label header>Descripción</q-item-label>
            <q-item-label>{{ project.synopsis }}</q-item-label>
        </q-card-section>

        <q-card-actions>
            <q-btn flat label="{{ $q.lang.label.viewDetails }}" icon="info" class="q-ml-sm"
                @click="$emit('view-details')" />
            <q-btn flat label="{{ $q.lang.label.viewNetwork }}" icon="account_tree" class="q-ml-sm"
                @click="$emit('view-network')" />
        </q-card-actions>
    </q-card>
</template>
  
<script lang="ts">
import { Project } from 'src/models';

export default {
    name: 'ProjectCard',
    props: {
        project: {
            type: Object as () => Project,
            required: true,
        }
    },
};
</script>