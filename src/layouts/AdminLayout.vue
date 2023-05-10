<template>
  <ion-page class="ion-bg" id="admin">
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-no-padding">
        <ion-col class="fixed-sidebar ion-padding">
          <desktop-nav />
        </ion-col>
        <ion-col>
          <ion-content class="ion-padding">
            <ion-button
              class="ion-no-padding"
              fill="clear"
              color="light"
              @click="() => router.back()"
            >
              <span class="font-mono font-size-xs">&lt;&lt; back</span>
            </ion-button>
            <div class="container">
              <router-view />
            </div>
          </ion-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { reactive, watch } from "vue";
import DesktopNav from "@/components/shared/DesktopNav.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<style scoped>
  ion-grid {
    width: 100%;
  }

  ion-row {
    width: 100%;
    min-height: 100vh;
    display: flex;
  }

  ion-button {
    margin: 20px 0;
  }

  .fixed-sidebar {
    width: 30%;
    max-width: 300px;
  }
</style>