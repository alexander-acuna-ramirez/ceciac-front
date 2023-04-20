<template>
    <q-page padding class="q-px-xl">
        <div class="row contenido-hero">
            <div class="col-12 col-sm-12 col-md-6 q-pa-sm">
                <h1 class="text-h2 text-bold text-secondary">Plataforma de integración de la
                    RED CECIAC</h1>
                <div class="text-h5 q-mb-sm">
                    Fortalecer capacidades de gestión de innovación (tecnológica, no tecnológica) con orientación prosocial
                    en Universidades Consorcio GESIT
                </div>
                <q-btn @click="accion1()" rounded color="primary">Registrate</q-btn>
                <q-btn @click="accion2()" rounded color="secondary" class="q-ml-sm" outline>Proyecto</q-btn>
            </div>

            <div class="col-12 col-sm-12 col-md-6 flex flex-center justify-center">
                <q-img src="~assets/svg/people.svg" alt="Imagen de personas" class="imagen-personas" style="width: 70%;" />
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
  
<style>
.contenido-hero {
    align-items: center;
    justify-content: center;
}

.imagen-personas {
    max-width: 100%;
    height: auto;
}
</style>