// postgreSQLに接続するモジュール
const { Pool } = require("pg");
const sqlList = require("./sqlList.js");

const connectionPool = new Pool({
    // DB接続情報
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    // connectionLimit
    max: 3,
    // postgreSQLはクエリ文にある '$1'を自動変換
    connectionTimeoutMillis: 10000,
});

// SQLクエリ文を実行する関数
const query = async (alias, values) => {
    // alias : 各テーブル別に実行するSQLクエリ文、変数
    // values : SQLクエリ文の中の ?
    // postgreSQLのplaceholderは $1 $2 $3 $4 $5のように
    // connectionPoolを基にSQLクエリ文を実行する
    // Promise方法
    const conn = await connectionPool.connect();
    try {
        // connectionPoolからConnectionオブジェクトを持ってくる
        // SQLを選択
        const executeSql = sqlList[alias];
        // ================================
        // デバッグ用　   ログ
        // ================================
        console.log("=================================");
        console.log("SQL START");
        console.log(`Alias : ${alias}`);
        console.log(`Time : ${new Date().toLocaleString("ja-JP")}`);
        console.log(`実行するSQL`);
        console.log(executeSql);
        console.log(`Params : `, values);
        console.log("=================================");
        const startTime = Date.now();
        // result
        const result = await conn.query(executeSql, values);
        // 処理時間
        const elapsed = Date.now() - startTime;

        // SQL結果
        console.log(`[DB] ${alias} | ${elapsed}ms | rows=${result.rowCount}`);
        return result.rows;

    } catch (error) {
        // ================================
        // デバッグ用　   ログ
        // ================================
        console.error("❌SQL ERROR");
        console.error(`Alias : ${alias}`);
        console.error(`Message : ${error.message}`);
        console.error(`Params : `, values);

        throw error;
        
    } finally {
        //　必ずrelease
        conn.release();
    }
};

module.exports = {
    query,
    connectionPool,
};