// =======================
// 今日の予約一覧
// =======================
const selectTodayReservation = `SELECT
                                      r.reservation_id
                                    , p.name AS patient_name
                                    , p.name_kana
                                    , d.name AS department_name
                                    , s.name AS doctor_name
                                    , r.reservation_date
                                    , r.start_time
                                    , r.end_time
                                    , r.visit_type
                                    , r.status
                                FROM reservations r
                                INNER JOIN patients p
                                    ON r.patient_id = p.patient_id
                                INNER JOIN departments d
                                    ON r.department_id = d.department_id
                                INNER JOIN doctors doc
                                    ON r.doctor_id = doc.doctor_id
                                INNER JOIN staffs s
                                    ON doc.staff_id = s.staff_id
                                WHERE r.reservation_date = CURRENT_DATE
                                ORDER BY r.start_time
`;
// =======================
// 予約ステータスを変更する
// =======================
const updateReservationStatus = `
                                UPDATE reservations
                                SET status = $1
                                WHERE reservation_id = $2
`;
// =======================
// 待ち時間でのステータスが来院である患者一覧
// =======================
const selectWaitTime = `
                        SELECT
                                r.reservation_id
                              , p.name AS patient_name
                              , p.name_kana
                              , d.name AS department_name
                              , s.name AS doctor_name
                              , r.start_time
                              , r.end_time
                              , r.wait_minutes
                        FROM reservations r
                        INNER JOIN patients p
                              ON r.patient_id = p.patient_id
                        INNER JOIN departments d
                              ON r.department_id = d.department_id
                        INNER JOIN doctors doc
                              ON r.doctor_id = doc.doctor_id
                        INNER JOIN staffs s
                              ON doc.staff_id = s.staff_id
                        WHERE r.reservation_date = CURRENT_DATE
                              AND r.status = 'arrived'
                        ORDER BY r.start_time
`;
// =======================
// 待ち時間を更新する
// =======================
const updateWaitTime = `
                        UPDATE reservations
                        SET wait_minutes = $1
                        WHERE reservation_id = $2
`;
// =======================
// 患者の来院履歴を検索
// =======================
const selectPatient = `
                        SELECT
                                DISTINCT ON (p.patient_id)
                                p.patient_id  
                              , r.reservation_id
                              , p.name AS patient_name
                              , p.name_kana
                              , p.phone
                        FROM patients p
                        LEFT JOIN reservations r
                              ON p.patient_id = r.patient_id
                        INNER JOIN departments d
                              ON r.department_id = d.department_id
                        INNER JOIN doctors doc
                              ON r.doctor_id = doc.doctor_id
                        INNER JOIN staffs s
                              ON doc.staff_id = s.staff_id
                        WHERE (CAST($1 AS VARCHAR) IS NULL OR p.name LIKE '%' || CAST($1 AS VARCHAR) || '%')
                          AND (CAST($2 AS VARCHAR) IS NULL OR p.phone LIKE '%' || CAST($2 AS VARCHAR) || '%')
                          AND (CAST($3 AS INTEGER) IS NULL OR r.department_id = CAST($3 AS INTEGER))
                          AND (CAST($4 AS DATE) IS NULL OR r.reservation_date = CAST($4 AS DATE))
                          AND (CAST($5 AS VARCHAR) IS NULL OR r.status = CAST($5 AS VARCHAR))
                        ORDER BY p.patient_id
                               , r.reservation_date
                               , r.start_time
`;

module.exports = {
    selectPatient,
    selectWaitTime,
    selectTodayReservation,
    
    updateWaitTime,
    updateReservationStatus,
};