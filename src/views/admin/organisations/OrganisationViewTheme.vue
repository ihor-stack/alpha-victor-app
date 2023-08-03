<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">
      {{ $t("pages.admin.organisations.view.theme.title") }}
    </h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.theme.logo")
          }}</ion-label>
          <CustomIonUploadInput
            :buttonText="$t('pages.admin.organisations.view.theme.buttonText')"
            :disabled="theme.logo ? true : false"
            :selectedImage="theme.logo"
            @file-selected="onLogoSelected"
            @remove="onLogoRemoved"
          />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.theme.bg")
          }}</ion-label>
          <CustomIonUploadInput
            :buttonText="$t('pages.admin.organisations.view.theme.buttonText')"
            :disabled="theme.backgroundImage ? true : false"
            :selectedImage="theme.backgroundImage"
            @file-selected="onBackgroundSelected"
            @remove="onBackgroundRemoved"
          />
        </ion-col>
      </ion-row>
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.theme.dark")
          }}</ion-label>
          <ion-item justify="space-between" lines="full">
            <ion-label text-wrap="true">{{
              $t("pages.admin.organisations.view.theme.enableDark")
            }}</ion-label>
            <ion-toggle
              v-model="theme.darkmodeEnabled"
              @ion-change="confirmToLeaveService.setEditing(true)"
            ></ion-toggle>
          </ion-item>
        </ion-col>
      </ion-row>
      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t("pages.admin.organisations.view.theme.primary")
          }}</ion-label>
          <ion-row>
            <ion-col size-sm="12">
              <ion-input
                class="form-colorpick"
                v-model="theme.primaryColour"
                @ion-input="confirmToLeaveService.setEditing(true)"
              >
                <input
                  class="color-input"
                  type="color"
                  v-model="theme.primaryColour"
                  @change="confirmToLeaveService.setEditing(true)"
                />
              </ion-input>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-button
      class="button-wide"
      @click="organisation.saveThemes(organisationId)"
    >
    {{ $t('pages.admin.organisations.view.theme.saveBtn')}}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonToggle,
  IonItem,
} from "@ionic/vue";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { Theme } from "@/stores/adminThemes";
import CustomIonUploadInput from "@/components/shared/CustomIonUploadInput.vue";
import confirmToLeaveService from "@/services/confirmToLeaveService";

const organisation = Theme();
const { theme } = storeToRefs(organisation);
const route = useRoute();
const organisationId = route.params.id as string;

async function onFileSelected(file: File, isLogo: boolean) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result as string;
    const base64Payload = base64String.split(",")[1];

    if (isLogo) {
      theme.value.logoFileName = file.name;
      theme.value.logoContentType = file.type;
      theme.value.logoBase64Payload = base64Payload;
    } else {
      theme.value.backgroundFileName = file.name;
      theme.value.backgroundContentType = file.type;
      theme.value.backgroundBase64Payload = base64Payload;
    }
    confirmToLeaveService.setEditing(true);
  };
}

const onLogoSelected = (file: File) => onFileSelected(file, true);
const onBackgroundSelected = (file: File) => onFileSelected(file, false);

const onLogoRemoved = () => {
  organisation.removeLogo(organisationId);
};

const onBackgroundRemoved = () => {
  organisation.removeBackgroundImage(organisationId);
};

onBeforeMount(() => {
  organisation.getThemes(organisationId);
});
</script>

<style scoped>
.color-input {
  position: absolute;
  right: 15px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}
ion-item {
  --background: transparent;
  --border-width: 1px;
  --border-radius: 5px;
  --border-color: #313131;
}
</style>
