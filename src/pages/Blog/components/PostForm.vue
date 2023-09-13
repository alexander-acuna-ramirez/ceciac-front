<script lang="ts" setup>
import { BlogPost, BlogCategory, Tag } from 'src/models';
import { BlogService, TagService } from 'src/services';
import { reactive, onMounted, ref } from 'vue';
import { Rules } from 'src/utils';
import { useQuasar } from 'quasar';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object as () => BlogCategory[],
    required: true,
  },
});
const emit = defineEmits(['updated']);

const $q = useQuasar();
const tagService = new TagService();
const blogService = new BlogService();
const blogPost = reactive<BlogPost>(props.post as BlogPost);
const tags = reactive<Tag[]>([]);
const loading = ref(false);
const postForm = ref();

function filterFn(val: string, update: any) {
  update(async () => {
    if (val === '' || val.length < 2) {
      tags.splice(0, tags.length);
    } else {
      const needle = val.toLowerCase();
      const response = await tagService.get(needle);
      tags.splice(0, tags.length);
      tags.push(...response.data);
    }
  });
}

async function updatePost() {
  loading.value = true;
  try {
    const data = {
      title: blogPost.title,
      short_description: blogPost.short_description,
      id_category: blogPost.id_category,
      tags: blogPost.tags?.map((e) => e.id),
    };

    const success = await postForm.value.validate();
    if (success) {
      await blogService.update(blogPost.id || '', data);
      $q.notify({
        type: 'positive',
        message: 'Actualizado correctamente!',
      });
    }
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudo actualizar!',
    });
  } finally {
    emit('updated');
    loading.value = false;
  }
}

onMounted(() => {
  //loadBlogCategories();
});
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Información basica del evento
      </div>
      <div class="text-subtitle2 text-accent">
        Aquí puedes configurar el evento
      </div>
    </div>
    <div class="col-12 col-md-12">
      <q-card flat>
        <q-card-section>
          <q-form
            ref="postForm"
            class="q-gutter-md"
            @submit.prevent="updatePost"
          >
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  filled
                  :disable="loading"
                  v-model="blogPost.title"
                  label="Titulo"
                  hint="El titulo de tu evento"
                  lazy-rules
                  :rules="[Rules.required, Rules.maxLength]"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-select
                  filled
                  :disable="loading"
                  v-model="blogPost.id_category"
                  :options="categories"
                  option-value="id"
                  option-label="name"
                  emit-value
                  map-options
                  label="Categorias"
                  :rules="[Rules.required]"
                />
              </div>
              <div class="col-12">
                <q-input
                  filled
                  :disable="loading"
                  v-model="blogPost.short_description"
                  label="Descripción"
                  type="textarea"
                  lazy-rules
                  rows="3"
                  :rules="[
                    Rules.required,
                    (value) =>
                      value.length <= 150 ||
                      'La descripción no puede ser mayor a 150 caracteres',
                  ]"
                />
              </div>
              <div class="col-12">
                <q-select
                  label="Tags"
                  filled
                  :disable="loading"
                  v-model="blogPost.tags"
                  use-input
                  use-chips
                  multiple
                  input-debounce="0"
                  :options="tags"
                  @filter="filterFn"
                  option-value="id"
                  option-label="name"
                  map-options
                  return-object
                  :rules="[Rules.required]"
                />
              </div>
            </div>
            <div class="flex justify-end">
              <q-btn
                color="primary"
                icon="sync"
                label="Actualizar"
                type="submit"
                unelevated
                rounded
                :loading="loading"
                no-caps
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
