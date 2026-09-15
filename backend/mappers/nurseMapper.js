const database = require("../database/database.js");
// =======================
// 今日の予約一覧
// =======================
const selectTodayReservation = async () => {
    return await database.query("selectTodayReservation", []);
};
// =======================
// 予約ステータスを変更する
// =======================
const updateReservationStatus = async (status, reservationId) => {
    return await database.query("updateReservationStatus", [status, reservationId]);
};
// =======================
// 待ち時間でのステータスが来院である患者一覧
// =======================
const selectWaitTime = async () => {
    return await database.query("selectWaitTime", []);
};
// =======================
// 待ち時間を更新する
// =======================
const updateWaitTime = async (reservationId, waitMinutes) => {
    return await database.query("updateWaitTime", [waitMinutes, reservationId]);
};
// =======================
// 患者の来院履歴を検索
// =======================
const selectPatient = async (values) => {
    return await database.query("selectPatient", values);
};

module.exports = {
    selectPatient,
    selectWaitTime,
    selectTodayReservation,

    updateWaitTime,
    updateReservationStatus,
};