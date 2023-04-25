<template>
    <q-page padding>
        <div class="row contenido-hero">
            <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
                <small class="text-bold text-secondary text-uppercase">Inicia un nuevo proyecto aquí!</small>
                <h1 class="text-h4 text-bold text-secondary text-uppercase">Plataforma de integración de la
                    RED <span class="text-primary">CECIAC</span></h1>
                <div class=" q-mb-sm text-accent">
                    Fortalecer capacidades de gestión de innovación (tecnológica, no tecnológica) con orientación
                    prosocial
                    en Universidades Consorcio GESIT
                </div>

                <q-btn @click="accion1()" rounded color="primary">Registrate</q-btn>
                <q-btn @click="accion2()" rounded color="secondary" class="q-ml-sm" outline>Proyecto</q-btn>
            </div>

            <div class="col-12 col-sm-12 col-md-6">
                <div class="flex flex-center justify-center">
                    <div
                        style="height: 350px; width: 150px; border-radius: 15px; background-image: url('src/assets/img/app/innovation1.webp'); background-position: center; background-size: cover;">

                    </div>

                    <div class="q-mx-sm"
                        style="height: 350px; width: 150px; border-radius: 15px; margin-top: 100px;  background-image: url('src/assets/img/app/innovation2.jpeg'); background-position: center; background-size: cover;">

                    </div>

                    <div
                        style="height: 350px; width: 150px; border-radius: 15px; background-image: url('src/assets/img/app/innovation3.jpeg'); background-position: center; background-size: cover;">

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <div class="text-h6 text-uppercase text-bold text-secondary q-mt-xl">Miembros</div>
            </div>
        </div>
    </q-page>
</template>
  
<script>
export default {
    methods: {
        accion1() {
            // Acción del botón 1
        },
        accion2() {
            // Acción del botón 2
        },
    },
};
</script>
  
<style scoped lang="scss">
.contenido-hero {
    align-items: center;
    justify-content: center;
}

.imagen-personas {
    max-width: 100%;
    height: auto;
}
</style>