<template>
  <div>
    <ion-input :disabled="disabled" class="custom-ion-input">
      <div class="input">
        <label :for="uniqueId">
          <img src="@/theme/icons/upload-blue.svg" class="file-upload--icon" />
          <span>{{ buttonText }}</span>
        </label>
        <input
          :id="uniqueId"
          type="file"
          :accept="accept"
          @change="handleFileUpload"
        />
      </div>
    </ion-input>
    <div v-if="uploadedImage && imageName && imageName.endsWith('.pdf')" class="preview-pdf">
      <img src="@/theme/icons/upload-blue.svg" :alt="imageName" />
      <span>{{ imageName }}</span>
    </div>
    <div v-else-if="uploadedImage" class="preview-image">
      <img :src="uploadedImage" :alt="imageName" />
    </div>
    <div v-if="selectedImage" class="preview-image">
      <img :src="selectedImage" />
      <div class="remove" @click="removeImage"><span>x</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonInput } from "@ionic/vue"
import { defineComponent, ref } from "vue"

let idCounter = 0;

export default defineComponent({
  name: "CustomIonUploadInput",
  components: {
    IonInput,
  },
  props: {
    disabled: {
      type: Boolean
    },
    accept: {
      type: String
    },
    selectedImage: {
      type: String
    },
    buttonText: {
      type: String,
      default: "Select file",
    }
  },
  setup(props, { emit }) {
    const uploadedImage = ref<string | null>(null);
    const imageName = ref<string | null>(null);
    const uniqueId = 'file-upload-' + idCounter++;

    function handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.type === 'application/pdf') {
          uploadedImage.value = '/path/to/pdf-icon.png'; // Use the path to your PDF icon image
          imageName.value = file.name;
          emit('file-selected', file); // Emitting event to parent
        } else {
          uploadedImage.value = URL.createObjectURL(file);
          imageName.value = file.name;
          emit('file-selected', file); // Emitting event to parent
        }
      }
    }

    function removeImage() {
      emit('remove');
    }

    return {
      uploadedImage,
      imageName,
      handleFileUpload,
      uniqueId,
      removeImage
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
ion-input label {
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
ion-input label:hover {
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

.preview-image {
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
  width: 160px;
  height: 140px;
  position: relative;
}

.preview-image img {
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.preview-image .remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background: var(--av-red);
  width: 20px;
  height: 20px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.preview-image .remove:hover {
  opacity: .5;
}
.preview-pdf {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
}

.preview-pdf img {
  width: 18px;
  height: 18px;
}

.preview-pdf span {
  margin-left: 10px;
  font-size: 14px;
}
</style>
