<template>
    <div class="container">
      <ul class="space-options-menu">
        <li class="space-options-menu-item">
          <ion-item :router-link="{ name: 'Equipment' }" router-direction="root">
            <span class="link-text">Room Equipment</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
          </ion-item>
        </li>
        <li class="space-options-menu-item">
          <ion-item :router-link="{ name: 'Help' }" router-direction="root">
            <span class="link-text">Get Help</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
          </ion-item>
        </li>
        <li class="space-options-menu-item">
          <ion-item :router-link="{ name: 'KnownIssues' }" router-direction="root">
            <div class="with-counter">
              <p class="label font-bold font-size-sm color-light-gray">
                Known Issues
              </p>
              <div v-if="issues && issues.length > 0" class="counter">
                <div>
                  <span>{{ issues.length }}</span>
                </div>
              </div>
            </div>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
          </ion-item>
        </li>
        <li class="space-options-menu-item">
          <ion-item :router-link="{ name: 'Documents' }" router-direction="root">
            <span class="link-text">Documents</span>
            <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
          </ion-item>
        </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonItem, IonIcon } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { Issue } from "@/types";

interface Props {
  issues: Issue[];
}

defineProps<Props>();
</script>

<style scoped>
.space-options-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.space-options-menu-item ion-item {
  --background: none;
  --color: #FFFFFF;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-top: 8px;
  --inner-padding-bottom: 8px;
}

.space-options-menu-item ion-item ion-icon {
  margin-right: 0;
}

.space-options-menu-item .link-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
}

.space-options-menu-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.space-options-menu-item .with-counter {
  display: flex;
  align-items: center;
}

.space-options-menu-item .counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #37b14c;
  border-radius: 50%;
  margin-left: 10px;
}

.space-options-menu-item .counter span {
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
  color: #ffffff;
}

ion-content.transparent::part(scroll)::-webkit-scrollbar {
  display: none;
}
</style>
