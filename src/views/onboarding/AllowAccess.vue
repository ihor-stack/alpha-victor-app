<template>
  <ion-page>
    <ion-content>
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <div class="blue-text-container">
                <dot-text text="allow.access" offset="-83" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-size-xl color-light-gray font-bold">
                  {{ $t('pages.allowAccess.headline1') }}<br />
                  {{ $t('pages.allowAccess.headline2') }}
                </h1>
              </div>
              <div class="allow-access-container">
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/location.svg"
                    :alt="$t('pages.allowAccess.location.alt')" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">
                      {{ $t('pages.allowAccess.location.title') }}
                    </h4>
                    <p class="color-mid-gray font-size-xs">
                      {{ $t('pages.allowAccess.location.description') }}
                    </p>
                  </div>
                </div>
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/bluetooth.svg"
                    :alt="$t('pages.allowAccess.bluetooth.alt')" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">
                      {{ $t('pages.allowAccess.bluetooth.title') }}
                    </h4>
                    <p class="color-mid-gray font-size-xs">
                      {{ $t('pages.allowAccess.bluetooth.description') }}
                    </p>
                  </div>
                </div>
                <div class="allow-access-item">
                  <img class="allow-access-icon" src="@/theme/icons/notifications.svg"
                    :alt="$t('pages.allowAccess.bluetooth.title')" />
                  <div class="allow-access-info">
                    <h4 class="font-mono font-size-normal color-light-gray">
                      {{ $t('pages.allowAccess.bluetooth.title') }}
                    </h4>
                    <p class="color-mid-gray font-size-xs">
                      {{ $t('pages.allowAccess.bluetooth.description') }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="button-container">
                <ion-button @click="setOpen" expand="block">{{ $t('pages.allowAccess.btn') }}</ion-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ion-modal :is-open="state.modalOpen" :initial-breakpoint="0.75" :breakpoints="[0, 0.3, 0.75]"
        @willDismiss="handleDismiss">
        <!-- Modal content to be conditionally shown here based on which permissions are still to be provided; this is just an example -->
        <onboarding-access-panel :dotText="`${permissions[state.currentPermission]}.access`" :ctaFunc="requestPermission"
          :signIn="signIn">
          <template v-slot:image>
            <img src="@/theme/img/onboarding-access-location.svg" />
          </template>
          <template v-slot:heading>
            {{ $t('pages.allowAccess.modal.enable') }}<br />
            {{ permissions[state.currentPermission] }}.
          </template>
          <template v-slot:info-text>
            {{ $t('pages.allowAccess.modal.text1') }}{{ permissions[state.currentPermission] }}{{
              $t('pages.allowAccess.modal.text2') }}
          </template>
        </onboarding-access-panel>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonButton, IonModal } from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Diagnostic } from "@awesome-cordova-plugins/diagnostic";
import DotText from "@/components/shared/DotText.vue";
import OnboardingAccessPanel from "@/components/onboarding/OnboardingAccessPanel.vue";
import Auth from "@/auth";

const permissions = ["location", "bluetooth", "notification"];
const router = useRouter();
const authService = new Auth();

const state = reactive({
  modalOpen: false,
  currentPermission: 0,
});

const signIn = async () => {
  // Sign in logic here
  const authRes = await authService.authenticate(false);

  if (authRes) {
    return router.replace({ name: "Dashboard" });
  } else {
    return router.replace({ name: "Home" });
  }
};

const setOpen = () => {
  state.modalOpen = !state.modalOpen;
};
const handleDismiss = () => {
  state.modalOpen = false;
};

const requestPermission = async () => {
  try {
    if (state.currentPermission === 0) {
      await Diagnostic.requestLocationAuthorization();
    } else if (state.currentPermission === 1) {
      await Diagnostic.requestBluetoothAuthorization();
    } else if (state.currentPermission === 2) {
      await Diagnostic.requestRemoteNotificationsAuthorization();
    }
    state.currentPermission < 2
      ? (state.currentPermission = state.currentPermission + 1)
      : null;
  } catch {
    state.currentPermission < 2
      ? (state.currentPermission = state.currentPermission + 1)
      : null;
  }
};
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
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 0;
  font-size: 13px;
}

.link {
  cursor: pointer;
}

.link:hover {
  opacity: .5;
}

.allow-access-container {
  flex: 1;
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

.button-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>
