/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { showModal } from "../useModal";
import { validateRequired, formatDate } from "./useReservationValidation";
import { createPayload } from "./useReservationPayload";
import { insertReservation, 
        selectDepartment,
        selectReservaionById,
        selectAvailableTimeSlot,
        selectDoctorsByDepartmentId,
        selectFamilyMembersByPatientId,
        updateReservationStatusCancelled,
} from "./useReservationApi";
// =======================
// 診療科を表示
// =======================
export const loadDepartment = async () => {
    try {
        return await selectDepartment();
    } catch (error) {
        console.error("診療科取得エラー", error);
    }
};
// =======================
// 担当医を表示
// =======================
export const loadDoctor = async (
    departmentId: number
) => {
    try {
        return await selectDoctorsByDepartmentId(departmentId);
    } catch (error) {
        console.error("担当医取得エラー", error);
    }
};
// =======================
// 家族一覧を表示
// =======================
export const loadFamilyMembers = async (
    patientId: number
) => {
    try {
        return await selectFamilyMembersByPatientId(patientId);
    } catch (error) {
        console.error("家族取得エラー", error);
    }
};
// =======================
// 予約可能時間帯を表示
// =======================
export const loadAvailableTimeSlot = async (
    doctorId: number,
    reservationDate: string
) => {
    try {
        return await selectAvailableTimeSlot(
            doctorId,
            reservationDate
        );
    } catch (error) {
        console.error("予約可能時間帯取得エラー", error);
        return [];
    }
};
// =======================
// 予約情報確認
// =======================
export const loadReservationById = async (
    patientId: number
) => {
    try {
        return await selectReservaionById(patientId);
    } catch (error) {
        console.error("予約情報取得エラー", error);
    }
};
// =======================
// 予約
// =======================
export const submit = async () => {
    const result = validateRequired();

    if (!result.valid) {
        showModal(
            "入力エラー",
            `以下の項目を選択してください\n\n・
            ${result.missingFields.join("\n・")}`
        );
        return;
    }

    try {
        const payload = createPayload();

        return await insertReservation(payload);
        
        } catch (error) {
        console.error("予約登録エラー", error);
        
        showModal(
            "エラー",
            "予約登録に失敗しました"
        );
    }
};
// =======================
// 休診日取得
// =======================
export {
    formatDate,
    updateReservationStatusCancelled,
}