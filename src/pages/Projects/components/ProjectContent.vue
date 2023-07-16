<script setup lang="ts">
import { ProjectService } from 'src/services';
import { ref } from 'vue';
import { useRoute, RouteParams } from 'vue-router';
import { useQuasar } from 'quasar';
import { useToolbarConfig } from 'src/composables/useToolbarConfig';
const props = defineProps({
  content: {
    required: true,
    type: String,
  },
});
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
  <div class="text-h4 q-mb-md text-secondary">Contenido</div>
  <q-form class="q-gutter-md q-pa-md" @submit.prevent="save">
    <q-editor
      v-model="content"
      min-height="5rem"
      flat
      autocorrect="off"
      autocapitalize="off"
      content-class="backgroundColor"
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
</template>
