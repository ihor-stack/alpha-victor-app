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
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/onboarding/SignUp.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
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
    path: "/known-issues",
    name: "KnownIssues",
    component: () => import("@/views/space/KnownIssuesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
