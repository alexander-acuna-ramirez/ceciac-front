<template>
    <div class="banner">

        <h2>{{ title }}</h2>
        <img src="~assets/img/job-interview.png" alt="Quasar">
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
// https://www.flaticon.com/packs/hiring-process-5

defineProps({

})
const imageSrc = ref('ruta-de-la-imagen-quasar.jpg')
const title = ref('Inicia un nuevo proyecto desde aqui')
const ctaLink = ref('#')
const ctaText = ref('Llamado a la acción')
</script>
  
<style scoped>
.banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 150px;
    background-color: blue;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
}

.banner img {
    height: 95%;
    width: auto;

}

.banner h2 {
    position: relative;
    color: #fff;
    font-size: 2rem;
    text-align: center;
    z-index: 1;
}

.cta-btn {
    display: block;
    padding: 12px 24px;
    margin-top: 24px;
    color: #fff;
    background-color: #007bff;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
}

.cta-btn:hover {
    background-color: #0056b3;
}
</style>