<template>
  <ion-page>
    <ion-content>
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <div class="blue-text-container">
                <blue-text text="time.for.a.change" offset="-50" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-bold font-size-lg color-light-gray">a better experience.</h1>
              </div>
              <div class="cta-container">
                <div class="blurb-container">
                  <img src="@/theme/img/homepage-blurb.svg" class="blurb" />
                </div>
                <div class="button-container">
                  <ion-button expand="block" @click="signup">Sign up</ion-button>
                </div>
              </div>
              <div class="link-container text-center">
                <p class="color-dark-gray font-md">Already have an account? <router-link :to="{ name: 'Dashboard' }" class="color-light-gray link">Login</router-link></p>
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
import { useRouter } from 'vue-router';
import BlueText from '@/components/BlueText.vue';

const router = useRouter();
const signup = () => {
  router.push({ name: "Signup" });
}
</script>

<style scoped>
.content-container {
  flex: 0 0 58%;
  display: flex;
  flex-direction: column;
}

.blue-text-container {
  margin-bottom: 6px;
  text-align: center;
}

.cta-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blurb-container {
  flex: 1;
}

.button-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding-top: 40px; */
}

.headline {
  letter-spacing: 0.015em;
  margin-left: 28px;
  text-indent: -17px;
  margin-bottom: 28px;
}


.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
