/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import apiCilent from "@/services/apiClient";
import { familyPayload } from "./usePatientPayload";

// =======================
// 患者の情報を取得 GET
// =======================
export const getPatientInfo = async (loginId: string) => {

    const { data } = 
        await apiCilent.get(`/api/patient/info/${loginId}`);

    console.log(data);
    return data;
};
// =======================
// 患者情報を更新 PUT
// =======================
export const updatePatientInfo = async (payload: any) => {
    const { data } = await apiCilent.put("/api/patient/info", payload);
    return data;
};
// =======================
// 担当医の情報を取得 GET
// =======================
export const getDoctors = async () => {
    const { data } =
        await apiCilent.get("/api/patient/doctors");

    console.log(data);

    return data;
};
// =======================
// 担当医のスケジュールを取得 GET
// =======================
export const getDoctorSchedule = async (
    doctorId: number
) => {
    const { data } = await apiCilent.get(
        `/api/patient/doctor-schedule/${doctorId}`
    );
    console.log(data);
    return data;
};
// =======================
// 患者の来院記録を取得 GET
// =======================
export const selectHistory = async (
    patientId: number
) => {
    const { data } = await apiCilent.get(
        `/api/patient/history/${patientId}`
    );
    return data;
};
// =======================
// 患者の情報を取得 GET
// =======================
export const selectWaitTime = async (
    patientId: number
) => {
    const { data } = await apiCilent.get(
        `/api/patient/wait/${patientId}`
    );
    return data;
};
// =======================
// 患者の情報を取得 GET
// =======================
export const selectFamily = async (
    patientId: number
) => {
    const { data } = await apiCilent.get(
        `/api/patient/family/${patientId}`
    );
    console.log("ファミリマート", data);
    return data;
};
// =======================
// 家族登録 POST
// =======================
export const insertFamily = async (
    payload: ReturnType<typeof familyPayload>
) => {
    const { data } = await apiCilent.post(
        "/api/patient/family",
        payload
    );
    return data;
};