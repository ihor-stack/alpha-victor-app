import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/qr/:orgPrefix/:locPrefix/:floorShortName/:spaceShortCode",
    name: "QR",
    component: () => import("@/views/FindByQR.vue"),
  },
  {
    path: "/send-email-login-link",
    name: "SendEmailLoginLink",
    component: () => import("@/views/auth/SendEmailLoginLink.vue"),
  },
  {
    path: "/email-link-login",
    name: "EmailLinkLogin",
    component: () => import("@/views/auth/EmailLinkLogin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/onboarding/SignUp.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/auth/ResetPassword.vue"),
  },
  {
    path: "/allow-access",
    name: "AllowAccess",
    component: () => import("@/views/onboarding/AllowAccess.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/DashboardView.vue"),
  },
  {
    path: "/find-space",
    name: "FindSpace",
    component: () => import("@/views/find-space/FindSpace.vue"),
    children: [
      {
        path: "",
        name: "FindSpaceRoot",
        component: () => import("@/views/find-space/FindSpaceLocation.vue"),
      },
      {
        path: "location",
        name: "FindSpaceLocation",
        component: () => import("@/views/find-space/FindSpaceLocation.vue"),
      },
      {
        path: "location/:locationId/floor",
        name: "FindSpaceFloor",
        component: () => import("@/views/find-space/FindSpaceFloor.vue"),
      },
      {
        path: "floor/:floorId/room",
        name: "FindSpaceRoom",
        component: () => import("@/views/find-space/FindSpaceRoom.vue"),
      },
    ],
  },
  {
    path: "/recently-viewed",
    name: "RecentlyViewed",
    component: () => import("@/views/dashboard/RecentlyViewed.vue"),
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () => import("@/views/dashboard/FavouritesView.vue"),
  },
  {
    path: "/space/:spaceId",
    name: "Space",
    component: () => import("@/views/space/SpaceView.vue"),
  },
  {
    path: "/equipment/:spaceId/documents/:equipmentId",
    name: "EquipmentDocuments",
    component: () => import("@/views/space/DocumentsView.vue"),
  },
  {
    path: "/equipment/:spaceId",
    name: "Equipment",
    component: () => import("@/views/space/EquipmentView.vue"),
  },
  {
    path: "/get-help/:decisionTreeId",
    name: "GetHelp",
    component: () => import("@/views/space/GetHelpView.vue"),
  },
  {
    path: "/feedback/:spaceId",
    name: "Feedback",
    component: () => import("@/views/space/FeedbackView.vue"),
  },
  {
    path: "/article/:id",
    name: "ArticleDetailsView",
    component: () => import("@/views/space/ArticleView.vue"),
  },
  {
    path: "/video/:id",
    name: "VideoDetailsView",
    component: () => import("@/views/space/VideoView.vue"),
  },
  {
    path: "/documents/:spaceId",
    name: "Documents",
    component: () => import("@/views/space/DocumentsView.vue"),
  },
  {
    path: "/document-viewer/:id",
    name: "DocumentViewer",
    component: () => import("@/views/space/DocumentView.vue"),
  },
  {
    path: "/known-issues/:spaceId",
    name: "KnownIssues",
    component: () => import("@/views/space/KnownIssuesView.vue"),
    props: { reportIssueModalOpen: false },
  },
  {
    path: "/report-issue",
    name: "ReportIssue",
    component: () => import("@/views/space/KnownIssuesView.vue"),
    props: { reportIssueModalOpen: true },
  },
  {
    path: "/panorama/:spaceId",
    name: "SpacePanorama",
    component: () => import("@/views/space/PanoramaView.vue"),
  },
  {
    path: "/settings",
    name: "AccountSettings",
    component: () => import("@/views/settings/AccountSettings.vue"),
    children: [
      {
        path: "profile",
        name: "AccountSettingsProfile",
        component: () => import("@/views/settings/AccountSettingsProfile.vue"),
      },
      {
        path: "notifications",
        name: "AccountSettingsNotifications",
        component: () =>
          import("@/views/settings/AccountSettingsNotifications.vue"),
      },
      {
        path: "bluetooth",
        name: "AccountSettingsBluetooth",
        component: () =>
          import("@/views/settings/AccountSettingsBluetooth.vue"),
      },
      {
        path: "bluetooth",
        name: "AccountSettingsBluetooth",
        component: () =>
          import("@/views/settings/AccountSettingsBluetooth.vue"),
      },
      {
        path: "location",
        name: "AccountSettingsLocation",
        component: () => import("@/views/settings/AccountSettingsLocation.vue"),
      },
      {
        path: "password",
        name: "AccountSettingsPassword",
        component: () => import("@/views/settings/AccountSettingsPassword.vue"),
      },
      {
        path: "language",
        name: "AccountSettingsLanguage",
        component: () => import("@/views/settings/AccountSettingsLanguage.vue"),
      },
      {
        path: "delete-account",
        name: "AccountSettingsDeleteAccount",
        component: () =>
          import("@/views/settings/AccountSettingsDeleteAccount.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/static/AboutView.vue"),
  },
  {
    path: "/legal-notices",
    name: "LegalNotices",
    component: () => import("@/views/static/LegalNotices.vue"),
  },
  {
    path: "/terms-and-conditions",
    name: "TermsAndConditions",
    component: () => import("@/views/static/TermsAndConditions.vue"),
  },
  {
    path: "/admin",
    name: "LayoutRouter",
    component: () => import("@/layouts/LayoutRouter.vue"),
    children: [
      {
        path: "",
        name: "AdminLayout",
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
          {
            path: "equipment",
            name: "EquipmentView",
            component: () =>
              import("@/views/admin/equipment/EquipmentView.vue"),
          },
          {
            path: "equipment/:equipmentId",
            name: "EquipmentDetails",
            component: () =>
              import("@/views/admin/equipment/EquipmentDetails.vue"),
          },
          {
            path: "documents",
            name: "DocumentTypesView",
            component: () =>
              import("@/views/admin/documents/DocumentTypesView.vue"),
          },
          {
            path: "organisations",
            name: "OrganisationList",
            component: () =>
              import("@/views/admin/organisations/OrganisationList.vue"),
          },
          {
            path: "organisation/:id",
            name: "OrganisationView",
            props: true,
            component: () =>
              import("@/views/admin/organisations/OrganisationView.vue"),
          },
          {
            path: "organisation/:id/details",
            name: "OrganisationViewDetails",
            props: true,
            component: () =>
              import("@/views/admin/organisations/OrganisationViewDetails.vue"),
          },
          {
            path: "organisation/:id/theme",
            name: "OrganisationViewTheme",
            props: true,
            component: () =>
              import("@/views/admin/organisations/OrganisationViewTheme.vue"),
          },
          {
            path: "organisation/:id/space-metadata",
            name: "OrganisationViewSpaceMetadata",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewSpaceMetadata.vue"
              ),
          },
          {
            path: "organisation/:id/document-types",
            name: "OrganisationViewDocumentTypes",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewDocumentTypes.vue"
              ),
          },
          {
            path: "organisation/:id/integrations",
            name: "OrganisationViewIntegrationsList",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewIntegrationsList.vue"
              ),
          },
          {
            path: "organisation/:id/integrations/:integrationId",
            name: "OrganisationViewIntegrations",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewIntegrations.vue"
              ),
          },
          {
            path: "organisation/:id/decision-trees",
            name: "OrganisationViewDecisionTrees",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewDecisionTrees.vue"
              ),
          },
          {
            path: "organisation/:organisationId/decision-trees/:decisionTreeId",
            name: "OrganisationViewDecisionTreeDetails",
            component: () =>
              import(
                "@/views/admin/organisations/OrganisationViewDecisionTreeDetails.vue"
              ),
          },
        ],
      },
      {
        path: "organisation/:id/location",
        name: "AdminLocationLayout",
        component: () => import("@/layouts/AdminLocationLayout.vue"),
        children: [
          {
            path: ":locationId",
            name: "OrganisationViewLocations",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocations.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId",
            name: "OrganisationViewLocationsFloors",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsFloors.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId",
            name: "OrganisationViewLocationsSpaces",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsSpaces.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/devices",
            name: "OrganisationViewLocationsDevices",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsDevices.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/beacon",
            name: "OrganisationViewLocationsBeacon",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsBeacon.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/announcement",
            name: "OrganisationViewLocationsAnnouncement",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsAnnouncement.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/integrations",
            name: "OrganisationViewLocationsIntegrations",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsIntegrations.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/wifi",
            name: "OrganisationViewLocationsWifi",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsWifi.vue"
              ),
          },
          {
            path: ":locationId/floor/:floorId/space/:spaceId/panorama",
            name: "OrganisationViewLocationsPanorama",
            props: true,
            component: () =>
              import(
                "@/views/admin/organisations/locations/OrganisationViewLocationsPanorama.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
