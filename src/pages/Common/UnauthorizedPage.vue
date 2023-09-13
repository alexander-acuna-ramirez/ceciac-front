<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="custom-card">
      <q-card-section class="q-mb-md">
        <div class="text-h6 text-hint">Acción no autorizada</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body2">
          Lo siento, no tienes permisos para realizar esta acción. Por favor,
          comunícate con el administrador si crees que esto es un error.
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Volver al inicio"
          @click="goToHome"
          rounded
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goToHome = () => {
      router.push('/');
    };

    return {
      goToHome,
    };
  },
});
</script>

<style lang="scss" scoped>
/* Estilos personalizados */
.custom-card {
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}

.q-card-section {
  margin-bottom: 16px;
}

.text-h6 {
  font-size: 20px;
  color: #333; /* Color de texto personalizado */
}

.text-hint {
  color: #999; /* Color de texto de sugerencia personalizado */
}

.text-body2 {
  font-size: 16px;
  color: #666; /* Color de texto del cuerpo personalizado */
}

.q-btn {
  margin-right: 8px;
}
</style>
