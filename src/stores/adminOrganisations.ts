import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { publicAPI } from "@/axios";
import {
  AdminOrganisation,
  OrgDetails,
  NewOrgDetails,
  SelectItem,
  AdminDocument,
  DecisionTree,
} from "@/types/index";

import { useCookies } from "vue3-cookies";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

const { cookies } = useCookies();

export const Organisations = defineStore("Organisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      organisationDetails: {} as OrgDetails,
      currentOrg: "" as string,
      formattedOrgSelect: [] as SelectItem[],
      documentTypes: [] as SelectItem[],
      decisionTree: {} as DecisionTree,
    };
  },
  actions: {
    setId(newId: string) {
      this.currentOrg = newId;
      return true;
    },
    async getOrganisations() {
      loadingService.show("Loading...");
      publicAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          this.organisationList = response.data;
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
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
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
    async removeOrganisation() {
      adminAPI
        .delete("/Organisation/" + cookies.get("orgId"))
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
              aditionalInfo: element.id,
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
              aditionalInfo: element.id,
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
      adminAPI
        .get<DecisionTree>(`/DecisionTree/${decisionTreeId}`)
        .then((response) => {
          this.decisionTree = { ...response.data, loaded: true };
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
    async getDecisionTrees() {
      adminAPI
        .get<DecisionTree>(`/DecisionTree`)
        .then((response) => {
          // this.decisionTree = response.data;
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
