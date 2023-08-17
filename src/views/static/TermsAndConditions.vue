<template>
  <ion-page>
    <app-header :title="$t('pages.static.tos.title')">
      <template #start>
        <ion-menu-button fill="clear"> </ion-menu-button>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.static.tos.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content>
      <div class="text-content">
        <h2>{{ $t("pages.static.tos.content1.header") }}</h2>
        <p>{{ $t("pages.static.tos.content1.subtitle") }}</p>
        <p>{{ $t("pages.static.tos.content1.p1") }}</p>
        <p>{{ $t("pages.static.tos.content1.p2") }}</p>
        <p>{{ $t("pages.static.tos.content1.p3") }}</p>
        <p>{{ $t("pages.static.tos.content1.p4") }}</p>
      </div>
      <div class="text-content">
        <h2>{{ $t("pages.static.tos.content2.header") }}</h2>
        <p>{{ $t("pages.static.tos.content2.p") }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonMenuButton } from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.text-content,
.links {
  padding: 12px 30px;
}
.text-content {
  margin-bottom: 28px;
}
.text-content h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
}
.text-content p {
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 16px;
}

.back {
  display: none;
}

@media only screen and (min-width: 1023px) {
  .back {
    display: block;
  }
  ion-menu-button {
    display: none;
  }
}
</style>
