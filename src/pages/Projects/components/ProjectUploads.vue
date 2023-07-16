<script setup lang="ts"></script>
<template>
  <div class="text-h4 q-mb-md text-secondary">Recursos e Imagenes</div>
  <div class="q-pa-md">
    <q-uploader
      style="width: 100%"
      :hide-upload-btn="true"
      label="Imagenes"
      multiple
      flat
    >
      <template v-slot:list="scope">
        <!--<q-list separator>
          <q-item v-for="file in scope.files" :key="file.__key">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption> Status: {{ file.__status }} </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section v-if="file.__img" thumbnail class="gt-xs">
              <img :src="file.__img.src" />
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>-->
        <div class="gallery">
          <div
            v-for="file in scope.files"
            :key="file.__key"
            style="height: 100%; width: 100%"
            class="rounded-corners"
          >
            <q-img
              :src="file.__img.src"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
              class="rounded-corners"
            />
          </div>
        </div>
      </template>
    </q-uploader>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  gap: 3rem;
  grid-auto-rows: 20rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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
