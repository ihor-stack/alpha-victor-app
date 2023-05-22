<template>
  <ion-item>
    <div class="item-icon" v-if="props.icon">
      <img :src="props.icon" :alt="props.modelValue" />
    </div>
    <ion-input
      color="light"
      :placeholder="props.placeholder"
      :value="currentField"
      @ion-input="currentField = $event.target.value"
      @ion-focus="onInputFocus"
      @keydown.esc="cancelEdit"
    >
    </ion-input>
    <ion-button
      @click="saveField"
      class="color-green"
      slot="end"
      fill="clear"
      size="small"
      v-if="editMode"
    >
      &gt;&gt; save
    </ion-button>
    <ion-button
      @click="removeField"
      class="color-red"
      slot="end"
      fill="clear"
      size="small"
      v-else
    >
      &gt;&gt; remove
    </ion-button>
  </ion-item>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, onBeforeMount, watch } from "vue";

interface Props {
  modelValue: string;
  icon?: string;
  placeholder: string;
  data: any;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "remove"]);

const currentField = ref(props.modelValue);
const editMode = ref(false);
const localData = ref({...props.data});

const onInputFocus = () => {
  editMode.value = true;
};

const cancelEdit = () => {
  currentField.value = props.modelValue;
  editMode.value = false;
};

const saveField = () => {
  localData.value.name = currentField.value; 
  emit("update:modelValue", localData.value); 
  editMode.value = false;
};

const removeField = () => {
  emit("remove", localData.value);
};

onBeforeMount(() => {
  currentField.value = props.modelValue;
});

watch(props.data, (newVal) => {
  localData.value = {...newVal};
});
</script>

<style scoped>
  ion-item {
    border: 1px solid #313131;
    border-radius: 5px;
    margin: 20px 0;
  }
  ion-input {
    background: var(--av-black);
    padding: 0;
    margin: 0;
    border: none;
  }
  ion-button {
    position: absolute;
    z-index: 9999;
    right: 20px;
  }
  .item-icon {
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  .item-icon img {
    width: 20px;
    height: 20px;
  }
</style>
