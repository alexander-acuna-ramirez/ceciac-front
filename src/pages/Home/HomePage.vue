<template>
  <q-page padding>
    <!--HERO-->
    <section class="row" style="min-height: 450px">
      <div
        class="col-12 col-sm-12 col-md-6 q-pa-sm flex items-center justify-center"
      >
        <div style="text-align: left; width: 80%" class="q-py-md">
          <small class="text-bold text-secondary text-uppercase"
            >Inicia un nuevo proyecto aquí!</small
          >
          <div class="text-h3 text-bold text-secondary">
            Plataforma de integración de la RED
            <span class="text-primary">CECIAC</span>
          </div>
          <div class="text-subtitle1 q-mb-sm text-accent">
            Construcción y evaluación de capacidades de gestión de innovación en
            las universidades
          </div>

          <div>
            <q-form @submit.prevent="searchData" class="row q-col-gutter-md">
              <q-select
                v-model="contentType"
                :options="options"
                filled
                label="¿Que Buscas?"
                option-label="label"
                option-value="value"
                class="col-12 col-md-3"
                map-options
                emit-value
              />
              <q-input
                v-model="searchTerm"
                type="text"
                label="Comenzar a buscar"
                filled
                class="col-12 col-md-9"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-btn
                    rounded
                    unelevated
                    type="submit"
                    color="primary"
                    class="q-ml-sm"
                    @click="searchData()"
                  >
                    <strong>Buscar</strong>
                  </q-btn>
                </template>
              </q-input>
            </q-form>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-md-6 flex items-center justify-center">
        <div class="flex flex-center justify-center no-wrap" style="width: 80%">
          <div class="hero-decoration hero-decoration-first"></div>

          <div class="q-mx-sm hero-decoration hero-decoration-second"></div>

          <div class="hero-decoration hero-decoration-third"></div>
        </div>
      </div>
    </section>

    <section class="q-pa-md q-mt-xl q-mb-xl aber">
      <div class="container row aber">
        <!-- Columna con la Imagen -->
        <div class="column img">
          <div class="tf__about_2_img">
            <div class="tf__about_small">
                <img src="../../assets/img/bann1.png" alt="about us" class="img-fluid w-100">
            </div>
            <div class="tf__about_large">
                <img src="../../assets/img/ban2.png" alt="about us" class="img-fluid w-100">
            </div>
          </div>
        </div>
        
        <!-- Columna con el Texto -->
        <div class="column txt">
          <div style="display: flex;
            flex-direction: column;">
            <small class="text-uppercase text-bold text-primary">¿Qué es CECIAC?</small>
            <div class="text-h4 text-bold text-secondary">
              Conócenos
            </div>
          </div>
          <br>
          <p>Proyecto financiado por CYTED, en el que participan 8 países de la región iberoamericana: Argentina, Colombia, Chile, España, Ecuador, Guatemala, Perú y Panamá. Cuyo propósito es de construir y evaluar capacidades innovadoras del sector académico para impulsar el desarrollo tecnológico y social de la región.
          </p>
          <div class="container center-r">
            <q-btn
              rounded
              padding="8px 50px"
              color="primary"
              label="Ver más"
              @click="searchData()">
            </q-btn>
            <a href="" style="margin: 10px;" class="text-secondary text-uppercase text-bold">
                <q-icon name="call" /> <span style="text-decoration: underline;">+51 999 999 999</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section>
    <div class="section-banner">
      <div class="back-ban row">
        <div>
          <span class="text-center text-h3 text-bold">{{ countries }}</span>
          <p class="text-center text-h5">países</p>
        </div>
        <div>
          <span class="text-center text-h3 text-bold">+{{ universities }}</span>
          <p class="text-center text-h5">universidades</p>
        </div>
        <div>
          <span class="text-center text-h3 text-bold">+{{ professionals }}</span>
          <p class="text-center text-h5">profesionales</p>
        </div>
        <div>
          <span class="text-center text-h3 text-bold">+{{ members }}</span>
          <p class="text-center text-h5">miembros</p>
        </div>
      </div>
    </div>
  </section>

    <section class="q-pa-md q-mt-xl q-mb-xl text-center" 
    style="background-color: #000066; padding: 200px 40px 80px; margin: 0px -16px 100px">
    <small class="text-uppercase text-bold" style="color: #ffff;">Conoce nuestros</small>
    <p class="text-center text-bold text-h4" style="margin-bottom: 80px; color: #ffff;">Testimonios</p>
    <div class="container text-center row">
        <div class="column">
          <div class="testimonio">
            <div class="icon relative">
              <q-icon name="format_quote" />
            </div>
            <p style="margin-top: -50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi assumenda est in magnam vel maiores minus officia inventore blanditiis. Sunt, animi quam. Quisquam iste placeat iure obcaecati atque facilis fugit?</p>
            <img src="../../assets/img/user-ex.png" alt="about us" style="margin-bottom: -20px;">
            <h5 class="text-center text-h4 text-bold text-secondary" style="margin-bottom: 0px;">Testimonio 1</h5>
            <p class="text-bold text-primary">Usuario</p>
          </div>
        </div>
        <div class="column">
          <div class="testimonio">
            <div class="icon relative">
              <q-icon name="format_quote" />
            </div>
            <p style="margin-top: -50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi assumenda est in magnam vel maiores minus officia inventore blanditiis. Sunt, animi quam. Quisquam iste placeat iure obcaecati atque facilis fugit?</p>
            <img src="../../assets/img/user-ex.png" alt="about us" style="margin-bottom: -20px;">
            <h5 class="text-center text-h4 text-bold text-secondary" style="margin-bottom: 0px;">Testimonio 1</h5>
            <p class="text-bold text-primary">Usuario</p>
          </div>
        </div>
        <div class="column">
          <div class="testimonio">
            <div class="icon relative">
              <q-icon name="format_quote" />
            </div>
            <p style="margin-top: -50px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi assumenda est in magnam vel maiores minus officia inventore blanditiis. Sunt, animi quam. Quisquam iste placeat iure obcaecati atque facilis fugit?</p>
            <img src="../../assets/img/user-ex.png" alt="about us" style="margin-bottom: -20px;">
            <h5 class="text-center text-h4 text-bold text-secondary" style="margin-bottom: 0px;">Testimonio 1</h5>
            <p class="text-bold text-primary">Usuario</p>
          </div>
        </div>
      </div>
    </section>

    <section class="q-mt-xl q-mb-xl">
      <div
        style="
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <small class="text-uppercase text-center text-bold text-primary"
          >Quienes nos conforman</small
        >
        <div class="text-center text-h4 text-bold text-secondary">
          Nuestros Miembros
        </div>
      </div>

      <div style="width: 100%" class="q-my-lg">
        <Carousel
          :wrap-around="true"
          :items-to-show="itemsToShow"
          :autoplay="5000"
        >
          <Slide v-for="slide in slides" :key="slide.id">
            <div class="carousel__item">
              <q-img
                :src="slide.src"
                spinner-color="primary"
                spinner-size="82px"
                class="carousel__item-image"
              />
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </section>

    <section class="q-pa-md q-mt-xl q-mb-xl">
      <div class="container row">        
        <!-- Columna con el Texto -->
        <div class="column">
          <div style="display: flex;
            flex-direction: column;">
            <small class="text-uppercase text-bold text-primary">elige tu rubro</small>
            <div class="text-h4 text-bold text-secondary">
              Categorías de proyectos
            </div>
          </div>
          <br>
          <p>Descubre nuestras categorías de proyectos. Desde tecnología hasta arte, explorarás un mundo de creatividad e innovación. Encuentra inspiración y explora nuestras opciones únicas.
          </p>
          <br>
          <div class="row list-icon">
            <div class="icon">
              <q-icon name="lightbulb" />
            </div>
            <span class="text-bold text-h5 text-secondary" style="padding: 0px 20px;">Innovación</span>
          </div>
          <br>
          <div class="row list-icon">
            <div class="icon">
              <q-icon name="apartment" />
            </div>
            <span class="text-bold text-h5 text-secondary" style="padding: 0px 20px;">Emprendimiento</span>
          </div>
          <br>
          <div class="row list-icon">
            <div class="icon">
              <q-icon name="travel_explore" />
            </div>
            <span class="text-bold text-h5 text-secondary" style="padding: 0px 20px;">Investigación</span>
          </div>
        </div>

        <!-- Columna con la Imagen -->
        <div class="col-12 col-sm-12 col-md-6 flex items-center justify-center">
        <div class="flex flex-center justify-center no-wrap" style="width: 80%">

          <div class="q-mx-sm hero-decoration fifth"></div>

          <div class="hero-decoration fourth"></div>
        </div>
      </div>
      </div>
    </section>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      countries: 0,
      universities: 0,
      professionals: 0,
      members: 0,
      finalValues: [8, 20, 10, 1000],
      duration: 2000
    };
  },
  mounted() {
    this.animateNumbers();
  },
  methods: {
    animateNumbers() {
      this.finalValues.forEach((finalValue, index) => {
        let startValue = 0;
        const stepValue = Math.ceil(finalValue / (this.duration / 1000)); // Incremento por segundo

        const interval = setInterval(() => {
          if (startValue >= finalValue) {
            clearInterval(interval);
          } else {
            startValue += stepValue;
            this.updateValue(index, startValue);
          }
        }, 1000);
      });
    },
    updateValue(index, value) {
      switch (index) {
        case 0:
          this.countries = value;
          break;
        case 1:
          this.universities = value;
          break;
        case 2:
          this.professionals = value;
          break;
        case 3:
          this.members = value;
          break;
      }
    }
  }
};
</script>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const searchTerm = ref('');

