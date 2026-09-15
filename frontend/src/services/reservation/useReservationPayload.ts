/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { form } from "./useReservationForm";

// APIへ送信するデータを作成
export const createPayload = () => {

    return {

        patientId: form.patient_id,

        staff_id: form.staff_id,

        departmentId: form.department_id,

        familyId: form.family_id === -1 ? null : form.family_id,

        doctorId: form.doctor_id,

        reservationDate: form.reservation_date,

        startTime: form.start_time,

        endTime: form.end_time,

        visitType: form.visitType
    };
};