<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue';
import { Education } from 'src/models';
import { Rules } from 'src/utils';
import { ProfileService } from 'src/services/ProfileService';

const emit = defineEmits(['created'])

const education = reactive<Education>({
  id_user: '',
  school: '',
  field_of_study: '',
  start_date: '',
  end_date: null,
  degree: null,
  description: '',
});
const educationDefault = reactive<Education>({
  id_user: '',
  school: '',
  field_of_study: '',
  start_date: '',
  end_date: null,
  degree: null,
  description: '',
});
const profileService = new ProfileService();
const creationDialog = ref(false);
function openCreationDialog() {
  creationDialog.value = true;
}
async function save() {
  await profileService.createEducation(education);
  emit('created', true);
  resetDialog();
}
async function resetDialog() {
  creationDialog.value = false;
  Object.assign(education, educationDefault);
}


</script>
<template>
  <q-btn unelevated color="primary" icon="add" round flat @click="openCreationDialog" />
  <q-dialog v-model="creationDialog">
    <q-card style="min-width: 65%;">
      <q-card-section>
        <div class="text-h6 text-bold text-secondary">Educación</div>
        <div class="text-subtitle2">Agrega tus información sobre tu educación!</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="save">
          <div class="row q-col-gutter-sm">
            <q-input :rules="[Rules.required]" placeholder="Ej. Universidad Católica de Santa María"
              class="col-md-6 col-12" v-model="education.school" label="Institución" filled />

            <q-input :rules="[Rules.required]" class="col-md-6 col-12" v-model="education.field_of_study"
              label="Campo de estudio" filled />
            <q-input :rules="[Rules.required]" rows="2" class="col-12" v-model="education.description" type="textarea"
              label="Descripción" filled />

            <q-input :rules="[Rules.required]" placeholder="Ej. Bachiller en educación" class="col-12"
              v-model="education.degree" label="Grado" filled />

            <q-input class="col-12 col-md-6" filled v-model="education.start_date" mask="date"
              :rules="['date', Rules.required]" label="Fecha de inicio">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="education.start_date">
                      <div class="row items-center justify-end">
                        <q-btn unelevated v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input :rules="[]" class="col-12 col-md-6" label="Fecha de finalización" filled v-model="education.end_date"
              mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="education.end_date">
                      <div class="row items-center justify-end">
                        <q-btn unelevated v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>



          </div>


          <div class="q-mt-md flex justify-end">
            <q-btn unelevated label="Cancelar" no-caps type="reset" color="primary" flat rounded class="q-ml-sm"
              @click="resetDialog" />
            <q-btn unelevated no-caps type="submit" color="primary" rounded>
              <strong>Guardar</strong>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="scss" scoped></style>
