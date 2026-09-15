export interface TodaysReservation {
    reservation_id: number;

    patient_name: string;

    name_kana: string;

    department_name: string;

    doctor_name: string;

    reservation_date: string;

    start_time: string;

    end_time: string;

    visit_type: string;

    status: string;

    wait_minutes: string;
};

export interface PatientHistory {
    reservation_id: string;

    patient_id: number;

    patient_name: string;

    phone: string;

    name_kana: string;

    department_name: string;

    doctor_name: string;

    reservation_date: string;

    start_time: string;

    patientName?: string;

    departmentId?: number;

    reservationDate?: string;

    status?: string;
};
export interface PatientSearch {
    patientName: string | null;

    phone: string | null;

    departmentId: number | null;

    reservationDate: string | null;

    status: string | null;
};