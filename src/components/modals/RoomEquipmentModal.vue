<template>
  <div class="equipment-panel">
    <div class="equipment-panel-container">
      <div class="equipment-panel__icon" v-if="deviceDetails.category">
        <img :src="useEquipmentIcon(deviceDetails.category)" />
      </div>
      <ion-header>
        <div class="equipment-panel__header">
          <h1 class="equipment-name font-bold">
            {{ deviceDetails.name }}
          </h1>
          <p class="font-size-xxs color-dark-gray font-mono device-information">
            device.information
          </p>
        </div>
      </ion-header>
      <div>
        <div class="equipment-panel__info-section">
          <h4 class="equipment-panel__info-section__heading">Technical</h4>
          <ul class="equipment-panel__info-section__list">
            <li
              v-for="(item, key) in technicalItems"
              :key="key"
              class="equipment-panel__info-section__list__item"
            >
              <span class="key">{{ item.label }}</span
              ><span class="value">{{ item.value }}</span>
            </li>
          </ul>
        </div>
        <div class="equipment-panel__info-section">
          <h4 class="equipment-panel__info-section__heading">Installation</h4>
          <ul class="equipment-panel__info-section__list">
            <li
              v-for="(item, key) in installations"
              :key="key"
              class="equipment-panel__info-section__list__item"
            >
              <span class="key">{{ item.label }}</span
              ><span class="value">{{ item.value }}</span>
            </li>
          </ul>
        </div>
        <ul class="list-options-menu">
          <li class="list-options-menu-item">
            <ion-item
              :router-link="{
                name: 'Documents',
                params: { spaceId: spaceId },
              }"
              router-direction="root"
            >
              <span class="link-text">Documents</span>
              <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
            </ion-item>
          </li>
        </ul>
      </div>
      <ion-footer>
        <div class="equipment-panel__footer">
          <ion-button expand="block">User Guide</ion-button>
          <ion-button
            color="light"
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
import { IonHeader, IonFooter, IonButton, IonContent } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { useEquipmentIcon } from "@/composables/utilities";

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
.equipment-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.equipment-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
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
  color: #ffffff;
}

.device-information {
  margin-top: 12px;
  margin-left: 12px;
}

ion-content {
  --background: #181818;
  --padding-top: 20px;
  --padding-bottom: 20px;
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
  color: #ffffff;
  margin-bottom: 30px;
}

.equipment-panel__info-section__heading {
  font-family: "Akkurat-Bold";
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.015em;
  color: #ffffff;
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
  --color: #ffffff;
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
  color: #ffffff;
}


ion-list {
  background: transparent;
}

ion-item {
  --background: transparent;
}
</style>
