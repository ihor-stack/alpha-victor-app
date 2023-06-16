import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  EquipmentList,
  NewEquipment,
  EquipmentDetails,
  NewDocument,
} from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const Equipment = defineStore("Equipment", {
  state: () => {
    return {
      equipmentList: {
        manufacturers: [],
        assetTypes: [],
        equipments: [],
      } as EquipmentList,
      currentEquipment: {} as EquipmentDetails,
    };
  },
  actions: {
    async getEquipments() {
      loadingService.show("Loading...");
      return adminAPI
        .get<EquipmentList>(`/Equipment`)
        .then((response) => {
          this.equipmentList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async getEquipmentDetails(id: string) {
      loadingService.show("Loading...");
      adminAPI
        .get<EquipmentDetails>(`/Equipment/${id}`)
        .then((response) => {
          this.currentEquipment = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },
    async addEquipment(equipment: NewEquipment) {
      loadingService.show("Loading...");
      adminAPI
        .post("/Equipment", equipment)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async updateEquipment(id: string, equipment: NewEquipment) {
      loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/${id}`, equipment)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async addManufacturer(name: string) {
      loadingService.show("Loading...");
      adminAPI
        .post("/Equipment/Manufacturer/", { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async updateManufacturer(manufacturerId: string, name: string) {
      loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/Manufacturer?manufacturerId=${manufacturerId}`, {
          name,
        })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async removeManufacturer(id: string) {
      loadingService.show("Loading...");
      adminAPI
        .delete(`/Equipment/Manufacturer/${id}`)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async addAssetType(name: string) {
      loadingService.show("Loading...");
      adminAPI
        .post("/Equipment/AssetType", { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async updateAssetType(assetTypeId: string, name: string) {
      loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/AssetType?assetTypeId=${assetTypeId}`, { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async removeAssetType(id: string) {
      loadingService.show("Loading...");
      adminAPI
        .delete(`/Equipment/AssetType/${id}`)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async addEquipmentDocument(newDocument: NewDocument, equipmentId: string) {
      loadingService.show("Loading...");
      return adminAPI
        .post(`/Document/Equipment/${equipmentId}`, newDocument)
        .then(() => this.getEquipmentDetails(equipmentId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
    async deleteEquipmentDocument(documentId: string, equipmentId: string) {
      loadingService.show("Loading...");
      adminAPI
        .delete(`/Document/Equipment/${documentId}?equipmentId=${equipmentId}`)
        .then(() => this.getEquipmentDetails(equipmentId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close();
        });
    },
  },
});
