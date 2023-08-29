<template>
  <common-modal
    :title="
      $t('components.modals.decisionTreeNodeModal.selectVideo.selectVideoTitle')
    "
    :description="
      $t(
        'components.modals.decisionTreeNodeModal.selectVideo.selectVideoDescription'
      )
    "
    :handleDismiss="() => handleDismiss()"
  >
    <ion-content>
      <ion-row>
        <ion-col size="12" class="ion-no-padding">
          <input-with-icon
            iconPosition="start"
            type="search"
            :placeholder="
              $t(
                'components.modals.decisionTreeNodeModal.selectVideo.searchForVideoPlaceholder'
              )
            "
            v-model="state.searchTerm"
            :icon="search"
          ></input-with-icon>
        </ion-col>
      </ion-row>
      <CustomList
        :listData="filteredVideos"
        :selectedItem="state.selectedVideo"
        :handleSelectItem="(item) => (state.selectedVideo = item)"
        :handleEditItem="handleEditItem"
        :isEditable="true"
      ></CustomList>
      <div class="divider">
        <div></div>
        <span>{{
          $t("components.modals.decisionTreeNodeModal.selectVideo.dividerSpan")
        }}</span>
      </div>
      <ion-row>
        <ion-col size="12" class="form-admin--group_field">
          <ion-label text-wrap="true">{{
            $t(
              "components.modals.decisionTreeNodeModal.selectVideo.addVideoLabel"
            )
          }}</ion-label>
          <ion-row>
            <ion-input
              :placeholder="
                $t(
                  'components.modals.decisionTreeNodeModal.selectVideo.videoURLInputPlaceholder'
                )
              "
              v-model="state.newVideoUrl.value"
            ></ion-input>
            <ion-button
              class="addVideoButton"
              @click="onFetchVideo"
              :disabled="!state.newVideoUrl.value"
              >{{
                $t("components.modals.decisionTreeNodeModal.selectVideo.fetch")
              }}</ion-button
            >
          </ion-row>
        </ion-col>
      </ion-row>
    </ion-content>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize"
        :disabled="!state.selectedVideo"
        expand="block"
        @click="handleClickConfirm({ video: state.selectedVideo })"
      >
        {{
          $t(
            "components.modals.decisionTreeNodeModal.selectDocument.confirmSelectionButton"
          )
        }}
      </ion-button>
      <ion-button
        class="ion-text-capitalize"
        fill="clear"
        expand="block"
        @click="handleClickBack"
      >
        {{
          $t(
            "components.modals.decisionTreeNodeModal.selectDocument.backToDestinationButton"
          )
        }}
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
  "handleFetch",
  "handleEditVideo",
]);

const state = reactive({
  searchTerm: "",
  selectedVideo: props.editTreeNode?.video,
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

const onFetchVideo = () => {
  props.handleFetch(state.newVideoUrl.value);
};

const handleEditItem = (item) => {
  props.handleEditVideo(item);
};
</script>

<style scoped>
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
