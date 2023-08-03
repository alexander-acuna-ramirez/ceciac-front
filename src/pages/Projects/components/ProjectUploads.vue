<script setup lang="ts">
import { defineProps, reactive, defineEmits } from 'vue';
import { File as UploadFile } from 'src/models';
import { ProjectService } from 'src/services';
import { useRoute, RouteParams } from 'vue-router';
import { useQuasar, QRejectedEntry } from 'quasar';

const props = defineProps({
  files: {
    required: true,
    type: Array,
  },
});
const emit = defineEmits(['updated']);
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
  console.log(toUploadFiles);
}
function removeNotUploadedFile(filesData: readonly File[]) {
  filesData.forEach((fileToRemove) => {
    const index = toUploadFiles.findIndex((file) => file === fileToRemove);
    if (index !== -1) {
      toUploadFiles.splice(index, 1);
    }
  });
}

function rejectedFiles(rejectedEntries: QRejectedEntry[]) {
  console.log(rejectedEntries, 'rejected');
  rejectedEntries.forEach((e) => {
    $q.notify({
      type: 'negative',
      message: 'El archivo ' + e.file.name + ' no es un archivo valido!',
    });
  });
}

async function updateFiles() {
  console.log('working');
  $q.loading.show();
  try {
    let { id } = route.params as RouteParams;
    console.log(toUploadFiles);
    console.log(deletedStoredFiles);

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
    toUploadFiles.splice(0, toUploadFiles.length);
    deletedStoredFiles.splice(0, deletedStoredFiles.length);
    emit('updated');
  } catch (e) {
    console.error(e);
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
        style="
          width: 100%;
          height: auto;
          min-height: 350px;
          border-style: dashed;
          max-height: none;
        "
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
        @rejected="rejectedFiles"
        class="uploader"
      >
        <!-- Header -->
        <template v-slot:header="scope">
          <div class="row no-wrap items-center text-accent bg-white q-pa-sm">
            <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
            <div class="col">
              <div class="q-uploader__title text-uppercase"></div>
            </div>
            <q-btn
              v-if="scope.canAddFiles"
              type="a"
              icon="add"
              @click="scope.pickFiles"
              rounded
              unelevated
              color="secondary"
              no-caps
            >
              Agregar imagenes
              <q-uploader-add-trigger />
              <q-tooltip>Agregar imagenes</q-tooltip>
            </q-btn>
          </div>
        </template>
        <!-- List -->
        <template v-slot:list="scope">
          <div class="gallery">
            <div
              v-for="(file, idx) in storedFiles"
              :key="idx"
              :style="'background-image: url(' + file.fullpath + ')'"
              class="rounded-borders galleryItem"
            >
              <q-btn
                color="red"
                icon="clear"
                size="sm"
                round
                @click="deleteStoredFile(file, idx)"
              />
            </div>
            <div
              v-for="file in scope.files"
              :key="file.__key"
              :style="'background-image: url(' + file.__img.src + ')'"
              class="rounded-borders galleryItem"
            >
              <q-btn
                color="red"
                icon="clear"
                size="sm"
                round
                @click="scope.removeFile(file)"
              />
            </div>

            <div
              class="rounded-borders galleryItem galleryItemAdd"
              @click="scope.pickFiles"
            >
              <q-icon name="add" />
            </div>
          </div>

          <div
            v-if="scope.files.length == 0 && storedFiles.length == 0"
            class="w-full flex justify-center items-center"
            style="height: 300px"
          >
            <span class="text-accent text-center text-secondary"
              ><span>
                <a @click="scope.pickFiles" class="text-primary"
                  >Haz click aquí</a
                >
              </span>
              o arrastra y suelta las imagenes relacionadas a su proyecto</span
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
          rounded
          @click="updateFiles()"
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
  background-size: cover;
  border: 1px #9e9e9e solid;
  background-position: center;
  padding: 5px;
}
.galleryItemAdd {
  border-style: dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: #9e9e9e;
}
.galleryItemAdd:hover {
  background-color: #eeeeee;
  color: white;
}

@media (max-width: $breakpoint-xs-max) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 12rem;
    grid-template-columns: 1fr;
  }
}
</style>
