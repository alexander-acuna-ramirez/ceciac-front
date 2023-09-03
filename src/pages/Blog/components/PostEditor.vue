<script lang="ts" setup>
import { BlogPost } from 'src/models';
import { useToolbarConfig } from 'src/composables';
import { useQuasar } from 'quasar';
import { BlogService } from 'src/services';
import { ref } from 'vue';
//import { Rules } from 'src/utils';

const props = defineProps({
  post: {
    type: Object as () => BlogPost,
    required: true,
  },
});
const emit = defineEmits(['updated']);

const $q = useQuasar();
const loading = ref(false);
const toolbarConfig = useToolbarConfig();
const postBlog = ref<BlogPost>(props.post as BlogPost);
const blogService = new BlogService();

async function updateContent() {
  loading.value = true;
  try {
    if (postBlog.value.content !== '') {
      await blogService.updatePostContent(
        props.post.id || '',
        postBlog.value.content
      );
      $q.notify({
        message: 'Actualizado correctamente!',
        type: 'positive',
      });
      emit('updated');
    } else {
      $q.notify({
        message: 'El post debe tener contenido',
        type: 'negative',
      });
    }
  } catch (e) {
    $q.notify({
      message: 'Ocurrió un error!',
      type: 'negative',
    });
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Contenido del Post
      </div>
      <div class="text-subtitle2 text-accent">
        Aquí puedes definir el contenido del Post
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form ref="editorForm" class="q-gutter-md">
            <q-editor
              :toolbar="toolbarConfig.toolbarConfig"
              v-model="postBlog.content"
              min-height="10rem"
              hint="Aqui puedes explicar todo tu proyecto"
              :disable="loading"
            />

            <div class="flex justify-end">
              <q-btn
                color="primary"
                icon="sync"
                label="Actualizar"
                @click="updateContent"
                unelevated
                rounded
                no-caps
                :loading="loading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
