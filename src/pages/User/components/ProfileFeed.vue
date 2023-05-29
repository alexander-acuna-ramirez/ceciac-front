<template>
  <div>

    <q-card flat style="border-radius: 15px;">
      <q-card-section class="flex justify-between q-pt-md q-px-md">
        <div class="text-h6 text-secondary text-bold">Experiencia</div>
        <div>
          <!--<q-btn color="primary" icon="edit" flat round size="xs" />-->
          <ProfileExperienceCreate @created="loadExperiences" v-if="editProfile"></ProfileExperienceCreate>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list v-if="experiences.length > 0">
          <q-item v-for="experience in experiences" :key="experience.id">
            <q-item-section>
              <q-item-label overline>{{ experience.company }}</q-item-label>
              <q-item-label>{{ experience.title }}</q-item-label>
              <q-item-label caption>{{ experience.description }}</q-item-label>
              <q-item-label>
                <q-chip v-for="(skill, idx) in experience.skills" :label="skill" :key="idx" />
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ experience.start_date }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-list>

        <div v-else class="text-subtitle2 flex justify-center items-center text-secondary text-center"
          style="min-height: 100px;">
          <span> No se ha agregado nada aún</span>
        </div>
      </q-card-section>
    </q-card>


    <q-card flat style="border-radius: 15px;" class="q-mt-md">
      <q-card-section class="flex justify-between q-pt-md q-px-md">
        <div class="text-h6 text-secondary text-bold">Educación</div>
        <div>
          <!--<q-btn color="primary" icon="edit" flat round size="xs" />-->
          <ProfileEducationCreate @created="loadEducation" v-if="editProfile"></ProfileEducationCreate>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list v-if="educations.length > 0">
          <q-item v-for="education in educations" :key="education.id">
            <q-item-section>
              <q-item-label overline>{{ education.school }}</q-item-label>
              <q-item-label>{{ education.degree }}</q-item-label>
              <q-item-label caption>{{ education.description }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ education.field_of_study }}</q-item-label>
            </q-item-section>

          </q-item>
        </q-list>

        <div v-else class="text-subtitle2 flex justify-center items-center text-secondary text-center"
          style="min-height: 100px;">
          <span> No se ha agregado nada aún</span>
        </div>
      </q-card-section>
    </q-card>
    <!-- p -->

  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { Experience, Education } from 'src/models';
import { useRoute, RouteParams } from 'vue-router';
import { ProfileService } from 'src/services';
import { useAuthStore } from 'src/stores/auth.store';

import ProfileExperienceCreate from './ProfileExperienceCreate.vue';
import ProfileEducationCreate from './ProfileEducationCreate.vue';
const experiences = reactive<Experience[]>([]);
const educations = reactive<Education[]>([]);
const profileService = new ProfileService();
const authStore = useAuthStore();
const route = useRoute();

const editProfile = ref(false);

async function loadExperiences() {
  if (route.params.user) {
    let { user } = route.params as RouteParams;
    const res = await profileService.loadExperiences(user as string);
    experiences.splice(0, experiences.length);
    experiences.push(...res.data);
  }
}

async function loadEducation() {
  if (route.params.user) {
    let { user } = route.params as RouteParams;
    const res = await profileService.loadEducation(user as string);
    educations.splice(0, educations.length);
    educations.push(...res.data);
  }
}

onMounted(() => {
  let { user } = route.params as RouteParams;
  if (authStore.getUser.id == user) {
    editProfile.value = true;
  }
  loadExperiences();
  loadEducation();
})
</script>
<style lang="">

</style>
