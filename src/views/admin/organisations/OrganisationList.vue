<template>
  <h1 class="font-bold font-size-lg color-light-gray">Organisations</h1>
  <ul class="organisations-list-menu">
    <li class="organisations-list-menu-item">
      <ion-item 
      v-for="org in store.getList" 
      v-bind:key="org.id" 
      :router-link="{ name: 'OrganisationView', params: { id: store2.id} }"
      router-direction="root"
      >
        <img
          src="@/theme/img/mclaren.svg"
          :alt="org.name"
        />
        <span class="link-text">{{ org.name }}</span>
        <ion-icon slot="end" :icon="chevronForwardOutline" color="light" />
      </ion-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonIcon
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";
import { chevronForwardOutline } from "ionicons/icons";
import {Organisation}  from '@/stores/adminStore'
import {Organisations} from '@/stores/adminStore'

const store = Organisations()
const store2 = Organisation()

onBeforeMount(() => {
  store.getOrganisations()
})
</script>

<style scoped>
.organisations-list-menu {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.organisations-list-menu-item ion-item {
  --background: none;
  --color: #FFFFFF;
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-end: 0;
  --inner-padding-top: 8px;
  --inner-padding-bottom: 8px;
  --border-color: #222222;
  cursor: pointer;
}

.organisations-list-menu-item ion-item ion-icon {
  margin-right: 0;
}

.organisations-list-menu-item img {
  margin-right: 20px;
}

.organisations-list-menu-item .link-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
}

.organisations-list-menu-item .arrow-right {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("@/theme/icons/arrow-right.svg");
  background-repeat: no-repeat;
  background-size: 8px 12px;
  background-position: center;
}

.organisations-list-menu-item .with-counter {
  display: flex;
  align-items: center;
}

.organisations-list-menu-item .counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: #37b14c;
  border-radius: 50%;
  margin-left: 10px;
}

.organisations-list-menu-item .counter span {
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
  color: #ffffff;
}
</style>
