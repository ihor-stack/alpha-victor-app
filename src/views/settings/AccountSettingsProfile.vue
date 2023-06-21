<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header>
          <div class="settings-panel__header">
            <div class="profile-info">
              <div class="profile-details">
                <h2 class="name font-bold font-size-sm color-light-gray">{{ accountDetails.name ? accountDetails.name : 'No name set' }}</h2>
                <p class="email font-mono font-size-xxs color-dark-gray text-lowercase">{{ accountDetails.email ? accountDetails.email : 'No email set' }} </p>
              </div>
            </div>
          </div>
        </ion-header>
        <ion-content :scroll-y="false"> 
          <ion-input
            class="font-size-sm custom-input"
            color="light"
            placeholder="Name"
            :value="accountDetails.name"
            @ion-input="accountDetails.name=String($event.target.value)"
          ></ion-input>
          <ion-input
            class="font-size-sm custom-input"
            color="light"
            placeholder="Email"
            :value="accountDetails.email"
            @ion-input="accountDetails.email=String($event.target.value)"
          ></ion-input>
          <ion-input
            class="font-size-sm custom-input"
            color="light"
            placeholder="Phone"
            :value="accountDetails.phone"
            @ion-input="accountDetails.phone=String($event.target.value)"
          ></ion-input>
          <ion-input
            class="font-size-sm custom-input"
            color="light"
            placeholder="DOB"
            :value="accountDetails.dob"
            @ion-input="accountDetails.dob=String($event.target.value)"
          ></ion-input>
          <ion-select 
              interface="action-sheet" 
              placeholder="Gender" 
              class="custom-select"
              v-model="accountDetails.gender"
            >
              <ion-select-option value="0">Male</ion-select-option>
              <ion-select-option value="1">Female</ion-select-option>
              <ion-select-option value="2">Prefer not to say</ion-select-option>
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
import { ref, reactive, onBeforeMount, watch } from "vue";
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";

const publicAccount = Account()
const { accountDetails } = storeToRefs(publicAccount)

function confirm() {
  return modalController.dismiss();
}

onBeforeMount(() => {
  publicAccount.getAccount()
})
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