// =======================
// 医師の休診日登録
// =======================
const insertDoctorHoliday = `
                            INSERT INTO doctor_holidays (
                                                          doctor_id
                                                        , holiday_date
                                                        , reason
                                                        , created_at
                                                        ) 
                                                VALUES (
                                                        $1
                                                      , $2
                                                      , $3
                                                      , NOW()
                                                        )
                                                RETURNING doctor_id
                                                        , holiday_date
                                                        , reason
                                                        , created_at
`;                
// =======================
// 医師のスケジュール一覧
// ======================= 
const selectDoctorSchedule = `
                                SELECT
                                        s.doctor_id
                                        , st.name  AS doctor_name
                                        , s.day_of_week
                                        , s.start_time
                                        , s.end_time
                                        , s.is_closed
                                FROM schedule_templates s
                                INNER JOIN doctors doc
                                ON s.doctor_id = doc.doctor_id
                                INNER JOIN staffs st
                                ON doc.staff_id = st.staff_id
                                WHERE s.doctor_id = $1
                                ORDER BY s.day_of_week
`;

// =======================
// staffId から doctorId を取得
// =======================
const selectDoctorByStaffId = `
                                SELECT
                                        doctor_id
                                FROM doctors
                                WHERE staff_id = $1
                                LIMIT 1
`;

// =======================
// 医師のスケジュールを更新
// =======================
const updateDoctorSchedule = `
                                UPDATE schedule_templates
                                SET
                                      start_time = $1
                                    , end_time = $2
                                    , is_closed = $3
                                WHERE doctor_id = $4
                                  AND day_of_week = $5
                                RETURNING doctor_id
                                        , day_of_week
                                        , start_time
                                        , end_time
                                        , is_closed
`;
// =======================
// 各医師の休診日を取得
// =======================
const selectDoctorHoliday = `
                                SELECT 
                                          s.doctor_id
                                        , st.name  
                                        , s.holiday_date
                                        , s.reason  
                                FROM doctor_holidays s
                                INNER JOIN doctors doc
                                      ON s.doctor_id = doc.doctor_id
                                INNER JOIN staffs st
                                      ON doc.staff_id = st.staff_id
                                WHERE s.doctor_id = $1
                                ORDER BY s.holiday_date
`;
// =======================
// 担当患者を確認
// ======================= 
const selectAssignedPatient = `
                                SELECT 
                                          p.patient_id
                                        , p.name AS patient_name
                                        , p.name_kana  
                                        , TO_CHAR(MAX(r.reservation_date), 'YYYY-MM-DD') AS recently
                                FROM reservations r
                                INNER JOIN patients p
                                      ON r.patient_id = p.patient_id
                                INNER JOIN departments d
                                      ON r.department_id = d.department_id
                                WHERE r.doctor_id = $1
                                      AND r.status = 'prescribed'
                                GROUP BY  patient_name
                                        , name_kana
                                        , p.patient_id
                                ORDER BY patient_name
`;

module.exports = {
    selectDoctorHoliday,
    selectDoctorSchedule,
    selectAssignedPatient,
    selectDoctorByStaffId,

    updateDoctorSchedule,
    insertDoctorHoliday,
};