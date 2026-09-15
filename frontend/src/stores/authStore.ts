/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// pinia設定ファイル
// interface 
import { defineStore } from "pinia";
import { resetForm, clearErrors } from "@/services/reservation/useReservationForm";

export interface LoginUser {
  token: string;

  patientId: number;

  staffId: number;

  userType: string;

  loginId: string;

  name: string;
  
  role?: string;
};

export const useAuthStore = defineStore(
  "auth", 
  {
    state: () => ({
      user: null as LoginUser | null,
  }),

  getters: {
    // token
    token: (state) => state.user?.token ?? "",
    
    //stateデータ群を比較
    isLoggedIn: (state) => !!state.user?.token,

    // state.user?.name　userがnullでなければnameを取得
    // ?? ""　値がnullまたはundefinedなら空文字を返す
    userName: (state) => state.user?.name ?? "",

    userType: (state) => state.user?.userType ?? "",

    patientId: (state) => state.user?.patientId ?? null,

    staffId: (state) => state.user?.staffId ?? null,

    currentRole: (state) => {
      // userTypeが patientであれば currentRoleの値をpatientにする
      // 共通コードにrole　paitentを入れないまま設計をしたので
      if (state.user?.userType === "patient") {
        return "patient";
      }
      return state.user?.role ?? "";
    }
  },

  actions: {
    setUser(user: LoginUser) {
      // this.userは state:() => ({ user: null as LoginUser | null})
      // = userはパラメータのuser: LoginUser
      this.user = user;
    },

    logout() {
      this.user = null;
      // 予約画面に残っている項目もリセット
      resetForm();
      clearErrors();

      sessionStorage.clear();

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  persist: true,
  // localStorageに自動保存されます
  // ブラウザが再起動しても復元
});
