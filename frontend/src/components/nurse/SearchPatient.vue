<script setup lang="ts">
import { ref, onMounted } from "vue";
import { visitType, statusType, statusOptions, departmentOptions } from "@/services/nurse/useNurse";
import { selectPatient } from "@/services/nurse/useNurseApi";
import { useRouter }  from "vue-router";

import type { PatientHistory } from "@/types/nurse";

// =======================
// 患者の来院履歴
// =======================
const patientHistory = ref<PatientHistory[]>([]);

const router = useRouter();
// =======================
// 検索条件
// =======================
const filterPatientName = ref<string>("");
const filterPhone = ref<string>("");
const filterDepartment = ref<number | null>(null);
const filterReservationDate = ref<string>("");
const filterStatus = ref<string | null>(null);
// =======================
// 患者を検索
// =======================
const searchPatinet = async () => {
    try {
        const result = await selectPatient({
            patientName: filterPatientName.value || null,
            phone: filterPhone.value || null,
            departmentId: filterDepartment.value,
            reservationDate: filterReservationDate.value || null,
            status: filterStatus.value,
        });
        patientHistory.value = result ?? [];
    } catch (error) {
        console.error("患者検索エラー", error);
        patientHistory.value = [];
    }
};
// =======================
// 当日予約へ
// =======================
const goToTodayReservation = (patientId: number) => {
    // patient_idだけを渡して患者の予約を代行できるように
    router.push({
        path: "/nurse/reservation/register",
        query: {
            patientId: patientId.toString()
        }
    });
};
</script>

<template>
    <div class="info-page">
        <section class="profile-card">

            <!-- =======================
                 ページヘッダー
            ======================== -->
            <div class="page-header">
                <div>
                    <h2 class="page-title">
                    既存の患者を検索
                    </h2>

                    <p class="page-subtitle">
                        全{{ patientHistory.length }}件
                    </p>
                </div>
            </div>

            <!-- =======================
                 検索条件
            ======================== -->
            <div class="history-search">

                <!-- 患者氏名 -->
                <div class="filter-bar">
                    <label class="filter-label" for="patientName">
                        患者氏名
                    </label>

                    <InputText
                        id="patientName"
                        v-model="filterPatientName"
                        placeholder="患者氏名を入力"
                        class="filter-input"
                    />
                </div>

                <!-- 患者電話番号 -->
                <div class="filter-bar">
                    <label class="filter-label" for="phone">
                        電話番号
                    </label>

                    <InputText
                        id="patientName"
                        v-model="filterPhone"
                        placeholder="電話番号を入力"
                        class="filter-input"
                    />
                </div>

                <!-- 診療科 -->
                <div class="filter-bar">
                    <label class="filter-label" for="departmentFilter">
                        診療科
                    </label>

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

                <!-- 予約日 -->
                <div class="filter-bar">
                    <label class="filter-label" for="reservationDate">
                        予約日
                    </label>

                    <input
                        id="reservationDate"
                        v-model="filterReservationDate"
                        type="date"
                        class="form-control filter-input"
                    />
                </div>

                <!-- ステータス -->
                <div class="filter-bar">
                    <label class="filter-label" for="statusFilter">
                        ステータス
                    </label>

                    <Dropdown
                        id="statusFilter"
                        v-model="filterStatus"
                        :options="statusOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="ステータスを選択"
                        class="filter-dropdown"
                    />
                </div>

                <!-- ボタン -->
                <div class="search-button-group">
                    <Button
                        label="検索"
                        icon="pi pi-search"
                        @click="searchPatinet"
                    />

                    <Button
                        label="リセット"
                        icon="pi pi-refresh"
                        severity="secondary"
                        @click=""
                    />
                </div>
            </div>

            <!-- =======================
                 検索結果
            ======================== -->
            <div v-if="patientHistory.length === 0" class="alert-box">
                該当する来院履歴はありません
            </div>

            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>氏名</th>
                            <th>フリガナ</th>
                            <th>電話番号</th>
                            <th>当日予約へ</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="history in patientHistory" :key="history.reservation_id">
                            <td>{{ history.patient_name }}</td>

                            <td>{{ history.name_kana }}</td>

                            <td>{{ history.phone }}</td>

                            <td>
                                <Button label="当日予約"
                                        icon="pi pi-calendar-plus"
                                        @click="goToTodayReservation(history.patient_id)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<style scoped>
@import "@/assets/styles/nurse/todayReservation.css";
</style>