<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted } from 'vue';
import { selectWaitTime } from "@/services/nurse/useNurse";

import ChangeWaitingModal from "@/components/nurse/ChangeWaitingModal.vue";

import type { TodaysReservation } from "@/types/nurse";

const todayWaitTime = ref<TodaysReservation[]>([]);
const isWaitingModalVisible = ref(false);
const selectedReservationId = ref<number | null>(null);
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

const refreshWaitTimes = async () => {
    todayWaitTime.value = await selectWaitTime();
};

const openWaitingModal = (reservationId: number) => {
    selectedReservationId.value = reservationId;
    isWaitingModalVisible.value = true;
};

const closeWaitingModal = () => {
    isWaitingModalVisible.value = false;
};

onMounted(async () => {
    await refreshWaitTimes();
});
</script>
<template>
    <div class="wait-page">
        <section class="wait-card">
            <div class="page-header">
                <h2 class="pagie-title">
                    待ち時間を入力
                </h2>
            </div>
            <div v-if="todayWaitTime.length === 0" class="alert-box">
                 {{ year }}年{{ month }}月{{ date }}日 まだ来院された患者がいません
            </div>

            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>氏名</th>
                            <th>フリガナ</th>
                            <th>診療科</th>
                            <th>担当医</th>
                            <th>診察時間</th>
                            <th>待ち時間</th>
                            <th>管理</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in todayWaitTime" :key="res.reservation_id">
                            <td>{{ res.patient_name }}</td>
                            <td>{{ res.name_kana }}</td>
                            <td>{{ res.department_name }}</td>
                            <td>{{ res.doctor_name }}</td>
                            <td>{{ res.start_time.slice(0, 5) }}</td>
                            <td>{{ res.wait_minutes }}</td>
                            <td>
                                <Button label="管理" 
                                        icon="pi pi-check"
                                        @click="openWaitingModal(res.reservation_id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <ChangeWaitingModal
            :visible="isWaitingModalVisible"
            :reservationId="selectedReservationId"
            @update:visible="isWaitingModalVisible = $event"
            @updated="refreshWaitTimes"
        />
    </div>
</template>
<style scoped>
@import "@/assets/styles/nurse/waitTime.css";
</style>