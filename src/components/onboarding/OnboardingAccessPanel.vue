<template>
  <div class="access-panel-container">
    <div class="image">
      <slot name="image"></slot>
    </div>
    <div class="main-content">
      <div class="blue-tex-container">
        <BlueText :text="blueText" offset="50" />
      </div>
      <div class="heading-container">
        <h1 class="headline font-size-lg color-light-gray font-bold">
          <slot name="heading"></slot>
        </h1>
      </div>
      <div class="info-text-container">
        <p class="info-text">
          <slot name="info-text"></slot>
        </p>
      </div>
      <div class="button-container">
        <ion-button expand="block" @click="ctaFunc">Enable</ion-button>
      </div>
      <div class="link-container text-center">
        <p class="color-dark-gray font-md">Already have an account? <router-link :to="{ name: 'Login' }" class="color-light-gray link">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import BlueText from '../BlueText.vue';

defineProps<{
  blueText: string,
  ctaFunc: () => void
}>()
</script>

<style scoped>
.access-panel-container {
  height: 80vh;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 42px 32px;
}

.image {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.blue-text-container {
  margin-bottom: 10px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 18px;
  text-indent: -20px;
  margin-bottom: 12px;
}

.info-text {
  font-size: 1rem;
  line-height: 1.125rem;
  color: #F4F7FF;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.button-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>