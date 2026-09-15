<script setup lang="ts">
/**
 * @note このファイルの主要なロジックおよび関数の大部分はAI（生成AI）によって作成されています。
 * メンテナンスや改修時はAI生成コードであることを念頭に置いてレビューしてください。
 */
import { ref, onMounted, computed } from "vue";
import { selectTodayReservation, visitType, statusType } from "@/services/nurse/useNurse";
import ChangeReservationStatusModal from "@/components/nurse/ChangeReservationStatusModal.vue";

import type { TodaysReservation } from "@/types/nurse";

const todaysReservation = ref<TodaysReservation[]>([]);
const filterDepartment = ref<string | null>(null);
const filterStartTime = ref<string | null>(null);

const isStatusModalVisible = ref(false);
const selectedReservationId = ref<number | null>(null);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

const refreshReservations = async () => {
    todaysReservation.value = await selectTodayReservation();
};

const departmentOptions = computed(() => {
    const names = todaysReservation.value
        .map((item) => item.department_name)
        .filter((name, index, self) => self.indexOf(name) === index)
        .sort();

    return [
        { label: "全ての診療科", value: null },
        ...names.map((name) => ({ label: name, value: name })),
    ];
});

const startTimeOptions = computed(() => {
    const names = todaysReservation.value
        .map((item) => item.start_time ? item.start_time.slice(0, 5) : "")
        .filter((name, index, self) => self.indexOf(name) === index)
        .sort();

    return [
        { label: "全ての時間帯", value: null },
        ...names.map((name) => ({ label: name, value: name })),
    ];
});

const filteredReservations = computed(() => {
    return todaysReservation.value.filter((item) => {
        // 診療科の条件
        const matchDepartment = !filterDepartment.value || 
            item.department_name === filterDepartment.value; 
        // 時間帯の条件
        const itemStartTime = item.start_time ? item.start_time.slice(0, 5) : "";
        const matchStartTime = !filterStartTime.value ||
            itemStartTime === filterStartTime.value;
        // 両方の条件に一致するもの
        return matchDepartment && matchStartTime;    
    });
});

const openStatusModal = (reservationId: number) => {
    selectedReservationId.value = reservationId;
    isStatusModalVisible.value = true;
};

onMounted(async () => {
    await refreshReservations();
});
</script>

<template>
    <div class="info-page">
        <section class="profile-card">
            <div class="page-header">
                <div>
                    <h2 class="page-title">
                        {{ year }}年{{ month }}月{{ date }}日の予約一覧
                    </h2>
                    <p class="page-subtitle">
                        総{{ todaysReservation.length }}件の予約があります
                    </p>
                </div>
                <div class="filter-bar">
                    <label class="filter-label" for="departmentFilter">診療科で絞り込む</label>
                    <Dropdown
                        id="departmentFilter"
                        v-model="filterDepartment"
                        :options="departmentOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="診療科を選択"
                        class="filter-dropdown"
                    />
                </div>
                <div class="filter-bar">
                    <label class="filter-label" for="departmentFilter">時間帯で絞り込む</label>
                    <Dropdown
                        id="departmentFilter"
                        v-model="filterStartTime"
                        :options="startTimeOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="時間帯を選択"
                        class="filter-dropdown"
                    />
                </div>
            </div>
            <div v-if="todaysReservation.length === 0" class="alert-box">
                {{ year }}年{{ month }}月{{ date }}日の予約はありません
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
                            <th>区分</th>
                            <th>ステータス</th>
                            <th>管理</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in filteredReservations" :key="res.reservation_id">
                            <td>{{ res.patient_name }}</td>
                            <td>{{ res.name_kana }}</td>
                            <td>{{ res.department_name }}</td>
                            <td>{{ res.doctor_name }}</td>
                            <td>{{ res.start_time.slice(0, 5) }}</td>
                            <td>{{ visitType(res.visit_type) }}</td>
                            <td>{{ statusType(res.status) }}</td>
                            <td>
                                <Button label="管理"
                                        icon="pi pi-check"
                                        @click="openStatusModal(res.reservation_id)"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <ChangeReservationStatusModal
            :visible="isStatusModalVisible"
            :reservationId="selectedReservationId"
            @update:visible="isStatusModalVisible = $event"
            @updated="refreshReservations"
        />
    </div>
</template>
<style scoped>
@import "@/assets/styles/nurse/todayReservation.css";
</style> 