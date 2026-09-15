export const publicRoutes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/pages/MainPage.vue"),
    meta: { public: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/pages/Login.vue"),
    meta: { public: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/pages/SignUp.vue"),
    meta: { public: true },
  },
];
