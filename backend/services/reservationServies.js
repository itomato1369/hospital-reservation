const reservationMapper = require("../mappers/reservationMapper.js");
// =======================
// 予約機能
// =======================
// =======================
// 患者の家族一覧（ほぼ小児科のために作った機能ですが、拡張性を考慮する）
// =======================
const selectFamilyMembersByPatientId = async (patientId) => {
    if (!patientId) {
        const error = new Error("患者IDが存在しません");
        error.statusCode = 400;
        throw error;
    }

    const result = await reservationMapper.selectFamilyMembersByPatientId(
        patientId
    );
    // family_idがnullである場合　本人
    return result;
};
// =======================
// 診療科一覧
// =======================
const selectDepartment = async () => {
    const result = await reservationMapper.selectDepartment();

    if (result.length === 0) {
        throw new Error("診療科情報が存在しません");
    }
    return result;
};
// =======================
// 診療科に所属する医師一覧
// =======================
const selectDoctorsByDepartmentId = async (departmentId) => {
    if (!departmentId) {
        const error = new Error("診療科IDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    const result = await reservationMapper.selectDoctorsByDepartmentId(
        departmentId
    );

    if (result.length === 0) {
        throw new Error("担当医が存在しません");
    }
    return result;
};
// =======================
// 指定日の予約済み時間取得
// =======================
const countReservationsByDoctorAndTime = async (doctorId, reservationDate) => {
    return await reservationMapper.countReservationsByDoctorAndTime(
        doctorId, reservationDate
    );
};
// =======================
// 予約登録
// =======================
const insertReservation = async (reservationData) => {
    const {
        patientId,
        departmentId,
        familyId,
        doctorId,
        staffId,
        reservationDate,
        startTime,
        endTime,
        visitType 
    } = reservationData;
    // 必須入力チェック
    if (!patientId || !departmentId || !doctorId || !reservationDate || !startTime || !endTime || !visitType) {
        const error = new Error("必須入力項目が未入力です");

        error.statusCode = 400;
        throw error;
    }
    // 重複チェック
    const countDuplicateReservation = 
        await reservationMapper.countReservationsByDoctorAndTime(
            doctorId,
            reservationDate,
            startTime
        );
        if (Number(countDuplicateReservation[0].count > 0)) {
            const error = new Error("既に予約済みの時間帯です");

            error.statusCode = 400;
            throw error;
        }
        // 予約データ
        const values = [
            patientId,
            departmentId,
            familyId,
            doctorId,
            staffId,
            reservationDate,
            startTime,
            endTime,
            visitType
        ];
        // データベースに登録
        const result = await reservationMapper.insertReservation(
            values
        );
        
        return {
            message: "予約が正常に完了しました",
            reservationId: result[0]?.reservation_id
        };
};
// =======================
// 予約キャンセル
// =======================
const updateReservationStatusCancelled = async (reservationId) => {
    if (!reservationId) {
        const error = new Error("予約IDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    
    await reservationMapper.updateReservationStatusCancelled(
        reservationId
    );

    return {
        message: "予約をキャンセルしました"
    };
};
// =======================
// 医師の休診日
// =======================
const selectDoctorHoliday = async (doctorId) => {
    if (!doctorId) {
        throw new Error("doctorIDとreservationDateが必要です");
    }
    const result = await reservationMapper.selectDoctorHoliday(
        doctorId
    );
    return result;
};
// =======================
// 予約可能時間帯取得
// =======================
const selectAvailableTimeSlot = async (doctorId, reservationDate) => {
    if (!doctorId) {
        throw new Error("doctorIDがありません");
    }
    if (!reservationDate) {
        throw new Error("予約日がありません");
    }
    return await reservationMapper.selectAvailableTimeSlot(
        doctorId,
        reservationDate
    );
};
// =======================
// 病院休診日取得
// =======================
const selectClinicHoliday = async () => {
    return await reservationMapper.selectClinicHoliday();
};
// =======================
// 予約確認
// =======================
const selectReservationById = async (patientId) => {
    if (!patientId) {
        const error = new Error("患者のIDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    const result = await reservationMapper.selectReservationById(patientId);
    return result;
};


module.exports = {
    selectDepartment,
    selectClinicHoliday,
    selectDoctorHoliday,
    selectReservationById,
    selectAvailableTimeSlot,
    selectDoctorsByDepartmentId,
    selectFamilyMembersByPatientId,

    insertReservation,
    updateReservationStatusCancelled,
    countReservationsByDoctorAndTime,
};