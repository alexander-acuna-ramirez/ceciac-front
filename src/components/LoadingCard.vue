<script lang="ts" setup></script>
<template>
  <q-card class="my-card" flat bordered>
    <q-skeleton height="45%" square> </q-skeleton>
    <q-card-section style="height: 35%">
      <q-skeleton type="text" height="36px" />

      <q-skeleton type="text" height="20px" />

      <q-skeleton type="text" height="20px" />
    </q-card-section>

    <q-separator />
    <q-card-section class="row items-start no-wrap" style="height: 15%">
      <q-skeleton size="56px" square animation="fade" />

      <div class="col q-pl-sm">
        <q-skeleton type="text" square width="30%" animation="fade" />
        <q-skeleton type="text" square height="12px" animation="fade" />
        <q-skeleton
          type="text"
          square
          height="12px"
          width="75%"
          class="rounded-borders"
          animation="fade"
        />
      </div>
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
