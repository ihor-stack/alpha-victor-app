
import { defineStore } from "pinia";

export const Alert = defineStore('Alert', {
    state: () => {
      return {
        active: false,
        message: ''
      }
    },
    actions: {
      open(message: string) {
        this.active = true
        this.message = message
      },
      close() {
        this.active = false
      },
    },
    getters: {
      getActive: (state) => state.active,
      getMessage: (state) => state.message,
    },
  });