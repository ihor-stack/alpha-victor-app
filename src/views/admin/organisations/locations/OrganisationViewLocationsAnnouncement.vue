<template>
    <div>
        <h1 class="title-admin font-bold font-size-lg color-light-gray">Announcement</h1>
        <ion-grid class="form-admin">
            <ion-row class="form-admin--group form-admin--group-full">
                <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
                    <ion-label color="light">Title</ion-label>
                    <ion-input
                    class="font-size-sm"
                    color="light"
                    type="text"
                    :value="announcement.title"
                    @ion-input="announcement.title = String($event.target.value)"
                    ></ion-input>
                </ion-col>
                <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">                
                    <ion-label color="light">Content</ion-label>
                    <ion-textarea
                    class="font-size-sm"
                    color="light"
                    type="text"
                    :value="announcement.text"
                    @ion-input="announcement.text = String($event.target.value)"
                    ></ion-textarea>
                </ion-col>
            </ion-row>
            <ion-row class="form-admin--group">
                <ion-col size-xs="12" >
                    <ion-button 
                    class="button-wide"
                    @click="submitAnnouncement()">
                        Save announcement
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
</template>

<script setup lang="ts">
    import {
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonLabel,
        IonItem
    } from "@ionic/vue";
    import { storeToRefs } from "pinia";
    import {Spaces} from '@/stores/adminSpaces'
    import { useRoute } from "vue-router";
    import { onBeforeMount, ref } from "vue"
   
    const route = useRoute();

    const Space = Spaces()
    const { announcement } = storeToRefs(Space);
    const spaceId = route.params.spaceId as string;

    const submitAnnouncement = () => {
        Space.editSpacesAnnouncement(spaceId)
    }

    onBeforeMount(() => {
        Space.getSpaceDetailsAnnouncement(spaceId)
    })
</script>