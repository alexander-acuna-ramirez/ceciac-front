<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue';
import { useToolbarConfig } from 'src/composables';
import { EventService } from 'src/services';
import { Event } from 'src/models';
import { useQuasar } from 'quasar';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
const $q = useQuasar();
const toolbarConfig = useToolbarConfig();
const localEvent = ref<Event>(props.event as Event);
const eventService = new EventService();
const loading = ref(false);
async function updateContent() {
  try {
    loading.value = true;
    await eventService.updateEventContent(
      localEvent.value.id as number,
      localEvent.value.event_content
    );
    $q.notify({
      type: 'positive',
      message: 'Actualizado correctamente!',
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Ocurrio un error!',
    });
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Contenido del evento
      </div>
      <div class="text-subtitle2 text-accent">
        Escribe todo lo relacionado al evento
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form
            ref="form"
            class="q-gutter-md"
            @submit.prevent="updateContent"
          >
            <q-editor
              :toolbar="toolbarConfig.toolbarConfig"
              v-model="localEvent.event_content"
              min-height="10rem"
              hint="Aqui puedes explicar todo tu proyecto"
              :disable="loading"
            />

            <div class="flex justify-end">
              <q-btn
                color="primary"
                icon="sync"
                label="Actualizar"
                type="submit"
                unelevated
                rounded
                no-caps
                :loading="loading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
