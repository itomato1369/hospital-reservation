/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
export interface ReservationForm {
    reservation_id: number | null;

    patient_id: number | null;

    staff_id: number | null;

    family_id: number | null;

    department_id: number | null;

    department_name: string;

    doctor_id: number | null;

    name: string;

    reservation_date: string;

    start_time: string;
    
    end_time: string;

    visitType: string;
};
// =======================
// 家族
// =======================
export interface FamilyMember {
    family_id: number | null;

    name: string;

    relationship: string;
};
// =======================
// 診療科
// =======================
export interface Department {
    department_id: number;

    name: string;
};
// =======================
// 担当医
// =======================
export interface Doctor {
    doctor_id: number;

    doctor_name: string;
};
// =======================
// 医師個人の休診日
// =======================
export interface DoctorHoliday {
    doctor_id: number;

    holiday_date: string;

};
// =======================
// 病院休診日
// =======================
export interface ClinicHoliday {
    doctor_id: number;

    holiday_id: number;

    holiday_date: string;

    reason: string;
};
// =======================
// 予約可能時間帯
// =======================
export interface AvailableTimeSlot {
    start_time: string;

    end_time: string;

    available: boolean;
};
export interface CalendarDay {
    day: number | null;

    dateStr: string;

    isDisabled: boolean;

    isToday: boolean;

    isSelected: boolean;
};
export interface TimeSlot {
    time: string;

    status: string;
};