import { form, sameDayForm, errors, requiredFields } from "./useSignUpForm";
// =======================
// パスワードチェック
// =======================
export const validatePassword = () => {
     if(form.password !== form.passwordConfirm) {

       errors.passwordConfirm="パスワードが一致しません";
        return false;
    }
    // 英大文字・英小文字・数字を含む８文字
    const passwordPattern = 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,13}$/;
    
    if (!passwordPattern.test(form.password)) {
        errors.password = "パスワードは英大文字・英小文字・数字を組み合わせた8文字~13文字で入力してください";

        return false;
    }

    return true;
};
// =======================
// 必須入力チェック
// =======================
export const validateRequired = (
    fields: Array<{ key: string; label: string }> = requiredFields
) => {

    // エラーメッセージを初期化
    Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = "";
    });
    
    const missingFields: string[] = [];

    // 必須項目を順番にチェック
    for (const field of fields) { 

        const value = form[field.key as keyof typeof form];

        // 未入力なら
        if (!value) {
            // エラーメッセージ表示
            errors[field.key as keyof typeof errors] =
                `${field.label}を入力してください`;
            // モーダルに未入力のfield名を表示
            missingFields.push(field.label);
        }
    }
    return {
        valid: missingFields.length === 0,
        missingFields
    };
};
// =======================
// 電話番号　ハイフン
// =======================
export const formatPhone = () => {

    // 数字だけ取得
    const numbers = form.phone.replace(/\D/g, "");

    // 11桁まで
    const phone = numbers.slice(0, 11);

    if (phone.length <= 3) {
        form.phone = phone;
    } else if (phone.length <= 7) {
        form.phone =
            `${phone.slice(0, 3)}-${phone.slice(3)}`;
    } else {
        form.phone =
            `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
    }
};
// =======================
// 電話番号　ハイフン
// =======================
export const sameDayFormPhone = () => {
     // 数字だけ取得
    const numbers = sameDayForm.phone.replace(/\D/g, "");

    // 11桁まで
    const phone = numbers.slice(0, 11);

    if (phone.length <= 3) {
        sameDayForm.phone = phone;
    } else if (phone.length <= 7) {
        sameDayForm.phone =
            `${phone.slice(0, 3)}-${phone.slice(3)}`;
    } else {
        sameDayForm.phone =
            `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
    }
};
// =======================
// 氏名・フリガナ
// =======================
// 氏名（性）
export const validateLastName = (): boolean => {
    const value = form.lastName.trim();

    if (!value) {
        return true;
    }
    if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(value)) {
        errors.lastName = "姓は漢字・ひらがな・カタカナのみ入力してください";
        return false;
    }
    errors.lastName = "";
    return true;
};
// 氏名（名）
export const validateFirstName = (): boolean => {
    const value = form.firstName.trim();

    if (!value) {
        return true;
    }
    if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(value)) {
        errors.firstName = "名は漢字・ひらがな・カタカナのみ入力してください";
        return false;
    }
    errors.firstName = "";
    return true;
};
// フリガナ（性）
export const validateLastNameKana = (): boolean => {
    const value = form.lastNameKana.trim();

    if (!value) {
        return true;
    }
    if (!/^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(value)) {
        errors.lastNameKana = "姓のフリガナはひらがな・カタカナのみ入力してください";
        return false;
    }
    errors.lastNameKana = "";
    return true;
};
// フリガナ（名）
export const validateFirstNameKana = (): boolean => {
    const value = form.firstNameKana.trim();

    if (!value) {
        return true;
    }
    if (!/^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u.test(value)) {
        errors.firstNameKana = "名のフリガナはひらがな・カタカナのみ入力してください";
        return false;
    }
    errors.firstNameKana = "";
    return true;
};
// =======================
// 保険者番号バリデーション
// =======================
export const validateInsurerNumber = (): boolean => {
    const value = form.insurerNumber.trim();

    if (!value) {
        errors.insurerNumber = "保険者番号を入力してください";
        return false;
    }
    if (value.length > 8) {
        errors.insurerNumber = "保険者番号8桁以内で入力してください";
        return false;
    }
    if (!/^[0-9]+$/.test(value)) {
        errors.insurerNumber = "保険者番号は半角数字のみ入力してください";
        return false;
    }
    errors.insurerNumber = "";

    return true;
};
// =======================
// 生年月日バリデーション
// =======================
export const validateBirthDate = (): boolean => {
    console.log("======生年月日バリデーション開始 ======");
    console.log("form.birthDate :", form.birthDate);

    const value = form.birthDate;

    if (!value) {
        errors.birthDate = "生年月日を入力してください";
        return false;
    }
    // 今日の日付
    const today = new Date();

    const todayString = 
        `${today.getFullYear()}-` +
        `${String(today.getMonth() + 1).padStart(2, "0")}-` +
        `${String(today.getDate()).padStart(2, "0")}`;

    // 150年前の日付
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 126);

    const minDateString =
        `${minDate.getFullYear()}-` +
        `${String(minDate.getMonth() + 1).padStart(2, "0")}-` +
        `${String(minDate.getDate).padStart(2, "0")}`;

    console.log("入力値 :", value);
    console.log("最小日付 :", minDateString);
    console.log("最大日付 :", todayString);

    // 未来の日付
    if (value > todayString) {
        errors.birthDate = "生年月日に未来の日付は入力できません";
        return false;
    }
    // 126年以上前
    if (value < minDateString) {
        errors.birthDate = "正しい生年月日を入力してください";
        return false;
    }

    errors.birthDate = "";
    return true;
};