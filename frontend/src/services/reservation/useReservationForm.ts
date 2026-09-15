/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { reactive } from "vue";
import type { ReservationForm } from "@/types/reservation";
// =======================
// 予約フォーム
// =======================
export const form = reactive<ReservationForm>({
    reservation_id: null,

    department_name: "",

    name: "",

    patient_id: null,

    staff_id: null,

    family_id: null,

    department_id: null,

    doctor_id: null,

    reservation_date: "",

    start_time: "",

    end_time: "",

    visitType: ""
});
// =======================
// エラーメッセージ
// =======================
export const errors = reactive({
    family_id: "",

    department_id: "",

    doctor_id: "",

    reservation_date: "",

    start_time: "",

    end_time: "",

    visitType: ""
});
// =======================
// フォーム初期化
// =======================
export const resetForm = () => {
    form.patient_id = null;

    form.family_id = null;

    form.department_id = null;

    form.doctor_id = null;

    form.reservation_date = "";

    form.start_time = "";

    form.end_time = "";

    form.visitType = "";

    clearErrors();
};
// =======================
// エラー初期化
// =======================
export const clearErrors = () => {
    errors.family_id = "";

    errors.department_id = "";

    errors.doctor_id = "";

    errors.reservation_date = "";

    errors.start_time = "";

    errors.visitType = "";
};
// =======================
// 必須項目
// =======================
export const requiredFields = [
    { key: "department_id", label: "診療科" },
    { key: "doctor_id", label: "担当医" },
    { key: "visitType", label: "初診・再診" },
    { key: "reservation_date", label: "予約日" },
    { key: "start_time", label: "予約時間" }
];