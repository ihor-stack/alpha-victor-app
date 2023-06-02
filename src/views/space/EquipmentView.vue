<template>
  <ion-page>
    <app-header title="Room Equipment">
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
    <ion-content>
      <div class="space-equipment-container">
        <ion-list lines="full">
          <ion-item
            v-for="item in devices"
            :key="item.id"
            class="space-equipment-menu__item"
            button
            detail="true"
            @click="handleClick(item)"
          >
            <div class="space-equipment-menu__item__icon">
              <img :src="useEquipmentIcon(item.icon || '')" />
            </div>
            <ion-label>
              <p class="label font-bold font-size-sm color-white">
                {{ item.name }}
              </p>
              <p
                v-if="item.description"
                class="manufacturer font-mono font-size-xxs color-dark-gray text-lowercase"
              >
                {{ item.description }}
              </p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
    <ion-modal
      :is-open="state.modalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      :handleDismiss="() => handleDismiss()"
      @willDismiss="handleDismiss"
    >
      <room-equipment-modal
        :deviceDetails="state.selectedEquipment"
        :spaceId="spaceId"
      />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from "vue";
import {
  IonContent,
  IonPage,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import AppHeader from "@/components/shared/AppHeader.vue";
import RoomEquipmentModal from "@/components/modals/RoomEquipmentModal.vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEquipmentIcon } from "@/composables/utilities";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const router = useRouter();
const route = useRoute();
const spaceId: string = route.params.spaceId as string;
const spacesStore = useSpacesStore();

interface State {
  modalOpen: boolean;
  selectedEquipment: { [key: string]: any } | null;
}

const state: State = reactive({
  modalOpen: false,
  selectedEquipment: null,
});

const devices = computed(() => spacesStore?.devices || []);

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleClick = (item: any) => {
  state.selectedEquipment = item;
  state.modalOpen = !state.modalOpen;
};

onBeforeMount(() => {
  if (spaceId !== spacesStore.currentSpaceId) {
    spacesStore.getSpaceDetails(spaceId);
  }
  spacesStore.getSpaceDevices(spaceId);
});
</script>

<style scoped>
.space-equipment-container {
  padding: 0px 30px 20px;
}
ion-content {
  --background: #000000;
}
ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
}

ion-modal {
  --max-height: 80vh;
}
</style>
