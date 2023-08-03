<template>
  <div v-for="group in spacesGroup" :key="group.floor">
    <ion-list :inset="true" lines="none">
      <ion-list-header v-if="group.floor">
        <ion-label text-wrap="true" class="font-size-title font-bold">{{ group.floor }}</ion-label>
      </ion-list-header>
      <ion-item
        v-for="space in group.spaces"
        :key="space.id"
        class="space"
        button
        :detail="false"
        :href="`/space/${space.id}`"
      >
        <space-card :space="space" />
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonList, IonItem, IonListHeader, IonLabel } from "@ionic/vue";
import SpaceCard from "@/components/dashboard/SpaceCard.vue";

import { Space } from "@/types/index";

interface Props {
  spaces: Space[];
}

const props = defineProps<Props>();

const spacesGroup = computed(() => {
  const floors = [...new Set(props.spaces.map((space) => space.floorName))];
  return floors.map((floor) => ({
    floor,
    spaces: props.spaces.filter((space) => space.floorName === floor),
  }));
});
</script>

<style scoped>
ion-item::part(native) {
  padding-left: 0px;
}
ion-item {
  --inner-padding-end: 0;
}
</style>
