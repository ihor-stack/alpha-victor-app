<template>
  <ion-page>
    <ion-content>
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <div class="blue-text-container">
                <dot-text text="time.for.a.change" offset="-50" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-bold font-size-xl color-light-gray">
                  a better experience.
                </h1>
              </div>
              <div class="cta-container">
                <div class="blurb-container">
                  <img src="@/theme/img/homepage-blurb.svg" class="blurb" />
                </div>
                <div class="button-container">
                  <ion-button expand="block" class="button-gray" @click="signIn"
                    >Log in</ion-button
                  >
                  <ion-button expand="block" color="light" @click="signup"
                    >Sign up</ion-button
                  >
                </div>
              </div>
              <div class="link-container text-center">
                <p class="color-mid-gray font-sm">
                  Prefer to login via email?
                  <span @click="signInEmail" class="color-light-gray link"
                    >Send me a login link</span
                  >
                  <br /><br />
                  <span @click="resetPassword" class="color-light-gray link"
                    >I've forgot my password</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";
import DotText from "@/components/shared/DotText.vue";
import Auth from "@/auth";
import { auth as useAuthStore } from "@/stores/authStore";
import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const router = useRouter();
const authService = new Auth();
const authStore = useAuthStore();
const organisationStore = useOrganisationStore();

const signIn = async () => {
  // Sign in logic here
  const authRes = await authService.authenticate(false);

  if (authRes) {
    authStore.setAuthStatus(true);
    const currentOrgId = localStorage.getItem("currentOrganisationId");
    if (currentOrgId) {
      organisationStore.setOrganisationId(currentOrgId);
    }
    return router.replace({ name: "Dashboard" });
  } else {
    authStore.setAuthStatus(false);
    return router.replace({ name: "Home" });
  }
};

const signInEmail = async () => {
  return router.replace({ name: "SendEmailLoginLink" });
};

const resetPassword = async () => {
  return router.replace({ name: "ForgotPassword" });
};

onBeforeMount(async () => {
  const accessToken = await authService.fetchCurrentAccessToken();
  if (accessToken) {
    return router.replace({ name: "Dashboard" });
  }
});

const signup = () => {
  router.push({ name: "Signup" });
};
</script>

<style scoped>
.content-container {
  flex: 0 0 58%;
  display: flex;
  flex-direction: column;
}

.blue-text-container {
  margin-bottom: 6px;
  text-align: center;
}

.cta-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blurb-container {
  flex: 1;
}

.button-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding-top: 40px; */
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 28px;
  text-indent: -17px;
  margin-bottom: 28px;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 0;
  font-size: 13px;
}

.link {
  cursor: pointer;
}

.link:hover {
  opacity: 0.5;
}

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>
