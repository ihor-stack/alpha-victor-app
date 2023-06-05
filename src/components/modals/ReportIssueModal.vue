<template>
  <ion-page>
    <div class="issues-panel">
      <div class="issues-panel-container">
        <ion-header>
          <div class="issues-panel__header">
            <h1
              class="issues-panel__title color-light-gray font-bold font-size-normal"
            >
              Report Issue
            </h1>
            <p class="issues-panel__comment color-light-gray font-size-xs">
              Please provide details on the issue you're facing, and which
              equipment
            </p>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-row>
            <ion-col size="12" class="form-admin--group_field">
              <ion-label class="font-bold font-size-xs" color="light"
                >Add title</ion-label
              >
              <ion-input
                color="light"
                placeholder="Enter a issue title"
                v-model="state.title"
              ></ion-input>
            </ion-col>
          </ion-row>
          <div class="issues-panel__section issues-panel__select-equipment">
            <h2
              class="color-light-gray font-size-xs font-bold issues-panel__heading"
            >
              Select Equipment
            </h2>
            <ion-select
              interface="action-sheet"
              class="issues-panel__select-equipment__select"
              placeholder="Select equipment"
              v-model="state.deviceId"
              @ion-change="checkForInputs"
            >
              <ion-select-option
                v-for="device in devices"
                :key="device.id"
                :value="device.id"
              >
                {{ device.name }}
              </ion-select-option>
            </ion-select>
          </div>

          <div class="issues-panel__section issues-panel__add-comment">
            <h2
              class="color-light-gray font-size-xs font-bold issues-panel__heading"
            >
              Add Comment
            </h2>
            <ion-textarea
              class="issues-panel__add-comment__textarea"
              placeholder="Enter a comment here"
              v-model="state.comment"
              helper-text="Helper Text"
              @ion-change="checkForInputs"
            ></ion-textarea>
          </div>
        </ion-content>
        <ion-footer>
          <ion-button
            expand="block"
            :disabled="!state.canSubmit"
            @click="handleReportIssue(state)"
            >Submit Issue</ion-button
          >
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
  IonButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { Spaces as useSpacesStore } from "@/stores/publicSpaces";
const spacesStore = useSpacesStore();

const { devices } = storeToRefs(spacesStore);

const props = defineProps(["handleReportIssue"]);
console.log(props);
const state = reactive({
  title: "",
  comment: "",
  deviceId: "",
  canSubmit: false,
});

const checkForInputs = () => {
  return state.title.length > 0 &&
    state.comment.length > 0 &&
    state.deviceId.length > 0
    ? (state.canSubmit = true)
    : (state.canSubmit = false);
};
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.issues-panel {
  height: 100%;
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

.issues-panel__add-comment__textarea {
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

.issues-panel__select-equipment__select {
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

.issues-panel__status {
  display: flex;
  justify-content: space-between;
}

.issues-panel__status__radio input {
  appearance: none;
}

.issues-panel__status__radio label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 26px;
  border: 0.75px solid #313131;
  border-radius: 100px;
  padding: 4px;
  font-family: "Akkurat-Mono";
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.015em;
  color: #313131;
}

.issues-panel__status__radio label .dot {
  margin-right: 4px;
}

.issues-panel__status__radio input:checked ~ label {
  border: 0.75px solid #ffffff;
  color: #ffffff;
}

.issues-panel__log__heading {
  padding-bottom: 8px;
  border-bottom: 0.75px solid #313131;
  margin-bottom: 18px;
}

.issues-panel__log__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.issues-panel__log__list__item {
  margin-bottom: 20px;
}

.issues-panel__log__list__item p:last-of-type {
  margin-left: 6px;
}

.form-admin--group_field {
  padding-right: 0;
  margin-bottom: 20px;
}
</style>
