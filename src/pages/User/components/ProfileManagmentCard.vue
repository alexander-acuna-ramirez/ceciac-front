<script lang="ts" setup>
import { NetworkRepresentative } from 'src/models';
import { Functions } from 'src/utils';
import { ref, onMounted } from 'vue';
import { NetworkService } from 'src/services/NetworkService';
import { useQuasar } from 'quasar';
import { AxiosError } from 'axios';

const slide = ref(1);
const props = defineProps({
  member: {
    required: true,
    type: Object as () => NetworkRepresentative,
  },
  settings: {
    required: false,
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['reload']);
const loadingDelete = ref(false);
const ranks = [
  { label: 'Administrador', value: 1 },
  { label: 'Gestor de contenido', value: 2 },
  { label: 'Miembro', value: 3 },
];
const networkService = new NetworkService();
const selectedRank = ref(1);
const $q = useQuasar();

function formatDate(date: string) {
  const fecha = new Date('2003-07-02');
  const fechaFormateada = fecha.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return fechaFormateada;
}

/*
async function deleteMember() {
  loadingDelete.value = true;
  try {
    if (props.member.id) {
      await networkService.deleteUserNetwork(props.member.id);
      emit('reload');
    }
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 403) {
      const response = (e as AxiosError)?.response;
      const responseData: any = response;
      if (response) {
        $q.notify({
          color: 'info',
          message: responseData.msg,
          icon: 'info',
        });
      }
    } else {
      $q.notify({
        color: 'negative',
        message: 'No se pudo concluir con el registro, intente más tarde!',
        icon: 'report_problem',
      });
    }
  } finally {
    loadingDelete.value = false;
  }
}*/
async function deleteMember() {
  try {
    loadingDelete.value = true;
    if (!props.member.id) {
      return; // No hay ID, no se puede eliminar
    }

    await networkService.deleteUserNetwork(props.member.id);
    emit('reload');

    // Notificar éxito
    $q.notify({
      color: 'info',
      message: 'Miembro eliminado exitosamente',
      icon: 'info',
    });
  } catch (error) {
    // Manejar errores
    if (error instanceof AxiosError && error.response?.status === 403) {
      // Error 403: Prohibido
      const responseData = error.response.data;

      // Notificar error con detalles
      $q.notify({
        color: 'info',
        message: responseData.msg,
        icon: 'info',
      });
    } else {
      // Otro error no manejado
      $q.notify({
        color: 'negative',
        message: 'No se pudo concluir con la operación, intente más tarde',
        icon: 'report_problem',
      });
    }
  } finally {
    // Finalizar carga
    loadingDelete.value = false;
  }
}

onMounted(() => {
  selectedRank.value = props.member.rank;
});
</script>
<template>
  <q-card flat bordered>
    <q-img
      v-if="member.user?.banner"
      :src="member.user?.banner.fullpath"
      :name="member.user?.banner.filename"
      spinner-color="primary"
      spinner-size="82px"
      style="height: 45%"
      ><div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip label="Administrador" v-if="member.rank == 1" size="sm" />
        <q-chip label="Gestor de contenido" v-if="member.rank == 2" size="sm" />
        <q-chip label="Miembro" v-if="member.rank == 3" size="sm" />
      </div>
    </q-img>
    <q-img
      v-else
      src="~assets/img/app/user/user-profile-banner-default.jpg"
      spinner-color="primary"
      spinner-size="82px"
      style="height: 45%"
    >
      <div
        style="
          width: 100%;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
        "
      >
        <q-chip label="Administrador" v-if="member.rank == 1" size="sm" />
        <q-chip label="Gestor de contenido" v-if="member.rank == 2" size="sm" />
        <q-chip label="Miembro" v-if="member.rank == 3" size="sm" />
      </div>
    </q-img>

    <q-card-section style="height: 35%">
      <div class="row no-wrap">
        <q-avatar size="45px" rounded v-if="member.user?.logo">
          <img :src="member.user?.logo?.fullpath" alt="" />
        </q-avatar>

        <q-avatar size="45px" rounded v-else>
          <img src="~assets/img/app/user/user-profile-default.jpg" alt="" />
        </q-avatar>

        <div class="q-ml-md column">
          <div class="col text-subtitle1 text-bold text-secondary">
            <router-link :to="'/profile/' + member.id" class="post-title">{{
              member.user?.name + ' ' + member.user?.lastname
            }}</router-link>
          </div>
          <div class="text-subtitle2 text-accent" v-if="settings">
            Asignación {{ Functions.formatDate(member.created_at ?? '') }}
          </div>
          <div
            class="text-subtitle2 text-accent"
            v-if="member && member.user && member.user.country"
          >
            <div>
              <span>
                <img
                  :src="
                    'https://flagcdn.com/w20/' +
                    member.user?.country.iso.toLowerCase() +
                    '.png'
                  "
                />
                <small class="q-ml-sm">{{
                  member.user?.country.name
                }}</small></span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="q-mt-md text-accent text-subtitle2">
        {{ member.user?.professional_summary ?? 'Sin resumen' }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section
      style="height: 15%"
      class="flex row items-center justify-end q-pb-none"
    >
      <q-space />
      <q-btn
        color="primary"
        flat
        rounded
        :to="'/profile/' + member.id_user"
        no-caps
      >
        <span>Ver Perfil</span>
      </q-btn>
      <q-btn
        v-if="settings"
        color="primary"
        flat
        rounded
        @click="deleteMember()"
        :loading="loadingDelete"
        no-caps
      >
        <span>Expulsar</span>
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
