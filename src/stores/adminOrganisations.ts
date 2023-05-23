import { defineStore } from "pinia";
import { adminAPI } from "@/axios";
import {
  AdminOrganisation,
  OrgDetails,
  NewOrgDetails,
  SelectItem,
  AdminDocument,
  DecisionTree,
} from "@/types/index";
import { useCookies } from "vue3-cookies";
import { Alert } from "./globalAlert";

const { cookies } = useCookies();

export const Organisations = defineStore("Organisations", {
  state: () => {
    return {
      organisationList: [] as AdminOrganisation[],
      organisationDetails: {} as OrgDetails,
      currentOrg: "" as string,
      formattedOrgSelect: [] as SelectItem[],
      documentTypes: [] as SelectItem[],
      // decisionTree: {} as DecisionTree,
      decisionTree: {
        root: {
          id: "00000000-0000-0000-0000-000000000002",
          text: "How Can I Help You?",
          parentId: null,
          type: 2,
          xPosition: 50,
          yPosition: 350,
          article: null,
          video: null,
          phoneNumber: null,
          emailAddress: null,
          children: [
            {
              id: "00000000-0000-0000-0000-000000000003",
              text: "I'm on a call and I need assistance",
              parentId: "00000000-0000-0000-0000-000000000002",
              type: 3,
              xPosition: 100,
              yPosition: 250,
              article: null,
              video: null,
              phoneNumber: null,
              emailAddress: null,
              children: [
                {
                  id: "00000000-0000-0000-0000-000000000005",
                  text: "What do you want to do?",
                  parentId: "00000000-0000-0000-0000-000000000003",
                  type: 2,
                  xPosition: 200,
                  yPosition: 100,
                  article: null,
                  video: null,
                  phoneNumber: null,
                  emailAddress: null,
                  children: [],
                  // children: [
                  //   {
                  //     id: "00000000-0000-0000-0000-000000000007",
                  //     text: "Watch a video.",
                  //     parentId: "00000000-0000-0000-0000-000000000005",
                  //     type: 1,
                  //     xPosition: 30,
                  //     yPosition: 10,
                  //     article: null,
                  //     video: {
                  //       id: "00000000-0000-0000-0000-000000000001",
                  //       title: "Video 1",
                  //       url: "https://vimeo.com/105776929",
                  //       vimeoData: {
                  //         total: 0,
                  //         data: [],
                  //       },
                  //     },
                  //     phoneNumber: null,
                  //     emailAddress: null,
                  //     children: [],
                  //   },
                  //   {
                  //     id: "00000000-0000-0000-0000-000000000010",
                  //     text: "Email for help.",
                  //     parentId: "00000000-0000-0000-0000-000000000005",
                  //     type: 4,
                  //     xPosition: 40,
                  //     yPosition: -10,
                  //     article: null,
                  //     video: null,
                  //     phoneNumber: null,
                  //     emailAddress: "alex@mythdigital.co",
                  //     children: [],
                  //   },
                  // ],
                },
              ],
            },
            {
              id: "00000000-0000-0000-0000-000000000004",
              text: "I haven't joined a call yet, but need assistance.",
              parentId: "00000000-0000-0000-0000-000000000002",
              type: 3,
              xPosition: 100,
              yPosition: 450,
              article: null,
              video: null,
              phoneNumber: null,
              emailAddress: null,
              children: [
                {
                  id: "00000000-0000-0000-0000-000000000006",
                  text: "What do you want to do?",
                  parentId: "00000000-0000-0000-0000-000000000004",
                  type: 2,
                  xPosition: 200,
                  yPosition: 600,
                  article: null,
                  video: null,
                  phoneNumber: null,
                  emailAddress: null,
                  children: [],
                  // children: [
                  //   {
                  //     id: "00000000-0000-0000-0000-000000000008",
                  //     text: "Read an article.",
                  //     parentId: "00000000-0000-0000-0000-000000000006",
                  //     type: 0,
                  //     xPosition: 30,
                  //     yPosition: -10,
                  //     article: {
                  //       id: "00000000-0000-0000-0000-000000000001",
                  //       title: "Article 1",
                  //       richText: "<html><body><b>Article</b></body></html>",
                  //     },
                  //     video: null,
                  //     phoneNumber: null,
                  //     emailAddress: null,
                  //     children: [],
                  //   },
                  //   {
                  //     id: "00000000-0000-0000-0000-000000000011",
                  //     text: "Phone for help.",
                  //     parentId: "00000000-0000-0000-0000-000000000006",
                  //     type: 5,
                  //     xPosition: 50,
                  //     yPosition: -10,
                  //     article: null,
                  //     video: null,
                  //     phoneNumber: "000123123",
                  //     emailAddress: null,
                  //     children: [],
                  //   },
                  // ],
                },
              ],
            },
          ],
        },
        name: "Deicsion Tree with Root",
        id: "00000000-0000-0000-0000-000000000001",
        loaded: true,
      } as DecisionTree,
    };
  },
  actions: {
    setId(newId: string) {
      this.currentOrg = newId;
      return true;
    },
    async getOrganisations() {
      adminAPI
        .get<AdminOrganisation[]>("/Organisation/")
        .then((response) => {
          this.organisationList = response.data;
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async getOrgDetails() {
      adminAPI
        .get<OrgDetails>("/Organisation/" + cookies.get("orgId") + "/Details")
        .then((response) => {
          this.organisationDetails = response.data;
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async updateOrgDetails(languageIndex: number) {
      const editedOrg = this.organisationDetails;
      console.log(this.organisationDetails);
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
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async removeOrganisation() {
      adminAPI
        .delete("/Organisation/" + cookies.get("orgId"))
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async getOrgsSelectItem() {
      adminAPI
        .get<AdminOrganisation[]>("/Organisation")
        .then((response) => {
          const formnatedList: SelectItem[] = [];
          response.data.forEach((element, index) => {
            formnatedList.push({
              id: index,
              title: element.name,
              aditionalInfo: element.id,
            });
          });
          this.formattedOrgSelect = formnatedList;
        })
        .catch((error) => {
          this.formattedOrgSelect = [];
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async getOrgDocumentTypes() {
      adminAPI
        .get<AdminDocument[]>(
          "/Organisation/" + cookies.get("orgId") + "/DocumentTypes"
        )
        .then((response) => {
          const formnatedList: SelectItem[] = [];
          response.data.forEach((element, index) => {
            formnatedList.push({
              id: index,
              title: element.name,
              aditionalInfo: element.id,
            });
          });
          this.documentTypes = formnatedList;
          console.log(this.documentTypes);
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async getDecisionDetails(decisionTreeId: string) {
      adminAPI
        .get<DecisionTree>(`/DecisionTree/${decisionTreeId}`)
        .then((response) => {
          this.decisionTree = response.data;
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
    async getDecisionTrees() {
      adminAPI
        .get<DecisionTree>(`/DecisionTree`)
        .then((response) => {
          // this.decisionTree = response.data;
        })
        .catch((error) => {
          const alert = Alert();
          alert.open(error.message);
        });
    },
  },
  getters: {
    getList: (state) => state.organisationList,
    getId: (state) => state.currentOrg,
    getDecisionTree: (state) => state.decisionTree,
  },
});
