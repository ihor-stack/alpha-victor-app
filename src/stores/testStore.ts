import { defineStore } from "pinia";

interface State {
  count: number
}

export const useTestStore = defineStore('test', {
  state: (): State => {
    return { count: 0 }
  },
  actions: {
    increment() {
      this.count++
    }
  }
});
