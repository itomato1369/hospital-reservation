import { form } from "./useDoctorForm";

// APIへ送信するデータを作成
// 画面で入力したデータを、APIに送れる形へ変更するファイル
export const createPayload = () => {
    return {
        doctor_id: form.doctorId,
        holiday_date: form.holidayDate,
        reason: form.reason,
    };
};