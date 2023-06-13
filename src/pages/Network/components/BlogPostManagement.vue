<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { BlogService } from 'src/services';
import { BlogPost } from '@models/BlogPost';
import PostCard from 'src/pages/Blog/components/PostCard.vue';

const blogService = new BlogService();
const props = defineProps({
  network: {
    required: true,
    type: Number
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

const posts: BlogPost[] = reactive<BlogPost[]>([]);

async function loadNetworkBlogPosts() {
  const params: URLSearchParams = new URLSearchParams();
  posts.splice(0, posts.length);
  params.append('page', paginationData.current_page.toString());
  params.append('searchTerm', filter.searchTerm);
  params.append('category', filter.category);
  params.append('sortBy', filter.sortBy);
  params.append('sortOrder', filter.sortOrder);

  const response = await blogService.blogNetwork(props.network.toString(), params);
  posts.push(...response.data.data);
  Object.assign(paginationData, response.data);
}

onMounted(() => {
  loadNetworkBlogPosts();
})

</script>
<template>
  <q-card>
    <q-card-section class="flex justify-end">
      <q-btn color="primary" icon="add" label="Crear" :to="'/blog/create/' + props.network" rounded />
    </q-card-section>
    <q-card-section>
      <q-card-section v-if="posts.length > 0" class="gallery">
        <post-card v-for="post in posts" :post="post" :key="post.id" class="q-col-md-4 q-col-xs-12"></post-card>
      </q-card-section>
      <q-card-section v-if="posts.length > 0">
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="paginationData.current_page" :max="paginationData.last_page" />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<style lang="scss" scoped>
.gallery {
  display: grid;
  gap: 3rem;
  grid-auto-rows: 22rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
