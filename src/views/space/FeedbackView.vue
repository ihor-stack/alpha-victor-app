<template>
  <ion-page>
    <app-header :title="$t('pages.space.feedback.title')">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.feedback.back")
          }}</span>
        </ion-button>
      </template>
    </app-header>
    <ion-content :scroll-y="false" :fullscreen="true">
      <div ref="formContainer" class="typeform-container"></div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import AppHeader from "@/components/shared/AppHeader.vue";
import { useRouter, useRoute } from "vue-router";
import { IonPage, IonContent, IonButton } from "@ionic/vue";
import { createWidget } from "@typeform/embed";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
import mixpanel from "mixpanel-browser";

const route = useRoute();
const spacesStore = useSpacesStore();
const spaceId: string = route.params.spaceId as string;

const router = useRouter();
const formContainer = ref();

const { currentSpace } = storeToRefs(spacesStore);

watch(currentSpace, (newValue) => {
  createWidget(newValue.typeformId, {
    container: formContainer.value,
  });
});

onBeforeMount(() => {
  if (spacesStore.currentSpace?.id !== spaceId) {
    spacesStore.getSpaceDetails(spaceId).then((res) => {
      if (res?.name) {
        mixpanel.track("Feedback Started", {
          organisaLon: res.organisationName,
          location: res.locationName,
          ﬂoor: res.floorName,
          space: res.name,
        });
      }
    });
  } else {
    mixpanel.track("Feedback Started", {
      organisaLon: spacesStore.currentSpace.organisationName,
      location: spacesStore.currentSpace.locationName,
      ﬂoor: spacesStore.currentSpace.floorName,
      space: spacesStore.currentSpace.name,
    });
  }
});

onMounted(() => {
  if (spacesStore.currentSpace?.typeformId) {
    createWidget(spacesStore.currentSpace.typeformId, {
      container: formContainer.value,
    });
  }
});
</script>

<style scoped>
.typeform-container {
  width: 100%;
  height: 100%;
}
</style>
