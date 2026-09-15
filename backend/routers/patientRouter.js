const express = require("express");
const router = express.Router();
const patientService = require("../services/patientService.js");
// =======================
// 患者の情報を取得 GET
// =======================
router.get("/info/:loginId", async (req, res) => {
        try {
            const result =
                await patientService.selectPatientInfoByLoginId(
                    req.params.loginId
                );
            res.status(200).json(result);

        } catch (error) {
            console.error("患者情報を取得エラー", error);
            res.status(500).json({ error: error.message });

        }
    }
);
// =======================
// 患者の来院記録を取得 GET
// =======================
router.get("/history/:patientId", async (req, res) => {
   try {
        const result = await patientService.selectHistory(
        req.params.patientId
    );
        res.status(200).json(result);

   } catch (error) {
    console.error("来院情報を取得エラー", error);
    res.status(500).json({ error: error.message });    
   } 
});
// =======================
// 患者の家族情報を取得 GET
// =======================
router.get("/family/:patientId", async (req, res) => {
    try {
        const result = await patientService.selectFamily(
            req.params.patientId
        );
        console.log("ファミリ情報", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("家族情報を取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 担当医のスケジュール閲覧 GET
// =======================
router.get("/doctor-schedule/:doctorId", async (req, res) => {
    try {
        const result = await patientService.selectDoctorScheduleByDoctorId(
            req.params.doctorId
        );
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error("担当医スケジュールエラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 患者の待ち時間を確認 GET
// ======================
router.get("/wait/:patientId", async (req, res) => {
    try {
        const result = await patientService.selectPatientWaitTime(
            Number(req.params.patientId)
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("待ち時間取得エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 家族を登録 POST
// =======================
router.post("/family", async (req, res) => {
    try {
        const familyData = req.body;
        console.log("家族登録の情報", familyData);

        const result = await patientService.insertFamily(familyData);

        res.status(200).json(result);
    } catch (error) {
        console.error("家族登録エラー", error);
        res.status(500).json({ error: error.message });
    }
});

// =======================
// 患者情報の更新 PUT
// =======================
router.put("/info", async (req, res) => {
    try {
        const patientId = req.user?.patientId;
        if (!patientId) {
            return res.status(401).json({ error: "認証が必要です" });
        }

        const result = await patientService.updatePatientInfo(
            patientId,
            req.body
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("患者情報更新エラー", error);
        res.status(500).json({ error: error.message });
    }
});
// =======================
// 担当医一覧情報を取得 GET
// =======================
router.get("/doctors", async (req, res) => {
    try {
        const result = await patientService.selectAllDoctor();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error("担当医一覧routerエラー", error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
