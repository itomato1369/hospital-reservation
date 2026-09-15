/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
/**
 * JWT認証ミドルウェア
 * ログイン成功時に発行されたJWTを検証する
 * 
 * フロントエンドから送信された
 * Authorization: Bearer xxxxxを取得し
 * JWTが正しい場合のみ
 * 次の処理へ進ませる
 * JWTが存在しない、または改ざんされている場合は
 * 401　Unauthorizedを返却
 */
const jwt = require("jsonwebtoken");

const accessSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    /**
     * Authorizaiton ヘッダー取得
     * フロントエンドから送信される値
     * Authorization:
     * Bearer eyJhbGc...
     */
    const authHeader = req.headers.authorization;
    console.log("[Auth HEADER", authHeader);
    // JWT未送信
    if (!authHeader) {
        return res.status(401)
                  .json({ error: "認証が必要です" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    try {
        /**
         * JWT検証
         * token.envの JWT_SECRETを利用してJWTが正しいかチェックする
         * JWT Payload返却
         */
        const decoded = jwt.verify(
            token,
            accessSecret
        );
        /**
         * 認証済みユーザー情報を保存
         * Router以降で利用できるように
         * req.userへ格納する
         * req.user.loginId
         * req.user.userType
         * ...
         */
        req.user = decoded;
        // 次のミドルウェアまたはRouterへ
        next();
    } catch (error) {
        /**
         * JWT検証失敗
         * トークン改ざん
         * 有効期限切れ
         * JWT_SECRET不一致
         */
        return res.status(401)
                  .json({ error: "無効なトークンです" });
    }
};

module.exports = authMiddleware;