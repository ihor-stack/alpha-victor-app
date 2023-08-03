<template>
  <ion-chip
    class="font-size-xs font-mono"
    :outline="true"
    @click="modalOpen = true"
    v-if="!disableUpload"
  >
    <ion-label text-wrap="true">{{
      $t("components.admin.spaces.photoModal.addNewPhotoLabel")
    }}</ion-label>
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
                {{ $t("components.admin.spaces.photoModal.addNewPhotoHeader") }}
              </h1>
            </div>
          </ion-header>

          <div class="form-admin--group_field">
            <CustomIonUploadInput
              :buttonText="'Select file'"
              @file-selected="onFileSelected"
            />
            <div class="ion-margin-top ion-margin-bottom" v-if="hasCaption">
              <ion-label>{{
                $t("components.admin.spaces.photoModal.caption")
              }}</ion-label>
              <ion-input
                v-model="state.photo.caption"
                class="font-size-sm"
              ></ion-input>
            </div>
            <ion-input
              class="form-toggle"
              :disabled="true"
              v-if="!hiddenFeatureImageToggle"
            >
              <ion-label text-wrap="true">{{
                $t("components.admin.spaces.photoModal.featuredPhotoLabel")
              }}</ion-label>
              <ion-toggle color="primary" v-model="state.featuredPhoto" />
            </ion-input>
          </div>

          <ion-footer>
            <ion-button class="font-size-sm" expand="block" @click="save()">
              {{ $t("components.admin.spaces.photoModal.saveButton") }}
            </ion-button>
          </ion-footer>
        </div>
      </div>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
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
import { Spaces } from "@/stores/adminSpaces";
import CustomIonUploadInput from "@/components/shared/CustomIonUploadInput.vue";

const Space = Spaces();
const modalOpen = ref(false);
const props = defineProps([
  "isFirstPhoto",
  "hasCaption",
  "queryParams",
  "callback",
  "hiddenFeatureImageToggle",
  "disableUpload",
]);
const state = reactive({
  photo: {
    fileName: "",
    contentType: "",
    base64Payload: "",
    order: 0,
    featuredPhoto: props.isFirstPhoto,
    caption: "",
  },
  featuredPhoto: props.isFirstPhoto,
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
