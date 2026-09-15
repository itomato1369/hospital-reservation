/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { reactive } from "vue";
import { form } from "@/services/signup/useSignUpForm";
import type { PatientInfo, Family  } from "@/types/patient";
// =======================
// 性別をmale, female, otherを変換
// =======================
export const genderLabel = (gender?: string) => {

    switch (gender) {

        case "male":
            return "男性";

        case "female":
            return "女性";

        case "other":
            return "回答しない";

        default:
            return "-";
    }
};
// =======================
// 変更する時、保存されているデータも一緒に遷移
// =======================
export const setPatientForm = (
    patient: PatientInfo
) => {

    form.loginId = patient.login_id;

    const names = patient.name.split(" ");

    form.lastName = names[0] ?? "";
    form.firstName = names[1] ?? "";

    const kana = patient.name_kana.split(" ");
    
    form.lastNameKana = kana[0] ?? "";
    form.firstNameKana = kana[1] ?? "";

    form.gender = patient.gender;

    form.birthDate =
        patient.birth_date
            ? patient.birth_date.slice(0, 10)
            : "";

    form.phone = patient.phone;
    form.email = patient.email;

    form.postalCode = patient.postal_code;
    form.prefecture = patient.prefecture;

    form.address = patient.address;
    form.building = patient.building;

    form.insurerNumber = patient.insurer_number;
    form.insurerSymbol = patient.insurer_symbol;
    form.insurerNumber2 = patient.insurer_number2;
    form.insurerBranch = patient.insurer_branch;
};
// =======================
// 家族の情報を登録するフォーム
// =======================
export const familyForm = reactive<Family>({
    patient_id: null,

    name: "",

    name_kana: "",

    lastName: "",

    firstName: "",

    lastNameKana: "",

    firstNameKana: "",

    gender: "",

    birth_date: "",
    
    relationship: ""
});