import apiClient from "../apiClient";
import { createPayload } from "./useDoctorPayload";
// =======================
// 医師の休診日登録
// =======================
export const insertDoctorHoliday = async (
    payload: ReturnType<typeof createPayload>
) => {
    const { data } = await apiClient.post(
        "/api/doctor",
        payload
    );
    return data;
};

// =======================
// ログイン中医師の診療スケジュール
// =======================/schedule/self
export const selectDoctorScheduleSelf = async () => {
    const { data } = await apiClient.get("/api/doctor/schedule/self");
    return data;
};
// =======================
// 担当患者を取得
// =======================
export const selectAssignedPatient = async () => {
    const { data } = await apiClient.get("/api/doctor/assigned");
    return data; 
};
// =======================
// 患者の予約画面で使うスケジュールなのでIDがパラメータとして必要
// 医師の情報を変更するたびに
// =======================/schedule/self
export const selectDoctorSchedule = async (doctorId: number) => {
    const { data } = await apiClient.get(`/api/doctor/schedule/${doctorId}`);
    return data;
};
//=======================
// 医師スケジュール更新
// =======================
export const updateDoctorSchedule = async (
    payload: Array<{
        day_of_week: number;
        start_time: string;
        end_time: string;
        is_closed: boolean;
    }>
) => {
    const { data } = await apiClient.put("/api/doctor/schedule", payload);
    return data;
};
// =======================
// 各医師の休診日を所得 
// =======================
export const selectDoctorHoliday = async () => {
    const { data } = await apiClient.get("/api/doctor/holiday");

    return data;

};