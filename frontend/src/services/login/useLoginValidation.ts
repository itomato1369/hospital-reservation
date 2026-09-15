/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { form } from "./useLoginForm";

export const validateRequired = () => {

    const missingFields: string[] = [];

    if (!form.loginId.trim()) {
        missingFields.push("使用するID");
    }

    if (!form.password.trim()) {
        missingFields.push("パスワード");
    }

    return {

        valid: missingFields.length === 0,

        missingFields,

    };

};