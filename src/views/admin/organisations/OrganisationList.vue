<template>
  <h1 class="font-bold font-size-lg color-light-gray">Organisations</h1>
  <ul class="organisations-list-menu">
    <li class="organisations-list-menu-item">
      <ion-item 
      v-for="org in organisation.getList" 
      v-bind:key="org.id"
      :router-link="redirect(org.id)"
      router-direction="root"
      >
        <!-- src="@/theme/img/mclaren.svg" -->
        <img
          :src="org.logo"
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
import {Organisations} from '@/stores/adminOrganisations'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const organisation = Organisations()
const redirect = (id: string) => {
  cookies.set('orgId', id)
  if( cookies.get('orgId')){
    return { name: 'OrganisationView', params: { id: cookies.get('orgId')} }
  }
  
}
onBeforeMount(() => {
  organisation.getOrganisations()
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
