<template>
  <div>
    <h1 class="title-admin font-bold font-size-lg color-light-gray">Theme</h1>
    <ion-grid class="form-admin">
      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Logo</ion-label>
          <CustomIonUploadInput :buttonText="'Select file'" @upload="uploadFile" />
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Background image</ion-label>
          <CustomIonUploadInput :buttonText="'Select file'" @upload="uploadFile2" />
        </ion-col>
      </ion-row>

      <!-- <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
            <ion-label color="light">Dark mode</ion-label>
            <ion-input
              color="light"
              class="form-toggle"
              :disabled="true"
            >
              <ion-label color="light">Enable dark mode</ion-label>
              <ion-toggle color="primary" v-model="theme.darkmodeEnabled"/>
            </ion-input>
        </ion-col>
      </ion-row> -->

      <hr class="form-admin--divider" />

      <ion-row class="form-admin--group">
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Primary colour</ion-label>
            <ion-row>
            <ion-col size-sm="12">
              <ion-input
                class="form-colorpick"
                color="light"
                v-model="theme.primaryColour"
              >
              <input
                class="color-input"
                type="color"
                v-model="theme.primaryColour"
                />
              </ion-input>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
          <ion-label color="light">Secondary colour</ion-label>
          <ion-row>
            <ion-col size-sm="12">
              <ion-input
                class="form-colorpick"
                color="light"
                v-model="theme.secondaryColour"
              >
              <input
                class="color-input"
                type="color"
                v-model="theme.secondaryColour"
              />
            </ion-input>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-grid>
 
    <ion-button class="button-wide" @click="organisation.saveThemes()">
      Save changes
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
  } from "@ionic/vue";
import {computed, onBeforeMount, ref} from 'vue'
import {Theme} from '@/stores/adminThemes'
import { storeToRefs } from 'pinia'
import CustomIonUploadInput from "@/components/shared/CustomIonUploadInput.vue";

const organisation = Theme()
const { theme } = storeToRefs(organisation)

const image = ref()
const fileLogo = ref()
const fileName1 = computed(() => fileLogo.value?.name)
const fileExtension1 = computed(() => fileName1.value?.substr(fileName1.value?.lastIndexOf(".") + 1))
// const fileMimeType1 = computed(() => fileLogo.value?.type);

const image2 = ref()
const fileBackGround = ref();
const fileName2 = computed(() => fileBackGround.value?.name);
// const fileExtension2 = computed(() => fileName2.value?.substr(fileName2.value?.lastIndexOf(".") + 1));
// const fileMimeType2 = computed(() => fileBackGround.value?.type);
const uploadFile = (event: any) => {
  fileLogo.value = event.target.files[0];
  updateLogoState()
};
const uploadFile2 = (event: any) => {
  fileBackGround.value = event.target.files[0];
  updateBackgroundState()
};
const updateLogoState = () => {
  const reader1 = new FileReader();
  reader1.readAsDataURL(fileLogo.value);
  reader1.onload = async () => {
    if (typeof reader1.result === 'string') {
      const encodedFile = reader1.result?.split(",")[1];
      theme.value.logo = fileName1.value
      theme.value.logoFileName = fileName1.value
      theme.value.logoContentType = fileExtension1.value
      theme.value.logoBase64Payload = encodedFile

      // const data = {
      //   file: encodedFile,
      //   fileName: fileName1.value,
      //   fileExtension: fileExtension1.value,
      //   fileMimeType: fileMimeType1.value,
      // }
      // try {
      //   console.log(data)
      //   return data;
      // }
      // catch (error) {
      //   console.error(error);
      // }
    }
  }
}
const updateBackgroundState = () => {
  const reader2 = new FileReader();
  reader2.readAsDataURL(fileBackGround.value);
  reader2.onload = async () => {
    if (typeof reader2.result === 'string') {
      const encodedFile = reader2.result?.split(",")[1];
      theme.value.backgroundImage = fileName2.value
      // theme.value.logoContentType = fileExtension1.value
      // theme.value.logoBase64Payload = encodedFile
      // const data = {
      //   file: encodedFile,
      //   fileName: fileName2.value,
      //   fileExtension: fileExtension2.value,
      //   fileMimeType: fileMimeType2.value,
      // }
      // try {
      //   return data;
      // }
      // catch (error) {
      //   console.error(error);
      // }
    }
  } 
}
onBeforeMount(() => {
  organisation.getThemes()
})
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
</style>
