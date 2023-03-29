<template>
  <ion-page>
    <app-header title="Documents">
      <template #start>
        <ion-button fill="clear" color="light" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <documents-list :documents="roomDocuments" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import DocumentsList from "@/components/space/DocumentsList.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const roomDocuments = [
  {
    id: 1,
    title: "Crestron RMC3 Reference",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  },
  {
    id: 2,
    title: "QM98N Setup",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  },
  {
    id: 3,
    title: "Clickshare C10 Installation",
    dateUploaded: "2020-03-10",
    url: '@/theme/sample.pdf'
  }
];
</script>

<style scoped>
</style>
