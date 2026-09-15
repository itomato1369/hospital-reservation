/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
export interface DoctorInfo {
    doctor_id: number;

    doctor_name: string;

    department_name: string;

    holiday_date: string;

    day_of_week: number;

    start_time: string;

    end_time: string;

    is_closed: boolean;

    reason: string;
    
    avatar?: string;
};

export interface Carte {
    patient_id: number;

    patient_name: string;

    name_kana: string;

    recently: string;
}