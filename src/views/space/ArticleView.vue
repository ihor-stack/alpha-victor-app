<template>
  <ion-page>
    <app-header title="Article">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <ion-list lines="none">
        <ion-list-header>
          {{ state.articleData?.title }}
        </ion-list-header>
        <ion-item>
          <ion-label>
            <div v-html="state.articleData?.richText"></div>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from "@ionic/vue";

import AppHeader from "@/components/shared/AppHeader.vue";
import { adminAPI } from "@/axios";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import { Article } from "@/types/index";

const router = useRouter();
const route = useRoute();
const articleId: string = route.params.id as string;

interface State {
  articleData: Article;
}

const state: State = reactive({
  articleData: {
    id: articleId,
    title: "",
    richText: "",
  },
});

const getArticle = () => {
  const loadId = loadingService.show("Loading...");
  adminAPI
    .get(`/Article/${articleId}`)
    .then((response) => {
      state.articleData = response.data;
    })
    .catch((error) => {
      toastService.show("Error", error, "error", "top");
    })
    .finally(() => {
      loadingService.close(loadId);
    });
};

onBeforeMount(() => getArticle());
</script>

<style scoped>
ion-list-header {
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
}
</style>
