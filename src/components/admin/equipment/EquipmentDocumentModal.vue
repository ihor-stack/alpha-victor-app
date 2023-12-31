<template>
  <div>
    <ion-chip
      class="font-size-xs font-mono"
      :outline="true"
      @click="state.modalOpen = true"
    >
      <ion-label text-wrap="true">{{
        $t("components.admin.equipment.documentModal.addDocumentHeader")
      }}</ion-label>
    </ion-chip>
    <ion-modal
      :is-open="state.modalOpen"
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
                @click="state.modalOpen = false"
              />
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-lg"
                >
                  {{
                    $t(
                      "components.admin.equipment.documentModal.addDocumentHeader"
                    )
                  }}
                </h1>
                <p class="modal-panel__comment color-light-gray font-size-sm">
                  {{
                    $t(
                      "components.admin.equipment.documentModal.uploadDocumentTypeParagraph"
                    )
                  }}
                </p>
              </div>
            </ion-header>
            <div class="form-admin--group_field">
              <p class="modal-panel__comment color-light-gray">
                {{
                  $t(
                    "components.admin.equipment.documentModal.uploadDocumentParagraph"
                  )
                }}
              </p>
              <CustomIonUploadInput
                :buttonText="'Select file'"
                accept="*/"
                @file-selected="uploadFile"
              />
            </div>
            <div class="form-admin--group_field">
              <AdminSelect
                label="Document Type"
                idPrefix="documentTypeToEquipment"
                v-model="state.selectedDocType"
                :options="documentTypeOptions"
              />
            </div>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                :disabled="
                  !state.selectedDocType.additionalInfo || !state.uploadedDoc
                "
                @click="saveNewDocument"
              >
                {{
                  $t(
                    "components.admin.equipment.documentModal.addDocumentButton"
                  )
                }}
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, computed } from "vue";
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonButton,
  IonModal,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import AdminSelect from "@/components/admin/AdminSelect.vue";
import { adminDocuments } from "@/stores/adminDocumentTypes";
import { SelectItem } from "@/types";
import { Equipment as useEquipment } from "@/stores/adminEquipment";
import CustomIonUploadInput from "@/components/shared/CustomIonUploadInput.vue";

const EquipmentStore = useEquipment();

const route = useRoute();

const equipmentId = route.params.equipmentId as string;

const DocTypes = adminDocuments();
const { documents } = storeToRefs(DocTypes);

const state = reactive({
  organisation: "",
  modalOpen: false,
  selectedDocType: {} as SelectItem,
  uploadedDoc: {} as File,
});

const documentTypeOptions = computed(() => {
  return documents.value.map((documentType, index) => ({
    ...documentType,
    id: index,
    title: documentType.name,
    additionalInfo: documentType.id,
  }));
});

const handleDismiss = () => {
  state.modalOpen = false;
};
const uploadFile = (file: File) => {
  state.uploadedDoc = file;
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
  DocTypes.getDocumentTypes();
});
</script>

<style scoped>
ion-chip {
  float: right;
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
  width: 100%;
  margin-left: 0;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
ion-content {
  --padding-top: 16px;
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
