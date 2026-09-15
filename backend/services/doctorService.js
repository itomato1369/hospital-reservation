const doctorMapper = require("../mappers/doctorMapper.js");
// =======================
// 医師の休診日登録
// =======================
const insertDoctorHoliday = async (holidayData) => {
    const {
        doctor_id,
        holiday_date,
        reason
    } = holidayData;

    if (!doctor_id || !holiday_date || !reason) {
        const error = new Error("必要入力する項目が未入力です");
        error.statusCode = 400;
        throw error;
    }

    const values = [
        doctor_id,
        holiday_date,
        reason
    ];
    try {
        await doctorMapper.insertDoctorHoliday(values);
    } catch (error) {
        if (error?.code === "23505") {
            const uniqueError = new Error("同じ日付の休診日は既に登録されています。");
            uniqueError.statusCode = 409;
            throw uniqueError;
        }
        throw error;
    }

    return {
        message: "休診日登録が正常に完了"
    };
};

// =======================
// staffId から doctorId を取得
// =======================
const selectDoctorIdByStaffId = async (staffId) => {
    if (!staffId) {
        const error = new Error("staffIdが存在しません");
        error.statusCode = 400;
        throw error;
    }

    const result = await doctorMapper.selectDoctorByStaffId(staffId);
    if (!result || result.length === 0) {
        const error = new Error("医師情報が見つかりません");
        error.statusCode = 404;
        throw error;
    }

    return result[0].doctor_id;
};

// =======================
// 医師のスケジュール一覧
// ======================= 
const selectDoctorSchedule = async (doctorId) => {
    if (!doctorId) {
        const error = new Error("医師IDが存在しません");
        error.statusCode = 400;
        throw error;
    }

    const result = await doctorMapper.selectDoctorSchedule(doctorId);

    return result;
};
// =======================
// 医師のスケジュール更新
// ======================= 
const updateDoctorSchedule = async (staffId, scheduleRows) => {
    const doctorId = await selectDoctorIdByStaffId(staffId);

    if (!Array.isArray(scheduleRows) || scheduleRows.length === 0) {
        const error = new Error("スケジュール情報が正しくありません");
        error.statusCode = 400;
        throw error;
    }

    const updatedRows = [];
    for (const item of scheduleRows) {
        const { day_of_week, start_time, end_time, is_closed } = item;

        if (day_of_week == null || is_closed == null) {
            continue;
        }

        const values = [
            item.is_closed ? null : start_time || null,
            item.is_closed ? null : end_time || null,
            is_closed,
            doctorId,
            day_of_week,
        ];
        const result = await doctorMapper.updateDoctorSchedule(values);
        updatedRows.push(...result);
    }

    return {
        message: "スケジュールを更新しました",
        updatedRows,
    };
};
// =======================
// 各医師の休診日を取得
// =======================
const selectDoctorHoliday = async (doctorId) => {
    if (!doctorId) {
        const error = new Error("医師IDが存在しません");
        error.statusCode = 400;
        throw error;
    }
    const result = await doctorMapper.selectDoctorHoliday(doctorId);

    return result;
};
// =======================
// 担当患者一覧
// =======================
const selectAssignedPatient = async (doctorId) => {
    const result = await doctorMapper.selectAssignedPatient(doctorId);

    return result;
};

module.exports = {
    selectDoctorHoliday,
    selectDoctorSchedule,
    selectAssignedPatient,
    selectDoctorIdByStaffId,

    insertDoctorHoliday,
    updateDoctorSchedule,
};
