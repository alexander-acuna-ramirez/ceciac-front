<script setup lang="ts">
import NavbarComponent from 'src/components/NavbarComponent.vue';
import FooterComponent from 'src/components/FooterComponent.vue';
</script>
<template>
  <q-layout view="hHh lpR fFf" style="background-color: #eff4fb">

    <navbar-component></navbar-component>
    <q-page-container>
      <router-view />
    <footer-component></footer-component>
  </q-page-container>

  <!--<q-footer class="bg-primary text-white q-pa-md">
      <div class="row">
        <div class="col">
          <div class="flex items-center">
            <q-img src="~assets/img/ceciac-logo.png" class="col-logo-img" />
            <div class="col-logo-text">
              <div class="text-weight-bold">Mi Empresa</div>
              <div>¡Tu tienda en línea favorita!</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="text-weight-bold">Important Links</div>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="col">
          <div class="text-weight-bold">Community</div>
          <ul>
            <li><a href="#">Newsfeed</a></li>
            <li><a href="#">Groups</a></li>
            <li><a href="#">Friends</a></li>
            <li><a href="#">Forums</a></li>
          </ul>
        </div>

        <div class="col">
          <div class="text-weight-bold">Community</div>
          <ul>
            <li><a href="#">Newsfeed</a></li>
            <li><a href="#">Groups</a></li>
            <li><a href="#">Friends</a></li>
            <li><a href="#">Forums</a></li>
              </ul>
              </div>
              </div>
            </q-footer>-->
  </q-layout>
</template>
<style scoped lang="scss"></style>
