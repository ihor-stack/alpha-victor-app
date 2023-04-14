<template>
  <ion-page>
    <div class="issues-panel">
      <div class="issues-panel-container">
        <ion-header>
          <div class="issues-panel__header">
            <h1 class="issues-panel__title color-light-gray font-bold font-size-normal">Select Organisation</h1>
            <p class="issues-panel__comment color-light-gray font-size-xs">Here you can select the organisation that you’d like to see spaces in.</p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="issues-panel__section issues-panel__select-equipment">
            <h2 class="color-light-gray font-size-xs font-bold issues-panel__heading">Select Organisation</h2>
            
            <ion-select interface="action-sheet" class="issues-panel__select-organisation__select" placeholder="Select organisation" v-model="state.organisation">
              <ion-select-option value="LinkedIn">LinkedIn</ion-select-option>
              <ion-select-option value="Google">Google</ion-select-option>
            </ion-select>
          </div>
        </ion-content>
        <ion-footer>
          <ion-button expand="block">Confirm {{ state.organisation ? state.organisation : 'organisation' }}</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonFooter, 
  IonButton,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";

const state = reactive({
  organisation: "",
});
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.issues-panel {
  height: 40%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.issues-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.issues-panel__header {
  margin-bottom: 20px;
}

.issues-panel__title {
  margin-bottom: 12px;
}

.issues-panel__section {
  margin-bottom: 20px;
}

.issues-panel__heading {
  margin-bottom: 5px;
}

.issues-panel__select-organisation__select {
  appearance: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
}
</style>
