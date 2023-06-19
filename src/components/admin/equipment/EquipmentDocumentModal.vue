<template>
  <div>
    <ion-button
      class="button-wide button-outline"
      fill="outline"
      color="--av-light-gray"
      @click="state.modalOpen = true"
    >
      Add new Document +
    </ion-button>
    <ion-modal
      :is-open="state.modalOpen"
      @willDismiss="handleDismiss"
      :initial-breakpoint="0.9"
      :breakpoints="[0, 0.9]"
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
                @click="state.modalOpen = false"
              />
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-normal"
                >
                  Add new Document +
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  You can upload a document and document type using the form
                  below.
                </p>
              </div>
            </ion-header>
            <ion-content :scroll-y="false" class="form-admin--group_field">
              <p class="modal-panel__comment color-light-gray font-size-sm">
                Upload document
              </p>
              <div
                class="modal-panel__section modal-panel__select-equipment upload-icons"
                onclick="document.getElementById('fileInput').click()"
              >
                <input
                  class="file-input"
                  type="file"
                  accept="*/"
                  style="display: none"
                  id="fileInput"
                  v-on:change="uploadFile"
                />
                <ion-icon
                  :icon="cloudDownloadOutline"
                  size="small"
                  color="light"
                  class="align-icon"
                />
                <span
                  class="modal-panel__comment color-light-gray font-size-sm"
                >
                  Click to browse device
                </span>
              </div>
              <div class="modal-panel__select-equipment form-admin">
                <AdminSelect
                  label="Document Type"
                  v-model="state.selectedDocType"
                  :options="documentTypes"
                />
              </div>
            </ion-content>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                :disabled="
                  !state.selectedDocType.additionalInfo || !state.uploadedDoc
                "
                @click="saveNewDocument"
              >
                Add new Asset Type +
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close, cloudDownloadOutline } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import AdminSelect from "@/components/admin/AdminSelect.vue";
import { Organisations } from "@/stores/adminOrganisations";
import { SelectItem } from "@/types";
import { Equipment as useEquipment } from "@/stores/adminEquipment";

const EquipmentStore = useEquipment();
const Org = Organisations();
const route = useRoute();

const equipmentId = route.params.equipmentId as string;
const { documentTypes } = storeToRefs(Org);
const state = reactive({
  organisation: "",
  modalOpen: false,
  selectedDocType: {} as SelectItem,
  uploadedDoc: {} as File,
});

const handleDismiss = () => {
  state.modalOpen = false;
};
const uploadFile = (event: any) => {
  state.uploadedDoc = event.target.files[0];
};

const saveNewDocument = () => {
  const reader = new FileReader();
  reader.readAsDataURL(state.uploadedDoc);
  reader.onload = async () => {
    if (typeof reader.result === "string") {
      const encodedFile = reader.result?.split(",")[1];
      const fileName = state.uploadedDoc.name;
      const data = {
        base64Payload: encodedFile,
        fileName,
        documentTypeId: state.selectedDocType.additionalInfo,
        contentType: fileName.substr(fileName.lastIndexOf(".") + 0),
      };

      try {
        await EquipmentStore.addEquipmentDocument(data, equipmentId);
        handleDismiss();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };
};

onBeforeMount(() => {
  Org.getOrgDocumentTypes();
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
  height: 80%;
  width: 60%;
  margin-left: 20%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}
.modal-panel {
  height: 80%;
  width: 100%;
  margin-left: 0;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}
ion-content {
  --padding-top: 16px;
}
.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
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
