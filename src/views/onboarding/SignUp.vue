<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="logo-container">
              <img src="@/theme/img/logo/logo-with-name.svg" alt="Alpha Victor" class="av-logo" />
            </div>
            <div class="content-container">
              <div class="blue-text-container">
                <BlueText text="time.for.a.change" offset="45" />
              </div>
              <h1 class="headline font-lg color-light-gray font-bold">Sign up for<br /> alpha victor.</h1>
              <div>
                <ion-input class="custom" type="text" placeholder="Full name" name="full-name" />
                <ion-input class="custom" type="email" placeholder="Email" name="email" />
                <ion-input class="custom" type="password" placeholder="Password" name="password" />
                <ion-input class="custom" type="password" placeholder="Confirm Password" name="confirm-password" />
                <ion-button type="submit" expand="block">Sign up</ion-button>
              </div>
              <div class="link-container text-center">
                <p class="color-dark-gray font-md">Already have an account? <router-link :to="{ name: 'Login' }" class="color-light-gray link">Login</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonInput } from '@ionic/vue';
import BlueText from '@/components/BlueText.vue';
</script>

<style scoped>
.outer-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-image: url('@/theme/backgrounds/background-lines.svg');
  background-size: cover;
  background-position: center;
}

.gradient-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, #000000 10.34%, rgba(0, 0, 0, 0) 86.69%);
}

.inner-container {
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  padding: 32px;
}

.logo-container {
  flex: 1 1 25%;
  position: relative;
}

.av-logo {
  position: absolute;
  top: 32px;
  left: 12px;
}

.content-container {
  flex: 1 1 72%;
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

.link-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

ion-input.custom {
  --padding-top: 18px;
  --padding-bottom: 18px;
  --padding-start: 24px;
  --padding-end: 24px;
  --background: #181818;
  --color: #F4F7FF;
  --placeholder-color: #9CA0A6;
  --placeholder-opacity: 0.8;
  border-radius: 6px;
  border: 1px solid #313131;
  margin-bottom: 15px;
}
</style>
