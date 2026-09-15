// 新規登録画面の入力フォームのデータを管理する
import { reactive } from "vue";
// reactiveを利用する理由
// フォーム全体を監視管理するリアクティブ
// =======================
// 入力フォーム
// =======================
export const form = reactive({
    loginId: "",
    password: "",
    passwordConfirm: "",
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    gender: null as string | null,
    birthDate: "" as string | null,
    phone: "",
    email: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    insurerNumber: "",
    insurerSymbol: "",
    insurerNumber2: "",
    insurerBranch: "",
});
// =======================
// 当日の患者 入力フォーム
// =======================
export const sameDayForm = reactive({
    lastName: "",

    firstName: "",

    lastNameKana: "",

    firstNameKana: "",

    birthDate: "" as string | null,

    phone: "",
});

// =======================
// エラーメッセージ
// =======================
export const errors = reactive({
    loginId: "",
    password: "",
    passwordConfirm: "",
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    postalCode: "",
    insurerNumber: "",
});
// =======================
// エラーメッセージ
// =======================
export const errorsSameDay = reactive({
    lastName: "",

    firstName: "",

    lastNameKana: "",

    firstNameKana: "",

    birthDate: "",
    
    phone: "",
});
// =======================
// 必須入力
// =======================
export const requiredFields = [
	{ key: "loginId", label: "使用するID"},
	{ key: "password", label: "パスワード" },
    { key: "passwordConfirm", label: "パスワード確認" },
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
// 利用契約フォーム
export const policyForm = reactive({
    policyAgreement: false,
    privacyAgreement: false,
});
