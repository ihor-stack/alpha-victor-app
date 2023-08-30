<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <ion-spinner></ion-spinner>
              <iframe name="authWindow"></iframe>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import { onMounted } from "vue";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { useRoute, useRouter } from 'vue-router';
import Auth from '@/auth';
import { auth as useAuthStore } from "@/stores/authStore";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import toastService from '@/services/toastService';
import mixpanel from "mixpanel-browser";

const router = useRouter();
const route = useRoute();
const authService = new Auth();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const organisationStore = useOrganisationStore();

onMounted(async () => {

  const token = route.query.token;

  if (!token || token == null || !(token as string)) {
    // Redirect to login.
    return router.replace({ name: "Login" });
  }

  const strVerificationToken = token as string;  

  await confirmVerificationToken(strVerificationToken);

});

const confirmVerificationToken = async (token: string) => {
  try {
    const emailVerificationResponse = await accountStore.confirmEmailVerification(token);

    const loginToken = emailVerificationResponse.data.loginToken;

    if (!loginToken) throw "Your account could not be verified.";

    await authService.authenticate(true, loginToken);
    toastService.show("Success", "Your account has been verified.", "success", "bottom");
    
    authStore.setAuthStatus(true);
    const accountRes = await accountStore.getAccount();
    
    if (accountRes?.email) {
      mixpanel.track("User Authenicated", { email: accountRes.email });
    }

    await accountStore.getPermissions();
    const orgsRes = await organisationStore.getOrganisations();
    if (orgsRes && orgsRes.length > 0) {
      await organisationStore.getOrgTheme(orgsRes[0].organisationId);
    }   

    router.replace({ name: "AllowAccess" });
  } catch (error) {
    toastService.show("Error", error, "error", "bottom");
  }
};

</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
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

iframe {
  visibility: hidden;
}

</style>