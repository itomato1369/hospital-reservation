const express = require("express");
const router = express.Router();
const nurseService = require("../services/nurseService.js");
// =======================
// 今日の予約一覧 GET
// =======================
router.get("/today", async (req, res) => {
    try {
        const result = await nurseService.selectTodayReservation();
        
        res.status(200).json(result);
    } catch (error) {
        console.error("今日の予約取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 患者の来院履歴を検索 GET
// =======================
router.get("/history", async (req, res) => {
    try {
        const result = await nurseService.selectPatient(req.query);

        console.log("患者の来院履歴", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("来院履歴の取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 予約ステータスを変更する PUT
// =======================
router.put("/change-status", async (req, res) => {
    try {
        const { status, reservationId } = req.body;

        if (!status || !reservationId) {
            return res.status(400)
                      .json({ error: "statusとreservationIdが必要です" });
        }

        console.log("予約ステータス変更リクエスト", status, reservationId);
        const result = await nurseService.updateReservationStatus(
            status,
            reservationId
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("予約ステータス変更エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 待ち時間でのステータスが来院である患者 GET
// =======================
router.get("/wait", async (req, res) => {
    try {
        const result = await nurseService.selectWaitTime();

        res.status(200).json(result);
    } catch (error) {
        console.error("待ち時間取得エラー", error);
        res.status(500).json({ error: error.message });
    }

});

// =======================
// 待ち時間を更新する PUT
// =======================
router.put("/wait-time", async (req, res) => {
    try {
        const { reservationId, waitMinutes } = req.body;

        if (!reservationId || waitMinutes == null) {
            return res.status(400)
                      .json({ error: "reservationIdとwaitMinutesが必要です" });
        }

        const result = await nurseService.updateWaitTime(
            reservationId,
            waitMinutes
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("待ち時間更新エラー", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;