import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { publicAPI } from "@/axios";
import router from "@/router";

import {
  AdminOrganisation,
  OrgDetails,
  NewOrgDetails,
  SelectItem,
  AdminDocument,
  DecisionTree,
  DecisionTreeList,
  Article,
  Video,
  EquipmentList,
} from "@/types/index";

import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";
import confirmToLeaveService from "@/services/confirmToLeaveService";

export const Organisations = defineStore("Organisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      newOrganisationDetails: {} as NewOrgDetails,
      organisationDetails: {} as OrgDetails,
      currentOrg: "" as string,
      formattedOrgSelect: [] as SelectItem[],
      documentTypes: [] as SelectItem[],
      documents: [] as AdminDocument[],
      decisionTree: {} as DecisionTree,
      decisionTreeList: [] as SelectItem[],
      decisionTreeSelected: {} as SelectItem,
      equipmentList: {
        manufacturers: [],
        assetTypes: [],
        equipments: [],
      } as EquipmentList,
    };
  },
  actions: {
    setId(newId: string) {
      this.currentOrg = newId;
      return true;
    },

    async saveOrganisation() {
      const newOrg = this.newOrganisationDetails;
      const loadId = loadingService.show("Loading...");

      adminAPI
        .post("/Organisation/Details", {
          name: newOrg.name,
          prefix: newOrg.prefix,
        })
        .then(() => {
          toastService.show(
            "Success",
            "New organisation added",
            "success",
            "bottom"
          );
          this.getOrganisations();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getOrganisations() {
      const loadId = loadingService.show("Loading...");
      publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          if (response.data) {
            if (Array.isArray(response.data)) {
              response.data.sort((a, b) => a.name.localeCompare(b.name));
            }
            this.organisationList = response.data;
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getOrgDetails(id: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<OrgDetails>(`/Organisation/${id}/Details`)
        .then((response) => {
          this.organisationDetails = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateOrgDetails(organisationId: string) {
      const editedOrg = this.organisationDetails;
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch<OrgDetails>(`/Organisation/${organisationId}/Details`, {
          name: editedOrg.name,
          prefix: editedOrg.prefix,
          contactName: editedOrg.contactName,
          email: editedOrg.email,
          phone: editedOrg.phone,
          addressLine0: editedOrg.addressLine0,
          addressLine1: editedOrg.addressLine1,
          city: editedOrg.city,
          postcode: editedOrg.postCode,
          anonymousAccess: editedOrg.anonymousAccess,
          website: editedOrg.website,
          languages: editedOrg.selectedLanguages,
        })
        .then(() => {
          toastService.show(
            "Success",
            "Organisation details saved",
            "success",
            "bottom"
          );
          confirmToLeaveService.setEditing(false);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async deleteOrganisation(organisationId: string) {
      adminAPI
        .delete(`/Organisation/${organisationId}`)
        .then(() => {
          toastService.show(
            "Success",
            "Organisation deleted successfully",
            "success",
            "bottom"
          );
          router.push("/admin/organisations");
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getOrgsSelectItem() {
      adminAPI
        .get<AdminOrganisation[]>("/Organisation")
        .then((response) => {
          const formattedList: SelectItem[] = [];
          response.data.forEach((element, index) => {
            formattedList.push({
              id: index,
              title: element.name,
              additionalInfo: element.id,
            });
          });
          this.formattedOrgSelect = formattedList;
        })
        .catch((error) => {
          this.formattedOrgSelect = [];
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getOrgDocumentTypes(organisationId: string) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<AdminDocument[]>(`/Organisation/${organisationId}/DocumentTypes`)
        .then((response) => {
          if (response.data) {
            if (Array.isArray(response.data)) {
              response.data.sort((a, b) => a.name.localeCompare(b.name));
            }
            this.documents = [...response.data];
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async saveNewOrgDocumentType(organisationId: string, documentName: string) {
      adminAPI
        .post<AdminDocument>(`/Organisation/${organisationId}/DocumentType`, {
          name: documentName,
        })
        .then(() => {
          toastService.show(
            "Success",
            "Document type added",
            "success",
            "bottom"
          );
          this.getOrgDocumentTypes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async editOrgDocumentType(organisationId: string, document: AdminDocument) {
      adminAPI
        .patch(`/Organisation/${organisationId}/DocumentType/${document.id}`, {
          name: document.name,
        })
        .then(() => {
          this.getOrgDocumentTypes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async removeOrgDocumentType(organisationId: string, id: string) {
      adminAPI
        .delete(`/Organisation/${organisationId}/DocumentType/${id}`)
        .then(() => {
          this.getOrgDocumentTypes(organisationId);
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },

    async getDecisionDetails(decisionTreeId: string) {
      const loadId = loadingService.show("Loading...");
      return adminAPI
        .get<DecisionTree>(`/DecisionTree/${decisionTreeId}`)
        .then((response) => {
          this.decisionTree = { ...response.data, loaded: true };
          return response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateDecisionDetails(decisionTreeId: string, treeData: any) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .patch(`/DecisionTree/${decisionTreeId}`, treeData)
        .then((response) => {
          confirmToLeaveService.setEditing(false);
          if (response.data?.value)
            this.decisionTree = { ...response.data.value, loaded: true };
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getDecisionTrees() {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get<DecisionTreeList[]>(`/DecisionTree`)
        .then((response) => {
          const formattedList: SelectItem[] = [];

          response.data.forEach((element, index) => {
            formattedList.push({
              id: index,
              title: element.name,
              additionalInfo: element.id,
            });
          });
          this.decisionTreeList = formattedList;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async createDecisionTree(decisionTree: DecisionTree) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/DecisionTree?organisationId=${this.currentOrg}`, decisionTree)
        .then((res) => {
          if (res.data?.value) {
            this.organisationDetails.decisionTrees = [
              ...this.organisationDetails.decisionTrees,
              res.data.value,
            ];
          }
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async createAarticle(article: Article, callback?: (res: Video) => void) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/article?organisationId=${this.currentOrg}`, article)
        .then((res) => {
          this.getOrgDetails(this.currentOrg);
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getVideo(videoId: string, callback?: (res: Video) => void) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .get(`/Video/${videoId}`)
        .then(async (res) => {
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async createVideo(video: Video, callback?: (res: Video) => void) {
      const loadId = loadingService.show("Loading...");
      adminAPI
        .post(`/video?organisationId=${this.currentOrg}`, video)
        .then((res) => {
          this.getOrgDetails(this.currentOrg);
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async updateVideo(video: Video, callback?: (res: Video) => void) {
      const loadId = loadingService.show("Loading...");
      const request: any = { ...video };
      delete request.id;
      adminAPI
        .patch(`/video/${video.id}`, request)
        .then((res) => {
          this.getOrgDetails(this.currentOrg);
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        })
        .finally(() => {
          loadingService.close(loadId);
        });
    },

    async getEquipments() {
      adminAPI
        .get<EquipmentList>(`/Equipment`)
        .then((response) => {
          this.equipmentList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "bottom");
        });
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrg,
    getDecisionTree: (state) => state.decisionTree,
    currentOrganisationDetails: (state) => state.organisationDetails,
  },
});
