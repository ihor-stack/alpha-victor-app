<template>
  <ion-page>
    <div class="modal-panel">
      <div class="modal-panel-container">
        <ion-header>
          <ion-icon
            :icon="close"
            size="small"
            class="close-button"
            @click="handleDismiss"
          />
          <div class="modal-panel__header">
            <h1
              class="modal-panel__title color-light-gray font-bold font-size-lg"
            >
              {{ title }}
            </h1>
            <p class="modal-panel__comment color-light-gray font-size-sm">
              {{ description }}
            </p>
          </div>
        </ion-header>
        <slot></slot>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonIcon } from "@ionic/vue";
import { close } from "ionicons/icons";

const props = defineProps(["title", "description", "handleDismiss"]);
</script>

<style scoped>
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
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
}

.modal-panel {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.modal-panel__header {
  margin-bottom: 20px;
}
.modal-panel__title {
  margin-bottom: 12px;
}
.modal-panel__section {
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
