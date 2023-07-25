<template>
  <div>
    <ion-chip
      class="font-size-xs font-mono"
      :outline="true"
      @click="modalOpen = true"
    >
      <ion-label>Add New Document &nbsp;&gt;&gt;</ion-label>
    </ion-chip>
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
              <div class="modal-panel__header">
                <h1
                  class="modal-panel__title color-light-gray font-bold font-size-lg"
                >
                  Add New Document
                </h1>
              </div>
            </ion-header>
            <div class="form-admin--group_field">
              <div class="modal-panel__section modal-panel__select-equipment">
                <ion-input
                  placeholder="Document Name"
                  :value="newDocument"
                  @input="newDocument = $event.target.value"
                />
                <ion-input class="font-size-sm" :disabled="true">
                  <div>
                    <input
                      class="file-input"
                      type="file"
                      accept="*/"
                      :v-model="files"
                      @change="uploadFiles"
                      multiple
                    />
                  </div>
                </ion-input>
                <AdminSelect
                  label="Select a type"
                  v-model="selectedDocType"
                  :options="documentTypeOptions"
                  idPrefix="doc-type-select"
                />
              </div>
            </div>
            <ion-footer>
              <ion-button
                class="font-size-sm text-lowercase"
                expand="block"
                :disabled="!uploadedDocs.length || !selectedDocType?.title"
                @click="saveNewDocumentType()"
              >
                Save
              </ion-button>
            </ion-footer>
          </div>
        </div>
      </ion-page>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonInput,
  IonModal,
  IonIcon,
  IonChip,
  IonLabel,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { useRoute } from "vue-router";
import { Organisations } from "@/stores/adminOrganisations";
import { Spaces } from "@/stores/adminSpaces";

import { storeToRefs } from "pinia";
import AdminSelect from "@/components/admin/AdminSelect.vue";
import { SelectItem } from "@/types";

const route = useRoute();
const spaceId = route.params.spaceId as string;

const Org = Organisations();
const Space = Spaces();
const { documents } = storeToRefs(Org);
const props = defineProps(["organisationId"]);

const documentTypeOptions = computed(() => {
  return documents.value.map((documentType, index) => ({
    ...documentType,
    id: index,
    title: documentType.name,
    additionalInfo: documentType.id,
  }));
});

const selectedDocType = ref({} as SelectItem);

const modalOpen = ref(false);
const newDocument = ref("");
const handleDismiss = () => {
  modalOpen.value = false;
};
const files = ref();
const uploadedDocs = ref([]);
const uploadFiles = (event: any) => {
  uploadedDocs.value = event.target.files;
};
const saveNewDocumentType = () => {
  const readOneFile = (fileItem: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileItem);
    reader.onload = async () => {
      if (typeof reader.result === "string") {
        const fileName = fileItem.name;
        const fileMimeType = fileItem.type;

        const encodedFile = reader.result?.split(",")[1];

        const data = {
          base64Payload: encodedFile,
          fileName: 'Brand New File #1.txt',
          documentTypeId: selectedDocType.value.additionalInfo,
          contentType: fileMimeType,
        };
        try {
          await Space.addSpacesDocument(data, spaceId);
          handleDismiss();
          return data;
        } catch (error) {
          console.error(error);
        }
      }
    };
  };

  if (uploadedDocs.value) {
    Array.prototype.forEach.call(uploadedDocs.value, readOneFile);
  }
};

onBeforeMount(() => {
  Org.getOrgDocumentTypes(props.organisationId);
});
</script>

<style scoped>
ion-chip {
  float: right;
}
.close-button {
  width: 20px;
  margin-left: 95%;
  cursor: pointer;
}
.modal-panel {
  height: 60%;
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
