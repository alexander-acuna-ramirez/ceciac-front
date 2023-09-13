<script setup lang="ts">
import { ref, reactive, defineEmits, watch } from 'vue';
import { Experience } from 'src/models';
import { Rules } from 'src/utils';
import { ProfileService } from 'src/services/ProfileService';
import { useQuasar } from 'quasar';

const emit = defineEmits(['created']);
const loading = ref(false);
const $q = useQuasar();
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
  loading.value = true;
  try {
    await profileService.createExperience(experience);
    emit('created', true);
    $q.notify({
      type: 'positive',
      message: 'Experiencia agregada correctamente!',
    });
    resetDialog();
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error agregando la experiencia!',
    });
  } finally {
    loading.value = false;
  }
}
async function resetDialog() {
  creationDialog.value = false;
  Object.assign(experience, experienceDefault);
  jobSkills.splice(0, jobSkills.length).push(...jobSkillsDefault);
}

function minExperienceDate(date: string) {
  return date >= experience.start_date;
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
const jobSkillsDefault = [
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

watch(
  () => experience.start_date,
  () => (experience.end_date = null)
);
watch(
  () => experience.currently_working,
  () => {
    if (experience.currently_working == 1) {
      experience.end_date = null;
    }
  }
);
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
              :rules="[Rules.required, Rules.maxShortLength]"
              placeholder="Ej. Ingeniero de Sistemas"
              class="col-md-6 col-12"
              v-model="experience.title"
              label="Titulo"
              :disable="loading"
              filled
            />

            <q-input
              :rules="[Rules.required, Rules.maxShortLength]"
              class="col-md-6 col-12"
              v-model="experience.company"
              label="Nombre de la empresa"
              :disable="loading"
              filled
            />
            <q-input
              :rules="[Rules.required, Rules.maxLength]"
              rows="2"
              class="col-12"
              v-model="experience.description"
              type="textarea"
              label="Descripción del cargo"
              :disable="loading"
              filled
            />

            <q-input
              :rules="[Rules.required, Rules.maxShortLength]"
              placeholder="Ej. 123 Main St, Anytown USA 12345"
              class="col-12"
              v-model="experience.location"
              label="Ubicación"
              :disable="loading"
              filled
            />
            <q-input
              class="col-12 col-md-6"
              filled
              v-model="experience.start_date"
              mask="date"
              :rules="['date', Rules.required]"
              :disable="loading"
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
                          label="Cerrar"
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
              filled
              :disable="
                loading ||
                !experience.start_date ||
                experience.currently_working == 1
              "
              v-model="experience.end_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="experience.end_date"
                      :options="minExperienceDate"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          unelevated
                          v-close-popup
                          label="Cerrar"
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
              filled
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
              :disable="loading"
            />
            <q-checkbox
              class="col-12 col-md-6"
              v-model="experience.currently_working"
              label="¿Trabajo actualmente aquí?"
              :true-value="1"
              :false-value="0"
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
              :disable="loading"
            />
            <q-btn
              unelevated
              no-caps
              type="submit"
              color="primary"
              rounded
              :loading="loading"
            >
              <strong>Guardar</strong>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style lang="scss" scoped></style>
