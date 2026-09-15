/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import router from "@/routers";
import { getPatientInfo, 
         getDoctors, 
         selectWaitTime, 
         selectHistory,
         selectFamily,
         updatePatientInfo,
         insertFamily, } from "./usePatientApi";
import { genderLabel, setPatientForm, familyForm } from "./usePatientForm";
import { familyPayload } from "./usePatientPayload";
import { relationship, findGender, findRelationship } from "./usePatientConst";
import { showModal } from "../useModal";
// =======================
// 数字を曜日に
// =======================
const weekDayLabel = (
    day: number
) => {
    const weekDays = [
        "日曜日",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日"
    ];

    return weekDays[day];
};
// =======================
// 時間のフォーマット
// =======================
const formatTime = (
    time: string
) => {
    return time.slice(0, 5);
};
// =======================
// 医師のアイコン
// =======================
const doctorAnimalIcon = (
    doctorId: number
) => {
    const icons: Record<number, string> = {
        1: "🐧",
        2: "🐼",
        3: "🦊",
        4: "🐨",
        5: "🦁",
        6: "🐯",
        7: "🐰",
        8: "🐱",
        9: "🐬",
        10: "🐿️",
    };

    return icons[doctorId] ?? "🩺";
};

const goBack = () => {
    router.back();
};
// =======================
// 登録
// =======================
export const submitFamily = async () => {
    try {
        const payload = familyPayload();

        const data = await insertFamily(payload);
        console.log(data);

        showModal(
            "登録完了",
            "登録した家族情報を確認してください",
            () => { router.push("/patient/family/info"); },
            true
        )
    } catch (error) {
        console.error("家族登録にエラー", error);
        showModal(
            "エラー",
            "家族登録に失敗しました"
        );
    }
};

export {
    goBack,
    getDoctors,
    findGender,
    formatTime,
    familyForm,
    genderLabel,
    weekDayLabel,
    relationship,
    selectFamily,
    selectHistory,
    selectWaitTime,
    getPatientInfo,
    setPatientForm,
    doctorAnimalIcon,
    findRelationship,
    updatePatientInfo,
};
