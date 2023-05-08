<template>
  <q-page padding>
    <q-card flat style="border-radius: 15px;">
      <div class="q-pa-sm">
        <q-img style="border-radius: 15px;" src="https://logo.com" :ratio="16 / 9" height="250px" spinner-color="primary"
          spinner-size="82px" fit="cover" class="my-img">
          <div class="absolute-full text-subtitle2 flex flex-center my-text">
            <q-icon name="photo_camera" />
          </div>
        </q-img>

      </div>
      <q-card-section>
        <div class="row">
          <div class="flex items-center justify-between" style="width: 100%; ">
            <div class="flex items-center">
              <q-avatar size="120px" font-size="52px" class="my-img" style="border-radius: 15px;">
                <q-img src="https://logo.com" spinner-color="primary" spinner-size="82px">
                  <div class="absolute-full text-subtitle2 flex flex-center my-text">
                    <q-icon name="photo_camera" />
                  </div>
                </q-img>
              </q-avatar>
              <!-- Nombre de la institución -->
              <div class="q-ml-sm">
                <div class="text-h4 text-secondary">
                  adf
                </div>
                <div class="text-secondary">
                  adfs
                </div>

                <div class="flex items-center">
                  <img :src="'https://flagcdn.com/w20/' + 'pe' + '.png'" />
                  <small class="q-ml-sm">PERÚ</small>
                </div>
              </div>
            </div>
            <!-- Chip para el rango de la persona -->
            <q-chip icon="star" label="Administrador" color="primary" />
          </div>
        </div>

      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-12 col-md-9">
        <q-card flat style="border-radius: 15px;">
          <q-tabs v-model="tab" class="text-secondary" active-color="primary" indicator-color="primary" align="justify">
            <q-tab name="projects" label="Proyectos" no-caps />
            <q-tab name="events" label="Eventos" no-caps />
            <q-tab name="posts" label="Posts" no-caps />
            <q-tab name="ajustes" label="Ajustes" no-caps />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="projects" class="q-pa-none">
              <div>
                1
              </div>
            </q-tab-panel>

            <q-tab-panel name="events" class="q-pa-none">
              <div>
                1
              </div>
            </q-tab-panel>

            <q-tab-panel name="posts" class="q-pa-none">
              <div>
                1
              </div>
            </q-tab-panel>
            <q-tab-panel name="ajustes" class="q-pa-none">
              <div>
                1
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat style="border-radius: 15px;">
          <q-card-section>
            <div class="text-h6 text-primary text-bold">
              Miembros
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <q-list>

              <q-item>
                <q-item-section avatar>
                  <q-avatar size="50px" font-size="52px" rounded>
                    <q-img src="https://logo.com" spinner-color="primary" spinner-size="82px" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>User</q-item-label>
                  <q-item-label caption>Administrador</q-item-label>

                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" style="width: 100%;" label="Administrar" flat />
          </q-card-section>


        </q-card>
      </div>
    </div>

  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tab = ref();
</script>
