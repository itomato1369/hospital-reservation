/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import apiCilent from "@/services/apiClient";
import { createPayload } from "./useReservationPayload";
import apiClient from "@/services/apiClient";
// =======================
// 家族一覧取得 GET
// =======================
export const selectFamilyMembersByPatientId = async (
    patientId: number
) => {
    const { data } = await apiCilent.get("/api/reservation/family", 
        {
            params: {
                patientId
            }
        }
    );
    return data;
};
// =======================
// 診療科一覧取得 GET
// =======================
export const selectDepartment = async () => {
    const { data } = await apiCilent.get("/api/reservation/department");
    return data;
};
// =======================
// 診療科別担当医一覧取得 GET
// =======================
export const selectDoctorsByDepartmentId = async (
    departmentId: number
) => {
    const { data } = await apiCilent.get("/api/reservation/doctor",
        {
            params: {
                departmentId
            }
        }
    );
    return data;
};
// =======================
// 予約済み時間帯取得 GET
// =======================
export const selectReservedTimeSlot = async (
    doctorId: number, reservationDate: string
) => {
    const { data } = await apiCilent.get("/api/reservation/timeslot",
        {
            params: {
                doctorId,
                reservationDate
            }
        }
    );
    return data;
};
// =======================
// 予約登録 POST
// =======================
export const insertReservation = async (
    payload: ReturnType<typeof createPayload>
) => {
    const { data } = await apiCilent.post(
        "/api/reservation",
        payload
    );
    return data;
};
// =======================
// 予約キャンセル PUT
// =======================
export const updateReservationStatusCancelled = async (
    reservationId: number
) => {
    const { data } = await apiCilent.put(`/api/reservation/cancel/${reservationId}`);

    return data;
};
// =======================
// 予約可能時間帯取得 GET
// =======================
export const selectAvailableTimeSlot = async (
    doctorId: number,
    reservationDate: string
) => {
    console.log("doctorId =", doctorId);
    console.log("reservationDate =", reservationDate);

    const { data } = await apiClient.get("/api/reservation/available-timeslot", 
        {
            params: {
                doctorId,
                reservationDate
            }
        }
    );
    
    return data;
};
// =======================
// 病院休診日取得 GET
// =======================
export const selectClinicHoliday = async () => {
    const { data } = await apiClient.get("/api/reservation/clinic-holiday");

    return data;
};
// =======================
// 医師の休診日 GET
// =======================
export const selectIsDoctorHoliday = async (
    doctorId: number
) => {
    const { data } = await apiClient.get("/api/reservation/doctor-holiday",
        {
            params: {
                doctorId
            }
        }
    );

    return data;
};
// =======================
// 予約確認 GET
// =======================
export const selectReservaionById = async (
    patientId: number
) => {
    const { data } = await apiClient.get(`/api/reservation/confirm/${patientId}`);

    return data;
};