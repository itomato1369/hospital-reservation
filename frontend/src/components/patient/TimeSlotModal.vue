<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import CommonModal from "../commons/CommonModal.vue";
import type { AvailableTimeSlot } from "@/types/reservation";

interface Props {
    visible: boolean;
    reservationDate: string;
    timeSlots: AvailableTimeSlot[];
    selectedTime: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (
        e: "update:visible",
        value: boolean
    ): void;

    (
        e: "select",
        slot: AvailableTimeSlot
    ): void;
}>();

const isPastSlot = (slot: AvailableTimeSlot) => {
    if (!props.reservationDate) {
        return false;
    }

    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    if (props.reservationDate !== today) {
        return false;
    }

    const [hour, minute] = slot.start_time
        .split(":")
        .map((value) => Number(value));
    const hourStr = String(hour).padStart(2, "0");
    const minuteStr = String(minute).padStart(2, "0");
    const slotDate = new Date(`${props.reservationDate}T${hourStr}:${minuteStr}:00`);

    return slotDate <= now;
};

const handleSlotClick = (slot: AvailableTimeSlot) => {
    if (!slot.available || isPastSlot(slot)) {
        return;
    }
    emit("select", slot);
};
</script>

<template>
    <CommonModal
        :visible="props.visible"
        title="ご希望の時間帯を選択"
        @update:visible="emit('update:visible', $event)"
    >
        <div class="time-slot-list">
            <div v-if="props.timeSlots.length === 0" class="empty-slot-message">
                ご希望の日付の予約可能な時間帯はありません。別の日を選択してください。
            </div>
            <div
                v-for="slot in props.timeSlots"
                :key="slot.start_time"
                class="time-slot"
                :class="{
                    selected: props.selectedTime === slot.start_time,
                    available: slot.available && !isPastSlot(slot),
                    unavailable: !slot.available || isPastSlot(slot)
                }"
                @click="handleSlotClick(slot)"
            >
                <span class="time-range">
                    {{ slot.start_time.slice(0,5) }}
                    ～
                    {{ slot.end_time.slice(0,5) }}
                </span>

                <span
                    class="status-badge"
                    :class="slot.available && !isPastSlot(slot) ? 'available' : 'unavailable'"
                >
                    {{ slot.available && !isPastSlot(slot) ? '〇' : '✖' }}
                </span>
            </div>
        </div>
    </CommonModal>
</template>

<style scoped>
@import "@/assets/styles/reservation.css";
</style>