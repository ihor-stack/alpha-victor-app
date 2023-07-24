<template>
  <ion-item>
    <ion-label class="font-size-lg">{{ modelValue }} </ion-label>
    <ion-icon
      class="reset-button text-lowercase"
      :icon="createOutline"
      slot="end"
      fill="clear"
      size="small"
      @click="openModal()"
    />
  </ion-item>
  <ion-modal
    :is-open="active"
    @willDismiss="active = false"
  >
    <ion-page>
      <div class="modal-panel">
        <div class="modal-panel-container">
          <ion-header>
            <ion-icon
              color="light"
              :icon="close"
              size="small"
              class="close-button"
              @click="active = false"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-lg"
              >
                Edit Document Type
              </h1>
              <ion-input
                class="font-size-sm"
                placeholder="Document Type"
                :value="newDocument"
                @ion-input="newDocument = $event.target.value"
              ></ion-input>
            </div>
          </ion-header>
          <ion-footer>
            <ion-button
              @click="$emit('save', newDocument), (active = false)"
              class="save-button text-lowercase"
              fill="clear"
              size="small"
            >
              &gt;&gt; save
            </ion-button>
            <ion-button
              @click="$emit('remove'), (active = false)"
              class="remove-button text-lowercase"
              fill="clear"
              size="small"
            >
              &gt;&gt; remove
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonModal,
  IonFooter,
  IonPage,
} from "@ionic/vue";
import { adminDocuments } from "@/stores/adminDocumentTypes";
import { createOutline, close } from "ionicons/icons";
import { ref } from "vue";

const store = adminDocuments();
interface Props {
  id: string;
  modelValue: string;
}
const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const active = ref(false);
const newDocument = ref();

const openModal = () => {
  active.value = true;
  newDocument.value = props.modelValue;
};
</script>

<style scoped>
.remove-button {
  color: var(--av-red);
  font-family: "Akkurat-Mono";
}
.reset-button {
  color: var(--av-orange);
  font-family: "Akkurat-Mono";
  cursor: pointer;
}
.save-button {
  color: var(--av-green);
  font-family: "Akkurat-Mono";
}
ion-item {
  margin-bottom: 20px;
}
ion-icon {
  cursor: pointer;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
.modal-panel {
  height: 40%;
  width: 100%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 22px 32px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}
</style>
