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
           
            type="search"
            placeholder="Search for a video"
            v-model="state.searchTerm"
            :icon="search"
          ></input-with-icon>
        </ion-col>
      </ion-row>
      <CustomList
        :listData="filteredVideos"
        :selectedItem="state.selectedVideo"
        :handleSelectItem="(item) => (state.selectedVideo = item)"
      ></CustomList>
      <div class="divider">
        <div></div>
        <span>or</span>
      </div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Add new video</ion-label>
          <ion-row>
            <ion-input
             
              placeholder="Enter Vimeo or YouTube URL"
              v-model="state.newVideoUrl.value"
            ></ion-input>
            <ion-button class="addVideoButton" @click="onAddVideo"
              >Add +</ion-button
            >
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label>Add video title</ion-label>
          <ion-input
           
            placeholder="New video added"
            v-model="state.newVideoTitle.value"
          ></ion-input>
        </ion-col>
      </ion-row>
    </ion-content>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm({ video: state.selectedVideo })"
      >
        Confirm selection
      </ion-button>
      <ion-button
        class="ion-text-capitalize"
       
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
import { search } from "ionicons/icons";

import CustomList from "./CustomList.vue";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
]);

const state = reactive({
  searchTerm: "",
  selectedVideo: props.editTreeNode?.video,
  newVideoTitle: {
    error: false,
    value: "",
  },
  newVideoUrl: {
    error: false,
    value: "",
  },
});

const filteredVideos = computed(() => {
  const organisationsStore = useOrganisationsStore();
  const videos = organisationsStore.currentOrganisationDetails?.videos || [];

  return videos.filter(
    (a) => a.title?.toLowerCase().indexOf(state.searchTerm.toLowerCase()) > -1
  );
});

const onAddVideo = () => {
  const organisationsStore = useOrganisationsStore();
  organisationsStore.createVideo(
    {
      title: state.newVideoTitle.value,
      url: state.newVideoUrl.value,
    },
    (res) => {
      state.newVideoTitle.value = "";
      state.newVideoUrl.value = "";
      state.selectedVideo = res;
    }
  );
};
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
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
