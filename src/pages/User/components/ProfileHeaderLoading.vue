<template>
  <div>
    <div>
      <div class="row items-between wrap q-mt-sm institutionData">
        <q-skeleton
          size="120px"
          class="rounded-corners"
          square
          animation="fade"
        />

        <div class="col q-ml-sm q-mt-none institutionInfo">
          <q-skeleton type="text" width="50%" height="80px" animation="fade" />
          <q-skeleton type="text" height="12px" animation="fade" width="20%" />
          <q-skeleton type="text" height="12px" width="15%" animation="fade" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@media (max-width: $breakpoint-md-min) {
  .institutionData {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .institutionInfo {
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
  }
}
</style>
