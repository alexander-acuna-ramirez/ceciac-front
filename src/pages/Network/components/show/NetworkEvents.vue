<script setup lang="ts">
import { onMounted, ref, reactive, watch, toRef } from 'vue';
import { EventService } from 'src/services';
import { Event } from 'src/models';
import { useQuasar } from 'quasar';
import EventCard from 'src/pages/Events/components/EventCard.vue';
import EmptyResults from 'src/components/EmptyResults.vue';
import LoadingCard from 'src/components/LoadingCard.vue';
import { useRoute, RouteParams } from 'vue-router';

const $q = useQuasar();
const loading = ref(false);
const eventService = new EventService();
const events = reactive<Event[]>([]);
const paginationData = reactive({
  current_page: 1,
  total: 0,
  last_page: 0,
});
const route = useRoute();
const current = ref(1);
async function loadNetwork(page = 1, perpage = 5) {
  loading.value = true;
  try {
    const { network } = route.params as RouteParams;
    events.splice(0, events.length);
    const response = await eventService.loadNetworkEvents(
      page,
      perpage,
      null,
      network as string
    );
    events.push(...response.data.data);
    Object.assign(paginationData, response.data);
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error cargando los registros!',
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadNetwork();
});
</script>
<template>
  <q-card flat>
    <q-card-section class="flex justify-between">
      <q-space />
      <div></div>
    </q-card-section>
    <q-card-section v-if="loading" class="gallery">
      <loading-card></loading-card>
      <loading-card></loading-card>
      <loading-card></loading-card>
      <loading-card></loading-card>
      <loading-card></loading-card>
    </q-card-section>

    <q-card-section v-if="events.length > 0 && !loading" class="gallery">
      <event-card
        v-for="event in events"
        :event="event"
        :settings="false"
        :key="event.id"
      ></event-card>
    </q-card-section>
    <q-card-section v-if="events.length > 0 && !loading">
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="paginationData.last_page" />
      </div>
    </q-card-section>
    <q-card-section v-if="events.length == 0 && !loading">
      <empty-results
        style="height: 250px"
        titulo="No existen eventos programados"
        descripcion="Puedes crear uno!"
      ></empty-results>
    </q-card-section>
  </q-card>
</template>
<style scoped lang="scss">
.gallery {
  display: grid;
  gap: 3rem;
  grid-auto-rows: 27rem;
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
