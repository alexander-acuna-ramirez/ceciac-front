<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AuthService } from 'src/services';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { Rules } from 'src/utils';

const authService = new AuthService();
const route = useRoute();
const token = ref('');
const $q = useQuasar();
const password = ref('');
const confirmPassword = ref('');

const resetStatus = ref(0);

/*
0 => normal status
1 => token invalid
2 => reset invalid
3 => reset success
*/

const passwordForm = ref();

async function checkToken() {
    $q.loading.show();

    try {
        const response = await authService.checkToken(token.value);
        if (!response.data.success) {
            resetStatus.value = 1;
            return;
        }
    } catch (e) {
        resetStatus.value = 1;
    } finally {
        $q.loading.hide();
    }
}

async function changePassword() {
    passwordForm.value.validate().then(async (success: boolean) => {
        if (!success) return;
        $q.loading.show();
        try {
            const res = await authService.resetPassword(password.value, token.value);
            if (!res.data.success) {
                resetStatus.value = 1;
                return;
            }
            resetStatus.value = 3;
        } catch {
            resetStatus.value = 1;
        }
        finally {
            $q.loading.hide();
        }
    });
}

onMounted(() => {
    //const { token } = route.query.token;
    const data = route.query.token;
    if (typeof data === 'string') {
        token.value = data;
    }

    checkToken();
});
</script>
<template>
    <div class="window-width window-height flex justify-center items-center" style="background-color: rgb(246, 247, 248)">
        <q-card class="recoverCard" flat>
            <q-card-section>
                <div class="text-h6 text-secondary text-bold">Cambiar Contraseña</div>
                <div class="text-subtitle2 text-accent">
                    Cambia tu contraseña a continuación
                </div>
            </q-card-section>

            <q-separator />
            <q-card-section v-if="resetStatus == 0">
                <q-form ref="passwordForm" class="row q-col-gutter-md">
                    <q-input class="col-12" v-model="password" type="password" label="Contraseña" outlined lazy-rules
                        :rules="[Rules.required]">
                        <template v-slot:append>
                            <q-icon name="lock" />
                        </template>
                    </q-input>

                    <q-input class="col-12" v-model="confirmPassword" type="password" label="Confirmar Contraseña" outlined
                        lazy-rules :rules="[Rules.required, (val) => val == password || 'Las contraseñas no coinciden']">
                    </q-input>
                </q-form>
            </q-card-section>

            <q-card-section v-if="resetStatus == 1">
                <div style="width: 100%;" class="flex justify-center column items-center q-pa-md">
                    <q-img src="~assets/img/app/passwordReset/reset-1.png" style="width: 100px" />
                    <span class="text-subtitle1 text-center text-bold text-secondary">
                        El enlace parece haber expirado
                    </span>
                </div>
            </q-card-section>

            <q-card-section v-if="resetStatus == 3">
                <div style="width: 100%;" class="flex justify-center column items-center q-pa-md">
                    <q-img src="~assets/img/app/passwordReset/reset-2.png" style="width: 100px" />
                    <span class="text-subtitle1 text-center text-bold text-secondary">
                        La contraseña ha sido actualizada correctamente
                    </span>
                </div>
            </q-card-section>

            <q-card-actions align="right" v-if="resetStatus == 0">
                <q-btn rounded color="primary" no-caps @click="changePassword()">
                    <strong> Cambiar Contraseña </strong>
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
