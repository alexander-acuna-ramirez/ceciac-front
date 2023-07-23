<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue';
import { Experience } from 'src/models';
import { Rules } from 'src/utils';
import { ProfileService } from 'src/services/ProfileService';

const emit = defineEmits(['created']);

const experience = reactive<Experience>({
  id_user: 0,
  title: '',
  description: '',
  company: '',
  location: '',
  start_date: '',
  end_date: null,
  currently_working: 0,
  skills: [],
});
const experienceDefault = reactive<Experience>({
  id_user: 0,
  title: '',
  description: '',
  company: '',
  location: '',
  start_date: '',
  end_date: null,
  currently_working: 0,
  skills: [],
});
const profileService = new ProfileService();
const creationDialog = ref(false);
function openCreationDialog() {
  creationDialog.value = true;
}
async function save() {
  await profileService.createExperience(experience);
  emit('created', true);
  resetDialog();
}
async function resetDialog() {
  creationDialog.value = false;
  Object.assign(experience, experienceDefault);
}

const jobSkills = [
  'Trabajo en equipo',
  'Comunicación efectiva',
  'Resolución de problemas',
  'Pensamiento crítico',
  'Adaptabilidad',
  'Habilidades interpersonales',
  'Liderazgo',
  'Creatividad',
  'Organización',
  'Planificación',
  'Gestión de tiempo',
  'Atención al detalle',
  'Motivación',
  'Negociación',
  'Empatía',
  'Responsabilidad',
  'Toma de decisiones',
  'Innovación',
  'Proactividad',
  'Capacidad analítica',
];
const filterOptions = ref(jobSkills);

function createValue(val: string, done: any) {
  if (val.length > 0) {
    if (!jobSkills.includes(val)) {
      jobSkills.push(val);
    }
    done(val, 'toggle');
  }
}

function filterFn(val: string, update: any) {
  update(() => {
    if (val === '') {
      filterOptions.value = jobSkills;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = jobSkills.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
}
</script>
<template>
  <q-btn
    unelevated
    color="primary"
    icon="add"
    round
    flat
    @click="openCreationDialog"
  />
  <q-dialog v-model="creationDialog">
    <q-card style="min-width: 65%">
      <q-card-section>
        <div class="text-h6 text-bold text-secondary">Experiencia</div>
        <div class="text-subtitle2">Agrega tus experiencias profesionales!</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="save">
          <div class="row q-col-gutter-sm">
            <q-input
              :rules="[Rules.required]"
              placeholder="Ej. Ingeniero de Sistemas"
              class="col-md-6 col-12"
              v-model="experience.title"
              label="Titulo"
              outlined
            />

            <q-input
              :rules="[Rules.required]"
              class="col-md-6 col-12"
              v-model="experience.company"
              label="Nombre de la empresa"
              outlined
            />
            <q-input
              :rules="[Rules.required]"
              rows="2"
              class="col-12"
              v-model="experience.description"
              type="textarea"
              label="Descripción del cargo"
              outlined
            />

            <q-input
              :rules="[Rules.required]"
              placeholder="Ej. 123 Main St, Anytown USA 12345"
              class="col-12"
              v-model="experience.location"
              label="Ubicación"
              outlined
            />

            <q-input
              class="col-12 col-md-6"
              outlined
              v-model="experience.start_date"
              mask="date"
              :rules="['date', Rules.required]"
              label="Fecha de inicio"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="experience.start_date">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              class="col-12 col-md-6"
              label="Fecha de finalización"
              outlined
              v-model="experience.end_date"
              mask="date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="experience.end_date">
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              class="col-12"
              outlined
              v-model="experience.skills"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="jobSkills"
              @filter="filterFn"
              hint="Skills seleccionadas: "
              counter
            />
          </div>

          <div class="q-mt-md flex justify-end">
            <q-btn
              unelevated
              label="Cancelar"
              no-caps
              type="reset"
              color="primary"
              flat
              rounded
              class="q-ml-sm"
              @click="resetDialog"
            />
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
