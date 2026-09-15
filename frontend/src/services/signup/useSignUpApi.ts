import apiCilent from "@/services/apiClient";
import { createPayload, sameDayPayload } from "./useSignUpPayload";
import { form, errors } from "./useSignUpForm";
import { ngIds } from "./useSignUpConst";
// =======================
// ID重複チェック
// =======================
export const checkDuplicateID = async () => {
    errors.loginId = "";

    const loginId = form.loginId.trim();

    if (!loginId) {
        errors.loginId = "IDを入力してください";
        return false;
    }

    if (loginId.length < 8) {
        errors.loginId = "IDは8文字以上は入力してください"
        return false;
    }

    if (loginId.length > 20) {
        errors.loginId = "IDは31文字以内で入力してください"
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
        errors.loginId = "半角英数字のみ入力してください"
        return false;
    }

    if (/^(.)\1+$/.test(loginId)) {
    errors.loginId = "同じ文字の繰り返しは使用できません";
    return false;
    }

    if (ngIds.includes(loginId.toLowerCase())) {
    errors.loginId = "このIDは使用できません";
    return false;
    }
    // バックエンドでのlogin_idを認識する
    try {
        const { data } = await apiCilent.get("/api/register/idcheck", {
            params: {
                loginId: form.loginId,
            },
        });
        if (data.exists) {
            errors.loginId = "このIDは既に使用されています。別のIDを入力してください";
            return false;
        }
        errors.loginId = "使用可能なIDです";
        return true; 

    } catch (error) {
        console.error("ID重複チェックのエラー", error);
        errors.loginId = "ID重複チェックに失敗しました。後でもう一度試してください";
        return false;
    }
};
// =======================
// メールアドレスチェック
// =======================
export const checkDuplicateEmail = async () => {
    errors.email = "";

    const emailCheck = form.email.trim();

   // console.log("email CHECK ======================", emailCheck);

    if (!emailCheck) {
        errors.email = "メールアドレスを入力してください";
        return false;
    }

    try {
        const { data } = await apiCilent.get("/api/register/emailcheck", {
            params: {
                email: emailCheck,
            },
        }); 
        
        if (data.exists) {
            errors.email = "このメールアドレスは既に使用されています。別のメールアドレスを入力してください"
            return false;
        }

       // console.log("data=======================", data);
        
        errors.email = "使用可能なメールアドレスです";
        return true;

    } catch (error) {
        console.error("メールアドレスのエラー", error);
        errors.email = "メールアドレスチェックに失敗しました。後でもう一度試してください"
        return false;
    }
};
// =======================
// 新規登録
// =======================
export const registerPatient = async (
    payload: ReturnType<typeof createPayload>
) => {
    const { data } = await apiCilent.post(
        "/api/register",
        payload
    );
    return data;
};
// =======================
// 当日の新規登録
// =======================
export const sameDayRegisterPatient = async (
    payload: ReturnType<typeof sameDayPayload>
) => {
    const { data } = await apiCilent.post(
        "/api/register/same-day",
        payload
    );
    return data;
};

// =======================
// 患者情報更新
// =======================
export const updatePatientInfo = async (
    payload: ReturnType<typeof createPayload>
) => {
    const { data } = await apiCilent.put(
        "/api/patient/info",
        payload
    );
    return data;
};
// ReturnType<typeof a>　とは
// 関数の戻り値だけを取り出す
// typeof createPayload
//        ↓
// () => {
//      loginId: string;
//      password: string;
//  }    
//        ...
//          ↓
//    Return Type
//          ↓
//  {
//      loginId: string;
//      password: string;
// }
// つまりcreatePayload()関数が返すオブジェクトと同じ形のデータだけ受け取ります
// =======================
// 郵便番号　住所API
// =======================
export const autoSearchAddress = async (): Promise<boolean> => {
    //　ハイフンをあ除去
    const zipcode = form.postalCode.replace(/\D/g, "");

    if (zipcode.length > 3) {
        form.postalCode = `${zipcode.slice(0, 3)}-${zipcode.slice(3, 7)}`
    }
    // 7桁でなければエラー
    if (zipcode.length !== 7) {
        form.prefecture = "";
        form.city = "";
        errors.postalCode = "正常な郵便番号を入力してください";
        return false;
    }

    try {
        const { data } = await apiCilent.get(
            "/api/register/zipcode",
            {
                params: {
                    zipcode,
                },
            }
        );
        if (data.status == 200 && data.results) {
            const result = data.results[0];
            
            form.prefecture = result.address1;
            form.city = result.address2 + result.address3;

            errors.postalCode = "";

            return true;
        } else {
            form.prefecture = "";
            form.city = "";

            errors.postalCode = "該当する住所が見つかれませんでした";

            return false;
        }
    } catch (error) {
        console.error("住所APIにエラー", error);
        form.prefecture = "";
        form.city = "";
        
        errors.postalCode = "住所検索に失敗しました";

        return false;
    }
};