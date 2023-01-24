<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <div class="gradient-container">
          <div class="inner-container">
            
            <div class="content-container">
              <div class="blue-text-container">
                <BlueText text="time.for.a.change" offset="-45" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-size-lg color-light-gray font-bold">Sign up for<br /> alpha victor.</h1>
              </div>
              <div class="form-container">
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

.form-container {
  flex: 1;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
