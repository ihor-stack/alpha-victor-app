<template>
  <ion-page>
    <app-header title="Get help">
      <template #start>
        <ion-button
          fill="clear"
          color="light"
          @click="() => router.back()"
          class="back"
        >
          <span class="font-mono font-size-xs">&lt;&lt; back</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :fullscreen="true">
      <GetHelpList></GetHelpList>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import GetHelpList from "@/components/space/getHelp/GetHelpList.vue";

const router = useRouter();
</script>

<style scoped>
.container {
  flex: 1;
  padding: 0px 30px;
}
</style>
