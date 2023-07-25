<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      Add new space type +
    </ion-button>
    <ion-modal
      :is-open="modalOpen"
      @willDismiss="handleDismiss"
      class="auto-height"
    >
      <ion-page>
        <div class="modal-panel">
          <div class="modal-panel-container">
            <ion-header>
              <ion-icon
                :icon="close"
                size="small"
                class="close-button"
                @click="modalOpen = false"
              />
              <ion-item class="modal-panel__header" lines="none">
                <ion-label>
                  <h2 class="font-bold font-size-lg">Add new space type</h2>
                  <p class="font-size-sm">
                    You can create a new space Type via the form below.
                  </p>
                </ion-label>
              </ion-item>
            </ion-header>
            <ion-item class="form-admin--group_field" lines="none">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-input
                  placeholder="e.g. meeting room"
                  :value="newType"
                  @input="newType = $event.target.value"
                />
              </div>
            </ion-item>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                @click="saveNewType()"
              >
                Add new space type +
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { MetaData } from "@/stores/adminMetaData";

const metaDataStore = MetaData();
const modalOpen = ref(false);
const newType = ref("");
const props = defineProps(["organisationId"]);
const handleDismiss = () => {
  modalOpen.value = false;
};
const saveNewType = () => {
  metaDataStore.saveSpaceType(props.organisationId, newType.value);
  newType.value = "";
  modalOpen.value = false;
};
</script>

<style scoped>
.add-button {
  margin-bottom: 5%;
  width: 246px;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
.modal-panel {
  height: 70%;
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
  padding: 25px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}
</style>
