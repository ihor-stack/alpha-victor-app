import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { publicAPI } from "@/axios";
import router from '@/router';

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

import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

export const Organisations = defineStore("Organisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      newOrganisationDetails: {} as NewOrgDetails,
      organisationDetails: {} as OrgDetails,
      currentOrg: "" as string,
      formattedOrgSelect: [] as SelectItem[],
      documentTypes: [] as SelectItem[],
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
      cookies.set("orgId", newId);
      return true;
    },

    async saveOrganisation() {
      const newOrg = this.newOrganisationDetails;
      loadingService.show("Loading...");
      adminAPI
        .post("/Organisation/Details", {
          name: newOrg.name
        }
      )
      .then(() => {
        loadingService.close();
        toastService.show(
          "Success",
          "New organisation added",
          "success",
          "top"
        );
        this.getOrganisations()
      })
      .catch((error) => {
        toastService.show("Error", error, "error", "top");
      });
    },

    async getOrganisations() {
      loadingService.show("Loading...");
      publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          if (response.data) {
            if (Array.isArray(response.data)) {
                response.data.sort((a, b) => a.name.localeCompare(b.name));
            }
            this.organisationList = response.data;
          }
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getOrgDetails(id = cookies.get("orgId")) {
      loadingService.show("Loading...");
      adminAPI
        .get<OrgDetails>(`/Organisation/${id}/Details`)
        .then((response) => {
          this.organisationDetails = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async updateOrgDetails(languageIndex: number) {
      const editedOrg = this.organisationDetails;
      loadingService.show("Loading...");
      adminAPI
        .patch<OrgDetails>(
          "/Organisation/" + cookies.get("orgId") + "/Details",
          {
            name: editedOrg.name,
            prefix: editedOrg.prefix,
            contactName: editedOrg.contactName,
            email: editedOrg.email,
            phone: editedOrg.phone,
            addressLines: editedOrg.addressLines,
            city: editedOrg.city,
            postcode: editedOrg.postCode,
            website: editedOrg.website,
            language: languageIndex,
          }
        )
        .then(() => {
          loadingService.close();
          toastService.show(
            "Success",
            "Organisation details saved",
            "success",
            "top"
          );
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async deleteOrganisation() {
      adminAPI
        .delete("/Organisation/" + cookies.get("orgId"))
        .then(() => {
          toastService.show(
            "Success",
            "Organisation deleted successfully",
            "success",
            "top"
          );
          router.push('/admin/organisations');
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
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
          toastService.show("Error", error, "error", "top");
        });
    },

    async getOrgDocumentTypes() {
      loadingService.show("Loading...");
      adminAPI
        .get<AdminDocument[]>(
          "/Organisation/" + cookies.get("orgId") + "/DocumentTypes"
        )
        .then((response) => {
          const formattedList: SelectItem[] = [];
          response.data.forEach((element, index) => {
            formattedList.push({
              id: index,
              title: element.name,
              additionalInfo: element.id,
            });
          });
          this.documentTypes = formattedList;
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async getDecisionDetails(decisionTreeId: string) {
      loadingService.show("Loading...");
      adminAPI
        .get<DecisionTree>(`/DecisionTree/${decisionTreeId}`)
        .then((response) => {
          this.decisionTree = { ...response.data, loaded: true };
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async updateDecisionDetails(decisionTreeId: string, treeData: any) {
      loadingService.show("Loading...");
      adminAPI
        .patch(`/DecisionTree/${decisionTreeId}`, treeData)
        .then((response) => {
          if (response.data?.value)
            this.decisionTree = { ...response.data.value, loaded: true };
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getDecisionTrees() {
      loadingService.show("Loading...");
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
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async createDecisionTree(decisionTree: DecisionTree) {
      loadingService.show("Loading...");
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
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async createAarticle(article: Article, callback?: (res: Video) => void) {
      loadingService.show("Loading...");
      adminAPI
        .post(`/article?organisationId=${this.currentOrg}`, article)
        .then((res) => {
          this.getOrgDetails();
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async createVideo(video: Video, callback?: (res: Video) => void) {
      loadingService.show("Loading...");
      adminAPI
        .post(`/video?organisationId=${this.currentOrg}`, video)
        .then((res) => {
          this.getOrgDetails();
          callback ? callback(res.data) : null;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        })
        .finally(() => {
          loadingService.close();
        });
    },

    async getEquipments() {
      adminAPI
        .get<EquipmentList>(`/Equipment`)
        .then((response) => {
          this.equipmentList = response.data;
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
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
