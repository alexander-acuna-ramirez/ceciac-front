<script setup lang="ts">
import { ref, reactive } from 'vue';
const drawer = ref(false);
const searchData = reactive({
  start_date: '',
  end_date: '',
  searchTerm: '',
  is_public: [],
  is_online: [],
  institutions: [],
  sortOrder: '',
  sortBy: '',
});
</script>
<template>
  <q-btn
    color="accent"
    flat
    rounded
    no-caps
    icon="filter_alt"
    label="Filtrar"
    @click="drawer = true"
  />

  <q-drawer
    v-model="drawer"
    :width="300"
    :breakpoint="500"
    overlay
    elevated
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-card flat>
          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Categorias</span>
            <q-option-group
              v-model="searchData.is_online"
              type="checkbox"
              :options="[]"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span class="text-subtitle2 text-accent">{{
                    opt.label
                  }}</span>
                </div>
              </template>
            </q-option-group>
          </q-card-section>

          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Modalidad</span>
            <q-option-group
              v-model="searchData.is_public"
              type="checkbox"
              :options="[]"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span class="text-subtitle2 text-accent">{{
                    opt.label
                  }}</span>
                </div>
              </template>
            </q-option-group>
          </q-card-section>
          <q-separator spaced inset />
          <q-card-section>
            <span class="text-subtitle1 text-accent text-bold">Fechas</span>
            <div class="row q-col-gutter-md">
              <q-input
                outlined
                v-model="searchData.start_date"
                mask="date"
                :rules="['date']"
                class="col-12 col-md-6"
                label="Inicio"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="searchData.start_date">
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
                outlined
                v-model="searchData.end_date"
                mask="date"
                :rules="['date']"
                class="col-12 col-md-6"
                label="Fin"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="searchData.end_date">
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
            </div>
          </q-card-section>

          <q-card-section class="flex justify-end">
            <q-btn unelevated color="accent" rounded flat>
              <strong>Limpiar Filtros</strong>
            </q-btn>

            <q-btn unelevated color="primary" rounded>
              <strong>Filtrar</strong>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
