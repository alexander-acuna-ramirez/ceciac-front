<template>
  <q-card
    class="my-card"
    flat
    bordered
    @mouseover="increaseSize"
    @mouseout="resetSize"
  >
    <q-img
      v-if="event.file"
      :src="event.file.fullpath"
      :name="event.file.filename"
      spinner-color="primary"
      spinner-size="82px"
      style="height: 45%"
    >
      <div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip
          :label="event.is_online == 1 ? 'Virtual' : 'Presencial'"
          size="md"
        />
        <q-btn
          color="accent"
          icon="settings"
          flat
          size="md"
          round
          v-if="settings"
          @click="openSetting"
        />
      </div>
    </q-img>
    <q-img
      v-else
      src="~assets/img/app/default-image.jpg"
      spinner-color="primary"
      spinner-size="82px"
      style="height: 45%"
    >
      <div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip
          :label="event.is_online == 1 ? 'Virtual' : 'Presencial'"
          size="md"
        />
        <q-btn
          color="accent"
          icon="settings"
          flat
          size="md"
          round
          v-if="settings"
          @click="openSetting"
        />
      </div>
    </q-img>
    <q-card-section style="height: 35%">
      <div class="text-subtitle1 text-bold text-secondary">
        <router-link :to="'/event/detail/' + event.id">
          {{ event.title }}
        </router-link>
      </div>

      <div class="text-caption text-grey text-description">
        {{ event.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section style="height: 15%">
      <div class="row no-wrap">
        <q-avatar size="45px" rounded>
          <!--<img :src="event.network?.logo?.fullpath" alt="" />-->

          <img
            v-if="event.network && event.network.logo"
            :src="event.network?.logo?.fullpath"
            alt="Network Logo"
          />
          <img
            v-else
            src="~assets/img/app/user/user-profile-banner-default.jpg"
            alt="Network Logo"
          />
        </q-avatar>
        <div class="q-ml-md column">
          <div class="col text-subtitle2 text-accent">
            {{ event.network?.name }}
          </div>
          <div class="text-subtitle2 text-accent">
            Inicia {{ Functions.formatTimestamp(event.date_time as string) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Event, UserInteraction } from 'src/models';
import { Functions } from 'src/utils';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { LoggerService } from 'src/services';
import { useAuthStore } from 'src/stores/auth.store';

const props = defineProps({
  event: {
    required: true,
    type: Object as () => Event,
  },
  settings: {
    type: Boolean,
    default: false,
  },
});
const authStore = useAuthStore();
const router = useRouter();
let hoverTimeout: any = null;
const loggerService = new LoggerService();
const loggerData = reactive<UserInteraction>({
  content_id: 0,
  content_type: 'Event',
  event: 'EventFocused',
});
function openSetting() {
  router.push('/event/settings/' + props.event.id);
}

function increaseSize() {
  const card = document.querySelector('.my-card') as HTMLElement;
  if (card) {
    card.style.transform = 'scale(1.01)';
    hoverTimeout = setTimeout(() => {
      emitLoggerEvent();
    }, 2000);
  }
}

function resetSize() {
  const card = document.querySelector('.my-card') as HTMLElement;
  if (card) {
    card.style.transform = 'scale(1)';
    clearTimeout(hoverTimeout);
  }
}

function emitLoggerEvent() {
  if (!authStore.isAuthenticated) return;
  loggerData.content_id = props.event.id ?? 0;
  loggerService.registerEvent(loggerData);
}
</script>
<style scoped lang="scss">
.my-card {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow-y: hidden;
  transition: transform 0.2s; /* Agrega una transición suave */
}

.my-card:hover {
  transform: scale(
    1.05
  ); /* Aumenta el tamaño al 105% cuando el mouse está encima */
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
