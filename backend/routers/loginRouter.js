const express = require("express");
const router = express.Router();
const loginService = require("../services/loginService.js");
// =======================
// ログイン POST
// =======================
router.post("/", async (req, res) => {
    try {
        const { loginId, password } = req.body;

        const user = await loginService.login(
            loginId,
            password
        );

        res.status(200).json(user);

    } catch (error) {
        console.error("ログインエラー", error);

        res.status(401).json({
            error: error.message
        });
    }
});

router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const user = await loginService.refreshAccessToken(refreshToken);

        res.status(200).json(user);
    } catch (error) {
        console.error("リフレッシュトークンエラー", error);

        res.status(401).json({
            error: error.message
        });
    }
});

module.exports = router;