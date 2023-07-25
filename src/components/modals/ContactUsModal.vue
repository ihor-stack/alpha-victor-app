<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="settings-panel__header" lines="none">
            <ion-label>
              <h2 class="font-bold font-size-md">Contact</h2>
              <p class="font-size-xs">
                {{$t('components.modals.contactUsModal.contactUsModalParagraph')}}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <div>
          <ion-input
            type="text"
            class="custom-input"
            name="name"
            :placeholder="$t('components.modals.contactUsModal.nameInputPlaceholder')"
            v-model="state.name"
          />
          <ion-input
            type="email"
            class="custom-input"
            name="email"
            :placeholder="$t('components.modals.contactUsModal.emailInputPlaceholder')"
            v-model="state.email"
          />
          <ion-input
            type="number"
            class="custom-input"
            name="phone"
            :placeholder="$t('components.modals.contactUsModal.numberInputPlaceholder')"
            v-model="state.phone"
          />
          <ion-textarea
            class="custom-textarea"
            :placeholder="$t('components.modals.contactUsModal.messageInputPlaceholder')"
            :auto-grow="true"
          ></ion-textarea>
        </div>
        <ion-footer>
          <ion-button expand="block">{{$t('components.modals.contactUsModal.sendMessageButton')}}</ion-button>
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
