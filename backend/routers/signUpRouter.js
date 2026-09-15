/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// vue.jsからHTTPリクエストをもらう
// signUpService.jsにDBを呼び出す
const express = require("express");
const https = require("https");
const signUpService = require("../services/signUpService.js");
const { sign } = require("jsonwebtoken");
const router = express.Router();
// =======================
// ID重複チェック GET
// =======================
router.get("/idcheck", async (req, res) => {
    try {
        const { loginId } = req.query;
        if (!loginId) {
            return res.status(400)
                      .json({ error: "loginIdが必要です"});
        }
        const exists = await signUpService.existsPatientLoginId(loginId);
        res.status(200).json({ exists });              
    } catch (error) {
        console.error("ID重複チェックエラー", error);
        res.status(500).json({ error: message });
    }
});
// =======================
// メールアドレス重複チェック GET
// =======================
router.get("/emailcheck", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400)
                      .json({ error: "emailが必要です"});
        }
        //console.log(req.query);
       // console.log("email =", email);

        const exists = await signUpService.existsPatientEmail(email);
        //console.log(exists);    
        res.status(200).json({ exists });              
    } catch (error) {
        console.error("メールアドレス重複チェックエラー", error);
        res.status(500).json({ error: message });
    }
});
// =======================
// 郵便番号検索プロキシ (zipcloud)
// フロントから直接外部 API を呼ばず、バックエンド経由で取得する
// これによりブラウザの CORS 制約を回避する
// =======================
router.get("/zipcode", async (req, res) => {
    try {
        const { zipcode } = req.query;
        if (!zipcode) {
            return res.status(400).json({ error: "zipcode is required" });
        }

        const targetUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${encodeURIComponent(String(zipcode))}`;

        https.get(targetUrl, (proxyRes) => {
            let body = "";
            proxyRes.on("data", (chunk) => {
                body += chunk;
            });
            proxyRes.on("end", () => {
                try {
                    const parsed = JSON.parse(body);
                    res.status(200).json(parsed);
                } catch (e) {
                    console.error("zipcode proxy parse error", e);
                    res.status(502).json({ error: "Invalid response from zipcode service" });
                }
            });
        }).on("error", (err) => {
            console.error("zipcode proxy request error", err);
            res.status(502).json({ error: "Failed to fetch zipcode service" });
        });

    } catch (error) {
        console.error("zipcode proxy error", error);
        res.status(500).json({ error: message });
    }
});
// =======================
// 当日予約の新規登録　POST
// =======================
router.post("/same-day", async (req, res) => {
    try {
        const samdDayData = req.body;
        console.log("入力項目", samdDayData);
        // 当日、新規登録
        const result = await signUpService.insertSameDayPatient(samdDayData);
        res.status(201).json({
            message: result.message,
            patientId: result.patientId
        });
    } catch (error) {
        console.error("当日の新規登録でのエラー", error.message);
        // カスタムエラー処理
        res.status(500).json({ error: error.message });
    }
});

// =======================
// 新規登録　POST
// =======================
router.post("/", async (req, res) => {
   try {
    // ログを残す
    const signUpData = req.body;
    console.log("新規登録リクエスト", { loginId: signUpData.loginId });
    // 新規登録する関数
    const result = await signUpService.insertPatient(signUpData);
    // レスポンス
    res.status(201).json({
        message: result.message,
        user: result.user,
    });
   } catch (error) {
    console.error("signUpRouter.jsエラー", error.message);
    // カスタムエラー処理
    res.status(500).json({ error: error.message });
   };
});
// これがないとindex.js
// TypeError: Router.use() requires a middleware function but got a Object エラー
module.exports = router;