<template>
  <ion-page>
    <app-header>
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{ $t('pages.space.video.back')}}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <div class="video-content">
        <div ref="playerRef" />
        <ion-list
          class="chapter-list"
          v-if="state.chapters?.length"
          lines="full"
        >
          <ion-item
            class="chapter-item"
            v-for="(chapter, index) in state.chapters"
            :key="chapter.index"
            button
            @click="chapterClicked(index)"
          >
            <div
              class="play-icon-wrapper"
              :style="{
                background:
                  index + 1 === state.currentChapter
                    ? 'var(--ion-color-primary, #3880ff)'
                    : '#fff',
              }"
            >
              <ion-icon
                :icon="
                  state.playing && index + 1 === state.currentChapter
                    ? pauseOutline
                    : caretForward
                "
                :color="
                  index + 1 === state.currentChapter ? '#ffffff' : 'primary'
                "
                slot="start"
              />
            </div>
            {{ chapter.title }}
            <ion-badge class="chapter-duration-badge">{{
              getChapterLength(index)
            }}</ion-badge>
          </ion-item>
        </ion-list>
        <ion-list lines="none" class="autoplay-wrapper">
          <ion-item class="autoplay-toggle">
            <ion-label>{{ $t('pages.space.video.label')}}</ion-label>
            <ion-toggle v-model="state.autoplay"></ion-toggle>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonToggle,
  IonBadge,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { caretForward, pauseOutline } from "ionicons/icons";
import Player from "@vimeo/player";

import AppHeader from "@/components/shared/AppHeader.vue";
import { adminAPI } from "@/axios";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const router = useRouter();
const route = useRoute();
const videoId = route.params.id;
let player: Player;
const playerRef = ref();

interface Chapter {
  title: string;
  startTime: number;
  index: number;
}

interface State {
  videoData: any;
  hasPlayed: boolean;
  pauseOnChapters: boolean;
  loop: boolean;
  playing: boolean;
  autoplay: boolean;
  chapters: Chapter[];
  currentChapter: number;
  duration: number;
}

const state: State = reactive({
  videoData: null,
  hasPlayed: false,
  pauseOnChapters: true,
  loop: false,
  playing: false,
  autoplay: false,
  chapters: [],
  currentChapter: 1,
  duration: 0,
});

const getVideo = () => {
  const loadId = loadingService.show("Loading...");
  adminAPI
    .get(`/Video/${videoId}`)
    .then(async (response) => {
      player = new Player(playerRef.value, {
        url: response.data.url,
        responsive: true,
        loop: true,
        muted: false,
        autoplay: false,
        controls: true,
      });

      player.on("chapterchange", async (playerData: any) => {
        if (
          state.hasPlayed &&
          (!state.autoplay ||
            (state.currentChapter === state.chapters?.length &&
              playerData?.index == 1))
        ) {
          player.pause();
          state.playing = false;
        }
        state.currentChapter = playerData?.index;
        state.hasPlayed = true;
      });

      state.duration = await player.getDuration();
      state.chapters = await player.getChapters();
      state.videoData = response.data;
    })
    .catch((error) => {
      state.videoData = null;
      toastService.show("Error", error, "error", "bottom");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

const chapterClicked = async (chapter: number) => {
  if (chapter === state.currentChapter - 1) {
    if (state.playing) {
      player.pause();
      state.playing = false;
    } else {
      player.play();
      state.playing = true;
    }
  } else {
    await player.setCurrentTime(state.chapters[chapter].startTime);
    player.play();
    state.playing = true;
  }
};

const getChapterLength = (index: number) => {
  let seconds = 0;
  if (index === state.chapters.length - 1) {
    seconds = state.duration - state.chapters[index].startTime;
  } else {
    seconds =
      state.chapters[index + 1].startTime - state.chapters[index].startTime;
  }
  return seconds;
};

onBeforeMount(() => getVideo());
</script>

<style scoped>
.video-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
ion-list {
  padding-left: 30px;
  padding-right: 30px;
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

.play-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  padding: 3px;
  margin-right: 16px;
}

.autoplay-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-top: 20px;
}
.autoplay-toggle {
  border: 0.75px solid #313131;
  border-radius: 8px;
}

.autoplay-toggle ion-label {
  --color: #9ca0a6;
}
</style>
