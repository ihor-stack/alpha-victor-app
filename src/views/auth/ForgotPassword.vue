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
                    Forgot<br />password.
                  </h1>
                </div>
                <div class="login-form">
                  <p class="instructions">Enter the registered email address and we’ll send you instructions to reset your password.</p>
                  <div class="login-form-fields">
                    <ion-input type="email" class="custom-input" placeholder="Email" name="email" />
                  </div>
                </div>
                <ion-footer>
                  <ion-button expand="block">Sent password reset link</ion-button>
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
import { IonPage, IonContent, IonFooter } from '@ionic/vue';
import DotText from "@/components/shared/DotText.vue";
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