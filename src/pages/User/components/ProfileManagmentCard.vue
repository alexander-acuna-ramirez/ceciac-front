<script lang="ts" setup>
import { NetworkRepresentative } from 'src/models';
import { Functions } from 'src/utils';
import { ref, onMounted } from 'vue';
import { NetworkService } from 'src/services/NetworkService';

const slide = ref(1);
const props = defineProps({
    member: {
        required: true,
        type: Object as () => NetworkRepresentative,
    },
});
const emit = defineEmits(['reload'])
const loadingDelete = ref(false);
const ranks = [
    { label: "Administrador", value: 1 },
    { label: "Gestor de contenido", value: 2 },
    { label: "Miembro", value: 3 },
];
const networkService = new NetworkService();
const selectedRank = ref(1);

function formatDate(date: string) {
    const fecha = new Date("2003-07-02");
    const fechaFormateada = fecha.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return fechaFormateada;
}

async function deleteMember() {

    loadingDelete.value = true;
    try {
        if (props.member.id) {
            await networkService.deleteUserNetwork(props.member.id);
            emit('reload');
        }
    } catch (e) {
        console.error(e);
    } finally {
        loadingDelete.value = false;
    }
}

onMounted(() => {
    selectedRank.value = props.member.rank;
})
</script>
<template>
    <q-card class="my-card rounded-corners" flat bordered>

        <q-img v-if="member.user?.banner" :src="member.user?.banner.fullpath" :name="member.user?.banner.filename"
            spinner-color="primary" spinner-size="82px" style="height: 45%; ">
            <q-chip label="Administrador" v-if="member.rank == 1" size="sm" />
            <q-chip label="Gestor de contenido" v-if="member.rank == 2" size="sm" />
            <q-chip label="Miembro" v-if="member.rank == 3" size="sm" />
        </q-img>
        <q-img v-else src="~assets/img/app/user/user-profile-banner-default.jpg" spinner-color="primary" spinner-size="82px"
            style="height: 45%; ">
            <q-chip label="Administrador" v-if="member.rank == 1" size="sm" />
            <q-chip label="Gestor de contenido" v-if="member.rank == 2" size="sm" />
            <q-chip label="Miembro" v-if="member.rank == 3" size="sm" />
        </q-img>

        <q-card-section style="height: 35%;">

            <div class="row no-wrap ">
                <q-avatar size="45px" rounded v-if="member.user?.logo">
                    <img :src="member.user?.logo?.fullpath" alt="" />
                </q-avatar>

                <q-avatar size="45px" rounded v-else>
                    <img src="~assets/img/app/user/user-profile-default.jpg" alt="" />
                </q-avatar>

                <div class="q-ml-md column">
                    <div class="col text-subtitle1 text-bold text-secondary">


                        <router-link :to="'/profile/' + member.id" class="post-title">{{ member.user?.name + " " +
                            member.user?.lastname
                        }}</router-link>
                    </div>
                    <div class="text-subtitle2  text-accent">
                        Asignación {{ Functions.formatDate(member.created_at ?? '') }}
                    </div>
                </div>
            </div>

            <div class="q-mt-md text-accent text-subtitle2">
                {{ member.user?.professional_summary ?? "Sin resumen" }}
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: 15%;" class="flex row items-center justify-end q-pb-none">
            <!--<q-select v-model="selectedRank" :options="ranks" label="Rango" map-options emit-value option-label="label"
                option-value="value" filled style="width: 70%;" dense />-->
            <q-space />
            <q-btn color="primary" icon="close" flat rounded @click="deleteMember()" :loading="loadingDelete" no-caps>
                Expulsar
            </q-btn>

        </q-card-section>
    </q-card>
</template>

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

.post-desc {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
