<script setup lang="ts">
import { defineProps } from 'vue';
import { ref, reactive } from 'vue';
import { Rules } from 'src/utils';
import { Event } from 'src/models';
import { EventService, TagService } from 'src/services';
import { EventBasicInformation } from 'src/interfaces/EventBasicInformation';
import { Tag } from 'src/models';
import { useQuasar } from 'quasar';

const eventService = new EventService();
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
const eventConfig = [
  { label: 'Publico', value: 1 },
  { label: 'Privado', value: 0 },
];
const eventType = [
  { label: 'Presencial', value: 0 },
  { label: 'Virtual', value: 1 },
];
const $q = useQuasar();
const form = ref();
const localEvent = reactive<Event>(props.event as Event);
const tagService = new TagService();
const loading = ref(false);
const tags = reactive<Tag[]>([]);

function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 3) {
      tags.splice(0, tags.length);
    } else {
      const needle = val.toLowerCase();
      const response = await tagService.get(needle);
      tags.splice(0, tags.length);
      tags.push(...response.data);
    }
  });
}

const updateEventBasicInfo = async () => {
  try {
    if (form.value.validate()) {
      loading.value = true;
      const {
        id,
        title,
        is_public,
        description,
        date_time,
        end_date_time,
        is_online,
        location,
      } = localEvent;

      const data: EventBasicInformation = {
        title,
        is_public,
        description,
        date_time,
        end_date_time,
        is_online,
      };
      if (is_online === 0) {
        data.location = location;
      }
      const tags: number[] = localEvent.tags?.map((e) => e.id) ?? [];

      await eventService.updateEvent(id as number, data);
      await eventService.storeEventTags(id as number, tags);
      $q.notify({
        type: 'positive',
        message: 'Actualizado correctamente!',
      });
    }
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudo actualizar correctamente!',
    });
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Información basica del evento
      </div>
      <div class="text-subtitle2 text-accent">
        Aquí puedes configurar el evento
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form ref="form" @submit.prevent="updateEventBasicInfo">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  v-model="localEvent.title"
                  label="Titulo"
                  hint="El titulo de tu evento"
                  lazy-rules
                  :rules="[Rules.required, Rules.maxLength]"
                  :disable="loading"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  outlined
                  v-model="localEvent.is_public"
                  :options="eventConfig"
                  option-value="value"
                  option-label="label"
                  emit-value
                  map-options
                  label="Tipo de evento"
                  :rules="[Rules.required]"
                  :disable="loading"
                />
              </div>
              <div class="col-12">
                <q-input
                  type="textarea"
                  outlined
                  v-model="localEvent.description"
                  label="Descripción"
                  hint="Una descripción breve de tu evento"
                  lazy-rules
                  rows="3"
                  :rules="[Rules.required, Rules.maxShortLength]"
                  :disable="loading"
                />
              </div>

              <div class="col-12">
                <q-select
                  :disable="loading"
                  label="Tags"
                  outlined
                  v-model="localEvent.tags"
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

              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  v-model="localEvent.date_time"
                  label="Inicio del evento"
                  :rules="[Rules.required]"
                  :disable="loading"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="localEvent.date_time"
                          mask="YYYY-MM-DD HH:mm"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              unelevated
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="localEvent.date_time"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              unelevated
                              v-close-popup
                              label="Cerrar"
                              color="primary"
                              flat
                              no-caps
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  outlined
                  v-model="localEvent.end_date_time"
                  label="Fin del evento"
                  :rules="[Rules.required]"
                  :disable="loading"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="localEvent.end_date_time"
                          mask="YYYY-MM-DD HH:mm"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              unelevated
                              v-close-popup
                              label="Cerrar"
                              color="primary"
                              flat
                              no-caps
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="localEvent.end_date_time"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              unelevated
                              v-close-popup
                              label="Cerrar"
                              color="primary"
                              flat
                              no-caps
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-md-6">
                <q-select
                  outlined
                  v-model="localEvent.is_online"
                  :options="eventType"
                  option-value="value"
                  option-label="label"
                  emit-value
                  map-options
                  label="Modalidad"
                  :rules="[Rules.required]"
                  :disable="loading"
                />
              </div>

              <div class="col-12 col-md-6" v-if="event.is_online == 0">
                <q-input
                  outlined
                  v-model="localEvent.location"
                  label="Ubicación"
                  lazy-rules
                  :rules="[Rules.required]"
                  :disable="loading"
                />
              </div>
            </div>
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
