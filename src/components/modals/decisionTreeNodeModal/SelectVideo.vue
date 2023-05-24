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
          @click="state.selectedVideo = video.id"
        >
          <p class="primaryText font-bold font-size-sm color-light-gray">
            {{ video.title }}
          </p>
          <div class="font-size-xs">
            <ion-row
              v-if="video.id === state.selectedVideo"
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
          <ion-input
            color="light"
            placeholder="Enter Vimeo or YouTube URL"
            v-model="state.newVideo"
          ></ion-input>
        </ion-col>
      </ion-row>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleClickConfirm"
      >
        Add video
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
import { IonContent, IonButton, IonFooter, IonRow, IonCol } from "@ionic/vue";
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
  selectedVideo: props.editTreeNode?.video?.id,
  newVideo: "",
});

const filteredVideos = computed(() => {
  const videos = organisationsStore.currentOrganisationDetails?.videos || [];

  // return articles.filter(
  //   (a) =>
  //     a.title?.toLowerCase().indexOf(state.searchTerm.value.toLowerCase()) > -1
  // );
  const mockVideos = [
    {
      id: "1",
      title: "Teams Room",
      richText:
        "loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum",
    },
    {
      id: "2",
      title: "Alternative Teams Room",
      richText:
        "loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum",
    },
    {
      id: "3",
      title: "Alternative Teams Room",
      richText:
        "loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum loremipsum",
    },
  ];
  return mockVideos;
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
</style>
