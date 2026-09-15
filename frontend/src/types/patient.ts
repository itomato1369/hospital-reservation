/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
export interface PatientInfo {
    patient_id: number;

    login_id: string;

    name: string;

    name_kana: string;

    gender: string;

    birth_date: string;

    phone: string;

    email: string;

    postal_code: string;

    prefecture: string;

    city: string;

    address: string;

    building: string;

    insurer_number: string;

    insurer_symbol: string;

    insurer_number2: string;
    
    insurer_branch: string;
};

export interface WaitTime {
    reservation_id: number;

    patient_name: string;

    department_name: string;

    doctor_name: string;

    start_time: string;

    reservation_date: string;

    wait_minutes: string;
};

export interface History {
    reservation_id: number;

    reservation_date: string;

    department_name: string;

    doctor_name: string;

    start_time: string;

    end_time: string;

    visit_type: string;
};

export interface Family {
    patient_id: number;

    patient_name: string;

    lastName: string;

    firstName: string;

    lastNameKana: string;

    firstNameKana: string;

    name_kana: string;

    gender: string;

    birth_date: string;

    relationship: string;
};