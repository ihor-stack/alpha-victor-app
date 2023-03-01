<template>
  <div class="equipment-panel">
    <div class="equipment-panel-container">
      <div class="equipment-panel__icon">
        <img :src="useEquipmentIcon(props.selectedEquipment.category)" />
      </div>
      <div class="equipment-panel__header">
        <h1 class="equipment-name font-bold">{{ props.selectedEquipment.name }}</h1>
        <p class="font-size-xxs color-dark-gray font-mono device-information">device.information</p>
      </div>
      <ion-content>
        <div v-if="props.selectedEquipment.technical" class="equipment-panel__info-section">
          <h4 class="equipment-panel__info-section__heading">Technical</h4>
          <ul class="equipment-panel__info-section__list">
            <li v-for="(value, key) in props.selectedEquipment.technical" :key="key"
              class="equipment-panel__info-section__list__item">
              <span class="key">{{ dotify(key.toString()) }}</span><span class="value">{{ value }}</span>
            </li>
          </ul>
        </div>
        <div v-if="props.selectedEquipment.installation" class="equipment-panel__info-section">
          <h4 class="equipment-panel__info-section__heading">Installation</h4>
          <ul class="equipment-panel__info-section__list">
            <li v-for="(value, key) in props.selectedEquipment.installation" :key="key"
              class="equipment-panel__info-section__list__item">
              <span class="key">{{ dotify(key.toString()) }}</span><span class="value">{{ value }}</span>
            </li>
          </ul>
        </div>
      </ion-content>
      <div class="equipment-panel__footer">
        <ion-button expand="block" size="small">User Guide</ion-button>
        <ion-button color="light" expand="block" size="small">Report Issue</ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonContent } from "@ionic/vue";
import { useEquipmentIcon } from '@/composables/equipmentIcon';
const props = defineProps(
  ['selectedEquipment'],
);

const dotify = (input: string) => {
  const split = input.replace("_", "").split(/(?=[A-Z\s])/);
  const join = split.join('.').toLowerCase();
  return join;
}
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
  color: #FFFFFF;
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
  color: #FFFFFF;
  margin-bottom: 30px;
}

.equipment-panel__info-section__heading {
  font-family: 'Akkurat-Bold';
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.015em;
  color: #FFFFFF;
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
</style>
