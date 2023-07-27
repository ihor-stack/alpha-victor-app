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

          if (response.data.assetTypeId) {
            const assetTypeSelected = this.equipmentList.assetTypes.find(assetType => {
              return assetType.assetId === response.data.assetTypeId
            })
            if (assetTypeSelected) {
              this.assetTypeSelected = {
                id: 0,
                title: assetTypeSelected.name,
                additionalInfo: assetTypeSelected.assetId,
              }
            }
          }

          if (response.data.manufacturerId) {
            const manufacturerSelected = this.equipmentList.manufacturers.find(manufacturer => {
              return manufacturer.manufacturerId === response.data.manufacturerId
            })
            if (manufacturerSelected) {
              this.manufacturerSelected = {
                id: 0,
                title: manufacturerSelected.name,
                additionalInfo: manufacturerSelected.manufacturerId
              }
            }
          }
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
        })
        .finally(() => {
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
        })
        .finally(() => {
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
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
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
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
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
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
    async addAssetType(name: string, icon: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post("/Equipment/AssetType", { name, icon })
        .then(() => {
          this.getEquipments();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
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
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
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
        })
        .finally(() => {
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
        })
        .finally(() => {
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
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },
  },
});
