<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div>
          <p>>> time.for.a.change</p>
          <h1>Sign in to your account.</h1>
        </div>
        <div>
          <form>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <router-link :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
            <ion-button expand="block" @click="signIn">Sign in</ion-button>
            <ion-button fill="outline" expand="block" @click="signInViaEmail">Sign in via email</ion-button>
          </form>
        </div>
        <p>Don't have an account? <router-link :to="{ name: 'Signup' }">Sign Up</router-link></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
const signIn = () => {
  // Sign in logic here
  return null;
}

const signInViaEmail = () => {
  // Sign in via email logic here
  return null;
}

</script>

<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 2rem;
  background-image: url('@/theme/backgrounds/background-lines.svg');
  background-size: cover;
  background-position: center;
}
</style>
