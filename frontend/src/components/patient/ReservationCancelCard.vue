<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore"
import { loadReservationById, updateReservationStatusCancelled, formatDate } from '@/services/reservation/useReservation';
import { showModal } from "@/services/useModal";

import type { ReservationForm } from "@/types/reservation";

const authStore = useAuthStore();
const reservation = ref<ReservationForm[]>([]);
// 予約情報を取得
const handleReservation = async () => {
    const patientId = authStore.user?.patientId;
    if (!patientId) {
        console.error("患者のIDが取得できませんでした");
        return;
    }
    try {
        reservation.value = await loadReservationById(patientId);
    } catch(error) {
        console.error("予約情報の取得に失敗しました", error);
    }
};
// 予約キャンセルボタン処理
const handleCancel = (reservationId: number) => {
    showModal(
        "予約キャンセル確認",
        "予約をキャンセルしてもよろしいでしょうか？",
        async () => {
            try {
                await updateReservationStatusCancelled(reservationId);
                await handleReservation();
                showModal("キャンセル完了", "予約がキャンセルされました");
            } catch (error) {
                showModal("エラー", "キャンセルの処理に失敗しました");
            }
        },
        true,
        "キャンセル"
    );
};

onMounted(() => {
    handleReservation();
});
</script>
<template>
    <!-- {{ reservation }} -->
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <h2 class="page-title">予約確認</h2>
                <p class="page-subtitle">現在登録されている予約を確認・キャンセル</p>
            </div>
            <div v-if="reservation.length === 0" class="alert-box">
                現在、有効な予約はありません
            </div>

            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>時間</th>
                            <th>診療科</th>
                            <th>担当医</th>
                            <th>キャンセル</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in reservation"
                            :key="res.reservation_id">
                            <td>{{ formatDate(res.reservation_date) }}</td>
                            <td>{{ res.start_time?.slice(0, 5) }}
                                ~
                                {{ res.end_time?.slice(0, 5) }}
                            </td>
                            <td>{{ res.department_name }}</td>
                            <td>{{ res.name }}</td>
                            <td>
                                <Button label="キャンセル"
                                        icon="pi pi-times"
                                        class="cancel-btn"
                                        @click="handleCancel(res.reservation_id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<style scoped>
@import "@/assets/styles/patient/cancel.css";
</style>