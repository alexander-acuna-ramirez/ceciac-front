<script setup lang="ts">
import { ref, watch } from 'vue';
import { Rules } from 'src/utils';
import { defineProps } from 'vue';
import { Event } from 'src/models';
import { EventService } from 'src/services';
import { useQuasar } from 'quasar';

const eventFile = ref();
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
const imagePreview = ref('');
const emit = defineEmits(['update']);
const eventImage = ref(props.event as Event);
const loading = ref(false);
const eventService = new EventService();
const $q = useQuasar();

function getPreview(file: File) {
  imagePreview.value = URL.createObjectURL(file);
}

async function save() {
  try {
    const formData = new FormData();
    formData.append('event_file', eventFile.value);
    await eventService.uploadEventFile(formData, props.event.id);
    emit('update');
    $q.notify({
      type: 'positive',
      message: 'Imagen actualizada correctamente!',
    });
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrio un error mientras se actualizaba la imagen!',
    });
  }
}

watch(eventFile, (val: File) => {
  getPreview(val);
});
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">Imagen del evento</div>
      <div class="text-subtitle2 text-accent">
        Define la imagen principal de este evento
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form ref="form" @submit.prevent="save">
            <q-img
              :src="
                imagePreview !== '' ? imagePreview : eventImage.file?.fullpath
              "
              :ratio="16 / 9"
              class="rounded-borders q-mb-md"
              spinner-color="primary"
              spinner-size="82px"
              height="250px"
            />
            <q-file
              accept=".jpg, image/*"
              filled
              v-model="eventFile"
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
