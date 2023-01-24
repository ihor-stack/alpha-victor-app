<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <div class="blue-text-container">
                <BlueText text="allow.access" offset="85" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-size-lg color-light-gray font-bold">We need some<br /> access.</h1>
              </div>
              <div class="allow-access-container">
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/location.svg" alt="Icon of a map pin marker" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">Location</h4>
                    <p class="color-dark-gray font-size-xs">To allow us to see which room you’re in</p>
                  </div>
                </div>
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/bluetooth.svg" alt="Bluetooth icon" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">Bluetooth</h4>
                    <p class="color-dark-gray font-size-xs">To ping beacons for a more accurate location</p>
                  </div>
                </div>
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/notifications.svg" alt="Icon of a bell" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">Notifications</h4>
                    <p class="color-dark-gray font-size-xs">To keep you in the loop</p>
                  </div>
                </div>
              </div>
              <div>
                <ion-button expand="block">Got it</ion-button>
              </div>
              <div class="link-container text-center">
                <p class="color-dark-gray font-md">Already have an account? <router-link :to="{ name: 'Login' }" class="color-light-gray link">Login</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import BlueText from '@/components/BlueText.vue';
</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}

.blue-text-container {
  margin-bottom: 5px;
  text-align: center;
}

.headline-container {
  margin-bottom: 32px;
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 34px;
  text-indent: -20px;
  margin-bottom: 12px;
}

.link-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.allow-access-container {
  padding-left: 10px;
  margin-bottom: 32px;
}

.allow-access-item {
  display: flex;
  align-items: flex-start;
}

.allow-access-item:nth-of-type(2) {
  padding-left: 28px;
}

.allow-access-item:nth-of-type(3) {
  padding-left: 52px;
}

.allow-access-item:not(:last-of-type) {
  margin-bottom: 22px;
}

.allow-access-icon {
  margin-right: 8px;
}

.allow-access-info h4 {
  margin-bottom: 5px;
}

ion-button {
  letter-spacing: 0.015em;
}

</style>
