<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import { File as UploadFile } from 'src/models';
import { ProjectService } from 'src/services';
import { useRoute, RouteParams } from 'vue-router';
import { useQuasar } from 'quasar';

const props = defineProps({
  files: {
    required: true,
    type: Array,
  },
});
const route = useRoute();
const projectService = new ProjectService();
const storedFiles = reactive<UploadFile[]>(props.files as UploadFile[]);
const deletedStoredFiles = reactive<UploadFile[]>([]);
const toUploadFiles = reactive<File[]>([]);
const $q = useQuasar();

function deleteStoredFile(file: UploadFile, idx: number) {
  deletedStoredFiles.push(file);
  storedFiles.splice(idx, 1);
}

function addNotUploadedFile(filesData: readonly File[]) {
  toUploadFiles.push(...filesData);
}
function removeNotUploadedFile(filesData: readonly File[]) {
  filesData.forEach((fileToRemove) => {
    const index = toUploadFiles.findIndex((file) => file === fileToRemove);
    if (index !== -1) {
      toUploadFiles.splice(index, 1);
    }
  });
}

async function save() {
  try {
    $q.loading.show();
    let { id } = route.params as RouteParams;
    if (toUploadFiles.length > 0) {
      const filesData = new FormData();
      const dataFiles: File[] = toUploadFiles;
      dataFiles.forEach((e) => filesData.append('project_images[]', e));
      await projectService.uploadProjectFiles(filesData, id as string);
    }
    if (deletedStoredFiles.length > 0) {
      const toDelete = deletedStoredFiles.map((e) => Number(e.id));
      await projectService.deleteProjectFiles(id as string, toDelete);
    }
  } catch (e) {
  } finally {
    $q.loading.hide();
  }
}
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Recursos de su proyecto
      </div>
      <div class="text-subtitle2 text-accent">
        Aqui puedes a gestionar las imagenes relacionadas a su proyecto!
      </div>
    </div>
    <div class="col-12 col-md-12 q-pa-md">
      <q-uploader
        style="width: 100%; height: auto"
        :hide-upload-btn="true"
        label="Imagenes"
        multiple
        bordered
        flat
        accept=".jpg, image/*"
        max-file-size="204800"
        color="accent"
        @added="addNotUploadedFile"
        @removed="removeNotUploadedFile"
      >
        <template v-slot:list="scope">
          <div class="gallery">
            <div
              v-for="(file, idx) in storedFiles"
              :key="idx"
              :style="'background-image: url(' + file.fullpath + ')'"
              class="rounded-corners galleryItem"
            >
              <q-btn
                color="red"
                icon="clear"
                flat
                round
                @click="deleteStoredFile(file, idx)"
              />
            </div>
            <div
              v-for="file in scope.files"
              :key="file.__key"
              :style="'background-image: url(' + file.__img.src + ')'"
              class="rounded-corners galleryItem"
            >
              <q-btn
                color="red"
                icon="clear"
                flat
                round
                @click="scope.removeFile(file)"
              />
            </div>
          </div>

          <div
            v-if="scope.files.length == 0 && storedFiles.length == 0"
            class="w-full flex justify-center items-center"
            style="height: 100%"
          >
            <span class="text-accent text-center text-secondary"
              >Arrastre o suelte las imagenes relacionadas a su proyecto</span
            >
          </div>
        </template>
      </q-uploader>
      <div class="flex justify-end q-mt-md">
        <q-btn
          color="primary"
          icon="sync"
          label="Actualizar"
          no-caps
          unelevated
          type="submit"
          rounded
          @click="save"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  gap: 1rem;
  grid-auto-rows: 12rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
.galleryItem {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
  padding: 5px;
}

@media (max-width: $breakpoint-md-min) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 30rem;
    grid-template-columns: 1fr;
  }
}
</style>
