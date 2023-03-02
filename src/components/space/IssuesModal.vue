<template>
  <div class="issues-panel">
    <div class="issues-panel-container">
      <div class="issues-panel__header">
        <h1 class="issues-panel__title color-light-gray font-bold font-size-normal">{{ props.issue.title }}</h1>
        <p class="issues-panel__comment color-light-gray font-size-xs">{{ props.issue.comments[0] }}</p>
      </div>
      <div class="issues-panel__section issues-panel__add-comment">
        <h2 class="color-light-gray font-size-xs font-bold issues-panel__heading">Add Comment</h2>
        <ion-textarea class="issues-panel__add-comment__textarea" placeholder="Enter a comment here"></ion-textarea>
      </div>
      <div class="issues-panel__section issues-panel__select-equipment">
        <h2 class="color-light-gray font-size-xs font-bold issues-panel__heading">Select Equipment</h2>
        <ion-select class="issues-panel__select-equipment__select">
          <option value="Select equipment" disabled></option>
        </ion-select>
      </div>
      <div class="issues-panel__section issues-panel__set-status">
        <h2 class="color-light-gray font-size-xs font-bold issues-panel__heading">Select Status</h2>
        <div class="issues-panel__status">
          <div class="issues-panel__status__radio">
            <input type="radio" name="status" id="low-impact" :value="0" v-model="state.issue.status" />
            <label for="low-impact" class="issues-panel__status__radio__label">
              <span class="dot dot--low-impact"></span>
              low.impact
            </label>
          </div>
          <div class="issues-panel__status__radio">
            <input type="radio" name="status" id="high-impact" :value="1" v-model="state.issue.status" />
            <label for="high-impact" class="issues-panel__status__radio__label">
              <span class="dot dot--high-impact"></span>
              high.impact
            </label>
          </div>
          <div class="issues-panel__status__radio">
            <input type="radio" name="status" id="resolved" :value="2" v-model="state.issue.status" />
            <label for="resolved" class="issues-panel__status__radio__label">
              <span class="dot dot--resolved"></span>
              resolved
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineComponent } from "vue";
import { IonSelect, IonTextarea } from "@ionic/vue";
const props = defineProps(
  ['issue'],
);
const state = reactive({
  issue: props.issue
});

defineComponent({
  components: { IonSelect, IonTextarea },
});
</script>

<style scoped>
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
  font-family: 'Akkurat-Mono';
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.015em;
  color: #313131;
}

.issues-panel__status__radio label .dot {
  margin-right: 4px;
}

.issues-panel__status__radio input:checked ~ label {
  border: 0.75px solid #FFFFFF;
  color: #FFFFFF;
}
</style>
