<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <h1
              class="settings-panel__title color-light-gray font-bold font-size-normal"
            >
              Contact
            </h1>
            <p class="settings-panel__comment color-light-gray font-size-xs">
              Simply fill out the form below and someone from AlphaVictor will
              be in touch soon.
            </p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-input
            type="text"
            class="custom-input"
            name="name"
            placeholder="Your name"
            v-model="state.name"
          />
          <ion-input
            type="email"
            class="custom-input"
            name="email"
            placeholder="Your email address"
            v-model="state.email"
          />
          <ion-input
            type="number"
            class="custom-input"
            name="phone"
            placeholder="Your number"
            v-model="state.phone"
          />
          <ion-textarea
            class="custom-textarea"
            placeholder="Your message"
            :auto-grow="true"
          ></ion-textarea>
        </ion-content>
        <ion-footer>
          <ion-button expand="block">Send message</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonInput,
  IonTextarea,
} from "@ionic/vue";

const state = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
</script>

<style scoped></style>
