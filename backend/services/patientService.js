const patientMapper = require("../mappers/patientMapper.js");
// =======================
// 患者の情報取得
// =======================
const selectPatientInfoByLoginId = async (loginId) => {
    const result = await patientMapper.selectPatientInfoByLoginId(loginId);

    if (result.length === 0) {
        throw new Error("患者情報が存在しません");
    }
    //console.log("result", result)
    //console.log("result配列", result[0]);
    
    return result[0];
};
// =======================
// 担当医一覧
// =======================
const selectAllDoctor = async () => {
    const result = await patientMapper.selectAllDoctor();

    if (result.length === 0) {
        throw new Error("担当医が存在しません");
    }
    console.log(result);
    return result;

};
// =======================
// 担当医のスケジュール閲覧
// =======================
const selectDoctorScheduleByDoctorId = async (doctorId) => {
    const result = await patientMapper.selectDoctorScheduleByDoctorId(doctorId);

    if (result.length === 0) {
        throw new Error("スケジュールが存在しません");
    }
    console.log(result);
    return result;
};
// =======================
// 患者の待ち時間を確認
// =======================
const selectPatientWaitTime = async (patientId) => {
    const result = await patientMapper.selectPatientWaitTime(patientId);
    return result;
};
// =======================
// 家族の情報を取得
// =======================
const selectFamily = async (patientId) => {
    const result = await patientMapper.selectFamily(patientId);
    return result;
};
// =======================
// 患者情報の更新
// =======================
const updatePatientInfo = async (patientId, patientData) => {
    const result = await patientMapper.updatePatientInfo(
        patientId,
        patientData
    );

    if (result.length === 0) {
        throw new Error("患者情報の更新に失敗しました");
    }
    return result[0];
};
// =======================
// 患者の来院履歴
// =======================
const selectHistory = async (patientId) => {
    const result = await patientMapper.selectHistory(patientId);

    if (result.length === 0) {
        throw new Error("来院記録が存在しません");
    }
    return result;
};
// =======================
// 家族を登録
// =======================
const insertFamily = async (familyData) => {
    const {
        patientId,
        name,
        nameKana,
        gender,
        birthDate,
        relationship
    } = familyData;
    // 必須項目チェック
    if (!patientId || !name || !nameKana || !gender || !birthDate || !relationship) {
        const error = new Error("必須入力する項目が未入力です");
        error.statusCode = 400;
        throw error;    
    }

    // データベースへのINSERT
    const values = [
        patientId,
        name,
        nameKana,
        gender,
        birthDate,
        relationship
    ];

    await patientMapper.insertFamily(values);
    // レスポンス
    return {
        message: "家族登録が正常に完了"
    };
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
