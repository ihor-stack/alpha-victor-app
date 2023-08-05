<template>
  <ul class="list">
    <li
      class="list-item"
      v-for="item in listData"
      :key="item.id"
      @click="handleSelectItem(item)"
    >
      <div class="titleWrapper">
        <div class="primaryText font-bold font-size-sm color-light-gray">
          {{ item.title || item.name }}
        </div>
        <ion-icon
          :icon="createOutline"
          size="small"
          class="color-light-gray"
          @click="handleCllickEdit($event, item)"
        />
      </div>
      <div class="font-size-xs">
        <ion-row
          v-if="item.id === selectedItem?.id"
          class="color-green ion-align-items-center"
        >
          <ion-icon :icon="checkmarkCircle" size="small" />
          <ion-col>
            {{
              $t(
                "components.modals.decisionTreeNodeModal.customList.selectedCol"
              )
            }}
          </ion-col>
        </ion-row>
        <ion-col v-else>{{
          $t(
            "components.modals.decisionTreeNodeModal.customList.greaterSelectedCol"
          )
        }}</ion-col>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { IonRow, IonCol } from "@ionic/vue";
import { checkmarkCircle, createOutline } from "ionicons/icons";

const props = defineProps([
  "listData",
  "selectedItem",
  "handleSelectItem",
  "handleEditItem",
]);

const handleCllickEdit = (event, item) => {
  event.stopPropagation();
  props.handleEditItem(item);
};
</script>

<style scoped>
.list {
  border-bottom: none;
}
.titleWrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
.titleWrapper .primaryText {
  margin-top: 4px;
}
</style>
