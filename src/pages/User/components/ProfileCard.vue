<script lang="ts" setup>
import { User } from 'src/models';
import { useAuthStore } from 'src/stores/auth.store';

defineProps({
  member: {
    required: true,
    type: Object as () => User,
  },
});
const authStore = useAuthStore();
</script>
<template>
  <q-card flat bordered>
    <q-img
      v-if="member.banner"
      :src="member.banner.fullpath"
      :name="member.banner.filename"
      spinner-color="primary"
      spinner-size="82px"
      style="height: 45%"
      ><div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      ></div>
    </q-img>
    <q-img
      v-else
      src="~assets/img/app/user/user-profile-banner-default.jpg"
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
      ></div>
    </q-img>

    <q-card-section style="height: 35%">
      <div class="row no-wrap">
        <q-avatar size="45px" rounded v-if="member.logo">
          <img :src="member.logo?.fullpath" alt="" />
        </q-avatar>

        <q-avatar size="45px" rounded v-else>
          <img src="~assets/img/app/user/user-profile-default.jpg" alt="" />
        </q-avatar>

        <div class="q-ml-md column">
          <div class="col text-subtitle1 text-bold text-secondary">
            <router-link :to="'/profile/' + member.id" class="post-title">{{
              member.name + ' ' + member.lastname
            }}</router-link>
          </div>
          <div class="text-subtitle2 text-accent">
            {{ member.professional_summary ?? 'Sin resumen profesional' }}
          </div>
          <div
            class="text-subtitle2 text-accent"
            v-if="member && member.country"
          >
            <div>
              <span>
                <img
                  :src="
                    'https://flagcdn.com/w20/' +
                    member.country.iso.toLowerCase() +
                    '.png'
                  "
                />
                <small class="q-ml-sm">{{ member.country.name }}</small></span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-md text-accent text-subtitle2">
        {{ member.professional_summary ?? 'Sin resumen' }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section
      style="height: 15%"
      class="flex row items-center justify-end q-pb-none"
    >
      <q-space />
      <q-btn
        v-if="authStore.isAuthenticated"
        color="primary"
        flat
        rounded
        :to="'/profile/' + member.id"
        no-caps
      >
        <span>Ver Perfil</span>
      </q-btn>
      <q-btn v-else color="primary" flat rounded to="/login" no-caps>
        <span>Ver Perfil</span>
      </q-btn>
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
