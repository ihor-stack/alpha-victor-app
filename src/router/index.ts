import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LogIn.vue"),
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
        name: "FindSpaceLocation",
        component: () => import("@/views/find-space/FindSpaceLocation.vue"),
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
    path: "/space",
    name: "Space",
    component: () => import("@/views/space/SpaceView.vue"),
  },
  {
    path: "/equipment",
    name: "Equipment",
    component: () => import("@/views/space/EquipmentView.vue"),
  },
  {
    path: "/documents",
    name: "Documents",
    component: () => import("@/views/space/DocumentsView.vue"),
  },
  {
    path: "/document-viewer",
    name: "DocumentViewer",
    component: () => import("@/views/space/DocumentView.vue"),
  },
  {
    path: "/known-issues",
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
    path: "/organisation",
    name: "Oraganistion",
    component: () => import("@/views/admin/OrganisationView.vue"),
  },
  {
    path: "/organisation-edit",
    name: "OrganisationEdit",
    component: () => import("@/views/admin/OrganisationEditView.vue"),
  },
  {
    path: "/organisation-edit-details",
    name: "OrganisationEditDetails",
    component: () => import("@/views/admin/OrganisationEditDetailsView.vue"),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
