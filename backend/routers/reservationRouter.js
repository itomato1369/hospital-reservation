const express = require("express");
const router = express.Router();
const reservationService = require("../services/reservationServies.js");
// =======================
// 家族一覧取得 GET
// =======================
router.get("/family", async (req, res) => {
    try {
        const { patientId } = req.query;

        if (!patientId) {
            return res.status(400)
                      .json({ error: "patientIdが必要です" });
        }
        const result = await reservationService.selectFamilyMembersByPatientId(patientId);

        res.status(200).json(result);
    } catch (error) {
        console.error("家族一覧取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 診療科一覧 GET
// =======================
router.get("/department", async (req, res) => {
    try {
        const result = await reservationService.selectDepartment();

        res.status(200).json(result);
    } catch (error) {
        console.error("診療科取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 診療科に所属する医師一覧 GET
// =======================
router.get("/doctor", async (req, res) => {
    try {
        const { departmentId } = req.query;
        if (!departmentId) {
            return res.status(400)
                      .json({ error: "departmentIdが必要です" });
        }
        const result = await reservationService.selectDoctorsByDepartmentId(departmentId);
        res.status(200).json(result);
    } catch (error) {
        console.error("担当医一覧取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 指定日の予約済み時間取得
// =======================
router.get("/timeslot", async (req, res) => {
    try {
        const { doctorId, reservationDate } = req.query;

        if (!doctorId || !reservationDate) {
            return res.status(400)
                      .json({ error: "doctorIdとreservationDateが必要です" });
        }

        const result = await reservationService.countReservationsByDoctorAndTime(doctorId, reservationDate);
        res.status(200).json(result);
    } catch (error) {
        console.error("予約済み時間取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 各医師の休診日
// =======================
router.get("/doctor-holiday", async (req, res) => {
    try {
        const { doctorId } = req.query;

        const result = await reservationService.selectDoctorHoliday(doctorId);

        res.status(200).json(result);
    } catch (error) {
        console.error("予約可能日判定エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 予約可能時間帯取得
// =======================
router.get("/available-timeslot", async (req, res) => {
    try {
        console.log(req.query);

        const { doctorId, reservationDate } = req.query;

        const result = await reservationService.selectAvailableTimeSlot(
            doctorId,
            reservationDate
        );
        console.log("doctorid", doctorId);
        console.log("reservationDate", reservationDate);

        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error("時間帯取得エラー", error);
        res.status(500).json({ error: error.message });
    }
    
});
// =======================
// 予約確認
// =======================
router.get("/confirm/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        if (!patientId) {
            console.log("patientIdがありません");
            return res.status(400)
                      .json({ error: "patientIdが必要です" });
        }
        const result = await reservationService.selectReservationById(patientId);
        res.status(200).json(result);

    } catch (error) {
        console.error("予約確認エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 病院休診日取得 GET
// =======================
router.get("/clinic-holiday", async (req, res) => {
    try {
        const result = await reservationService.selectClinicHoliday();
        
        res.status(200).json(result);
    } catch {
        console.error("病院休診日取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 予約キャンセル　PUT  summer time lander
// =======================
router.put("/cancel/:reservationId", async (req, res) => {
    try {
        const { reservationId } = req.params;
        console.log("予約キャンセルリクエスト", reservationId);
        
        const result = await reservationService.updateReservationStatusCancelled(reservationId);
        res.status(200).json(result);
    } catch (error) {
        console.error("予約キャンセルエラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 予約登録 POST
// =======================
router.post("/", async (req, res) => {
    try {
        const reservationData = req.body;
        console.log("予約登録リクエスト", reservationData);

        const result = await reservationService.insertReservation(reservationData);

        res.status(201).json(result);
    } catch (error) {
        console.error("予約登録エラー", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;