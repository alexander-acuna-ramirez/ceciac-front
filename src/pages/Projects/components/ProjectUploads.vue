<script setup lang="ts">
import { ref, watch, PropType } from 'vue';
import { Rules } from 'src/utils';
import { defineProps } from 'vue';
import { ProjectService } from 'src/services';
import { useQuasar } from 'quasar';
import { Project, File as UploadFile } from 'src/models';

const props = defineProps({
  file: {
    type: Object as PropType<UploadFile>,
    required: true,
  },
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
});
const projectFile = ref();
const imagePreview = ref('');
const emit = defineEmits(['updated']);
const loading = ref(false);
const projectService = new ProjectService();
const $q = useQuasar();

function getPreview(file: File) {
  imagePreview.value = URL.createObjectURL(file);
}

async function save() {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('project_file', projectFile.value);
    await projectService.uploadProjectFile(formData, props.project.id ?? '');
    emit('updated');
    $q.notify({
      type: 'positive',
      message: 'Imagen actualizada correctamente!',
    });
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrio un error mientras se actualizaba la imagen!',
    });
  } finally {
    loading.value = false;
  }
}

watch(projectFile, (val: File) => {
  getPreview(val);
});
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Imagen del proyecto
      </div>
      <div class="text-subtitle2 text-accent">
        Define la imagen principal de este proyecto
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form ref="form" @submit.prevent="save">
            <q-img
              :src="imagePreview !== '' ? imagePreview : project.file?.fullpath"
              :ratio="16 / 9"
              class="rounded-borders q-mb-md"
              spinner-color="primary"
              spinner-size="82px"
              height="250px"
            />
            <q-file
              accept=".jpg, image/*"
              outlined
              v-model="projectFile"
              label="Imagen de evento"
              :rules="[Rules.required, Rules.fileType, Rules.fileSize]"
            />
            <div class="flex justify-end">
              <q-btn
                color="primary"
                icon="sync"
                label="Actualizar"
                type="submit"
                unelevated
                rounded
                :loading="loading"
                no-caps
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
