import router from "@/routers";
import { genders } from "./useSignUpConst";
import { showModal } from "../useModal";
import { reset, resetSameday } from "./useSignUpReset";
import { createPayload, sameDayPayload } from "./useSignUpPayload";
import { formatWarekiDate, maxDate, showCalendar } from "./useCalendar";
import { form, errors, errorsSameDay, sameDayForm, policyForm } from "./useSignUpForm";
import { validatePassword, 
    validateRequired, 
    formatPhone,
    sameDayFormPhone, 
    validateLastName, 
    validateFirstName, 
    validateBirthDate, 
    validateLastNameKana, 
    validateFirstNameKana } from "./useSignUpValidation";
import { checkDuplicateID, 
    checkDuplicateEmail, 
    registerPatient, 
    updatePatientInfo, 
    autoSearchAddress, 
    sameDayRegisterPatient } from "./useSignUpApi";

const editRequiredFields = [
    { key: "lastName", label: "姓" },
    { key: "firstName", label: "名" },
    { key: "lastNameKana", label: "セイ" },
    { key: "firstNameKana", label: "メイ" },
    { key: "gender", label: "性別" },
    { key: "birthDate", label: "生年月日" },
    { key: "phone", label: "電話番号" },
    { key: "email", label: "メールアドレス" },
    { key: "postalCode", label: "郵便番号" },
    { key: "insurerNumber", label: "保険者番号" },
];

// =======================
// 登録
// =======================
export const submit = async (
    policyAgreement: boolean,
    privacyAgreement: boolean
) => {
    // 利用契約の同意チェック
    if (!policyAgreement || !privacyAgreement) {
        showModal(
            "利用規約の確認",
            "利用規約とプライバシーポリシーへの同意が必要です"
        );
        return;
    }

    //　必須入力チェック
    const result = validateRequired();

    if (!result.valid) {
        showModal(
            "入力エラー",
            `以下の項目が未入力です\n\n・${result.missingFields.join("\n・")}`
        );
        return;
    }
    // IDバリデーション
    if (!(await checkDuplicateID())) {
        showModal(
            "入力エラー",
            errors.loginId
        );
        return;
    }

    // パスワードバリデーション
    if (!validatePassword()) {
        showModal(
            "入力エラー",
            errors.password
        );
        showModal(
            "入力エラー",
            errors.passwordConfirm
        );
        return;
    }
    // 氏名バリデーション
    if (!validateLastName()) {
        showModal(
            "入力エラー",
            errors.lastName || "正しい氏名を入力してください"
        );
        return;
    }
    if (!validateFirstName()) {
        showModal(
            "入力エラー",
            errors.firstName || "正しい氏名を入力してください"
        );
        return;
    }
    // フリガナバリデーション
    if (!validateLastNameKana()) {
        showModal(
            "入力エラー",
            errors.lastNameKana || "正しいフリガナを入力してください"
        );
        return;
    }
    if (!validateFirstNameKana()) {
        showModal(
            "入力エラー",
            errors.firstNameKana || "正しいフリガナを入力してください"
        );
        return;
    }
    // 生年月日バリデーション
    if (!validateBirthDate()) {
        showModal(
            "入力エラー",
            errors.birthDate
        );
        return;
    }

    // メールアドレスバリデーション
    if (!(await checkDuplicateEmail())) {
        return;
    }
    // 郵便番号バリデーション
    if (!(await autoSearchAddress())) {
        showModal(
            "入力エラー",
            errors.postalCode || "正しい郵便番号を入力してください"
        );
        return;
    }

    // 登録処理
    try {
        const payload = createPayload();

        const data = await registerPatient(payload);
        console.log(data);

        showModal(
            "登録完了",
            "登録したID、パスワードでログインしてください",
            async () => {
                console.log("ログイン画面へ遷移開始");

                try {
                    const result = await router.push("/login");

                    console.log("router.push完了");
                    console.log("遷移結果 :", result);
                    console.log("現在のURL : ", window.location.pathname);
                    console.log("現在のroute : ", router.currentRoute.value);
                } catch (error) {
                    console.error("router.pushエラー", error);
                }

                console.log("ログイン画面へ遷移完了");
            },
            true
        );
    } catch (error: any) {
        showModal(
            "登録失敗、お手数ですが情報システム課に連絡してください",
            error.response?.data?.error ?? "登録できませんでした"
        );
    }
};

export const submitEdit = async () => {
    const result = validateRequired(editRequiredFields);
    if (!result.valid) {
        showModal(
            "入力エラー",
            `以下の項目が未入力です

・${result.missingFields.join("\n・")}`
        );
        return;
    }
    try {
        const payload = createPayload();

        const data = await updatePatientInfo(payload);
        console.log(data);

        showModal(
            "更新完了",
            "情報を更新しました",
            () => { router.push("/patient"); },
            true
        );
    } catch (error: any) {
        showModal(
            "更新失敗",
            error.response?.data?.error ?? "更新できませんでした"
        );
    }
};

export const submitSameDay = async () => {
    // 氏名バリデーション
    if (!validateLastName()) {
        showModal(
            "入力エラー",
            errorsSameDay.lastName || "正しい氏名を入力してください"
        );
        return;
    }
    if (!validateFirstName()) {
        showModal(
            "入力エラー",
            errorsSameDay.firstName || "正しい氏名を入力してください"
        );
        return;
    }
    // フリガナバリデーション
    if (!validateLastNameKana()) {
        showModal(
            "入力エラー",
            errorsSameDay.lastNameKana || "正しいフリガナを入力してください"
        );
        return;
    }
    if (!validateFirstNameKana()) {
        showModal(
            "入力エラー",
            errorsSameDay.firstNameKana || "正しいフリガナを入力してください"
        );
        return;
    }
    // 生年月日バリデーション
    if (!validateBirthDate()) {
        showModal(
            "入力エラー",
            errorsSameDay.birthDate || "正しい生年月日を入力してください"
        );
        return;
    }

     try {
        const payload = sameDayPayload();

        const data = await sameDayRegisterPatient(payload);

        // authStoreの一時的な患者の情報
        // 当日予約用のストア
        sessionStorage.setItem("targetPatient", JSON.stringify({
            patientId: data.patientId,
            name: `${payload.name}`,
            nameKana: `${payload.nameKana}`
        }));

        showModal(
            "新規登録を完了",
            "当日予約に進んでください",
            () => { router.push("/nurse/search"); },
            true
        );
    } catch (error: any) {
        showModal(
            "登録失敗",
            error.response?.data?.error ?? "登録できませんでした"
        );
    }
};

export {
    form,
    reset,
    errors,
    maxDate,
    genders,
    policyForm,
    sameDayForm,
    formatPhone,
    showCalendar,
    resetSameday,
    errorsSameDay,
    sameDayFormPhone,
    validatePassword,
    formatWarekiDate,
    checkDuplicateID,
    autoSearchAddress,
    checkDuplicateEmail,    
}