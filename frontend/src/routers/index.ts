/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { createRouter, createWebHistory } from "vue-router";
// URL直接アクセス防止
import { useAuthStore } from "@/stores/authStore";
// routerを結合する
import { publicRoutes } from "./modules/publicRouter";
import { patientRoutes } from "./modules/patientRouter";
import { doctorRoutes } from "./modules/doctorRouter";
import { nurseRoutes } from "./modules/nurseRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
  
  routes: [...publicRoutes, ...patientRoutes, ...doctorRoutes, ...nurseRoutes],
});

// URL直接アクセス防止
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // ログイン情報無しアクセスできる
  const publicPages = [
    "/",
    "/login",
    "/signup"
  ];
  if (
    !publicPages.includes(to.path) && !authStore.isLoggedIn
  ) {
    // 移動先のページが公開ページではなく、かつ、ログインしていない場合
    return "/login";
  }
  // 権限
  const role = authStore.currentRole;

  if (role === "patient" && !to.path.startsWith("/patient")) {
    return "/patient";
  }
    
  if (role === "doctor" && !to.path.startsWith("/doctor")) {
    return "/doctor";
  }
  
  if (role === "nurse" && !to.path.startsWith("/nurse")) {
    return "/nurse";
  }
  
  if (role === "reception" && !to.path.startsWith("/nurse")) {
    return "/nurse";
  }
});

export default router;
