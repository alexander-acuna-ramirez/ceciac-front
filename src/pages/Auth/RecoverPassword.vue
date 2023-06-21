<script setup lang="ts">
import { ref } from 'vue';
import { AuthService } from 'src/services';

const authService = new AuthService();
const email = ref('');
const step = ref(false);


async function sendRecoverRequest() {
    await authService.recoverPassword(email.value);
    step.value = true;

}

</script>
<template>
    <div class="window-width window-height flex justify-center items-center" style="background-color: rgb(246, 247, 248);">
        <q-card class="recoverCard" flat>
            <q-card-section>
                <div class="text-h6 text-secondary text-bold">Recuperar Contraseña</div>
                <div class="text-subtitle2 text-accent">Ingresa el e-mail asociado a su cuenta</div>
            </q-card-section>

            <q-separator />
            <q-card-section>
                <q-input v-model="email" type="text" label="E-mail" filled lazy-rules v-if="!step">
                    <template v-slot:append>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>

                <div v-else>
                    Se ha enviado un e-mail al correo que ingresaste
                </div>
            </q-card-section>
            <q-card-actions align="right" v-if="!step">
                <q-btn unelevated rounded color="primary" no-caps @click="sendRecoverRequest">
                    <strong>
                        Recuperar Contraseña
                    </strong>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<style lang="scss" scoped>
.recoverCard {
    width: 40%;
}


@media (max-width: $breakpoint-md-min) {
    .recoverCard {
        width: 95%;
    }
}
</style>