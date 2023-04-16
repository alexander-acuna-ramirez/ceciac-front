<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-card flat>
          <q-card-section>
            <q-item-label header> Proyectos Populares </q-item-label>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label>Proyecto A</q-item-label>
                <q-item-label caption>Categoría 1</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="mdi-link" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Proyecto B</q-item-label>
                <q-item-label caption>Categoría 2</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="mdi-link" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Proyecto C</q-item-label>
                <q-item-label caption>Categoría 1</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="mdi-link" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" class="q-mt-md w-full" label="Publica un proyecto" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <!--<q-card flat class="post-card q-mb-sm" v-for="card in 5" :key="card">
        <q-card-section>
          <div class="row items-center q-col-gutter-md">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <div class="col q-ml-sm">
              <q-card-title class="text-bold">Nombre del autor</q-card-title>
              <div class="text-grey">Hace 10 minutos</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-card-main>
            <div class="text-h6">Título del post</div>
            <div>Contenido del post</div>
          </q-card-main>
        </q-card-section>

        <q-card-section>
          <div class="row items-center">
            <q-btn icon="favorite_border" color="primary" class="q-mr-sm" />
            <q-btn icon="share" color="primary" class="q-mr-sm" />
            <q-btn icon="comment" color="primary" class="q-mr-sm" />
            <q-space />
            <div class="text-grey">50 likes</div>
          </div>
        </q-card-section>
        </q-card>-->
        <q-card flat class="q-mb-sm" v-for="card in 3" :key="card">
          <q-card-section>
            <div class="row items-center">
              <div class="col-auto">
                <q-avatar>
                  <img src="https://www.w3schools.com/howto/img_avatar.png" />
                </q-avatar>
              </div>
              <div class="col">
                <q-item-label header>
                  John Doe
                </q-item-label>
                <q-item-label caption>
                  Hace 5 minutos
                </q-item-label>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-item-label>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel eros vitae elit dictum hendrerit. In
              porttitor augue sit amet ipsum consequat aliquam. Sed vel lorem odio.
            </q-item-label>
          </q-card-section>

          <q-card-section>
            <q-btn flat icon="thumb_up" label="Like" />
            <q-btn flat icon="comment" label="Comment" />
            <q-btn flat icon="share" label="Share" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat>
          <q-card-section>
            <q-item-label header> Próximos Eventos </q-item-label>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-item v-for="event in events" :key="event.id">
                <q-item-section>
                  <q-item-label>{{ event.title }}</q-item-label>
                  <q-item-label caption>{{ event.date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn icon="mdi-chevron-right" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card flat class="q-mt-sm">
          <q-card-section>
            <q-item-label header> Redes Recomendadas </q-item-label>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-item v-for="network in networks" :key="network.id">
                <q-item-section>
                  <q-item-label>{{ network.name }}</q-item-label>
                  <q-item-label caption>{{ network.category }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn icon="mdi-link" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
const events = [
  { id: 1, title: 'Proyecto A', date: 'Mayo 1, 2023' },
  { id: 2, title: 'Proyecto B', date: 'Junio 15, 2023' },
  { id: 3, title: 'Proyecto C', date: 'Julio 20, 2023' },
  { id: 4, title: 'Proyecto D', date: 'Agosto 5, 2023' },
  { id: 5, title: 'Proyecto E', date: 'Septiembre 10, 2023' },
];
const networks = [
  { id: 1, name: 'Red A', category: 'Social' },
  { id: 2, name: 'Red B', category: 'Profesional' },
  { id: 3, name: 'Red C', category: 'Empresarial' },
  { id: 4, name: 'Red D', category: 'Académica' },
  { id: 5, name: 'Red E', category: 'Comunitaria' },
];
</script>
<style lang="scss">
.post-card {
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
  background-color: #fff;
  padding: 16px;
}

.post-card .q-card-section:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.post-card .text-bold {
  font-weight: 500;
}

.post-card .text-grey {
  color: #9a9a9a;
  font-size: 12px;
}

.post-card .q-btn {
  font-size: 16px;
}

.post-card .q-btn i {
  font-size: 20px;
}

.post-card .q-space {
  width: 16px;
}
</style>
