<template>
  <div>
    <ion-button class="button-wide" @click="modalOpen = true">
      {{ $t('components.admin.spaceMetadata.spaceTypeModal.addNewSpaceTypeButton') }}
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
                <ion-label text-wrap="true">
                  <h2 class="font-bold font-size-lg">{{ $t('components.admin.spaceMetadata.spaceTypeModal.addNewSpaceTypeHeader') }}</h2>
                  <p class="font-size-sm">
                    {{ $t('components.admin.spaceMetadata.spaceTypeModal.createNewSpaceTypeParagraph') }}
                  </p>
                </ion-label>
              </ion-item>
            </ion-header>
            <ion-item class="form-admin--group_field" lines="none">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-input
                  :placeholder="$t('components.admin.spaceMetadata.spaceTypeModal.meetingRoomInputPlaceholder')"
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
              {{ $t('components.admin.spaceMetadata.spaceTypeModal.addNewSpaceTypeButton') }}
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
