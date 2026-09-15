/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import DermatologyIcon from "@/assets/dermatology.png";
import InternalIcon from "@/assets/internal_medicine.png";
import OrthopedicsIcon from "@/assets/orthopedics.png";
import OtolaryngologyIcon from "@/assets/otolaryngology.png";
import PediatricsIcon from "@/assets/pediatrics.png";

export const visitType = [
    {
        label: "初診",
        value: "first"
    },
    {
        label: "再診",
        value: "followup"
    }
];

export const departmentImages:Record<string, string> = {
    "内科": InternalIcon,

    "小児科": PediatricsIcon,

    "整形外科": OrthopedicsIcon,

    "耳鼻咽喉科": OtolaryngologyIcon,

    "皮膚科": DermatologyIcon,
};