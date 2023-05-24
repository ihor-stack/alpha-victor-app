<template>
  <common-modal
    title="Select video"
    description="You can select a video to be presented via the list below."
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content>
      <ion-row>
        <ion-col size="12">
          <input-with-icon
            iconPosition="start"
            color="light"
            type="search"
            placeholder="Search for a video"
            v-model="state.searchTerm"
            :icon="search"
          ></input-with-icon>
        </ion-col>
      </ion-row>
      <ul class="list">
        <li
          class="list-item"
          v-for="video in filteredVideos"
          :key="video.id"
          @click="state.selectedVideo = video"
        >
          <p class="primaryText font-bold font-size-sm color-light-gray">
            {{ video.title }}
          </p>
          <div class="font-size-xs">
            <ion-row
              v-if="video.id === state.selectedVideo?.id"
              class="color-green ion-align-items-center"
            >
              <ion-icon :icon="checkmarkCircle" size="small" />
              <ion-col> selected </ion-col>
            </ion-row>
            <ion-col v-else>>> select</ion-col>
          </div>
        </li>
      </ul>
    </ion-content>
    <div class="divider">
      <div></div>
      <span>or</span>
    </div>
    <ion-footer>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label color="light">Add new video</ion-label>
          <ion-row>
            <ion-input
              color="light"
              placeholder="Enter Vimeo or YouTube URL"
              v-model="state.newVideo"
            ></ion-input>
            <ion-button class="addVideoButton">Add +</ion-button>
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm({ video: state.selectedVideo })"
      >
        Confirm selection
      </ion-button>
      <ion-button
        class="ion-text-capitalize"
        color="light"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        Back to destination
      </ion-button>
    </ion-footer>
  </common-modal>
</template>
<script setup>
import { reactive, computed } from "vue";
import {
  IonContent,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import CommonModal from "@/components/modals/CommonModal.vue";
import InputWithIcon from "@/components/shared/InputWithIcon.vue";
import { checkmarkCircle, search } from "ionicons/icons";

import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  searchTerm: "",
  selectedVideo: props.editTreeNode?.video,
  newVideo: "",
});

const filteredVideos = computed(() => {
  const videos = organisationsStore.currentOrganisationDetails?.videos || [];

  return videos.filter(
    (a) => a.title?.toLowerCase().indexOf(state.searchTerm.toLowerCase()) > -1
  );
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}
.list {
  border-bottom: none;
}
.divider {
  position: relative;
  padding: 32px 0;
}
.divider div {
  border: 0.75px solid #ffffff;
}
.divider span {
  background: #181818;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
}

ion-button.addVideoButton {
  --color: blue;
  --background: white;
  margin: 5px 0 0 12px;
}

.form-admin--group_field {
  padding-right: 0;
}
</style>
