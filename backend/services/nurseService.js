const nurseMapper = require("../mappers/nurseMapper.js");
// =======================
// 今日の予約一覧
// 今日の予約がない場合もあるのでエラーとしない
// =======================
const selectTodayReservation = async () => {
    const result = await nurseMapper.selectTodayReservation();

    return result;
};
// =======================
// 予約ステータスを変更する
// =======================
const updateReservationStatus = async (status, reservationId) => {
    if (!reservationId) {
        const error = new Error("予約IDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    await nurseMapper.updateReservationStatus(
        status,
        reservationId
    );

    return {
        message: "予約ステータスが変更されました"
    };
};
// =======================
// 待ち時間を更新する
// =======================
const updateWaitTime = async (reservationId, waitMinutes) => {
    if (!reservationId) {
        const error = new Error("予約IDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    if (waitMinutes == null || waitMinutes < 0) {
        const error = new Error("待ち時間が不正です");
        error.statusCode = 400;
        throw error;
    }

    await nurseMapper.updateWaitTime(reservationId, waitMinutes);

    return {
        message: "待ち時間が設定されました"
    };
};
// =======================
// 待ち時間でのステータスが来院である患者一覧
// =======================
const selectWaitTime = async () => {
    const result = await nurseMapper.selectWaitTime();

    if (result.length === 0) {
        throw new Error("待ち時間の情報が存在しません");
    }
    return result;
};
// =======================
// 患者の来院履歴を検索
// =======================
const selectPatient = async (query) => {
    const {
        patientName,
        phone,
        departmentId,
        reservationDate,
        status
    } = query;

    // null可能
    const result = await nurseMapper.selectPatient([
        patientName || null,
        phone || null,
        departmentId || null,
        reservationDate || null,
        status || null
    ]);

    return result;
};

module.exports = {
    selectPatient,
    selectWaitTime,
    selectTodayReservation,

    updateWaitTime,
    updateReservationStatus,
};