const slides = [
  { id: 1, title: 'citec', src: 'img/institutions/citec.jpg' },
  { id: 2, title: 'espol', src: 'img/institutions/epsol.jpg' },
  //{ id: 3, title: 'i3lab', src: 'img/institutions/i3lab.png' },
  //{ id: 4, title: 'IncubaUdec', src: 'img/institutions/IncubaUdeC.png' },
  //{ id: 5, title: 'Incutemi', src: 'img/institutions/incutemi.png' },
  //{ id: 6, title: 'Innicia', src: 'img/institutions/innicia.png' },

  { id: 7, title: 'Ucsm', src: 'img/institutions/ucsm.svg' },
  { id: 8, title: 'Unam', src: 'img/institutions/unam.jpg' },
  { id: 9, title: 'Utp', src: 'img/institutions/utp.jpg' },
  { id: 10, title: 'Upc', src: 'img/institutions/upc.png' },
  { id: 10, title: 'UGalileo', src: 'img/institutions/u-galileo.png' },
];

const options = [
  {
    label: 'Proyectos',
    value: 1,
  },
  {
    label: 'Eventos',
    value: 2,
  },
  {
    label: 'Blog',
    value: 3,
  },
];

const itemsToShow = computed(() => {
  let value = 1;
  if ($q.screen.gt.sm) {
    value = 2;
  }
  if ($q.screen.gt.md) {
    value = 3;
  }
  if ($q.screen.gt.lg) {
    value = 4;
  }
  return value;
});

