<template>
    <q-card class="my-card rounded-corners" flat bordered style="width: 100%; height: auto;">
        <q-img v-if="post.file" :src="post.file.fullpath" :name="post.file.filename" spinner-color="primary"
            spinner-size="82px" height="45%">
            <q-chip :label="post.category?.name" color="primary" />
        </q-img>
        <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px" height="45%">
            <q-chip :label="post.category?.name" color="primary" />
        </q-img>
        <q-card-section style="height: 35%;">
            <div class="text-subtitle1 text-bold text-secondary">
                <router-link :to="'/blog/detail/' + post.id" class="post-title">{{ post.title }}</router-link>
            </div>

            <div class="text-caption text-description">
                {{ post.short_description }}
            </div>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: 15%;">
            <div class="row no-wrap ">
                <q-avatar size="45px" rounded>
                    <img :src="post.network?.logo?.fullpath" alt="" />
                </q-avatar>
                <div class="q-ml-md column">
                    <div class="col text-subtitle2 text-accent">
                        {{ post.network?.name }}
                    </div>
                    <div class="text-subtitle2  text-accent" v-if="post.created_at">

                        {{ Functions.getTimeElapsed(post.created_at) }}
                    </div>
                </div>
            </div>

        </q-card-section>
    </q-card>
</template>
  
<script lang="ts" setup>
import { BlogPost } from 'src/models';
import { ref } from 'vue';
import { Functions } from 'src/utils';
const slide = ref(1);
defineProps({
    post: {
        required: true,
        type: Object as () => BlogPost,
    }
});
</script>
<style scoped lang="scss">
.my-card {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    overflow-y: hidden;
}

a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
}

.post-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>