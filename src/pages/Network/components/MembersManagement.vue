<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { NetworkService } from 'src/services';
import { NetworkRepresentative } from 'src/models';
import { QTableColumn, QTableProps } from 'quasar';
import { Functions } from 'src/utils';


const props = defineProps({
    network: {
        required: true,
        type: Number
    },
});
const networkService = new NetworkService();
const members = reactive<NetworkRepresentative[]>([]);
const paginationData = reactive({
    current_page: 1,
    total: 0,
    last_page: 0,
});
const pagination = reactive({
    sortBy: 'id',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
});

const searchData = reactive({
    searchTerm: '',
    rank: '',
})

const ranks = [
    { label: "Administrador", value: 1 },
    { label: "Gestor", value: 2 },
    { label: "Miembro", value: 2 },
];
const columns: QTableColumn[] = [
    {
        name: 'name',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: (row) => row.user.name,
    },
    {
        name: 'email',
        required: true,
        label: 'E-mail',
        align: 'left',
        field: (row) => row.user.email,
    },
    {
        name: 'rank',
        align: 'center',
        label: 'Rango',
        field: 'rank',
        sortable: false,
    },
    {
        name: 'created_at',
        label: 'Fecha de asignación',
        field: 'created_at',
        sortable: false,
    },
    {
        name: 'actions',
        label: 'Acciones',
        field: 'created_at',
        sortable: false,
    },
];

async function loadMembers(
    page = 1,
) {
    const response = await networkService.networkMembersManage(
        props.network as number,
        {
            page,
            searchTerm: searchData.searchTerm,
            rank: searchData.rank,
            sortOrder: (pagination.descending) ? 'desc' : 'asc',
            sortBy: pagination.sortBy,
        }
    );

    members.splice(0, members.length);
    members.push(...response.data.data);
    pagination.rowsNumber = response.data.total;

}

async function onRequestMembers(propsData: QTableProps) {
    if (propsData.pagination) {
        const { page, rowsPerPage, sortBy, descending } = propsData.pagination;


    }
}

onMounted(() => {
    loadMembers(1);
})

</script>
<template>
    <q-card>

        <q-card-section>
            <q-table title="Miembros" :data="members" :columns="columns" row-key="id" v-model:pagination="pagination"
                @request="onRequestMembers" flat :rows="members">
                <template v-slot:top>
                    <div class="text-h6 text-primary text-bold">Miembros</div>
                    <q-space />
                    <q-btn unelevated color="primary" icon="add" rounded>
                        <strong>Invitar</strong>
                    </q-btn>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="name" :props="props">
                            {{ props.row.user.name }}
                        </q-td>
                        <q-td key="email" :props="props">
                            {{ props.row.user.email }}
                        </q-td>
                        <q-td key="rank" :props="props">
                            <q-chip label="Administrador" size="sm" v-if="props.row.rank == 1" />
                            <q-chip label="Gestor de contenido" size="sm" v-if="props.row.rank == 2" />
                            <q-chip label="Miembro" size="sm" v-if="props.row.rank == 3" />
                        </q-td>
                        <q-td key="created_at" :props="props">
                            {{ Functions.formatDate(props.row.created_at) }}
                        </q-td>
                        <q-td key="actions" :props="props">
                            <q-btn unelevated flat round color="primary" icon="close" :disable="props.row.rank == 1" />
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
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