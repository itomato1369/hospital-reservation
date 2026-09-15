/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import apiCilent from "@/services/apiClient";
// =======================
// ログイン
// =======================
export const loginPatient = async (payload: any) => {
    console.log(payload);

    try {
        console.log("送信データ", payload);
        const { data } = await apiCilent.post(
            "/api/login",
            payload
        );
       // console.log("レスポンス", data);
        console.log("レスポンス", data.response);
        return data;

    } catch (error) {
        console.error("useLoginApi.tsエラー", error);
    }
};