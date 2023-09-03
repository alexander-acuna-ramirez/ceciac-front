<template>
  <q-card class="my-card" flat bordered style="width: 100%; height: auto">
    <q-img
      v-if="post.file"
      :src="post.file.fullpath"
      :name="post.file.filename"
      spinner-color="primary"
      spinner-size="82px"
      height="45%"
    >
      <div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip :label="post.category?.name" />

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
      height="45%"
    >
      <div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip :label="post.category?.name" />

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
        <router-link :to="'/blog/detail/' + post.id" class="post-title">{{
          post.title
        }}</router-link>
      </div>

      <div class="text-caption text-description">
        {{ post.short_description }}
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section style="height: 15%">
      <div class="row no-wrap">
        <q-avatar size="45px" rounded>
          <img
            v-if="post.network && post.network?.logo"
            :src="post.network?.logo.fullpath"
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
            {{ post.network?.name }}
          </div>
          <div class="text-subtitle2 text-accent" v-if="post.created_at">
            {{ Functions.getTimeElapsed(post.created_at) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { BlogPost } from 'src/models';
import { Functions } from 'src/utils';
import { useRouter } from 'vue-router';
const props = defineProps({
  post: {
    required: true,
    type: Object as () => BlogPost,
  },
  settings: {
    required: false,
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
function openSetting() {
  router.push('/blog/settings/' + props.post.id);
}
</script>
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
</style>
