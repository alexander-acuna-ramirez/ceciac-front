<template>
  <q-page padding>
    <q-page-container>
      <q-card class="my-card" flat>
        <q-card-section class="flex justify-between">
          <div>
            <div class="text-h6 text-bold text-primary">
              Publicaciones de CECIAC
            </div>
            <div class="text-subtitle2">
              Agrega tus información sobre las publicaciones de la RED!
            </div>
          </div>
          <q-btn
            label="Crear Nueva Publicación"
            color="primary"
            @click="openDialog"
            unelevated
            rounded
          />
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md">
            <!-- Tabla para mostrar publicaciones existentes -->
            <q-table :rows="publications" row-key="id" :columns="columns" flat>
              <template v-slot:body-cell-publisher="props">
                <q-td :props="props">
                  {{ props.row.network ? props.row.network.name : '' }}
                </q-td>
              </template>

              <template v-slot:body-cell-file="props">
                <q-td :props="props">
                  {{ props.row.file ? 'Si' : 'No' }}
                </q-td>
              </template>

              <template v-slot:body-cell-image="props">
                <q-td :props="props">
                  {{ props.row.image ? 'Si' : 'No' }}
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    icon="edit"
                    label="Editar"
                    color="accent"
                    flat
                    rounded
                    :no-caps="true"
                    @click="editPublication(props.row.id)"
                  />
                  <q-btn
                    color="red"
                    icon="clear"
                    label="Eliminar"
                    flat
                    rounded
                    :no-caps="true"
                    @click="deletePublication(props.row.id)"
                  />
                </q-td>
              </template>
            </q-table>
            <!-- Diálogo para el formulario de creación -->
            <q-dialog v-model="dialogVisible">
              <q-card style="min-width: 65%">
                <q-card-section>
                  <div class="text-h6 text-bold text-secondary">
                    Contenido CECIAC
                  </div>
                  <div class="text-subtitle2">
                    Agrega las publicaciones de CECIAC!
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-form>
                    <q-card-section>
                      <!-- Formulario para crear una nueva publicación -->
                      <q-form @submit.prevent="createPublication">
                        <div class="row q-col-gutter-md">
                          <div class="col-md-12 col-12">
                            <!-- Título -->
                            <q-input
                              v-model="publication.title"
                              label="Título"
                              :rules="[Rules.required, Rules.maxLength]"
                              :disable="loading"
                              filled
                            ></q-input>
                          </div>
                          <div class="col-md-6 col-12">
                            <!-- Tipo de publicación -->
                            <q-select
                              :disable="loading"
                              v-model="publication.type"
                              label="Tipo de Publicación"
                              :options="publicationTypes"
                              filled
                              emit-value
                              map-options
                              option-label="label"
                              :rules="[Rules.required]"
                              option-value="value"
                            ></q-select>
                          </div>
                          <div class="col-md-6 col-12">
                            <!-- Tipo de publicación -->
                            <q-input
                              :disable="loading"
                              v-model="publication.extra_file"
                              :rules="[Rules.optionalUrl]"
                              label="Enlace a recurso"
                              filled
                            ></q-input>
                          </div>

                          <div class="col-md-12 col-12">
                            <!-- Descripción -->
                            <q-input
                              :disable="loading"
                              v-model="publication.description"
                              :rules="[Rules.required]"
                              label="Descripción"
                              type="textarea"
                              filled
                            ></q-input>
                          </div>

                          <div class="col-12 col-md-6">
                            <q-file
                              :disable="loading"
                              filled
                              v-model="extraFile"
                              label="Archivo relacionado"
                              accept=".pdf, .docx, .xlsx, .csv, .xls"
                              hint="Formatos aceptados: PDF, DOCX, XLSX, CSV y XLS"
                            >
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>

                          <div class="col-12 col-md-6">
                            <q-file
                              :disable="loading"
                              filled
                              v-model="imageFile"
                              label="Imagén Relacionada"
                              accept="image/jpeg, image/png, image/jpg"
                              hint="Formatos aceptados: JPEG, PNG y JPG"
                            >
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>

                          <div class="col-md-6 col-12">
                            <!-- Fecha -->
                            <q-input
                              :disable="loading"
                              filled
                              v-model="publication.date"
                              mask="date"
                              :rules="[Rules.required]"
                              label="Fecha de publicación"
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date v-model="publication.date">
                                      <div class="row items-center justify-end">
                                        <q-btn
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                        </div>

                        <!-- Botón de Enviar -->
                        <div class="q-mt-md flex justify-end">
                          <q-btn
                            label="Cerrar"
                            color="accent"
                            rounded
                            @click="closeDialog"
                            flat
                            class="q-ml-md"
                            unelevated
                            :disable="loading"
                          ></q-btn>
                          <q-btn
                            :label="
                              isEditing
                                ? 'Editar Publicación'
                                : 'Crear Publicación'
                            "
                            type="submit"
                            color="primary"
                            rounded
                            class="q-ml-md"
                            unelevated
                          ></q-btn>
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { CeciacPublication } from 'src/models';
import { CeciacService } from 'src/services';
import { Rules } from 'src/utils/rules';
import { useQuasar } from 'quasar';
import { QTableColumn } from 'quasar';

