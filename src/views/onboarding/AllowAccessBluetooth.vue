<template>
  <ion-page>
    <ion-content>
      <div class="outer-container">
        <div class="gradient-container">
          <div class="allow-access-container">
            <OnboardingAccessPanel 
              blueText="bluetooth.access"
              :ctaFunc="() => {}"
            >
              <template v-slot:image>
                <img src="@/theme/img/onboarding-access-bluetooth.svg" />
              </template>
              <template v-slot:heading>
                Enable<br /> bluetooth.
              </template>
              <template v-slot:info-text>
                Please allow bluetooth access when prompted to better allow the app to determine your location within a space
              </template>
            </OnboardingAccessPanel>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import OnboardingAccessPanel from '@/components/onboarding/OnboardingAccessPanel.vue';
</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}
.allow-access-container {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
