<script setup lang="ts">
import { onMounted, ref, reactive, watch, toRef } from 'vue';
import { EventService } from 'src/services';
import EventCard from 'src/pages/Events/components/EventCard.vue';
import { Event } from 'src/models';
import EmptyResults from 'src/components/EmptyResults.vue';

const props = defineProps({
  network: {
    required: true,
    type: Number,
  },
});

const eventService = new EventService();
const events = reactive<Event[]>([]);
const paginationData = reactive({
  current_page: 1,
  total: 0,
  last_page: 0,
});
const current = ref(1);
async function loadNetwork(page = 1, perpage = 5) {
  events.splice(0, events.length);
  const response = await eventService.loadNetworkEvents(
    page,
    perpage,
    null,
    props.network
  );
  events.push(...response.data.data);
  Object.assign(paginationData, response.data);
}

onMounted(() => {
  if (props.network != 0) loadNetwork();
});

watch(toRef(props, 'network'), (newNetwork) => {
  loadNetwork();
});

watch(current, (newX) => {
  loadNetwork(newX, 5);
});
</script>
<template>
  <q-card flat>
    <q-card-section class="flex justify-between">
      <!--
            <q-input v-model="searchTerm" type="text" label="Buscar proyecto" outlined>
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
            -->
      <q-space />
      <div>
        <q-btn
          unelevated
          color="primary"
          icon="add"
          label="Crear"
          :to="{ name: 'EventCreate', params: { network: props.network } }"
          rounded
        />
      </div>
    </q-card-section>
    <q-card-section v-if="events.length > 0" class="gallery">
      <event-card
        v-for="event in events"
        :event="event"
        :settings="true"
        :key="event.id"
      ></event-card>
    </q-card-section>
    <q-card-section v-if="events.length > 0">
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="paginationData.last_page" />
      </div>
    </q-card-section>
    <q-card-section v-else>
      <empty-results
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
