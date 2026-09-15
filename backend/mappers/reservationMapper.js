const database = require("../database/database.js");
// =======================
// 予約機能
// =======================
// =======================
// 患者の家族一覧（ほぼ小児科のために作った機能ですが、拡張性を考慮する）
// =======================
const selectFamilyMembersByPatientId = async (patientId) => {
    return await database.query("selectFamilyMembersByPatientId", [patientId]);
};
// =======================
// 診療科一覧
// =======================
const selectDepartment = async () => {
    return await database.query("selectDepartment", []);
};
// =======================
// 診療科に所属する医師一覧
// =======================
const selectDoctorsByDepartmentId = async (departmentId) => {
    return await database.query("selectDoctorsByDepartmentId", [departmentId]);
};
// =======================
// 指定日の予約済み時間取得
// =======================
const selectReservedTimeSlot = async (doctorId, reservationDate) => {
    return await database.query("selectReservedTimeSlot", [doctorId, reservationDate]);
};
// =======================
// 予約重複チェック、バリデーションん
// =======================
const countReservationsByDoctorAndTime = async (doctorId, reservationDate, startTime) => {
    return await database.query("countReservationsByDoctorAndTime", [doctorId, reservationDate, startTime]);
};
// =======================
// 予約登録
// =======================
const insertReservation = async (values) => {
    return await database.query("insertReservation", values);
};
// =======================
// 予約キャンセル
// =======================
const updateReservationStatusCancelled = async (reservationId) => {
    return await database.query("updateReservationStatusCancelled", [reservationId]);
};
// =======================
// 病院休診日
// =======================
const selectClinicHoliday = async () => {
    return await database.query("selectClinicHoliday", []);
};
// =======================
// 医師の休診日
// =======================
const selectDoctorHoliday = async (doctorId) => {
    return await database.query("selectDoctorHoliday", [doctorId]);
};
// =======================
// 病院休診日取得
// =======================
const selectAvailableTimeSlot = async (doctorId, reservationDate) => {
    return await database.query("selectAvailableTimeSlot", [doctorId, reservationDate]);
};
// =======================
// 予約確認
// =======================
const selectReservationById = async (patientId) => {
    return await database.query("selectReservationById", [patientId]);
};

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
}