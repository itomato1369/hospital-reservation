/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { form, errors, requiredFields } from "./useReservationForm";
// =======================
// 必須入力チェック
// =======================
export const validateRequired = () => {
    // エラーメッセージ初期化
    Object.keys(errors).forEach((key) => {
        errors[key as keyof typeof errors] = "";
    });
    const missingFields: string[] = [];

    // 必須項目を順番にチェック
    for (const field of requiredFields) {
        const value = form [field.key as keyof typeof form];
        // 未選択
        if (!value) {
            errors[field.key as keyof typeof errors] = 
                `${field.label}を選択してください`;

            missingFields.push(field.label);
        }
    }
    return {
        valid: missingFields.length === 0,
        missingFields
    };
};
// =======================
// 日付
// =======================
export const formatDate = (date: string) => {
    const d = new Date(date);

    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};