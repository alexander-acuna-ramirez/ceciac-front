<template>
  <q-header elevated class="bg-primary">
    <q-toolbar>
      <q-btn flat dense round icon="menu" @click="$emit('menu-toggle')" />

      <q-toolbar-title>
        <img src="/statics/logo.png" class="logo" alt="Logo" />
      </q-toolbar-title>

      <q-input
        outlined
        dense
        placeholder="Search"
        class="search"
        v-model="searchQuery"
        @keydown.enter="$emit('search', searchQuery)"
      />

      <q-btn flat round dense icon="notifications" />

      <q-avatar>
        {{ username.substring(0, 1).toUpperCase() }}
      </q-avatar>

      <q-menu>
        <q-btn
          flat
          round
          dense
          icon="arrow_drop_down"
          @click="showMenu = !showMenu"
        />
        <q-list v-model="showMenu" @hide="showMenu = false" dense>
          <q-item clickable>
            <q-item-section avatar>
              <q-avatar>
                {{ username.substring(0, 1).toUpperCase() }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ username }}</q-item-label>
              <q-item-label caption>View Profile</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'MenuComponent',

  props: {
    username: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      searchQuery: '',
      showMenu: false,
    };
  },
};
</script>

<style scoped>
.logo {
  height: 40px;
  margin-right: 12px;
}

.search {
  flex: 1;
  margin-right: 12px;
}

.q-item__section--avatar {
  padding-right: 0;
}

.q-menu {
  margin-right: 12px;
}
</style>
