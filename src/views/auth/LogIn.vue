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
                  Sign in to your<br />account.
                </h1>
              </div>
              <!-- <div class="login-form">
                <div class="login-form-fields">
                  <ion-input type="email" class="custom-input" placeholder="Email" name="email" />
                </div>
              </div> -->
              <ion-footer>
                <div>
                  <ion-button expand="block" @click="signIn">Sign in</ion-button>
                  <!-- <ion-button fill="outline" color="light" expand="block" @click="signInViaEmail">Sign in via
                  email</ion-button> -->
                </div>
                <div class="link-container text-center">
                  <p class="color-mid-gray font-md">
                    Don't have an account?
                    <router-link :to="{ name: 'Signup' }" class="color-light-gray link">Sign Up</router-link>
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
import { IonContent, IonFooter, IonPage, IonButton, IonInput } from "@ionic/vue";
import DotText from "@/components/shared/DotText.vue";
import { useRouter  } from "vue-router";
import Auth from "@/auth";

const router = useRouter();
const authService = new Auth();

const signIn = async () => {
  // Sign in logic here
  const authRes = await authService.authenticate(false);

  if (authRes) {
    return router.replace({ name: "Dashboard" });
  } else {
    return router.replace({ name: "Login" });
  }
};
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
  margin-bottom: 70px;
}

.forgot-password {
  text-decoration: none;
  font-size: 13px;
  color: #fff;
}

.login-form {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.login-form-fields {
  margin-bottom: 15px;
}

ion-footer {
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ion-button:first-of-type {
  margin-bottom: 15px;
}
</style>
