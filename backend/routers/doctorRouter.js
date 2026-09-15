const express = require("express");
const doctorService = require("../services/doctorService.js");
const router = express.Router();
// =======================
// 自分の診療スケジュール取得 GET
// =======================
router.get("/schedule/self", async (req, res) => {
    try {
        const staffId = req.user?.staffId;
        const doctorId = await doctorService.selectDoctorIdByStaffId(staffId);

        const result = await doctorService.selectDoctorSchedule(doctorId);

        res.status(200).json(result);
    } catch (error) {
        console.error("自分のスケジュール取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 指定医師の診療スケジュール取得 GET
// =======================
router.get("/schedule/:doctorId", async (req, res) => {
    try {
        const { doctorId } = req.params;
        const result = await doctorService.selectDoctorSchedule(doctorId);
        res.status(200).json(result);
    } catch (error) {
        console.error("カレンダー上の医師のスケジュール取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 担当患者を一覧 GET
// =======================
router.get("/assigned", async (req, res) => {
    try {
        const staffId = req.user?.staffId;

        const doctorId = await doctorService.selectDoctorIdByStaffId(staffId);

        const result = await doctorService.selectAssignedPatient(doctorId);

        res.status(200).json(result);
    } catch (error) {
        console.error("担当患者取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});

// =======================
// 各医師の休診日を所得 GET
// =======================
router.get("/holiday", async (req, res) => {
    try {
        const staffId = req.user?.staffId;

        const doctorId = await doctorService.selectDoctorIdByStaffId(staffId);

        const result = await doctorService.selectDoctorHoliday(doctorId);

        res.status(200).json(result);
    } catch (error) {
        console.error("自分の休診日取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 医師のスケジュール更新 PUT
// =======================
router.put("/schedule", async (req, res) => {
    try {
        const staffId = req.user?.staffId;
        const scheduleRows = req.body;

        const result = await doctorService.updateDoctorSchedule(staffId, scheduleRows);

        res.status(200).json(result);
    } catch (error) {
        console.error("医師のスケジュール更新エラー", error);
        res.status(500).json({ error: error.message });
    }
});

// =======================
// 医師の休診日登録 POST
// =======================
router.post("/", async (req, res) => {
    try {
        const holidayData = req.body;

        const result = await doctorService.insertDoctorHoliday(holidayData);

        res.status(201).json({ message: result.message });
    } catch (error) {
        console.error("doctorRouter.jsエラー", error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    };
});

module.exports = router;