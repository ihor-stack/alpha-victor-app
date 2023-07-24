import { defineStore } from "pinia";

interface State {
  isAuthenticated: boolean;
}

export const auth = defineStore("authStore", {
  state: (): State => {
    return { isAuthenticated: false };
  },
  actions: {
    setAuthStatus(status: boolean) {
      this.isAuthenticated = status;
    },
  },
});
