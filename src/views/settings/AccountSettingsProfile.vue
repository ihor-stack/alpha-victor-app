<template>
  <ion-page>
    <div class="settings-panel">
      <div class="settings-panel-container">
        <ion-header class="ion-no-border">
          <ion-item class="modal-panel__header" lines="none">
            <ion-label text-wrap="true">
              <h2 class="font-size-md font-bold">
                {{ accountDetails.name ? accountDetails.name : $t('pages.accountSettings.profile.noNameSet') }}
              </h2>
              <p class="font-size-xs">
                {{
                  accountDetails.email ? accountDetails.email : $t('pages.accountSettings.profile.noEmailSet')
                }}
              </p>
            </ion-label>
          </ion-item>
        </ion-header>
        <ion-content :scroll-y="false">
          <ion-input
            class="font-size-sm custom-input"
            :placeholder="$t('pages.accountSettings.profile.placeholders.name')"
            :value="accountDetails.name"
            @ion-input="accountDetails.name = String($event.target.value)"
          ></ion-input>
          <ion-input
            class="font-size-sm custom-input"
            :placeholder="$t('pages.accountSettings.profile.placeholders.email')"
            :value="accountDetails.email"
            @ion-input="accountDetails.email = String($event.target.value)"
          ></ion-input>
          <ion-input
            class="font-size-sm custom-input"
            :placeholder="$t('pages.accountSettings.profile.placeholders.phone')"
            :value="accountDetails.phone"
            @ion-input="accountDetails.phone = String($event.target.value)"
          ></ion-input>
          <!-- <ion-input
            class="font-size-sm custom-input"
           
            placeholder="DOB"
            :value="accountDetails.dob"
            @ion-input="accountDetails.dob = String($event.target.value)"
          ></ion-input> -->
          <div class="custom-input dob-wrapper">
            <ion-datetime-button datetime="dob"></ion-datetime-button>
          </div>

          <ion-modal :keep-contents-mounted="true">
            <ion-datetime
              presentation="date"
              id="dob"
              display-format="DD/MM/YYYY HH:mm:ss"
              picker-format="DD MMM YYYY HH:mm:ss"
              :value="accountDetails.dob"
              @ion-change="
                (e) => {
                  accountDetails.dob = String(e.target.value);
                }
              "
            ></ion-datetime>
          </ion-modal>
          <ion-select
            interface="action-sheet"
            :placeholder="$t('pages.accountSettings.profile.placeholders.gender')"
            class="custom-select"
            v-model="accountDetails.gender"
          >
            <ion-select-option :value="0">{{ $t('pages.accountSettings.profile.gender.male') }}</ion-select-option>
            <ion-select-option :value="1">{{ $t('pages.accountSettings.profile.gender.female') }}</ion-select-option>
            <ion-select-option :value="2">{{ $t('pages.accountSettings.profile.gender.not') }}</ion-select-option>
          </ion-select>
        </ion-content>
        <ion-footer>
          <ion-button expand="block" @click="confirm"
            >{{ $t('pages.accountSettings.profile.updateProfileBtn') }}</ion-button
          >
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
  modalController,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { onBeforeMount } from "vue";
import { Account } from "@/stores/publicAccount";
import { storeToRefs } from "pinia";

const publicAccount = Account();
const { accountDetails } = storeToRefs(publicAccount);

function confirm() {
  publicAccount.updateAccount().then(() => {
    modalController.dismiss();
  });
}

onBeforeMount(() => {
  publicAccount.getAccount();
});
</script>

<style scoped>
.settings-panel {
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.settings-panel-container {
  position: relative;
  height: 100%;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 25px;
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

.dob-wrapper {
  padding: 12px;
}

.dob-wrapper ion-datetime-button {
  width: fit-content;
}
.dob-wrapper ion-datetime-button::part(native) {
  background: transparent;
}
</style>
