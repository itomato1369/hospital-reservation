// ================================
// 分離したSQL クエリ文をまとめる
// ================================
const login = require("../sqls/login.js");
const nurse = require("../sqls/nurse.js");
const doctor = require("../sqls/doctor.js");
const signUp = require("../sqls/signUp.js");
const patient = require("../sqls/patient.js");
const reservation = require("../sqls/reservation.js");

module.exports = {
    ...signUp,
    ...login,
    ...patient,
    ...reservation,
    ...nurse,
    ...doctor,
};