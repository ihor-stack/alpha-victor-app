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
                    Login<br/>via<br/>email
                  </h1>
                </div>
                <div class="login-form">
                  <p class="instructions">Enter the registered email address and we’ll send you a link to login</p>
                  <div class="login-form-fields">
                    <ion-input :value="state.email" @ion-input="state.email = $event.target.value" type="email" class="custom-input" placeholder="Email" name="email" />
                  </div>
                </div>
                <ion-footer>
                  <ion-button @click="sendEmailSignInLink" expand="block">Send login link</ion-button>
                  <div class="link-container text-center">
                    <p class="color-mid-gray font-md">
                      Don't have an account?
                      <router-link :to="{ name: 'Signup' }" class="color-light-gray link">Sign Up</router-link>
                    </p>
                    <br/>
                    <p class="color-mid-gray font-md">
                      Want to login with your password?
                      <span @click="signIn" class="color-light-gray link">Sign in with my password</span>
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
import { IonPage, IonContent, IonFooter } from '@ionic/vue';
import DotText from "@/components/shared/DotText.vue";
import { useRouter } from 'vue-router';
import { Account as useAccountStore } from "@/stores/publicAccount";
import Auth from '@/auth';
import { reactive } from 'vue';
import toastService from '@/services/toastService';

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();

const state = reactive({
  email: ""
});

const signIn = async () => {
  // Sign in logic here
  const authRes = await authService.authenticate(false);

  if (authRes) {
    return router.replace({ name: "Dashboard" });
  } else {
    return router.replace({ name: "Home" });
  }
};

const sendEmailSignInLink = async () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  // Validate the email
  if (!emailPattern.test(state.email)) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "top"
    );
    isValid = false;
  }

  if (!isValid) return;

  accountStore
      .sendEmailLoginLink(state.email)
      .then((res) => {

        toastService.show(
          "Success",
          "A login link has been sent to your email address. Check your inbox to continue",
          "success",
          "top"
        );

        router.replace({ name: "Home" });

      })
      .catch((error) => {
        toastService.show(
        "Error",
        error,
        "error",
        "top"
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
</style>