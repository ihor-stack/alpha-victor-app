<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <ion-spinner></ion-spinner>
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
import { useRoute, useRouter } from 'vue-router';
import Auth from '@/auth';
import toastService from '@/services/toastService';

const router = useRouter();
const route = useRoute();
const authService = new Auth();
const accountStore = useAccountStore();

onBeforeMount(async () => {

  const token = route.query.token;

  if (!token || token == null || !(token as string)) {
    // Redirect to login.
    return router.replace({ name: "Login" });
  }

  const strVerificationToken = token as string;  

  confirmVerificationToken(strVerificationToken);

});

const confirmVerificationToken = async (token: string) => {

  accountStore
      .confirmEmailVerification(token)
      .then((res) => {

        toastService.show(
          "Success",
          "Your account has been verified.",
          "success",
          "bottom"
        );

        router.replace({ name: "AllowAccess" });

      })
      .catch((error) => {
        toastService.show(
        "Error",
        error,
        "error",
        "bottom"
      );
    });

}

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