<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <iframe name="authWindow"></iframe>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { useRouter, useRoute  } from "vue-router";
import Auth from "@/auth";
import { auth as useAuthStore } from "@/stores/authStore";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { onMounted } from "vue";
import mixpanel from "mixpanel-browser";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const organisationStore = useOrganisationStore();
const accountStore = useAccountStore();
const authService = new Auth();

const doLogin = async (strLoginToken : string) => {
  const authRes = await authService.authenticate(true, strLoginToken);

  if (authRes) {
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
    
    return router.replace({ name: "Dashboard" });

  } else {
    authStore.setAuthStatus(false);
    return router.replace({ name: "Home" });
  }
}

onMounted(async () => {

  const loginToken = route.query.token;

  if (!loginToken || loginToken == null || !(loginToken as string)) {
    // Redirect to login.
    return router.replace({ name: "Home" });
  }

  const strLoginToken = loginToken as string;

  await doLogin(strLoginToken);

})

</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
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
