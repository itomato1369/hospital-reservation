/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// =======================
// 新規登録
// =======================
const insertPatient = `
                        INSERT INTO patients (
                                                login_id
                                              , password
                                              , name
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
                                              , created_at
                                              , updated_at
                                        ) VALUES (
                                                $1
                                              , $2
                                              , $3
                                              , $4
                                              , $5
                                              , $6
                                              , $7
                                              , $8
                                              , $9
                                              , $10
                                              , $11
                                              , $12
                                              , $13
                                              , $14
                                              , $15
                                              , $16
                                              , $17
                                              , NOW()
                                              , NOW()
                                                )
                                            RETURNING patient_id
                                                    , login_id
                                                    , name
                                                    , created_at
`;

// =======================
// ID重複チェック
// =======================
const existsPatientLoginId = `
                            SELECT login_id
                            FROM patients
                            WHERE login_id = $1
                            LIMIT 1
`;
// =======================
// メールアドレス重複チェック
// =======================
const existsPatientEmail = `
                            SELECT email
                            FROM patients
                            WHERE email = $1
                            LIMIT 1
`;

// =======================
// 当日予約 新規患者を登録
// =======================
const insertSameDayPatient = `
                              INSERT INTO patients (
                                                        name
                                                      , name_kana
                                                      , birth_date
                                                      , phone
                                                      , created_at
                                                      , updated_at
                                                ) 
                                          VALUES (
                                                  $1
                                                , $2
                                                , $3
                                                , $4
                                                , NOW()
                                                , NOW()
                                                )
                                          RETURNING 
                                                    patient_id
                                                    , name
                                                    , name_kana
`;
module.exports = {
    insertPatient,
    insertSameDayPatient,
    
    existsPatientEmail,
    existsPatientLoginId,
};
