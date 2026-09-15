<script setup lang="ts">
import { ref, onMounted } from "vue";
import { selectDoctorHoliday } from "@/services/doctor/useDoctor";

import type { DoctorInfo } from "@/types/doctor";

const doctorHoliday = ref<DoctorInfo[]>([]);

const refreshHoliday = async () => {
    doctorHoliday.value = await selectDoctorHoliday();
};
// =======================
// 日付を曜日に変換する
// =======================
const handleDate = (dateString: string) => {
    const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    return weekDays[date.getDay()];
};

onMounted(async () => {
    await refreshHoliday();
});

</script>
<template>
    <!-- {{ doctorHoliday }} -->
    <div class="info-page">
        <section class="profile-card">
            <div>
                <h2 class="page-title">
                    登録した休診日一覧
                </h2>
            </div>
            <div v-if="doctorHoliday.length === 0" class="alert-box">
                休診日の情報がありません
            </div>

            <div v-else class="table-responsive">
                <table class="reservation-table">
                    <thead>
                        <tr>
                            <th>日付</th>
                            <th>曜日</th>
                            <th>理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in doctorHoliday" :key="`${res.doctor_id}-${res.holiday_date}`">
                            <td>{{ res.holiday_date.slice(0, 10) }}</td>
                            <td>{{ handleDate(res.holiday_date) }}</td>
                            <td>{{ res.reason }}</td>
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