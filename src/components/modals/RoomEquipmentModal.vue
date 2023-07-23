<template>
  <div class="modal-panel">
    <div class="modal-panel-container">
      <div class="equipment-panel__icon" v-if="deviceDetails.category">
      </div>
      <ion-header class="ion-no-border">
        <ion-item class="modal-panel__header" lines="none">
          <ion-label>
            <h2 class="font-bold font-size-lg">
              {{ deviceDetails.name }}
            </h2>
            <p class="font-size-xxs font-mono">device.information</p>
          </ion-label>
        </ion-item>
      </ion-header>
      <ion-content :scroll-y="false">
        <ion-list>
          <ion-list-header class="ion-no-padding font-bold">
            <ion-label>Technical</ion-label>
          </ion-list-header>
          <ion-item
            v-for="(item, key) in technicalItems"
            :key="key"
            class="font-size-xs"
          >
            <ion-label>{{ item.label }}</ion-label>
            <span class="value">{{ item.value }}</span>
          </ion-item>
        </ion-list>
        <ion-list>
          <ion-list-header class="ion-no-padding font-bold">
            <ion-label>Installation</ion-label>
          </ion-list-header>
          <ion-item
            v-for="(item, key) in installations"
            :key="key"
            class="font-size-xs"
          >
            <ion-label>{{ item.label }}</ion-label>
            <span class="value">{{ item.value }}</span>
          </ion-item>
        </ion-list>
        <ion-list>
          <ion-item
            :href="`/equipment/${spaceId}/documents/${deviceDetails.id}`"
            @click="handleDismiss"
            button
            :detail="true"
          >
            <ion-label>
              <h3 class="font-bold font-size-xs">Documents</h3>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <div class="equipment-panel__footer">
          <ion-button
            expand="block"
            :href="`/equipment/${spaceId}/documents/${deviceDetails.id}?documentType=User Guide`"
            >User Guide</ion-button
          >
          <ion-button
           
            expand="block"
            @click="handleClickReportIssue"
            >Report Issue</ion-button
          >
        </div>
      </ion-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/vue";

const props = defineProps([
  "deviceDetails",
  "spaceId",
  "handleDismiss",
  "handleClickReportIssue",
]);

const technicalItems = computed(() => {
  const items: { label: string; value: string }[] = [];
  if (props.deviceDetails?.manufacturer) {
    items.push({
      label: "manufacturer",
      value: props.deviceDetails?.manufacturer,
    });
  }
  if (props.deviceDetails?.model) {
    items.push({
      label: "model",
      value: props.deviceDetails?.model,
    });
  }
  if (props.deviceDetails?.location) {
    items.push({
      label: "location",
      value: props.deviceDetails?.location,
    });
  }
  if (props.deviceDetails?.serialNumber) {
    items.push({
      label: "serial.number",
      value: props.deviceDetails?.serialNumber,
    });
  }
  if (props.deviceDetails?.warrantyExpiryDate) {
    items.push({
      label: "warranty.expiry",
      value: props.deviceDetails?.warrantyExpiryDate,
    });
  }

  return items;
});
const installations = computed(() => {
  const items: { label: string; value: string }[] = [];
  if (props.deviceDetails?.installer) {
    items.push({
      label: "installer",
      value: props.deviceDetails?.installer,
    });
  }
  if (props.deviceDetails?.installDate) {
    items.push({
      label: "install.date",
      value: props.deviceDetails?.installDate,
    });
  }
  return items;
});
</script>

<style scoped>
ion-item::part(native) {
  padding-left: 0px;
}
ion-item::part(detail-icon) {
  opacity: 1;
}

.modal-panel {
  height: 100%;
}

.equipment-panel__icon {
  position: absolute;
  top: 25px;
  right: 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.equipment-panel__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.equipment-panel__header {
  padding: 20px 50px 20px 0;
}

.equipment-name {
  font-size: 18px;
  line-height: 18px;
}

.device-information {
  margin-top: 12px;
  margin-left: 12px;
}

.equipment-panel__footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

ion-button {
  flex-basis: 47%;
}

.equipment-panel__info-section {
  margin-bottom: 30px;
}

.equipment-panel__info-section__heading {
  font-family: "Akkurat-Bold";
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.015em;
  margin-bottom: 18px;
}

.equipment-panel__info-section__list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.equipment-panel__info-section__list__item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 0.75px solid #313131;
  font-size: 10px;
}

.list-options-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.list-options-menu-item ion-item {
  --background: none;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-top: 8px;
  --inner-padding-bottom: 8px;
}

.list-options-menu-item ion-item ion-icon {
  margin-right: 0;
}

.list-options-menu-item .link-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
}

.list-options-menu-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.list-options-menu-item .with-counter {
  display: flex;
  align-items: center;
}

.list-options-menu-item .counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #37b14c;
  border-radius: 50%;
  margin-left: 10px;
}

.list-options-menu-item .counter span {
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
}
</style>
