const database = require("../database/database.js");
// =======================
// ログイン　患者
// =======================
const selectPatinetByLoginId = async (loginId) => {
    return await database.query("selectPatinetByLoginId", [loginId]);
};
// =======================
// ログイン　病院
// =======================
const selectStaffByLoginId = async (loginId) => {
    return await database.query("selectStaffByLoginId", [loginId]);
};

module.exports = {
    selectStaffByLoginId,
    selectPatinetByLoginId,
};