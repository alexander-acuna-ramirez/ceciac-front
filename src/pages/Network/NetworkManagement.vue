<script lang="ts" setup>
import { ref } from 'vue';
const tab = ref("projects");
const members = [
    {
        id: 1,
        name: 'John Doe',
        rank: 'Manager',
        avatar: 'https://picsum.photos/id/1018/200/200',
    },
    {
        id: 2,
        name: 'Jane Smith',
        rank: 'Assistant Manager',
        avatar: 'https://picsum.photos/id/1027/200/200',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        rank: 'Supervisor',
        avatar: 'https://picsum.photos/id/1035/200/200',
    },
];
</script>
<template>
    <q-page padding class="q-px-xl">
        <div class="row">
            <div class="flex items-center justify-between" style="width: 100%; min-height: 200px;">
                <div class="flex items-center">
                    <q-avatar size="100px" font-size="52px" color="teal" text-color="white">
                        <q-img src="https://picsum.photos/id/237/200/200" spinner-color="primary" spinner-size="82px" />
                    </q-avatar>
                    <!-- Nombre de la institución -->
                    <div class="q-ml-sm text-h4 text-secondary">
                        Universidad Católica de Santa María
                    </div>
                </div>
                <!-- Chip para el rango de la persona -->
                <q-chip label="Rango: Gestor de contenido" color="primary" />
            </div>
        </div>

        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-9">
                <q-card flat class="q-pa-md">
                    <q-tabs v-model="tab" dense class="text-secondary" active-color="primary" indicator-color="primary"
                        align="justify">
                        <q-tab name="projects" label="Projectos" icon="scatter_plot" />
                        <q-tab name="events" label="Eventos" icon="event" />
                        <q-tab name="posts" label="Posts" icon="post_add" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab">
                        <q-tab-panel name="projects">
                            <q-toolbar flat>
                                <q-input v-model="tab" type="text" label="Buscar" filled />

                                <q-space />
                                <q-btn color="primary" label="Publicar" dense flat />
                            </q-toolbar>
                            <div class="text-h6">Alarms</div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </q-tab-panel>

                        <q-tab-panel name="events">
                            <div class="text-h6">Alarms</div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </q-tab-panel>

                        <q-tab-panel name="posts">
                            <div class="text-h6">Movies</div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
            <div class="col-12 col-md-3">
                <q-card flat>
                    <q-card-section>
                        <div class="text-h6 text-primary text-bold">
                            Miembros
                        </div>
                    </q-card-section>
                    <q-card-section class="row items-center">
                        <q-list>
                            <q-item v-for="member in members" :key="member.id">
                                <q-item-section avatar>
                                    <q-avatar :src="member.avatar" />
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ member.name }}</q-item-label>
                                    <q-item-label caption>{{ member.rank }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                    <q-card-section>
                        <q-btn color="primary" style="width: 100%;" label="Administrar" flat />
                    </q-card-section>


                </q-card>
            </div>
        </div>

    </q-page>
</template>
<style lang="scss" scoped>
.overlapping {
    border: 2px solid white;
    position: absolute;
}
</style>