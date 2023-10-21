<template>
  <q-page :padding="$q.screen.gt.sm">
    <div :class="$q.screen.gt.sm ? 'q-pa-xl' : ''">
      <q-timeline
        color="secondary"
        :layout="$q.screen.gt.sm ? 'loose' : 'dense'"
      >
        <q-timeline-entry heading>
          <div class="text-h3 text-bold text-secondary text-center">
            Explora el contenido de <span class="text-primary">CECIAC</span>
          </div>
          <div class="text-subtitle2 text-center text-secondary q-mt-md">
            Descubre los eventos, proyectos y publicaciones de la red CECIAC.
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          v-for="(publication, idx) in publications"
          :key="idx"
          :title="publication.title"
          :subtitle="publication.date"
          :side="idx % 2 == 0 ? 'left' : 'right'"
        >
          <div>
            {{ publication.description }}
          </div>
          <div
            style="width: 100%; height: 300px"
            :class="{
              'q-my-md': true,
              flex: true,
              'justify-end': idx % 2 == 0 && $q.screen.gt.sm ? true : false,
              'justify-start': idx % 2 == 0 || !$q.screen.gt.sm ? false : true,
            }"
            v-if="publication.image_file != null"
          >
            <img
              style="height: 100%"
              :src="publication.image_file?.fullpath"
              alt=""
            />
          </div>
          <div>
            <q-btn
              v-if="
                publication.extra_file != null && publication.extra_file != ''
              "
              color="accent"
              icon="link"
              label="Enlace a recurso"
              flat
              no-caps
              :href="publication.extra_file"
            />
            <q-btn
              v-if="publication.file != null"
              color="accent"
              icon="cloud_download"
              label="Archivo relacionado"
              flat
              no-caps
              :href="
                api.getUri() + 'api/v1/ceciac/download-file/' + publication.id
              "
            />
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <!-- Línea de tiempo de publicaciones -->
    <div class="q-px-lg q-py-md"></div>
  </q-page>
</template>

<script setup lang="ts">
import { CeciacService } from 'src/services';
import { CeciacPublication } from 'src/models';
import { reactive, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const ceciacService = new CeciacService();
const publications = reactive<CeciacPublication[]>([]);
const $q = useQuasar();
const loadPublications = async () => {
  try {
    const response = await ceciacService.list();
    publications.push(...response.data.publications);
  } catch (e) {
    console.error(e);
  }
};

const downloadFile = async (publication: CeciacPublication) => {
  const i = publication.id ?? '';
  await ceciacService.downloadFile(i as string);
};
onMounted(() => {
  loadPublications();
});
</script>
