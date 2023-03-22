<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <div class="profile-info">
              <div class="profile-image">
                <img src="@/theme/img/example-profile-img@2x.png" alt="Current user's profile image" />
              </div>
              <div class="profile-details">
                <h2 class="name font-bold font-size-sm color-light-gray">Joe Bloggs</h2>
                <p class="email font-mono font-size-xxs color-dark-gray text-lowercase">joebloggs@email.com</p>
              </div>
            </div>
          </div>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-input type="text" class="custom-input" v-model="state.name" placeholder="Name" name="name" />
          <ion-input type="email" class="custom-input" v-model="state.email" placeholder="Email" name="email" />
          <ion-input type="tel" class="custom-input" v-model="state.phoneNumber" placeholder="Telephone Number" name="phone" />
          <ion-input type="text" class="custom-input" v-model="state.dob" placeholder="DOB" name="dob" />
          <ion-select 
              interface="action-sheet" 
              placeholder="Gender" 
              class="custom-select"
              v-model="state.gender"
            >
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
              <ion-select-option value="prefer-not-to-say">Prefer not to say</ion-select-option>
            </ion-select>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm">Update profile</ion-button>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonFooter, 
  IonContent, 
  IonInput, 
  IonSelect, 
  IonSelectOption, 
  IonButton, 
  modalController 
} from "@ionic/vue";
import { reactive } from "vue";

interface State {
  name: string
  email: string
  phoneNumber: string
  dob: string
  gender: string
}

const state: State = reactive({
  name: "Joe Bloggs",
  email: "joebloggs@email.com",
  phoneNumber: "07736464671",
  dob: "01/01/1979",
  gender: "male"
});

function confirm() {
  return modalController.dismiss();
}
</script>

<style scoped>
ion-content::part(background) {
  background: #181818;
}

.settings-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #181818;
}

.settings-panel-container {
  position: relative;
  height: 100%;
  background-color: #181818;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 45px 32px 32px;
}

.settings-panel__header {
  margin-bottom: 30px;
}

.settings-panel__title {
  margin-bottom: 12px;
}

.settings-panel__section {
  margin-bottom: 20px;
}

.settings-panel__heading {
  margin-bottom: 5px;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting .sublabel {
  margin-left: 12px;
}
.profile-info {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 50px;
  height: 50px;
}
.profile-details {
  margin-left: 12px;
}

.name {
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 4px;
}
</style>