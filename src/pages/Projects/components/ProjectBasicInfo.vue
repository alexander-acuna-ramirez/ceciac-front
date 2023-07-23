<script setup lang="ts">
import { Rules } from 'src/utils';
import { Project, Tag } from 'src/models';
import { reactive, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { ProjectService } from 'src/services';

const props = defineProps({
  project: {
    required: true,
    type: Object as () => Project,
  },
  projectTypes: {
    required: true,
    type: Array,
  },
});
const emit = defineEmits(['updated']);
const form = ref();
const $q = useQuasar();
const projectData = reactive<Project>(props.project);
const tags = reactive<Tag[]>([]);
const projectService = new ProjectService();
function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 3) {
      tags.splice(0, tags.length);
    } else {
      const needle = val.toLowerCase();
      const response = await api.get('api/v1/filtered-tags?search=' + needle);
      tags.splice(0, tags.length);
      tags.push(...response.data);
    }
  });
}

function save() {
  form.value.validate().then(async (success: boolean) => {
    if (success && projectData.id) {
      $q.loading.show();
      console.log(projectData);
      try {
        const data = {
          name: projectData.name,
          type_id: projectData.type_id ? projectData.type_id : 0,
          description: projectData.description,
          tags: projectData.tags ? projectData.tags.map((e) => e.id) : [],
        };
        await projectService.updateBasicInfo(data, projectData.id?.toString());

        $q.notify({
          type: 'positive',
          message: 'Actualizado correctamente!',
        });
        emit('updated');
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: 'No se pudo actualizar!',
        });
      } finally {
        $q.loading.hide();
      }
    }
  });
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Información general del proyecto
      </div>
      <div class="text-subtitle2 text-accent">
        Aqui puedes configurar la información general de tu proyecto!
      </div>
    </div>
    <q-form class="col-12 col-md-12 q-pa-md" ref="form" @submit.prevent="save">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="projectData.name"
            label="Titulo"
            hint="El titulo de tu proyecto"
            lazy-rules
            outlined
            :rules="[Rules.required, Rules.maxLength]"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-select
            outlined
            v-model="projectData.type_id"
            :options="projectTypes"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            label="Tipo de proyecto"
            :rules="[Rules.required]"
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            type="textarea"
            v-model="projectData.description"
            label="Descripción"
            hint="Una descripción breve de tu proyecto"
            lazy-rules
            :rules="[Rules.required, Rules.maxShortLength]"
          />
        </div>
        <div class="col-12">
          <q-select
            label="Tags"
            outlined
            v-model="projectData.tags"
            use-input
            use-chips
            multiple
            input-debounce="0"
            :options="tags"
            @filter="filterFn"
            option-value="id"
            option-label="name"
            map-options
            :rules="[Rules.required]"
          />
        </div>

        <div class="col-12" style="display: flex; justify-content: end">
          <q-btn
            color="primary"
            icon="update"
            label="Actualizar"
            unelevated
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
