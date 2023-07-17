<template>
  <ion-page>
    <ion-content :fullscreen="true">
        <div class="outer-container onboarding">
          <div class="gradient-container">
            <div class="inner-container">
              <div class="content-container">
                <div class="blue-text-container">
                  <dot-text text="time.for.a.change" offset="-45" />
                </div>
                <div class="headline-container">
                  <h1 class="headline font-size-xl color-light-gray font-bold">
                    Reset<br />password.
                  </h1>
                </div>
                <div class="login-form">
                  <p class="instructions">You have requested to reset your password. You can create a new password below.</p>
                  <div class="login-form-fields">
                    <password-input name="new-password" placeholder="New Password" v-model="state.newPassword" />
                    <password-input name="confirm-new-password" placeholder="Confirm New Password" v-model="state.confirmedPassword" />
                  </div>
                  
                </div>
                <ion-footer>
                  <ion-button @click="confirmPasswordReset" expand="block" :disabled="state.preventSubmit">Confirm password reset</ion-button>
                    
                  <div class="link-container text-center">
                    <p class="color-mid-gray font-md">
                      Don't have an account?
                      <router-link :to="{ name: 'Signup' }" class="color-light-gray link">Sign Up</router-link>
                    </p>
                    <p class="color-mid-gray font-md">
                      <router-link :to="{ name: 'Home' }" class="color-light-gray link">Go back</router-link>
                    </p>
                  </div>
                </ion-footer>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonFooter, IonButton } from '@ionic/vue';
import { reactive, watch, onBeforeMount } from "vue";
import { Account as useAccountStore } from "@/stores/publicAccount";
import DotText from "@/components/shared/DotText.vue";
import PasswordInput from '@/components/shared/PasswordInput.vue';
import { useRoute, useRouter } from 'vue-router';
import Auth from '@/auth';
import toastService from '@/services/toastService';

const router = useRouter();
const route = useRoute();
const authService = new Auth();
const accountStore = useAccountStore();

interface State {
  newPassword: string;
  confirmedPassword: string;
  token: string;
  preventSubmit: boolean;
}

const state: State = reactive({
  newPassword: "",
  confirmedPassword: "",
  token: "",
  preventSubmit: true
});

onBeforeMount(async () => {

  const token = route.query.token;

  if (!token || token == null || !(token as string)) {
    // Redirect to login.
    return router.replace({ name: "Login" });
  }

  const strLoginToken = token as string;  

  state.token = strLoginToken;
});

const confirmPasswordReset = async () => {
  accountStore.confirmPasswordReset(state.token, state.newPassword);
}

function confirmPassword(value: string) {
  if (value === state.newPassword && state.newPassword.length > 0) {
    state.preventSubmit = false;
  }
}

watch(
  () => state.confirmedPassword,
  (value) => confirmPassword(value)
);
</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}

.blue-text-container {
  margin-bottom: 5px;
  text-align: center;
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 29px;
  text-indent: -19px;
  margin-bottom: 28px;
}

.login-form {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.instructions {
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.015em;
  color: #ffffff;
  margin-bottom: 28px;
}

.login-form-fields {
  margin-bottom: 15px;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ion-footer {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

ion-button:first-of-type {
  margin-bottom: 15px;
}

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>