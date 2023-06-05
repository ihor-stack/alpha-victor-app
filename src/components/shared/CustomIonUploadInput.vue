<template>
  <div>
    <ion-input :disabled="disabled" class="custom-ion-input">
      <div class="input">
        <label for="file-upload">
          <img src="@/theme/icons/upload-blue.svg" class="file-upload--icon" />
          <span>{{ buttonText }}</span>
        </label>
        <input
          id="file-upload"
          type="file"
          @change="handleFileUpload"
        />
      </div>
    </ion-input>
    <div v-if="uploadedImage" class="uploaded-image">
      <img :src="uploadedImage" :alt="imageName" />
    </div>
  </div>
</template>

<script lang="ts">
import { IonInput } from "@ionic/vue";
import { defineComponent, ref, PropType } from "vue";

export default defineComponent({
  name: "CustomIonUploadInput",
  components: {
    IonInput,
  },
  props: {
    disabled: {
      type: Boolean
    },
    buttonText: {
      type: String,
      default: "Select file",
    }
  },
  setup(props, { emit }) {
    const uploadedImage = ref<string | null>(null);
    const imageName = ref<string | null>(null);

    function handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadedImage.value = URL.createObjectURL(file);
        imageName.value = file.name;
        emit('file-selected', file); // Emitting event to parent
      }
    }

    return {
      uploadedImage,
      imageName,
      handleFileUpload,
    };
  },
});
</script>

<style scoped>

.custom-ion-input {
  border: none;
  padding: 0;
}
/* Remove default styling for input elements */
ion-input {
  --background: transparent;
  --padding-start: 0;
  --padding-end: 0;
  --border-width: 0;
  --placeholder-color: inherit;
  --placeholder-opacity: 1;
  --color: inherit;
}

/* Customize file upload input button */
ion-input input[type="file"] {
  /* Hide the default button */
  display: none;
}

/* Style the custom button */
ion-input label[for="file-upload"] {
  display: flex !important;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--av-darkest-gray);
  color: var(--av-light-gray);
  cursor: pointer;
  width: 100%;
  display: block;
}

/* Optional: Style the custom button when hovering */
ion-input label[for="file-upload"]:hover {
  background-color: var(--av-black);
}

.input {
  width: 100%;
  border: 1px solid #313131;
  border-radius: 5px;
  overflow: hidden;
}

.file-upload--icon {
  margin-right: 20px;
}

.uploaded-image {
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
  width: 160px;
  height: 160px;
}

.uploaded-image img {
  width: 200px;
  height: auto;
}
</style>
