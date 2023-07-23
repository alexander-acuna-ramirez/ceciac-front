<template>
  <q-page padding class="row">
    <div class="col-12 col-md-6 flex items-center justify-center">
      <div style="width: 80%">
        <div class="text-h2 text-primary text-bold">
          <span class="text-secondary">BAJO</span> CONSTRUCCIÓN
        </div>
        <div class="text-secondary text-subtitle1 q-mt-md">
          Nuestra plataforma se encuentra bajo construcción, estamos trabajando
          duro para poder darte la mejor experiencia.
        </div>
        <div>
          <q-input v-model="email" type="text" label="Tu correo" outlined>
            <template v-slot:append>
              <q-btn unelevated color="primary" icon="send" flat rounded />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 flex items-center">
      <q-img
        src="~assets/img/app/under-construction.jpg"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        class="rounded-borders"
        style="height: 100%"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
</script>
<style lang=""></style>
