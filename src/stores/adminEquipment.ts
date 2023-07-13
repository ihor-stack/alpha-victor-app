import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  EquipmentList,
  NewEquipment,
  SelectItem,
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
      manufacturerSelected: {} as SelectItem,
      assetTypeSelected: {} as SelectItem,
      equipmentDropdownList: [] as { id: string; name: string }[],
    };
  },
  actions: {
    async getEquipments() {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .get<EquipmentList>(`/Equipment`)
        .then((response) => {
          this.equipmentList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async getEquipmentDropdownList() {
      return adminAPI
        .get<{ id: string; name: string }[]>(`/Equipment/EquipmentDropdown`)
        .then((response) => {
          this.equipmentDropdownList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async getEquipmentDetails(id: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<EquipmentDetails>(`/Equipment/${id}`)
        .then((response) => {
          this.currentEquipment = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async addEquipment(equipment: NewEquipment) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post("/Equipment", equipment)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
    async updateEquipment(id: string, state: any) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/${id}`, {
          name: state.name,
          serialNumber: state.serialNumber,
          manufacturerId: state.manufacturerId,
          assetTypeId: state.assetTypeId,
        })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
    async addManufacturer(name: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post("/Equipment/Manufacturer/", { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
          console.log(error);
          loadingService.close(loadId);
        });
    },
    async updateManufacturer(manufacturerId: string, name: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/Manufacturer?manufacturerId=${manufacturerId}`, {
          name,
        })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
          loadingService.close(loadId);
        });
    },
    async removeManufacturer(id: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(`/Equipment/Manufacturer/${id}`)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
    async addAssetType(name: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post("/Equipment/AssetType", { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
          loadingService.close(loadId);
        });
    },
    async updateAssetType(assetTypeId: string, name: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/Equipment/AssetType?assetTypeId=${assetTypeId}`, { name })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
          loadingService.close(loadId);
        });
    },
    async removeAssetType(id: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(`/Equipment/AssetType/${id}`)
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
    async addEquipmentDocument(newDocument: NewDocument, equipmentId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .post(`/Document/Equipment/${equipmentId}`, newDocument)
        .then(() => this.getEquipmentDetails(equipmentId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
    async deleteEquipmentDocument(documentId: string, equipmentId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .delete(`/Document/Equipment/${documentId}?equipmentId=${equipmentId}`)
        .then(() => this.getEquipmentDetails(equipmentId))
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
          loadingService.close(loadId);
        });
    },
  },
});
