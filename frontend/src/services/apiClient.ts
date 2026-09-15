/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { showModal } from "./useModal";
/**
 * 共通 Axiosインスタンス
 * JWT認証が必要な API通信で利用する
 * 
 * ログイン成功時にバックエンドから払い出されたJWTを
 * Piniaから取得し全ての HTTPリクエストへ自動付与する
 * 例）
 * apiClient.get("/api/patient/info");
 * 
 * Axios本体を直接利用せず
 * このインスタンスを経由して API通信を行う
 */
const apiClient = axios.create();
/**
 * Request Interceptor
 * API 送信直前に実行される共通処理
 * ログイン後にPiniaへ保存された JWTを取得し
 * Authorization ヘッダーへ付与する
 * 
 * Authorizaiton: Bearere xxx
 * バックエンドでは authMiddlewareがこの JWTを検証する
 * 
 * フロント
 * ↓
 * apiClient
 * ↓
 * JWT付与
 * ↓
 * Express(authMiddleware)
 * ↓
 * JWT検証
 * ↓
 * Router
 */
apiClient.interceptors.request.use(
    // config
    // Axiosが送信するリクエスト情報
    (config) => {
        // Pinia store取得
        // ログインユーザー情報を保持している
        //console.log("[apiClient] Interceptor Start");
        const authStore = useAuthStore();
        //console.log("[apiClient] user", authStore.user);
        // JWT 取得
        // バックエンド loginServiceで発行したJWT
        const token = authStore.user?.token;
        //console.log("[apiClient] Token", token);
        // JWTが存在する場合のみ
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            //console.log("[apiClient] JWT Attached");
        } else {
            console.warn("[apiClient] JWT Not Found");
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);
/**
 * JWT 期限切れなど
 * 認証エラーが発生した場合
 */
apiClient.interceptors.response.use(
    // 正常レスポンス
    (response) => {
        return response;
    },
    // 異常レスポンス
    (error) => {
        // HTTPS エラー 401 
        if (error.response?.status === 401) {
            showModal(
                "セッション期限切れ",
                `ログインの有効期限が切れました
                再度ログインしてください`
            );

            setTimeout(() => {
                // ログイン情報破棄
                const authStore = useAuthStore();

                authStore.logout();
                // ログイン画面に強制遷移
                window.location.href = "/login";
            }, 2000);
        }
        return Promise.reject(error);
    }
);
// 共通 Axiosインスタンスをexport
// JWT認証が必要な画面では
// Axiosの代わりにapiClientを利用する
//
export default apiClient;