<template>
  <ul class="list">
    <li
      class="list-item"
      v-for="item in listData"
      :key="item.id"
      @click="handleSelectItem(item)"
    >
      <p class="primaryText font-bold font-size-sm color-light-gray">
        {{ item.title || item.name }}
      </p>
      <div class="font-size-xs">
        <ion-row
          v-if="item.id === selectedItem?.id"
          class="color-green ion-align-items-center"
        >
          <ion-icon :icon="checkmarkCircle" size="small" />
          <ion-col> selected </ion-col>
        </ion-row>
        <ion-col v-else>>> select</ion-col>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { IonRow, IonCol } from "@ionic/vue";
import { checkmarkCircle } from "ionicons/icons";

defineProps(["listData", "selectedItem", "handleSelectItem"]);
</script>

<style scoped>
.list {
  border-bottom: none;
}
</style>
