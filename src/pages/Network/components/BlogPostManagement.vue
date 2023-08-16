<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { BlogService } from 'src/services';
import { BlogPost } from 'src/models/BlogPost';
import { useQuasar } from 'quasar';
import PostCard from 'src/pages/Blog/components/PostCard.vue';
import LoadingCard from 'src/components/LoadingCard.vue';

const props = defineProps({
  network: {
    required: true,
    type: Number,
  },
});
const paginationData = reactive({
  current_page: 1,
  total: 0,
  last_page: 0,
});
const filter = reactive({
  searchTerm: '',
  category: '',
  sortBy: 'id',
  sortOrder: 'desc',
});
const $q = useQuasar();
const loading = ref(false);
const blogService = new BlogService();
const posts: BlogPost[] = reactive<BlogPost[]>([]);
async function loadNetworkBlogPosts() {
  loading.value = true;
  try {
    const params: URLSearchParams = new URLSearchParams();
    posts.splice(0, posts.length);
    params.append('page', paginationData.current_page.toString());
    params.append('searchTerm', filter.searchTerm);
    params.append('category', filter.category);
    params.append('sortBy', filter.sortBy);
    params.append('sortOrder', filter.sortOrder);

    const response = await blogService.blogNetwork(
      props.network.toString(),
      params
    );
    posts.push(...response.data.data);
    Object.assign(paginationData, response.data);
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Ocurrió un error cargando los posts!',
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadNetworkBlogPosts();
});
</script>
<template>
  <q-card>
    <q-card-section class="flex justify-end">
      <q-btn
        unelevated
        color="primary"
        icon="add"
        :to="'/blog/create/' + props.network"
        rounded
      >
        <strong>Crear</strong>
      </q-btn>
    </q-card-section>
    <q-card-section>
      <div v-if="loading" class="gallery">
        <loading-card></loading-card>
        <loading-card></loading-card>
        <loading-card></loading-card>
        <loading-card></loading-card>
        <loading-card></loading-card>
      </div>
      <div v-if="posts.length > 0 && !loading" class="gallery">
        <post-card
          v-for="post in posts"
          :post="post"
          :key="post.id"
          class="q-col-md-4 q-col-xs-12"
        ></post-card>
      </div>

      <div v-if="posts.length == 0 && loading == false">
        <empty-results
          style="height: 250px"
          titulo="No existen posts"
          descripcion="Puedes crear uno!"
        ></empty-results>
      </div>

      <div v-if="posts.length > 0 && paginationData.last_page != 1 && !loading">
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="paginationData.current_page"
            :max="paginationData.last_page"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style lang="scss" scoped>
.gallery {
  display: grid;
  gap: 3rem;
  grid-auto-rows: 27rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}

@media (max-width: $breakpoint-md-min) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 30rem;
    grid-template-columns: 1fr;
  }
}
</style>
