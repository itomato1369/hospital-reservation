<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref } from "vue";
import { updateReservationStatus } from "@/services/nurse/useNurse";
import ReservedIcon from "@/assets/images/reserved.png";
import VisitIcon from "@/assets/images/visit.png";
import InProgressIcon from "@/assets/images/in_progress.png";
import PrescribedIcon from "@/assets/images/prescribed.png";
import NoShoIcon from "@/assets/images/no_show.png";
import CancelIcon from "@/assets/images/cancelled.png";

const props = defineProps<{
    visible: boolean;
    reservationId: number | null;
}>();

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
    (e: "updated"): void;
}>();

const statusMessage = ref("");
const isUpdating = ref(false);

const statusItems = [
    { key: "reserved", icon: ReservedIcon, alt: "予約済みアイコン", label: "予約済み" },
    { key: "arrived", icon: VisitIcon, alt: "来院アイコン", label: "来院" },
    { key: "in_progress", icon: InProgressIcon, alt: "診察中アイコン", label: "診察中" },
    { key: "prescribed", icon: PrescribedIcon, alt: "処方アイコン", label: "処方" },
    { key: "cancelled", icon: CancelIcon, alt: "キャンセルアイコン", label: "キャンセル" },
    { key: "no_show", icon: NoShoIcon, alt: "無断キャンセルアイコン", label: "無断キャンセル" },
] as const;

const handleStatusClick = async (status: string) => {
    if (!props.reservationId || isUpdating.value) return;

    statusMessage.value = "";
    isUpdating.value = true;

    try {
        await updateReservationStatus(status, props.reservationId);
        statusMessage.value = "予約ステータスが変更されました";
        emit("updated");
    } catch (error) {
        const err = error as any;
        statusMessage.value =
            err?.response?.data?.error ??
            err?.message ??
            "予約ステータス変更に失敗しました";
    } finally {
        isUpdating.value = false;
    }
};
</script>

<template>
    <Dialog
        :visible="props.visible"
        modal
        :closable="false"
        :style="{ width: '600px' }"
        header="予約ステータス変更"
        @update:visible="emit('update:visible', $event)"
    >
        <div class="change-status">
            <div
                v-for="item in statusItems"
                :key="item.key"
                class="status-card"
                @click="handleStatusClick(item.key)"
            >
                <img
                    :src="item.icon"
                    :alt="item.alt"
                    class="status-icon"
                    :class="{ disabled: isUpdating }"
                />
                <span class="status-label">{{ item.label }}</span>
            </div>
        </div>

        <div class="status-message">
            <p v-if="statusMessage">{{ statusMessage }}</p>
        </div>

        <template #footer>
            <Button
                label="閉じる"
                class="modal-ok-button"
                @click="emit('update:visible', false)"
                :disabled="isUpdating"
            />
        </template>
    </Dialog>
</template>

<style scoped>
@import "@/assets/styles/nurse/changeReservation.css";
</style>