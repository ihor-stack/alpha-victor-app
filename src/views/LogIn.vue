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
              <div class="login-form">
                <div class="login-form-fields">
                  <ion-input type="email" class="custom-input" placeholder="Email" name="email" />
                  <ion-input type="password" class="custom-input" placeholder="Password" name="password" />
                  <div class="text-right">
                    <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
                  </div>
                </div>
                <div class="login-form-controls">
                  <ion-button expand="block" @click="signIn">Sign in</ion-button>
                  <ion-button fill="outline" color="light" expand="block" @click="signInViaEmail">Sign in via
                    email</ion-button>
                </div>
              </div>
              <div class="link-container text-center">
                <p class="color-mid-gray font-md">
                  Don't have an account?
                  <router-link :to="{ name: 'Signup' }" class="color-light-gray link">Sign Up</router-link>
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
import { IonContent, IonPage, IonButton, IonInput } from "@ionic/vue";
import DotText from "@/components/shared/DotText.vue";

const signIn = () => {
  // Sign in logic here
  return null;
};

const signInViaEmail = () => {
  // Sign in via email logic here
  return null;
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
  margin-bottom: 12px;
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
