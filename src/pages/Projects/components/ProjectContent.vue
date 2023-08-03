<script setup lang="ts">
import { ProjectService } from 'src/services';
import { ref, defineEmits } from 'vue';
import { useRoute, RouteParams } from 'vue-router';
import { useQuasar } from 'quasar';
import { useToolbarConfig } from 'src/composables/useToolbarConfig';

const props = defineProps({
  content: {
    required: true,
    type: String,
  },
});
const emit = defineEmits(['updated']);
const projectService = new ProjectService();
const content = ref(props.content);
const route = useRoute();
const $q = useQuasar();
const toolbarConfig = useToolbarConfig();

async function save() {
  try {
    if (content.value.length > 0) {
      $q.loading.show();
      let { id } = route.params as RouteParams;
      const response = await projectService.updateProjectContent(
        id as string,
        content.value
      );
      content.value = response.data.synopsis;
      emit('updated');
      $q.notify({
        color: 'positive',
        message: 'Actualizado correctamente!',
      });
    }
  } catch (e) {
    $q.notify({
      color: 'negative',
      message: 'No se pudo actualizar!',
    });
  } finally {
    $q.loading.hide();
  }
}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Contenido del proyecto
      </div>
      <div class="text-subtitle2 text-accent">
        Aqui puedes configurar contenido de tu proyecto!
      </div>
    </div>
    <q-form class="col-12 col-md-12 q-pa-md" @submit.prevent="save">
      <q-editor
        v-model="content"
        min-height="5rem"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        :toolbar="toolbarConfig.toolbarConfig"
      />
      <div class="flex justify-end">
        <q-btn
          color="primary"
          icon="sync"
          label="Actualizar"
          no-caps
          unelevated
          type="submit"
          rounded
        />
      </div>
    </q-form>
  </div>
</template>
