<template>
  <h1 class="font-bold font-size-lg color-light-gray">LinkedIn</h1>

  <ion-grid class="form-admin">
    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Organisation name</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LinkedIn"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Contact name</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Joe Bloggs"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Phone number</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="07762522515"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Shortcode prefix</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LIN"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Email address</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="joebloggs@email.com"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Language</ion-label>
        <ion-select class="font-size-sm" color="light" aria-label="Fruit" placeholder="Select all fruits that apply" :multiple="true">
          <ion-select-option value="apples">Apples</ion-select-option>
          <ion-select-option value="oranges">Oranges</ion-select-option>
          <ion-select-option value="bananas">Bananas</ion-select-option>
        </ion-select>
      </ion-col>
    </ion-row>

    <ion-row class="form-admin--group">
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Address line 1</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LinkedIn"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Address line 2</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="Joe Bloggs"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">City</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="07762522515"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="6" class="form-admin--group_field">
        <ion-label color="light">Area code</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="LIN"
        ></ion-input>
      </ion-col>
      <ion-col size-xs="12" size-sm="12" class="form-admin--group_field">
        <ion-label color="light">Website / email domain(s)</ion-label>
        <ion-input
          class="font-size-sm"
          color="light"
          placeholder="joebloggs@email.com"
        ></ion-input>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-button>Save changes</ion-button>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
