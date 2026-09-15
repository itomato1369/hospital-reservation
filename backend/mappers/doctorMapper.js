const database = require("../database/database.js");
// =======================
// 医師の休診日登録
// =======================
const insertDoctorHoliday = async (values) => {
    return await database.query("insertDoctorHoliday", values);
};
// =======================
// 医師のIDを取得
// ======================= 
const selectDoctorByStaffId = async (staffId) => {
    return await database.query("selectDoctorByStaffId", [staffId]);
};
// =======================
// 医師のスケジュール一覧
// ======================= 
const selectDoctorSchedule = async (doctorId) => {
    return await database.query("selectDoctorSchedule", [doctorId]);
};
// =======================
// 医師のスケジュール更新
// ======================= 
const updateDoctorSchedule = async (values) => {
    return await database.query("updateDoctorSchedule", values);
};
// =======================
// 各医師の休診日を取得
// =======================
const selectDoctorHoliday = async (doctorId) => {
    return await database.query("selectDoctorHoliday", [doctorId]);
};
// =======================
// 担当患者一覧
// =======================
const selectAssignedPatient = async (doctorId) => {
    return await database.query("selectAssignedPatient", [doctorId]);
};
module.exports = {
    selectDoctorHoliday,
    selectDoctorSchedule,
    selectAssignedPatient,
    selectDoctorByStaffId,

    updateDoctorSchedule,
    insertDoctorHoliday,
};