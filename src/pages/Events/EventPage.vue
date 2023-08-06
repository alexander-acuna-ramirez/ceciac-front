<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { EventService } from 'src/services';
import { RouteParams, useRoute } from 'vue-router';
import { Event } from 'src/models/Event';
import { Functions } from 'src/utils';
const tab = ref('description');
const eventService = new EventService();
const route = useRoute();
const event = reactive<Event>({
  title: '',
  description: '',
  event_content: '',
  id_network: '',
  id_user: '',
  id_file: '',
  location: '',
  date_time: '',
  end_date_time: '',
  is_public: 1,
  is_online: 1,
});

function participate() {
  // Aquí se podría agregar la lógica para participar en el proyecto
}
async function loadEvent() {
  try {
    let { id } = route.params as RouteParams;
    const response = await eventService.show(id as string);
    Object.assign(event, response.data);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  loadEvent();
});
</script>
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card flat bordered>
          <q-img
            :src="event.file?.fullpath"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            height="250px"
            style="border-radius: 5px"
          />
          <q-card-section>
            <div class="row q-py-md">
              <div class="col-12 col-md-12 flex column justify-center">
                <div class="text-h4 text-secondary text-bold q-mt-md">
                  {{ event.title }}
                </div>
                <div class="text-subtitle1 text-accent q-mt-md">
                  {{ event.description }}
                </div>
                <div>
                  <q-btn
                    unelevated
                    class="q-my-md"
                    color="primary"
                    rounded
                    no-caps
                    @click="() => {}"
                  >
                    Participar en el evento
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-tabs class="text-accent" inline-label align="left" v-model="tab">
            <q-tab
              name="description"
              icon="description"
              label="Descripción"
              no-caps
            />
            <q-tab name="alarms" icon="groups" label="Participantes" no-caps />
            <q-tab
              name="movies"
              icon="update"
              label="Actualizaciones"
              no-caps
            />
          </q-tabs>
        </q-card>
      </div>
    </div>

    <q-tab-panels v-model="tab" animated class="bg-transparent q-pt-md">
      <q-tab-panel name="description" class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-8">
            <q-card flat bordered>
              <q-card-section>
                <div class="q-pa-md" v-html="event.event_content"></div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-4">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2 text-accent">
                  <q-avatar
                    rounded
                    size="30px"
                    font-size="52px"
                    text-color="white"
                    class="my-img"
                  >
                    <q-img
                      :src="event.network?.logo?.fullpath"
                      spinner-color="primary"
                      spinner-size="82px"
                    ></q-img>
                  </q-avatar>
                  {{ event.network?.name }}
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="text-subtitle2 text-secondary">
                  <span class="text-primary text-bold"
                    >Duración del proyecto:
                  </span>
                  De {{ Functions.formatDate(event.date_time) }} a
                  {{ Functions.formatDate(event.end_date_time) }}
                </div>
              </q-card-section>

              <q-separator inset />
              <q-card-section class="row">
                <span class="col-6 text-accent">
                  <span class="text-bold">665</span>
                  participantes
                </span>
                <span class="col-6 text-accent">
                  <q-icon name="science" />
                  {{ event.is_online }}
                </span>
              </q-card-section>
              <q-card-section>
                <q-chip v-for="tag in event.tags" :key="tag.id" size="sm">
                  {{ tag.name }}
                </q-chip>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<style scoped>
.full-width {
  width: 100%;
}
</style>
