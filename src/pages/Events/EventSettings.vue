<script lang="ts" setup>
import { Event, NetworkRepresentative } from 'src/models';
import { EventService } from 'src/services';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { AxiosError } from 'axios';
import EventParticipants from './components/EventParticipants.vue';
import EventBasicInfoForm from './components/EventBasicInfoForm.vue';
import EventContentSettings from './components/EventContentSettings.vue';
import EventMedia from './components/EventMedia.vue';

const route = useRoute();
const router = useRouter();
const eventService = new EventService();
const loading = ref(false);
const $q = useQuasar();
const event = reactive<Event>({
  title: '',
  description: '',
  event_content: '',
  id_network: null,
  id_user: null,
  id_file: null,
  location: '',
  date_time: '',
  end_date_time: '',
  is_public: 0,
  is_online: 0,
});

const eventEdit = reactive<Event>({
  title: '',
  description: '',
  event_content: '',
  id_network: null,
  id_user: null,
  id_file: null,
  location: '',
  date_time: '',
  end_date_time: '',
  is_public: 0,
  is_online: 0,
});
const userRank = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 0,
});

const eventTitle = ref('');
const tab = ref('info');
const splitterModel = ref(20);

async function loadEvent() {
  try {
    loading.value = true;
    const { id } = route.params as RouteParams;
    const response = await eventService.checkAccess(id as string);
    Object.assign(event, response.data.event);
    Object.assign(eventEdit, response.data.event);
    Object.assign(userRank, response.data.rank);
    eventTitle.value = event.title;
  } catch (e) {
    router.push({
      name: 'Unauthorized',
    });
  } finally {
    loading.value = false;
  }
}

async function deleteEvent() {
  $q.dialog({
    title: 'Archivar Evento',
    message: '¿Esta realmente seguro de archivar este evento?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      $q.loading.show();
      const { id } = route.params as RouteParams;
      await eventService.deleteEvent(id as string);
      router.push('/network-management/events');
      $q.notify({
        color: 'positive',
        message: 'Evento archivado correctamente!',
        icon: 'check',
      });
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 403) {
        $q.notify({
          color: 'info',
          message: 'No tiene permiso para realizar esta acción!',
          icon: 'info',
        });
      } else {
        $q.notify({
          color: 'negative',
          message: 'Ocurrió un problema!',
          icon: 'report_problem',
        });
      }
    } finally {
      $q.loading.hide();
    }
  });
}

watch(tab, () => {
  Object.assign(event, eventEdit);
});
onMounted(() => {
  loadEvent();
});
</script>
<template>
  <q-page padding class="q-px-xl">
    <div class="flex justify-between q-my-lg">
      <div class="text-h4 text-primary text-bold">
        {{ eventTitle }}
      </div>
      <div>
        <q-btn
          color="primary"
          icon="visibility"
          label="Ver Evento"
          :to="'/event/detail/' + event.id"
          unelevated
          no-caps
          rounded
        />
        <q-btn
          icon="delete"
          color="red"
          rounded
          label="Archivar"
          unelevated
          no-caps
          :disable="userRank.rank != 1"
          @click="deleteEvent()"
          class="q-ml-md"
        />
      </div>
    </div>

    <q-card flat bordered>
      <!-- MOBILE VIEW -->
      <div v-if="$q.screen.lt.md">
        <q-tabs
          v-model="tab"
          class="text-accent bg-white"
          inline-label
          align="left"
        >
          <q-tab name="info" icon="info" label="Información General" no-caps />
          <q-tab name="content" icon="collections" label="Contenido" no-caps />
          <q-tab name="image" icon="image" label="Imagenes" no-caps />
          <q-tab name="people" icon="people" label="Inscritos" no-caps />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <EventBasicInfoForm
              :event="event"
              @update="loadEvent"
            ></EventBasicInfoForm>
          </q-tab-panel>
          <q-tab-panel name="content">
            <EventContentSettings
              :event="event"
              @update="loadEvent"
            ></EventContentSettings>
          </q-tab-panel>
          <q-tab-panel name="image">
            <EventMedia :event="event" @update="loadEvent"></EventMedia>
          </q-tab-panel>
          <q-tab-panel name="people">
            <EventParticipants
              :event="(event.id as number)"
            ></EventParticipants>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- DESKTOP VIEW -->
      <q-splitter v-model="splitterModel" v-else>
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            class="text-accent bg-white"
            inline-label
            vertical
            align="left"
          >
            <q-tab
              name="info"
              icon="info"
              label="Información General"
              no-caps
            />
            <q-tab
              name="content"
              icon="collections"
              label="Contenido"
              no-caps
            />
            <q-tab name="image" icon="images" label="Imagenes" no-caps />
            <q-tab name="people" icon="people" label="Inscritos" no-caps />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="info">
              <EventBasicInfoForm
                :event="event"
                @update="loadEvent"
              ></EventBasicInfoForm>
            </q-tab-panel>
            <q-tab-panel name="content">
              <EventContentSettings
                :event="event"
                @update="loadEvent"
              ></EventContentSettings>
            </q-tab-panel>
            <q-tab-panel name="image">
              <EventMedia :event="event" @update="loadEvent"></EventMedia>
            </q-tab-panel>
            <q-tab-panel name="people">
              <EventParticipants
                :event="(event.id as number)"
              ></EventParticipants>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>
