<script setup lang="ts">
import { ProjectParticipant } from 'src/models';
import { reactive, ref, onMounted } from 'vue';
import { ProjectService } from 'src/services';
import { QTableColumn, QTableProps } from 'quasar';
import { Functions } from 'src/utils';
import { useQuasar } from 'quasar';

const props = defineProps({
  project: {
    required: true,
    type: Number,
  },
});
const projectService = new ProjectService();
const participants = reactive<ProjectParticipant[]>([]);
const participantsPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const loading = ref(false);
const $q = useQuasar();
const columns: QTableColumn[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.user.name + ' ' + row.user.lastname,
  },
  {
    name: 'email',
    required: true,
    label: 'E-mail',
    align: 'left',
    field: (row) => row.user.email,
  },
  {
    name: 'country',
    required: true,
    label: 'País',
    align: 'left',
    field: (row) => (row.user.country != null ? row.user.country.nicename : ''),
  },
  {
    name: 'created_at',
    label: 'Fecha de incripción',
    field: (row) => Functions.formatDate(row.created_at),
    sortable: false,
  },
];
async function loadParticipants(
  page = 1,
  perpage = 10,
  sortBy = 'created_at',
  sortOrder = 'desc',
  searchTerm = '',
  start_date = '',
  end_date = ''
) {
  try {
    loading.value = true;
    const response = await projectService.projectParticipants(
      props.project.toString(),
      page,
      perpage,
      sortBy,
      sortOrder,
      searchTerm,
      start_date,
      end_date
    );
    participants.slice(0, participants.length);
    participants.push(...response.data.data);
    participantsPagination.value.rowsNumber = response.data.total;
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'No se pudieron cargar los participantes',
    });
  } finally {
    loading.value = false;
  }
}

async function onParticipantsRequest(props: QTableProps) {
  if (props.pagination) {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    let sortOrder = descending ? 'desc' : 'asc';
    loadParticipants(page, rowsPerPage, sortBy, sortOrder);
  }
}
onMounted(() => {
  loadParticipants();
});
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <div class="text-subtitle1 text-bold text-primary">
        Participantes del proyecto
      </div>
      <div class="text-subtitle2 text-accent">
        Aqui puedes ver a los interesados en tu proyecto!
      </div>
    </div>
    <q-table
      :data="participants"
      :columns="columns"
      row-key="id"
      v-model:pagination="participantsPagination"
      @request="onParticipantsRequest"
      flat
      :rows="participants"
      :loading="loading"
      class="col-12 col-md-12"
    >
    </q-table>
  </div>
</template>