const isEditing = ref(false);
const loading = ref(false);
const ceciacService = new CeciacService();
const publications = ref<CeciacPublication[]>([]); // Array de publicaciones existentes
const $q = useQuasar();
const dialogVisible = ref(false); // Controla la visibilidad del diálogo
const extraFile = ref<File>();
const imageFile = ref<File>();
const publication = reactive<CeciacPublication>({
  id: null,
  title: '',
  type: '',
  description: '',
  date: '',
  image: null,
  id_network: null,
  id_file: null,
  extra_file: '',
});

const publicationTypes = reactive([
  { label: 'Evento', value: 'event' },
  { label: 'Foro', value: 'forum' },
  { label: 'Publicación', value: 'publication' },
  { label: 'Proyecto', value: 'project' },
  { label: 'Otro', value: 'other' },
]);

const columns: QTableColumn[] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'left',
    field: (row) => row.id,
  },
  {
    name: 'title',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row) => row.title,
  },
  {
    name: 'type',
    required: true,
    label: 'Tipo de publicación',
    align: 'left',
    field: (row) => getLabel(row.type),
  },

  {
    name: 'publisher',
    required: true,
    label: 'Autor',
    align: 'left',
    field: (row) => row,
  },

  {
    name: 'file',
    required: true,
    label: 'Archivo Relacionado',
    align: 'left',
    field: (row) => row,
  },

  {
    name: 'file',
    required: true,
    label: 'Imagen Relacionada',
    align: 'left',
    field: (row) => row,
  },

  {
    name: 'date',
    required: true,
    label: 'Fecha de publicación',
    align: 'left',
    field: (row) => row.date,
  },
  {
    name: 'actions',
    sortable: false,
    label: 'Acciones',
    field: (row) => row,
  },
];

const createPublication = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      const publicationId = publication.id as unknown as string;
      await ceciacService.update(publicationId, publication);
      if (extraFile.value) await saveFile(publicationId);
      if (imageFile.value) await saveImage(publicationId);
    } else {
      const response = await ceciacService.create(publication);
      if (extraFile.value) await saveFile(response.data.publication.id);
      if (imageFile.value) await saveImage(response.data.publication.id);
    }
    $q.notify({
      message: 'Operación realizada correctamente!',
      type: 'positive',
    });
    closeDialog();
  } catch (e) {
    console.error(e);
  } finally {
    loadPublications();
    loading.value = false;
  }
};

const deletePublication = async (id: any) => {
  try {
    const response = await ceciacService.deletePublication(
      id as unknown as string
    );
  } catch (e) {
    console.error(e);
    $q.notify({
      message: 'Error eliminando publicación ',
    });
  } finally {
    loadPublications();
  }
};

const editPublication = async (id: any) => {
  const publicationData = publications.value.find((e) => e.id === id);
  Object.assign(publication, publicationData);
  isEditing.value = true;
  dialogVisible.value = true;
};

const saveImage = async (id: string) => {
  try {
    if (imageFile.value) {
      const data = new FormData();
      data.append('file', imageFile.value);
      return ceciacService.uploadImage(data, id);
    }
    return null;
  } catch (e) {
    console.error(e);
    $q.notify({
      message: 'Error subiendo el archivo ' + imageFile.value?.name,
    });
  }
};

const saveFile = async (id: string) => {
  try {
    if (extraFile.value) {
      const data = new FormData();
      data.append('file', extraFile.value);
      return ceciacService.uploadFile(data, id);
    }
    return null;
  } catch (e) {
    console.error(e);
    $q.notify({
      message: 'Error subiendo el archivo ' + extraFile.value?.name,
    });
  }
};

const openDialog = () => {
  closeDialog();
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  Object.assign(publication, {
    id: null,
    title: '',
    type: '',
    description: '',
    date: '',
    image: null,
    id_network: null,
    id_file: null,
    extra_file: '',
  });
  extraFile.value = undefined;
  imageFile.value = undefined;
  isEditing.value = false;
};

const loadPublications = async () => {
  try {
    const response = await ceciacService.list();
    publications.value.splice(0, publications.value.length);
    publications.value.push(...response.data.publications);
  } catch (e) {
    console.error(e);
    $q.notify({
      message: 'Error cargando publicaciones',
    });
  }
};

const getLabel = (value: string) => {
  return publicationTypes.find((e) => e.value === value)?.label;
};
onMounted(() => {
  loadPublications();
});
</script>
