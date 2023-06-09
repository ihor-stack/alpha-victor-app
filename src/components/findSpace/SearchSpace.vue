<template>
  <div v-for="group in spacesGroup" :key="group.floor">
    <ion-list class="spaces-list" lines="none">
      <ion-list-header v-if="group.floor">
        <ion-label class="font-size-lg font-bold">{{ group.floor }}</ion-label>
      </ion-list-header>
      <ion-item
        v-for="space in group.spaces"
        :key="space.id"
        class="space"
        button
        :href="`/space/${space.id}`"
      >
        <space-card :space="space" />
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
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
ion-content {
  --background: #000000;
}
ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
}
</style>
