<script setup lang="ts">
import { ref } from 'vue';
import { Rules } from 'src/utils';
import { defineProps } from 'vue';
import { Event } from 'src/models';
const eventFile = ref();

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const eventImage = ref(props.event as Event);
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
          <q-form ref="form">
            <q-img
              :src="eventImage.file?.fullpath"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
            />
            <q-file
              outlined
              v-model="eventFile"
              label="Imagen de evento"
              :rules="[Rules.required, Rules.fileType, Rules.fileSize]"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
