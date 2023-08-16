<script lang="ts" setup>
import { Project } from 'src/models';
import { Functions } from 'src/utils';
import { useRouter } from 'vue-router';
import DefaultUserBanner from 'src/assets/img/app/user/user-profile-banner-default.jpg';

const props = defineProps({
  project: {
    required: true,
    type: Object as () => Project,
  },
  settings: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

function openSetting() {
  router.push('/project/settings/' + props.project.id);
}
</script>
<template>
  <q-card class="my-card" flat bordered>
    <q-img
      v-if="project.file"
      :src="project.file.fullpath"
      :name="project.file.filename"
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
        <q-chip :label="project.type?.name" size="md" />
        <q-btn
          icon="settings"
          color="accent"
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
      :src="DefaultUserBanner"
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
        <q-chip :label="project.type?.name" size="md" />
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
        <router-link :to="'/project/detail/' + project.id" class="post-title">{{
          project.name
        }}</router-link>
      </div>

      <div class="text-caption text-description post-desc">
        {{ project.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section style="height: 15%">
      <div class="row no-wrap">
        <q-avatar size="45px" rounded>
          <img
            v-if="project.network?.logo"
            :src="project.network?.logo?.fullpath"
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
            {{ project.network?.name }}
          </div>
          <div class="text-subtitle2 text-accent">
            Lanzamiento {{ Functions.formatDate(project.release_date) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.my-card {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  overflow-y: hidden;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.post-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-desc {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
