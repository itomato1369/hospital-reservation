const database = require("../database/database.js");
// =======================
// mappersに業務ロジックを持たせない
// =======================

// =======================
// 患者の情報を取得
// =======================
const selectPatientInfoByLoginId = async (loginId) => {
    return await database.query("selectPatientInfoByLoginId", [loginId]);
};
// =======================
// 担当医一覧
// =======================
const selectAllDoctor = async () => {
    return await database.query("selectAllDoctor", []);
    // 全体SELECTなのでパラメータがない
};
// =======================
// 担当医のスケジュール閲覧
// =======================
const selectDoctorScheduleByDoctorId = async (doctorId) => {
    return await database.query("selectDoctorScheduleByDoctorId", [doctorId]);
};
// =======================
// 患者の待ち時間を確認
// =======================
const selectPatientWaitTime = async (patientId) => {
    return await database.query("selectPatientWaitTime", [patientId]);
};
// =======================
// 家族の情報を取得
// =======================
const selectFamily = async (patientId) => {
    return await database.query("selectFamily", [patientId]);
};
// =======================
// 患者情報の更新
// =======================
const updatePatientInfo = async (
    patientId,
    patientData
) => {
    const values = [
        patientData.name,
        patientData.nameKana,
        patientData.gender,
        patientData.birthDate,
        patientData.phone,
        patientData.email,
        patientData.postalCode,
        patientData.prefecture,
        patientData.city,
        patientData.address,
        patientData.building,
        patientData.insurerNumber,
        patientData.insurerSymbol,
        patientData.insurerNumber2,
        patientData.insurerBranch,
        patientId,
    ];
    return await database.query("updatePatientInfo", values);
};
// =======================
// 患者の来院履歴
// =======================
const selectHistory = async (patientId) => {
    return await database.query("selectHistory", [patientId]);
};
// =======================
// 家族を登録
// =======================
const insertFamily = async (values) => {
    return database.query("insertFamily", values);
};

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