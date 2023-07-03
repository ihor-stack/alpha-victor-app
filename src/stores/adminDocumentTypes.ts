import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import { AdminDocument } from "@/types/index";
import loadingService from "@/services/loadingService";
import toastService from "@/services/toastService";

export const adminDocuments = defineStore("adminDocuments", {
  state: () => {
    return {
      documents: [] as AdminDocument[],
    };
  },
  actions: {
    async getDocumentTypes() {
      loadingService.show("Loading...");
      adminAPI
        .get<AdminDocument[]>("/Document/DocumentType")
        .then((response) => {
          if (response.data) {
            if (Array.isArray(response.data)) {
              response.data.sort((a, b) => a.name.localeCompare(b.name));
            }
            this.documents = [...response.data];
          }
          loadingService.close();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async saveNewDocumentType(documentName: string) {
      adminAPI
        .post<AdminDocument>("/Document/DocumentType", {
          name: documentName,
        })
        .then(() => {
          toastService.show("Success", "Document type added", "success", "top");
          this.getDocumentTypes();
        })
        .catch((error) => {
          toastService.show("Error", error.response.data, "error", "top");
        });
    },

    async editDocumentType(document: AdminDocument) {
      adminAPI
        .patch(`/Document/DocumentType/${document.id}`, {
          name: document.name,
        })
        .then(() => {
          this.getDocumentTypes();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },

    async removeDocumentType(id: string) {
      adminAPI
        .delete("/Document/DocumentType/" + id)
        .then(() => {
          this.getDocumentTypes();
        })
        .catch((error) => {
          toastService.show("Error", error, "error", "top");
        });
    },
  },
  getters: {
    getDocList: (state) => state.documents,
  },
});
