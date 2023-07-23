<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { NetworkService } from 'src/services';
import { NetworkRepresentative } from 'src/models';
import ProfileManagementCard from 'src/pages/User/components/ProfileManagmentCard.vue';

const props = defineProps({
  network: {
    required: true,
    type: Number,
  },
});
const networkService = new NetworkService();
const members = reactive<NetworkRepresentative[]>([]);
const membersAddDialog = ref(false);

const pagination = reactive({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 1,
  rowsNumber: 0,
});

const searchData = reactive({
  searchTerm: '',
  rank: '',
});

const ranks = [
  { label: 'Administrador', value: 1 },
  { label: 'Gestor de contenido', value: 2 },
  { label: 'Miembro', value: 3 },
];

const memberAddRequest = reactive({
  user: '',
  rank: '',
});
const loadingAddMember = ref(false);

const options = ref([]);

async function loadMembers(page = 1) {
  const response = await networkService.networkMembersManage(
    props.network as number,
    {
      page,
      perpage: pagination.rowsNumber,
      searchTerm: searchData.searchTerm,
      rank: searchData.rank,
      sortOrder: pagination.descending ? 'desc' : 'asc',
      sortBy: pagination.sortBy,
    }
  );

  members.splice(0, members.length);
  members.push(...response.data);
  //pagination.rowsNumber = response.data.total;
}

function filterUser(val: string, update: any, abort: any) {
  update(async () => {
    if (val === '') {
      options.value = [];
    } else {
      const response = await networkService.networkSearchUser(
        props.network ?? '',
        val.trim()
      );
      options.value = response.data;
    }
  });
}
async function addMember() {
  loadingAddMember.value = true;
  try {
    await networkService.networkAddMember(props.network, memberAddRequest);
    membersAddDialog.value = false;
    Object.assign(memberAddRequest, {
      user: '',
      rank: '',
    });
    loadMembers(1);
  } catch (e) {
    console.error(e);
  } finally {
    loadingAddMember.value = false;
  }
}

onMounted(() => {
  loadMembers(1);
});
</script>
<template>
  <q-card>
    <q-card-section class="flex justify-end">
      <q-btn
        color="primary"
        icon="add"
        label="Agregar"
        @click="membersAddDialog = true"
        rounded
        unelevated
      />
    </q-card-section>
    <q-card-section class="gallery">
      <profile-management-card
        @reload="loadMembers(1)"
        v-for="member in members"
        :member="member"
        :key="member.id"
      ></profile-management-card>
    </q-card-section>
    <q-card-section>
      <!--<q-pagination v-model="pagination.page" :max="pagination.rowsNumber" />-->
    </q-card-section>

    <q-dialog v-model="membersAddDialog">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6 text-primary text-bold">Agregar Usuario</div>
        </q-card-section>
        <q-card-section class="row q-col-gutter-md">
          <q-select
            class="col-12"
            outlined
            v-model="memberAddRequest.user"
            use-input
            input-debounce="0"
            label="Buscar Usuarios"
            :options="options"
            @filter="filterUser"
            hint="Ingrese el e-mail"
            option-label="email"
            option-value="id"
            emit-value
            map-options
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-avatar size="50px" rounded>
                    <img
                      :src="scope.opt.logo.fullpath"
                      alt="Logo"
                      v-if="scope.opt.logo != null"
                    />
                    <img
                      src="~assets/img/app/user/user-profile-default.jpg"
                      alt="Logo"
                      v-else
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    scope.opt.name + ' ' + scope.opt.lastname
                  }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            class="col-12"
            v-model="memberAddRequest.rank"
            :options="ranks"
            label="Rango"
            outlined
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            unelevated
            flat
            label="Cancelar"
            color="secondary"
            v-close-popup
            rounded
          />
          <q-btn
            unelevated
            color="primary"
            @click="addMember()"
            rounded
            :loading="loadingAddMember"
          >
            <strong>Agregar</strong>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
