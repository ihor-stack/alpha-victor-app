<template>
  <ion-chip
    class="font-size-xs font-mono"
    :outline="true"
    @click="modalOpen = true"
  >
    <ion-label>Add New Photo &nbsp;&gt;&gt;</ion-label>
  </ion-chip>

  <ion-modal
    :is-open="modalOpen"
    @willDismiss="handleDismiss"
    :initial-breakpoint="0.8"
    :breakpoints="[0, 0.8]"
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
              @click="modalOpen = false"
            />
            <div class="modal-panel__header">
              <h1
                class="modal-panel__title color-light-gray font-bold font-size-normal"
              >
                Add New Photo
              </h1>
            </div>
          </ion-header>
          <ion-content :scroll-y="false" class="form-admin--group_field">
            <CustomIonUploadInput
              :buttonText="'Select file'"
              @file-selected="onFileSelected"
            />

            <ion-input
              color="light"
              class="form-toggle"
              :disabled="true"
              v-if="!hiddenFeatureImageToggle"
            >
              <ion-label color="light">Featured Photo</ion-label>
              <ion-toggle color="primary" v-model="state.featuredPhoto" />
            </ion-input>
          </ion-content>
          <ion-footer>
            <ion-button class="font-size-sm" expand="block" @click="save()">
              Save
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive, defineProps } from "vue";
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
  IonToggle,
  IonLabel,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Organisations } from "@/stores/adminOrganisations";
import { Spaces } from "@/stores/adminSpaces";
import CustomIonUploadInput from "@/components/shared/CustomIonUploadInput.vue";

const Org = Organisations();
const Space = Spaces();
const modalOpen = ref(false);
const props = defineProps([
  "isFistPhoto",
  "queryParams",
  "callback",
  "hiddenFeatureImageToggle",
]);
const state = reactive({
  photo: {
    fileName: "",
    contentType: "",
    base64Payload: "",
    order: 0,
    featuredPhoto: props.isFistPhoto,
  },
  featuredPhoto: props.isFistPhoto,
});

const handleDismiss = () => {
  modalOpen.value = false;
  state.featuredPhoto = false;
};

async function onFileSelected(file: File, isLogo: boolean) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result as string;
    const base64Payload = base64String.split(",")[1];

    state.photo.fileName = file.name;
    state.photo.contentType = file.type;
    state.photo.base64Payload = base64Payload;
    state.photo.order = 0;
    state.photo.featuredPhoto = state.featuredPhoto;
  };
}

const save = () => {
  Space.addPhoto(state.photo, props.queryParams).then(() => {
    props.callback ? props.callback() : null;
    modalOpen.value = false;
  });
};

onBeforeMount(() => {
  Org.getOrgDocumentTypes();
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
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
  width: 60%;
  margin-left: 20%;
  border-radius: 40px 40px 40px 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
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
}
</style>
