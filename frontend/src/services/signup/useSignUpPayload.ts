import { form, sameDayForm } from "./useSignUpForm";

// APIへ送信するデータを作成
// 画面で入力したデータを、APIに送れる形へ変換するファイル
export const createPayload = () => {
    return {
        loginId: form.loginId,

        password: form.password,
        // 姓＋名
        name: `${form.lastName} ${form.firstName}`,
        // セイ＋メイ
        nameKana: `${form.lastNameKana} ${form.firstNameKana}`,

        gender: form.gender,

        birthDate: form.birthDate,

        phone: form.phone,

        email: form.email,

        postalCode: form.postalCode,

        prefecture: form.prefecture,

        city: form.city,

        address: form.address,

        building: form.building,

        insurerNumber: form.insurerNumber,

        insurerSymbol: form.insurerSymbol,

        insurerNumber2: form.insurerNumber2,
        
        insurerBranch: form.insurerBranch
    };
};

// APIへ送信するデータを作成
// 当日予約に必要なデータ
export const sameDayPayload = () => {
    return {
        // 姓＋名
        name: `${sameDayForm.lastName} ${sameDayForm.firstName}`,
        // セイ＋メイ
        nameKana: `${sameDayForm.lastNameKana} ${sameDayForm.firstNameKana}`,
       
        birthDate: sameDayForm.birthDate,

        phone: sameDayForm.phone,
    };
};