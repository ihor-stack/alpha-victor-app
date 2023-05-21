<template>
  <ion-page>
    <div class="issues-panel">
      <div class="issues-panel-container">
        <ion-header>
          <ion-icon
            color="light"
            :icon="close"
            size="small"
            class="close-button"
            @click="handleDismiss()"
          />
          <div class="issues-panel__header">
            <h1
              class="issues-panel__title color-light-gray font-bold font-size-lg"
            >
              {{ title }}
            </h1>
            <p class="issues-panel__comment color-light-gray font-size-normal">
              {{ description }}
            </p>
          </div>
        </ion-header>
        <slot></slot>
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
  IonIcon,
  IonInput,
  IonPopover,
} from "@ionic/vue";
import { close, cloudDownloadOutline } from "ionicons/icons";

const props = defineProps(["title", "description", "handleDismiss"]);
const state = reactive({
  modalOpen: false,
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
ion-popover {
  --background: var(--av-light-gray);
  --backdrop-opacity: 0.6;
  --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
  --color: white;
  --width: 300px;
}
ion-popover::part(backdrop) {
  background-color: rgb(6, 14, 106);
}

.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}

.issues-panel {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}
.issues-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}
.issues-panel__header {
  margin-bottom: 20px;
}
.issues-panel__title {
  margin-bottom: 12px;
}
.issues-panel__section {
  margin-bottom: 20px;
  border-style: dotted;
  cursor: pointer;
  border-color: var(--av-darkest-gray);
  height: 100px;
}
.upload-icons {
  text-align: center;
  display: grid;
}
.align-icon {
  margin-left: 48%;
  margin-top: 20px;
}
</style>
