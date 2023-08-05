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
          <div ref="playerRef" id="vemeoVideo" />
        </ion-col>
        <ion-col size="12">
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item slot="header">
                <ion-label class="text-title">
                  {{
                    $t(
                      "components.modals.decisionTreeNodeModal.fetchVideo.videoDetails"
                    )
                  }}
                </ion-label>
              </ion-item>
              <ion-row slot="content">
                <ion-col size="12" class="form-admin--group_field">
                  <ion-label class="font-size-sm" text-wrap="true">{{
                    $t(
                      "components.modals.decisionTreeNodeModal.fetchVideo.videoTitleLabel"
                    )
                  }}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    v-model="state.title"
                  ></ion-input>
                </ion-col>
              </ion-row>
            </ion-accordion>
            <ion-accordion
              v-for="(chapter, index) in state.chapters"
              :key="chapter.id"
              :value="chapter.id"
            >
              <ion-item slot="header">
                <div class="accordion-header">
                  <ion-label class="text-title">{{ chapter.title }}</ion-label>
                  <ion-badge class="chapter-duration-badge">{{
                    getChapterLength(index)
                  }}</ion-badge>
                </div>
              </ion-item>
              <ion-row slot="content">
                <ion-col size="12" class="form-admin--group_field">
                  <ion-label class="font-size-sm" text-wrap="true">{{
                    $t(
                      "components.modals.decisionTreeNodeModal.fetchVideo.chapterTitleLabel"
                    )
                  }}</ion-label>
                  <ion-input
                    class="font-size-sm"
                    v-model="chapter.title"
                  ></ion-input>
                </ion-col>
                <ion-col size="12" class="form-admin--group_field">
                  <ion-label class="font-size-sm" text-wrap="true">{{
                    $t(
                      "components.modals.decisionTreeNodeModal.fetchVideo.chapterDescription"
                    )
                  }}</ion-label>
                  <ion-textarea
                    class="font-size-sm"
                    v-model="chapter.subTitle"
                  ></ion-textarea>
                </ion-col>
              </ion-row>
            </ion-accordion>
          </ion-accordion-group>
        </ion-col>
      </ion-row>
    </ion-content>
    <ion-footer>
      <ion-button
        class="ion-text-capitalize"
        expand="block"
        @click="handleConfirm"
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
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import {
  IonContent,
  IonButton,
  IonFooter,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonTextarea,
} from "@ionic/vue";
import Player from "@vimeo/player";

import CommonModal from "@/components/modals/CommonModal.vue";
import { Organisations as useOrganisationsStore } from "@/stores/adminOrganisations";

const organisationsStore = useOrganisationsStore();
const playerRef = ref();

const props = defineProps([
  "editTreeNode",
  "handleClickConfirm",
  "handleDismiss",
  "handleClickBack",
  "vimeoUrl",
  "selectedId",
]);

const state = reactive({
  id: props.selectedId || "",
  title: "",
  chapters: [{ id: "sfsdf", title: "Chapter 1", subTitle: "Test chapter" }],
  duration: 0,
});

let player;

const getChapterLength = (index) => {
  let seconds = 0;
  if (index === state.chapters.length - 1) {
    seconds = state.duration - state.chapters[index].timeCode;
  } else {
    seconds =
      state.chapters[index + 1].timeCode - state.chapters[index].timeCode;
  }
  const mins = Math.floor(seconds / 60);
  const remainSeconds = seconds - mins * 60;
  return `${mins.toString().padStart(2, "0")}:${remainSeconds
    .toString()
    .padStart(2, "0")}`;
};

const handleConfirm = () => {
  if (props.selectedId) {
    const updatedVideo = {
      id: state.id,
      title: state.title,
      url: props.vimeoUrl,
      chapters: state.chapters,
    };
    organisationsStore.updateVideo(updatedVideo, () => {
      props.handleClickConfirm({ video: state.id });
    });
  } else {
    organisationsStore.createVideo(
      {
        title: state.title,
        url: props.vimeoUrl,
      },
      (res) => {
        props.handleClickConfirm({ video: res.id });
      }
    );
  }
};

const getVideo = () => {
  organisationsStore.getVideo(props.selectedId, (res) => {
    state.id = res.id;
    state.title = res.title;
    state.chapters = res.chapters;
  });
};

onBeforeMount(() => {
  if (props.selectedId) {
    getVideo();
  }
});

onMounted(() => {
  player = new Player(playerRef.value, {
    url: props.vimeoUrl,
    responsive: true,
    loop: true,
    muted: false,
    autoplay: false,
    controls: true,
  });
  player.getDuration().then((res) => {
    state.duration = res;
  });
  if (!props.selectedId) {
    player.getVideoTitle().then((res) => {
      state.title = res;
    });
    player.getChapters().then((res) => {
      state.chapters = res.map((chapter) => ({
        ...chapter,
        timeCode: chapter.startTime,
      }));
    });
  }
});
</script>

<style scoped>
.text-title {
  font-weight: bold;
}
.form-admin--group_field {
  padding-right: 0;
}

.accordion-header {
  display: flex;
  align-items: center;
}

ion-item::part(native) {
  padding-inline-start: 0;
  padding-inline-end: 0;
}

ion-badge.chapter-duration-badge {
  --background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-weight: 500;
  font-size: 10px;
  --padding-top: 5px;
  --padding-bottom: 4px;
  margin-left: 10px;
}
</style>
