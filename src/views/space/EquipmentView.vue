<template>
  <ion-page>
    <app-header :title="$t('pages.space.equipment.title')">
      <template #start>
        <ion-button fill="clear" @click="() => router.back()" class="back">
          <span class="font-mono font-size-xs">{{
            $t("pages.space.equipment.back")
          }}</span>
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
            :detail="true"
            @click="handleClick(item)"
          >
            <div class="space-equipment-menu__item__icon"></div>
            <ion-label text-wrap="true">
              <h3 class="label font-bold font-size-normal">
                {{ item.name }}
              </h3>
              <p
                v-if="item.manufacturer"
                class="manufacturer font-mono font-size-xxs text-lowercase"
              >
                {{ item.manufacturer }}
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
      @willDismiss="handleDismiss"
    >
      <room-equipment-modal
        :deviceDetails="state.selectedEquipment"
        :spaceId="spaceId"
        :handleDismiss="() => handleDismiss()"
        :handleClickReportIssue="handleClickReportIssue"
      />
    </ion-modal>
    <ion-modal
      :is-open="state.reportIssueModalOpen"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @willDismiss="state.reportIssueModalOpen = false"
    >
      <report-issue-modal
        :spaceId="spaceId"
        :deviceId="state.selectedEquipment?.id"
        :handleReportIssue="() => (state.reportIssueModalOpen = false)"
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
import ReportIssueModal from "@/components/modals/ReportIssueModal.vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";

const router = useRouter();
const route = useRoute();
const spaceId: string = route.params.spaceId as string;
const spacesStore = useSpacesStore();

interface State {
  modalOpen: boolean;
  selectedEquipment: { [key: string]: any } | null;
  reportIssueModalOpen: boolean;
}

const state: State = reactive({
  modalOpen: false,
  selectedEquipment: null,
  reportIssueModalOpen: false,
});

const devices = computed(() => spacesStore?.devices || []);

const handleDismiss = () => {
  state.modalOpen = false;
};

const handleClick = (item: any) => {
  state.selectedEquipment = item;
  state.modalOpen = !state.modalOpen;
};

const handleClickReportIssue = () => {
  state.modalOpen = false;
  state.reportIssueModalOpen = true;
};

onBeforeMount(() => {
  if (
    spaceId !== spacesStore.currentSpace?.id ||
    !spacesStore?.devices?.length
  ) {
    spacesStore.getSpaceDetails(spaceId);
    spacesStore.getSpaceDevices(spaceId);
  }
});
</script>

<style scoped>
.space-equipment-container {
  padding: 0px 5px 20px;
}
ion-item {
  --padding-start: 0 !important;
  --padding-end: 0 !important;
}
ion-item::part(detail-icon) {
  opacity: 1;
}
ion-modal {
  --max-height: 80vh;
}
</style>
