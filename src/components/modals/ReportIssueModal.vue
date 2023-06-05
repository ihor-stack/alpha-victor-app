<template>
  <ion-page>
    <div class="modal-panel">
      <div class="modal-panel-container">
        <ion-header>
          <div class="modal-panel__header">
            <h1 class="modal-panel__title color-light-gray font-bold font-size-normal">Report Issue</h1>
            <p class="modal-panel__comment color-light-gray font-size-sm">Please provide details on the issue you're facing, and which equipment</p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <div class="modal-panel__section modal-panel__select-equipment">
            <h2 class="color-light-gray font-size-xs font-bold modal-panel__heading">Select Equipment</h2>
            <ion-select interface="action-sheet" class="modal-panel__select-equipment__select" placeholder="Select equipment" v-model="state.equipment" @ion-change="checkForInputs">
              <ion-select-option value="wifi">WiFi</ion-select-option>
              <ion-select-option value="computer">Computer</ion-select-option>
            </ion-select>
          </div>

          <div class="modal-panel__section modal-panel__add-comment">
            <h2 class="color-light-gray font-size-xs font-bold modal-panel__heading">Add Comment</h2>
            <ion-textarea class="modal-panel__add-comment__textarea" placeholder="Enter a comment here" v-model="state.comment" helper-text="Helper Text" @ion-change="checkForInputs"></ion-textarea>
          </div>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" :disabled="!state.canSubmit" @click="submitIssue">Submit Issue</ion-button>
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
  IonSelectOption, 
  IonTextarea 
} from "@ionic/vue";

const state = reactive({
  comment: "",
  equipment: "",
  canSubmit: false
});

const submitIssue = () => {
  console.log('submitting issue with comment: ' + state.comment);
}

const checkForInputs = () => {
  return state.comment.length > 0 && state.equipment.length > 0 ? state.canSubmit = true : state.canSubmit = false;
}
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.modal-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.modal-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.modal-panel__header {
  margin-bottom: 20px;
}

.modal-panel__title {
  margin-bottom: 12px;
}

.modal-panel__section {
  margin-bottom: 20px;
}

.modal-panel__heading {
  margin-bottom: 5px;
}

.modal-panel__add-comment__textarea {
  appearance: none;
  resize: none;
  background: none;
  border: 0.75px solid #313131;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  min-height: 100px;
  color: var(--av-light-gray);
  font-size: 12px;
  line-height: 16px;
}

.modal-panel__select-equipment__select {
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

.modal-panel__status {
  display: flex;
  justify-content: space-between;
}

.modal-panel__status__radio input {
  appearance: none;
}

.modal-panel__status__radio label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 26px;
  border: 0.75px solid #313131;
  border-radius: 100px;
  padding: 4px;
  font-family: 'Akkurat-Mono';
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.015em;
  color: #313131;
}

.modal-panel__status__radio label .dot {
  margin-right: 4px;
}

.modal-panel__status__radio input:checked ~ label {
  border: 0.75px solid #FFFFFF;
  color: #FFFFFF;
}

.modal-panel__log__heading {
  padding-bottom: 8px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.modal-panel__log__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.modal-panel__log__list__item {
  margin-bottom: 20px;
}

.modal-panel__log__list__item p:last-of-type {
  margin-left: 6px;
}
</style>
