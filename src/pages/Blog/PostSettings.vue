<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { BlogPost, NetworkRepresentative, BlogCategory } from 'src/models';
import { BlogService } from 'src/services';
import { useQuasar } from 'quasar';
import PostForm from './components/PostForm.vue';
import PostEditor from './components/PostEditor.vue';
import PostFile from './components/PostFile.vue';

const $q = useQuasar();
const router = useRouter();
const blogService = new BlogService();
const tab = ref('info');
const splitterModel = ref(20);
const route = useRoute();
const loading = ref();
const userRank = reactive<NetworkRepresentative>({
  id_user: 0,
  id_network: 0,
  rank: 0,
});
const post = reactive<BlogPost>({
  title: '',
  content: '',
  short_description: '',
  slug: '',
  id_network: null,
  user_id: null,
  id_category: null,
  id_file: null,
});
const postEdit = reactive<BlogPost>({
  title: '',
  content: '',
  short_description: '',
  slug: '',
  id_network: null,
  user_id: null,
  id_category: null,
  id_file: null,
});
const categories = reactive<BlogCategory[]>([]);
const postTitle = ref('');

async function loadPost() {
  try {
    loading.value = true;
    const { id } = route.params as RouteParams;
    const response = await blogService.checkAccess(id as string);
    Object.assign(post, response.data.post);
    Object.assign(postEdit, response.data.post);
    Object.assign(userRank, response.data.user);
    postTitle.value = post.title;
  } catch (e) {
    router.push({
      name: 'Unauthorized',
    });
  } finally {
    loading.value = false;
  }
}

async function loadBlogCategories() {
  try {
    const response = await blogService.getCategories();
    const data: BlogCategory[] = response.data;
    categories.push(...data);
  } catch (e) {
    console.error(e);
  }
}

async function deletePost() {
  $q.dialog({
    title: 'Archivar Evento',
    message: '¿Esta realmente seguro de archivar este evento?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      $q.loading.show();
      const { id } = route.params as RouteParams;
      await blogService.delete(id as string);
      router.push('/network-management/blog');
      $q.notify({
        color: 'positive',
        message: 'Post archivado correctamente!',
        icon: 'check',
      });
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: 'No se pudo archivar!',
      });
    } finally {
      $q.loading.hide();
    }
  });
}

watch(tab, () => {
  Object.assign(post, postEdit);
});

onMounted(() => {
  loadPost();
  loadBlogCategories();
});
</script>
<template>
  <q-page padding class="q-px-xl">
    <div class="flex justify-between q-my-lg">
      <div class="text-h4 text-primary text-bold">{{ postTitle }}</div>
      <div>
        <q-btn
          size="small"
          color="primary"
          icon="visibility"
          label="Ver Post"
          :to="'/blog/detail/' + post.id"
          unelevated
          no-caps
          rounded
        />
        <q-btn
          size="small"
          icon="delete"
          color="red"
          rounded
          @click="deletePost"
          :disable="userRank.rank != 1"
          label="Archivar"
          unelevated
          no-caps
          class="q-ml-md"
        />
      </div>
    </div>

    <q-card flat bordered>
      <!-- MOBILE VIEW -->
      <div v-if="$q.screen.lt.md">
        <q-tabs
          v-model="tab"
          class="text-accent bg-white"
          inline-label
          align="left"
        >
          <q-tab name="info" icon="info" label="Información General" no-caps />
          <q-tab name="content" icon="collections" label="Contenido" no-caps />
          <q-tab name="image" icon="image" label="Imagenes" no-caps />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <PostForm
              :post="post"
              :categories="categories"
              @updated="loadPost"
            ></PostForm>
          </q-tab-panel>
          <q-tab-panel name="content">
            <PostEditor :post="post" @updated="loadPost"></PostEditor>
          </q-tab-panel>
          <q-tab-panel name="image">
            <PostFile :post="post" @updated="loadPost"></PostFile>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- DESKTOP VIEW -->
      <q-splitter v-model="splitterModel" v-else>
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            class="text-accent bg-white"
            inline-label
            vertical
            align="left"
          >
            <q-tab
              name="info"
              icon="info"
              label="Información General"
              no-caps
            />
            <q-tab
              name="content"
              icon="collections"
              label="Contenido"
              no-caps
            />
            <q-tab name="image" icon="images" label="Imagenes" no-caps />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="info">
              <PostForm
                :post="post"
                :categories="categories"
                @updated="loadPost"
              ></PostForm>
            </q-tab-panel>
            <q-tab-panel name="content">
              <PostEditor :post="post" @updated="loadPost"></PostEditor>
            </q-tab-panel>
            <q-tab-panel name="image">
              <PostFile :post="post" @updated="loadPost"></PostFile>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped></style>