const contentType = ref(1);
function searchData() {
  switch (contentType.value) {
    case 1:
      router.push('/explore/projects?searchTerm=' + searchTerm.value);
      break;
    case 2:
      router.push('/explore/events?searchTerm=' + searchTerm.value);
      break;
    case 3:
      router.push('/explore/blog?searchTerm=' + searchTerm.value);
      break;

    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.carousel__item {
  background-color: white;
  border-radius: 5px;
  width: 80%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  .carousel__item-image {
    height: auto;
    width: 50%;
  }
}

.hero-decoration {
  height: 60vh;
  width: 33.33%;
  min-width: 150px;
  border-radius: 15px;
  background-position: center;
  background-size: cover;
}

.hero-decoration-first {
  background-image: url('assets/img/app/innovation1.webp');
}

.hero-decoration-second {
  background-image: url('assets/img/app/innovation2.jpeg');
  margin-top: 100px;
}

.hero-decoration-third {
  background-image: url('assets/img/app/innovation3.jpeg');
}

.hero-decoration.fourth{
  background-image: url('assets/img/bann4.png');
}

.hero-decoration.fifth{
  background-image: url('assets/img/woman-working-laborator_23-2148824178.webp');
}

.testimonio{
  background-color: #ffffff;
  padding: 40px;
}

.section-banner{
  background: url("assets/img/bann3.png") center center no-repeat;
  background-size: cover;
  max-width: 80%;
  margin: auto;
  position: relative;
  bottom: -120px;
  z-index: 1;
  margin-top: -80px;
  .back-ban{
    background: #010163bd;
    padding: 80px 0;
    color: #ffff;
    display: flex;
    div{
      text-align: center;
      padding: 0px 30px;
      flex:1;
    }
  }

  .list-icon{
    align-items: center;
    vertical-align: middle;
  }
  
}


</style>
