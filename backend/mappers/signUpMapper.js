/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// mapperはこのSQLクエリ文を実行してくださいと
// databaseにリクエスト
const database = require("../database/database.js");
// =======================
// ID重複チェック
// =======================
const existsPatientLoginId = async (loginId) => {
   // console.log("signUpMapper");
   // console.log(data);
    return await database.query("existsPatientLoginId", [loginId]);
};
// =======================
// メールアドレス重複チェック
// =======================
const existsPatientEmail = async (email) => {
  //  console.log("signUpMapper");
   // console.log(data);
   // パラメータが一つである場合はこのように
    return await database.query("existsPatientEmail", [email]);
};
// =======================
// 新規登録
// =======================
const insertPatient = async (values) => {
    return await database.query("insertPatient", values);
};
// =======================
// 当日予約 新規患者を登録
// =======================
const insertSameDayPatient = async (values) => {
    return await database.query("insertSameDayPatient", values);
};

module.exports = {
    insertPatient,
    insertSameDayPatient,
    
    existsPatientEmail,
    existsPatientLoginId,
};