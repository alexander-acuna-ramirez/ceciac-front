<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { QStepper, useQuasar } from 'quasar';
import { BlogCategory, BlogPost, Tag } from 'src/models';
import { TagService, BlogService } from 'src/services';
import { Rules } from 'src/utils';
import { useRoute, RouteParams, useRouter } from 'vue-router';
import { useToolbarConfig } from 'src/composables/useToolbarConfig';

const tagService = new TagService();
const blogService = new BlogService();
const toolbarConfig = useToolbarConfig();
const tags = reactive<Tag[]>([]);
const route = useRoute();
const router = useRouter();
const postFile = ref<File>();

const firstStepForm = ref();
const secondStepForm = ref();
const thirdStepForm = ref();

const $q = useQuasar();
const step = ref(1);
const stepper = ref();
const blogPost = reactive<BlogPost>({
    title: '',
    content: '',
    short_description: '',
    slug: '',
    id_network: null,
    user_id: null,
    id_category: null,
    id_file: null,
});
const postTags = ref();
const categories = reactive<BlogCategory[]>([]);

async function loadTags() {
    try {
        const response = await tagService.get();
        const data: Tag[] = response.data;
        tags.push(...data);

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

async function loadBlogCategories() {
    try {
        const response = await blogService.getCategories();
        const data: BlogCategory[] = response.data;
        categories.push(...data);

        console.log(data);
    } catch (e) {
        console.error(e);
    }
}


function nextStep() {
    switch (step.value) {
        case 1:
            firstStepForm.value.validate().then((success: boolean) => {
                if (success) stepper.value.next();
            });
            break;
        case 2:
            if (blogPost.content == '') {
                $q.notify({
                    color: 'negative',
                    message: 'Tu post necesita contenido!',
                    icon: 'report_problem',
                });
                return;
            }
            stepper.value.next();
        case 3:
            if (postFile.value != null && postFile.value != undefined) savePost();
        default:
            break;
    }
}

async function savePost() {
    try {
        const { network } = route.params as RouteParams;
        blogPost.id_network = network as string;
        const { data } = await blogService.storePost(blogPost);

        await blogService.createTags(postTags.value as number[], data.id);

        const formData = new FormData();
        if (postFile.value) {
            formData.append('image', postFile.value);
            await blogService.uploadImage(data.id, formData);
        }
        router.push('/blog/detail/' + data.id);
    } catch (e) {
        $q.notify({
            color: 'negative',
            message: 'Tu post no pudo ser creado!',
            icon: 'report_problem',
        });
    }
}

onMounted(() => {
    loadTags();
    loadBlogCategories();
});

</script>

<template>
    <q-page padding class="flex justify-center items-center">

        <q-stepper v-model="step" ref="stepper" color="primary" animated flat vertical
            class="rounded-corners stepperContainer">
            <template v-slot:message>
                <q-banner v-if="step === 1" class="q-px-lg">
                    <div class="text-h5 text-bold text-primary">
                        Comencemos el Post
                    </div>
                    <div class="text-subtitle2 text-accent">
                        Comencemos definiendo los datos basicos del post
                    </div>
                </q-banner>

                <q-banner v-else-if="step === 2" class="q-px-lg">
                    <div class="text-h5 text-bold text-primary">
                        Definamos el Post
                    </div>
                    <div class="text-subtitle2 text-accent">
                        Describa a continuación el post
                    </div>
                </q-banner>
            </template>
            <q-step :name="1" title="Información Básica" icon="settings" :done="step > 1">
                <q-form ref="firstStepForm" class="q-gutter-md">
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-input outlined v-model="blogPost.title" label="Titulo" hint="El titulo de tu evento"
                                lazy-rules :rules="[Rules.required, Rules.maxLength]" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-select outlined v-model="blogPost.id_category" :options="categories" option-value="id"
                                option-label="name" emit-value map-options label="Categorias" :rules="[Rules.required]" />
                        </div>
                        <div class="col-12">
                            <q-input outlined v-model="blogPost.short_description" label="Descripción" type="textarea"
                                lazy-rules
                                :rules="[Rules.required, (value) => value.length <= 150 || 'La descripción no puede ser mayor a 150 caracteres']" />
                        </div>
                        <div class="col-12">
                            <q-select label="Tags" outlined v-model="postTags" use-input use-chips multiple
                                input-debounce="0" :options="tags" option-value="id" option-label="name" emit-value
                                map-options :rules="[Rules.required]" />
                        </div>
                    </div>
                </q-form>
            </q-step>

            <q-step :name="2" title="Contenido" icon="create_new_folder" :done="step > 2">
                <q-form ref="secondStepForm" class="q-gutter-md">
                    <q-editor :toolbar="toolbarConfig.toolbarConfig" v-model="blogPost.content" min-height="10rem"
                        hint="Aqui puedes poner el contenido de tu post" />
                </q-form>
            </q-step>

            <q-step :name="3" title="Imagenes" icon="create_new_folder" :done="step > 3">

                <q-file v-model="postFile" label="Imagen del Post" outlined :rules="[Rules.required]" accept=".jpg, image/*"
                    max-file-size="20480000" />
            </q-step>



            <template v-slot:navigation>
                <q-stepper-navigation class="flex justify-end">
                    <q-btn v-if="step > 1" flat color="primary" @click="($refs.stepper as QStepper).previous()"
                        label="Atras" class="q-ml-sm" icon="chevron_left" />

                    <q-btn @click="nextStep()" color="primary" :icon="step === 4 ? 'save' : 'chevron_right'" rounded>
                        <strong>{{ step === 4 ? 'Terminar' : 'Continuar' }}</strong>
                    </q-btn>
                </q-stepper-navigation>
            </template>
        </q-stepper>
    </q-page>
</template>
<style lang="scss" scoped>
.stepperContainer {
    width: 60%;
}


@media (max-width: $breakpoint-md-min) {
    .stepperContainer {
        width: 95%;
    }
}

@media (min-width: $breakpoint-md-max) {
    .stepperContainer {
        width: 60%;
    }
}
</style>