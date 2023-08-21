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
                  name="firstname"
                  placeholder="First name"
                  v-model="state.firstName"
                />
                <ion-input
                  class="custom-input"
                  type="text"
                  name="surname"
                  placeholder="Last name"
                  v-model="state.lastName"
                />
                <ion-input
                  class="custom-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  v-model="state.email"
                />
                <ion-input
                  class="custom-input"
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  v-model="state.phoneNumber"
                />
                <div class="password-container">
                  <ion-input
                    class="custom-input"
                    :type="state.isPasswordVisible ? 'text' : 'password'"
                    placeholder="Password"
                    v-model="state.password"
                  />
                  <ion-icon
                    :icon="state.isPasswordVisible ? eyeOff : eye"
                    size="small"
                    color="dark"
                    @click="state.isPasswordVisible = !state.isPasswordVisible"
                  ></ion-icon>
                </div>
                <ion-input
                  class="custom-input"
                  :type="state.isPasswordVisible ? 'text' : 'password'"
                  placeholder="Confirm Password"
                  v-model="state.confirmPassword"
                />
              </div>
              <ion-footer>
                <ion-button expand="block" @click="signup">Sign up</ion-button>

                <div class="link-container text-center">
                  <p class="color-mid-gray font-sm">
                    Already have an account?
                    <span @click="signInEmail" class="color-light-gray link"
                      >Send me a login link</span
                    >
                    <br /><br />
                    <span @click="signIn" class="color-light-gray link"
                      >Login with email</span
                    >
                  </p>
                </div>
              </ion-footer>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <div id="keyboard-area"></div>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { IonIcon, isPlatform } from "@ionic/vue";
import { eye, eyeOff } from "ionicons/icons";

import {
  IonContent,
  IonFooter,
  IonPage,
  IonButton,
  IonInput,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { Plugins } from "@capacitor/core";
const { Keyboard } = Plugins;

import DotText from "@/components/shared/DotText.vue";
import Auth from "@/auth";
import { Account as useAccountStore } from "@/stores/publicAccount";
import { IUserData } from "@/types";
import toastService from "@/services/toastService";

const router = useRouter();
const authService = new Auth();
const accountStore = useAccountStore();

const showResizeMode = isPlatform("ios") || isPlatform("android");

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  isPasswordVisible: false,
});

const signup = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberPattern = /^[0-9-]*$/;

  let isValid = true;

  // Validate the email
  if (!emailPattern.test(state.email)) {
    toastService.show(
      "Error",
      "Please enter a valid email address",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the phone number
  if (!phoneNumberPattern.test(state.phoneNumber)) {
    toastService.show(
      "Error",
      "Please enter a valid phone number",
      "error",
      "bottom"
    );
    isValid = false;
  }

  // Validate the phone number
  if (state.password !== state.confirmPassword) {
    toastService.show(
      "Error",
      "The passwords you entered don't match, please check and try again.",
      "error",
      "bottom"
    );
    isValid = false;
  }

  if (isValid) {
    // If all validations pass, then save the changes
    const userData: IUserData = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      password: state.password,
    };
    accountStore.registerUser(userData);
  }
};

const signInEmail = async () => {
  return router.replace({ name: "SendEmailLoginLink" });
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

onMounted(() => {
  if (showResizeMode && Keyboard) {
    Keyboard.setResizeMode({ mode: "ionic" });
    // StatusBar.setStyle({ style: "Light" });
    Keyboard.addListener("keyboardWillShow", (info: any) => {
      const keyboardHeight = info.keyboardHeight;
      let activeElem = document.activeElement as HTMLElement;
      if (activeElem === null) activeElem = document.createElement("input");
      const activeRect = activeElem.getBoundingClientRect();
      let keyboard = document.getElementById("keyboard-area");
      if (keyboard === null) keyboard = document.createElement("div");
      let offset = 0;
      if (keyboard.style.display === "block")
        offset =
          window.innerHeight -
          activeRect.y -
          activeRect.height -
          keyboardHeight;
      else offset = window.innerHeight - activeRect.y - activeRect.height;
      if (offset < keyboardHeight) {
        keyboard.style.height = keyboardHeight + "px";
        keyboard.style.display = "block";
      } else {
        keyboard.style.height = "0px";
        keyboard.style.display = "none";
      }
    });

    Keyboard.addListener("keyboardWillHide", () => {
      let keyboard = document.getElementById("keyboard-area");
      if (keyboard === null) keyboard = document.createElement("div");
      keyboard.style.height = "0px";
      keyboard.style.display = "none";
    });
  }
});
</script>

<style scoped>
.content-container {
  flex: 0 0 72%;
  display: flex;
  flex-direction: column;
}

.inner-container {
  height: unset;
  min-height: 100%;
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

.custom-input {
  background: #181818;
}

ion-footer {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

ion-footer ion-button {
  margin-bottom: 20px;
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
  opacity: 0.5;
}

.password-container {
  position: relative;
}

ion-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 99;
}

#keyboard-area {
  display: none;
}

/* Desktop styling */
@media only screen and (min-width: 1023px) {
  .content-container {
    width: 500px;
    margin: auto;
  }
}
</style>
