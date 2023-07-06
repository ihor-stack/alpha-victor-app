<template>
  <ion-page>
    <ion-content>
      <div class="outer-container onboarding">
        <div class="gradient-container">
          <div class="inner-container">
            <div class="content-container">
              <div class="blue-text-container">
                <dot-text text="time.for.a.change" offset="-45" />
              </div>
              <div class="headline-container">
                <h1 class="headline font-size-xl color-light-gray font-bold">
                  Sign up for<br />
                  alpha victor.
                </h1>
              </div>
              <div class="form-container">
                <ion-input
                  class="custom-input"
                  type="text"
                  placeholder="First name"
                  v-model="state.firstName"
                />
                <ion-input
                  class="custom-input"
                  type="text"
                  placeholder="Last name"
                  v-model="state.lastName"
                />
                <ion-input
                  class="custom-input"
                  type="email"
                  placeholder="Email"
                  v-model="state.email"
                />
                <ion-input
                  class="custom-input"
                  type="tel"
                  placeholder="Phone number"
                  v-model="state.phoneNumber"
                />
                <ion-input
                  class="custom-input"
                  type="password"
                  placeholder="Password"
                  v-model="state.password"
                />
                <ion-input
                  class="custom-input"
                  type="password"
                  placeholder="Confirm Password"
                  v-model="state.confirmPassword"
                />
              </div>
              <ion-footer>
                <ion-button expand="block" @click="signup">Sign up</ion-button>

                <div class="link-container text-center">
                  <p class="color-mid-gray font-md">
                    Already have an account?
                    <span @click="signIn" class="color-light-gray link"
                      >Login</span
                    >
                  </p>
                </div>
              </ion-footer>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import {
  IonContent,
  IonFooter,
  IonPage,
  IonButton,
  IonInput,
} from "@ionic/vue";
import { useRouter } from "vue-router";

import DotText from "@/components/shared/DotText.vue";
import Auth from "@/auth";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { IUserData } from "@/types";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

const signup = () => {
  console.log(state);
  const userData: IUserData = {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    phoneNumber: state.phoneNumber,
    password: state.password,
  };
  accountStore
    .registerUser(userData)
    .then((res) => {
      if (res.statusText === "OK") {
        router.replace({ name: "AllowAccess" });
      }
    })
    .catch((error) => {
      console.log("----error", error);
    });
};

const signIn = async () => {
  // Sign in logic here
  const authRes = await authService.authenticate(false);

  if (authRes) {
    return router.replace({ name: "Dashboard" });
  } else {
    return router.replace({ name: "Home" });
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

.headline {
  letter-spacing: 0.015em;
  margin-left: 29px;
  text-indent: -19px;
  margin-bottom: 12px;
}

.form-container {
  flex: 1;
}

ion-footer {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.link-container {
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
