<template>
  <ion-select
    interface="action-sheet"
    :placeholder="$t('pages.accountSettings.language.placeholder')"
    class="custom-select"
    :value="state.language"
    @ion-change="handleChange"
  >
    <ion-select-option
      v-for="language in languageOptions"
      :key="language.value"
      :value="language.value"
    >
      {{ $t(language.label) }}</ion-select-option
    >
  </ion-select>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { storeToRefs } from "pinia";

import { Organisations as useOrganisationStore } from "@/stores/publicOrganisations";

const languagesList = [
  {
    value: 0,
    label: "pages.accountSettings.language.english",
  },
  {
    value: 1,
    label: "pages.accountSettings.language.welsh",
  }
];

const organisationStore = useOrganisationStore();

const { currentOrganisation } = storeToRefs(organisationStore);

interface Props {
  modelValue: number;
  defaultValue: number;
}
const props = defineProps<Props>();

interface State {
  language: number;
}

const state: State = reactive({
  language: props.defaultValue,
});

const emit = defineEmits(["update:modelValue"]);

const languageOptions = computed(() => {
  if (currentOrganisation.value?.selectedLanguages) {
    return currentOrganisation.value.selectedLanguages.map(
      (value) =>
        languagesList.find((lng) => lng.value === value) || {
          value: "",
          label: "",
        }
    );
  }
  return []; // Or return a default value if needed
});

const handleChange = (event: CustomEvent) => {
  state.language = event.detail.value;
  emit("update:modelValue", event.detail.value);
};

// onBeforeMount(() => {});
</script>

<style scoped>
.dot-text {
  font-family: var(--av-font-mono);
  color: var(--av-light-gray);
  font-size: var(--av-font-sm);
  line-height: var(--av-font-sm);
  letter-spacing: 0.015em;
}
</style>
