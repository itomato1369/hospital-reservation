/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// =======================
// ログイン
// =======================
const selectPatinetByLoginId = `
                    SELECT
                            patient_id
                          , name  
                          , login_id
                          , password
                    FROM patients
                    WHERE login_id = $1
                    LIMIT 1
`;
// =======================
// ログイン
// =======================
const selectStaffByLoginId = `
                    SELECT
                          s.staff_id
                        , s.name  
                        , s.login_id
                        , s.password
                        , c.code_value AS role
                    FROM staffs s
                    JOIN common_codes c
                        ON c.code_value = s.role
                    WHERE s.login_id = $1
                    LIMIT 1

`;                

module.exports = {
    selectStaffByLoginId,
    selectPatinetByLoginId,
};