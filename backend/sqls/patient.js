/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// =======================
// 患者の情報マイページ
// =======================
const selectPatientInfoByLoginId = `
                                    SELECT 
                                        name
                                        , name_kana
                                        , gender
                                        , birth_date
                                        , phone
                                        , email
                                        , postal_code
                                        , prefecture
                                        , city
                                        , address
                                        , building
                                        , insurer_number
                                        , insurer_symbol
                                        , insurer_number2
                                        , insurer_branch     
                                    FROM patients 
                                    WHERE login_id = $1
`;
// =======================
// 患者が見るさくら病院の担当医一覧
// =======================
const selectAllDoctor = `
                            SELECT
                                    d.doctor_id
                                , s.name AS doctor_name
                                , dep.name AS department_name
                            FROM doctors d
                            INNER JOIN staffs s
                                ON d.staff_id = s.staff_id
                            INNER JOIN departments dep
                                ON d.department_id = dep.department_id
                            ORDER BY
                                dep.sort_order
                                , s.name
`;      
// =======================
// 担当医のスケジュール一覧
// =======================
const selectDoctorScheduleByDoctorId = `
                                        SELECT
                                            d.doctor_id
                                            , s.name AS doctor_name
                                            , dep.name AS department_name
                                            , st.day_of_week
                                            , st.start_time
                                            , st.end_time
                                            , st.is_closed
                                        FROM doctors d
                                        INNER JOIN staffs s
                                            ON d.staff_id = s.staff_id
                                        INNER JOIN departments dep
                                            ON d.department_id = dep.department_id
                                        INNER JOIN schedule_templates st
                                            ON d.doctor_id = st.doctor_id
                                        WHERE d.doctor_id = $1
                                        ORDER BY st.day_of_week
`;
// =======================
// 患者の待ち時間を確認
// =======================
const selectPatientWaitTime = `
                                SELECT
                                        r.reservation_id
                                    , p.name AS patient_name
                                    , d.name AS department_name
                                    , s.name AS doctor_name
                                    , r.reservation_date
                                    , r.start_time
                                    , r.end_time
                                    , r.status
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
                                WHERE r.patient_id = $1
                                    AND r.reservation_date = CURRENT_DATE
                                    AND r.status = 'arrived'
`;

// =======================
// 患者情報の更新
// =======================
const updatePatientInfo = `
                            UPDATE patients
                            SET name = $1
                            , name_kana = $2
                            , gender = $3
                            , birth_date = $4
                            , phone = $5
                            , email = $6
                            , postal_code = $7
                            , prefecture = $8
                            , city = $9
                            , address = $10
                            , building = $11
                            , insurer_number = $12
                            , insurer_symbol = $13
                            , insurer_number2 = $14
                            , insurer_branch = $15
                            WHERE patient_id = $16
                            RETURNING patient_id
`;
// =======================
// 患者の来院履歴
// =======================
const selectHistory = `
                        SELECT 
                                  TO_CHAR(r.reservation_date, 'YYYY-MM-DD') AS reservation_date
                                , d.name AS department_name
                                , s.name AS doctor_name
                                , r.start_time
                                , r.end_time
                                , r.visit_type
                        FROM reservations r
                        INNER JOIN patients p
                            ON r.patient_id = p.patient_id
                        INNER JOIN departments d
                            ON r.department_id = d.department_id 
                        INNER JOIN doctors doc
                            ON r.doctor_id = doc.doctor_id
                        INNER JOIN staffs s
                            ON doc.staff_id = s.staff_id
                        WHERE p.patient_id = $1
                        AND r.status = 'prescribed'
                        ORDER BY r.reservation_date DESC

`;
// =======================
// 家族を登録
// =======================
const insertFamily = `
                        INSERT INTO family_members (
                                                      patient_id
                                                    , name
                                                    , name_kana
                                                    , gender
                                                    , birth_date
                                                    , relationship
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
                                                    , NOW()
                                                    , NOW()  
                                                    )  
`;
// =======================
// 家族情報一覧
// =======================
const selectFamily = `
                        SELECT
                              patient_id
                            , name AS patient_name
                            , name_kana
                            , gender
                            , TO_CHAR(birth_date, 'YYYY-MM-DD') AS birth_date
                            , relationship
                        FROM family_members
                        WHERE patient_id = $1
`;

module.exports = {
    selectFamily,
    selectHistory,
    selectAllDoctor,
    selectPatientWaitTime,
    selectPatientInfoByLoginId,
    selectDoctorScheduleByDoctorId,

    insertFamily,

    updatePatientInfo,
};