<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="settings-panel__header" lines="none">
            <ion-label>
              <h2 class="font-bold font-size-md">Contact</h2>
              <p class="font-size-xs">
                Simply fill out the form below and someone from AlphaVictor will
                be in touch soon.
              </p>
            </ion-label>
          </ion-item>
          <!-- <div class="settings-panel__header">
            <ion-text>
              <h1 class="settings-panel__title font-bold font-size-normal">
                Contact
              </h1>
            </ion-text>
            <p class="settings-panel__comment color-light-gray font-size-xs">
              Simply fill out the form below and someone from AlphaVictor will
              be in touch soon.
            </p>
          </div> -->
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

<style scoped>
.settings-panel__header {
  border-bottom: none;
}
</style>
