/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// business 
const signUpMapper = require("../mappers/signUpMapper.js");
// パスワードのハッシュ化
const bcrypt = require("bcryptjs");
// =======================
// ID重複チェック
// =======================
const existsPatientLoginId = async (loginId) => {
    const rows = await signUpMapper.existsPatientLoginId(loginId);
    return rows.length > 0;
};
// =======================
// メールアドレス重複チェック
// =======================
const existsPatientEmail = async (email) => {
    const rows = await signUpMapper.existsPatientEmail(email);
    //console.log
    //console.log(rows);
    return rows.length > 0;
};
// =======================
// 新規登録
// =======================
const insertPatient = async (patientData) => {
    const {
        loginId,
        password,
        name,
        nameKana,
        gender,
        birthDate,
        phone,
        email,
        postalCode,
        prefecture,
        city,
        address,
        building,
        insurerNumber,
        insurerSymbol,
        insurerNumber2,
        insurerBranch
    } = patientData;
    // 必須項目チェック
    if (!name || !nameKana || !birthDate || !phone) {
        const error = new Error("必須入力する項目が未入力です");
        error.statusCode = 400;
        throw error;
    }
    // 最後にlogin_id重複チェック
    const isDuplicateId = await signUpMapper.existsPatientLoginId({
        login_id: loginId
    });
    // 最後にemail重複チェック
    const isDuplicateEmail = await signUpMapper.existsPatientEmail({
        email: email
    });

    if (isDuplicateId.length > 0) {
        const error = new Error("登録済みのIDです");
        error.statusCode = 400;
        throw error;
    }
    if (isDuplicateEmail.length > 0) {
        const error = new Error("登録済みのメールアドレスです");
        error.statusCode = 400;
        throw error;
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10).toString("base64");
    console.log("ハッシュ化されたパスワード:", JSON.stringify(hashedPassword));
    // DB登録するデータ最終確認    
    const values = [
        loginId,
        hashedPassword,
        name,
        nameKana,
        gender,
        birthDate,
        phone,
        email,
        postalCode,
        prefecture,
        city,
        address,
        building,
        insurerNumber,
        insurerSymbol,
        insurerNumber2,
        insurerBranch,
    ];
    // DBに登録
    await signUpMapper.insertPatient(values);
    // レスポンス
    return {
        message: "新規登録が正常に完了",
        user: {
            loginId,
            name,
        }
    };
};
// =======================
// 当日予約での新規登録
// =======================
const insertSameDayPatient = async (sameDayPatientData) => {
    const {
        name,
        nameKana,
        birthDate,
        phone
    } = sameDayPatientData;

     // 必須入力チェック
    if (!name || !nameKana || !birthDate || !phone) {
        const error = new Error("必須入力項目が未入力です");

        error.statusCode = 400;
        throw error;
    }
    // values
    const values = [
        name,
        nameKana,
        birthDate,
        phone
    ];

     // データベースに登録
    const result = await signUpMapper.insertSameDayPatient(
         values
    );
        
     return {
        message: "予約が正常に完了しました",
    };

};

module.exports = {
    insertPatient,
    insertSameDayPatient,

    existsPatientEmail,
    existsPatientLoginId,
};