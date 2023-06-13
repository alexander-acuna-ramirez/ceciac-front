<template>
    <q-card class="my-card rounded-corners" flat bordered style="width: 100%; height: auto;">
        <q-img v-if="post.file" :src="post.file.fullpath" :name="post.file.filename" spinner-color="primary"
            spinner-size="82px" />
        <q-img v-else src="~assets/img/app/default-image.jpg" spinner-color="primary" spinner-size="82px" />
        <q-card-section>
            <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                    {{ post.title }}
                </div>
            </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
                {{ post.network?.name }}
            </div>
            <div class="text-caption text-grey text-description" style="text-overflow: ellipsis;">
                {{ post.short_description }}
            </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="post" />
            <q-btn flat color="primary">
                {{ post.created_at }}
            </q-btn>
        </q-card-actions>
    </q-card>
</template>
  
<script lang="ts" setup>
import { BlogPost } from 'src/models';
import { ref } from 'vue';
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
    word-break: break-all;
    height: 100%;
    text-overflow: ellipsis;
}

a {
    background-color: red;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    border: none;
}
</style>