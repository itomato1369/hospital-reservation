/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import { showModal } from "../useModal";
import { form } from "./useLoginForm";
import { validateRequired } from "./useLoginValidation";
import { loginPatient } from "./useLoginApi";
import { useAuthStore } from "@/stores/authStore";

export const login = async () => {

    // 必須入力チェック
    const result = validateRequired();
    console.log(result);

    if (!result.valid) {
        showModal(
            "入力エラー",
            `以下の項目を入力してください\n\n・${result.missingFields.join("\n・")}`
        );
        return;
    }
    try {
        // Piniaでログイン情報を管理
        const authStore = useAuthStore();
        // API実行
        const data = await loginPatient({
            loginId: form.loginId,
            password: form.password,
        });

        // Piniaにデータを保存
        authStore.setUser(data);
        console.log("Pinia store保存", authStore.user);

        console.log(data);
        // ここで画面遷移を決定する
        if (data.userType === "patient") {

            // ログイン時に入力した値を初期化する
            form.loginId = "";
            form.password = "";

            router.push("/patient");

        } else if (data.userType === "staff") {

            switch (data.role) {

                case "doctor":
                    form.loginId = "";
                    form.password = "";

                    router.push("/doctor");
                    break;

                case "nurse":
                    form.loginId = "";
                    form.password = "";
                    router.push("/nurse");
                    break;

                case "reception":
                    form.loginId = "";
                    form.password = "";
                    router.push("/nurse");
                    break;

                default:
                    showModal(
                        "ログインエラー",
                        "IDまたはパスワードを確認してください"
                    );
            }
        }
    } catch (error: any) {

        showModal(
            "ログイン失敗",
            "IDまたはパスワードを確認してください"
        );
    }
};
export {
    form,
}