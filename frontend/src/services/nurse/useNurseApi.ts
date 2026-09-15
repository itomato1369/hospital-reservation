import apiClient from "@/services/apiClient";
import type { PatientSearch } from "@/types/nurse";
// =======================
// 今日の予約一覧
// =======================
export const selectTodayReservation = async () => {
    const { data } = await apiClient.get("/api/nurse/today");
    //console.log(data);
    return data;
};
// =======================
// 予約ステータスを変更する
// =======================
export const updateReservationStatus = async (
    status: string,
    reservationId: number
) => {
    const { data } = await apiClient.put("/api/nurse/change-status", {
        status,
        reservationId,
    });

    return data;
};
// =======================
// 待ち時間でのステータスが来院である患者
// =======================
export const selectWaitTime = async () => {
    const { data } = await apiClient.get("/api/nurse/wait");
    return data;
}
// =======================
// 待ち時間を更新する
// =======================
export const updateWaitTime = async (
    reservationId: number,
    waitMinutes: number
) => {
    const { data } = await apiClient.put("/api/nurse/wait-time", {
        reservationId,
        waitMinutes,
    });
    return data;
};
// =======================
// 患者の来院履歴を検索 GET
// =======================
export const selectPatient = async (
    params: PatientSearch
) => {
    const { data } = await apiClient.get(
        "/api/nurse/history",{
            params
        });
    return data;
};