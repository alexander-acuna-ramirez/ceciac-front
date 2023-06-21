<template>
    <q-page class="flex justify-center">
        <div class="containerPage">
            <div class="q-my-lg">
                <span class="text-accent">
                    {{ post.category?.name }}
                </span>
                <div class="text-h2 text-primary text-bold">{{ post.title }}</div>
                <div class="text-accent flex justify-left q-mb-md">
                    <span>
                        Por {{ post.network?.name }}
                    </span>
                    <q-separator spaced vertical />
                    <span>
                        Tiempo de lectura {{ calculateReadingTime(post.content) }} min
                    </span>
                </div>
            </div>


            <div class="postImage q-mb-lg">
                <q-img :src="post.file?.fullpath" spinner-color="primary" spinner-size="82px" class="rounded-borders" />
            </div>
            <div v-html="post.content" class="q-mb-lg"></div>
            <div>
                <span class="text-subtitle1 text-secondary">Tags: </span>
                <q-chip v-for="tag in post.tags" :label="tag.name" :key="tag.id" />
            </div>
            <q-separator spaced />
            <!--

            <div class="comments-section">
                <h3 class="text-h5 text-secondary">Comentarios</h3>
                <div class="comment q-mt-md">
                    <div class="flex justify-between">
                        <span>
                            <q-avatar size="30px" rounded>
                                <img src="~assets/img/app/user/user-profile-default.jpg" alt="">
                            </q-avatar>
                            <span class="text-secondary">
                                Alexander Acuña Ramirez
                            </span>
                        </span>

                        <span class="text-accent">
                            Hace 5 min
                        </span>
                    </div>
                    <div class="q-mt-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, consectetur exercitationem?
                        Veniam rerum ullam animi excepturi eius maxime velit et enim, maiores voluptatibus qui praesentium
                        necessitatibus quam molestiae aliquam eligendi?
                    </div>

                </div>

                <div class="comment q-mt-lg">
                    <div class="flex justify-between">
                        <span>
                            <q-avatar size="30px" rounded>
                                <img src="~assets/img/app/user/user-profile-default.jpg" alt="">
                            </q-avatar>
                            <span class="text-secondary">
                                Alexander Acuña Ramirez
                            </span>
                        </span>

                        <span class="text-accent">
                            Hace 5 min
                        </span>
                    </div>
                    <div class="q-mt-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, consectetur exercitationem?
                        Veniam rerum ullam animi excepturi eius maxime velit et enim, maiores voluptatibus qui praesentium
                        necessitatibus quam molestiae aliquam eligendi?
                    </div>

                </div>



        </div>-->
        </div>
    </q-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute, RouteParams } from 'vue-router';
import { BlogService } from 'src/services';
import { BlogPost } from '@models/BlogPost';

const blogService = new BlogService();
const route = useRoute();
const post = reactive<BlogPost>({
    id: 0,
    title: '',
    slug: '',
    content: '',
    short_description: '',
    user_id: null,
    id_network: null,
    id_category: null,
    id_file: null,
});

async function loadPost() {
    let { id } = route.params as RouteParams;
    post.id = id as unknown as number;
    const { data } = await blogService.showPost(id as string);
    Object.assign(post, data);
}
function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

onMounted(() => {
    loadPost();
});
</script>

<style lang="scss" scoped>
.postImage {
    height: auto;
    width: 100%;
}

.comments-section {
    margin-top: 20px;
}

.comment {
    margin-bottom: 10px;
}
</style>
