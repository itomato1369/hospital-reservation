/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// 患者の家族一覧（ほぼ小児科のために作った機能ですが、拡張性を考慮する）
// =======================
const selectFamilyMembersByPatientId = `
                                        SELECT
                                                family_id
                                                , name
                                                , relationship
                                        FROM family_members
                                        WHERE patient_id = $1
                                        ORDER BY family_id
`;
// =======================
// 診療科一覧
// =======================
const selectDepartment = `
                          SELECT
                                  department_id
                                  , name
                          FROM departments
                          ORDER BY sort_order
  `;                    
// =======================
// 診療科に所属する医師一覧
// =======================
const selectDoctorsByDepartmentId = `
                                      SELECT
                                              d.doctor_id
                                            , s.name AS doctor_name
                                      FROM doctors d
                                      INNER JOIN staffs s
                                            ON d.staff_id = s.staff_id
                                      WHERE d.department_id = $1
                                      ORDER BY s.name;
`;
// =======================
// 指定日の予約済み時間取得
// =======================
const selectReservedTimeSlot = `
                                SELECT
                                        start_time
                                      , end_time
                                FROM reservations
                                WHERE doctor_id = $1
                                AND reservation_date = $2
                                AND status <> 'cancelled'
                                ORDER BY start_time
`;
// =======================
// 予約重複チェック、バリデーションん
// =======================
const countReservationsByDoctorAndTime = `
                                          SELECT COUNT(*) AS count
                                          FROM reservations
                                          WHERE doctor_id = $1
                                          AND reservation_date = $2
                                          AND start_time = $3
                                          AND status <> 'cancelled'
`;
// =======================
// 予約登録
// =======================
const insertReservation = `
                            INSERT INTO reservations (
                                                        patient_id
                                                      , department_id
                                                      , family_id
                                                      , doctor_id
                                                      , staff_id
                                                      , reservation_date
                                                      , start_time
                                                      , end_time
                                                      , visit_type
                                                      , status
                                                      , wait_minutes
                                                      , created_at
                                                      , updated_at
                                                      )
                                    VALUES (
                                                        $1
                                                      , $2
                                                      , $3
                                                      , $4
                                                      , $5
                                                      , $6
                                                      , $7
                                                      , $8
                                                      , $9
                                                      , 'reserved'
                                                      , 0
                                                      , CURRENT_TIMESTAMP
                                                      , CURRENT_TIMESTAMP
                                                    )
                                                RETURNING reservation_id
`;
// =======================
// 予約キャンセル
// =======================
const updateReservationStatusCancelled = `
                                          UPDATE reservations
                                          SET
                                              status = 'cancelled'
                                            , updated_at = CURRENT_TIMESTAMP
                                          WHERE reservation_id = $1
`;
// =======================
// 医師の休診日
// =======================
const selectDoctorHoliday = `
                              SELECT
                                    holiday_date
                                  , reason
                              FROM doctor_holidays
                              WHERE doctor_id = $1
                              ORDER BY holiday_date
`;
// =======================
// 予約可能時間帯取得
// PL/SQLを利用
// =======================
const selectAvailableTimeSlot = `
                                  SELECT *
                                  FROM get_available_timeslots($1, $2)
`;
// =======================
// 病院休診日一覧
// =======================
const selectClinicHoliday = `
                              SELECT
                                    holiday_id
                                  , holiday_date
                                  , reason
                              FROM clinic_holidays
                              ORDER BY holiday_date
`;
// =======================
// 予約確認
// =======================
const selectReservationById = `
                                SELECT
                                        r.reservation_id
                                      , r.patient_id
                                      , r.family_id
                                      , f.name AS family_name
                                      , d.name As department_name
                                      , s.name
                                      , r.visit_type
                                      , r.reservation_date
                                      , r.start_time
                                      , r.end_time
                                      , r.status
                                FROM reservations r
                                LEFT JOIN family_members f
                                     ON r.family_id = f.family_id
                                INNER JOIN departments d
                                      ON r.department_id = d.department_id
                                INNER JOIN doctors doc
                                      ON r.doctor_id = doc.doctor_id
                                INNER JOIN staffs s
                                      ON doc.staff_id = s.staff_id
                                WHERE r.patient_id = $1
                                AND r.status = 'reserved'
                                ORDER BY r.reservation_date ASC
                                       , r.start_time ASC;
`;
module.exports = {
    selectDepartment,
    selectClinicHoliday,
    selectDoctorHoliday,
    selectReservationById,
    selectReservedTimeSlot,
    selectAvailableTimeSlot,
    selectDoctorsByDepartmentId,
    selectFamilyMembersByPatientId,
    
    insertReservation,

    countReservationsByDoctorAndTime,
    updateReservationStatusCancelled,
};
