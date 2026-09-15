/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// バックエンドエントリポイント
console.log("------index.jsを読み込み------");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
// .envファイルを読み取る
dotenv.config({ path: "./dbconfig.env"});
dotenv.config({ path: "./token.env"});
dotenv.config();
// node.js expressサーバー
const app = express();
const port = process.env.PORT;
// ==========================
// ミドルウェア
app.use(cors());
// フォーム送信やJSONデータを受け取るため
// HTMLフォームから送られたデータ
// 例）name=山田&age=26
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// JWT認証
const authMiddleware = require("./middleware/authMiddleware.js");

// ==========================
// 変数名 apiPathとして初期化
let apiPath = "";
if (process.argv.includes("prod")) {
    apiPath = "/api";
};
// ここでexpressは「このファイルはrouterである」と理解する
// 各 routerファイルで module.exports = router;
// pathが長い順
// 予約
const reservationRouter = require("./routers/reservationRouter.js");
// 患者
const patientRouter = require("./routers/patientRouter.js");
// 看護師・受付
const nurseRouter = require("./routers/nurseRouter.js");
// 医師
const doctorRouter = require("./routers/doctorRouter.js");
// 新規登録
const signUpRouter = require("./routers/signUpRouter.js");
// ログイン
const loginRouter = require("./routers/loginRouter.js");

// REST API 
// ↓
// cors()
// ↓
// express.json()
// ↓
// authMiddleware
// ↓
// Router
app.use(`${apiPath}/login`, loginRouter);
app.use(`${apiPath}/register`, signUpRouter);
app.use(`${apiPath}/doctor`, authMiddleware, doctorRouter);
app.use(`${apiPath}/nurse`, authMiddleware, nurseRouter);
app.use(`${apiPath}/patient`, authMiddleware, patientRouter);
app.use(`${apiPath}/reservation`, authMiddleware, reservationRouter);

console.log("[index.js] Server process Starting...");
app.listen(port, () => {
console.log("╔═════════════════════════════════════════════════════╗");
console.log("║     🏥 SAKURA Medical Reservation API Server        ║");
console.log("╚═════════════════════════════════════════════════════╝");

console.log(`   NODE_ENV : ${process.env.NODE_ENV || "development"}`);
console.log(`   PORT     : ${process.env.PORT}`);
console.log(`   API PATH : ${apiPath || "/"}`);

console.log("🗄️ PostgreSQL Connection Pool");
console.log(`HOST : ${process.env.DB_HOST}`);
console.log(`PORT : ${process.env.DB_PORT}`);
console.log(`DB   : ${process.env.DB_DATABASE}`);
console.log(`POOL : ${3}`);
});