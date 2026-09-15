/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
// モーダルの状態を管理
import { ref } from "vue";

export const modalVisible = ref(false);
export const modalTitle = ref("");
export const modalMessage = ref("");
export const modalShowConfirm = ref(false);
export const modalConfirmText = ref("");

let onOkCallback: (() => void) | null = null;
// =======================
// 共通モーダル
// =======================
export const showModal = (
    title: string, 
    message: string, 
    onOk?: () => void,
    showConfirm = false,
    confirmText = "OK"
) => {
    modalTitle.value = title;
    modalMessage.value = message;
    
    onOkCallback = onOk || null;

    modalShowConfirm.value = showConfirm;
    modalConfirmText.value = confirmText;

    
    modalVisible.value = true;
};

export const closeModal = () => {
    modalVisible.value = false;
};
// OK ボタン
export const modalOk = () => {
    const callback = onOkCallback;

    modalVisible.value = false; 
    onOkCallback = null;

    if (callback) {
        callback(); // Ok　押下時に実行する処理があればする
    }
};