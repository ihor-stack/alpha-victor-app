<template>
  <ion-page>
    <div class="modal-panel">
      <div class="modal-panel-container">
        <ion-header>
          <div class="modal-panel__header">
            <h1 class="modal-panel__title color-light-gray font-bold font-size-normal">{{ props.issue.title }}</h1>
            <p class="modal-panel__comment color-light-gray font-size-sm">{{ props.issue.comment }}</p>
          </div>
        </ion-header>
        <ion-content>
          <div class="modal-panel__section modal-panel__add-comment">
            <h2 class="color-light-gray font-size-xs font-bold modal-panel__heading">Add Comment</h2>
            <ion-textarea class="modal-panel__add-comment__textarea" placeholder="Enter a comment here"></ion-textarea>
          </div>

          <div class="modal-panel__section modal-panel__select-equipment">
            <h2 class="color-light-gray font-size-xs font-bold modal-panel__heading">Select Equipment</h2>
            <ion-select interface="action-sheet" class="modal-panel__select-equipment__select" placeholder="Select equipment">
              <ion-select-option value="wifi">WiFi</ion-select-option>
              <ion-select-option value="computer">Computer</ion-select-option>
            </ion-select>
          </div>

          <div class="modal-panel__section modal-panel__set-status">
            <h2 class="color-light-gray font-size-xs font-bold modal-panel__heading">Select Status</h2>
            <div class="modal-panel__status">
              <div class="modal-panel__status__radio">
                <input type="radio" name="status" id="low-impact" :value="0" v-model="state.issue.status" />
                <label for="low-impact" class="modal-panel__status__radio__label">
                  <span class="dot dot--low-impact"></span>
                  low.impact
                </label>
              </div>
              <div class="modal-panel__status__radio">
                <input type="radio" name="status" id="high-impact" :value="1" v-model="state.issue.status" />
                <label for="high-impact" class="modal-panel__status__radio__label">
                  <span class="dot dot--high-impact"></span>
                  high.impact
                </label>
              </div>
              <div class="modal-panel__status__radio">
                <input type="radio" name="status" id="resolved" :value="2" v-model="state.issue.status" />
                <label for="resolved" class="modal-panel__status__radio__label">
                  <span class="dot dot--resolved"></span>
                  resolved
                </label>
              </div>
            </div>
          </div>

          <div class="modal-panel__log">
            <h3 class="modal-panel__log__heading font-mono color-light-gray font-size-xxs">status</h3>

            <ul class="modal-panel__log__list">
              <li class="modal-panel__log__list__item" v-for="(log, index) in state.issue.log" :key="index">
                <p class="modal-panel__log__list__item__text color-light-gray font-size-xs font-regular">{{ log }}</p>
                <p class="modal-panel__log__list__item__logged color-dark-gray font-mono font-size-xxs">14.minutes.ago</p>
              </li>
            </ul>
          </div>
        </ion-content>
        <ion-footer>
          <ion-button expand="block">Submit Issue</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, defineProps } from "vue";
import { 
  IonPage, 
  IonContent,
  IonHeader,
  IonFooter,
  IonSelect, 
  IonSelectOption, 
  IonTextarea, 
  IonButton 
} from "@ionic/vue";
const props = defineProps(
  ['issue'],
);
const state = reactive({
  issue: props.issue
});
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
